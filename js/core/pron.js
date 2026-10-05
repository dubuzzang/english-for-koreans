// 영어 발음 사전 (CMU 발음 사전에서 앱에 나오는 단어만 뽑은 것 — scripts/pron.mjs가 만든다)
// 발음은 ARPAbet 기호 배열: hello → ['HH','AH0','L','OW1'] (숫자 = 강세: 1 주강세 · 2 부강세 · 0 약함)
import { PRON_TEXT } from '../data/pron.js';

let MAP = null;
function load() {
  MAP = new Map();
  for (const line of PRON_TEXT.split('\n')) {
    const i = line.indexOf(' ');
    if (i > 0) MAP.set(line.slice(0, i), line.slice(i + 1).split(' '));
  }
}

export const isVowel = (p) => /^[A-Z]{2}[012]$/.test(p);
const VOICELESS_END = new Set(['P', 'T', 'K', 'F', 'TH']);
const SIBILANT_END = new Set(['S', 'Z', 'SH', 'ZH', 'CH', 'JH']);

export const pronKey = (word) => String(word).toLowerCase().replace(/[’‘`]/g, "'").replace(/^'+|'+$/g, '');

/** 단어의 발음 (없으면 null). 사전에 없는 소유격 's는 앞 단어 발음에 붙여 만든다 */
export function pron(word) {
  if (!MAP) load();
  const k = pronKey(word);
  if (!k) return null;
  const hit = MAP.get(k);
  if (hit) return hit;
  const m = /^(.+)'s$/.exec(k);
  if (m) {
    const base = MAP.get(m[1]);
    if (base) {
      const last = base[base.length - 1].replace(/[012]$/, '');
      return [...base, ...(SIBILANT_END.has(last) ? ['IH0', 'Z'] : VOICELESS_END.has(last) ? ['S'] : ['Z'])];
    }
  }
  return null;
}

export const hasPron = (word) => !!pron(word);

/** 음절 수 (사전에 없으면 모음 덩어리로 어림) */
export function syllables(word) {
  const p = pron(word);
  if (p) return p.filter(isVowel).length;
  const s = String(word).toLowerCase().replace(/e$/, '');
  return Math.max(1, (s.match(/[aeiouy]+/g) || []).length);
}

/** 마지막 음절에 주강세가 있나 (begin → true, visit → false). 1음절이면 true */
export function stressLast(word) {
  const p = pron(word);
  if (!p) return syllables(word) <= 1;
  const v = p.filter(isVowel);
  return v.length <= 1 || v[v.length - 1].endsWith('1');
}

/** 모음 소리로 시작하나 (an hour, a university) */
export function vowelSound(word) {
  const p = pron(word);
  if (p) return isVowel(p[0]);
  const w = String(word).toLowerCase();
  if (/^(uni|use|usu|uti|eu|one|once|ewe)/.test(w)) return false;
  if (/^(hour|honest|honor|honour|heir)/.test(w)) return true;
  return /^[aeiou]/.test(w);
}
