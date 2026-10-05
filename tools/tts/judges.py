"""생성 음성 채점: Whisper로 다시 받아써서 원문과 단어 단위로 비교한다.

동음이의어(four/for, right/write, two/to)는 CMU 발음 사전으로 같은 소리면 같은 단어로 본다.
사전에 없는 말(이름 등)은 철자가 비슷하면 같은 것으로 본다(Jisu ≈ Jisoo).
"""
import os
import re
import numpy as np
import torch
import librosa
from num2words import num2words

HERE = os.path.dirname(os.path.abspath(__file__))
DICT = os.path.join(HERE, "..", "pron", "cmudict.dict")

# ---------- 발음 사전 ----------
_cmu = None


def cmu():
    global _cmu
    if _cmu is None:
        _cmu = {}
        with open(DICT, encoding="utf-8") as fp:
            for line in fp:
                m = re.match(r"^(\S+?)(?:\(\d+\))? (.+?)(?:\s+#.*)?$", line.strip())
                if m:
                    _cmu.setdefault(m.group(1), set()).add(re.sub(r"\d", "", m.group(2)))
    return _cmu


# ---------- 정규화 ----------
CONTR = {
    "i'm": "i am", "you're": "you are", "we're": "we are", "they're": "they are", "it's": "it is", "that's": "that is",
    "what's": "what is", "where's": "where is", "who's": "who is", "how's": "how is", "there's": "there is", "here's": "here is",
    "let's": "let us", "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have",
    "i'll": "i will", "you'll": "you will", "he'll": "he will", "she'll": "she will", "it'll": "it will", "we'll": "we will", "they'll": "they will",
    "i'd": "i would", "you'd": "you would", "he'd": "he would", "she'd": "she would", "we'd": "we would", "they'd": "they would",
    "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "don't": "do not", "doesn't": "does not",
    "didn't": "did not", "haven't": "have not", "hasn't": "has not", "won't": "will not", "can't": "can not", "cannot": "can not",
    "couldn't": "could not", "shouldn't": "should not", "mustn't": "must not", "he's": "he is", "she's": "she is", "ok": "okay",
}


def nw(n, **kw):
    """num2words는 영국식 'and'를 넣는다 (one hundred and five) — 미국식으로 빼고 비교"""
    return num2words(n, **kw).replace(" and ", " ").replace(",", "")


def _money(m):
    d = int(m.group(1).replace(",", ""))
    c = int(m.group(2)) if m.group(2) else 0
    out = []
    if d:
        out.append(f"{nw(d)} dollar{'s' if d != 1 else ''}")
    if c:
        out.append(f"{nw(c)} cent{'s' if c != 1 else ''}")
    return " and ".join(out) or "zero dollars"


def _time(m):
    h, mi = int(m.group(1)), int(m.group(2))
    h12 = nw(h % 12 or 12)
    if mi == 0:
        return f"{h12} o'clock"
    return f"{h12} {'oh ' + nw(mi) if mi < 10 else nw(mi)}"


def _pair(a, b):
    """두 자리씩 끊어 읽기: 4.05 → four oh five · 73.95 → seventy-three ninety-five · 2850 → twenty-eight fifty"""
    b = int(b)
    return f"{nw(int(a))} {'oh ' + nw(b) if 0 < b < 10 else nw(b) if b else 'hundred'}"


def norm_words(s, mode="base", expand=True):
    """비교용 단어 목록.
    mode: base(1998 → nineteen ninety-eight) · noyear(1250 → one thousand two hundred fifty)
          digits(911 → nine one one) · pairs($73.95·4095·4.05 → 두 자리씩 끊어 읽기)
    expand: 축약형 풀기 (they're → they are) — 끄면 축약형 그대로(they're ≈ there 발음 비교용)"""
    s = str(s).lower().replace("’", "'").replace("‘", "'")
    if mode == "pairs":
        s = re.sub(r"\$?(\d{1,3})[.:](\d{2})\b", lambda m: _pair(m.group(1), m.group(2)), s)
        s = re.sub(r"\b(\d{1,2})(\d{2})\b", lambda m: _pair(m.group(1), m.group(2)), s)
    s = re.sub(r"\$(\d[\d,]*)(?:\.(\d{2}))?", _money, s)
    s = re.sub(r"\b(\d{1,2}):(\d{2})\b", _time, s)
    s = re.sub(r"\b(\d+)(st|nd|rd|th)\b", lambda m: nw(int(m.group(1)), to="ordinal"), s)
    if mode == "digits":
        s = re.sub(r"\d", lambda m: " " + nw(int(m.group(0))) + " ", s.replace(",", ""))
    s = re.sub(r"\b(\d{1,3}(?:,\d{3})+)\b", lambda m: nw(int(m.group(1).replace(",", ""))), s)
    if mode == "base":
        s = re.sub(r"\b(1[1-9]\d\d|20\d\d)\b", lambda m: nw(int(m.group(1)), to="year"), s)
    s = re.sub(r"(\d+)\s*%", lambda m: nw(int(m.group(1))) + " percent", s)
    s = re.sub(r"\d+", lambda m: nw(int(m.group(0))), s)
    s = s.replace("a.m.", "a m").replace("p.m.", "p m")
    s = re.sub(r"[^a-z' ]+", " ", s)
    out = []
    for w in s.split():
        w = w.strip("'")
        if not w:
            continue
        out.extend(CONTR.get(w, w).split() if expand else [w])
    return out


def collapse(words):
    """Whisper가 짧은 소리에서 같은 말을 되풀이하는 환각(Bank. Bank. Bank. …) 걷어 내기"""
    for n in range(1, 5):
        i, out = 0, []
        while i < len(words):
            out.extend(words[i:i + n])
            j = i + n
            while j + n <= len(words) and words[j:j + n] == words[i:i + n]:
                j += n
            i = j if j > i + n else i + n
        words = out
    return words


def lev(a, b, eq=lambda x, y: x == y):
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (0 if eq(ca, cb) else 1)))
        prev = cur
    return prev[-1]


EQUIV = [{"a", "one"}, {"okay", "ok"}, {"alright", "all"}, {"hi", "high"}]


def same_word(a, b):
    if a == b:
        return True
    if any(a in e and b in e for e in EQUIV):
        return True
    d = cmu()
    pa, pb = d.get(a), d.get(b)
    if pa and pb:
        return bool(pa & pb)  # 같은 소리 (four/for, right/write)
    if pa or pb:  # 한쪽만 사전에 있음: 표기 차이일 때만 (첫 글자가 같고 아주 비슷)
        return a[0] == b[0] and lev(a, b) <= max(1, len(a) // 4)
    # 둘 다 사전에 없는 말(이름 등): 철자가 비슷하면 같다고 본다 (Jisu ≈ Jisoo)
    return a[0] == b[0] and lev(a, b) <= max(1, (len(a) + 1) // 2)


def phones(word):
    p = cmu().get(word)
    return min(p, key=len).split() if p else list(word)


def wer(ref, hyp):
    """단어 단위 오류율 (숫자 읽는 방식·축약형·되풀이 환각·띄어쓰기 차이는 가장 유리한 쪽으로 본다)"""
    best = 9e9
    for expand in (True, False):
        r = norm_words(ref, expand=expand)
        for mode in ("base", "noyear", "digits", "pairs"):
            h0 = norm_words(hyp, mode, expand=expand)
            for h in (h0, collapse(h0)):  # 되풀이 환각을 걷어 낸 것도 (five five five처럼 진짜 반복은 원래 것으로 맞음)
                variants = [h]
                # "100" → one hundred / 원문은 hundred · a thousand
                if "one" in h and "one" not in r:
                    variants.append([w for k, w in enumerate(h) if not (w == "one" and k + 1 < len(h) and h[k + 1] in ("hundred", "thousand", "million"))])
                for v in variants:
                    if "".join(r) == "".join(v):  # 띄어쓰기만 다른 경우 (every day / everyday · seesaw)
                        return 0.0
                    best = min(best, lev(r, v, same_word) / max(1, len(r)))
    return best


def phone_close(ref, hyp, carrier=""):
    """짧은 글을 받아쓴 결과가 소리 하나 차이 이내인가 (tea/see처럼 인식기가 짧은 단어를 헷갈리는 경우)"""
    r = norm_words(ref)
    h = norm_words(hyp)
    c = norm_words(carrier)
    if h[:len(c)] == c:
        h = h[len(c):]
    pr = [p for w in r for p in phones(w)]
    ph = [p for w in h for p in phones(w)]
    return bool(ph) and lev(pr, ph) <= 1 and len(pr) >= 3


CARRIER = "The word is"


def short(text):
    """단어 한두 개짜리: Whisper가 문맥 없이 잘못 듣기 쉬워서, 앞에 '안내 문장'을 붙여 받아쓴다"""
    return len(norm_words(text)) <= 2


def to16k(w, sr):
    w = np.asarray(w, dtype=np.float32)
    if w.ndim > 1:
        w = w.mean(1)
    return librosa.resample(w, orig_sr=sr, target_sr=16000) if sr != 16000 else w


# ---------- 인식기 ----------
class Whisper:
    def __init__(self):
        from transformers import pipeline
        self.p = pipeline("automatic-speech-recognition", model="openai/whisper-large-v3-turbo",
                          dtype=torch.float16, device="cuda:0")

    def __call__(self, wavs16, batch_size=16):
        pad = np.zeros(4000, np.float32)
        items = [{"raw": np.concatenate([pad, x, pad]), "sampling_rate": 16000} for x in wavs16]
        outs = self.p(items, batch_size=batch_size,
                      generate_kwargs={"language": "english", "task": "transcribe", "max_new_tokens": 96})
        return [o["text"].strip() for o in outs]


class MOS:
    def __init__(self):
        self.m = torch.hub.load("tarepan/SpeechMOS:v1.2.0", "utmos22_strong", trust_repo=True).cuda().eval()

    @torch.no_grad()
    def __call__(self, wavs16):
        return [float(self.m(torch.from_numpy(x)[None].cuda(), 16000)[0]) for x in wavs16]


def free(*objs):
    for o in objs:
        del o
    import gc
    gc.collect()
    torch.cuda.empty_cache()
