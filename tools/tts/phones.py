"""두 번째 채점: 음소 인식기(wav2vec2, 언어 모델 없음)로 실제 소리를 음소로 받아 적어 기대 발음과 비교한다.

Whisper는 문맥으로 단어를 '추측'해서, 짧은 말이나 낱말 나열(See, saw, seen)을 잘못 받아쓰고(Seesaw scene)
반대로 살짝 틀린 발음을 맞는 단어로 고쳐 듣기도 한다. 음소 인식기는 들린 소리를 그대로 적으므로 서로 보완된다.

- 기대 발음: espeak-ng (en-us) — 인식기가 학습한 음소 표기와 같다.
- 비교: 미국 영어에서 흔한 변이(cot/caught 합류, 탄설음 t, 약모음, 길이 표시)는 같게 보고,
  가까운 소리(ɪ/i, t/d, s/z …)는 반만 틀린 것으로 센다.
"""
import re
import unicodedata
import numpy as np
import torch

MODEL = "facebook/wav2vec2-lv-60-espeak-cv-ft"

_esp = None


def _espeak_lib():
    """pip로 깔린 espeak-ng 라이브러리를 쓴다 (시스템에 따로 설치하지 않아도 되게)"""
    import espeakng_loader
    from phonemizer.backend.espeak.wrapper import EspeakWrapper
    EspeakWrapper.set_library(espeakng_loader.get_library_path())
    EspeakWrapper.set_data_path(espeakng_loader.get_data_path())


def expected(text):
    """espeak 음소 목록 (단어 경계 없이)"""
    global _esp
    if _esp is None:
        _espeak_lib()
        from phonemizer.backend import EspeakBackend
        _esp = EspeakBackend("en-us", preserve_punctuation=False, with_stress=False)
    from phonemizer.separator import Separator
    out = _esp.phonemize([text], separator=Separator(phone=" ", word=" | ", syllable=""), strip=True)[0]
    return [p for p in out.split() if p != "|"]


# ---------- 음소 정규화 ----------
UNITS = ["tʃ", "dʒ"]
# 이중모음은 두 소리로 나눈다 (인식기가 ɔɪ를 ɑ ɪ로 적는 등) — boy/buy 같은 구별은 Whisper가 맡는다
MAP = {"ɚ": "əɹ", "ɝ": "əɹ", "ɜ": "əɹ", "ɐ": "ə", "ᵻ": "ɪ", "ɨ": "ɪ", "ʌ": "ə", "ɾ": "t", "ʔ": "t", "ɫ": "l",
       "ɔ": "ɑ", "o": "ɑ", "a": "ɑ", "ɒ": "ɑ", "e": "ɛ", "r": "ɹ", "ɡ": "g", "x": "k", "ç": "h", "ʏ": "ʊ", "y": "u", "ø": "ə"}
NEAR = [{"ɪ", "i"}, {"ʊ", "u"}, {"ɛ", "æ"}, {"ə", "ɪ"}, {"ə", "ʊ"}, {"ə", "ɑ"}, {"ə", "ɛ"}, {"t", "d"}, {"s", "z"},
        {"ɛ", "ɪ"}, {"θ", "ð"}, {"p", "b"}, {"k", "g"}, {"ɑ", "æ"}, {"n", "ŋ"}, {"tʃ", "dʒ"}, {"tʃ", "ʃ"}]
CHEAP = {"ə": 0.5, "ɹ": 0.5}  # 약모음·r 빛깔은 넣고 빼도 반만 (kitten → kit-ən, hair → heə)


def norm(tokens):
    out = []
    for tok in tokens:
        t = unicodedata.normalize("NFD", tok)
        t = "".join(c for c in t if not unicodedata.combining(c))
        t = re.sub(r"[ːˑˈˌ0-9]", "", t)
        i = 0
        while i < len(t):
            u = next((u for u in UNITS if t.startswith(u, i)), None)
            if u:
                out.append(u)
                i += len(u)
                continue
            m = MAP.get(t[i], t[i])
            for c in (["ə", "ɹ"] if m == "əɹ" else [m] if m else []):
                if not (out and out[-1] == c):  # 같은 소리 겹침 (picture on의 r, smile의 l l)
                    out.append(c)
            i += 1
    return out


def dist(a, b):
    """가중 편집 거리: 넣기·빼기 1(약모음·r은 0.5), 다른 소리 1, 가까운 소리 0.5"""
    def sub(x, y):
        return 0 if x == y else 0.5 if any(x in s and y in s for s in NEAR) else 1
    prev = [0.0]
    for y in b:
        prev.append(prev[-1] + CHEAP.get(y, 1))
    for x in a:
        cur = [prev[0] + CHEAP.get(x, 1)]
        for j, y in enumerate(b, 1):
            cur.append(min(prev[j] + CHEAP.get(x, 1), cur[j - 1] + CHEAP.get(y, 1), prev[j - 1] + sub(x, y)))
        prev = cur
    return prev[-1]


def per(text, rec_tokens, carrier=""):
    """음소 오류율 (0 = 똑같음). carrier: 소리 앞에 붙인 안내 문장 — 기대 발음에도 붙여 비교하고, 글의 음소 수로 나눈다"""
    e = norm(expected(text))
    c = norm(expected(carrier)) if carrier else []
    return dist(c + e, norm(rec_tokens)) / max(1, len(e))


# ---------- 인식기 ----------
class PhoneRec:
    def __init__(self):
        from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
        _espeak_lib()  # 토크나이저가 만들어질 때 espeak을 찾는다
        self.proc = Wav2Vec2Processor.from_pretrained(MODEL)
        self.model = Wav2Vec2ForCTC.from_pretrained(MODEL).cuda().eval()

    @torch.no_grad()
    def __call__(self, wavs16, batch_size=16):
        pad = np.zeros(2400, np.float32)
        out = []
        for k in range(0, len(wavs16), batch_size):
            part = [np.concatenate([pad, np.asarray(w, np.float32), pad]) for w in wavs16[k:k + batch_size]]
            inp = self.proc(part, sampling_rate=16000, return_tensors="pt", padding=True)
            am = inp.get("attention_mask")
            logits = self.model(inp.input_values.cuda(), attention_mask=am.cuda() if am is not None else None).logits
            out += [s.split() for s in self.proc.batch_decode(logits.argmax(-1).cpu())]
        return out
