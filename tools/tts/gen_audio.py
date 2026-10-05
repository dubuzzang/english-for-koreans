"""앱 녹음 음성 일괄 생성: Kokoro 합성 → 두 인식기로 검사 → (틀리면) 속도를 바꿔 다시 → 후처리 → MP3.

  python tools/tts/gen_audio.py [--limit N] [--src word,example] [--max-tries 4] [--work DIR] [--retry weak,fail]

- 입력: audio-src/texts.json (node scripts/audio.mjs texts)
- 출력: audio/<id>.mp3, 품질 기록 audio-src/qa.json
- 이미 MP3가 있는(=같은 문장·같은 목소리·같은 합성 입력) 글은 건너뛴다.
- 검사: Whisper 받아쓰기(단어) + 음소 인식기(phones.py, 소리 그대로). Whisper가 맞다고 해도 음소가 크게 다르면 버리고,
  Whisper가 틀렸다고 해도(짧은 말·낱말 나열에서 흔함) 음소가 거의 같으면 받아들인다.

엔진: Kokoro-82M (hexgrad, Apache-2.0) · 미국 영어 · 여성 af_heart / 남성 am_fenrir
"""
import argparse, hashlib, json, os, re, subprocess, sys, time
import numpy as np
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
VOICES = {"f": "af_heart", "m": "am_fenrir"}
SPEEDS = [0.95, 0.9, 1.0, 0.85, 1.05]  # 시도마다 속도를 조금씩 바꾼다 (Kokoro는 같은 입력이면 같은 소리)


def log(*a):
    print(time.strftime("%H:%M:%S"), *a, flush=True)


# ---------- 판정 ----------
def verdict(text, w, dur):
    from judges import norm_words
    n = max(1, len(norm_words(text)))
    if dur < 0.15 or dur > 0.9 * n + 2.0:
        return False
    return w == 0


PER_BAD = 0.6   # Whisper가 맞다고 해도 음소가 이만큼 다르면 버린다
PER_OK = 0.12   # Whisper가 틀렸다고 해도 음소가 이만큼 가까우면 받아들인다


def accept(it, c):
    """Whisper가 정확히 맞고 음소도 크게 다르지 않거나 · Whisper가 거의 맞고 음소가 거의 같거나 ·
    짧은 글(최소대립쌍·알파벳 제외)은 Whisper 받아쓰기가 소리 하나 차이까지"""
    from judges import short, phone_close, CARRIER
    from phones import expected, norm
    per = c.get("per")
    if not verdict(it["say"], 0, c["dur"]):
        return False
    if c["wer"] == 0:
        # 음소 서너 개 이하(we · up · the)는 인식기가 앞뒤에 붙이는 잡음 하나로도 오류율이 크게 튀어서 Whisper만 믿는다
        return per is None or per <= PER_BAD or len(norm(expected(it["say"]))) <= 3
    if per is not None and per <= PER_OK and (c["wer"] <= 0.5 or per <= 0.02):  # 음소가 똑같으면 Whisper가 붙여 들은 것(Seesaw scene)
        return True
    if short(it["say"]) and not set(it["src"]) & {"pair", "letter"}:
        return phone_close(it["say"], c["wh"], CARRIER) and (per is None or per <= PER_BAD)
    return False


# ---------- 후처리 ----------
def finish(w, sr):
    """무음 다듬기 · 음량 맞추기(-18 LUFS, 피크 -1.5 dBFS) · 24 kHz."""
    import librosa, pyloudnorm as pyln
    w = np.asarray(w, dtype=np.float64)
    w = w - np.mean(w)
    hop, win = int(0.01 * sr), int(0.025 * sr)
    rms = librosa.feature.rms(y=w, frame_length=win, hop_length=hop, center=True)[0]
    db = 20 * np.log10(rms + 1e-9)
    thr = max(-55.0, db.max() - 42)
    on = np.where(db > thr)[0]
    if len(on):
        a = max(0, on[0] * hop - int(0.04 * sr))
        b = min(len(w), on[-1] * hop + win + int(0.12 * sr))
        w = w[a:b]
    fi, fo = int(0.006 * sr), int(0.03 * sr)
    w[:fi] *= np.linspace(0, 1, fi)
    w[-fo:] *= np.linspace(1, 0, fo)
    meter = pyln.Meter(sr)
    padded = np.concatenate([w, np.zeros(int(0.5 * sr))]) if len(w) < 0.6 * sr else w
    loud = meter.integrated_loudness(padded)
    if np.isfinite(loud):
        w = w * 10 ** ((-18.0 - loud) / 20)
    peak = np.max(np.abs(w)) + 1e-9
    if peak > 0.84:  # -1.5 dBFS
        w = w * (0.84 / peak)
    if sr != 24000:
        w = librosa.resample(w, orig_sr=sr, target_sr=24000, res_type="soxr_hq")
    return w.astype(np.float32), 24000


def to_mp3(w, sr, path):
    import imageio_ffmpeg
    tmp = path + ".tmp.wav"
    sf.write(tmp, w, sr, subtype="PCM_16")
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-i", tmp, "-ac", "1", "-ar", str(sr),
                    "-c:a", "libmp3lame", "-b:a", "48k", "-map_metadata", "-1", "-id3v2_version", "0", path], check=True)
    os.remove(tmp)


# ---------- 단계 ----------
# 발음 변환(misaki)이 틀리는 단어 — tools/tts/g2p_audit.py로 찾는다
G2P_FIX = {"tours": "tˈʊɹz", "poorer": "pˈʊɹəɹ", "poorest": "pˈʊɹᵻst", "catch": "kˈæʧ", "tvs": "tˌivˈiz", "eaten": "ˈitᵊn"}
# 낱말 하나로 읽을 때의 사전 발음 (am을 a.m.으로, an을 약하게 읽지 않게)
CITATION = {"an": "ˈæn", "am": "ˈæm", "than": "ðˈæn", "the": "ðə"}  # the는 강세를 주면 though처럼 들린다
# 같은 철자 다른 발음(read /ɹid/·/ɹɛd/): 문맥으로 못 고르는 문장 — g2p_audit.py --homographs로 찾는다
SAY_FIX = {
    "Read, read, read.": "Read, [read](/ɹˈɛd/), [read](/ɹˈɛd/).",
    "I read a book every month.": "I [read](/ɹˈid/) a book every month.",
    "I read books on the subway.": "I [read](/ɹˈid/) books on the subway.",
    # 낱말 하나로는 소리가 뭉개지는 것: 두 인식기가 모두 맞게 들은 입력 (tools/tts/README.md 참고)
    "E.": "Ee.", "H.": "H!", "Keys.": "Keys?", "Tea.": "Tea!", "Cup.": "Cup!", "Photo.": "[Photo](/fˈOtO/)!", "Fish. Fish.": "Fish! Fish!",
    "Where are my socks?": "Where [are](+1) my socks?", "Wear, wore, worn.": "Wear. Wore. Worn.",
}


def tts_input(it, g2p):
    """합성기에 넣을 글 (misaki 표기): 틀리는 발음 바로잡기 · 낱말 하나나 낱말 나열은 단어마다 강세를 살려 또렷하게
    (to · her · how처럼 문장 속에선 약하게 읽는 말도 단어 하나로는 사전 발음으로)"""
    say = SAY_FIX.get(it["say"], it["say"])
    if say != it["say"]:
        return say
    parts = re.split(r"(,\s*)", say[:-1]) if say[-1] in ".?!" else [say]
    words_only = all(re.fullmatch(r"[A-Za-z][A-Za-z'\-]*", p) for p in parts[::2])
    out = []
    for i, p in enumerate(parts):
        if i % 2:
            out.append(p)
            continue
        def fix(m):
            w = m.group(0)
            if w.lower() in G2P_FIX:
                return f"[{w}](/{G2P_FIX[w.lower()]}/)"
            if words_only and w.lower() in CITATION:
                return f"[{w}](/{CITATION[w.lower()]}/)"
            if words_only and "ˈ" not in g2p(w)[0]:
                return f"[{w}](+2)"
            return w
        out.append(re.sub(r"[A-Za-z][A-Za-z'\-]*", fix, p))
    return "".join(out) + (say[-1] if say[-1] in ".?!" else "")


class Synth:
    def __init__(self):
        from kokoro import KPipeline
        self.pipe = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M")
        self.g2p = self.pipe.g2p

    def __call__(self, text, voice, speed):
        chunks = [a for _, _, a in self.pipe(text, voice=VOICES[voice], speed=speed, split_pattern=None)]
        chunks = [c.cpu().numpy() if hasattr(c, "cpu") else np.asarray(c) for c in chunks if c is not None]
        return np.concatenate(chunks) if chunks else np.zeros(2400, np.float32)


def stage_gen(items, attempt, work, synth):
    t0, made = time.time(), 0
    speed = SPEEDS[attempt % len(SPEEDS)]
    for i, it in enumerate(items):
        out = os.path.join(work, "cand", f"{it['id']}_{attempt}.wav")
        if os.path.exists(out):
            continue
        wav = synth(it["tts"], it["voice"], speed)
        sf.write(out + ".part", wav, 24000, subtype="PCM_16", format="WAV")
        os.replace(out + ".part", out)
        made += 1
        if made % 200 == 0:
            el = time.time() - t0
            log(f"  합성 {i + 1}/{len(items)} · {el / made:.2f}s/개 · 남은 시간 약 {el / made * (len(items) - i - 1) / 60:.0f}분")


def judge_ref(it):
    """채점 기준 글: 짧은 글은 안내 문장을 붙여 받아쓰므로 기준에도 붙인다"""
    from judges import short, CARRIER
    return f"{CARRIER} {it['say']}" if short(it["say"]) else it["say"]


def stage_judge(items, attempt, work, scores, judges_, synth):
    """Whisper(짧은 글은 안내 문장을 붙여) + 음소 인식기(늘 안내 문장을 붙여 영어로 듣게). 이미 한 채점은 건너뛴다"""
    from judges import wer, to16k, short, CARRIER
    from phones import per
    todo = [it for it in items if scores.get(f"{it['id']}_{attempt}", {}).get("per") is None]
    if not todo:
        return
    whisper, phone = judges_()
    speed = SPEEDS[attempt % len(SPEEDS)]
    carrier = {v: to16k(synth(CARRIER, v, speed), 24000) for v in VOICES}
    gap = np.zeros(int(0.12 * 16000), np.float32)
    with open(os.path.join(work, "scores.jsonl"), "a", encoding="utf-8") as fp:
        for k in range(0, len(todo), 256):
            part = todo[k:k + 256]
            x16, xc, durs = [], [], []
            for it in part:
                w, sr = sf.read(os.path.join(work, "cand", f"{it['id']}_{attempt}.wav"))
                x = to16k(w, sr)
                withc = np.concatenate([carrier[it["voice"]], gap, x])
                x16.append(withc if short(it["say"]) else x)
                xc.append(withc)
                durs.append(len(w) / sr)
            old = [scores.get(f"{it['id']}_{attempt}") for it in part]
            need = [i for i, o in enumerate(old) if o is None]
            hyp = dict(zip(need, whisper([x16[i] for i in need]))) if need else {}
            ph = phone(xc)
            for i, (it, d) in enumerate(zip(part, durs)):
                row = old[i] or {"cand": f"{it['id']}_{attempt}", "wh": hyp[i], "wer": round(wer(judge_ref(it), hyp[i]), 3), "dur": round(d, 2), "c": 1}
                row["per"] = round(per(it["say"], ph[i], CARRIER), 3)
                row["ph"] = " ".join(ph[i])
                scores[row["cand"]] = row
                fp.write(json.dumps(row, ensure_ascii=False) + "\n")
            log(f"  채점 {min(k + 256, len(todo))}/{len(todo)}")


def stage_pick(items, attempt, work, scores, qa, out_dir, final=False):
    done = 0
    for it in items:
        cands = [scores[f"{it['id']}_{a}"] | {"attempt": a} for a in range(attempt + 1) if f"{it['id']}_{a}" in scores]
        if not cands:
            continue
        ok = [c for c in cands if accept(it, c)]
        status = None
        if ok:
            best, status = min(ok, key=lambda c: c["attempt"]), "ok"
        elif final:
            # Whisper가 정확히 들은 후보가 있으면 그중 음소가 가장 가까운 것(녹음은 쓴다).
            # 없으면 두 인식기 합이 가장 좋은 것 — 둘 다 크게 틀리면(Age → "ay") 녹음을 빼고 기기 음성으로
            exact = [c for c in cands if c["wer"] == 0]
            if exact:
                best, status = min(exact, key=lambda c: (c.get("per", 1), c["attempt"])), "weak"
            else:
                best = min(cands, key=lambda c: (c["wer"] + c.get("per", 1), c["attempt"]))
                status = "weak" if best["wer"] <= 0.34 and best.get("per", 0) <= 0.3 else "fail"
        if not status:
            continue
        rec = {"text": it["text"], "say": it["say"], "voice": it["voice"], "engine": "kokoro", "status": status,
               "attempt": best["attempt"], "speed": SPEEDS[best["attempt"] % len(SPEEDS)], "wer": best["wer"], "wh": best["wh"],
               "per": best.get("per")}
        if it["tts"] != it["say"]:
            rec["tts"] = it["tts"]
        mp3 = os.path.join(out_dir, f"{it['id']}.mp3")
        if status != "fail":
            w, sr = sf.read(os.path.join(work, "cand", f"{best['cand']}.wav"))
            w2, sr2 = finish(w, sr)
            to_mp3(w2, sr2, mp3)
            rec["dur"] = round(len(w2) / sr2, 2)
        elif os.path.exists(mp3):
            os.remove(mp3)  # 다시 시도했는데 못 쓰게 됐으면 예전 녹음도 뺀다
        qa[it["id"]] = rec
        done += 1
    return done


def save_qa(path, qa):
    with open(path, "w", encoding="utf-8", newline="\n") as fp:
        fp.write("{\n" + ",\n".join(f"{json.dumps(k)}: {json.dumps(qa[k], ensure_ascii=False)}" for k in sorted(qa)) + "\n}\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=os.path.normpath(os.path.join(HERE, "..", "..")))
    ap.add_argument("--work", default=os.environ.get("TTS_WORK", os.path.join(HERE, "work")))
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--src", default="")
    ap.add_argument("--max-tries", type=int, default=4)
    ap.add_argument("--retry", default="", help="이 상태(weak,fail)의 글을 다시 만든다")
    a = ap.parse_args()

    texts = json.load(open(os.path.join(a.repo, "audio-src", "texts.json"), encoding="utf-8"))["items"]
    out_dir = os.path.join(a.repo, "audio")
    qa_path = os.path.join(a.repo, "audio-src", "qa.json")
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(os.path.join(a.work, "cand"), exist_ok=True)
    qa = json.load(open(qa_path, encoding="utf-8")) if os.path.exists(qa_path) else {}
    ids = {it["id"] for it in texts}
    qa = {k: v for k, v in qa.items() if k in ids}
    scores = {}
    sp = os.path.join(a.work, "scores.jsonl")
    if os.path.exists(sp):
        from judges import wer, short
        by_id = {it["id"]: it for it in texts}
        for line in open(sp, encoding="utf-8"):
            r = json.loads(line)
            it = by_id.get(r["cand"].rsplit("_", 1)[0])
            if it and short(it["say"]) and not r.get("c"):
                continue  # 짧은 글은 안내 문장을 붙여 다시 받아쓴다
            if it:  # 채점 규칙이 바뀌었을 수 있으니 저장된 받아쓰기로 다시 계산
                r["wer"] = round(wer(judge_ref(it), r["wh"]), 3)
            scores[r["cand"]] = r
    retry = set(a.retry.split(",")) if a.retry else set()

    # 합성 입력(발음 바로잡기·강세)이 바뀐 글은 예전 후보·채점·음성을 버리고 새로 만든다
    synth = Synth()
    for it in texts:
        it["tts"] = tts_input(it, synth.g2p)
    inp_path = os.path.join(a.work, "inputs.json")
    inputs = json.load(open(inp_path, encoding="utf-8")) if os.path.exists(inp_path) else {}
    changed = 0
    for it in texts:
        was = inputs.get(it["id"], it["say"])  # 기록이 없으면 예전처럼 say를 그대로 넣었던 것
        if was != it["tts"]:
            for f in os.listdir(os.path.join(a.work, "cand")):
                if f.startswith(it["id"] + "_"):
                    os.remove(os.path.join(a.work, "cand", f))
            for k in [k for k in scores if k.rsplit("_", 1)[0] == it["id"]]:
                del scores[k]
            qa.pop(it["id"], None)
            mp3 = os.path.join(out_dir, f"{it['id']}.mp3")
            if os.path.exists(mp3):
                os.remove(mp3)
            changed += 1
        inputs[it["id"]] = it["tts"]
    with open(inp_path, "w", encoding="utf-8") as fp:
        json.dump(inputs, fp, ensure_ascii=False, indent=0)
    if changed:
        log(f"합성 입력이 바뀐 글 {changed}개 — 새로 만든다")
        save_qa(qa_path, qa)

    def need(it):
        if qa.get(it["id"], {}).get("status") in retry:
            return True
        return not os.path.exists(os.path.join(out_dir, f"{it['id']}.mp3")) and it["id"] not in qa
    pending = [it for it in texts if need(it) and (not a.src or it["src"][0] in a.src.split(","))]
    if a.limit:
        pending = pending[: a.limit]
    log(f"생성할 글 {len(pending)}개 (전체 {len(texts)})")
    if not pending:
        return
    for it in pending:
        if qa.get(it["id"], {}).get("status") in retry:
            qa.pop(it["id"], None)
    from judges import Whisper
    from phones import PhoneRec
    loaded = []

    def judges_():
        if not loaded:
            loaded.extend([Whisper(), PhoneRec()])
        return loaded

    for attempt in range(a.max_tries):
        if not pending:
            break
        log(f"[{attempt + 1}회차] 합성 {len(pending)}개 (속도 {SPEEDS[attempt % len(SPEEDS)]})")
        stage_gen(pending, attempt, a.work, synth)
        log(f"[{attempt + 1}회차] 채점")
        stage_judge(pending, attempt, a.work, scores, judges_, synth)
        n = stage_pick(pending, attempt, a.work, scores, qa, out_dir, final=attempt + 1 >= a.max_tries)
        save_qa(qa_path, qa)
        pending = [it for it in pending if it["id"] not in qa]
        st = {}
        for r in qa.values():
            st[r["status"]] = st.get(r["status"], 0) + 1
        log(f"[{attempt + 1}회차] 확정 {n}개 · 남음 {len(pending)}개 · 누적 {st}")


if __name__ == "__main__":
    main()
