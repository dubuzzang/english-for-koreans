// 0단원: 발음 기초 — 알파벳표, 한국인이 헷갈리는 소리(최소대립쌍), 발음 규칙
import { h, icon, speakBtn, hangulEl, openSheet } from '../core/ui.js';
import { state, commit } from '../core/store.js';
import { LETTERS, PAIRS, SOUND_RULES } from '../data/alphabet.js';

function openLetter(L, onSeen) {
  if (!state.letters[L.up]) { state.letters[L.up] = Date.now(); commit(); onSeen?.(); }
  openSheet({
    title: '',
    label: `${L.up} ${L.lo}`,
    body: h('div', { class: 'col', style: { gap: '14px' } },
      h('div', { class: 'row', style: { alignItems: 'center' } },
        h('div', { style: { fontSize: '64px', fontWeight: 850, lineHeight: 1, letterSpacing: '-.02em', color: L.special ? 'var(--accent)' : 'var(--text)' } }, `${L.up}${L.lo}`),
        h('div', { class: 'grow' },
          h('div', { class: 'small muted bold' }, '글자 이름'),
          h('div', { class: 'bold', style: { fontSize: '20px' } }, `${L.up} [${L.name}]`),
          h('div', { class: 'small text-2' }, `소리: ${L.ko} · [${L.ipa}]`),
        ),
        speakBtn(L.say),
      ),
      h('div', { class: `note ${L.special ? 'warn' : 'ko'}` }, h('div', { class: 'note-title' }, icon('bulb', 14), L.special ? '한국인 주의 포인트' : '발음 팁'), L.tip),
      h('div', { class: 'bold' }, '예시 단어'),
      h('div', { class: 'ex-list' }, L.ex.map(([en, ko]) => h('div', { class: 'ex-line' },
        speakBtn(en, { size: 'sm' }),
        h('div', { class: 'grow' }, h('div', { class: 'ex-en' }, en), hangulEl(en, 'hangul tiny'), h('div', { class: 'ex-ko' }, ko)),
        speakBtn(en, { size: 'sm', slow: true }),
      ))),
    ),
  });
}

function lettersTab(box) {
  const grid = h('div', { class: 'letter-grid' });
  const progress = h('div', { class: 'small muted' });
  const render = () => {
    progress.textContent = `확인한 글자 ${Object.keys(state.letters).length} / ${LETTERS.length} — 눌러서 소리를 들어 보세요`;
    grid.replaceChildren(...LETTERS.map((L) => {
      const b = h('button', { class: `letter-cell ${L.special ? 'special' : ''} ${state.letters[L.up] ? 'seen' : ''}`, type: 'button', 'aria-label': `${L.up} 글자 자세히` },
        h('div', { class: 'lc-big' }, `${L.up}${L.lo}`),
        h('div', { class: 'lc-ko' }, L.name),
      );
      b.addEventListener('click', () => openLetter(L, render));
      return b;
    }));
  };
  render();
  box.replaceChildren(
    h('div', { class: 'card' },
      h('div', { class: 'bold', style: { fontSize: '17px' } }, '글자는 쉽지만, 소리는 따로 익혀요'),
      h('p', { class: 'small text-2 mt-4' }, '영어는 26자뿐이지만 같은 글자가 단어마다 다른 소리를 내요(cat · cake · father). 그래서 단어를 배울 때 소리를 꼭 함께 들어야 해요. 빨간 글자는 한국어에 없는 소리라 특히 주의할 글자예요.'),
      h('div', { class: 'note ko mt-12' }, h('div', { class: 'note-title' }, '🎯 한국인이 집중할 6가지 소리'), h('b', null, 'f · v · th · r · l · z'), ' — 한글로는 정확히 쓸 수 없어요. "헷갈리는 소리" 탭에서 귀부터 익혀요.'),
    ),
    h('div', { class: 'mt-16' }, progress),
    h('div', { class: 'mt-8' }, grid),
    h('a', { class: 'btn btn-soft btn-block btn-lg mt-16', href: '#/drill/pairs' }, icon('headphones', 20), '헷갈리는 소리 듣기 퀴즈'),
  );
}

function pairsTab(box) {
  box.replaceChildren(
    h('p', { class: 'text-2', style: { margin: '0 2px 12px' } }, '한국어에 없는 구분이라 귀가 쉽게 속는 소리들이에요. 양쪽을 번갈아 들으며 차이를 느껴 보세요.'),
    ...PAIRS.map((g) => h('div', { class: 'card' },
      h('div', { class: 'row between' }, h('h3', null, g.title)),
      h('p', { class: 'small text-2 mt-4' }, g.desc),
      h('div', { class: 'col mt-12' }, g.pairs.map(([a, aKo, b, bKo]) => h('div', { class: 'pair-card' },
        h('div', { class: 'pair-side' }, h('div', { class: 'p-en' }, a), h('div', { class: 'p-ko' }, aKo), speakBtn(a, { size: 'sm' })),
        h('div', { class: 'pair-vs' }, 'vs'),
        h('div', { class: 'pair-side' }, h('div', { class: 'p-en' }, b), h('div', { class: 'p-ko' }, bKo), speakBtn(b, { size: 'sm' })),
      ))),
    )),
    h('a', { class: 'btn btn-primary btn-block btn-lg mt-16', href: '#/drill/pairs' }, icon('headphones', 20), '듣고 구분하기 퀴즈'),
  );
}

function rulesTab(box) {
  box.replaceChildren(
    ...SOUND_RULES.map((r) => h('div', { class: 'card' }, h('h3', null, r.title), h('p', { class: 'small text-2 mt-4', html: r.body }))),
    h('div', { class: 'card' },
      h('h3', null, '한글 발음 표기에 대해'),
      h('p', { class: 'small text-2 mt-4' }, '[헐로우]처럼 한글로 소리를 어림잡아 보여 주고, 강세가 있는 음절은 굵게 표시해요. 미국식 발음을 기준으로 해요(water [워러]). 다만 f·v·th·r·l처럼 한글로 구분할 수 없는 소리가 있으니 꼭 소리를 함께 들으세요. 익숙해지면 설정에서 끌 수 있어요.'),
      h('a', { class: 'btn btn-soft btn-sm mt-12', href: '#/settings' }, '설정 열기'),
    ),
    h('a', { class: 'btn btn-outline btn-block mt-12', href: '#/grammar/sounds' }, '📖 문법 노트: 영어 발음의 핵심'),
  );
}

export default {
  tab: 'learn',
  title: '발음 기초',
  render(root) {
    let tab = 'letters';
    const box = h('div', { class: 'mt-16' });
    const seg = h('div', { class: 'seg', role: 'tablist' });
    const renderTab = () => {
      seg.replaceChildren(...[['letters', '알파벳 26자'], ['pairs', '헷갈리는 소리'], ['rules', '발음 규칙']].map(([k, label]) =>
        h('button', { class: tab === k ? 'on' : '', role: 'tab', 'aria-selected': String(tab === k), onclick: () => { tab = k; renderTab(); } }, label)));
      ({ letters: lettersTab, pairs: pairsTab, rules: rulesTab })[tab](box);
    };
    root.append(
      h('div', { class: 'page-head' }, h('a', { class: 'small', href: '#/learn' }, '← 학습 경로'), h('h1', { class: 'mt-4' }, '발음 기초'), h('p', null, '첫 단원 전에 10분만 투자하세요. 듣기와 말하기가 훨씬 쉬워져요.')),
      seg,
      box,
    );
    renderTab();
  },
};
