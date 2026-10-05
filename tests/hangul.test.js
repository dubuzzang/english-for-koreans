import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toHangul, toHangulParts, wordHangul } from '../js/core/hangul.js';

const CASES = {
  hello: '헐로우',
  water: '워러',
  thank: '쌩크',
  English: '잉글리쉬',
  Korea: '코리어',
  three: '쓰리',
  six: '씩스',
  seven: '쎄븐',
  eight: '에이트',
  twenty: '트웬티',
  thirty: '써리',
  Wednesday: '웬즈데이',
  Saturday: '쌔러데이',
  cat: '캣',
  cats: '캣츠',
  kids: '키즈',
  book: '북',
  bag: '배그',
  back: '백',
  ship: '쉽',
  sheep: '쉬프',
  sit: '씻',
  seat: '씨트',
  apple: '애플',
  table: '테이블',
  little: '리를',
  computer: '컴퓨러',
  student: '스투든트',
  listen: '리슨',
  street: '스트리트',
  play: '플레이',
  you: '유',
  year: '이어',
  here: '히어',
  car: '카',
  morning: '모닝',
  people: '피플',
  question: '퀘스천',
  music: '뮤직',
  milk: '밀크',
  doctor: '닥터',
  good: '굿',
  Seoul: '서울',
  Mina: '미나',
};

test('단어를 한글 발음으로 옮긴다 (미국식)', () => {
  for (const [en, ko] of Object.entries(CASES)) assert.equal(toHangul(en), ko, en);
});

test('강세 음절을 표시한다 (2음절 이상만)', () => {
  const p = toHangulParts('computer');
  assert.deepEqual(p.filter((x) => x.b).map((x) => x.t), ['퓨']);
  assert.ok(toHangulParts('cat').every((x) => !x.b), '1음절은 표시 안 함');
  assert.deepEqual(toHangulParts('hello').filter((x) => x.b).map((x) => x.t), ['로우']);
});

test('문장: 구두점·숫자·모르는 말은 그대로, 소유격', () => {
  assert.equal(toHangul('Nice to meet you.'), '나이스 투 미트 유.');
  assert.equal(toHangul("It's 3 o'clock."), "잇츠 3 어클락.");
  assert.equal(toHangul("Mina's bag"), '미나즈 배그');
  assert.equal(toHangul('xyzzyq'), 'xyzzyq');
  assert.equal(toHangul(''), '');
  assert.equal(wordHangul('xyzzyq'), null);
});
