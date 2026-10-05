import { NOTES2 } from './notes-2.js';

// 문법 노트 — 한국어와 비교하며 설명. 섹션 종류: p(문단) h(소제목) table ex(예문) tip(한국어 비교) warn(흔한 실수) drill(연습 링크)
const t = (s) => `<span class="en">${s}</span>`;
const m = (s, k) => `<span class="m m-${k}">${s}</span>`;

const NOTES1 = [
  {
    id: 'overview', title: '영어와 한국어', sub: '무엇이 다르고 무엇이 같을까',
    sections: [
      { p: '한국인이 영어를 어려워하는 가장 큰 이유는 단어가 아니라 <b>문장을 만드는 방식</b>이 다르기 때문이에요. 차이를 먼저 알면 훨씬 덜 헷갈려요.' },
      { table: { head: ['특징', '영어', '한국어'], rows: [
        ['어순', `${t('I eat rice.')} 주어-<b>동사</b>-목적어`, '나는 밥을 <b>먹는다</b> (동사가 끝)'],
        ['조사 vs 전치사', t('in the room'), '방 <b>안에</b> (조사가 뒤)'],
        ['주어', `${t('It is raining.')} 거의 항상 써요`, '(비가) 와요 — 자주 생략'],
        ['관사 a / the', t('a book, the book'), '없음'],
        ['단수·복수', `${t('a cat / two cats')} 꼭 표시`, '고양이 두 마리 (들 생략 가능)'],
        ['꾸미는 말', `${t('a friend who lives in Seoul')} 긴 말은 뒤에`, '<b>서울에 사는</b> 친구 (앞에)'],
        ['높임말', `${t('Could you…?')} 표현으로 공손`, '-요, -습니다 어미'],
      ] } },
      { h: '한국어와 같은 점' },
      { p: `형용사가 명사 앞에 오는 것(${t('a blue shirt')} 파란 셔츠), 의문사가 문장 앞쪽에 오는 것(${t('Where…?')} 어디…?)은 같아요. 그리고 영어 단어 중에는 이미 아는 외래어가 아주 많아요: ${t('coffee, bus, computer, pizza')}.` },
      { ex: [
        ['I study English every day.', '나는 매일 영어를 공부해요.', 'I 나는 · study 공부한다 · English 영어를 · every day 매일'],
        ['My friend lives in Busan.', '제 친구는 부산에 살아요.', 'My friend 제 친구는 · lives 산다 · in Busan 부산에'],
      ] },
      { tip: '영어 문장은 <b>"누가 + 한다 + 무엇을 + 어디서 + 언제"</b> 순서예요. 한국어로 생각한 뒤 동사를 앞으로 끌어오는 연습부터 해 보세요.' },
      { drill: 'tense', label: '동사 시제 드릴로 연습하기' },
    ],
  },
  {
    id: 'word_order', title: '어순', sub: '주어 + 동사가 먼저',
    sections: [
      { p: '한국어는 동사가 맨 끝에 오지만, 영어는 <b>주어 바로 뒤</b>에 와요. 이 하나만 바꿔도 문장이 영어다워져요.' },
      { table: { head: ['', '주어', '동사', '목적어·보어', '장소', '시간'], rows: [
        ['영어', t('I'), t('met'), t('my friend'), t('at the cafe'), t('yesterday')],
        ['한국어', '나는', '(만났다)', '친구를', '카페에서', '어제'],
      ] } },
      { p: '한국어 순서 "나는 어제 카페에서 친구를 만났다"를 영어로 바꾸면 동사가 앞으로, 장소·시간은 뒤로 가요.' },
      { ex: [
        ['I met my friend at the cafe yesterday.', '어제 카페에서 친구를 만났어요.'],
        ['She drinks coffee every morning.', '그녀는 매일 아침 커피를 마셔요.'],
        ['We play soccer in the park on Sundays.', '우리는 일요일마다 공원에서 축구를 해요.'],
      ] },
      { tip: '한국어는 조사(-은/는, -을/를) 덕분에 순서를 바꿔도 뜻이 통하지만, 영어는 <b>순서가 곧 문법</b>이에요. "Dog bites man"과 "Man bites dog"는 뜻이 정반대!' },
      { warn: `주어를 빼먹지 마세요. 한국어 "추워요"도 영어는 ${t("It's cold.")}처럼 주어(it)가 필요해요.` },
    ],
  },
  {
    id: 'be', title: 'be동사', sub: 'am · is · are — "~이다, ~에 있다"',
    sections: [
      { p: `be동사는 한국어 '~이다'와 '(~에) 있다'를 맡아요. 주어에 따라 모양이 바뀌어요.` },
      { table: { head: ['주어', '현재', '줄임', '과거'], rows: [
        [t('I'), t('am'), t("I'm"), t('was')],
        [t('you · we · they'), t('are'), t("you're · we're · they're"), t('were')],
        [t('he · she · it'), t('is'), t("he's · she's · it's"), t('was')],
      ] } },
      { h: '부정과 질문' },
      { p: `부정은 be 뒤에 ${t('not')}: ${t("I'm not tired.")} ${t("She isn't here.")}<br>질문은 be를 맨 앞으로: ${t('Are you a student?')} → ${t('Yes, I am.')} / ${t("No, I'm not.")}` },
      { ex: [
        ["I'm a student.", '저는 학생이에요.', 'I + am → I\'m'],
        ['She is in the kitchen.', '그녀는 부엌에 있어요.', "'있다'도 be동사"],
        ['They are not busy.', '그들은 바쁘지 않아요.', "are not = aren't"],
        ['Is he your brother?', '그 사람 당신 형이에요?', '질문: Is + he'],
      ] },
      { tip: "한국어 '이다'는 명사에만 붙지만(학생이다), 영어 be동사는 형용사에도 붙어요: 나는 피곤하다 = I <b>am</b> tired. 형용사 앞의 be를 빠뜨리는 실수가 정말 흔해요!" },
      { warn: `be동사와 일반동사를 함께 쓰지 마세요: ×I am go. → ${t('I go.')} / ${t("I'm going.")}` },
      { drill: 'be', label: 'be동사 드릴' },
    ],
  },
  {
    id: 'articles', title: '관사 a · an · the', sub: '한국어에 없는 작은 단어',
    sections: [
      { p: '셀 수 있는 명사가 하나일 때는 앞에 <b>a / an</b>을 붙여요. 한국어에 없는 말이라 가장 자주 빠뜨리는 부분이에요.' },
      { table: { head: ['', '언제', '예'], rows: [
        [t('a'), '자음 <b>소리</b> 앞', `${t('a book')} · ${t('a university')}`],
        [t('an'), '모음 <b>소리</b> 앞', `${t('an apple')} · ${t('an hour')}`],
        [t('the'), '서로 아는 그것, 하나뿐인 것', `${t('the sun')} · ${t('Close the door.')}`],
      ] } },
      { p: `a/an은 철자가 아니라 <b>소리</b>로 정해요: ${t('an hour')}(h 묵음, [아우어]) · ${t('a university')}([유]로 시작) · ${t('an MP3')}([엠])` },
      { ex: [
        ["I'm a teacher.", '저는 선생님이에요.', '직업 하나 → a'],
        ['I have an idea.', '좋은 생각이 있어요.', 'idea [아이디어] → an'],
        ['I bought a book. The book is great.', '책을 한 권 샀어요. 그 책 정말 좋아요.', '처음 말할 땐 a, 다시 말할 땐 the'],
      ] },
      { tip: "a는 '어떤 하나', the는 '바로 그'라는 느낌이에요. 한국어 '그 책'의 '그'와 비슷하게 생각하면 쉬워요." },
      { warn: `관사를 쓰지 않는 경우: 셀 수 없는 명사(${t('water, rice')}), 식사(${t('have lunch')}), 교통수단(${t('by bus')}), ${t('go to school')} · ${t('go home')}` },
      { drill: 'nouns', label: 'a/an · 복수 드릴' },
    ],
  },
  {
    id: 'plurals', title: '복수와 셀 수 없는 명사', sub: '-s를 꼭 붙여요',
    sections: [
      { p: '둘 이상이면 명사 끝에 <b>-s</b>를 붙여요. 한국어는 "사과 두 개"처럼 복수 표시를 생략해도 되지만, 영어는 꼭 표시해요.' },
      { table: { head: ['규칙', '예'], rows: [
        ['대부분 + s', `${t('cat → cats')} · ${t('book → books')}`],
        ['s · sh · ch · x + es', `${t('bus → buses')} · ${t('box → boxes')} · ${t('watch → watches')}`],
        ['자음 + y → ies', `${t('city → cities')} · ${t('baby → babies')}`],
        ['f / fe → ves', `${t('knife → knives')} · ${t('leaf → leaves')}`],
        ['불규칙', `${t('man → men')} · ${t('child → children')} · ${t('person → people')} · ${t('foot → feet')} · ${t('tooth → teeth')}`],
        ['같은 모양', `${t('fish → fish')} · ${t('sheep → sheep')}`],
      ] } },
      { h: '셀 수 없는 명사' },
      { p: `물질·덩어리·추상적인 것은 셀 수 없어요. a도 -s도 붙이지 않아요: ${t('water, rice, bread, money, music, homework, advice, information')}<br>세고 싶으면 단위를 써요: ${t('a glass of water')} · ${t('a piece of bread')} · ${t('a cup of coffee')}` },
      { ex: [
        ['I have two brothers.', '저는 형제가 둘 있어요.'],
        ['Three children are playing.', '아이 세 명이 놀고 있어요.'],
        ["I don't have much money.", '돈이 별로 없어요.', 'money는 셀 수 없음 → much'],
        ['Can I have a glass of water?', '물 한 잔 주시겠어요?'],
      ] },
      { tip: "how many(몇 개) + 셀 수 있는 명사, how much(얼마나) + 셀 수 없는 명사: How many books? / How much water?" },
      { warn: `${t('pants, jeans, glasses, shoes')}처럼 두 쪽이 한 벌인 것은 늘 복수예요: ${t('These pants are new.')}` },
      { drill: 'nouns', label: 'a/an · 복수 드릴' },
    ],
  },
  {
    id: 'pronouns', title: '인칭대명사', sub: 'I · my · me · mine',
    sections: [
      { p: '한국어는 조사를 바꾸지만(나는·나의·나를), 영어는 <b>단어 자체</b>가 바뀌어요.' },
      { table: { head: ['', '~은/는', '~의', '~을/를', '~의 것'], rows: [
        ['나', t('I'), t('my'), t('me'), t('mine')],
        ['너·당신', t('you'), t('your'), t('you'), t('yours')],
        ['그', t('he'), t('his'), t('him'), t('his')],
        ['그녀', t('she'), t('her'), t('her'), t('hers')],
        ['그것', t('it'), t('its'), t('it'), '–'],
        ['우리', t('we'), t('our'), t('us'), t('ours')],
        ['그들', t('they'), t('their'), t('them'), t('theirs')],
      ] } },
      { ex: [
        ['She likes him.', '그녀는 그를 좋아해요.'],
        ['This is my bag. That bag is yours.', '이건 제 가방이에요. 저 가방은 당신 거예요.'],
        ['Can you help us?', '저희 좀 도와주실래요?'],
      ] },
      { tip: "영어의 you는 반말·존댓말, 한 명·여러 명을 모두 뜻해요. 존댓말은 대명사가 아니라 'Could you…?', 'please' 같은 표현으로 나타내요." },
      { warn: `${t("it's")}(= it is)와 ${t('its')}(그것의)를 헷갈리지 마세요: ${t("It's a dog. Its name is Bomi.")}` },
      { drill: 'pronoun', label: '인칭대명사 드릴' },
    ],
  },
  {
    id: 'this_that', title: 'this · that', sub: '이것 · 저것',
    sections: [
      { table: { head: ['', '하나', '여럿'], rows: [
        ['가까이 (이)', t('this'), t('these')],
        ['멀리 (그·저)', t('that'), t('those')],
      ] } },
      { p: `명사 앞에서도 써요: ${t('this book')} 이 책 · ${t('those shoes')} 저 신발<br>대답할 때는 ${t('it')} / ${t('they')}로 받아요: ${t("What's this? — It's a pen.")}` },
      { ex: [
        ['This is my friend, Jisu.', '이쪽은 제 친구 지수예요.', '사람을 소개할 때도 this'],
        ['Is that your car?', '저거 당신 차예요?'],
        ['These are my parents.', '이분들은 저희 부모님이에요.'],
      ] },
      { tip: "한국어는 이·그·저 3단계지만 영어는 2단계! 상대 가까이 있는 '그것'도 보통 that이에요." },
      { warn: `전화로 자기를 밝힐 때는 ${t('This is Mina.')}(저 미나예요) — I'm Mina보다 자연스러워요.` },
    ],
  },
  {
    id: 'there_is', title: 'There is · There are', sub: '"~이 있다"',
    sections: [
      { p: `어떤 곳에 무엇이 '있다'(존재)고 말할 때 써요. 뒤에 오는 명사 수에 맞춰 is / are를 골라요.` },
      { table: { head: ['', '긍정', '부정', '질문'], rows: [
        ['하나', t('There is a bank.'), t("There isn't a bank."), t('Is there a bank?')],
        ['여럿', t('There are two cafes.'), t("There aren't any cafes."), t('Are there any cafes?')],
      ] } },
      { ex: [
        ['There is a convenience store on the corner.', '모퉁이에 편의점이 있어요.'],
        ['Are there any good restaurants near here?', '이 근처에 괜찮은 식당 있어요?'],
        ["There's no time.", '시간이 없어요.'],
      ] },
      { tip: "한국어 '있다'는 두 가지예요. ① 존재(카페가 있다) → There is ② 소유(나는 차가 있다) → I have. 이 구분이 핵심!" },
      { warn: `있다고 'have'를 쓰면 틀려요: ×Have a bank near here? → ${t('Is there a bank near here?')}` },
    ],
  },
  {
    id: 'have', title: 'have · has', sub: '가지고 있다 · 먹다 · 아프다',
    sections: [
      { p: `${t('have')}는 '가지고 있다'가 기본 뜻이에요. 주어가 he·she·it이면 ${t('has')}.` },
      { table: { head: ['쓰임', '예', '뜻'], rows: [
        ['소유', t('I have a car.'), '차가 있어요'],
        ['가족·특징', t('She has two sisters.'), '자매가 둘 있어요'],
        ['식사', t('Let\'s have lunch.'), '점심 먹자'],
        ['증상', t('I have a headache.'), '머리가 아파요'],
        ['경험·일', t('Have a nice day!'), '좋은 하루 보내요'],
      ] } },
      { p: `부정과 질문은 일반동사처럼 do를 써요: ${t("I don't have time.")} · ${t('Do you have a pen?')} · ${t("She doesn't have a car.")}` },
      { ex: [
        ['He has a big dog.', '그는 큰 개를 키워요.'],
        ['Do you have any questions?', '질문 있어요?'],
        ['I have a cold.', '감기에 걸렸어요.'],
      ] },
      { tip: "한국어 '나는 시간이 있다'를 영어로는 '나는 시간을 가지고 있다'(I have time)로 바꿔 생각해요." },
      { warn: `${t("doesn't")} 뒤에는 has가 아니라 have: ×She doesn't has → ${t("She doesn't have")}` },
    ],
  },
  {
    id: 'present', title: '현재형과 3인칭 -s', sub: '늘 하는 일 · 습관',
    sections: [
      { p: '늘 하는 일, 습관, 사실은 <b>현재형</b>으로 말해요. 주어가 he · she · it(3인칭 단수)이면 동사 끝에 <b>-s</b>를 붙여요.' },
      { table: { head: ['주어', '동사', '예'], rows: [
        [t('I · you · we · they'), '원형', t('I work in Seoul.')],
        [t('he · she · it'), `원형 + ${m('s', 'end')}`, t('She works in Seoul.')],
      ] } },
      { table: { head: ['철자 규칙', '예'], rows: [
        ['대부분 + s', `${t('play → plays')} · ${t('like → likes')}`],
        ['s · sh · ch · x · o + es', `${t('watch → watches')} · ${t('go → goes')} · ${t('do → does')}`],
        ['자음 + y → ies', `${t('study → studies')} · ${t('cry → cries')}`],
        ['불규칙', `${t('have → has')}`],
      ] } },
      { ex: [
        ['My mom works at a hospital.', '엄마는 병원에서 일하세요.'],
        ['He watches TV every night.', '그는 매일 밤 TV를 봐요.'],
        ['The store opens at nine.', '가게는 9시에 열어요.', 'the store = it → opens'],
      ] },
      { tip: "한국어는 주어가 누구든 동사가 같아요(나는/그는 일해요). 영어는 he·she일 때만 -s — '그·그녀면 에스'라고 외워 두세요." },
      { warn: `주어가 사람 이름·사물 하나여도 3인칭 단수예요: ${t('Mina likes K-pop.')} · ${t('This bus goes to Busan.')}` },
      { drill: 'tense', label: '동사 시제 드릴' },
    ],
  },
  {
    id: 'do_does', title: 'do · does 질문과 부정', sub: '일반동사의 도우미',
    sections: [
      { p: '일반동사(play, like, go…)의 질문과 부정은 도우미 <b>do / does</b>가 맡아요.' },
      { table: { head: ['', 'I · you · we · they', 'he · she · it'], rows: [
        ['질문', `${m('Do', 'aux')} you like it?`, `${m('Does', 'aux')} she like it?`],
        ['부정', `I ${m("don't", 'neg')} like it.`, `She ${m("doesn't", 'neg')} like it.`],
        ['대답', t('Yes, I do. / No, I don\'t.'), t('Yes, she does. / No, she doesn\'t.')],
      ] } },
      { p: `does·doesn't가 -s를 가져가니까 뒤의 동사는 <b>원형</b>: ${t('Does he play tennis?')} (×Does he plays)` },
      { ex: [
        ['Do you speak English?', '영어 하세요?'],
        ["He doesn't eat meat.", '그는 고기를 안 먹어요.'],
        ['Where does she live?', '그녀는 어디 살아요?', '의문사 + does + 주어 + 원형'],
      ] },
      { tip: "be동사 문장(I'm tired)은 be를 앞으로, 일반동사 문장(I like it)은 do를 앞에 붙여요. 이 두 가지만 구분하면 질문은 끝!" },
      { warn: `be동사와 do를 섞지 마세요: ×Are you like coffee? → ${t('Do you like coffee?')}` },
      { drill: 'tense', label: '동사 시제 드릴' },
    ],
  },
  {
    id: 'frequency', title: '빈도부사', sub: 'always · usually · often · sometimes · never',
    sections: [
      { table: { head: ['', '빈도', '뜻'], rows: [
        [t('always'), '100%', '항상'],
        [t('usually'), '90%', '보통'],
        [t('often'), '70%', '자주'],
        [t('sometimes'), '50%', '가끔'],
        [t('rarely'), '10%', '거의 ~ 않다'],
        [t('never'), '0%', '절대 ~ 않다'],
      ] } },
      { p: `자리: <b>일반동사 앞, be동사 뒤</b><br>${t('I usually get up at seven.')} · ${t("I'm always hungry.")}` },
      { p: `얼마나 자주? ${t('How often do you exercise?')} → ${t('Twice a week.')} 일주일에 두 번 · ${t('Every day.')} 매일` },
      { ex: [
        ['She always drinks coffee.', '그녀는 항상 커피를 마셔요.'],
        ['We sometimes go hiking.', '우리는 가끔 등산을 가요.'],
        ["He's never late.", '그는 절대 늦지 않아요.'],
      ] },
      { warn: `never는 그 자체가 부정이에요: ×I don't never → ${t('I never drink coffee.')}` },
    ],
  },
  {
    id: 'progressive', title: '현재진행형', sub: 'be + -ing = ~하고 있다',
    sections: [
      { p: '지금 하고 있는 일, 요즘 하고 있는 일은 <b>be동사 + 동사-ing</b>예요. 한국어 "-고 있다"와 거의 같아요.' },
      { table: { head: ['', '긍정', '부정', '질문'], rows: [
        [t('I'), `I ${m('am', 'aux')} work${m('ing', 'end')}`, "I'm not working", 'Am I working?'],
        [t('he · she · it'), `She ${m('is', 'aux')} work${m('ing', 'end')}`, "She isn't working", 'Is she working?'],
        [t('you · we · they'), `They ${m('are', 'aux')} work${m('ing', 'end')}`, "They aren't working", 'Are they working?'],
      ] } },
      { ex: [
        ["I'm watching TV.", 'TV 보고 있어요.'],
        ["It's raining outside.", '밖에 비가 와요.'],
        ["I'm learning English these days.", '요즘 영어를 배우고 있어요.'],
        ["We're meeting tomorrow.", '우리 내일 만나요.', '정해진 가까운 미래도 진행형으로 말해요'],
      ] },
      { tip: "현재형(I work)은 '늘', 진행형(I'm working)은 '지금·요즘'. 한국어 '일해요'가 두 뜻을 다 가져서 헷갈리는 거예요." },
      { warn: `상태를 나타내는 동사는 진행형으로 잘 안 써요: ${t('know, like, want, need, have')}(가지다) → ×I'm knowing → ${t('I know.')}` },
      { drill: 'tense', label: '동사 시제 드릴' },
    ],
  },
  {
    id: 'ing', title: '-ing 철자', sub: 'making · running · lying',
    sections: [
      { table: { head: ['규칙', '예'], rows: [
        ['대부분 + ing', `${t('play → playing')} · ${t('read → reading')} · ${t('see → seeing')}`],
        ['e로 끝나면 e 빼고 + ing', `${t('make → making')} · ${t('come → coming')} · ${t('dance → dancing')}`],
        ['짧은 모음 + 자음 하나 → 자음 겹치기', `${t('run → running')} · ${t('swim → swimming')} · ${t('stop → stopping')} · ${t('begin → beginning')}`],
        ['ie → ying', `${t('lie → lying')} · ${t('die → dying')}`],
      ] } },
      { p: `자음을 겹치는 건 <b>강세가 있는 짧은 끝음절</b>일 때만: ${t('beGIN → beginning')}, 하지만 ${t('VISit → visiting')} · ${t('LISten → listening')}` },
      { warn: `w · x · y로 끝나면 겹치지 않아요: ${t('snow → snowing')} · ${t('fix → fixing')} · ${t('play → playing')}` },
      { drill: 'tense', label: '동사 시제 드릴' },
    ],
  },
  {
    id: 'prep_place', title: '장소 전치사', sub: 'in · on · at · next to …',
    sections: [
      { p: '전치사는 한국어 조사처럼 위치를 알려 주지만, 명사 <b>앞</b>에 와요: 책상 위에 → on the desk' },
      { table: { head: ['', '뜻', '예'], rows: [
        [t('in'), '~ 안에 (공간·도시·나라)', `${t('in the box')} · ${t('in Seoul')}`],
        [t('on'), '~ 위에 (표면에 닿아서)', `${t('on the table')} · ${t('on the wall')}`],
        [t('at'), '~에 (지점·장소)', `${t('at the bus stop')} · ${t('at home')}`],
        [t('under'), '~ 아래에', t('under the bed')],
        [t('next to'), '~ 옆에', t('next to the bank')],
        [t('behind'), '~ 뒤에', t('behind the door')],
        [t('in front of'), '~ 앞에', t('in front of the station')],
        [t('between'), '~ 사이에', t('between A and B')],
        [t('across from'), '~ 맞은편에', t('across from the park')],
      ] } },
      { ex: [
        ['The keys are on the table.', '열쇠는 탁자 위에 있어요.'],
        ["I'm at the airport.", '저 공항이에요.'],
        ['The cafe is between the bank and the hotel.', '카페는 은행과 호텔 사이에 있어요.'],
      ] },
      { tip: "in은 '안', on은 '붙어서', at은 '그 지점'. 한국어 '에'가 셋 다 되기 때문에 그림으로 기억하는 게 좋아요." },
      { warn: `교통수단: ${t('on the bus / on the subway')}(서서 다닐 수 있는 것) vs ${t('in a taxi / in a car')}` },
      { drill: 'prep', label: '전치사 드릴' },
    ],
  },
  {
    id: 'prep_time', title: '시간 전치사', sub: 'at 7 · on Monday · in May',
    sections: [
      { table: { head: ['', '언제', '예'], rows: [
        [t('at'), '시각·정확한 때', `${t('at seven')} · ${t('at noon')} · ${t('at night')}`],
        [t('on'), '요일·날짜·특정한 날', `${t('on Monday')} · ${t('on May 5th')} · ${t('on my birthday')}`],
        [t('in'), '월·계절·연도·하루의 때', `${t('in May')} · ${t('in summer')} · ${t('in 2025')} · ${t('in the morning')}`],
      ] } },
      { p: '좁은 시간 → 넓은 시간 순서로 at → on → in. "at 시, on 날, in 달" 하고 외워요.' },
      { ex: [
        ['The class starts at nine.', '수업은 9시에 시작해요.'],
        ["Let's meet on Friday.", '금요일에 만나요.'],
        ['I was born in March.', '저는 3월에 태어났어요.'],
        ["I'll be back in ten minutes.", '10분 뒤에 돌아올게요.', 'in + 기간 = ~ 뒤에'],
      ] },
      { warn: `${t('today, tomorrow, yesterday, next week, last year, every day')} 앞에는 전치사를 쓰지 않아요: ×on tomorrow → ${t('tomorrow')}` },
      { drill: 'prep', label: '전치사 드릴' },
    ],
  },
  {
    id: 'numbers', title: '숫자 읽기', sub: '세 자리씩 끊어요',
    sections: [
      { table: { head: ['', '읽기'], rows: [
        ['13 / 30', `${t('thirteen')} (뒤 강세) / ${t('thirty')} (앞 강세)`],
        ['21', t('twenty-one')],
        ['105', t('one hundred five')],
        ['1,250', t('one thousand two hundred fifty')],
        ['10,000', `${t('ten thousand')} — '만' 단위가 없어요!`],
        ['1,000,000', t('one million')],
      ] } },
      { p: `영어는 쉼표마다 thousand(천) → million(백만) → billion(십억)으로 끊어 읽어요. 100,000은 ${t('one hundred thousand')}(십만).` },
      { h: '서수 (첫째, 둘째…)' },
      { p: `${t('first')} · ${t('second')} · ${t('third')} · 그 뒤는 대부분 -th: ${t('fourth, fifth, twelfth, twentieth, twenty-first')}<br>날짜·층에 써요: ${t('May 5th')} · ${t('the third floor')}` },
      { h: '전화번호·연도' },
      { p: `전화번호는 한 자리씩, 0은 "oh": 010-1234 → ${t('oh one oh, one two three four')}<br>연도는 두 자리씩: 1998 → ${t('nineteen ninety-eight')} · 2025 → ${t('twenty twenty-five')}` },
      { tip: "한국어는 만 단위(4자리), 영어는 천 단위(3자리)로 끊어요. 큰 숫자는 쉼표 위치를 보고 읽는 연습을 해 보세요." },
      { drill: 'numbers', label: '숫자 드릴' },
    ],
  },
];

export const NOTES = [...NOTES1, ...NOTES2];
export const NOTE = new Map(NOTES.map((n) => [n.id, n]));
