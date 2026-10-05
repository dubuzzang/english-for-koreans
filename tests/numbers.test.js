import { test } from 'node:test';
import assert from 'node:assert/strict';
import { numberEn, ordinalEn, ordinalShort, priceEn, priceShortEn, fmtPrice, timeEn, timePastEn, timeAtEn, NUM_SETS, CLOCK_TIMES } from '../js/core/numbers.js';

test('숫자 읽기 (미국식)', () => {
  const C = { 0: 'zero', 7: 'seven', 13: 'thirteen', 21: 'twenty-one', 40: 'forty', 100: 'one hundred', 105: 'one hundred five', 999: 'nine hundred ninety-nine',
    1000: 'one thousand', 1250: 'one thousand two hundred fifty', 10000: 'ten thousand', 25300: 'twenty-five thousand three hundred', 1000000: 'one million', 2500000: 'two million five hundred thousand' };
  for (const [n, s] of Object.entries(C)) assert.equal(numberEn(Number(n)), s, n);
});

test('서수', () => {
  const C = { 1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 8: 'eighth', 9: 'ninth', 12: 'twelfth', 20: 'twentieth', 21: 'twenty-first', 100: 'one hundredth' };
  for (const [n, s] of Object.entries(C)) assert.equal(ordinalEn(Number(n)), s, n);
  assert.deepEqual([1, 2, 3, 4, 11, 12, 13, 21, 22, 23].map(ordinalShort), ['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd', '23rd']);
});

test('가격', () => {
  assert.equal(priceEn(4.5), 'four dollars and fifty cents');
  assert.equal(priceEn(1), 'one dollar');
  assert.equal(priceEn(0.99), 'ninety-nine cents');
  assert.equal(priceEn(12.01), 'twelve dollars and one cent');
  assert.equal(priceShortEn(4.5), 'four fifty');
  assert.equal(priceShortEn(12.05), 'twelve oh five');
  assert.equal(priceShortEn(10), 'ten dollars');
  assert.equal(fmtPrice(4.5), '$4.50');
  assert.equal(fmtPrice(1250), '$1,250');
});

test('시각', () => {
  assert.equal(timeEn(3, 0), "It's three o'clock.");
  assert.equal(timeEn(3, 5), "It's three oh five.");
  assert.equal(timeEn(15, 45), "It's three forty-five.");
  assert.equal(timePastEn(3, 15), "It's a quarter past three.");
  assert.equal(timePastEn(3, 30), "It's half past three.");
  assert.equal(timePastEn(3, 45), "It's a quarter to four.");
  assert.equal(timePastEn(3, 50), "It's ten to four.");
  assert.equal(timePastEn(12, 40), "It's twenty to one.");
  assert.equal(timeAtEn(7, 30), 'At seven thirty.');
});

test('숫자 드릴 묶음', () => {
  assert.equal(NUM_SETS[1].length, 21);
  assert.deepEqual([NUM_SETS[2][0], NUM_SETS[2].at(-1)], [21, 100]);
  for (const n of NUM_SETS[3]) assert.ok(n >= 100 && n < 1000);
  for (const n of NUM_SETS[4]) assert.ok(n >= 1000 && n < 100000);
  for (const n of NUM_SETS[5]) assert.ok(n >= 1 && n < 302 && Math.abs(n * 100 - Math.round(n * 100)) < 1e-6);
  assert.equal(new Set(NUM_SETS[4]).size, NUM_SETS[4].length);
  assert.equal(CLOCK_TIMES.length, 144);
});
