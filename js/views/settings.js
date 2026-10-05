import { h, icon, toast, confirmSheet, downloadText, speakBtn } from '../core/ui.js';
import { state, setSetting, exportJSON, importJSON, resetAll, dayKey } from '../core/store.js';
import { enVoices, currentVoice, setVoice, speak, onVoicesChanged, ttsSupported, recordingCount } from '../core/tts.js';
import { offlineCard } from './offlinecard.js';
import { isStandalone } from '../core/offline.js';
import { VOICE_SAMPLE, RATE_SAMPLE } from '../data/speech.js';
import { VERSION, RELEASED } from '../version.js';

const REPO = 'https://github.com/dubuzzang/english-for-koreans';

function field(title, sub, control) {
  return h('div', { class: control?.classList?.contains('seg') ? 'field stack' : 'field' }, h('div', { class: 'f-main' }, h('div', { class: 'f-title' }, title), sub ? h('div', { class: 'f-sub' }, sub) : null), control);
}

function sw(key, onChange) {
  const input = h('input', { type: 'checkbox', role: 'switch', 'aria-label': key });
  input.checked = !!state.settings[key];
  input.addEventListener('change', () => { setSetting(key, input.checked); onChange?.(input.checked); });
  return h('label', { class: 'switch' }, input, h('span'));
}

function seg(key, options, onChange) {
  const box = h('div', { class: 'seg' });
  const render = () => box.replaceChildren(...options.map(([v, label]) => h('button', {
    class: state.settings[key] === v ? 'on' : '', type: 'button',
    onclick: () => { setSetting(key, v); render(); onChange?.(v); },
  }, label)));
  render();
  return box;
}

export function voiceGuide() {
  return h('div', { class: 'col small text-2', style: { gap: '8px' } },
    h('div', null, h('b', null, '📱 아이폰·아이패드'), h('br'), '설정 → 손쉬운 사용 → 읽기 및 말하기 → 음성 → 영어 → 더 자연스러운 "향상된" 음성 다운로드'),
    h('div', null, h('b', null, '🤖 안드로이드'), h('br'), '설정 → 일반(시스템) → 텍스트 음성 변환(TTS) → Google 음성 엔진 → 음성 데이터 설치 → 영어(미국). Chrome 브라우저를 추천해요.'),
    h('div', null, h('b', null, '💻 Windows'), h('br'), 'Edge 브라우저는 자연스러운 온라인 영어 음성을 바로 제공해요.'),
    h('div', null, '설치 후 이 페이지를 새로고침하세요.'),
  );
}

export default {
  tab: null,
  title: '설정',
  render(root) {
    // 녹음 음성 상태
    const recStatus = h('div', { class: 'f-sub' });
    // 보조: 기기 음성 선택 (녹음이 없는 문장용)
    const voiceSel = h('select', { class: 'select', 'aria-label': '기기 음성 선택' });
    const voiceStatus = h('div', { class: 'f-sub' });
    const renderVoices = () => {
      const n = recordingCount();
      recStatus.textContent = n ? `AI 원어민 음성으로 미리 녹음한 단어·문장 ${n.toLocaleString('ko-KR')}개 · 회화는 역할마다 남녀 목소리` : '녹음 음성을 불러오는 중이거나 연결이 끊겼어요';
      const vs = enVoices();
      voiceSel.replaceChildren(h('option', { value: '' }, vs.length ? '자동 선택' : '없음'), ...vs.map((v) => h('option', { value: v.voiceURI }, `${v.name} (${v.lang})`)));
      voiceSel.value = state.settings.voice || '';
      voiceSel.disabled = !vs.length;
      voiceStatus.textContent = !ttsSupported || !vs.length
        ? '이 기기에서 영어 음성을 찾지 못했어요 — 녹음이 없는 문장(문법 드릴 등)은 소리 없이 진행돼요'
        : `녹음이 없는 문장(문법 드릴이 만든 문장 등)을 읽을 때 써요 · 사용 중: ${currentVoice()?.name || '-'}`;
    };
    voiceSel.addEventListener('change', () => { setVoice(voiceSel.value); setSetting('voice', voiceSel.value); renderVoices(); speak('This is a sentence from a grammar drill.'); });
    renderVoices();
    const off = onVoicesChanged(renderVoices);
    const offline = offlineCard();

    // 속도: 저장값 0.9가 자연스러운 속도(1.00×)
    const rateLabel = h('span', { class: 'badge brand' });
    const rate = h('input', { type: 'range', class: 'range', min: '0.6', max: '1.2', step: '0.05', 'aria-label': '말하기 속도' });
    rate.value = String(state.settings.rate);
    const showRate = () => { rateLabel.textContent = `${(Number(rate.value) / 0.9).toFixed(2)}×`; };
    showRate();
    rate.addEventListener('input', showRate);
    rate.addEventListener('change', () => { setSetting('rate', Number(rate.value)); speak(RATE_SAMPLE); });

    const fileInput = h('input', { type: 'file', accept: 'application/json,.json', hidden: true });
    fileInput.addEventListener('change', async () => {
      const f = fileInput.files?.[0];
      if (!f) return;
      try {
        importJSON(await f.text());
        toast('백업을 불러왔어요', 'ok');
        setTimeout(() => location.reload(), 600);
      } catch (e) {
        toast(e.message || '불러오기에 실패했어요', 'bad');
      }
      fileInput.value = '';
    });

    root.append(
      h('div', { class: 'page-head' }, h('h1', null, '설정')),

      h('div', { class: 'section-head' }, h('div', { class: 'section-title' }, '학습')),
      h('div', { class: 'list' },
        field('하루 목표', '홈 화면의 목표 링에 표시돼요', seg('goal', [[20, '가볍게'], [40, '보통'], [80, '열심히'], [120, '집중']])),
        field('하루 새 단어', '"새 단어 늘리기" 권장량', seg('newPerDay', [[5, '5'], [10, '10'], [15, '15'], [20, '20']])),
        field('목표 기억률', '높을수록 복습이 잦아져요(권장 90%)', seg('retention', [[0.85, '85%'], [0.9, '90%'], [0.95, '95%']])),
      ),

      h('div', { class: 'section-head mt-24' }, h('div', { class: 'section-title' }, '소리')),
      h('div', { class: 'list' },
        h('div', { class: 'field' }, h('div', { class: 'f-main' }, h('div', { class: 'f-title' }, '🎧 영어 발음 음성 (미국 영어)'), recStatus), speakBtn(VOICE_SAMPLE, { label: '음성 들어 보기' })),
        h('div', { class: 'field', style: { flexWrap: 'wrap' } },
          h('div', { class: 'f-main' }, h('div', { class: 'f-title' }, '말하기 속도 ', rateLabel), h('div', { class: 'f-sub' }, '1.00× = 원어민 보통 속도 · 🐢 버튼은 이 속도의 약 70%')),
          h('div', { style: { width: '100%' } }, rate),
        ),
        field('단어 자동 재생', '새 단어와 카드를 보여줄 때 바로 읽기', sw('autoplay')),
        field('듣기 문제 포함', '레슨에 "듣고 고르기" 문제 넣기', sw('listening')),
        field('말하기 문제 포함', '레슨 끝에 소리 내어 읽기(음성 인식)', sw('speaking')),
        field('효과음', '정답·오답 소리', sw('sfx')),
        field('진동', '지원하는 기기에서만', sw('vibrate')),
      ),
      h('div', { class: 'mt-12' }, offline),
      h('details', { class: 'card flat mt-12' },
        h('summary', { class: 'bold', style: { cursor: 'pointer' } }, '🔈 보조 음성 (기기 음성)'),
        h('div', { class: 'list mt-12' }, h('div', { class: 'field' }, h('div', { class: 'f-main' }, h('div', { class: 'f-title' }, '기기 영어 음성'), voiceStatus), voiceSel)),
        h('p', { class: 'small text-2 mt-12' }, '문법 드릴이 그때그때 만드는 문장처럼 녹음이 없는 문장은 기기의 영어 음성으로 읽어요. 더 자연스러운 음성을 쓰려면:'),
        h('div', { class: 'mt-8' }, voiceGuide()),
      ),

      h('div', { class: 'section-head mt-24' }, h('div', { class: 'section-title' }, '표시')),
      h('div', { class: 'list' },
        field('한글 발음 표기', '[헐로우]처럼 표시하고 강세 음절은 굵게 — 익숙해지면 꺼 보세요', sw('hangul')),
        field('화면 테마', null, seg('theme', [['auto', '자동'], ['light', '라이트'], ['dark', '다크']])),
      ),

      h('div', { class: 'section-head mt-24' }, h('div', { class: 'section-title' }, '앱 설치·오프라인')),
      h('div', { class: 'list' },
        h('a', { class: 'list-item', href: '#/install' },
          h('div', { class: 'li-icon', style: { fontSize: '20px' } }, '📲'),
          h('div', { class: 'li-main' },
            h('div', { class: 'li-title' }, isStandalone() ? '앱으로 실행 중 · 오프라인 저장' : '휴대폰에 앱으로 설치'),
            h('div', { class: 'li-sub' }, '설치하면 녹음·글꼴까지 저장돼 데이터 없이 학습 · 학습 기록 옮기기')),
          icon('chev-right', 20))),

      h('div', { class: 'section-head mt-24' }, h('div', { class: 'section-title' }, '데이터')),
      h('div', { class: 'list' },
        h('button', { class: 'list-item', type: 'button', onclick: () => { downloadText(`hello-english-backup-${dayKey()}.json`, exportJSON()); toast('백업 파일을 저장했어요', 'ok'); } },
          h('div', { class: 'li-icon' }, icon('download', 20)), h('div', { class: 'li-main' }, h('div', { class: 'li-title' }, '백업 내보내기'), h('div', { class: 'li-sub' }, '학습 기록을 파일로 저장 (기기 이동 시)'))),
        h('button', { class: 'list-item', type: 'button', onclick: () => fileInput.click() },
          h('div', { class: 'li-icon' }, icon('upload', 20)), h('div', { class: 'li-main' }, h('div', { class: 'li-title' }, '백업 불러오기'), h('div', { class: 'li-sub' }, '저장한 파일로 기록 복원'))),
        h('button', { class: 'list-item', type: 'button', onclick: async () => {
          if (await confirmSheet('레슨 기록, 복습 카드, XP가 모두 지워져요. 되돌릴 수 없어요.', { title: '모든 기록을 지울까요?', ok: '모두 지우기', danger: true })) {
            resetAll();
            location.hash = '#/home';
            location.reload();
          }
        } },
          h('div', { class: 'li-icon', style: { background: 'var(--bad-soft)', color: 'var(--bad-ink)' } }, icon('trash', 20)), h('div', { class: 'li-main' }, h('div', { class: 'li-title', style: { color: 'var(--bad)' } }, '모든 기록 초기화'), h('div', { class: 'li-sub' }, '처음부터 다시 시작'))),
      ),
      fileInput,
      h('p', { class: 'small muted mt-8', style: { margin: '8px 4px 0' } }, '학습 기록은 이 기기의 브라우저에만 저장돼요. 서버로 전송되지 않아요.'),

      h('div', { class: 'section-head mt-24' }, h('div', { class: 'section-title' }, '정보')),
      h('div', { class: 'card' },
        h('div', { class: 'bold' }, `Hello v${VERSION}`),
        h('div', { class: 'small muted' }, `업데이트 ${RELEASED}`),
        h('p', { class: 'small text-2 mt-8' }, '한국어 화자를 위한 영어 학습 앱이에요. 한국어와 다른 점(어순·관사·시제·전치사)을 비교하며 배우고, 인출 연습과 간격 반복(FSRS)으로 오래 기억하도록 설계했어요.'),
        h('p', { class: 'small muted mt-8' }, '발음 음성: ', h('a', { href: 'https://huggingface.co/hexgrad/Kokoro-82M', target: '_blank', rel: 'noopener' }, 'Kokoro-82M'), '(Apache-2.0)로 만든 AI 음성 · 발음 사전: CMU Pronouncing Dictionary'),
        h('div', { class: 'row wrap mt-12' },
          h('a', { class: 'btn btn-outline btn-sm', href: '#/stats' }, '학습 통계'),
          h('a', { class: 'btn btn-outline btn-sm', href: REPO, target: '_blank', rel: 'noopener' }, 'GitHub에서 보기'),
        ),
      ),
    );
    return () => { off(); offline.cleanup(); };
  },
};
