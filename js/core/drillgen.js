// 문법 드릴 문제 생성기 (DOM 없음): be동사 · 동사 시제 · 불규칙 동사 · a/an·복수 · 비교급 · 인칭대명사 · 전치사
// 오답 보기는 한국인 학습자가 실제로 자주 하는 실수(3인칭 -s 누락, doesn't plays, is play …)로 만든다.
import {
  conjugate, thirdPerson, ingForm, pastForm, ppForm, regularPast, doublesFinal, plural, article, comparative, superlative, usesEr,
  IRREGULAR, PP_ALT, PRONOUNS, PRONOUN_CASES, PERSONS, PERSON_KO, TENSES, personsFor, beNow, bePast, isIrregular,
} from './morph.js';
import { headKo, josa } from './ko.js';
import { WORDS } from '../data/vocab.js';
import { toHangul } from './hangul.js';

function rngPick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }
function rngShuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const low = (s) => String(s).toLowerCase();
const head = (v) => String(v).trim().split(/\s+/)[0].toLowerCase();
const tail = (v) => String(v).trim().split(/\s+/).slice(1).join(' ');
const join = (...xs) => xs.filter(Boolean).join(' ').replace(/\s+([?!.,])/g, '$1');

// ---------- 재료 ----------
const simple = (w) => !w.nodrill && !w.proper && !/[^a-z\- ]/i.test(w.en);
export const VERB_POOL = WORDS.filter((w) => w.pos === 'v' && simple(w) && !/\b(to|for|at|about|with|of|on)$/.test(w.en) && head(w.en) !== 'be');
export const NOUN_POOL = WORDS.filter((w) => w.pos === 'n' && simple(w) && !w.unc && !w.plonly && !/\s/.test(w.en));
export const ADJ_POOL = WORDS.filter((w) => w.pos === 'adj' && simple(w) && !/\s/.test(w.en));
export const CMP_POOL = ADJ_POOL.filter((w) => !w.nocmp);
export const JOB_POOL = WORDS.filter((w) => w.cat === 'jobs' && w.pos === 'n' && simple(w) && !w.unc && !['job', 'office', 'company', 'part-time job'].includes(w.en));
// be동사 드릴: 사람에게 어울리는 형용사 / 물건·장소에 어울리는 형용사 (Tom is easy 같은 어색한 문장이 나오지 않게)
const PERSON_ADJ = new Set(['happy', 'sad', 'angry', 'tired', 'bored', 'excited', 'nervous', 'worried', 'scared', 'surprised', 'glad', 'lonely', 'upset', 'proud',
  'kind', 'funny', 'smart', 'shy', 'friendly', 'lazy', 'honest', 'polite', 'calm', 'fine', 'busy', 'tall', 'short', 'young', 'old', 'strong', 'weak', 'rich',
  'poor', 'careful', 'ready', 'sick', 'hungry', 'thirsty', 'full', 'free', 'handsome', 'cute', 'beautiful', 'famous', 'popular', 'healthy', 'late', 'married', 'single']);
const PLACE_ADJ = ['big', 'small', 'clean', 'dirty', 'quiet', 'noisy', 'warm', 'dark', 'cozy', 'comfortable', 'crowded', 'empty', 'hot', 'expensive', 'cheap', 'new', 'old',
  'safe', 'dangerous', 'large', 'beautiful', 'special', 'wonderful', 'terrible', 'popular', 'famous', 'open', 'closed', 'convenient'];
const OBJECT_ADJ = ['big', 'small', 'cheap', 'expensive', 'new', 'old', 'clean', 'dirty', 'heavy', 'comfortable', 'wet', 'dry', 'soft', 'beautiful', 'popular', 'large', 'long',
  'perfect', 'terrible', 'special', 'dark', 'free'];
const FOOD_ADJ = ['delicious', 'spicy', 'sweet', 'salty', 'sour', 'bitter', 'hot', 'fresh', 'cheap', 'expensive', 'warm', 'terrible', 'amazing', 'popular', 'famous', 'special', 'perfect'];
const THING_ADJ = new Set([...PLACE_ADJ, ...OBJECT_ADJ, ...FOOD_ADJ, 'easy', 'difficult', 'important', 'interesting', 'boring', 'fun', 'fast', 'slow']);
const adjFor = (list) => { const set = new Set(list); return WORDS.filter((w) => w.pos === 'adj' && set.has(w.en.toLowerCase()) && !w.nobe); };
const BE_ADJ = { person: adjFor(PERSON_ADJ), thing: adjFor(THING_ADJ), place: adjFor(PLACE_ADJ), object: adjFor(OBJECT_ADJ), food: adjFor(FOOD_ADJ) };

/** 색칠된 형태 HTML */
export const partsHTML = (parts) => parts.map((p) => `<span class="m m-${p.k}">${p.t.replace(/</g, '&lt;')}</span>`).join('');

function optionsFor(correct, candidates, rng, n = 3) {
  const seen = new Set([low(correct)]);
  const opts = [];
  for (const c of rngShuffle(candidates, rng)) {
    const k = low(c);
    if (!c || seen.has(k)) continue;
    seen.add(k);
    opts.push(c);
    if (opts.length >= n) break;
  }
  return rngShuffle([correct, ...opts], rng);
}

// ---------- 철자 실수 ----------
/** -ing 철자 실수: running → runing, making → makeing, visiting → visitting */
export function badIng(v) {
  const h = head(v);
  const out = new Set();
  if (/ie$/.test(h)) out.add(`${h}ing`).add(`${h.slice(0, -1)}ing`);
  else if (/[^aeiouy]e$/.test(h)) out.add(`${h}ing`).add(`${h.slice(0, -1)}${h.slice(-2, -1)}ing`);
  else if (doublesFinal(h)) out.add(`${h}ing`).add(`${h}${h.slice(-1)}${h.slice(-1)}ing`);
  else if (/[^aeiouwxy]$/.test(h)) out.add(`${h}${h.slice(-1)}ing`);
  out.delete(ingForm(h));
  return [...out].map((f) => (tail(v) ? `${f} ${tail(v)}` : f));
}
/** 과거형 실수: stopped → stoped, studied → studyed, went → goed, played → plaied */
export function badPast(v) {
  const h = head(v);
  const out = new Set();
  if (IRREGULAR[h]) {
    out.add(regularPast(h));
    if (IRREGULAR[h][1] !== IRREGULAR[h][0]) out.add(IRREGULAR[h][1]);
    out.add(`${IRREGULAR[h][0]}ed`);
  } else {
    if (/[^aeiou]y$/.test(h)) out.add(`${h}ed`);
    if (/[aeiou]y$/.test(h)) out.add(`${h.slice(0, -1)}ied`);
    if (doublesFinal(h)) out.add(`${h}ed`);
    else if (/[^aeiouwxy]$/.test(h) && h.length > 2) out.add(`${h}${h.slice(-1)}ed`);
    if (/e$/.test(h)) out.add(`${h}ed`);
    out.add(`${h}t`);
  }
  out.delete(pastForm(h));
  return [...out].map((f) => (tail(v) ? `${f} ${tail(v)}` : f));
}

// ---------- 동사 시제 ----------
/** 이 시제·인칭에서 한국인이 흔히 틀리는 문장들 (정답과 다른 것만) */
export function conjErrors(verb, tense, p, { neg = false, q = false } = {}) {
  const s = p === 0 ? 'I' : PERSONS[p];
  const S = cap(s);
  const third = p === 2 || p === 3;
  const base = verb;
  const v3 = thirdPerson(verb), ing = ingForm(verb), past = pastForm(verb, p), pp = ppForm(verb);
  const be = beNow(p), wrongBe = third ? 'are' : p === 0 ? 'is' : 'is';
  const bep = bePast(p), wrongBep = bep === 'was' ? 'were' : 'was';
  const negOf = { am: 'am not', is: "isn't", are: "aren't", was: "wasn't", were: "weren't" };
  const doR = third ? 'does' : 'do', doW = third ? 'do' : 'does';
  const nt = (x) => `${x}n't`;
  const out = [];
  switch (tense) {
    case 'pres':
      if (q) out.push(`${cap(doW)} ${s} ${base}?`, `${cap(doR)} ${s} ${v3}?`, `${cap(be)} ${s} ${base}?`);
      else if (neg) out.push(`${S} ${nt(doW)} ${base}`, `${S} ${nt(doR)} ${v3}`, `${S} ${negOf[be]} ${base}`, `${S} not ${base}`);
      else out.push(`${S} ${third ? base : v3}`, `${S} ${be} ${base}`, `${S} ${ing}`);
      break;
    case 'prog': case 'pastProg': {
      const b = tense === 'prog' ? be : bep, wb = tense === 'prog' ? wrongBe : wrongBep;
      const bad = badIng(verb);
      if (q) out.push(`${cap(tense === 'prog' ? doR : 'did')} ${s} ${ing}?`, `${cap(wb)} ${s} ${ing}?`, `${cap(b)} ${s} ${base}?`);
      else if (neg) out.push(`${S} ${tense === 'prog' ? nt(doR) : "didn't"} ${ing}`, `${S} ${b} not ${base}`, `${S} ${negOf[wb]} ${ing}`);
      else out.push(`${S} ${ing}`, `${S} ${b} ${base}`, `${S} ${wb} ${ing}`, ...bad.map((x) => `${S} ${b} ${x}`));
      break;
    }
    case 'past':
      if (q) out.push(`Did ${s} ${past}?`, `${cap(bep)} ${s} ${base}?`, `${cap(doR)} ${s} ${base}?`);
      else if (neg) out.push(`${S} didn't ${past}`, `${S} ${negOf[bep]} ${base}`, `${S} ${nt(doR)} ${base}`);
      else out.push(...badPast(verb).map((x) => `${S} ${x}`), `${S} ${base}`, `${S} ${bep} ${base}`);
      break;
    case 'perf': {
      const hv = third ? 'has' : 'have', hw = third ? 'have' : 'has';
      if (q) out.push(`${cap(hw)} ${s} ${pp}?`, `${cap(doR)} ${s} ${pp}?`, past !== pp ? `${cap(hv)} ${s} ${past}?` : `${cap(hv)} ${s} ${base}?`);
      else if (neg) out.push(`${S} ${nt(hw)} ${pp}`, `${S} ${nt(doR)} ${pp}`, past !== pp ? `${S} ${nt(hv)} ${past}` : `${S} ${nt(hv)} ${base}`);
      else out.push(`${S} ${hw} ${pp}`, past !== pp ? `${S} ${hv} ${past}` : `${S} ${hv} ${base}`, `${S} ${pp}`);
      break;
    }
    case 'fut':
      if (q) out.push(`Will ${s} ${v3}?`, `${cap(doR)} ${s} will ${base}?`, `Will ${s} to ${base}?`);
      else if (neg) out.push(`${S} won't ${v3}`, `${S} ${nt(doR)} will ${base}`, `${S} won't to ${base}`);
      else out.push(`${S} will ${v3}`, `${S} will to ${base}`, `${S} will ${ing}`);
      break;
    case 'can': case 'should': {
      const m = tense;
      if (q) out.push(`${cap(m)} ${s} ${v3}?`, `${cap(doR)} ${s} ${m} ${base}?`, `${cap(m)} ${s} to ${base}?`);
      else if (neg) out.push(`${S} ${m === 'can' ? "can't" : "shouldn't"} ${v3}`, `${S} ${nt(doR)} ${m} ${base}`, `${S} ${m === 'can' ? "can't" : "shouldn't"} to ${base}`);
      else out.push(`${S} ${m} ${v3}`, `${S} ${m} to ${base}`, `${S} ${m}s ${base}`);
      break;
    }
    case 'going':
      if (q) out.push(`${cap(doR)} ${s} going to ${base}?`, `${cap(wrongBe)} ${s} going to ${base}?`, `${cap(be)} ${s} going to ${v3}?`);
      else if (neg) out.push(`${S} ${nt(doR)} going to ${base}`, `${S} ${negOf[be]} going to ${v3}`, `${S} ${negOf[wrongBe]} going to ${base}`);
      else out.push(`${S} going to ${base}`, `${S} ${be} going to ${ing}`, `${S} ${wrongBe} going to ${base}`, `${S} ${be} go to ${base}`);
      break;
    case 'haveto': {
      const hv = third ? 'has' : 'have', hw = third ? 'have' : 'has';
      if (q) out.push(`${cap(hv)} ${s} to ${base}?`, `${cap(doW)} ${s} have to ${base}?`, `${cap(doR)} ${s} has to ${base}?`);
      else if (neg) out.push(`${S} ${nt('have')} to ${base}`, `${S} ${nt(doW)} have to ${base}`, `${S} ${nt(doR)} has to ${base}`);
      else out.push(`${S} ${hw} to ${base}`, `${S} ${hv} to ${v3}`, `${S} must to ${base}`);
      break;
    }
    case 'want': {
      const wv = third ? 'wants' : 'want', ww = third ? 'want' : 'wants';
      if (q) out.push(`${cap(doW)} ${s} want to ${base}?`, `${cap(doR)} ${s} wants to ${base}?`, `${cap(be)} ${s} want to ${base}?`);
      else if (neg) out.push(`${S} ${nt(doW)} want to ${base}`, `${S} ${nt(doR)} wants to ${base}`, `${S} ${negOf[be]} want to ${base}`);
      else out.push(`${S} ${ww} to ${base}`, `${S} ${wv} ${base}`, `${S} ${wv} to ${v3}`);
      break;
    }
    case 'imp':
      if (p === 4) out.push(neg ? `Let's don't ${base}` : `Let's ${ing}`, neg ? `Let's not to ${base}` : `Let's to ${base}`, neg ? `Don't let's ${v3}` : `Let us ${v3}`);
      else out.push(neg ? `Not ${base}` : `To ${base}`, neg ? `Don't ${ing}` : cap(ing), neg ? `No ${base}` : cap(v3));
      break;
    default:
  }
  return out;
}

export const DEFAULT_TENSES = ['pres', 'prog', 'past'];
const NEG_KO = { imp: '하지 마 / 하지 말자' };

export function conjItem(pool, rng = Math.random, { tenses = DEFAULT_TENSES, negRate = 0.25, qRate = 0.25 } = {}) {
  const v = rngPick(pool, rng);
  const tense = rngPick(tenses, rng);
  const p = rngPick(personsFor(tense), rng);
  const r = rng();
  const opts = tense === 'imp' ? (r < 0.35 ? { neg: true } : {}) : r < negRate ? { neg: true } : r < negRate + qRate ? { q: true } : {};
  const form = conjugate(v.en, tense, p, opts);
  const T = TENSES[tense];
  const tag = opts.neg ? ' · 부정' : opts.q ? ' · 질문' : '';
  const who = tense === 'imp' ? (p === 4 ? "Let's(우리 ~하자)" : '명령(너)') : PERSONS[p];
  const errs = conjErrors(v.en, tense, p, opts);
  const accept = [form.text];
  const alt = PP_ALT[head(v.en)];
  if (tense === 'perf' && alt) accept.push(form.text.replace(new RegExp(`\\b${ppForm(head(v.en))}\\b`), alt[0]));
  return {
    kind: 'conj',
    q: `${v.en} → ${who} · ${T.name}${tag}`,
    sub: `${headKo(v.ko)} · ${tense === 'imp' ? (opts.neg ? NEG_KO.imp : '해 / 하자') : `${PERSON_KO[p]} · ${T.ko}${opts.neg ? ' (부정)' : opts.q ? ' (질문)' : ''}`}`,
    answer: form.text,
    accept,
    options: optionsFor(form.text, errs, rng),
    why: `${partsHTML(form.parts)}<br>${conjWhy(v.en, tense, p, opts)}`,
    say: /[?!]$/.test(form.text) ? form.text : `${form.text}.`,
  };
}

function conjWhy(verb, tense, p, { neg, q }) {
  const third = p === 2 || p === 3;
  const h = head(verb);
  switch (tense) {
    case 'pres':
      if (q) return `일반동사 질문: <b>${third ? 'Does' : 'Do'}</b> + 주어 + 동사원형`;
      if (neg) return `일반동사 부정: <b>${third ? "doesn't" : "don't"}</b> + 동사원형${third ? ' (doesn\'t 뒤에는 -s를 붙이지 않아요)' : ''}`;
      return third ? `he·she·it(3인칭 단수) 현재 → 동사에 <b>-s</b>${/(s|sh|ch|x|o)$/.test(h) ? ' (s·sh·ch·x·o로 끝나면 -es)' : /[^aeiou]y$/.test(h) ? ' (자음+y → -ies)' : ''}` : '3인칭 단수가 아니면 동사원형 그대로';
    case 'prog': case 'pastProg':
      return `<b>be(${tense === 'prog' ? beNow(p) : bePast(p)})</b> + 동사-ing${neg ? ' · 부정은 be 뒤에 not' : q ? ' · 질문은 be를 앞으로' : ''}${doublesFinal(h) ? ` · 짧은 모음+자음 → 자음 겹쳐 ${ingForm(h)}` : /[^aeiouy]e$/.test(h) ? ` · e를 빼고 ${ingForm(h)}` : ''}`;
    case 'past':
      if (q) return '과거 질문: <b>Did</b> + 주어 + 동사원형 (인칭 상관없이 did)';
      if (neg) return "과거 부정: <b>didn't</b> + 동사원형 (didn't 뒤에 과거형 ×)";
      return isIrregular(verb) ? `불규칙 동사: ${h} → <b>${pastForm(h, p)}</b>` : `규칙 과거: <b>-ed</b>${doublesFinal(h) ? ' (자음 겹치기)' : /[^aeiou]y$/.test(h) ? ' (자음+y → -ied)' : /e$/.test(h) ? ' (e로 끝나면 -d만)' : ''}`;
    case 'perf':
      return `<b>${third ? 'has' : 'have'}</b> + 과거분사(${ppForm(h)})${isIrregular(verb) ? ` — ${h}-${pastForm(h, p)}-${ppForm(h)}` : ''}`;
    case 'fut': return `<b>will</b> + 동사원형 (인칭 상관없이 같아요)${neg ? " · will not = won't" : ''}`;
    case 'can': return `<b>can</b> + 동사원형 (can 뒤에 to·-s ×)${neg ? " · can not = can't" : ''}`;
    case 'should': return `<b>should</b> + 동사원형${neg ? " · should not = shouldn't" : ''}`;
    case 'going': return `<b>be(${beNow(p)}) going to</b> + 동사원형`;
    case 'haveto': return `<b>${third ? 'has' : 'have'} to</b> + 동사원형${neg ? ` · 부정은 ${third ? "doesn't" : "don't"} have to (~할 필요 없다)` : q ? ` · 질문은 ${third ? 'Does' : 'Do'} … have to?` : ''}`;
    case 'want': return `<b>${third ? 'wants' : 'want'} to</b> + 동사원형${neg || q ? ` · ${third ? 'does' : 'do'} 뒤에는 want 원형` : ''}`;
    case 'imp': return p === 4 ? `<b>Let's</b> + 동사원형${neg ? " · 부정은 Let's not" : ''}` : `명령문은 <b>동사원형</b>으로 시작${neg ? " · 부정은 Don't + 원형" : ''}`;
    default: return '';
  }
}

// ---------- be동사 ----------
const BE_SUBJ = [
  { en: 'I', p: 0, ko: '나' }, { en: 'you', p: 1, ko: '너' }, { en: 'he', p: 2, ko: '그' }, { en: 'she', p: 3, ko: '그녀' },
  { en: 'we', p: 4, ko: '우리' }, { en: 'they', p: 5, ko: '그들' }, { en: 'it', p: 2, ko: '그것', kind: 'thing' },
  { en: 'my mom', p: 3, ko: '우리 엄마' }, { en: 'my friends', p: 5, ko: '내 친구들', pl: true }, { en: 'Tom', p: 2, ko: '톰' },
  { en: 'the kids', p: 5, ko: '아이들', pl: true }, { en: 'this room', p: 2, ko: '이 방', kind: 'place' }, { en: 'the shoes', p: 5, ko: '그 신발', kind: 'object' },
  { en: 'this soup', p: 2, ko: '이 수프', kind: 'food' },
];
const BE_NEG = { am: 'am not', is: "isn't", are: "aren't", was: "wasn't", were: "weren't" };

export function beItem(rng = Math.random) {
  const s = rngPick(BE_SUBJ, rng);
  const useJob = !s.kind && JOB_POOL.length && rng() < 0.4;
  const w = useJob ? rngPick(JOB_POOL, rng) : rngPick(BE_ADJ[s.kind || 'person'], rng);
  const plural5 = s.p === 4 || s.p === 5;
  const comp = useJob ? (plural5 ? plural(w) : `${article(w.en)} ${w.en}`) : w.en;
  const past = rng() < 0.35;
  const r = rng();
  const form = r < 0.5 ? 'aff' : r < 0.75 ? 'neg' : 'q';
  const be = past ? bePast(s.p) : beNow(s.p);
  const subj = s.en;
  let q, answer, cands, full;
  if (form === 'q') {
    answer = cap(be);
    q = `___ ${subj} ${comp}?`;
    full = `${answer} ${subj} ${comp}?`;
    cands = ['Am', 'Is', 'Are', 'Was', 'Were', 'Do', 'Does', 'Did'];
  } else if (form === 'neg') {
    answer = BE_NEG[be];
    q = `${cap(subj)} ___ ${comp}.`;
    full = s.p === 0 && !past ? `I'm not ${comp}.` : `${cap(subj)} ${answer} ${comp}.`;
    cands = ["am not", "isn't", "aren't", "wasn't", "weren't", "don't", "doesn't", "not"];
  } else {
    answer = be;
    q = `${cap(subj)} ___ ${comp}.`;
    full = `${cap(subj)} ${be} ${comp}.`;
    cands = ['am', 'is', 'are', 'was', 'were', 'be'];
  }
  const tKo = past ? '과거' : '현재';
  const fKo = form === 'neg' ? ' · 부정(~이 아니다)' : form === 'q' ? ' · 질문(~이니?)' : '';
  const who = s.p === 0 ? 'I → am/was' : s.p === 2 || s.p === 3 ? `${subj}(3인칭 단수) → is/was` : `${subj}(복수·you) → are/were`;
  return {
    kind: 'be',
    q,
    sub: `${s.ko} · ${headKo(w.ko)} · ${tKo}${fKo}`,
    answer,
    accept: form === 'neg' ? [answer, answer.replace("n't", ' not'), s.p === 0 && !past ? "'m not" : null].filter(Boolean) : [answer],
    options: optionsFor(answer, cands, rng),
    why: `${who}${form === 'neg' ? ' · be 뒤에 not' : form === 'q' ? ' · 질문은 be동사를 맨 앞으로' : ''}${useJob && !plural5 ? ` · 직업 하나는 ${article(w.en)} ${w.en}` : useJob ? ` · 여럿이면 복수 ${plural(w)}` : ''}`,
    say: full,
  };
}

// ---------- 불규칙 동사 ----------
export const IRR_POOL = WORDS.filter((w) => w.pos === 'v' && IRREGULAR[head(w.en)] && head(w.en) !== 'be' && !tail(w.en));

export function irrItem(pool = IRR_POOL, rng = Math.random) {
  const v = rngPick(pool, rng);
  const h = head(v.en);
  const [past, pp] = IRREGULAR[h];
  const askPP = rng() < 0.4;
  const answer = askPP ? pp : past;
  const wrong = [regularPast(h), askPP ? past : pp, h, `${past}ed`, askPP ? `${pp}ed` : `${h}t`];
  const same = past === pp && past === h ? '세 형태가 모두 같아요 (A-A-A)' : past === pp ? '과거·과거분사가 같아요 (A-B-B)' : pp === h ? '원형과 과거분사가 같아요 (A-B-A)' : '세 형태가 모두 달라요 (A-B-C)';
  return {
    kind: 'irr',
    q: `${h} → ${askPP ? '과거분사(p.p.)' : '과거형'}`,
    sub: `${headKo(v.ko)} → ${askPP ? 'have + ___ (완료·수동)' : '~했다'}`,
    answer,
    accept: [answer, ...((askPP && PP_ALT[h]) || [])],
    options: optionsFor(answer, wrong, rng),
    why: `<b>${h} – ${past} – ${pp}</b><br>${same}`,
    say: `${h}, ${past}, ${pp}.`,
  };
}

// ---------- a/an · 복수 ----------
const AN_TRICKY = [
  { en: 'hour', ko: '한 시간', why: 'h를 발음하지 않아 [아우어]처럼 모음으로 시작 → an' },
  { en: 'honest man', ko: '정직한 남자', why: 'honest의 h는 묵음 [아니스트] → an' },
  { en: 'university', ko: '대학교', why: 'u를 [유]로 읽어 자음 y 소리로 시작 → a' },
  { en: 'uniform', ko: '교복', why: '[유니폼] — y 소리로 시작 → a' },
  { en: 'umbrella', ko: '우산', why: '[엄브렐러] — 모음 소리로 시작 → an' },
  { en: 'European city', ko: '유럽 도시', why: '[유러피언] — y 소리로 시작 → a' },
  { en: 'one-way ticket', ko: '편도 승차권', why: 'one은 [원] — w 소리로 시작 → a' },
  { en: 'useful tip', ko: '유용한 팁', why: '[유스풀] — y 소리 → a' },
  { en: 'honor', ko: '영광', why: 'h를 발음하지 않아 [아너] → an' },
  { en: 'unusual name', ko: '특이한 이름', why: 'un-은 [언] 모음 소리 → an' },
  { en: 'easy question', ko: '쉬운 질문', why: '[이지] — 모음 소리 → an' },
];

function badPlurals(n) {
  const w = n.en.toLowerCase();
  const out = new Set([`${w}s`, `${w}es`]);
  if (/[^aeiou]y$/.test(w)) out.add(`${w.slice(0, -1)}ies`).add(`${w.slice(0, -1)}is`);
  if (/fe?$/.test(w)) out.add(`${w.replace(/fe?$/, 'ves')}`);
  if (/[aeiou]y$/.test(w)) out.add(`${w.slice(0, -1)}ies`);
  if (/(s|sh|ch|x|z)$/.test(w)) out.add(`${w}s`).add(`${w}ses`);
  const irr = plural(n);
  if (irr !== `${w}s` && irr !== `${w}es` && !/ies$/.test(irr)) out.add(`${irr}s`).add(`${w}s`);
  out.delete(plural(n));
  return [...out];
}

export function nounItem(pool = NOUN_POOL, rng = Math.random) {
  if (rng() < 0.5) {
    const tricky = rng() < 0.3;
    let en, ko, why;
    if (tricky) ({ en, ko, why } = rngPick(AN_TRICKY, rng));
    else {
      const vowelFirst = pool.filter((w) => article(w.en) === 'an');
      const w = rng() < 0.5 && vowelFirst.length ? rngPick(vowelFirst, rng) : rngPick(pool, rng);
      en = w.en; ko = headKo(w.ko);
      const an = article(en) === 'an';
      why = `${en} [${toHangul(en)}] — ${an ? '모음 소리로 시작 → <b>an</b>' : '자음 소리로 시작 → <b>a</b>'} (철자가 아니라 소리로 정해요)`;
    }
    const answer = article(en);
    return {
      kind: 'art', q: `___ ${en}`, sub: `${ko} 하나`, answer, accept: [answer],
      options: ['a', 'an'], why, say: `${answer} ${en}.`,
    };
  }
  const w = rngPick(pool, rng);
  const answer = plural(w);
  const irr = answer !== `${w.en}s`;
  return {
    kind: 'pl', q: `${w.en} → 복수형`, sub: `${headKo(w.ko)} → 여러 개(두 개 이상)`, answer, accept: [answer],
    options: optionsFor(answer, badPlurals(w), rng),
    why: pluralWhy(w, answer, irr),
    say: `one ${w.en}, two ${answer}.`,
  };
}

function pluralWhy(w, answer, irr) {
  const e = w.en.toLowerCase();
  if (answer === e) return `${e}는 단수·복수 모양이 같아요 (<b>${answer}</b>)`;
  if (!answer.startsWith(e.slice(0, -1)) || /men$|ren$|ople$|eeth$|eet$|ice$|ves$/.test(answer)) return `불규칙 복수: ${e} → <b>${answer}</b> — 통째로 외워요`;
  if (/ies$/.test(answer)) return '자음 + y → y를 i로 바꾸고 <b>-es</b>';
  if (/(s|sh|ch|x|z)es$/.test(answer)) return 's·sh·ch·x로 끝나면 <b>-es</b> ([이즈] 소리)';
  if (/oes$/.test(answer)) return '일부 -o 명사는 <b>-es</b> (potatoes, tomatoes)';
  return irr ? `복수: <b>${answer}</b>` : '대부분의 명사는 <b>-s</b>';
}

// ---------- 비교급·최상급 ----------
export function cmpItem(pool = CMP_POOL, rng = Math.random) {
  const w = rngPick(pool, rng);
  const sup = rng() < 0.45;
  const a = w.en.toLowerCase();
  const answer = sup ? superlative(w) : comparative(w);
  const er = usesEr(w);
  const wrong = sup
    ? [`the ${a}est`, `the most ${a}est`, `the more ${a}`, comparative(w), er ? `the most ${a}` : `the ${a}est`, `most ${a}`]
    : [`more ${a}er`, er ? `more ${a}` : `${a}er`, `${a}r`, `${a}${a.slice(-1)}er`, superlative(w).replace(/^the /, '')];
  const irr = /^(good|well|bad|far|little|many|much)$/.test(a);
  return {
    kind: 'cmp',
    q: `${a} → ${sup ? '최상급(가장 ~한)' : '비교급(더 ~한)'}`,
    sub: `${headKo(w.ko)} → ${sup ? '가장' : '더'} ${headKo(w.ko)}`,
    answer,
    accept: sup ? [answer, answer.replace(/^the /, '')] : [answer],
    options: optionsFor(answer, wrong, rng),
    why: irr ? `불규칙: ${a} – ${comparative(w)} – ${superlative(w)}` : er
      ? `짧은 형용사는 <b>-er / -est</b>${/[^aeiou]y$/.test(a) ? ' (y → i)' : /e$/.test(a) ? ' (e로 끝나면 -r / -st)' : comparative(w).endsWith(`${a.slice(-1)}${a.slice(-1)}er`) ? ' (짧은 모음+자음 → 자음 겹치기)' : ''}`
      : `긴 형용사(2음절 이상)는 <b>more / the most</b> + 원형`,
    say: `${a}, ${comparative(w)}, ${superlative(w)}.`,
  };
}

// ---------- 인칭대명사 ----------
const beFor = (i) => (i === 0 ? 'am' : i >= 2 && i <= 4 ? 'is' : 'are'); // PRONOUNS 순서: I you he she it we they
const PRON_FRAMES = {
  subj: [(x) => `___ ${beFor(x.i)} very kind.`, (x) => `___ ${x.i >= 2 && x.i <= 4 ? 'lives' : 'live'} in Seoul.`],
  obj: [() => 'I like ___.', () => 'Can you help ___?', () => "Let's call ___ tonight."],
  det: [() => 'This is ___ bag.', () => 'I know ___ name.', () => '___ house is very big.'],
  pos: [() => 'This bag is ___.', () => 'The red car is ___.'],
  refl: [(x) => `${cap(x.subj)} made it ___.`],
};
const CASE_CUE = {
  subj: (p) => `${josa(p.ko, '은/는')} (주어)`,
  obj: (p) => `${josa(p.ko, '을/를')} · ${p.ko}에게 (목적어)`,
  det: (p) => `${p.ko}의 (소유격)`,
  pos: (p) => `${p.ko}의 것 (소유대명사)`,
  refl: (p) => `${p.ko} 자신이 직접 (재귀대명사)`,
};

export function pronItem(rng = Math.random) {
  const cas = rngPick(['subj', 'obj', 'obj', 'det', 'det', 'pos', 'refl'], rng);
  const choices = PRONOUNS.map((x, i) => ({ ...x, i })).filter((x) => x[cas] && !(x.i === 4 && cas !== 'obj' && cas !== 'det'));
  const pr = rngPick(choices, rng);
  const frame = rngPick(PRON_FRAMES[cas], rng)(pr);
  let answer = pr[cas];
  if (frame.startsWith('___')) answer = cap(answer);
  const others = [...Object.keys(PRONOUN_CASES).filter((c) => c !== cas).map((c) => pr[c]), ...PRONOUNS.filter((x) => x !== PRONOUNS[pr.i]).map((x) => x[cas])].filter(Boolean)
    .map((x) => (frame.startsWith('___') ? cap(x) : x));
  const C = PRONOUN_CASES[cas];
  return {
    kind: 'pron',
    q: frame,
    sub: CASE_CUE[cas](pr),
    answer,
    accept: [answer],
    options: optionsFor(answer, others, rng),
    why: `${pr.subj} → ${C.name}(${C.ko}) <b>${pr[cas]}</b><br>${pr.subj} · ${pr.obj} · ${pr.det} · ${pr.pos || '–'} · ${pr.refl}`,
    say: frame.replace('___', answer),
  };
}

// ---------- 전치사 in · on · at ----------
// [빈칸 문장, 정답, 뜻, 설명, (보기)]
export const PREP_ITEMS = [
  ['I get up ___ seven.', 'at', '저는 7시에 일어나요.', '시각(정확한 시점) 앞은 <b>at</b>'],
  ['See you ___ Monday.', 'on', '월요일에 봐요.', '요일 앞은 <b>on</b>'],
  ['My birthday is ___ May.', 'in', '제 생일은 5월이에요.', '월 앞은 <b>in</b>'],
  ['I was born ___ 1998.', 'in', '저는 1998년에 태어났어요.', '연도 앞은 <b>in</b>'],
  ['We have a party ___ my birthday.', 'on', '제 생일에 파티를 해요.', '특정한 날(생일·기념일) 앞은 <b>on</b>'],
  ['I study ___ the morning.', 'in', '저는 아침에 공부해요.', 'in the morning / afternoon / evening'],
  ["I can't sleep ___ night.", 'at', '밤에 잠을 못 자요.', '<b>at</b> night (밤에는 at!)'],
  ['It snows a lot ___ winter.', 'in', '겨울엔 눈이 많이 와요.', '계절 앞은 <b>in</b>'],
  ['The store opens ___ nine thirty.', 'at', '가게는 9시 30분에 열어요.', '시각 앞은 <b>at</b>'],
  ['I go to church ___ Sundays.', 'on', '저는 일요일마다 교회에 가요.', '요일(마다) 앞은 <b>on</b>'],
  ['Christmas is ___ December 25th.', 'on', '크리스마스는 12월 25일이에요.', '날짜 앞은 <b>on</b>'],
  ['I usually rest ___ the weekend.', 'on', '저는 보통 주말에 쉬어요.', '미국식 <b>on</b> the weekend (영국은 at the weekend)'],
  ['Let\'s meet ___ noon.', 'at', '정오에 만나요.', '<b>at</b> noon · at midnight'],
  ['I live ___ Seoul.', 'in', '저는 서울에 살아요.', '도시·나라 안 → <b>in</b>'],
  ['The keys are ___ the table.', 'on', '열쇠는 탁자 위에 있어요.', '표면 위 → <b>on</b>'],
  ['My phone is ___ my bag.', 'in', '휴대폰은 가방 안에 있어요.', '공간 안 → <b>in</b>'],
  ["I'm waiting ___ the bus stop.", 'at', '버스 정류장에서 기다리고 있어요.', '어떤 지점·장소 → <b>at</b>'],
  ["She's ___ home now.", 'at', '그녀는 지금 집에 있어요.', '<b>at</b> home · at work · at school'],
  ['There is a picture ___ the wall.', 'on', '벽에 그림이 있어요.', '벽에 붙은 것 → <b>on</b> the wall'],
  ["I'm ___ the bus.", 'on', '저 버스 안이에요.', '버스·지하철·비행기는 <b>on</b> (탈 것 위에 올라탄 느낌)'],
  ["I'm ___ a taxi.", 'in', '저 택시 안이에요.', '승용차·택시는 <b>in</b>'],
  ['He works ___ a bank.', 'at', '그는 은행에서 일해요.', '직장(지점) → <b>at</b>'],
  ['The cat is sleeping ___ the box.', 'in', '고양이가 상자 안에서 자고 있어요.', '상자 안 → <b>in</b>'],
  ['Turn left ___ the corner.', 'at', '모퉁이에서 왼쪽으로 도세요.', '지점 → <b>at</b> the corner'],
  ["The answer is ___ page ten.", 'on', '답은 10쪽에 있어요.', '페이지 → <b>on</b> page 10'],
  ['I saw her ___ the party.', 'at', '파티에서 그녀를 봤어요.', '행사(파티·콘서트) → <b>at</b>'],
  ['I go to work ___ bus.', 'by', '저는 버스로 출근해요.', '교통수단 → <b>by</b> bus (관사 없이)', ['by', 'on', 'with']],
  ['I came here ___ foot.', 'on', '걸어서 왔어요.', '걸어서는 <b>on</b> foot', ['on', 'by', 'with']],
  ['I go ___ school every day.', 'to', '저는 매일 학교에 가요.', '방향(~로) → <b>to</b>', ['to', 'at', 'in']],
  ["I'm ___ Korea.", 'from', '저는 한국에서 왔어요(한국 출신이에요).', '출신 → <b>from</b>', ['from', 'in', 'to']],
  ['I live ___ my parents.', 'with', '저는 부모님과 같이 살아요.', '함께 → <b>with</b>', ['with', 'and', 'to']],
  ['This gift is ___ you.', 'for', '이 선물은 당신을 위한 거예요.', '~을 위한 → <b>for</b>', ['for', 'to', 'at']],
  ['I lived in Busan ___ three years.', 'for', '부산에서 3년 동안 살았어요.', '기간(~동안) → <b>for</b>', ['for', 'during', 'since']],
  ["I've lived here ___ 2020.", 'since', '2020년부터 여기 살았어요.', '시작 시점(~부터 지금까지) → <b>since</b>', ['since', 'for', 'from']],
  ['The shop is open ___ nine to six.', 'from', '가게는 9시부터 6시까지 열어요.', '<b>from</b> A <b>to</b> B', ['from', 'since', 'at']],
  ['Please wait ___ five o\'clock.', 'until', '5시까지 기다려 주세요.', '계속 ~까지 → <b>until</b>', ['until', 'by', 'to']],
  ['Finish the report ___ Friday.', 'by', '금요일까지 보고서를 끝내세요.', '마감(늦어도 ~까지) → <b>by</b>', ['by', 'until', 'on']],
  ['The bank is next ___ the cafe.', 'to', '은행은 카페 옆에 있어요.', '<b>next to</b> ~ 옆에', ['to', 'by', 'at']],
  ['The cat is ___ the bed.', 'under', '고양이는 침대 밑에 있어요.', '아래 → <b>under</b>', ['under', 'on', 'in']],
  ['The car is ___ the house.', 'behind', '차는 집 뒤에 있어요.', '뒤 → <b>behind</b>', ['behind', 'under', 'on']],
  ["I'll be back ___ ten minutes.", 'in', '10분 뒤에 돌아올게요.', '지금부터 ~ 뒤에 → <b>in</b> ten minutes'],
  ['He is good ___ math.', 'at', '그는 수학을 잘해요.', '<b>good at</b> ~을 잘하다', ['at', 'in', 'on']],
  ["I'm interested ___ music.", 'in', '저는 음악에 관심이 있어요.', '<b>interested in</b> ~에 관심 있다', ['in', 'at', 'on']],
  ['Thank you ___ your help.', 'for', '도와줘서 고마워요.', '<b>thank you for</b> ~해 줘서 고마워', ['for', 'to', 'of']],
  ["I'm afraid ___ dogs.", 'of', '저는 개가 무서워요.', '<b>afraid of</b> ~을 무서워하다', ['of', 'from', 'at']],
  ['Listen ___ me.', 'to', '내 말 들어 봐.', '<b>listen to</b> ~을 듣다', ['to', 'at', 'for']],
  ['Look ___ this picture.', 'at', '이 사진 좀 봐.', '<b>look at</b> ~을 보다', ['at', 'to', 'on']],
  ["I'm looking ___ my keys.", 'for', '열쇠를 찾고 있어요.', '<b>look for</b> ~을 찾다', ['for', 'at', 'to']],
];

/** 문제마다 같은 문장으로 읽어 주는 드릴(불규칙·a/an·복수·비교급·전치사) — 녹음 음성 목록용 */
export function fixedDrillTexts() {
  const out = [];
  for (const v of IRR_POOL) { const h = head(v.en); out.push(`${h}, ${IRREGULAR[h][0]}, ${IRREGULAR[h][1]}.`); }
  for (const w of NOUN_POOL) out.push(`${article(w.en)} ${w.en}.`, `one ${w.en}, two ${plural(w)}.`);
  for (const t of AN_TRICKY) out.push(`${article(t.en)} ${t.en}.`);
  for (const w of CMP_POOL) { const a = w.en.toLowerCase(); out.push(`${a}, ${comparative(w)}, ${superlative(w)}.`); }
  for (const [q, a] of PREP_ITEMS) out.push(q.replace('___', a));
  return out;
}

export function prepItem(rng = Math.random) {
  const [q, answer, ko, why, opts] = rngPick(PREP_ITEMS, rng);
  return {
    kind: 'prep', q, sub: ko, answer, accept: [answer],
    options: rngShuffle(opts || ['in', 'on', 'at'], rng),
    why, say: q.replace('___', answer),
  };
}
