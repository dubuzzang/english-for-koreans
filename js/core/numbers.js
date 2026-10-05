// 숫자 · 서수 · 가격(달러) · 시각 → 영어 (규칙 생성, DOM 없음)

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function below100(n) {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10), o = n % 10;
  return o ? `${TENS[t]}-${ONES[o]}` : TENS[t];
}

function below1000(n) {
  const h = Math.floor(n / 100), r = n % 100;
  const out = [];
  if (h) out.push(`${ONES[h]} hundred`);
  if (r) out.push(below100(r));
  return out.join(' ');
}

/** 0 ~ 999,999,999,999 → 영어 (미국식: 101 = one hundred one, 21 = twenty-one) */
export function numberEn(n) {
  n = Math.floor(Math.abs(n));
  if (n === 0) return 'zero';
  const parts = [];
  const b = Math.floor(n / 1e9), m = Math.floor((n % 1e9) / 1e6), th = Math.floor((n % 1e6) / 1e3), r = n % 1e3;
  if (b) parts.push(`${below1000(b)} billion`);
  if (m) parts.push(`${below1000(m)} million`);
  if (th) parts.push(`${below1000(th)} thousand`);
  if (r) parts.push(below1000(r));
  return parts.join(' ');
}

const ORD_IRR = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' };
/** 서수: first, second, third, twenty-first, one hundredth … */
export function ordinalEn(n) {
  const w = numberEn(n);
  const m = /([a-z]+)$/.exec(w);
  const last = m[1];
  let ord;
  if (ORD_IRR[last]) ord = ORD_IRR[last];
  else if (last.endsWith('y')) ord = `${last.slice(0, -1)}ieth`;
  else ord = `${last}th`;
  return w.slice(0, m.index) + ord;
}

/** 서수 줄임: 1st 2nd 3rd 4th 11th 12th 13th 21st */
export function ordinalShort(n) {
  const t = n % 100;
  if (t >= 11 && t <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] || 'th'}`;
}

const splitPrice = (amount) => {
  const d = Math.floor(amount + 1e-9);
  return [d, Math.round((amount - d) * 100)];
};

/** 가격: 4.5 → "four dollars and fifty cents", 1 → "one dollar", 0.99 → "ninety-nine cents" */
export function priceEn(amount) {
  const [d, c] = splitPrice(amount);
  const ds = d ? `${numberEn(d)} dollar${d === 1 ? '' : 's'}` : '';
  const cs = c ? `${numberEn(c)} cent${c === 1 ? '' : 's'}` : '';
  if (ds && cs) return `${ds} and ${cs}`;
  return ds || cs || 'zero dollars';
}

/** 가격 줄여 읽기 (일상 회화): 4.5 → "four fifty", 12.99 → "twelve ninety-nine", 10 → "ten dollars" */
export function priceShortEn(amount) {
  const [d, c] = splitPrice(amount);
  if (!c) return `${numberEn(d)} dollar${d === 1 ? '' : 's'}`;
  if (!d) return `${numberEn(c)} cents`;
  return `${numberEn(d)} ${c < 10 ? `oh ${numberEn(c)}` : numberEn(c)}`;
}

/** 화면 표시: $4.50 · $10 · $1,250 */
export function fmtPrice(amount) {
  const [d, c] = splitPrice(amount);
  return `$${d.toLocaleString('en-US')}${c ? `.${String(c).padStart(2, '0')}` : ''}`;
}

const hourName = (h) => numberEn(h % 12 || 12);
const minuteDigital = (m) => (m < 10 ? `oh ${numberEn(m)}` : numberEn(m));

/** 시각 (요즘 가장 흔한 디지털 읽기): 3:00 It's three o'clock. · 3:05 It's three oh five. · 3:45 It's three forty-five. */
export function timeEn(h, m) {
  return m === 0 ? `It's ${hourName(h)} o'clock.` : `It's ${hourName(h)} ${minuteDigital(m)}.`;
}

/** 시각 (past/to 읽기): 3:15 It's a quarter past three. · 3:30 It's half past three. · 3:40 It's twenty to four. */
export function timePastEn(h, m) {
  if (m === 0) return `It's ${hourName(h)} o'clock.`;
  if (m === 15) return `It's a quarter past ${hourName(h)}.`;
  if (m === 30) return `It's half past ${hourName(h)}.`;
  if (m === 45) return `It's a quarter to ${hourName(h + 1)}.`;
  if (m < 30) return `It's ${numberEn(m)} past ${hourName(h)}.`;
  return `It's ${numberEn(60 - m)} to ${hourName(h + 1)}.`;
}

/** "몇 시에?"에 대한 답: At three o'clock. · At three fifteen. */
export function timeAtEn(h, m) {
  return m === 0 ? `At ${hourName(h)} o'clock.` : `At ${hourName(h)} ${minuteDigital(m)}.`;
}

/** 글 속 시각 "7:30" → "seven thirty", "9:00" → "nine o'clock" */
export function timeDigitalEn(h, m) {
  return m === 0 ? `${hourName(h)} o'clock` : `${hourName(h)} ${minuteDigital(m)}`;
}

export const fmtClock = (h, m) => `${h}:${String(m).padStart(2, '0')}`;

// 숫자 드릴이 뽑는 수 — 모두 녹음 음성이 있도록 범위마다 고정된 묶음을 쓴다
function seeded(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}
function fixedSet(seed, size, make) {
  const r = seeded(seed), out = new Set();
  while (out.size < size) out.add(make(r));
  return [...out].sort((a, b) => a - b);
}
const CENTS = [0, 0, 25, 50, 50, 75, 95, 99];
export const NUM_SETS = {
  1: Array.from({ length: 21 }, (_, i) => i),
  2: Array.from({ length: 80 }, (_, i) => 21 + i),
  3: fixedSet(3, 160, (r) => 100 + Math.floor(r() * 900)),
  4: fixedSet(4, 160, (r) => 1000 + Math.floor(r() * 99000)),
  5: fixedSet(5, 160, (r) => 1 + Math.floor(r() * 300) + CENTS[Math.floor(r() * 8)] / 100),
};
/** 시각 드릴의 모든 시각 (1~12시, 5분 단위) */
export const CLOCK_TIMES = Array.from({ length: 144 }, (_, i) => [1 + Math.floor(i / 12), (i % 12) * 5]);
