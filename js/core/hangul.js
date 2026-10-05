// 영어 → 한글 발음 표기 (학습 초기용 근사치)
// CMU 발음 사전의 발음 기호(ARPAbet)를 외래어 표기 규칙에 가깝게 한글로 옮기고, 강세 음절을 표시한다.
// 예) hello → 헐로우(로우 강세) · water → 워러(미국식 t) · thank → 쌩크 · English → 잉글리쉬
// f/p, v/b, r/l, th/s처럼 한글로 구분할 수 없는 소리가 있으니 소리를 꼭 함께 들어야 한다.
import { pron, isVowel } from './pron.js';

// 초성: ㄱ0 ㄲ1 ㄴ2 ㄷ3 ㄸ4 ㄹ5 ㅁ6 ㅂ7 ㅃ8 ㅅ9 ㅆ10 ㅇ11 ㅈ12 ㅉ13 ㅊ14 ㅋ15 ㅌ16 ㅍ17 ㅎ18
const ONSET = { P: 17, B: 7, T: 16, D: 3, DX: 5, K: 15, G: 0, F: 17, V: 7, TH: 10, DH: 3, S: 9, Z: 12, SH: 9, ZH: 12, CH: 14, JH: 12, HH: 18, M: 6, N: 2, L: 5, R: 5 };
// 중성: ㅏ0 ㅐ1 ㅑ2 ㅒ3 ㅓ4 ㅔ5 ㅕ6 ㅖ7 ㅗ8 ㅘ9 ㅙ10 ㅚ11 ㅛ12 ㅜ13 ㅝ14 ㅞ15 ㅟ16 ㅠ17 ㅡ18 ㅢ19 ㅣ20
const VOWEL = { AA: [0], AE: [1], AH: [4], AO: [8], AW: [0, 13], AY: [0, 20], EH: [5], ER: [4], EY: [5, 20], IH: [20], IY: [20], OW: [8, 13], OY: [8, 20], UH: [13], UW: [13] };
const Y_GLIDE = { 0: 2, 1: 3, 4: 6, 5: 7, 8: 12, 13: 17, 18: 20, 20: 20 };
const W_GLIDE = { 0: 9, 1: 10, 4: 14, 5: 15, 8: 14, 13: 13, 18: 16, 20: 16 };
const SH_GLIDE = { ...Y_GLIDE, 20: 16 }; // she → 쉬
// 종성: ㄱ1 ㄴ4 ㄹ8 ㅁ16 ㅂ17 ㅅ19 ㅇ21
const CODA = { K: 1, N: 4, L: 8, M: 16, P: 17, T: 19, NG: 21 };
// 받침으로 끝나는 짧은 모음 (cat 캣 · book 북 / 긴 모음·이중모음 뒤는 '으': seat 씨트 · make 메이크)
const SHORT = new Set(['IH', 'EH', 'AE', 'AH', 'UH', 'AA']);
// 자음만 남을 때 붙이는 모음: 대부분 '으', sh·ch·j 소리는 '이'
const EPENTHETIC = { SH: [9, 16], CH: [14, 20], JH: [12, 20], ZH: [12, 20] };
// -le, -en 처럼 약한 모음이 거의 사라지는 끝음절 (apple 애플 · seven 쎄븐 · button 버튼)
const SYLLABIC_L = new Set(['P', 'B', 'T', 'D', 'DX', 'K', 'G', 'F', 'V', 'S', 'Z', 'TH']);
const SYLLABIC_N = new Set(['P', 'B', 'T', 'D', 'F', 'V', 'S', 'Z', 'TH']);
const R_SCHWA = new Set(['IH', 'IY', 'EH', 'UH', 'UW']); // here 히어 · where 웨어 · tour 투어

// 한국 고유명사·외래어 등 그대로 쓰는 편이 나은 말
const WORD_KO = {
  seoul: '서울', busan: '부산', jeju: '제주', incheon: '인천', daegu: '대구', gangnam: '강남', mina: '미나', jisu: '지수', minsu: '민수',
  junho: '준호', bomi: '보미', yuna: '유나', seojun: '서준', kimchi: '김치', bibimbap: '비빔밥', bulgogi: '불고기',
  tteokbokki: '떡볶이', soju: '소주', hanbok: '한복', good: '굿',
};

const compose = (b) => String.fromCharCode(0xac00 + (b.L * 21 + b.V) * 28 + b.T);

function convert(phones) {
  const T = phones.map((p) => (isVowel(p) ? { v: p.slice(0, 2), st: Number(p[2]) } : { c: p }));
  const n = T.length;
  // ① 미국식 t: 모음(또는 모음+r)과 약한 모음 사이에서 ㄹ처럼 (water 워러 · city 씨리) — 약한 -en 앞은 제외(button)
  //    d는 한국 학습자에게 익숙한 표기(medium 미디엄 · body 바디)를 따른다
  for (let i = 1; i < n - 1; i++) {
    const t = T[i];
    if (t.c !== 'T') continue;
    const prev = T[i - 1], next = T[i + 1];
    const afterVowel = prev.v || (prev.c === 'R' && T[i - 2]?.v);
    const syllabicN = next.v === 'AH' && T[i + 2]?.c === 'N';
    if (afterVowel && next.v && next.st === 0 && !syllabicN) t.c = 'DX';
  }
  // ② 각 모음의 첫소리(자음 하나 + 반모음 w·y)를 정한다
  const role = new Array(n).fill(null);
  for (let i = 0; i < n; i++) {
    const t = T[i];
    if (!t.v) continue;
    let j = i - 1;
    if (T[j]?.c === 'W' || T[j]?.c === 'Y') { role[j] = 'glide'; t.glide = T[j].c; j--; }
    const c = T[j]?.c;
    if (c && c !== 'NG' && c !== 'W' && c !== 'Y' && role[j] === null) {
      // 자음+w는 k·g·h만 한 글자로(quick 퀵), 나머지는 따로(twenty 트웬티 · sweet 스위트)
      if (t.glide !== 'W' || c === 'K' || c === 'G' || c === 'HH') { role[j] = 'onset'; t.onset = c; t.first = j === 0; }
    }
    // 모음 바로 앞이 er이면 r이 첫소리가 된다 (camera 캐머러)
    if (!t.onset && !t.glide && T[i - 1]?.v === 'ER') t.onset = 'R';
  }
  // ③ 한글 음절 만들기
  const out = [];
  const last = () => out[out.length - 1];
  const push = (L, V, st = null, ep = false) => { const b = { L, V, T: 0, st, ep }; out.push(b); return b; };
  const restIsConsonant = (i) => T.slice(i).every((x) => !x.v);

  for (let i = 0; i < n; i++) {
    const t = T[i];
    if (role[i]) continue;
    if (t.v) {
      const base = VOWEL[t.v];
      let V0 = base[0];
      const c = t.onset;
      // 약한 끝음절 -le · -en (apple 애플 · seven 쎄븐)
      if (t.v === 'AH' && t.st === 0 && c && restIsConsonant(i + 1)) {
        const nx = T[i + 1]?.c;
        if ((nx === 'L' && SYLLABIC_L.has(c)) || (nx === 'N' && SYLLABIC_N.has(c))) V0 = 18;
      }
      let L = 11;
      if (c) {
        if ((c === 'L') && out.length && last().T === 0) last().T = CODA.L; // l은 ㄹㄹ (hello 헐로우 · play 플레이)
        L = ONSET[c];
        if (c === 'S' && (t.first || ((t.v === 'IH' || t.v === 'IY') && t.st > 0))) L = 10; // see 씨 · sun 썬
        if (c === 'SH') V0 = SH_GLIDE[V0] ?? V0;
      }
      if (t.glide === 'Y') V0 = Y_GLIDE[V0] ?? V0;
      if (t.glide === 'W') V0 = W_GLIDE[V0] ?? V0;
      push(L, V0, t.st);
      for (const m of base.slice(1)) push(11, m, t.st); // 이중모음 뒷소리 (day 데이 · go 고우)
      continue;
    }
    // 첫소리가 아닌 자음: 받침이 되거나 '으'를 붙여 따로 소리 낸다
    const c = t.c;
    const prev = last();
    const prevTok = T[i - 1];
    const next = T[i + 1];
    if (c === 'R') {
      if (prevTok?.v && R_SCHWA.has(prevTok.v)) push(11, 4, prevTok.st); // here 히어
      continue; // car 카 · park 파크 (모음 뒤 r은 생략)
    }
    if (c === 'NG') { if (prev && prev.T === 0) prev.T = CODA.NG; continue; }
    if (c === 'M' || c === 'N' || c === 'L') {
      if (prev && prev.T === 0) { prev.T = CODA[c]; continue; }
      push(ONSET[c], 18, null, true);
      continue;
    }
    // 끝소리 ts·dz는 한 소리로: it's 잇츠 · cats 캐츠 · kids 키즈
    if (((c === 'T' && next?.c === 'S') || (c === 'D' && next?.c === 'Z')) && i + 2 >= n) {
      if (c === 'T' && prevTok?.v && SHORT.has(prevTok.v) && prev && prev.T === 0) prev.T = CODA.T;
      push(c === 'T' ? 14 : 12, 18, null, true);
      i++;
      continue;
    }
    if ((c === 'P' || c === 'T' || c === 'K') && prevTok?.v && SHORT.has(prevTok.v) && prev && prev.T === 0
      && !['L', 'R', 'M', 'N', 'W', 'Y'].includes(next?.c)) {
      prev.T = CODA[c]; // cat 캣 · cup 컵 · book 북
      continue;
    }
    if (c === 'W' || c === 'Y') continue;
    const [L, V] = EPENTHETIC[c] || [ONSET[c] ?? 11, 18];
    push(L, V, null, true);
  }
  const multi = T.filter((x) => x.v).length > 1;
  return out.map((b) => ({ s: compose(b), b: multi && b.st === 1 }));
}

const cache = new Map();
/** 단어 하나 → [{s:'헐', b:false}, {s:'로', b:true}, …] (발음을 모르면 null) */
export function wordHangul(word) {
  const key = String(word).toLowerCase().replace(/[’‘]/g, "'");
  if (cache.has(key)) return cache.get(key);
  let res = null;
  const bare = key.replace(/[^a-z']/g, '');
  const poss = /^(.+)'s$/.exec(bare);
  if (WORD_KO[bare.replace(/'/g, '')]) res = [{ s: WORD_KO[bare.replace(/'/g, '')], b: false }];
  else if (poss && WORD_KO[poss[1]]) res = [{ s: `${WORD_KO[poss[1]]}즈`, b: false }];
  else {
    const p = pron(key);
    if (p) res = convert(p);
  }
  if (cache.size > 5000) cache.clear();
  cache.set(key, res);
  return res;
}

/** 문장 → [{t, b}] 조각 (b: 강세 음절). 모르는 단어·숫자·문장부호는 그대로 */
export function toHangulParts(text) {
  const parts = [];
  for (const tok of String(text ?? '').split(/([A-Za-z][A-Za-z'’]*)/)) {
    if (!tok) continue;
    const syl = /^[A-Za-z]/.test(tok) ? wordHangul(tok.replace(/['’]+$/, '')) : null;
    if (syl) for (const x of syl) parts.push({ t: x.s, b: x.b });
    else parts.push({ t: tok, b: false });
  }
  // 이웃한 같은 종류 조각 합치기
  const merged = [];
  for (const p of parts) {
    const prev = merged[merged.length - 1];
    if (prev && prev.b === p.b) prev.t += p.t;
    else merged.push({ ...p });
  }
  return merged;
}

/** 문장 전체를 한글 발음으로 (강세 표시 없이) */
export const toHangul = (text) => toHangulParts(text).map((p) => p.t).join('');

/** 발음을 아는 단어인가 (한글 표기가 가능한가) */
export const canHangul = (word) => !!wordHangul(word);
