// 단어 상세의 활용표: 명사 단수·복수, 형용사 비교급·최상급, 동사 형태와 시제별 활용
import { h, speakBtn } from '../core/ui.js';
import { canSpeak } from '../core/tts.js';
import { conjugate, thirdPerson, ingForm, pastForm, ppForm, plural, article, comparative, superlative, isIrregular, TENSES, TENSE_KEYS, PERSONS, PERSON_KO, personsFor } from '../core/morph.js';
import { headKo } from '../core/ko.js';
import { partsHTML } from '../core/drillgen.js';
import { addWordDetail } from './words.js';

const P = (t, k = 'stem') => [{ t, k }];

function formsGrid(rows) {
  return h('div', { class: 'forms' }, rows.flatMap(([k, parts, ko]) => {
    const text = parts.map((p) => p.t).join('').trim();
    return [
      h('div', { class: 'f-k' }, k),
      // 활용형은 대부분 녹음이 없어서, 기기 영어 음성으로 읽는다
      h('div', { class: 'f-v' }, h('span', { html: partsHTML(parts), style: { marginRight: '6px' } }), canSpeak(text) ? speakBtn(text, { size: 'sm' }) : null),
      h('div', { class: 'f-ko' }, ko),
    ];
  }));
}

function details(title, body, open = false) {
  const d = h('details', { class: 'card flat', style: { padding: '12px 14px' } },
    h('summary', { class: 'bold', style: { cursor: 'pointer' } }, title),
    h('div', { class: 'mt-12' }, body),
  );
  if (open) d.open = true;
  return d;
}

/** 어간과 바뀐 어미를 나눠 색칠: cities → citi + es, children → children(불규칙) */
function suffixParts(base, form, irr) {
  // 동사구(get up · listen to)는 첫 단어만 바뀐다
  const sp = base.indexOf(' ');
  if (sp > 0 && form.endsWith(base.slice(sp))) {
    const tail = base.slice(sp);
    return [...suffixParts(base.slice(0, sp), form.slice(0, form.length - tail.length), irr), { t: tail, k: 'stem' }];
  }
  if (irr) return P(form, 'irr');
  let i = 0;
  while (i < base.length && i < form.length && base[i] === form[i]) i++;
  if (i >= form.length) return P(form);
  return [{ t: form.slice(0, i), k: 'stem' }, { t: form.slice(i), k: 'end' }];
}

// 명사: a/an + 단수 · 복수
addWordDetail((w) => {
  if (w.pos !== 'n' || w.nodrill) return null;
  const k = headKo(w.ko);
  if (w.unc) {
    return details('📐 셀 수 없는 명사', h('p', { class: 'small text-2' }, `${w.en}는 셀 수 없어요. a/an도, 복수 -s도 붙이지 않아요. 양을 말할 땐 some ${w.en} · a lot of ${w.en}처럼 써요.`));
  }
  if (w.plonly) {
    return details('📐 늘 복수로 쓰는 말', h('p', { class: 'small text-2' }, `${w.en}는 늘 복수형이에요. 동사도 복수로: These ${w.en} are …${/(pants|jeans|shorts|glasses|scissors)$/.test(w.en) ? ` · 하나를 셀 땐 a pair of ${w.en}` : ''}`));
  }
  if (w.proper) return null;
  const pl = plural(w);
  const irr = !pl.startsWith(w.en.slice(0, -1)) || /men$|children$|people$|teeth$|feet$|mice$/.test(pl);
  const rows = [
    ['하나', [{ t: `${article(w.en)} `, k: 'art' }, { t: w.en, k: 'stem' }], `${k} 하나`],
    ['여럿', [{ t: 'two ', k: 'subj' }, ...suffixParts(w.en, pl, irr && pl !== w.en)], `${k} 둘`],
  ];
  return details('📐 a/an · 복수형', formsGrid(rows));
});

// 형용사: 비교급 · 최상급
addWordDetail((w) => {
  if (w.pos !== 'adj' || w.nocmp || w.nodrill || /\s/.test(w.en) || w.proper) return null;
  const k = headKo(w.ko);
  const a = w.en.toLowerCase();
  const cmp = comparative(w), sup = superlative(w);
  const rows = [
    ['원급', P(a), k],
    ['비교급', cmp.startsWith('more ') ? [{ t: 'more ', k: 'aux' }, { t: a, k: 'stem' }] : suffixParts(a, cmp, !cmp.startsWith(a.slice(0, 2))), `더 ${k}`],
    ['최상급', sup.startsWith('the most ') ? [{ t: 'the most ', k: 'aux' }, { t: a, k: 'stem' }] : [{ t: 'the ', k: 'art' }, ...suffixParts(a, sup.replace(/^the /, ''), !sup.replace(/^the /, '').startsWith(a.slice(0, 2)))], `가장 ${k}`],
  ];
  return details('📏 비교급·최상급', formsGrid(rows));
});

// 동사: 기본 형태 + 시제표
addWordDetail((w) => {
  if (w.pos !== 'v' || w.nodrill) return null;
  const base = w.en;
  const irr = isIrregular(base);
  const forms = formsGrid([
    ['원형', P(base), headKo(w.ko)],
    ['3인칭 단수', suffixParts(base, thirdPerson(base), base.split(' ')[0] === 'have'), 'he·she·it 현재'],
    ['-ing', suffixParts(base, ingForm(base), false), '진행형'],
    ['과거', suffixParts(base, pastForm(base), irr), irr ? '불규칙!' : '-ed'],
    ['과거분사', suffixParts(base, ppForm(base), irr), 'have + p.p.'],
  ]);
  let tense = 'pres';
  let neg = false;
  const table = h('div');
  const seg = h('div', { class: 'chips-scroll', style: { margin: '0 -14px', padding: '2px 14px 8px' } });
  const negBtn = h('button', { class: 'chip', type: 'button' }, '부정형');
  const info = h('div', { class: 'small text-2', style: { margin: '4px 2px 10px' } });
  const render = () => {
    seg.replaceChildren(...TENSE_KEYS.map((t) => h('button', {
      class: `chip ${t === tense ? 'active' : ''}`, type: 'button',
      onclick: () => { tense = t; render(); },
    }, TENSES[t].name)));
    negBtn.classList.toggle('active', neg);
    const T = TENSES[tense];
    info.textContent = `${T.en} · ${T.ko} — 예) ${T.ex}`;
    table.replaceChildren(formsGrid(personsFor(tense).map((p) => [tense === 'imp' ? (p === 4 ? "Let's" : '명령') : PERSONS[p], conjugate(base, tense, p, { neg }).parts, tense === 'imp' ? (p === 4 ? '~하자' : '~해') : PERSON_KO[p]])));
  };
  negBtn.addEventListener('click', () => { neg = !neg; render(); });
  render();
  return h('div', { class: 'col', style: { gap: '10px' } },
    details('🔤 동사 형태', forms, true),
    details('🔁 시제별 활용표', h('div', null, seg, h('div', { class: 'row between' }, info, negBtn), table)),
  );
});
