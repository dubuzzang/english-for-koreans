// 발음 사전 만들기: 앱에 나오는 모든 영어 단어(활용형 포함)의 발음을 CMU 발음 사전에서 뽑아 js/data/pron.js로
//   node scripts/pron.mjs   (tools/pron/cmudict.dict가 없으면 내려받는다)
// 한글 발음 표기·a/an 고르기·-ing 자음 겹치기에 쓴다. 사전에 없는 말은 EXTRA에 직접 적는다.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DICT = join(ROOT, 'tools', 'pron', 'cmudict.dict');
const OUT = join(ROOT, 'js', 'data', 'pron.js');
const DICT_URL = 'https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict';

// 사전에 없는 말 (ARPAbet)
export const EXTRA = {
  americano: 'AH0 M EH2 R IH0 K AA1 N OW0',
  atm: 'EY1 T IY1 EH1 M',
  bibimbap: 'B IY1 B IH0 M B AA2 P',
  bomi: 'B OW1 M IY0',
  bts: 'B IY1 T IY1 EH1 S',
  busan: 'B UW1 S AA0 N',
  daegu: 'D EY1 G UW0',
  fi: 'F AY1',
  hoodie: 'HH UH1 D IY0',
  jeju: 'JH EH1 JH UW0',
  jisu: 'JH IY1 S UW0',
  junho: 'JH UW1 N HH OW0',
  kimchi: 'K IH1 M CH IY0',
  latte: 'L AA1 T EY0',
  mina: 'M IY1 N AH0',
  minsu: 'M IH1 N S UW0',
  ok: 'OW2 K EY1',
  ramen: 'R AA1 M AH0 N',
  saturday: 'S AE1 T ER0 D EY2',
  thirty: 'TH ER1 T IY0',
  seatbelt: 'S IY1 T B EH2 L T',
  selfie: 'S EH1 L F IY0',
  stomachache: 'S T AH1 M AH0 K EY2 K',
  wi: 'W AY1',
  youtube: 'Y UW1 T UW2 B',
};

// 같은 철자, 다른 발음일 때 이 앱에서 주로 쓰는 쪽
const PREFER = {
  read: 'R IY1 D', live: 'L IH1 V', close: 'K L OW1 Z', use: 'Y UW1 Z', lead: 'L IY1 D', wind: 'W IH1 N D',
  record: 'R EH1 K ER0 D', present: 'P R EH1 Z AH0 N T', tear: 'T IH1 R', bow: 'B OW1', minute: 'M IH1 N AH0 T',
  thirty: 'TH ER1 T IY0', forty: 'F AO1 R T IY0', the: 'DH AH0', a: 'AH0', to: 'T UW1', for: 'F AO1 R', and: 'AE1 N D',
  can: 'K AE1 N', what: 'W AH1 T', of: 'AH1 V', from: 'F R AH1 M', at: 'AE1 T', was: 'W AA1 Z', were: 'W ER1',
  an: 'AE1 N', been: 'B IH1 N', your: 'Y AO1 R', often: 'AO1 F AH0 N', either: 'IY1 DH ER0', tomato: 'T AH0 M EY1 T OW2',
  route: 'R UW1 T', data: 'D EY1 T AH0', aunt: 'AE1 N T', again: 'AH0 G EH1 N', says: 'S EH1 Z', said: 'S EH1 D',
};

function loadDict() {
  const dict = new Map();
  for (const line of readFileSync(DICT, 'utf8').split('\n')) {
    const m = /^(\S+?)(?:\((\d+)\))? (.+?)(?:\s+#.*)?$/.exec(line.trim());
    if (!m) continue;
    const w = m[1];
    if (!dict.has(w)) dict.set(w, []);
    dict.get(w).push(m[3].trim());
  }
  return dict;
}

/** 여러 발음 중 고르기: 지정한 것 → 요일·-day는 [데이] → -ty는 t 발음 → 첫 번째 */
export function choose(word, variants) {
  if (PREFER[word] && variants.includes(PREFER[word])) return PREFER[word];
  if (/day$/.test(word)) { const v = variants.find((x) => /D EY\d$/.test(x)); if (v) return v; }
  if (/ty$/.test(word)) { const v = variants.find((x) => /T IY0$/.test(x)); if (v) return v; }
  return variants[0];
}

const lastPh = (p) => p.split(' ').pop().replace(/[012]$/, '');
const SIB = new Set(['S', 'Z', 'SH', 'ZH', 'CH', 'JH']);
const VL = new Set(['P', 'T', 'K', 'F', 'TH']);
const suffix = {
  s: (p) => (SIB.has(lastPh(p)) ? `${p} IH0 Z` : VL.has(lastPh(p)) ? `${p} S` : `${p} Z`),
  ed: (p) => (['T', 'D'].includes(lastPh(p)) ? `${p} IH0 D` : VL.has(lastPh(p)) || ['S', 'SH', 'CH'].includes(lastPh(p)) ? `${p} T` : `${p} D`),
  ing: (p) => `${p} IH0 NG`,
  er: (p) => `${p} ER0`,
  est: (p) => `${p} AH0 S T`,
};
/** 사전에 없는 활용형은 원형 발음에 어미 소리를 붙여 만든다 (sunnier ← sunny, gladder ← glad, hoodies ← hoodie) */
export function derive(word, lookup) {
  const rules = [
    [/ies$/, ['y'], 's'], [/es$/, ['', 'e'], 's'], [/s$/, [''], 's'],
    [/ied$/, ['y'], 'ed'], [/ed$/, ['', 'e'], 'ed'],
    [/ing$/, ['', 'e'], 'ing'],
    [/ier$/, ['y'], 'er'], [/er$/, ['', 'e'], 'er'],
    [/iest$/, ['y'], 'est'], [/est$/, ['', 'e'], 'est'],
  ];
  for (const [re, adds, kind] of rules) {
    if (!re.test(word)) continue;
    const stem = word.replace(re, '');
    const cands = adds.map((a) => stem + a);
    if (/([bdgklmnprt])\1$/.test(stem)) cands.push(stem.slice(0, -1)); // gladder → glad
    for (const c of cands) {
      const p = lookup(c);
      if (p && c.length >= 2) return suffix[kind](p);
    }
  }
  return null;
}

/** 앱에 나오는 모든 영어 글 + 문법 드릴이 만들어 내는 활용형 */
async function appTexts() {
  const { collectTexts } = await import('./audio.mjs');
  const { WORDS } = await import('../js/data/vocab.js');
  const M = await import('../js/core/morph.js');
  const D = await import('../js/core/drillgen.js');
  const { NOTES } = await import('../js/data/notes.js');
  const { LETTERS } = await import('../js/data/alphabet.js');
  const out = collectTexts().map((it) => it.text);
  for (const w of WORDS) {
    out.push(w.en, w.ex?.[0] || '', ...(w.alt || []));
    if (w.pos === 'v') {
      for (const t of M.TENSE_KEYS) for (const p of M.personsFor(t)) for (const o of [{}, { neg: true }, { q: true }]) out.push(M.conjugate(w.en, t, p, o).text);
      out.push(M.thirdPerson(w.en), M.ingForm(w.en), M.pastForm(w.en), M.ppForm(w.en));
    }
    if (w.pos === 'n' && !w.unc && !w.plonly && !w.proper) out.push(M.plural(w), `${M.article(w.en)} ${w.en}`);
    if (w.pos === 'adj' && !w.nocmp) out.push(M.comparative(w), M.superlative(w));
  }
  for (const pr of M.PRONOUNS) out.push(Object.values(pr).join(' '));
  out.push('my mom my friends Tom the kids very kind lives live in Seoul like help call tonight bag know name house is big made it red car');
  out.push(...D.PREP_ITEMS.map(([q, a]) => q.replace('___', a)));
  for (const n of NOTES) for (const s of n.sections) for (const html of [s.p, s.tip, s.warn, s.h, ...(s.table ? s.table.rows.flat() : [])]) out.push(String(html || '').replace(/<[^>]+>/g, ' '));
  for (const L of LETTERS) out.push(L.say, ...L.ex.map((e) => e[0]));
  return out;
}

async function main() {
  if (!existsSync(DICT)) {
    mkdirSync(join(ROOT, 'tools', 'pron'), { recursive: true });
    console.log('CMU 발음 사전 내려받는 중…');
    const res = await fetch(DICT_URL);
    if (!res.ok) throw new Error(`내려받기 실패 ${res.status}`);
    writeFileSync(DICT, await res.text());
  }
  // 처음에는 빈 사전으로도 돌 수 있도록 (활용형이 사전에 따라 달라지므로 두 번 돌리면 안정된다)
  if (!existsSync(OUT)) writeFileSync(OUT, "export const PRON_TEXT = '';\n");
  const dict = loadDict();
  const words = new Set();
  for (const t of await appTexts()) {
    for (const m of String(t).matchAll(/[A-Za-z][A-Za-z'’]*/g)) {
      const w = m[0].toLowerCase().replace(/’/g, "'").replace(/'+$/, '');
      if (w) words.add(w);
    }
  }
  const lines = [];
  const missing = [];
  const lookup = (w) => EXTRA[w] || (dict.has(w) ? choose(w, dict.get(w)) : null);
  for (const w of [...words].sort()) {
    const p = lookup(w);
    if (p) { lines.push(`${w} ${p}`); continue; }
    const poss = /^(.+)'s$/.exec(w);
    if (poss && lookup(poss[1])) continue; // 앱에서 소유격으로 만든다
    const d = derive(w, lookup);
    if (d) { lines.push(`${w} ${d}`); continue; }
    missing.push(w);
  }
  for (const [w, p] of Object.entries(EXTRA)) if (!words.has(w)) lines.push(`${w} ${p}`);
  lines.sort();
  writeFileSync(OUT, `// 자동 생성: node scripts/pron.mjs — CMU 발음 사전(cmudict, BSD)에서 앱에 나오는 단어만 (직접 고치지 마세요)\nexport const PRON_TEXT = ${JSON.stringify(lines.join('\n'))};\n`);
  console.log(`js/data/pron.js: 단어 ${lines.length}개 (${(readFileSync(OUT).length / 1024).toFixed(0)}KB) · 사전에 없음 ${missing.length}개`);
  if (missing.length) console.log('  없음:', missing.join(' '));
}

if (process.argv[1] && process.argv[1].endsWith('pron.mjs')) main();
