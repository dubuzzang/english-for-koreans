// 문제 화면 렌더러. 각 렌더러는 { el, info?, check?(), onKey?(k), onShow?() } 를 돌려준다.
// api: submit(result) · setReady(bool) · setMain(cfg) · done(result)
import { h, icon, speakBtn, hangulEl, shuffle, POS_LABEL, tapToSpeak } from '../core/ui.js';
import { openNoteSheet } from './grammar.js';
import { NOTE } from '../data/notes.js';
import { speak, stopSpeaking } from '../core/tts.js';
import { listenOnce, stopListening, bestMatch, wordMatches, STT_ERRORS } from '../core/stt.js';
import { state } from '../core/store.js';
import { checkAnswer, diffChars, normalize, lower } from '../core/en.js';
import { WORDS } from '../data/vocab.js';
import { distractorWords } from '../core/lessonBuilder.js';

const autoplay = () => state.settings.autoplay;

// 문장 첫 단어 타일은 소문자로 (I·고유명사 제외) — 대문자가 정답 힌트가 되지 않도록
const PROPER = new Set([
  ...WORDS.filter((w) => w.proper || /^[A-Z]/.test(w.en)).map((w) => lower(w.en).split(' ')[0]),
  'i', "i'm", "i'll", "i've", "i'd", 'mina', 'jisu', 'minsu', 'junho', 'tom', 'emma', 'david', 'kim', 'seoul', 'busan', 'daegu', 'jeju',
  'london', 'paris', 'tokyo', 'canada', 'boston', 'mike', 'sarah', 'kevin', 'lisa', 'john', 'amy', 'anna', 'k-pop', 'tv', 'bts', 'joe',
]);
/** i: 문장 속 위치 (0 = 첫 단어). 문장 가운데의 대문자는 고유명사라 그대로 둔다 */
export function displayToken(t, i = 1) {
  if (i > 0) return t;
  const base = lower(t);
  return PROPER.has(base) || PROPER.has(base.replace(/'s$/, '')) ? t : base;
}

function wordHeader(w, { big = true } = {}) {
  return h('div', { class: 'col', style: { gap: '4px', minWidth: 0 } },
    h('div', { class: big ? 'word-xl' : 'big' }, w.en),
    hangulEl(w.en),
  );
}

function exampleBox(ex) {
  if (!ex) return null;
  return h('div', { class: 'example' },
    speakBtn(ex[0], { size: 'sm' }),
    h('div', { class: 'grow' },
      h('div', { class: 'ex-en' }, ex[0]),
      hangulEl(ex[0], 'hangul tiny'),
      h('div', { class: 'ex-ko' }, ex[1]),
    ),
  );
}

// ---------- 정보 카드 ----------
export function renderTip(step) {
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, icon('bulb', 16), '한국인을 위한 팁'),
    h('h2', null, step.tip.title),
    tapToSpeak(h('div', { class: 'card prose', html: step.tip.html })),
    h('p', { class: 'small muted' }, '굵은 영어를 누르면 발음을 들을 수 있어요.'),
    (step.notes || []).length ? h('div', { class: 'chips' }, step.notes.map((id) => h('button', { class: 'chip', type: 'button', onclick: () => openNoteSheet(id) }, `📖 ${NOTE.get(id)?.title || '문법 노트'}`))) : null,
  );
  return { el, info: true };
}

export function renderIntro(step) {
  const w = step.w;
  const seen = step.seen;
  const el = h('div', { class: 'ex' },
    h('div', { class: `ex-label ${seen ? '' : 'new'}` }, icon(seen ? 'refresh' : 'plus', 16), seen ? '다시 보기' : '새 단어'),
    h('div', { class: 'intro-card' },
      h('div', { class: 'intro-top' },
        wordHeader(w),
        h('div', { class: 'intro-audio' }, speakBtn(w.en), speakBtn(w.en, { slow: true })),
      ),
      h('div', null,
        h('div', { class: 'meaning' }, w.ko),
        h('div', { class: 'pos mt-4' }, POS_LABEL[w.pos] || ''),
      ),
      exampleBox(w.ex),
      w.note ? h('div', { class: 'note ko' }, h('div', { class: 'note-title' }, icon('bulb', 14), '포인트'), w.note) : null,
    ),
  );
  return { el, info: true, onShow: () => { if (autoplay()) speak(w.en); } };
}

// ---------- 객관식 ----------
function optionsUI(items, onPick) {
  const wrap = h('div', { class: 'options' });
  const btns = items.map((it, i) => {
    const b = h('button', { class: 'option', type: 'button' },
      h('span', { class: 'opt-key' }, String(i + 1)),
      h('span', { class: 'opt-text' }, it.label, it.sub ? h('span', { class: 'opt-sub' }, it.sub) : null),
    );
    b.addEventListener('click', () => onPick(i, b));
    wrap.append(b);
    return b;
  });
  return { wrap, btns };
}

export function mcCore({ el, items, correctIdx, result, onCorrectSpeak }, api) {
  let answered = false;
  const { wrap, btns } = optionsUI(items, (i) => pickIdx(i));
  function pickIdx(i) {
    if (answered) return;
    answered = true;
    const ok = i === correctIdx;
    btns.forEach((b, j) => {
      b.disabled = true;
      if (j === correctIdx) b.classList.add('correct');
      else if (j === i) b.classList.add('wrong');
      else b.classList.add('dim');
    });
    if (onCorrectSpeak) speak(onCorrectSpeak);
    api.submit({ ok, ...result });
  }
  el.append(wrap);
  return { onKey: (k) => { const n = Number(k); if (n >= 1 && n <= items.length) pickIdx(n - 1); } };
}

export function renderMC(step, api) {
  const w = step.w;
  const distract = distractorWords(w, step.pool || [], 3);
  const all = shuffle([w, ...distract]);
  const correctIdx = all.indexOf(w);
  const el = h('div', { class: 'ex' });
  let onShow;
  if (step.mode === 'ko2en') {
    el.append(
      h('div', { class: 'ex-label' }, '영어로 어떻게 말할까요?'),
      h('div', { class: 'ex-prompt' }, h('div', { class: 'ko-big' }, w.ko)),
    );
  } else if (step.mode === 'listen2ko') {
    el.append(
      h('div', { class: 'ex-label' }, icon('headphones', 16), '듣고 뜻을 고르세요'),
      h('div', { class: 'play-row' }, speakBtn(w.en, { size: 'xl' }), speakBtn(w.en, { size: 'xl', slow: true })),
    );
    onShow = () => speak(w.en);
  } else {
    el.append(
      h('div', { class: 'ex-label' }, '이 단어의 뜻은?'),
      h('div', { class: 'ex-prompt' }, h('div', { class: 'col', style: { gap: '2px' } }, h('div', { class: 'big' }, w.en), hangulEl(w.en)), speakBtn(w.en)),
    );
    onShow = () => { if (autoplay()) speak(w.en); };
  }
  const items = all.map((x) => (step.mode === 'ko2en' ? { label: x.en } : { label: x.ko }));
  const core = mcCore({
    el, items, correctIdx,
    result: { answer: w.en, sub: w.ko, speakText: w.en },
    onCorrectSpeak: step.mode === 'ko2en' ? w.en : null,
  }, api);
  return { el, onShow, ...core };
}

/** 빈칸(___)이 있는 문장을 화면용 요소로 */
export function blankQuestion(q) {
  const qEl = h('div', { class: 'ex-q' });
  const parts = String(q).split('___');
  parts.forEach((p, i) => {
    qEl.append(p);
    if (i < parts.length - 1) qEl.append(h('span', { class: 'blank', style: { display: 'inline-block', minWidth: '56px', borderBottom: '3px solid var(--brand)', margin: '0 4px' } }, ' '));
  });
  return { qEl, parts };
}

export function renderChoice(step, api) {
  const it = step.it;
  const order = shuffle(it.opts.map((o, i) => i));
  const correctIdx = order.indexOf(it.a);
  const { qEl, parts } = blankQuestion(it.q);
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, icon('bulb', 16), step.label || '문법 확인'),
    qEl,
    it.ko ? h('div', { class: 'text-2' }, it.ko) : null,
  );
  const answerText = parts.length > 1 ? parts.join(it.opts[it.a]).replace(/\s+([.?!,])/g, '$1') : it.opts[it.a];
  const core = mcCore({
    el,
    items: order.map((i) => ({ label: it.opts[i] })),
    correctIdx,
    result: { answer: answerText, sub: it.ko, why: it.why, speakText: /[a-z]/i.test(answerText) && !/[가-힣]/.test(answerText) ? answerText : null },
  }, api);
  return { el, ...core };
}

export function renderListenSent(step, api) {
  const correctIdx = step.options.indexOf(step.ko);
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, icon('headphones', 16), '듣고 알맞은 뜻을 고르세요'),
    h('div', { class: 'play-row' }, speakBtn(step.en, { size: 'xl' }), speakBtn(step.en, { size: 'xl', slow: true })),
  );
  const core = mcCore({ el, items: step.options.map((o) => ({ label: o })), correctIdx, result: { answer: step.en, sub: step.ko, speakText: step.en } }, api);
  return { el, onShow: () => speak(step.en), ...core };
}

// ---------- 짝 맞추기 ----------
export function renderMatch(step, api) {
  const words = step.words;
  const left = shuffle(words), right = shuffle(words);
  let selL = null, selR = null, matched = 0, mistakes = 0;
  const wrongWords = new Set();
  const lBtns = new Map(), rBtns = new Map();
  const tryMatch = () => {
    if (!selL || !selR) return;
    const bl = lBtns.get(selL), br = rBtns.get(selR);
    if (selL === selR) {
      [bl, br].forEach((b) => { b.classList.remove('sel'); b.classList.add('ok-flash'); });
      setTimeout(() => [bl, br].forEach((b) => b.classList.add('done')), 260);
      matched++;
      if (matched === words.length) {
        setTimeout(() => api.submit({ ok: true, perfect: mistakes === 0, mistakes, wrongWords: [...wrongWords], noRequeue: true, title: mistakes ? `완료! (실수 ${mistakes}번)` : null }), 350);
      }
    } else {
      mistakes++;
      wrongWords.add(selL); wrongWords.add(selR);
      [bl, br].forEach((b) => { b.classList.remove('sel'); b.classList.add('bad-flash'); setTimeout(() => b.classList.remove('bad-flash'), 400); });
    }
    selL = selR = null;
  };
  const mk = (w, side) => {
    const b = h('button', { class: 'match-btn', type: 'button' }, side === 'L' ? w.en : w.ko);
    b.addEventListener('click', () => {
      if (side === 'L') {
        speak(w.en);
        if (selL) lBtns.get(selL).classList.remove('sel');
        selL = w.id;
      } else {
        if (selR) rBtns.get(selR).classList.remove('sel');
        selR = w.id;
      }
      b.classList.add('sel');
      tryMatch();
    });
    (side === 'L' ? lBtns : rBtns).set(w.id, b);
    return b;
  };
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, '짝을 맞춰 보세요'),
    h('div', { class: 'match' },
      h('div', { class: 'match-col' }, left.map((w) => mk(w, 'L'))),
      h('div', { class: 'match-col' }, right.map((w) => mk(w, 'R'))),
    ),
  );
  return { el };
}

// ---------- 단어 타일 ----------
export function renderTiles(step, api) {
  const tokens = step.tokens.map((t, i) => displayToken(t, i));
  const pool = shuffle([...tokens, ...(step.extra || []).map((t) => displayToken(t, 0))]);
  const answer = [];
  const zone = h('div', { class: 'answer-zone', 'aria-label': '내 답' });
  const bank = h('div', { class: 'bank' });
  let locked = false;
  const bankBtns = pool.map((t, i) => {
    const b = h('button', { class: 'tile', type: 'button' }, t);
    b.addEventListener('click', () => {
      if (locked || b.classList.contains('used')) return;
      b.classList.add('used');
      const a = h('button', { class: 'tile', type: 'button' }, t);
      a.addEventListener('click', () => {
        if (locked) return;
        a.remove();
        answer.splice(answer.findIndex((x) => x.btn === a), 1);
        b.classList.remove('used');
        api.setReady(answer.length > 0);
      });
      answer.push({ t, btn: a, i });
      zone.append(a);
      speak(t, { rate: (state.settings.rate || 0.9) * 1.05 });
      api.setReady(true);
    });
    bank.append(b);
    return b;
  });
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, '영어 문장을 만들어 보세요'),
    h('div', { class: 'tiles-prompt' }, h('div', { class: 'avatar', 'aria-hidden': 'true' }, '🧑‍🏫'), h('div', { class: 'bubble' }, step.ko)),
    zone,
    bank,
  );
  return {
    el,
    check() {
      locked = true;
      const got = answer.map((x) => x.t).join(' ');
      const ok = [step.en, ...(step.alts || [])].some((s) => normalize(s) === normalize(got));
      bankBtns.forEach((b) => { b.disabled = true; });
      return { ok, answer: step.en, sub: step.ko, speakText: step.en, mine: ok ? null : got };
    },
  };
}

// ---------- 타이핑 ----------
export function diffView(mine, expected) {
  const d = diffChars(mine, expected);
  return h('span', { class: 'diff' }, d.map((x) => h('span', { class: x.miss ? 'd-miss' : x.ok ? '' : 'd-bad' }, x.ch)));
}

export function typeCore({ el, answers, strict = false, multiline = false, placeholder = '영어로 입력', result }, api) {
  const input = h(multiline ? 'textarea' : 'input', {
    class: 'type-input', autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false',
    lang: 'en', placeholder, enterkeyhint: 'done', 'aria-label': placeholder,
  });
  input.addEventListener('input', () => api.setReady(input.value.trim().length > 0));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); api.trigger(); }
  });
  el.append(h('div', { class: 'type-wrap' }, input));
  return {
    onShow: () => setTimeout(() => input.focus({ preventScroll: true }), 120),
    check() {
      const r = checkAnswer(input.value, answers, { strict });
      input.disabled = true;
      input.classList.add(r.ok ? 'ok' : 'bad');
      const res = { ok: r.ok, answer: r.expected, ...result };
      if (r.level === 'typo' && r.ok) res.note = '오타가 조금 있어요 — 철자를 확인하세요.';
      if (r.level === 'typo' && !r.ok) res.note = '거의 맞았어요! 이 문제는 철자까지 정확해야 해요.';
      if (!r.ok || r.level !== 'exact') res.mine = input.value;
      return res;
    },
  };
}

export function renderTypeWord(step, api) {
  const w = step.w;
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, icon('words', 16), '영어로 써 보세요'),
    h('div', { class: 'ex-prompt' }, h('div', null, h('div', { class: 'ko-big' }, w.ko), h('div', { class: 'pos mt-4' }, POS_LABEL[w.pos] || ''))),
  );
  const hintBtn = h('button', { class: 'btn btn-ghost btn-sm', type: 'button' }, icon('hint', 16), '힌트');
  let hintLevel = 0;
  const hintText = h('span', { class: 'bold', style: { letterSpacing: '.12em' } });
  hintBtn.addEventListener('click', () => {
    hintLevel = Math.min(w.en.length, hintLevel + Math.max(1, Math.ceil(w.en.length / 4)));
    hintText.textContent = [...w.en].map((c, i) => (i < hintLevel || c === ' ' ? c : '_')).join('');
    step.hinted = true;
  });
  const core = typeCore({ el, answers: [w.en, ...(w.alt || [])], result: { sub: w.ko, speakText: w.en } }, api);
  el.append(h('div', { class: 'row' }, hintBtn, hintText));
  return { el, ...core };
}

export function renderTypeSent(step, api) {
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, icon('words', 16), step.dictation ? '듣고 받아쓰세요' : '영어로 써 보세요'),
    step.dictation
      ? h('div', { class: 'play-row' }, speakBtn(step.en, { size: 'xl' }), speakBtn(step.en, { size: 'xl', slow: true }))
      : h('div', { class: 'tiles-prompt' }, h('div', { class: 'avatar', 'aria-hidden': 'true' }, '🧑'), h('div', { class: 'bubble' }, step.ko)),
  );
  const core = typeCore({ el, answers: [step.en, ...(step.alts || [])], multiline: step.en.length > 28, result: { sub: step.ko, speakText: step.en } }, api);
  const onShow0 = core.onShow;
  return { el, ...core, onShow: () => { onShow0(); if (step.dictation) speak(step.en); } };
}

// ---------- 말하기 (음성 인식) ----------
export function renderSpeak(step, api) {
  const target = step.en;
  let tries = 0;
  const status = h('div', { class: 'small text-2 center' }, '마이크를 누르고 문장을 소리 내어 읽어 보세요');
  const heard = h('div', { class: 'center bold', style: { fontSize: '19px', minHeight: '30px' } });
  const mic = h('button', { class: 'mic-btn', type: 'button', 'aria-label': '말하기 시작' }, icon('mic', 38));
  const el = h('div', { class: 'ex' },
    h('div', { class: 'ex-label' }, icon('mic', 16), '소리 내어 말해 보세요'),
    h('div', { class: 'intro-card' },
      h('div', { class: 'row', style: { alignItems: 'flex-start' } },
        h('div', { class: 'grow' },
          h('div', { style: { fontSize: '24px', fontWeight: 800, lineHeight: 1.35 } }, target),
          hangulEl(target),
          h('div', { class: 'text-2 mt-4' }, step.ko),
        ),
        speakBtn(target), speakBtn(target, { slow: true }),
      ),
    ),
    h('div', { class: 'play-row' }, mic),
    status,
    heard,
  );
  mic.addEventListener('click', async () => {
    if (mic.classList.contains('listening')) { stopListening(); return; }
    stopSpeaking();
    mic.classList.add('listening');
    status.textContent = '듣고 있어요… 말해 보세요';
    const r = await listenOnce();
    mic.classList.remove('listening');
    if (!r.ok) { status.textContent = STT_ERRORS[r.error] || '잘 듣지 못했어요. 다시 시도해 주세요.'; return; }
    tries++;
    const best = bestMatch(r.alternatives, target);
    const pct = Math.round(best.score * 100);
    heard.replaceChildren(...wordMatches(target, best.text).map(({ w, ok }) => h('span', { style: { color: ok ? 'var(--ok)' : 'var(--bad)', marginRight: '6px' } }, w)));
    status.textContent = `들린 문장: "${best.text}" · 일치도 ${pct}%`;
    if (best.score >= 0.75) {
      api.submit({ ok: true, answer: target, sub: step.ko, title: `발음 ${pct}% — 잘 알아들었어요!`, noRequeue: true });
    } else if (tries >= 3) {
      api.submit({ ok: false, answer: target, sub: step.ko, speakText: target, title: '조금 더 연습해 봐요', why: '🐢 천천히 듣기로 한 단어씩 따라 해 보세요. 강세(한글 표기의 굵은 글자)를 살리면 훨씬 잘 알아들어요.', noRequeue: true });
    } else {
      status.textContent += ' — 또박또박 다시 말해 볼까요?';
    }
  });
  return {
    el,
    custom: true,
    onShow() {
      api.setMain('건너뛰기', () => api.submit({ ok: false, skipped: true, answer: target, sub: step.ko, title: '다음에 다시 해 봐요', noRequeue: true }), 'btn-outline');
    },
  };
}

export const RENDERERS = {
  tip: renderTip,
  intro: renderIntro,
  mc: renderMC,
  choice: renderChoice,
  listenSent: renderListenSent,
  match: renderMatch,
  tiles: renderTiles,
  typeWord: renderTypeWord,
  typeSent: renderTypeSent,
  speak: renderSpeak,
};
