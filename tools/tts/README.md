# 녹음 음성 만들기

앱의 발음 음성(`audio/*.mp3`)은 이 폴더의 스크립트로 미리 만들어 둔 파일입니다.
기기 음성 합성(Web Speech)은 기기마다 품질이 들쭉날쭉해서, 앱에 고정으로 나오는 모든 단어·문장을 같은 AI 원어민 음성으로 녹음해 두었습니다.
문법 드릴처럼 그때그때 만들어지는 문장만 기기의 영어 음성으로 읽습니다.

## 엔진: Kokoro-82M

[Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) (hexgrad, **Apache-2.0** — 상업적 사용 가능) · 미국 영어
- 여성 `af_heart`, 남성 `am_fenrir` — 같은 문장 10개 비교에서 자연스러움 예측 점수(UTMOS)가 가장 높은 조합 (af_heart 4.32 · am_fenrir 4.32 · am_michael 4.11 · am_puck 4.14)
- 기본 속도 0.95 (학습용으로 아주 살짝 또박또박)

## 만드는 과정

| 단계 | 내용 |
|---|---|
| 글 목록 | `node scripts/audio.mjs texts` → `audio-src/texts.json` (화면과 똑같은 규칙으로 소리 나는 모든 글, 숫자·가격·시각·연도는 글자로) |
| 합성 입력 | 발음 변환(misaki)이 틀리는 단어·문장을 음소로 바로잡기(`gen_audio.py`의 `G2P_FIX`·`SAY_FIX`: tours, I **read** a book every month …), 낱말 하나·낱말 나열은 단어마다 강세를 살려 사전 발음으로(to · her · am) |
| 합성 | Kokoro (GPU에서 글 하나에 약 0.15초) |
| 검사 1 | Whisper large-v3-turbo로 다시 받아써서 원문과 **단어 단위**로 비교. 동음이의어(four/for, right/write)는 CMU 발음 사전으로 같은 소리인지 판정, 사전에 없는 이름은 철자 유사도로 판정. 한두 단어짜리는 앞에 안내 문장(The word is)을 붙여 받아쓴다 |
| 검사 2 | 음소 인식기(wav2vec2 espeak, 언어 모델 없음)로 들린 소리를 음소로 적어 espeak 발음과 비교(`phones.py`). Whisper가 맞다고 해도 음소가 크게 다르면 버리고, Whisper가 문맥 탓에 잘못 받아쓴 것(See, saw, seen → Seesaw scene)은 음소가 거의 같으면 받아들인다 |
| 재시도 | 틀리면 속도를 바꿔(0.9 · 1.0 · 0.85 · 1.05) 다시 만들기 (Kokoro는 같은 입력이면 같은 소리를 내기 때문) |
| 후처리 | 앞뒤 무음 정리, 음량 맞춤(-18 LUFS, 피크 -1.5 dBFS), 24 kHz 모노 MP3 48 kbps |

품질 기록은 `audio-src/qa.json`에 있습니다(`status`: ok · weak(검사 일부 불일치, 녹음은 씀) · fail(녹음 없음 → 앱은 기기 음성으로 대신), `wh`: Whisper 받아쓰기, `per`: 음소 오류율).

발음 변환 점검: `python tools/tts/g2p_audit.py`(CMU 사전과 크게 다른 단어) · `--homographs`(read/live/close처럼 철자는 같고 발음이 다른 단어가 든 문장).

## 다시 만들기

```bash
# 1) 앱에서 소리 나는 글 목록 (데이터를 고친 뒤마다)
node scripts/audio.mjs texts

# 2) 가상환경 (CUDA 12.8 GPU 기준)
python -m venv .venv
.venv/Scripts/pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu128
.venv/Scripts/pip install -r tools/tts/requirements.txt

# 3) 새로 생긴 글만 합성·검사 (이미 있는 MP3는 건너뜀)
.venv/Scripts/python tools/tts/gen_audio.py
#    weak·fail 다시 시도:  --retry weak,fail
#    음소 검사 없이 만든 예전 녹음 점검:  python tools/tts/recheck.py → --retry weak

# 4) 앱이 읽는 목록 갱신 + 서비스 워커
node scripts/audio.mjs index
npm run build:sw
```

- 같은 글·같은 목소리면 파일 이름(`audio/<id>.mp3`)이 같아서, 바뀐 글만 새로 만들어집니다.
- 녹음을 통째로 다시 만들 때는 `js/core/audiokey.js`의 `AUDIO_REV`와 `js/core/tts.js`·`scripts/gen-sw.mjs`의 보관함 이름을 함께 올려, 기기에 보관된 예전 녹음이 섞이지 않게 합니다.
