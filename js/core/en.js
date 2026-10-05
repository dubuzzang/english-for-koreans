// 영어 문자열 도우미 — 정규화(축약형·숫자·영국식 철자), 채점, 차이 표시, 타일 자르기
import { numberEn, ordinalEn } from './numbers.js';

export const lower = (s) => String(s ?? '').normalize('NFC').toLowerCase();
/** 악센트 접기: café → cafe */
export const fold = (s) => String(s ?? '').normalize('NFKD').replace(/[̀-ͯ]/g, '');
export const capitalize = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

// 축약형 → 풀어 쓴 형태 (채점할 때 I'm = I am, don't = do not 으로 본다)
const CONTRACTIONS = {
  "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are',
  "it's": 'it is', "that's": 'that is', "what's": 'what is', "where's": 'where is', "who's": 'who is',
  "how's": 'how is', "there's": 'there is', "here's": 'here is', "when's": 'when is', "why's": 'why is',
  "let's": 'let us',
  "i've": 'i have', "you've": 'you have', "we've": 'we have', "they've": 'they have', "could've": 'could have', "should've": 'should have', "would've": 'would have',
  "i'll": 'i will', "you'll": 'you will', "he'll": 'he will', "she'll": 'she will', "it'll": 'it will', "we'll": 'we will', "they'll": 'they will', "that'll": 'that will', "there'll": 'there will',
  "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not',
  "don't": 'do not', "doesn't": 'does not', "didn't": 'did not',
  "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not',
  "won't": 'will not', "wouldn't": 'would not', "can't": 'can not', cannot: 'can not', "couldn't": 'could not',
  "shouldn't": 'should not', "mustn't": 'must not', "needn't": 'need not', "ain't": 'is not',
  "gonna": 'going to', "wanna": 'want to', "gotta": 'got to',
};
// he's/she's/it's … 뒤에 과거분사가 오면 has, 아니면 is · I'd/you'd … 뒤에 과거분사·better면 had, 아니면 would
const PP = new Set(['been', 'got', 'gotten', 'gone', 'done', 'had', 'seen', 'eaten', 'made', 'taken', 'written', 'given', 'known', 'met',
  'lost', 'left', 'bought', 'broken', 'forgotten', 'heard', 'finished', 'already', 'just', 'never', 'ever', 'lived', 'worked', 'visited', 'tried']);
const S_PRON = new Set(['he', 'she', 'it', 'that', 'what', 'where', 'who', 'how', 'there', 'here', 'when', 'everyone', 'everything', 'nobody', 'someone']);
const D_PRON = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they', 'that', 'there', 'who']);

// 영국식 철자·표기 차이 (미국식으로 맞춰 비교)
const VARIANT = {
  colour: 'color', colours: 'colors', favourite: 'favorite', favourites: 'favorites', centre: 'center', theatre: 'theater', metre: 'meter', metres: 'meters',
  grey: 'gray', travelling: 'traveling', travelled: 'traveled', traveller: 'traveler', cancelled: 'canceled', cancelling: 'canceling',
  realise: 'realize', realised: 'realized', organise: 'organize', apologise: 'apologize', practise: 'practice', programme: 'program',
  neighbour: 'neighbor', neighbours: 'neighbors', honour: 'honor', flavour: 'flavor', labour: 'labor', humour: 'humor', mum: 'mom', mummy: 'mommy',
  okay: 'ok', alright: 'all right', till: 'until', thru: 'through',
};

function expandToken(tok, next) {
  const t = tok;
  if (CONTRACTIONS[t]) return CONTRACTIONS[t];
  let m = /^([a-z]+)'s$/.exec(t);
  if (m && S_PRON.has(m[1])) return `${m[1]} ${PP.has(next) ? 'has' : 'is'}`;
  m = /^([a-z]+)'d$/.exec(t);
  if (m && D_PRON.has(m[1])) return `${m[1]} ${PP.has(next) || next === 'better' ? 'had' : 'would'}`;
  m = /^([a-z]+)'re$/.exec(t);
  if (m) return `${m[1]} are`;
  m = /^([a-z]+)'ll$/.exec(t);
  if (m) return `${m[1]} will`;
  if (/^\d+(st|nd|rd|th)$/.test(t)) return ordinalEn(parseInt(t, 10)).replace(/-/g, ' ');
  if (/^\d+$/.test(t) && t.length <= 9) return numberEn(Number(t)).replace(/-/g, ' ');
  return VARIANT[t] || t;
}

/** 비교용 정규화: 소문자, 악센트·부호 제거, 축약형 풀기, 숫자 → 글자, 영국식 철자 → 미국식 */
export function normalize(s) {
  const base = fold(lower(s))
    .replace(/[’‘`´ʼ]/g, "'")
    .replace(/(\d),(\d{3})\b/g, '$1$2')
    .replace(/[-–—/]/g, ' ')
    .replace(/[.,!?¿¡;:"“”«»()[\]…~*]/g, ' ')
    .replace(/(^|\s)'+|'+(?=\s|$)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!base) return '';
  const toks = base.split(' ');
  return toks.map((t, i) => expandToken(t, toks[i + 1])).join(' ').replace(/\s+/g, ' ').trim();
}

export function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

/**
 * 입력 채점.
 * level: exact(정확) · typo(오타 1~2자) · wrong · empty — 축약형(I'm = I am)·대소문자·문장부호 차이는 정답
 * strict: 문법 드릴처럼 철자 하나가 핵심일 때 — 오타도 오답 처리
 */
const loose = (s) => fold(lower(s)).replace(/[’‘'`]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

export function checkAnswer(input, answers, { strict = false } = {}) {
  const list = (Array.isArray(answers) ? answers : [answers]).filter(Boolean);
  const n = normalize(input);
  if (!n) return { ok: false, level: 'empty', expected: list[0] };
  let best = null;
  for (const a of list) {
    const na = normalize(a);
    if (n === na) return { ok: true, level: 'exact', expected: a };
    // 아포스트로피만 빠진 경우 (dont · Minas) — 오타로 본다
    if (n.replace(/'/g, '') === na.replace(/'/g, '') || loose(input) === loose(a)) {
      if (!best) best = { ok: !strict, level: 'typo', expected: a };
      continue;
    }
    if (!strict && !best) {
      const d = lev(n, na);
      const tol = na.length >= 10 ? 2 : na.length >= 4 ? 1 : 0;
      if (d <= tol) best = { ok: true, level: 'typo', expected: a };
    }
  }
  return best || { ok: false, level: 'wrong', expected: list[0] };
}

/** 사용자가 입력한 글자 중 틀린 위치 표시용 정렬 (입력 기준) */
export function diffChars(input, expected) {
  const a = [...lower(input)], b = [...lower(expected)];
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  const out = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
      out.push({ ch: [...input][i - 1] ?? a[i - 1], ok: a[i - 1] === b[j - 1] });
      i--; j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      out.push({ ch: [...input][i - 1] ?? a[i - 1], ok: false });
      i--;
    } else {
      out.push({ ch: '·', ok: false, miss: true });
      j--;
    }
  }
  return out.reverse();
}

/** 문장을 단어 타일로 자르기 (문장부호 제거, I'm·don't·Mina's의 아포스트로피는 단어 안에 유지) */
export function tokenize(sentence) {
  return String(sentence)
    .replace(/[—–]/g, ' ')
    .split(/\s+/)
    .map((t) => {
      const keepApos = /s'[.,!?;:"”)]*$/i.test(t); // 복수 소유격 parents'
      const core = t.replace(/^[.,!?;:"“”«»()…‘’']+|[.,!?;:"“”«»()…‘’']+$/g, '');
      return keepApos && core ? `${core}'` : core;
    })
    .filter(Boolean);
}
