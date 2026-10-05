"""이미 만든 녹음(audio/*.mp3)을 음소 인식기로 다시 듣고, 음소가 크게 다른 것을 weak로 표시한다.
그다음 `gen_audio.py --retry weak`로 다시 만든다. (Whisper만으로 검사하던 때 만든 녹음 점검용)

  python tools/tts/recheck.py [--work DIR] [--dry]
"""
import argparse, json, os, sys
import numpy as np
import soundfile as sf

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from judges import to16k, CARRIER  # noqa
from phones import PhoneRec, per, expected, norm  # noqa
from gen_audio import Synth, PER_BAD, save_qa, log  # noqa


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=os.path.normpath(os.path.join(HERE, "..", "..")))
    ap.add_argument("--dry", action="store_true", help="표시하지 않고 목록만")
    a = ap.parse_args()
    qa_path = os.path.join(a.repo, "audio-src", "qa.json")
    qa = json.load(open(qa_path, encoding="utf-8"))
    ids = [k for k, v in qa.items() if v["status"] == "ok" and v.get("per") is None and os.path.exists(os.path.join(a.repo, "audio", f"{k}.mp3"))]
    log(f"음소 검사 안 한 녹음 {len(ids)}개")
    synth = Synth()
    car = {v: to16k(synth(CARRIER, v, 0.95), 24000) for v in ("f", "m")}
    gap = np.zeros(int(0.12 * 16000), np.float32)
    rec = PhoneRec()
    bad = []
    for k0 in range(0, len(ids), 512):
        part = ids[k0:k0 + 512]
        xs = []
        for k in part:
            w, sr = sf.read(os.path.join(a.repo, "audio", f"{k}.mp3"))
            xs.append(np.concatenate([car[qa[k]["voice"]], gap, to16k(w, sr)]))
        for k, ph in zip(part, rec(xs)):
            p = round(per(qa[k]["say"], ph, CARRIER), 3)
            if not a.dry:
                qa[k]["per"] = p
            if p > PER_BAD and len(norm(expected(qa[k]["say"]))) > 3:  # 음소 서너 개 이하는 오류율이 잡음에 크게 튄다
                bad.append((p, k, qa[k]["say"], " ".join(ph)))
                if not a.dry:
                    qa[k]["status"] = "weak"
        log(f"  {min(k0 + 512, len(ids))}/{len(ids)}")
    for p, k, s, ph in sorted(bad, reverse=True):
        print(f"{p:5.2f} {s:40} {ph}")
    log(f"음소가 크게 다른 녹음 {len(bad)}개{'' if a.dry else ' → weak (다시 만들기: gen_audio.py --retry weak)'}")
    if not a.dry:
        save_qa(qa_path, qa)


if __name__ == "__main__":
    main()
