import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pron, syllables, stressLast, vowelSound } from '../js/core/pron.js';
import { wordHangul } from '../js/core/hangul.js';
import { collectTexts } from '../scripts/audio.mjs';
import { WORDS } from '../js/data/vocab.js';

test('발음 사전: 앱에 나오는 거의 모든 단어의 발음이 있다 (npm run pron)', () => {
  const words = new Set();
  for (const it of collectTexts()) for (const m of it.text.matchAll(/[A-Za-z][A-Za-z'’]*/g)) words.add(m[0].replace(/['’]+$/, ''));
  for (const w of WORDS) for (const m of w.en.matchAll(/[A-Za-z][A-Za-z'’]*/g)) words.add(m[0]);
  const miss = [...words].filter((w) => !wordHangul(w) && !/^[A-Z]{1,3}$/.test(w));
  assert.ok(miss.length <= 5, `발음 없는 단어 ${miss.length}개 — node scripts/pron.mjs: ${miss.slice(0, 30).join(' ')}`);
});

test('음절·강세·모음 소리', () => {
  assert.deepEqual(pron('hello'), ['HH', 'AH0', 'L', 'OW1']);
  assert.equal(syllables('beautiful'), 3);
  assert.equal(stressLast('begin'), true);
  assert.equal(stressLast('visit'), false);
  assert.equal(vowelSound('hour'), true);
  assert.equal(vowelSound('university'), false);
  assert.ok(pron("Mina's"), '소유격은 앞말 발음 + z');
});
