// 영어 형태 엔진: 복수 · 관사 a/an · 3인칭 -s · -ing · 과거·과거분사(불규칙) · 비교급·최상급 · 시제 활용
// 활용 함수는 { text, parts:[{t,k}] } 를 돌려준다. k: subj aux neg stem end irr q art sp
import { vowelSound, syllables, stressLast } from './pron.js';

// ---------- 불규칙 동사 (원형 → [과거, 과거분사]) ----------
export const IRREGULAR = {
  be: ['was/were', 'been'], beat: ['beat', 'beaten'], become: ['became', 'become'], begin: ['began', 'begun'], bend: ['bent', 'bent'],
  bet: ['bet', 'bet'], bite: ['bit', 'bitten'], bleed: ['bled', 'bled'], blow: ['blew', 'blown'], break: ['broke', 'broken'],
  bring: ['brought', 'brought'], build: ['built', 'built'], buy: ['bought', 'bought'], catch: ['caught', 'caught'], choose: ['chose', 'chosen'],
  come: ['came', 'come'], cost: ['cost', 'cost'], cut: ['cut', 'cut'], deal: ['dealt', 'dealt'], dig: ['dug', 'dug'],
  do: ['did', 'done'], draw: ['drew', 'drawn'], drink: ['drank', 'drunk'], drive: ['drove', 'driven'], eat: ['ate', 'eaten'],
  fall: ['fell', 'fallen'], feed: ['fed', 'fed'], feel: ['felt', 'felt'], fight: ['fought', 'fought'], find: ['found', 'found'],
  fly: ['flew', 'flown'], forget: ['forgot', 'forgotten'], forgive: ['forgave', 'forgiven'], freeze: ['froze', 'frozen'], get: ['got', 'gotten'],
  give: ['gave', 'given'], go: ['went', 'gone'], grow: ['grew', 'grown'], hang: ['hung', 'hung'], have: ['had', 'had'],
  hear: ['heard', 'heard'], hide: ['hid', 'hidden'], hit: ['hit', 'hit'], hold: ['held', 'held'], hurt: ['hurt', 'hurt'],
  keep: ['kept', 'kept'], know: ['knew', 'known'], lay: ['laid', 'laid'], lead: ['led', 'led'], leave: ['left', 'left'],
  lend: ['lent', 'lent'], let: ['let', 'let'], lie: ['lay', 'lain'], light: ['lit', 'lit'], lose: ['lost', 'lost'],
  make: ['made', 'made'], mean: ['meant', 'meant'], meet: ['met', 'met'], oversleep: ['overslept', 'overslept'], pay: ['paid', 'paid'],
  put: ['put', 'put'], quit: ['quit', 'quit'], read: ['read', 'read'], ride: ['rode', 'ridden'], ring: ['rang', 'rung'],
  rise: ['rose', 'risen'], run: ['ran', 'run'], say: ['said', 'said'], see: ['saw', 'seen'], sell: ['sold', 'sold'],
  send: ['sent', 'sent'], set: ['set', 'set'], shake: ['shook', 'shaken'], shoot: ['shot', 'shot'], show: ['showed', 'shown'],
  shut: ['shut', 'shut'], sing: ['sang', 'sung'], sink: ['sank', 'sunk'], sit: ['sat', 'sat'], sleep: ['slept', 'slept'],
  speak: ['spoke', 'spoken'], spend: ['spent', 'spent'], stand: ['stood', 'stood'], steal: ['stole', 'stolen'], stick: ['stuck', 'stuck'],
  sweep: ['swept', 'swept'], swim: ['swam', 'swum'], take: ['took', 'taken'], teach: ['taught', 'taught'], tear: ['tore', 'torn'],
  tell: ['told', 'told'], think: ['thought', 'thought'], throw: ['threw', 'thrown'], understand: ['understood', 'understood'], wake: ['woke', 'woken'],
  wear: ['wore', 'worn'], win: ['won', 'won'], write: ['wrote', 'written'], overeat: ['overate', 'overeaten'], babysit: ['babysat', 'babysat'],
};
// 과거분사로 다른 형태도 인정 (get → got/gotten)
export const PP_ALT = { get: ['got'], dream: ['dreamt'], learn: ['learnt'] };

const VOW = 'aeiou';
const isV = (c) => VOW.includes(c);
const head = (v) => String(v).trim().split(/\s+/)[0].toLowerCase();
const tail = (v) => String(v).trim().split(/\s+/).slice(1).join(' ');
const withTail = (v, form) => (tail(v) ? `${form} ${tail(v)}` : form);

/** 끝 자음을 겹쳐 쓰나: stop → stopped, begin → beginning, visit → visiting(×), open → opening(×) */
export function doublesFinal(word) {
  const w = word.toLowerCase();
  if (w.length < 3 || /[wxy]$/.test(w)) return false;
  const [a, b, c] = w.slice(-3);
  if (isV(c) || !isV(b) || isV(a)) return false;
  if (a === 'u' && w.slice(-4, -3) === 'q') return true; // quit → quitting
  if (/^(open|visit|listen|happen|enter|offer|order|answer|travel|cancel|label|limit|edit|exit|benefit|focus|budget|target|deposit)$/.test(w)) return false;
  return syllables(w) <= 1 || stressLast(w);
}

/** 3인칭 단수 현재: play → plays, watch → watches, study → studies, have → has */
export function thirdPerson(v) {
  const h = head(v);
  const irr = { have: 'has', be: 'is', do: 'does', go: 'goes' }[h];
  let f;
  if (irr) f = irr;
  else if (/(s|sh|ch|x|z|o)$/.test(h)) f = `${h}es`;
  else if (/[^aeiou]y$/.test(h)) f = `${h.slice(0, -1)}ies`;
  else f = `${h}s`;
  return withTail(v, f);
}

/** -ing: make → making, run → running, lie → lying, see → seeing */
export function ingForm(v) {
  const h = head(v);
  let f;
  if (h === 'be') f = 'being';
  else if (/ie$/.test(h)) f = `${h.slice(0, -2)}ying`;
  else if (/[^aeiouy]e$/.test(h) || /ue$/.test(h)) f = `${h.slice(0, -1)}ing`;
  else if (doublesFinal(h)) f = `${h}${h.slice(-1)}ing`;
  else f = `${h}ing`;
  return withTail(v, f);
}

/** 규칙 과거형: like → liked, stop → stopped, study → studied, play → played */
export function regularPast(h) {
  if (/e$/.test(h)) return `${h}d`;
  if (/[^aeiou]y$/.test(h)) return `${h.slice(0, -1)}ied`;
  if (doublesFinal(h)) return `${h}${h.slice(-1)}ed`;
  return `${h}ed`;
}

export const isIrregular = (v) => !!IRREGULAR[head(v)];
/** 과거형 (be는 was/were 중 하나를 고르도록 p를 받는다) */
export function pastForm(v, p = 0) {
  const h = head(v);
  if (h === 'be') return withTail(v, p === 0 || p === 2 || p === 3 ? 'was' : 'were');
  return withTail(v, IRREGULAR[h] ? IRREGULAR[h][0] : regularPast(h));
}
export function ppForm(v) {
  const h = head(v);
  return withTail(v, IRREGULAR[h] ? IRREGULAR[h][1] : regularPast(h));
}

// ---------- 명사 ----------
const PLURAL_IRR = {
  man: 'men', woman: 'women', child: 'children', person: 'people', tooth: 'teeth', foot: 'feet', mouse: 'mice', goose: 'geese',
  fish: 'fish', sheep: 'sheep', deer: 'deer', knife: 'knives', wife: 'wives', life: 'lives', leaf: 'leaves', half: 'halves',
  wolf: 'wolves', shelf: 'shelves', thief: 'thieves', loaf: 'loaves', potato: 'potatoes', tomato: 'tomatoes', hero: 'heroes',
  echo: 'echoes', ox: 'oxen', policeman: 'policemen', businessman: 'businessmen', grandchild: 'grandchildren',
};

/** 복수형: cat → cats, bus → buses, city → cities, child → children ('alt' 플래그로 덮어쓸 수 있다) */
export function plural(noun) {
  const n = typeof noun === 'string' ? { en: noun } : noun;
  if (n.pl) return n.pl;
  const words = n.en.trim().split(/\s+/);
  const last = words.pop();
  const lw = last.toLowerCase();
  let f;
  if (PLURAL_IRR[lw]) f = PLURAL_IRR[lw];
  else if (/(s|ss|sh|ch|x|z)$/.test(lw)) f = `${last}es`;
  else if (/[^aeiou]y$/.test(lw)) f = `${last.slice(0, -1)}ies`;
  else f = `${last}s`;
  if (last[0] !== lw[0] && f === PLURAL_IRR[lw]) f = f[0].toUpperCase() + f.slice(1);
  return [...words, f].join(' ');
}

/** 부정관사: a cat · an apple · an hour · a university */
export const article = (word) => (vowelSound(String(word).trim().split(/\s+/)[0]) ? 'an' : 'a');
export const withArticle = (word) => `${article(word)} ${word}`;

// ---------- 형용사 ----------
const CMP_IRR = {
  good: ['better', 'best'], well: ['better', 'best'], bad: ['worse', 'worst'], far: ['farther', 'farthest'],
  little: ['less', 'least'], many: ['more', 'most'], much: ['more', 'most'],
  shy: ['shyer', 'shyest'], // shier도 맞지만 shyer가 더 흔하다
};

/** 비교급을 -er로 만드나 (1음절, -y로 끝나는 2음절). w.cmp='more'|'er'로 덮어쓰기 */
export function usesEr(adj) {
  const a = typeof adj === 'string' ? { en: adj } : adj;
  if (a.cmp === 'more') return false;
  if (a.cmp === 'er') return true;
  const w = a.en.toLowerCase();
  if (/(ed|ing|ful|less|ous|ive|ic|al)$/.test(w) && w.length > 4) return false;
  const s = syllables(w);
  return s === 1 || (s === 2 && /[^aeiou]y$/.test(w));
}

function erForm(w, suf) {
  if (/e$/.test(w)) return `${w}${suf.slice(1)}`; // nice → nicer
  if (/[^aeiou]y$/.test(w)) return `${w.slice(0, -1)}i${suf}`; // happy → happier
  if (syllables(w) === 1 && doublesFinal(w)) return `${w}${w.slice(-1)}${suf}`; // big → bigger
  return `${w}${suf}`;
}

/** 비교급: tall → taller, beautiful → more beautiful, good → better */
export function comparative(adj) {
  const a = typeof adj === 'string' ? { en: adj } : adj;
  const w = a.en.toLowerCase();
  if (CMP_IRR[w]) return CMP_IRR[w][0];
  return usesEr(a) ? erForm(w, 'er') : `more ${w}`;
}
/** 최상급 (the 포함): the tallest, the most beautiful, the best */
export function superlative(adj) {
  const a = typeof adj === 'string' ? { en: adj } : adj;
  const w = a.en.toLowerCase();
  if (CMP_IRR[w]) return `the ${CMP_IRR[w][1]}`;
  return usesEr(a) ? `the ${erForm(w, 'est')}` : `the most ${w}`;
}

// ---------- 인칭대명사 ----------
export const PRONOUNS = [
  { subj: 'I', obj: 'me', det: 'my', pos: 'mine', refl: 'myself', ko: '나' },
  { subj: 'you', obj: 'you', det: 'your', pos: 'yours', refl: 'yourself', ko: '너' },
  { subj: 'he', obj: 'him', det: 'his', pos: 'his', refl: 'himself', ko: '그' },
  { subj: 'she', obj: 'her', det: 'her', pos: 'hers', refl: 'herself', ko: '그녀' },
  { subj: 'it', obj: 'it', det: 'its', pos: '', refl: 'itself', ko: '그것' },
  { subj: 'we', obj: 'us', det: 'our', pos: 'ours', refl: 'ourselves', ko: '우리' },
  { subj: 'they', obj: 'them', det: 'their', pos: 'theirs', refl: 'themselves', ko: '그들' },
];
export const PRONOUN_CASES = {
  subj: { name: '주격', ko: '은/는·이/가', ex: 'She is kind.' },
  obj: { name: '목적격', ko: '을/를·에게', ex: 'I like her.' },
  det: { name: '소유격', ko: '의', ex: 'This is her bag.' },
  pos: { name: '소유대명사', ko: '의 것', ex: 'This bag is hers.' },
  refl: { name: '재귀대명사', ko: '자신', ex: 'She did it herself.' },
};

// ---------- 시제 활용 ----------
/** 활용 인칭: 0 I · 1 you · 2 he · 3 she · 4 we · 5 they */
export const PERSONS = ['I', 'you', 'he', 'she', 'we', 'they'];
export const PERSON_KO = ['나', '너', '그', '그녀', '우리', '그들'];
const third = (p) => p === 2 || p === 3;
export const beNow = (p) => (p === 0 ? 'am' : third(p) ? 'is' : 'are');
export const bePast = (p) => (p === 0 || third(p) ? 'was' : 'were');
const NEG = { am: "'m not", is: "isn't", are: "aren't", was: "wasn't", were: "weren't", do: "don't", does: "doesn't", did: "didn't", have: "haven't", has: "hasn't", will: "won't", can: "can't", should: "shouldn't" };

export const TENSES = {
  pres: { name: '현재(습관)', en: '동사원형 / 3인칭 -s', ko: '늘 ~한다', ex: 'She plays tennis. 그녀는 테니스를 쳐요.' },
  prog: { name: '현재진행', en: 'am/is/are + -ing', ko: '~하고 있다', ex: "I'm playing. 하고 있어요." },
  past: { name: '과거', en: '-ed / 불규칙', ko: '~했다', ex: 'I played. 했어요.' },
  pastProg: { name: '과거진행', en: 'was/were + -ing', ko: '~하고 있었다', ex: 'I was playing. 하고 있었어요.' },
  fut: { name: '미래 will', en: 'will + 원형', ko: '~할 것이다 · ~할게', ex: "I'll play. 할게요." },
  going: { name: '예정 be going to', en: 'am/is/are going to + 원형', ko: '~할 예정이다', ex: "I'm going to play. 할 거예요." },
  perf: { name: '현재완료', en: 'have/has + 과거분사', ko: '~한 적 있다 · 막 ~했다', ex: "I've played. 해 봤어요." },
  can: { name: '가능 can', en: 'can + 원형', ko: '~할 수 있다', ex: 'I can play. 할 수 있어요.' },
  should: { name: '충고 should', en: 'should + 원형', ko: '~하는 게 좋다', ex: 'You should play. 하는 게 좋아요.' },
  haveto: { name: '의무 have to', en: 'have/has to + 원형', ko: '~해야 한다', ex: 'I have to play. 해야 해요.' },
  want: { name: '희망 want to', en: 'want(s) to + 원형', ko: '~하고 싶다', ex: 'I want to play. 하고 싶어요.' },
  imp: { name: "명령·Let's", en: "원형 / Don't + 원형 / Let's + 원형", ko: '~해 · ~하지 마 · ~하자', ex: "Play! / Don't play! / Let's play!" },
};
export const TENSE_KEYS = Object.keys(TENSES);

/** 활용 가능한 인칭 (명령은 you(명령)·we(Let's)) */
export const personsFor = (tense) => (tense === 'imp' ? [1, 4] : [0, 1, 2, 3, 4, 5]);

const P = (t, k) => ({ t, k });
const sp = (t, k) => ({ t: ` ${t}`, k });
const cap = (parts) => {
  const p0 = parts[0];
  return p0 ? [{ ...p0, t: p0.t[0].toUpperCase() + p0.t.slice(1) }, ...parts.slice(1)] : parts;
};
const result = (parts) => ({ text: parts.map((x) => x.t).join(''), parts });

/** 동사 형태를 원형·어미로 나눠 보여 준다: plays → play+s, studies → stud+ies, went → went(불규칙) */
function verbParts(v, form, kind) {
  const h = head(v);
  const t = tail(v);
  const f = form.split(/\s+/)[0];
  let parts;
  if (kind === 'irr' || (f !== h && !f.startsWith(h.replace(/(e|y)$/, '')))) parts = [sp(f, 'irr')];
  else {
    let i = 0;
    while (i < h.length && i < f.length && h[i] === f[i]) i++;
    if (/e$/.test(h) && i === h.length - 1) parts = [sp(h.slice(0, -1), 'stem'), P(f.slice(h.length - 1), 'end')];
    else if (i >= h.length) parts = f.length > h.length ? [sp(h, 'stem'), P(f.slice(h.length), 'end')] : [sp(h, 'stem')];
    else parts = [sp(f.slice(0, i), 'stem'), P(f.slice(i), 'end')];
  }
  if (t) parts.push(sp(t, 'stem'));
  return parts;
}
const baseParts = (v) => [sp(String(v).trim(), 'stem')];

/**
 * 동사 활용. tense: pres prog past pastProg fut going perf can should haveto want imp
 * p: 0~5 (I you he she we they), opts: { neg, q } — 부정은 축약형(don't, isn't), 긍정은 풀어 쓴 형태(I am)
 */
export function conjugate(v, tense, p, { neg = false, q = false } = {}) {
  const verb = String(v).trim();
  const h = head(verb);
  const S = PERSONS[p];
  const subj = P(S, 'subj');
  let parts;
  const auxQ = (aux, rest) => cap([P(aux, 'aux'), sp(S, 'subj'), ...rest, P('?', 'q')]);
  const auxNeg = (aux, rest) => {
    const n = NEG[aux];
    if (aux === 'am') return [subj, P("'m", 'aux'), sp('not', 'neg'), ...rest];
    const base = n.replace(/n't$/, '');
    return [subj, sp(base, 'aux'), P("n't", 'neg'), ...rest];
  };
  switch (tense) {
    case 'pres': {
      if (h === 'be') {
        const be = beNow(p);
        parts = q ? auxQ(be, []) : neg ? auxNeg(be, []) : [subj, sp(be, 'aux')];
        break;
      }
      const d = third(p) ? 'does' : 'do';
      if (q) parts = auxQ(d, baseParts(verb));
      else if (neg) parts = auxNeg(d, baseParts(verb));
      else parts = [subj, ...(third(p) ? verbParts(verb, thirdPerson(verb)) : baseParts(verb))];
      break;
    }
    case 'prog': case 'pastProg': {
      const be = tense === 'prog' ? beNow(p) : bePast(p);
      const ing = verbParts(verb, ingForm(verb));
      parts = q ? auxQ(be, ing) : neg ? auxNeg(be, ing) : [subj, sp(be, 'aux'), ...ing];
      break;
    }
    case 'past': {
      if (h === 'be') {
        const be = bePast(p);
        parts = q ? auxQ(be, []) : neg ? auxNeg(be, []) : [subj, sp(be, 'aux')];
        break;
      }
      if (q) parts = auxQ('did', baseParts(verb));
      else if (neg) parts = auxNeg('did', baseParts(verb));
      else parts = [subj, ...verbParts(verb, pastForm(verb, p), isIrregular(verb) ? 'irr' : null)];
      break;
    }
    case 'perf': {
      const have = third(p) ? 'has' : 'have';
      const pp = verbParts(verb, ppForm(verb), isIrregular(verb) ? 'irr' : null);
      parts = q ? auxQ(have, pp) : neg ? auxNeg(have, pp) : [subj, sp(have, 'aux'), ...pp];
      break;
    }
    case 'fut': case 'can': case 'should': {
      const m = tense === 'fut' ? 'will' : tense;
      parts = q ? auxQ(m, baseParts(verb)) : neg ? auxNeg(m, baseParts(verb)) : [subj, sp(m, 'aux'), ...baseParts(verb)];
      break;
    }
    case 'going': {
      const be = beNow(p);
      const rest = [sp('going to', 'aux'), ...baseParts(verb)];
      parts = q ? auxQ(be, rest) : neg ? auxNeg(be, rest) : [subj, sp(be, 'aux'), ...rest];
      break;
    }
    case 'haveto': case 'want': {
      const main = tense === 'haveto' ? 'have' : 'want';
      const rest = [sp(third(p) ? thirdPerson(main) : main, 'aux'), sp('to', 'aux'), ...baseParts(verb)];
      const restBase = [sp(main, 'aux'), sp('to', 'aux'), ...baseParts(verb)];
      const d = third(p) ? 'does' : 'do';
      parts = q ? auxQ(d, restBase) : neg ? auxNeg(d, restBase) : [subj, ...rest];
      break;
    }
    case 'imp': {
      const vb = baseParts(verb).map((x) => ({ ...x, t: x.t.trimStart() }));
      if (p === 4) parts = neg ? [P("Let's", 'aux'), sp('not', 'neg'), sp(verb, 'stem')] : [P("Let's", 'aux'), sp(verb, 'stem')];
      else parts = neg ? [P('Do', 'aux'), P("n't", 'neg'), sp(verb, 'stem')] : cap(vb);
      break;
    }
    default:
      throw new Error(`unknown tense ${tense}`);
  }
  if (!q && tense !== 'imp') parts = cap(parts);
  return result(parts);
}
