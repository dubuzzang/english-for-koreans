import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DIALOGUES } from '../js/data/dialogues.js';
import { PHRASE_CATS, ALL_PHRASES } from '../js/data/phrases.js';
import { NOTES, NOTE } from '../js/data/notes.js';
import { UNITS } from '../js/data/curriculum.js';
import { tokenize } from '../js/core/en.js';
import { similarity, bestMatch, wordMatches } from '../js/core/stt.js';

const EN = /^[A-Za-z0-9\s.,!?'’"“”:;()\-—–%/$&…]+$/;
const DRILL_IDS = ['be', 'tense', 'irregular', 'nouns', 'compare', 'pronoun', 'prep', 'numbers', 'time'];

test('회화 데이터', () => {
  assert.ok(DIALOGUES.length >= 16);
  const ids = new Set();
  for (const d of DIALOGUES) {
    assert.ok(!ids.has(d.id), d.id);
    ids.add(d.id);
    assert.ok(d.roles.A && d.roles.B, `${d.id} roles`);
    assert.ok(d.lines.length >= 6, `${d.id} lines`);
    for (const [role, en, ko] of d.lines) {
      assert.ok(role === 'A' || role === 'B', `${d.id} role ${role}`);
      assert.ok(EN.test(en), `${d.id}: ${en}`);
      assert.ok(/[가-힣]/.test(ko), `${d.id}: ${ko}`);
      assert.ok(tokenize(en).length >= 1);
    }
    assert.ok(d.lines.some((l) => l[0] === 'A') && d.lines.some((l) => l[0] === 'B'), `${d.id} 두 역할 모두 대사`);
    assert.ok(d.keys.length >= 1);
  }
});

test('표현집 데이터', () => {
  assert.ok(ALL_PHRASES.length >= 100, `표현 ${ALL_PHRASES.length}`);
  for (const c of PHRASE_CATS) assert.ok(c.items.length >= 5, c.id);
  for (const p of ALL_PHRASES) {
    assert.ok(EN.test(p.en), p.en);
    assert.ok(/[가-힣]/.test(p.ko), p.ko);
  }
});

test('문법 노트: ID 고유, 단원이 참조하는 노트가 존재, 드릴 링크', () => {
  assert.equal(new Set(NOTES.map((n) => n.id)).size, NOTES.length);
  assert.ok(NOTES.length >= 34, `노트 ${NOTES.length}`);
  for (const u of UNITS) {
    for (const id of u.notes || []) assert.ok(NOTE.has(id), `${u.id} → ${id}`);
    for (const l of u.lessons) for (const id of l.notes || []) assert.ok(NOTE.has(id), `${l.id} → ${id}`);
  }
  for (const n of NOTES) {
    assert.ok(n.title && n.sub && n.sections.length >= 2, n.id);
    for (const s of n.sections) if (s.drill) assert.ok(DRILL_IDS.includes(s.drill), `${n.id} drill ${s.drill}`);
  }
});

test('발음 채점 (음성 인식 결과 비교)', () => {
  assert.equal(similarity('Nice to meet you', 'nice to meet you.'), 1);
  assert.equal(similarity("I'm fine", 'I am fine'), 1, '축약형');
  assert.ok(similarity('Thank you', 'Sank you') < 1);
  assert.ok(similarity('Thank you very much', 'I like pizza') < 0.5);
  assert.equal(bestMatch(['I have to cats', 'I have two cats'], 'I have two cats.').score, 1);
  const wm = wordMatches("I'm from Korea.", 'I am from Korea');
  assert.ok(wm.every((x) => x.ok), JSON.stringify(wm));
});
