"""발음 변환(misaki G2P) 점검: 합성기가 읽을 발음을 CMU 발음 사전과 비교해 크게 다른 단어, 그리고
같은 철자 다른 발음(read/read, live/live, close/close …)이 들어간 문장의 발음을 보여 준다.

  python tools/tts/g2p_audit.py            → 의심 단어 목록
  python tools/tts/g2p_audit.py --homographs → 동형이음어 문장별 발음
"""
import argparse, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from judges import cmu, lev  # noqa

# CMU(ARPAbet) → misaki 미국식 음소
ARPA = {"AA": "ɑ", "AE": "æ", "AH": "ʌ", "AO": "ɔ", "AW": "W", "AY": "I", "EH": "ɛ", "ER": "ɜɹ", "EY": "A", "IH": "ɪ", "IY": "i",
        "OW": "O", "OY": "Y", "UH": "ʊ", "UW": "u", "B": "b", "CH": "ʧ", "D": "d", "DH": "ð", "F": "f", "G": "ɡ", "HH": "h", "JH": "ʤ",
        "K": "k", "L": "l", "M": "m", "N": "n", "NG": "ŋ", "P": "p", "R": "ɹ", "S": "s", "SH": "ʃ", "T": "t", "TH": "θ", "V": "v",
        "W": "w", "Y": "j", "Z": "z", "ZH": "ʒ"}
# 비교할 때 같게 보는 것: 약모음 · 탄설음 · r 모음 · cot/caught
COARSE = str.maketrans({"ᵊ": "ə", "ʌ": "ə", "ɐ": "ə", "ᵻ": "ɪ", "T": "t", "ɾ": "t", "ɔ": "ɑ", "ɚ": "ə"})

HOMOGRAPHS = ["read", "live", "lives", "close", "closed", "use", "used", "lead", "wind", "tear", "tears", "bow", "minute", "present",
              "record", "desert", "object", "content", "wound", "row", "does", "wound", "polish", "excuse", "refuse", "house",
              "advocate", "estimate", "separate", "graduate", "moderate", "perfect", "produce", "project", "conduct", "contract",
              "permit", "suspect", "subject", "progress", "increase", "decrease", "invite", "abuse", "bass", "dove", "sow", "sewer",
              "putting", "resume", "second", "united", "wednesday", "the", "a", "an", "to", "that", "can", "am", "are", "was"]


def coarse(ps):
    s = re.sub(r"[ˈˌ.,!?;:'\"“”()\-—…]", "", ps).replace("əɹ", "ɜɹ").replace("ɜɹ", "əɹ")
    return s.translate(COARSE).replace(" ", "")


def cmu_variants(word):
    out = set()
    for v in cmu().get(word, ()):
        out.add(coarse("".join(ARPA.get(p, p) for p in v.split())))
    return out


def g2p():
    from misaki import en, espeak
    return en.G2P(trf=False, british=False, fallback=espeak.EspeakFallback(british=False))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default=os.path.normpath(os.path.join(HERE, "..", "..")))
    ap.add_argument("--homographs", action="store_true")
    a = ap.parse_args()
    items = json.load(open(os.path.join(a.repo, "audio-src", "texts.json"), encoding="utf-8"))["items"]
    G = g2p()
    if a.homographs:
        hs = set(HOMOGRAPHS) - {"the", "a", "an", "to", "that", "can", "am", "are", "was"}
        for it in items:
            words = re.findall(r"[a-z']+", it["say"].lower())
            hit = [w for w in words if w in hs]
            if hit and len(words) > 1:
                _, toks = G(it["say"])
                ps = " ".join(f"{t.text}=/{t.phonemes}/" for t in toks if t.text.lower() in hs)
                print(f"{it['say'][:70]:70} {ps}")
        return
    words = sorted({w for it in items for w in re.findall(r"[a-z][a-z']*", it["say"].lower())})
    bad = []
    for w in words:
        vs = cmu_variants(w)
        if not vs:
            continue
        ps, _ = G(w)
        m = coarse(ps)
        d = min(lev(list(m), list(v)) for v in vs)
        if d >= 2 or (d == 1 and len(m) <= 3):
            bad.append((d, w, ps, sorted(vs)[:3]))
    for d, w, ps, vs in sorted(bad, key=lambda x: -x[0]):
        print(f"{d} {w:16} misaki /{ps}/  cmu {' · '.join(vs)}")
    print(f"단어 {len(words)}개 중 의심 {len(bad)}개")


if __name__ == "__main__":
    main()
