import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  thirdPerson, ingForm, pastForm, ppForm, plural, article, comparative, superlative, conjugate, doublesFinal, TENSE_KEYS, personsFor, PRONOUNS,
} from '../js/core/morph.js';
import { WORDS } from '../js/data/vocab.js';

test('3인칭 단수 -s', () => {
  const C = { play: 'plays', watch: 'watches', go: 'goes', study: 'studies', have: 'has', do: 'does', fix: 'fixes', miss: 'misses', wash: 'washes', 'get up': 'gets up' };
  for (const [v, f] of Object.entries(C)) assert.equal(thirdPerson(v), f, v);
});

test('-ing 철자', () => {
  const C = { make: 'making', run: 'running', swim: 'swimming', lie: 'lying', see: 'seeing', be: 'being', visit: 'visiting', begin: 'beginning', open: 'opening', listen: 'listening', play: 'playing', fix: 'fixing', shop: 'shopping', 'sit down': 'sitting down', travel: 'traveling' };
  for (const [v, f] of Object.entries(C)) assert.equal(ingForm(v), f, v);
});

test('과거·과거분사 (규칙·불규칙)', () => {
  const P = { walk: 'walked', like: 'liked', stop: 'stopped', study: 'studied', play: 'played', go: 'went', eat: 'ate', buy: 'bought', put: 'put', 'wake up': 'woke up', plan: 'planned', visit: 'visited', cry: 'cried' };
  for (const [v, f] of Object.entries(P)) assert.equal(pastForm(v), f, v);
  const PP = { go: 'gone', eat: 'eaten', write: 'written', walk: 'walked', get: 'gotten', come: 'come' };
  for (const [v, f] of Object.entries(PP)) assert.equal(ppForm(v), f, v);
  assert.equal(pastForm('be', 0), 'was');
  assert.equal(pastForm('be', 5), 'were');
  assert.ok(doublesFinal('stop') && !doublesFinal('rain') && !doublesFinal('open'));
});

test('복수형', () => {
  const C = { cat: 'cats', bus: 'buses', box: 'boxes', city: 'cities', day: 'days', child: 'children', person: 'people', knife: 'knives', potato: 'potatoes', photo: 'photos', fish: 'fish', tooth: 'teeth', 'bus stop': 'bus stops' };
  for (const [n, f] of Object.entries(C)) assert.equal(plural(n), f, n);
  assert.equal(plural({ en: 'wife', pl: 'wives' }), 'wives');
});

test('a / an은 소리로', () => {
  const C = { apple: 'an', hour: 'an', university: 'a', umbrella: 'an', egg: 'an', cat: 'a', 'one-way ticket': 'a', honest: 'an', uniform: 'a', iced: 'an' };
  for (const [w, a] of Object.entries(C)) assert.equal(article(w), a, w);
});

test('비교급·최상급', () => {
  const C = { tall: ['taller', 'the tallest'], big: ['bigger', 'the biggest'], nice: ['nicer', 'the nicest'], easy: ['easier', 'the easiest'], beautiful: ['more beautiful', 'the most beautiful'], good: ['better', 'the best'], bad: ['worse', 'the worst'], tired: ['more tired', 'the most tired'] };
  for (const [a, [c, s]] of Object.entries(C)) {
    assert.equal(comparative(a), c, a);
    assert.equal(superlative(a), s, a);
  }
  assert.equal(comparative({ en: 'fun', cmp: 'more' }), 'more fun');
  assert.equal(comparative({ en: 'quiet', cmp: 'er' }), 'quieter');
});

test('시제 활용', () => {
  const t = (v, tense, p, o) => conjugate(v, tense, p, o).text;
  assert.equal(t('play', 'pres', 3), 'She plays');
  assert.equal(t('play', 'pres', 3, { neg: true }), "She doesn't play");
  assert.equal(t('play', 'pres', 3, { q: true }), 'Does she play?');
  assert.equal(t('play', 'pres', 0, { neg: true }), "I don't play");
  assert.equal(t('swim', 'prog', 0), 'I am swimming');
  assert.equal(t('swim', 'prog', 0, { neg: true }), "I'm not swimming");
  assert.equal(t('swim', 'prog', 5, { q: true }), 'Are they swimming?');
  assert.equal(t('go', 'past', 2), 'He went');
  assert.equal(t('go', 'past', 2, { neg: true }), "He didn't go");
  assert.equal(t('go', 'past', 1, { q: true }), 'Did you go?');
  assert.equal(t('eat', 'perf', 3), 'She has eaten');
  assert.equal(t('eat', 'perf', 4, { neg: true }), "We haven't eaten");
  assert.equal(t('help', 'fut', 0, { neg: true }), "I won't help");
  assert.equal(t('help', 'going', 2), 'He is going to help');
  assert.equal(t('swim', 'can', 3, { neg: true }), "She can't swim");
  assert.equal(t('work', 'haveto', 2), 'He has to work');
  assert.equal(t('work', 'haveto', 2, { neg: true }), "He doesn't have to work");
  assert.equal(t('travel', 'want', 3), 'She wants to travel');
  assert.equal(t('worry', 'imp', 1, { neg: true }), "Don't worry");
  assert.equal(t('go', 'imp', 4), "Let's go");
  assert.equal(t('get up', 'pres', 3), 'She gets up');
  assert.equal(t('get up', 'past', 0), 'I got up');
});

test('모든 동사 × 시제 × 인칭에서 활용이 만들어진다', () => {
  for (const w of WORDS.filter((x) => x.pos === 'v' && !x.nodrill)) {
    for (const tense of TENSE_KEYS) {
      for (const p of personsFor(tense)) {
        for (const o of [{}, { neg: true }, { q: true }]) {
          const r = conjugate(w.en, tense, p, o);
          assert.ok(r.text && !/undefined|\s{2}/.test(r.text), `${w.en} ${tense} ${p} ${JSON.stringify(o)} → ${r.text}`);
          assert.equal(r.parts.map((x) => x.t).join(''), r.text);
        }
      }
    }
  }
});

test('인칭대명사 표', () => {
  assert.equal(PRONOUNS.length, 7);
  assert.deepEqual(['I', 'me', 'my', 'mine', 'myself'], [PRONOUNS[0].subj, PRONOUNS[0].obj, PRONOUNS[0].det, PRONOUNS[0].pos, PRONOUNS[0].refl]);
});
