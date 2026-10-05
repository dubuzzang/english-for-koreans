import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORDS, WORD, CATS } from '../js/data/vocab.js';
import { UNITS, LESSONS } from '../js/data/curriculum.js';
import { LETTERS, PAIRS, SOUND_RULES } from '../js/data/alphabet.js';
import { DAILY } from '../js/data/daily.js';
import { buildLessonSteps } from '../js/core/lessonBuilder.js';
import { tokenize, normalize } from '../js/core/en.js';

const EN = /^[A-Za-z0-9\s.,!?'’"“”:;()\-—–%/$&…]+$/;
const POS = new Set(['n', 'v', 'adj', 'adv', 'pron', 'num', 'int', 'phr', 'prep', 'conj', 'q', 'det', 'aux']);

test('단어 ID는 중복되지 않는다', () => {
  const seen = new Map();
  for (const w of WORDS) {
    assert.ok(!seen.has(w.id), `중복 ID ${w.id}: "${seen.get(w.id)}" / "${w.en}"`);
    seen.set(w.id, w.en);
  }
  assert.ok(WORDS.length >= 900, `단어 수 ${WORDS.length}`);
});

test('모든 단어에 뜻·품사·예문이 있고 형식이 올바르다', () => {
  for (const w of WORDS) {
    assert.ok(w.en && w.ko, `${w.id} 비어 있음`);
    assert.ok(POS.has(w.pos), `${w.id} 품사 ${w.pos}`);
    assert.ok(EN.test(w.en), `${w.id} 문자: ${w.en}`);
    assert.ok(/[가-힣]/.test(w.ko), `${w.id} 뜻`);
    assert.ok(w.ex && w.ex[0] && w.ex[1], `${w.id} 예문 없음`);
    assert.ok(EN.test(w.ex[0]), `${w.id} 예문 문자: ${w.ex[0]}`);
    assert.ok(/[.!?]$/.test(w.ex[0]), `${w.id} 예문 끝 부호: ${w.ex[0]}`);
    assert.ok(/[가-힣]/.test(w.ex[1]), `${w.id} 예문 번역`);
    if (w.pos === 'v') assert.ok(!/^to /.test(w.en), `${w.id} 동사는 원형으로 (to 없이)`);
    assert.ok(!(w.unc && w.plonly), `${w.id} unc와 plonly를 함께 쓰지 않아요`);
  }
});

test('예문에 그 단어가 들어 있다', () => {
  const miss = [];
  for (const w of WORDS) {
    const head = normalize(w.en).split(' ')[0].replace(/'/g, '');
    if (head.length < 3 || ['im', 'id', 'and', 'how'].includes(head)) continue;
    const ex = normalize(w.ex[0]).replace(/'/g, '');
    const stem = head.replace(/(e|y)$/, '').slice(0, Math.max(3, head.length - 2));
    if (!ex.includes(stem)) miss.push(`${w.en} → ${w.ex[0]}`);
  }
  assert.ok(miss.length <= 25, `예문에 단어가 없음 ${miss.length}개:\n${miss.join('\n')}`);
});

test('모든 범주에 단어가 있다', () => {
  for (const c of CATS) assert.ok(WORDS.some((w) => w.cat === c.id), c.id);
});

test('레슨 구조가 올바르다', () => {
  const ids = new Set();
  assert.equal(UNITS.length, 15);
  assert.equal(LESSONS.length, 60);
  for (const u of UNITS) {
    assert.ok(u.lessons.length > 0);
    for (const l of u.lessons) {
      assert.ok(!ids.has(l.id), `레슨 ID 중복 ${l.id}`);
      ids.add(l.id);
      for (const wid of l.words) assert.ok(WORD.has(wid), `${l.id}: 없는 단어 ${wid}`);
      assert.ok(l.words.length >= 5 && l.words.length <= 12, `${l.id} 단어 수`);
      assert.equal(new Set(l.words).size, l.words.length, `${l.id} 단어 중복`);
      for (const [en, ko] of l.sents) {
        assert.ok(EN.test(en), `${l.id} 문장 문자: ${en}`);
        assert.ok(/[가-힣]/.test(ko), `${l.id} 번역: ${ko}`);
      }
      for (const it of l.items || []) {
        assert.ok(it.opts.length >= 2 && it.a >= 0 && it.a < it.opts.length, `${l.id} 문항 ${it.q}`);
        assert.equal(new Set(it.opts).size, it.opts.length, `${l.id} 선택지 중복 ${it.q}`);
        assert.ok(it.why, `${l.id} 해설 없음: ${it.q}`);
      }
      assert.ok(l.tip?.title && l.tip?.html, `${l.id} 팁`);
    }
  }
});

test('레슨 문제 생성: 모든 레슨', () => {
  let seed = 7;
  const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (const l of LESSONS) {
    for (const review of [false, true]) {
      const steps = buildLessonSteps(l, { rng, listening: true, review, speaking: true });
      assert.ok(steps.length >= 10, `${l.id} 문제 수 ${steps.length}`);
      for (const s of steps) {
        if (s.type === 'tiles') {
          assert.equal(normalize(s.tokens.join(' ')), normalize(s.en), `${l.id} 타일`);
          for (const x of s.extra) assert.ok(!s.tokens.map(normalize).includes(normalize(x)), `${l.id} 오답 타일이 정답과 겹침: ${x}`);
        }
        if (s.type === 'listenSent') assert.ok(s.options.includes(s.ko));
      }
    }
  }
});

test('알파벳 26자, 최소대립쌍, 발음 규칙, 오늘의 표현', () => {
  assert.equal(LETTERS.length, 26);
  assert.equal(new Set(LETTERS.map((l) => l.up)).size, 26);
  for (const L of LETTERS) assert.ok(L.name && L.ko && L.ipa && L.tip && L.ex.length >= 2, L.up);
  for (const g of PAIRS) for (const p of g.pairs) assert.equal(p.length, 4, `${g.id} ${p}`);
  assert.ok(SOUND_RULES.length >= 6);
  assert.ok(DAILY.length >= 40);
  for (const [en, ko] of DAILY) assert.ok(EN.test(en) && /[가-힣]/.test(ko), en);
  assert.equal(new Set(DAILY.map((d) => d[0])).size, DAILY.length, '오늘의 표현 중복');
});

test('예문 토큰화가 가능하다', () => {
  for (const w of WORDS) assert.ok(tokenize(w.ex[0]).length >= 1, w.id);
});
