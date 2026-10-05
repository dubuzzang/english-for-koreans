import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, checkAnswer, tokenize, diffChars, fold } from '../js/core/en.js';

test('정규화: 대소문자·부호·공백·악센트', () => {
  assert.equal(normalize('  Hello,   WORLD! '), 'hello world');
  assert.equal(normalize('— Nice to meet you.'), 'nice to meet you');
  assert.equal(fold('café'), 'cafe');
  assert.equal(normalize('Café'), 'cafe');
});

test('정규화: 축약형은 풀어서 같게 본다', () => {
  assert.equal(normalize("I'm fine."), normalize('I am fine.'));
  assert.equal(normalize("She doesn't play."), normalize('She does not play.'));
  assert.equal(normalize("I can't swim."), normalize('I cannot swim.'));
  assert.equal(normalize("It's raining."), normalize('It is raining.'));
  assert.equal(normalize("He's been to Japan."), normalize('He has been to Japan.'));
  assert.equal(normalize("I'd like coffee."), normalize('I would like coffee.'));
  assert.equal(normalize('I won’t go.'), normalize('I will not go.'), '굽은 아포스트로피');
  assert.notEqual(normalize("It's"), normalize('its'));
});

test('정규화: 숫자·서수·영국식 철자', () => {
  assert.equal(normalize('I have 2 cats.'), normalize('I have two cats.'));
  assert.equal(normalize('It costs 25 dollars.'), normalize('It costs twenty-five dollars.'));
  assert.equal(normalize('May 3rd'), normalize('May third'));
  assert.equal(normalize('my favourite colour'), normalize('my favorite color'));
  assert.equal(normalize('okay'), normalize('OK'));
});

test('채점: 정확 / 오타 / 오답 / 빈칸', () => {
  assert.equal(checkAnswer('Hello', 'hello').level, 'exact');
  assert.equal(checkAnswer("I am a student", "I'm a student.").level, 'exact');
  const typo = checkAnswer('restaurent', 'restaurant');
  assert.equal(typo.level, 'typo');
  assert.equal(typo.ok, true);
  assert.equal(checkAnswer('studys', 'studies', { strict: true }).ok, false, '문법 드릴은 철자 하나도 오답');
  assert.equal(checkAnswer('cat', 'dog').ok, false);
  assert.equal(checkAnswer('', 'dog').level, 'empty');
  assert.equal(checkAnswer('mom', ['mother', 'mom']).level, 'exact', '여러 정답');
  assert.equal(checkAnswer('dont', "don't", { strict: true }).ok, false, '엄격 채점: 아포스트로피 누락');
  assert.equal(checkAnswer('dont', "don't").ok, true, '일반 채점: 아포스트로피 누락은 오타');
});

test('타일 자르기: 문장부호 제거, 축약형·소유격 유지', () => {
  assert.deepEqual(tokenize("Hi, I'm Mina."), ['Hi', "I'm", 'Mina']);
  assert.deepEqual(tokenize('— How are you? — Good!'), ['How', 'are', 'you', 'Good']);
  assert.deepEqual(tokenize("Mina's bag"), ["Mina's", 'bag']);
  assert.deepEqual(tokenize("my parents' house"), ['my', "parents'", 'house']);
});

test('차이 표시', () => {
  const d = diffChars('helo', 'hello');
  assert.ok(d.some((x) => x.miss));
  assert.equal(d.filter((x) => !x.ok).length, 1);
});
