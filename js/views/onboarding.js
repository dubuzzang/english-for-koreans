// 첫 실행 안내: 소개 → 목적 → 하루 목표 → 음성 확인 → 시작 지점
import { h, icon, speakBtn, setKids, hangulEl } from '../core/ui.js';
import { state, commit } from '../core/store.js';
import { speechAvailable, onVoicesChanged, speak } from '../core/tts.js';
import { HELLO } from '../data/speech.js';

const PURPOSES = [
  ['travel', '✈️', '여행', '해외여행에서 자신 있게 말하기'],
  ['talk', '💬', '회화', '외국인 친구·동료와 대화하기'],
  ['work', '💼', '일·비즈니스', '회의·이메일·출장 준비'],
  ['study', '🎓', '시험·유학', '기초 문법과 듣기 다지기'],
  ['culture', '🎬', '미드·영화·팝송', '자막 없이 즐기기'],
  ['restart', '🔁', '다시 시작', '학교에서 배운 영어 되살리기'],
];
const GOALS = [[20, '가볍게', '하루 5분'], [40, '보통', '하루 10분 (추천)'], [80, '열심히', '하루 20분']];

export function renderOnboarding(root, onDone) {
  let step = 0;
  const total = 4;
  const wrap = h('div', { class: 'onb' });
  root.replaceChildren(wrap);

  const dots = () => h('div', { class: 'onb-dots', 'aria-hidden': 'true' }, Array.from({ length: total }, (_, i) => h('i', { class: i === step ? 'on' : '' })));
  const nextBtn = (label, onClick, cls = 'btn-primary') => h('button', { class: `btn ${cls} btn-lg btn-block`, type: 'button', onclick: onClick }, label);

  function show() {
    let body, foot;
    if (step === 0) {
      body = h('div', { class: 'onb-body' },
        h('div', { class: 'onb-hero', 'aria-hidden': 'true' }, '👋'),
        h('div', { class: 'onb-title' }, 'Hello!', h('br'), '한국인을 위한 영어'),
        h('div', { class: 'onb-sub' }, '단어는 아는데 말이 안 나온다면 — 한국어와 다른 점을 짚어 주고, 듣고 말하는 연습까지 해요.'),
        h('div', { class: 'onb-points' },
          [['🤝', '한국어와 비교하는 문법', '어순·관사·시제·전치사를 한국어와 견주어 설명'],
            ['🧠', '과학적 간격 반복', '잊기 직전에 다시 보여 주는 FSRS 복습'],
            ['🎧', '원어민 AI 발음', '모든 단어·예문·회화를 미국 영어 음성으로'],
            ['📱', '하루 10분, 모바일 최적화', '짧은 레슨과 자동 저장']].map(([e, t, s]) =>
            h('div', { class: 'onb-point' }, h('div', { class: 'op-ico' }, e), h('div', null, h('b', null, t), h('span', null, s))))),
      );
      foot = nextBtn('시작하기', () => { step++; show(); });
    } else if (step === 1) {
      body = h('div', { class: 'onb-body' },
        h('div', { class: 'onb-title' }, '영어를 배우는 이유는?'),
        h('div', { class: 'onb-sub' }, '학습 팁을 맞춤으로 보여 드릴게요.'),
        h('div', { class: 'options' }, PURPOSES.map(([id, e, t, s]) => {
          const b = h('button', { class: `option ${state.settings.purpose === id ? 'sel' : ''}`, type: 'button' },
            h('span', { style: { fontSize: '24px' } }, e), h('span', { class: 'opt-text' }, t, h('span', { class: 'opt-sub' }, s)));
          b.addEventListener('click', () => { state.settings.purpose = id; commit(); step++; show(); });
          return b;
        })),
      );
      foot = nextBtn('건너뛰기', () => { step++; show(); }, 'btn-ghost');
    } else if (step === 2) {
      body = h('div', { class: 'onb-body' },
        h('div', { class: 'onb-title' }, '하루 목표를 정해요'),
        h('div', { class: 'onb-sub' }, '꾸준함이 가장 중요해요. 나중에 설정에서 바꿀 수 있어요.'),
        h('div', { class: 'options' }, GOALS.map(([xp, t, s]) => {
          const b = h('button', { class: `option ${state.settings.goal === xp ? 'sel' : ''}`, type: 'button' },
            h('span', { class: 'opt-text' }, t, h('span', { class: 'opt-sub' }, `${s} · ${xp} XP`)));
          b.addEventListener('click', () => { state.settings.goal = xp; commit(); step++; show(); });
          return b;
        })),
      );
      foot = null;
    } else {
      const status = h('div');
      const renderStatus = () => {
        status.replaceChildren(speechAvailable()
          ? h('div', { class: 'note ko' }, '🎧 모든 단어·예문·회화를 원어민 발음의 AI 음성으로 들려줘요. 버튼을 눌러 들어 보세요!')
          : h('div', { class: 'note warn' }, h('div', { class: 'note-title' }, '발음 음성을 불러오지 못했어요'), '인터넷에 연결되면 발음을 들을 수 있어요. 지금도 공부는 할 수 있어요.'));
      };
      renderStatus();
      const off = onVoicesChanged(renderStatus);
      const hangulInput = h('input', { type: 'checkbox', role: 'switch', 'aria-label': '한글 발음 표기' });
      hangulInput.checked = state.settings.hangul;
      const preview = h('div', { class: 'center' });
      const renderPreview = () => preview.replaceChildren(hangulEl('Nice to meet you.') || h('div', { class: 'hangul muted' }, '(한글 표기 끔)'));
      hangulInput.addEventListener('change', () => { state.settings.hangul = hangulInput.checked; commit(); renderPreview(); });
      renderPreview();
      body = h('div', { class: 'onb-body' },
        h('div', { class: 'onb-title' }, '소리를 확인해요'),
        h('div', { class: 'play-row' }, speakBtn(HELLO, { size: 'xl' }), speakBtn(HELLO, { size: 'xl', slow: true })),
        h('div', { class: 'center bold', style: { fontSize: '22px' } }, 'Hello! ', h('span', { class: 'muted', style: { fontSize: '15px' } }, '안녕하세요')),
        status,
        h('div', { class: 'list' }, h('div', { class: 'field' },
          h('div', { class: 'f-main' }, h('div', { class: 'f-title' }, '한글 발음 표기 보기'), h('div', { class: 'f-sub' }, '강세 음절은 굵게 — 처음엔 켜 두는 걸 추천해요')),
          h('label', { class: 'switch' }, hangulInput, h('span')),
        )),
        h('div', { class: 'card flat center' }, h('div', { class: 'bold' }, 'Nice to meet you.'), preview),
      );
      const finish = (hash) => {
        off();
        state.settings.onboarded = true;
        commit();
        location.hash = hash;
        onDone();
      };
      foot = h('div', { class: 'col' },
        nextBtn('발음 기초부터 시작 (추천)', () => finish('#/alphabet')),
        nextBtn('바로 1단원 시작', () => finish('#/lesson/u1l1'), 'btn-outline'),
      );
      setTimeout(() => speak(HELLO), 300);
    }
    setKids(wrap,
      h('div', { class: 'row between' },
        step > 0 ? h('button', { class: 'icon-btn', type: 'button', 'aria-label': '이전', onclick: () => { step--; show(); } }, icon('chev-left', 24)) : h('span'),
        dots(),
        h('span', { style: { width: '42px' } }),
      ),
      body,
      foot ? h('div', { class: 'mt-16' }, foot) : null,
    );
  }
  show();
}
