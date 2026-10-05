// 커리큘럼: 단원 → 레슨. 각 레슨 = 새 단어 + 한국인 맞춤 팁 + 문법 확인 문제 + 문장 연습
// items: 문법 확인(객관식) — a는 정답 인덱스(화면에서는 섞어서 보여줌), q의 ___는 빈칸

import { UNITS2 } from './curriculum-2.js';
import { UNITS3 } from './curriculum-3.js';

const b = (s) => `<b class="en">${s}</b>`;

const UNITS1 = [
  {
    id: 'u1', no: 1, title: '첫 만남', en: 'Nice to meet you', color: '#2563eb', notes: ['overview', 'word_order', 'pronouns'],
    desc: '인사, 안부, 자기소개, 예의 표현',
    lessons: [
      {
        id: 'u1l1', title: '인사하기', en: 'Hello!',
        words: ['hello', 'hi', 'good_morning', 'good_afternoon', 'good_evening', 'good_night', 'bye', 'see_you'],
        tip: {
          title: '만날 때와 헤어질 때가 달라요',
          html: `한국어 '안녕'은 만날 때도 헤어질 때도 쓰지만, 영어는 나눠요.<br>• 만날 때: ${b('Hello')} / ${b('Hi')}<br>• 헤어질 때: ${b('Bye')} / ${b('See you')}<br><br>⚠️ ${b('Good night')}은 '좋은 밤'이 아니라 <b>'잘 자'</b>예요. 저녁에 만났을 때 인사는 ${b('Good evening')}!`,
        },
        items: [
          { q: '저녁 8시, 친구를 만났을 때 첫인사', opts: ['Good evening!', 'Good night!', 'Good morning!'], a: 0, why: 'Good night은 헤어지거나 자러 갈 때만 써요. 만났을 때는 Good evening!' },
          { q: '친구와 헤어지며 하는 인사', opts: ['See you!', 'Hi!', 'Good morning!'], a: 0, why: 'See you(later)! = 또 봐!' },
          { q: '친한 친구에게 가볍게 "안녕!"', opts: ['Hi!', 'Good evening, sir.', 'Good night!'], a: 0, why: 'Hi는 Hello보다 가볍고 친근해요.' },
        ],
        sents: [
          ['Hi, good morning!', '안녕, 좋은 아침!'],
          ['Hello, good evening!', '안녕하세요, 좋은 저녁이에요!'],
          ['Good night, see you tomorrow!', '잘 자, 내일 봐!'],
          ['Bye, see you later!', '안녕, 나중에 봐!'],
          ['Good afternoon, everyone!', '여러분, 안녕하세요! (오후 인사)'],
        ],
      },
      {
        id: 'u1l2', title: '안부 묻기', en: 'How are you?',
        words: ['how_are_you', 'im_fine', 'thank_you', 'thanks', 'and_you', 'not_bad', 'great', 'so_so'],
        tip: {
          title: '"How are you?"는 인사말이에요',
          html: `${b('How are you?')}는 '어떻게 지내세요?'라는 뜻이지만, 실제로는 '안녕하세요'에 가까운 인사예요. 길게 설명하지 말고 짧게 답한 뒤 되물어요.<br><br>${b('Good, thanks. And you?')} 좋아요, 고마워요. 당신은요?<br><br>교과서의 ${b("I'm fine, thank you.")}도 맞지만, 원어민은 ${b('Good!')} ${b('Pretty good!')} ${b('Not bad.')}도 많이 써요.`,
        },
        items: [
          { q: '"How are you?"에 대한 자연스러운 대답', opts: ['Good, thanks. And you?', 'Yes, I am.', 'I am how.'], a: 0, why: '짧게 답하고 And you?로 되물으면 완벽해요.' },
          { q: '"나쁘지 않아"', opts: ['Not bad.', 'No bad.', 'Bad not.'], a: 0, why: 'Not bad = 나쁘지 않다(꽤 괜찮다는 뜻).' },
          { q: '친구가 "How\'s it going?" 하고 물었어요', opts: ['Pretty good!', 'It is going.', 'Yes, going!'], a: 0, why: "How's it going? = 잘 지내? (How are you?의 친근한 버전)" },
        ],
        sents: [
          ['Hi, how are you?', '안녕, 잘 지내?'],
          ["I'm fine, thank you.", '잘 지내요, 고마워요.'],
          ['Good, thanks. And you?', '좋아요, 고마워요. 당신은요?'],
          ['Not bad, thanks.', '나쁘지 않아, 고마워.'],
          ["I'm great!", '아주 좋아요!'],
          ['Thanks a lot!', '정말 고마워요!'],
        ],
      },
      {
        id: 'u1l3', title: '자기소개', en: 'My name is…', notes: ['word_order'],
        words: ['i', 'my', 'name', 'what', 'your', 'nice_to_meet_you', 'from', 'korea'],
        tip: {
          title: '영어는 "누가 + 무엇이다"가 먼저',
          html: `${b('My name is Mina.')} = 제 이름은 미나예요.<br>${b("I'm from Korea.")} = 저는 한국에서 왔어요.<br><br>한국어는 '저는 / 한국에서 / 왔어요'처럼 동사가 끝에 오지만, 영어는 <b>주어 + 동사</b>가 먼저 나와요: I / am / from Korea.<br><br>${b('I')}(나는)과 ${b('my')}(나의)를 구분하세요. 그리고 ${b('I')}는 언제나 대문자!`,
        },
        items: [
          { q: '"제 이름은 지수예요"', opts: ['My name is Jisu.', 'I name is Jisu.', 'Name my is Jisu.'], a: 0, why: 'My name(내 이름) + is(~이다) + Jisu. I는 "나는", my는 "나의".' },
          { q: 'I ___ from Korea.', ko: '저는 한국에서 왔어요.', opts: ['am', 'is', 'are'], a: 0, why: 'I 뒤에는 항상 am! (I am = I\'m)' },
          { q: '"Nice to meet you."에 대한 대답', opts: ['Nice to meet you, too.', 'Me too meet.', 'Yes, nice.'], a: 0, why: '"저도 반가워요" = Nice to meet you, too. (too = ~도, 문장 끝에)' },
        ],
        sents: [
          ['My name is Mina.', '제 이름은 미나예요.'],
          ["What's your name?", '이름이 뭐예요?'],
          ["I'm from Korea.", '저는 한국에서 왔어요.'],
          ['Nice to meet you.', '만나서 반가워요.'],
          ['Nice to meet you, too.', '저도 만나서 반가워요.'],
          ["I'm Jisu. I'm from Seoul.", '저는 지수예요. 서울에서 왔어요.'],
        ],
      },
      {
        id: 'u1l4', title: '예의 표현', en: 'Please & Thank you',
        words: ['please', 'youre_welcome', 'sorry', 'excuse_me', 'yes', 'no', 'okay', 'no_problem'],
        tip: {
          title: 'Excuse me와 Sorry는 달라요',
          html: `${b('Excuse me')} = 실례합니다 — 말을 걸 때, 지나갈 때<br>${b('Sorry')} = 미안해요 — 잘못했을 때<br><br>부탁할 땐 끝에 ${b('please')}만 붙여도 공손해져요: ${b('Water, please.')} 물 주세요.<br><br>${b('Thank you!')} → ${b("You're welcome.")}(천만에요) / ${b('No problem.')}(별거 아니에요)`,
        },
        items: [
          { q: '모르는 사람에게 길을 물을 때 첫마디', opts: ['Excuse me.', 'Sorry.', 'Bye.'], a: 0, why: 'Excuse me = 실례합니다. 사과할 일이 아니면 Sorry보다 Excuse me!' },
          { q: '"Thank you!"에 대한 대답', opts: ["You're welcome.", 'Thank you too much.', 'Excuse me.'], a: 0, why: "You're welcome = 천만에요." },
          { q: '"물 주세요"', opts: ['Water, please.', 'Please water give.', 'Water, sorry.'], a: 0, why: '명사 + please = ~ 주세요.' },
        ],
        sents: [
          ['Yes, please.', '네, 부탁해요.'],
          ['No, thank you.', '아니요, 괜찮아요.'],
          ['Okay, thanks!', '좋아요, 고마워요!'],
          ["You're welcome.", '천만에요.'],
          ["I'm sorry!", '죄송해요!'],
          ['Water, please.', '물 주세요.'],
          ['Excuse me, where is the restroom?', '실례합니다, 화장실이 어디예요?'],
        ],
      },
    ],
  },
  {
    id: 'u2', no: 2, title: '나와 가족', en: 'Me and my family', color: '#7356f0', notes: ['be', 'articles', 'questions', 'this_that'],
    desc: 'be동사 am·is·are, 관사 a/an, 직업·국적, 가족, this·that',
    lessons: [
      {
        id: 'u2l1', title: '직업 말하기', en: "I'm a teacher.", notes: ['be', 'articles'],
        words: ['teacher', 'student', 'doctor', 'nurse', 'chef', 'engineer', 'office_worker', 'job'],
        tip: {
          title: 'be동사와 a/an',
          html: `'~이다'는 <b>be동사</b>: ${b('I am')} / ${b('You are')} / ${b('He is')} · ${b('She is')}<br><br>직업이 하나면 앞에 꼭 ${b('a')}를 붙여요. 한국어에 없는 말이라 가장 많이 빠뜨려요!<br>${b("I'm a teacher.")} (×I'm teacher.)<br><br>모음 <b>소리</b>로 시작하면 ${b('an')}: ${b('an engineer')}, ${b('an office worker')}`,
        },
        items: [
          { q: "I'm ___ teacher.", ko: '저는 선생님이에요.', opts: ['a', 'an', 'the'], a: 0, why: '직업 하나 = a teacher. 한국어엔 없는 a를 꼭 붙여요!' },
          { q: 'She is ___ engineer.', ko: '그녀는 엔지니어예요.', opts: ['an', 'a', 'the'], a: 0, why: 'engineer는 모음 소리 [엔-]으로 시작 → an' },
          { q: 'They ___ students.', ko: '그들은 학생이에요.', opts: ['are', 'is', 'am'], a: 0, why: 'they(그들) → are. 여럿이니 students(복수)!' },
          { q: 'He ___ a doctor.', ko: '그는 의사예요.', opts: ['is', 'are', 'am'], a: 0, why: 'he·she·it → is' },
        ],
        sents: [
          ["I'm a teacher.", '저는 선생님이에요.'],
          ['You are a doctor.', '당신은 의사군요.'],
          ['She is a nurse.', '그녀는 간호사예요.'],
          ['We are students.', '우리는 학생이에요.'],
          ['He is an engineer.', '그는 엔지니어예요.'],
          ['What do you do?', '무슨 일 하세요?'],
        ],
      },
      {
        id: 'u2l2', title: '국적과 언어', en: 'Where are you from?', notes: ['questions'],
        words: ['korean', 'english', 'american', 'japanese', 'chinese', 'country', 'language', 'where'],
        tip: {
          title: 'Korea와 Korean · be동사 질문',
          html: `나라는 ${b('Korea')}, 사람·언어는 ${b('Korean')}. 국적·언어는 항상 <b>대문자</b>로 써요.<br><br>be동사 질문은 be동사를 맨 앞으로:<br>${b('You are Korean.')} → ${b('Are you Korean?')}<br><br>대답은 ${b('Yes, I am.')} / ${b("No, I'm not.")}`,
        },
        items: [
          { q: '"한국 사람이에요?"', opts: ['Are you Korean?', 'You Korean are?', 'Is you Korean?'], a: 0, why: 'be동사 질문: Are + you + ...?' },
          { q: 'I speak ___.', ko: '저는 한국어를 해요.', opts: ['Korean', 'Korea', 'korean'], a: 0, why: '언어는 Korean(나라 이름은 Korea). 대문자로 써요.' },
          { q: 'Where are you ___?', ko: '어디 출신이에요?', opts: ['from', 'to', 'in'], a: 0, why: 'Where are you from? = 어디에서 왔어요(출신)?' },
        ],
        sents: [
          ['Where are you from?', '어디에서 왔어요?'],
          ["I'm Korean.", '저는 한국 사람이에요.'],
          ['Are you American?', '미국 사람이에요?'],
          ['Do you speak English?', '영어 하세요?'],
          ['I speak a little English.', '영어를 조금 해요.'],
          ['She is from Japan.', '그녀는 일본에서 왔어요.'],
        ],
      },
      {
        id: 'u2l3', title: '가족', en: 'This is my family.',
        words: ['family', 'mother', 'father', 'brother', 'sister', 'parents', 'son', 'daughter'],
        tip: {
          title: '형·오빠·남동생 모두 brother!',
          html: `영어는 나이로 호칭을 나누지 않아요.<br>형·오빠·남동생 → ${b('brother')}<br>언니·누나·여동생 → ${b('sister')}<br><br>꼭 밝혀야 하면 ${b('older brother')}(형·오빠), ${b('younger sister')}(여동생)처럼 말해요. 집에서는 서로 이름을 불러요 — "형!" 대신 "Tom!"<br><br>둘 이상이면 끝에 <b>-s</b>: ${b('two sisters')}`,
        },
        items: [
          { q: '"제 남동생"', opts: ['my younger brother', 'my little sister', 'my older brother'], a: 0, why: '남동생 = younger brother (little brother도 써요).' },
          { q: 'This is ___ mother.', ko: '이분은 제 어머니예요.', opts: ['my', 'I', 'me'], a: 0, why: '나의 = my' },
          { q: 'I have two ___.', ko: '저는 언니가 둘 있어요.', opts: ['sisters', 'sister', 'sisteres'], a: 0, why: '둘 이상이면 -s를 붙여 복수형!' },
        ],
        sents: [
          ['This is my family.', '이쪽은 제 가족이에요.'],
          ['This is my mother.', '이분은 제 어머니예요.'],
          ['I have one brother.', '저는 형제가 한 명 있어요.'],
          ['My sister is a student.', '제 여동생은 학생이에요.'],
          ['My parents live in Busan.', '부모님은 부산에 사세요.'],
          ['Do you have any brothers or sisters?', '형제자매가 있어요?'],
        ],
      },
      {
        id: 'u2l4', title: '이것·저것', en: 'This is…', notes: ['this_that'],
        words: ['this', 'that', 'these', 'those', 'it', 'book', 'phone', 'bag'],
        tip: {
          title: '이·그·저 → this·that 두 가지',
          html: `한국어는 이·그·저 3단계, 영어는 2단계예요.<br>${b('this')} 이것(가까이) · ${b('that')} 그것·저것(멀리)<br>여럿이면 ${b('these')} · ${b('those')}<br><br>${b("What's this?")} 이건 뭐예요? → ${b("It's a book.")} 책이에요.<br>대답할 때는 ${b('it')}으로 받아요.`,
        },
        items: [
          { q: '"이것들은 내 책이에요"', opts: ['These are my books.', 'This are my books.', 'These is my books.'], a: 0, why: '여럿 → these + are + books(복수)' },
          { q: '"저건 뭐예요?" — "가방이에요."', opts: ["It's a bag.", 'Is a bag.', "It's bag."], a: 0, why: '대답은 It으로, a도 잊지 마세요.' },
          { q: '___ is my phone.', ko: '이것은 제 휴대폰이에요.', opts: ['This', 'These', 'Those'], a: 0, why: '하나 + 가까이 → This' },
        ],
        sents: [
          ['This is my book.', '이건 제 책이에요.'],
          ["What's that?", '저건 뭐예요?'],
          ["It's my phone.", '그건 제 휴대폰이에요.'],
          ['These are my bags.', '이것들은 제 가방이에요.'],
          ['Is this your bag?', '이거 당신 가방이에요?'],
          ['Those are not my shoes.', '저것들은 제 신발이 아니에요.'],
        ],
      },
    ],
  },
  {
    id: 'u3', no: 3, title: '있다·없다', en: 'I have… / There is…', color: '#e2700c', notes: ['have', 'there_is', 'prep_place'],
    desc: '가지고 있다(have), 어디에 있다(There is), 위치 전치사, 집과 방',
    lessons: [
      {
        id: 'u3l1', title: '가진 것 말하기', en: 'I have a car.', notes: ['have'],
        words: ['have', 'car', 'money', 'time', 'house', 'computer', 'bike', 'cat'],
        tip: {
          title: '"나는 차가 있다" = I have a car',
          html: `한국어 '(나는) 차가 있어요'를 영어는 '나는 차를 <b>가지고 있다</b>'로 말해요.<br>${b('I have a car.')}<br><br>he·she·it이 주어면 ${b('has')}: ${b('She has a cat.')}<br>부정: ${b("I don't have…")} · 질문: ${b('Do you have…?')}<br><br>'시간 있어요?'도 ${b('Do you have time?')}`,
        },
        items: [
          { q: 'She ___ a car.', ko: '그녀는 차가 있어요.', opts: ['has', 'have', 'is'], a: 0, why: 'she(3인칭 단수) → has' },
          { q: '"시간 있어요?"', opts: ['Do you have time?', 'Are you have time?', 'Have you time is?'], a: 0, why: '일반동사 질문은 Do + 주어 + 동사원형' },
          { q: '"저는 차가 없어요"', opts: ["I don't have a car.", 'I have not car.', "I'm not have a car."], a: 0, why: "일반동사 부정은 don't + 동사원형" },
        ],
        sents: [
          ['I have a car.', '저는 차가 있어요.'],
          ['She has a cat.', '그녀는 고양이가 있어요.'],
          ['Do you have time?', '시간 있어요?'],
          ["I don't have money.", '저는 돈이 없어요.'],
          ['We have a big house.', '우리는 큰 집이 있어요.'],
          ['He has two computers.', '그는 컴퓨터가 두 대 있어요.'],
        ],
      },
      {
        id: 'u3l2', title: '장소에 있다', en: 'There is a bank.', notes: ['there_is'],
        words: ['bank', 'hospital', 'park', 'restaurant', 'convenience_store', 'cafe', 'near', 'here'],
        tip: {
          title: '"~이 있다(존재)"는 There is / There are',
          html: `어떤 장소에 무엇이 '있다'고 할 때는 ${b('There is')} + 하나, ${b('There are')} + 여럿.<br>${b('There is a bank near here.')} 이 근처에 은행이 있어요.<br>${b('There are two cafes.')} 카페가 두 개 있어요.<br><br>질문은 순서만 바꿔요: ${b('Is there a bank near here?')}`,
        },
        items: [
          { q: 'There ___ a bank near here.', ko: '이 근처에 은행이 있어요.', opts: ['is', 'are', 'have'], a: 0, why: '하나(a bank) → There is' },
          { q: 'There ___ two parks.', ko: '공원이 두 개 있어요.', opts: ['are', 'is', 'has'], a: 0, why: '여럿(two parks) → There are' },
          { q: '"근처에 카페 있어요?"', opts: ['Is there a cafe near here?', 'Have a cafe near here?', 'There is cafe near here?'], a: 0, why: '질문은 Is there ~?' },
        ],
        sents: [
          ['There is a bank near here.', '이 근처에 은행이 있어요.'],
          ['Is there a hospital near here?', '이 근처에 병원 있어요?'],
          ['There are two cafes.', '카페가 두 개 있어요.'],
          ["There isn't a park here.", '여기엔 공원이 없어요.'],
          ['The restaurant is over there.', '그 식당은 저쪽에 있어요.'],
          ['Is there a convenience store?', '편의점 있어요?'],
        ],
      },
      {
        id: 'u3l3', title: '위치 말하기', en: 'on the table', notes: ['prep_place'],
        words: ['in', 'on', 'under', 'next_to', 'behind', 'in_front_of', 'table', 'box'],
        tip: {
          title: '전치사는 명사 앞에 와요',
          html: `한국어 조사는 명사 <b>뒤</b>(책상 <b>위에</b>), 영어 전치사는 명사 <b>앞</b>(<b>on</b> the table)에 와요.<br><br>${b('in')} 안에 · ${b('on')} 위에(붙어서) · ${b('under')} 아래에<br>${b('next to')} 옆에 · ${b('behind')} 뒤에 · ${b('in front of')} 앞에<br><br>${b('The cat is under the table.')} 고양이가 탁자 아래에 있어요.`,
        },
        items: [
          { q: 'The cat is ___ the table.', ko: '고양이가 탁자 아래에 있어요.', opts: ['under', 'on', 'in'], a: 0, why: '아래 = under' },
          { q: 'My phone is ___ my bag.', ko: '휴대폰은 가방 안에 있어요.', opts: ['in', 'on', 'at'], a: 0, why: '안 = in' },
          { q: '"은행 옆에"', opts: ['next to the bank', 'the bank next to', 'bank of next'], a: 0, why: '전치사는 명사 앞: next to + the bank' },
        ],
        sents: [
          ['The book is on the table.', '책은 탁자 위에 있어요.'],
          ['The cat is under the bed.', '고양이는 침대 밑에 있어요.'],
          ['My keys are in my bag.', '열쇠는 가방 안에 있어요.'],
          ['The bank is next to the cafe.', '은행은 카페 옆에 있어요.'],
          ['The car is behind the house.', '차는 집 뒤에 있어요.'],
          ['Where is my phone?', '내 휴대폰 어디 있지?'],
        ],
      },
      {
        id: 'u3l4', title: '집과 방', en: 'my room',
        words: ['room', 'kitchen', 'bathroom', 'bed', 'chair', 'door', 'window', 'desk'],
        tip: {
          title: '집 소개하기 · 화장실 표현',
          html: `${b('There are three rooms in my house.')} 우리 집에는 방이 세 개 있어요.<br>${b('My room is small but cozy.')} 제 방은 작지만 아늑해요.<br><br>🚻 집 화장실은 ${b('bathroom')}, 식당·가게 화장실은 ${b('restroom')}이라고 하는 게 가장 자연스러워요(미국).<br><br>부탁할 땐: ${b('Open the window, please.')}`,
        },
        items: [
          { q: '(식당에서) "화장실이 어디예요?"', opts: ["Where's the restroom?", 'Where is toilet room?', 'Restroom where is?'], a: 0, why: '공공장소 화장실은 restroom (Where is = Where\'s)' },
          { q: 'There ___ three rooms in my house.', ko: '우리 집에는 방이 세 개 있어요.', opts: ['are', 'is', 'have'], a: 0, why: '여럿(three rooms) → There are' },
          { q: 'The bed is ___ the window.', ko: '침대는 창문 옆에 있어요.', opts: ['next to', 'in', 'under'], a: 0, why: '옆 = next to' },
        ],
        sents: [
          ['This is my room.', '여기가 제 방이에요.'],
          ['There is a desk in my room.', '제 방에는 책상이 있어요.'],
          ['The kitchen is small.', '부엌이 작아요.'],
          ['Close the door, please.', '문 좀 닫아 주세요.'],
          ['Open the window, please.', '창문 좀 열어 주세요.'],
          ["Where's the bathroom?", '화장실이 어디예요?'],
        ],
      },
    ],
  },
  {
    id: 'u4', no: 4, title: '숫자와 쇼핑', en: 'How much is it?', color: '#d63f7f', notes: ['numbers', 'plurals'],
    desc: '숫자 1~1,000,000, -teen과 -ty, 가격 묻기, 옷과 색깔',
    lessons: [
      {
        id: 'u4l1', title: '숫자 1~10', en: 'one, two, three', notes: ['numbers'],
        words: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
        tip: {
          title: '숫자 발음, 이것만 조심!',
          html: `${b('three')} — th는 혀끝을 이 사이에 살짝: '쓰리'보다 혀가 앞으로<br>${b('five')} · ${b('seven')} — v는 윗니로 아랫입술을 살짝 물고<br>${b('six')} — '식스'가 아니라 [씩스]에 가깝게<br><br>숫자 뒤 명사는 둘 이상이면 복수: ${b('one cat')} / ${b('two cats')}`,
        },
        items: [
          { q: 'I have ___ cats.', ko: '고양이가 두 마리 있어요.', opts: ['two', 'second', 'twice'], a: 0, why: '개수 = two (second는 "두 번째", twice는 "두 번")' },
          { q: '5 + 3 = ?', opts: ['eight', 'seven', 'nine'], a: 0, why: '5 + 3 = 8 eight' },
          { q: '"사과 한 개"', opts: ['one apple', 'one apples', 'a one apple'], a: 0, why: '하나면 단수(apple), 둘부터 복수(apples)' },
        ],
        sents: [
          ['One, two, three!', '하나, 둘, 셋!'],
          ['I have two cats.', '고양이가 두 마리 있어요.'],
          ['Three coffees, please.', '커피 세 잔 주세요.'],
          ['She is five.', '그녀는 다섯 살이에요.'],
          ['Room seven, please.', '7호실이요.'],
          ['I need ten minutes.', '10분 필요해요.'],
        ],
      },
      {
        id: 'u4l2', title: '큰 숫자', en: 'thirteen or thirty?', notes: ['numbers'],
        words: ['eleven', 'twelve', 'thirteen', 'fifteen', 'twenty', 'thirty', 'fifty', 'hundred', 'thousand'],
        tip: {
          title: '-teen과 -ty는 강세로 구분',
          html: `13~19는 ${b('-teen')}, 20·30…은 ${b('-ty')}. 듣기에서 가장 많이 틀리는 부분이에요!<br>${b('thirteen')} thir-<b>TEEN</b> (뒤에 강세) / ${b('thirty')} <b>THIR</b>-ty (앞에 강세)<br>${b('fifteen')} / ${b('fifty')}도 마찬가지.<br><br>영어엔 '만'이 없어요. 세 자리씩 끊어 읽어요:<br>10,000 = ${b('ten thousand')} · 1,000,000 = ${b('one million')}`,
        },
        items: [
          { q: '"13"', opts: ['thirteen', 'thirty', 'threeteen'], a: 0, why: '13 = thirteen (뒤 강세)' },
          { q: '"50"', opts: ['fifty', 'fifteen', 'fivety'], a: 0, why: '50 = fifty (철자: five가 아니라 fif-)' },
          { q: '"10,000(만)"', opts: ['ten thousand', 'one man', 'ten hundred'], a: 0, why: '영어엔 "만"이 없어요. 천(thousand) 단위로 끊어 ten thousand.' },
        ],
        sents: [
          ["I'm twenty years old.", '저는 스무 살이에요.'],
          ['It costs fifteen dollars.', '15달러예요.'],
          ['There are thirty students.', '학생이 30명 있어요.'],
          ['One hundred people came.', '100명이 왔어요.'],
          ['It costs two thousand dollars.', '2천 달러예요.'],
          ['My father is fifty.', '저희 아버지는 쉰이세요.'],
        ],
      },
      {
        id: 'u4l3', title: '가격 묻기', en: 'How much is it?',
        words: ['how_much', 'dollar', 'cent', 'price', 'cheap', 'expensive', 'buy', 'pay'],
        tip: {
          title: '얼마예요? 가격 읽기',
          html: `${b('How much is this?')} 이거 얼마예요? (여러 개면 ${b('How much are these?')})<br><br>💵 ${b('$4.50')} = four dollars and fifty cents — 보통은 줄여서 ${b('four fifty')}<br>${b('$12.99')} = twelve ninety-nine<br><br>${b('Can I pay by card?')} 카드로 계산해도 돼요?<br>${b("I'll take it.")} 이걸로 살게요.`,
        },
        items: [
          { q: '"이거 얼마예요?"', opts: ['How much is this?', 'How many is this?', 'What price is this?'], a: 0, why: 'How much = 얼마(양·가격), How many = 몇 개(수)' },
          { q: '$7.99를 줄여 읽으면?', opts: ['seven ninety-nine', 'seven point ninety-nine', 'seventy-nine nine'], a: 0, why: '달러와 센트를 이어서: seven ninety-nine' },
          { q: '"카드로 결제할 수 있어요?"', opts: ['Can I pay by card?', 'Can I pay with card by?', 'I can card pay?'], a: 0, why: 'pay by card / pay in cash' },
        ],
        sents: [
          ['How much is this?', '이거 얼마예요?'],
          ["It's ten dollars.", '10달러예요.'],
          ['That is too expensive.', '그건 너무 비싸요.'],
          ['This one is cheap.', '이건 싸네요.'],
          ['Can I pay by card?', '카드로 계산해도 돼요?'],
          ["I'll take it.", '이걸로 살게요.'],
        ],
      },
      {
        id: 'u4l4', title: '옷과 색깔', en: 'a blue shirt', notes: ['plurals'],
        words: ['shirt', 'pants', 'shoes', 'jacket', 'red', 'blue', 'black', 'white'],
        tip: {
          title: '형용사는 명사 앞 — 한국어와 같아요',
          html: `${b('a blue shirt')} 파란 셔츠 — 꾸미는 말이 앞에 오는 건 한국어와 같아요!<br><br>${b('pants')} · ${b('shoes')} · ${b('jeans')} · ${b('glasses')}는 두 쪽이 한 벌이라 늘 복수예요.<br>${b('These shoes are nice.')} (×This shoes is)<br><br>${b('Can I try it on?')} 입어 봐도 돼요?<br>${b('Do you have this in black?')} 이거 검은색 있어요?`,
        },
        items: [
          { q: '"빨간 재킷"', opts: ['a red jacket', 'a jacket red', 'red a jacket'], a: 0, why: 'a + 형용사 + 명사' },
          { q: 'These shoes ___ nice.', ko: '이 신발 예쁘네요.', opts: ['are', 'is', 'am'], a: 0, why: 'shoes는 복수 → are' },
          { q: '"입어 봐도 돼요?"', opts: ['Can I try it on?', 'Can I wear it test?', 'Can I on try it?'], a: 0, why: 'try on = 입어 보다. 대명사 it은 가운데: try it on' },
        ],
        sents: [
          ['I like this blue shirt.', '이 파란 셔츠가 마음에 들어요.'],
          ['Do you have this in black?', '이거 검은색 있어요?'],
          ['These shoes are nice.', '이 신발 예쁘네요.'],
          ['Can I try it on?', '입어 봐도 돼요?'],
          ['I want white pants.', '흰 바지를 원해요.'],
          ['How much is the red jacket?', '빨간 재킷은 얼마예요?'],
        ],
      },
    ],
  },
  {
    id: 'u5', no: 5, title: '식당·카페', en: "I'd like…", color: '#15a34a', notes: ['plurals', 'can'],
    desc: '카페 주문, 셀 수 없는 명사, 정중한 주문 I\'d like, 맛 표현',
    lessons: [
      {
        id: 'u5l1', title: '카페에서', en: 'A coffee, please.',
        words: ['coffee', 'tea', 'water', 'juice', 'milk', 'cup', 'iced', 'hot'],
        tip: {
          title: '주문은 "Can I get…?"',
          html: `${b('Can I get an iced americano?')} 아이스 아메리카노 한 잔 주시겠어요?<br>${b('A coffee, please.')}처럼 짧게 말해도 돼요.<br><br>미국 카페 단골 질문: ${b('For here or to go?')}(드시고 가세요, 가져가세요?)<br>→ ${b('To go, please.')} — 한국의 '테이크아웃'은 to go!<br><br>'아이스'는 ${b('iced')}: ${b('an iced latte')} (모음 소리 앞이라 an)`,
        },
        items: [
          { q: '"따뜻한 차 한 잔 주세요"', opts: ['A hot tea, please.', 'Hot tea one, please.', 'Please hot tea a.'], a: 0, why: 'a + 형용사 + 명사 + please' },
          { q: '"For here or to go?" — "가져갈게요."', opts: ['To go, please.', 'Takeout, please.', 'Go to, please.'], a: 0, why: '"테이크아웃"보다 미국에서는 To go!' },
          { q: '"아이스 아메리카노 한 잔"', opts: ['an iced americano', 'a ice americano', 'an ice americano'], a: 0, why: 'iced(얼음을 넣은)가 정확해요. 모음 소리 앞이니 an.' },
        ],
        sents: [
          ['A coffee, please.', '커피 한 잔 주세요.'],
          ['Can I get an iced americano?', '아이스 아메리카노 한 잔 주시겠어요?'],
          ['For here or to go?', '드시고 가세요, 가져가세요?'],
          ['To go, please.', '가져갈게요.'],
          ['Hot or iced?', '따뜻한 걸로요, 아이스로요?'],
          ['A glass of water, please.', '물 한 잔 주세요.'],
        ],
      },
      {
        id: 'u5l2', title: '음식', en: 'some bread', notes: ['plurals'],
        words: ['bread', 'rice', 'chicken', 'beef', 'egg', 'salad', 'soup', 'pizza'],
        tip: {
          title: '셀 수 없는 명사',
          html: `${b('rice')} · ${b('bread')} · ${b('water')} · ${b('money')}처럼 덩어리·물질은 <b>셀 수 없어요</b>. a도 -s도 붙이지 않아요.<br>${b('some bread')} 빵 좀 · ${b('a piece of bread')} 빵 한 조각<br><br>한국어엔 없는 구분이라 정말 많이 틀려요!<br>🐔 ${b('chicken')}: 고기는 셀 수 없음(some chicken), 닭 한 마리는 a chicken`,
        },
        items: [
          { q: '"빵 좀 주세요"', opts: ['Some bread, please.', 'A bread, please.', 'Breads, please.'], a: 0, why: 'bread는 셀 수 없어요 → some bread' },
          { q: 'I eat ___ every day.', ko: '저는 매일 밥을 먹어요.', opts: ['rice', 'a rice', 'rices'], a: 0, why: 'rice는 셀 수 없는 명사 (a·-s ×)' },
          { q: '"달걀 두 개"', opts: ['two eggs', 'two egg', 'two egges'], a: 0, why: 'egg는 셀 수 있어요 → two eggs' },
        ],
        sents: [
          ['I like chicken.', '저는 치킨(닭고기)을 좋아해요.'],
          ['Can I have some bread?', '빵 좀 주시겠어요?'],
          ['This soup is hot.', '이 수프 뜨거워요.'],
          ['I eat rice every day.', '저는 매일 밥을 먹어요.'],
          ["I don't eat beef.", '저는 소고기를 안 먹어요.'],
          ['Two eggs, please.', '달걀 두 개 주세요.'],
        ],
      },
      {
        id: 'u5l3', title: '주문하기', en: "I'd like…", notes: ['can'],
        words: ['menu', 'order', 'id_like', 'check', 'recommend', 'delicious', 'server', 'tip'],
        tip: {
          title: '정중하게 주문하기',
          html: `${b("I'd like the steak.")} 스테이크로 할게요. (I'd like = I would like, I want보다 공손)<br>${b('Could I have the menu?')} 메뉴판 주시겠어요?<br>${b('What do you recommend?')} 뭘 추천하세요?<br><br>미국 식당은 자리에서 계산해요: ${b('Can we get the check?')}(영국은 bill)<br>💡 팁은 보통 15~20%예요.`,
        },
        items: [
          { q: '"메뉴판 주시겠어요?"', opts: ['Could I have the menu?', 'Give me menu.', 'Menu could I?'], a: 0, why: 'Could I have ~? = ~ 주시겠어요? (정중)' },
          { q: '"스테이크로 할게요"', opts: ["I'd like the steak.", 'I like steak would.', 'I want steak give.'], a: 0, why: "I'd like + 원하는 것" },
          { q: '(미국 식당) "계산서 주세요"', opts: ['Can we get the check?', 'Can we get the calculator?', 'Count, please.'], a: 0, why: '계산서 = check (영국 bill)' },
        ],
        sents: [
          ['A table for two, please.', '두 명 자리 주세요.'],
          ['Could I have the menu?', '메뉴판 주시겠어요?'],
          ["I'd like the chicken salad.", '치킨 샐러드로 할게요.'],
          ['What do you recommend?', '뭘 추천하세요?'],
          ['This is delicious!', '이거 정말 맛있어요!'],
          ['Can we get the check, please?', '계산서 주시겠어요?'],
        ],
      },
      {
        id: 'u5l4', title: '맛 표현', en: "It's spicy!",
        words: ['spicy', 'sweet', 'salty', 'sour', 'bitter', 'taste', 'hungry', 'full'],
        tip: {
          title: 'taste + 형용사',
          html: `'~한 맛이 나다'는 ${b('taste')} + 형용사: ${b('It tastes good.')} 맛있어요. / ${b('It tastes salty.')} 짜요.<br><br>🌶️ 매운맛은 ${b('spicy')} — hot도 '맵다'지만 '뜨겁다'와 헷갈리니 spicy가 분명해요.<br><br>${b("I'm hungry.")} 배고파요 ↔ ${b("I'm full.")} 배불러요<br>${b('Kimchi is spicy and sour.')} 김치는 맵고 시큼해요.`,
        },
        items: [
          { q: 'This soup tastes ___.', ko: '이 수프는 짜요.', opts: ['salty', 'salt', 'saltly'], a: 0, why: 'taste + 형용사(salty)' },
          { q: '"배불러요"', opts: ["I'm full.", "I'm fill.", "I'm hungry."], a: 0, why: 'full = 배부른' },
          { q: '"이거 매워요?"', opts: ['Is it spicy?', 'Does it spicy?', 'It is spicy is?'], a: 0, why: 'spicy는 형용사 → be동사 질문 Is it ~?' },
        ],
        sents: [
          ['Is it spicy?', '그거 매워요?'],
          ['Kimchi is spicy.', '김치는 매워요.'],
          ['This cake is too sweet.', '이 케이크는 너무 달아요.'],
          ["I'm hungry.", '배고파요.'],
          ["I'm full, thank you.", '배불러요, 고마워요.'],
          ['It tastes good.', '맛있어요.'],
        ],
      },
    ],
  },
];

export const UNITS = [...UNITS1, ...UNITS2, ...UNITS3];
export const LESSONS = UNITS.flatMap((u) => u.lessons.map((l, i) => ({ ...l, unit: u, idx: i })));
export const LESSON = new Map(LESSONS.map((l) => [l.id, l]));
export const unitOf = (lessonId) => LESSON.get(lessonId)?.unit;
