import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { audioKey, audioId } from '../js/core/audiokey.js';
import { collectTexts, ttsText, enSpans, choiceAnswer, phraseSay, yearEn, buildIndex } from '../scripts/audio.mjs';
import { WORDS } from '../js/data/vocab.js';
import { LESSONS } from '../js/data/curriculum.js';
import { DIALOGUES } from '../js/data/dialogues.js';
import { NUM_SETS, CLOCK_TIMES, numberEn, priceEn, timeEn } from '../js/core/numbers.js';

test('음성 키: 대소문자·부호·아포스트로피·띄어쓰기는 무시, 의문문은 구분', () => {
  assert.equal(audioKey('Hello!'), 'hello');
  assert.equal(audioKey("I'm fine."), 'im fine');
  assert.equal(audioKey('Café'), 'cafe');
  assert.equal(audioKey('How are you?'), 'how are you?');
  assert.equal(audioKey('"How are you?"'), 'how are you?');
  assert.notEqual(audioKey('Are you ready?'), audioKey('Are you ready.'));
  assert.equal(audioKey('— , .'), '');
  assert.equal(audioId('…'), null);
});

test('음성 파일 이름: 고정 길이, 목소리마다 다름, 항상 같은 값', () => {
  const a = audioId('Hello!');
  assert.match(a, /^[0-9a-z]{9}$/);
  assert.equal(a, audioId('hello'));
  assert.notEqual(a, audioId('Hello!', 'm'));
});

test('합성용 글: 숫자·가격·시각·연도는 글자로, 문장 부호', () => {
  assert.equal(ttsText('apple'), 'Apple.');
  assert.equal(ttsText('How are you?'), 'How are you?');
  assert.equal(ttsText('I have 3 cats'), 'I have three cats.');
  assert.equal(ttsText('It costs $4.50.'), 'It costs four dollars and fifty cents.');
  assert.equal(ttsText('See you at 7:30'), 'See you at seven thirty.');
  assert.equal(ttsText('on May 5th'), 'On May fifth.');
  assert.equal(ttsText('since 2020'), 'Since twenty twenty.');
  assert.equal(ttsText('1,250 people'), 'One thousand two hundred fifty people.');
  assert.equal(ttsText('Yes. / No.'), 'Yes. No.');
  assert.equal(ttsText('cat → cats'), 'Cat. Cats.');
  assert.equal(ttsText('I am. → I\'m.'), 'I am. I\'m.');
  assert.equal(yearEn(1998), 'nineteen ninety-eight');
  assert.equal(yearEn(2005), 'two thousand five');
  assert.equal(yearEn(2025), 'twenty twenty-five');
});

test('HTML 속 .en 글자 뽑기 (tapToSpeak와 같은 결과)', () => {
  assert.deepEqual(enSpans('가 <b class="en">hello</b> 와 <span class="en">good <u>morning</u> (hi)</span>'), ['hello', 'good morning hi']);
  assert.deepEqual(enSpans(''), []);
  assert.equal(choiceAnswer({ q: 'I ___ a student.', opts: ['am', 'is'], a: 0 }), 'I am a student.');
  assert.equal(choiceAnswer({ q: '어느 쪽?', opts: ['가', '나'], a: 0 }), null);
  assert.equal(phraseSay('Tea / Coffee … please'), 'Tea, Coffee  please');
});

test('녹음 목록이 앱의 소리 나는 글을 모두 담는다', () => {
  const items = collectTexts();
  const ids = new Set(items.map((i) => i.id));
  assert.equal(ids.size, items.length, 'id 중복');
  const has = (text, voice = 'f') => ids.has(audioId(text, voice));
  for (const w of WORDS) {
    assert.ok(has(w.en), `단어 ${w.en}`);
    if (w.ex) assert.ok(has(w.ex[0]), `예문 ${w.ex[0]}`);
  }
  for (const l of LESSONS) for (const [en] of l.sents || []) assert.ok(has(en), `레슨 문장 ${en}`);
  for (const d of DIALOGUES) {
    for (const r of Object.values(d.roles)) assert.ok(r.voice === 'f' || r.voice === 'm', `${d.id} voice`);
    assert.notEqual(d.roles.A.voice, d.roles.B.voice, `${d.id}: 두 역할은 서로 다른 목소리`);
    for (const [role, en] of d.lines) assert.ok(has(en, d.roles[role].voice), `회화 ${d.id}: ${en}`);
  }
  for (const n of NUM_SETS[3]) assert.ok(has(numberEn(n)), `숫자 ${n}`);
  for (const n of NUM_SETS[5]) assert.ok(has(priceEn(n)), `가격 ${n}`);
  for (const [h, m] of CLOCK_TIMES) assert.ok(has(timeEn(h, m)), `시각 ${h}:${m}`);
  for (const it of items) {
    assert.ok(it.say && /[.?!]$/.test(it.say), `문장 부호: ${it.say}`);
    assert.ok(!/\d/.test(it.say), `숫자가 남음: ${it.say}`);
    assert.ok(!/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(it.say), `한글이 섞임(합성기가 엉뚱하게 읽음): ${it.say}`);
  }
});

test('audio/index.json이 실제 파일과 맞고, 대부분의 글에 녹음이 있다', () => {
  assert.ok(existsSync('audio/index.json'), 'audio/index.json 없음 — node scripts/audio.mjs index');
  const index = JSON.parse(readFileSync('audio/index.json', 'utf8'));
  const { ids, missing } = buildIndex();
  assert.deepEqual(index.ids, ids, 'index.json이 오래됨 — node scripts/audio.mjs index');
  let bytes = 0;
  for (const id of index.ids) bytes += statSync(`audio/${id}.mp3`).size;
  assert.equal(index.bytes, bytes);
  const total = ids.length + missing.length;
  assert.ok(ids.length / total >= 0.97, `녹음 ${ids.length}/${total}`);
});
