import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  beItem, conjItem, irrItem, nounItem, cmpItem, pronItem, prepItem, badIng, badPast, conjErrors, fixedDrillTexts,
  VERB_POOL, NOUN_POOL, CMP_POOL, IRR_POOL, PREP_ITEMS,
} from '../js/core/drillgen.js';
import { TENSE_KEYS } from '../js/core/morph.js';

let seed = 11;
const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function checkItem(it, label) {
  assert.ok(it.q && it.sub && it.answer && it.why && it.say, `${label}: 빈 칸 ${JSON.stringify(it)}`);
  assert.ok(it.options.includes(it.answer), `${label}: 보기에 정답 없음 ${it.answer} / ${it.options}`);
  assert.equal(new Set(it.options.map((o) => o.toLowerCase())).size, it.options.length, `${label}: 보기 중복 ${it.options}`);
  assert.ok(it.options.length >= 2, `${label}: 보기 수 ${it.options}`);
  assert.ok((it.accept || []).includes(it.answer), `${label}: accept에 정답`);
  assert.ok(!/undefined|NaN/.test(`${it.q} ${it.sub} ${it.answer} ${it.say} ${it.options}`), `${label}: undefined ${JSON.stringify(it)}`);
}

test('재료가 충분하다', () => {
  assert.ok(VERB_POOL.length >= 80, `동사 ${VERB_POOL.length}`);
  assert.ok(NOUN_POOL.length >= 200, `명사 ${NOUN_POOL.length}`);
  assert.ok(CMP_POOL.length >= 40, `형용사 ${CMP_POOL.length}`);
  assert.ok(IRR_POOL.length >= 25, `불규칙 ${IRR_POOL.length}`);
  assert.ok(PREP_ITEMS.length >= 40);
});

test('모든 생성기가 올바른 문제를 만든다', () => {
  for (let i = 0; i < 300; i++) {
    checkItem(beItem(rng), 'be');
    checkItem(conjItem(VERB_POOL, rng, { tenses: TENSE_KEYS }), 'conj');
    checkItem(irrItem(IRR_POOL, rng), 'irr');
    checkItem(nounItem(NOUN_POOL, rng), 'noun');
    checkItem(cmpItem(CMP_POOL, rng), 'cmp');
    checkItem(pronItem(rng), 'pron');
    checkItem(prepItem(rng), 'prep');
  }
});

test('빈칸 문제의 정답을 넣으면 읽는 문장이 된다', () => {
  for (let i = 0; i < 100; i++) {
    for (const it of [beItem(rng), pronItem(rng), prepItem(rng)]) {
      const filled = it.q.replace('___', it.answer);
      assert.ok(it.say.toLowerCase().replace(/[^a-z ]/g, '').includes(filled.toLowerCase().replace(/[^a-z ]/g, '').split(' ').slice(0, 2).join(' ')) || it.kind === 'be', `${it.q} / ${it.say}`);
    }
  }
});

test('한국인이 자주 하는 실수로 오답을 만든다', () => {
  assert.ok(badIng('run').includes('runing'));
  assert.ok(badIng('make').includes('makeing'));
  assert.ok(badPast('go').includes('goed'));
  assert.ok(badPast('stop').includes('stoped'));
  assert.ok(badPast('study').includes('studyed'));
  const e = conjErrors('play', 'pres', 3, { neg: true });
  assert.ok(e.includes("She doesn't plays") && e.includes("She don't play"));
  assert.ok(conjErrors('go', 'past', 0, { q: true }).includes('Did I went?'));
});

test('고정 문장 드릴(녹음 대상)', () => {
  const t = fixedDrillTexts();
  assert.ok(t.length > 500);
  assert.ok(t.includes('go, went, gone.'));
  assert.ok(t.includes('an apple.'));
  assert.ok(t.includes('one child, two children.'));
  assert.ok(t.includes('big, bigger, the biggest.'));
});
