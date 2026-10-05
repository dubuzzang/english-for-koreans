// 11~15단원: 미래와 계획 · 능력과 의무 · 몸과 건강 · 비교와 묘사 · 경험과 문장 잇기
const b = (s) => `<b class="en">${s}</b>`;

export const UNITS3 = [
  {
    id: 'u11', no: 11, title: '미래와 계획', en: "What's your plan?", color: '#7356f0', notes: ['future', 'want'],
    desc: 'will과 be going to, want to·would like to, 약속 잡기',
    lessons: [
      {
        id: 'u11l1', title: 'will', en: "I'll call you.", notes: ['future'],
        words: ['will', 'next_week', 'next_year', 'maybe', 'probably', 'promise', 'forget', 'decide'],
        tip: {
          title: 'will = ~할게 · ~일 거야',
          html: `${b('will')} + 동사원형: 지금 막 정한 일, 약속, 예측<br>${b("I'll call you tomorrow.")} 내일 전화할게요.<br>${b('It will probably rain.')} 아마 비가 올 거예요.<br><br>보통 줄여서 ${b("I'll")} · ${b("you'll")} · ${b("it'll")}, 부정은 ${b("won't")}(= will not)<br>${b("I won't forget.")} 잊지 않을게요.`,
        },
        items: [
          { q: 'I ___ call you tomorrow.', ko: '내일 전화할게요.', opts: ['will', 'am', 'do'], a: 0, why: 'will + 동사원형' },
          { q: "She will ___ you.", ko: '그녀가 당신을 도와줄 거예요.', opts: ['help', 'helps', 'to help'], a: 0, why: 'will 뒤에는 동사원형 (-s ×, to ×)' },
          { q: '"잊지 않을게"', opts: ["I won't forget.", "I willn't forget.", "I don't will forget."], a: 0, why: "will not = won't" },
        ],
        sents: [
          ["I'll call you tomorrow.", '내일 전화할게요.'],
          ['It will probably rain.', '아마 비가 올 거예요.'],
          ["I won't forget.", '잊지 않을게요.'],
          ['Maybe I will go next week.', '아마 다음 주에 갈 거예요.'],
          ['I promise.', '약속해요.'],
          ["I'll decide tomorrow.", '내일 결정할게요.'],
        ],
      },
      {
        id: 'u11l2', title: 'be going to', en: "I'm going to move.", notes: ['future'],
        words: ['plan', 'move', 'get_married', 'graduate', 'save', 'abroad', 'summer', 'winter'],
        tip: {
          title: '미리 정한 계획은 be going to',
          html: `이미 정해 둔 계획은 ${b('be going to')} + 동사원형:<br>${b("I'm going to move next month.")} 다음 달에 이사할 거예요.<br>${b('They are going to get married.')} 그들은 결혼할 거예요.<br><br>will은 '지금 막 정한 일'(${b("I'll get it!")} 내가 받을게!), be going to는 '전부터 계획한 일'이라는 느낌이에요. 말할 땐 ${b('gonna')}로 줄이기도 해요.`,
        },
        items: [
          { q: "I'm going to ___ abroad.", ko: '저는 유학 갈 거예요.', opts: ['study', 'studying', 'studies'], a: 0, why: 'be going to + 동사원형' },
          { q: 'She ___ going to graduate next year.', ko: '그녀는 내년에 졸업할 거예요.', opts: ['is', 'are', 'does'], a: 0, why: 'she → is going to' },
          { q: '"이번 여름에 뭐 할 거예요?"', opts: ['What are you going to do this summer?', 'What you going to do this summer?', 'What do you going to do this summer?'], a: 0, why: '의문사 + be + 주어 + going to' },
        ],
        sents: [
          ["I'm going to move next month.", '다음 달에 이사할 거예요.'],
          ['They are going to get married.', '그들은 결혼할 거예요.'],
          ["I'm going to study abroad.", '저는 유학 갈 거예요.'],
          ['What are your plans for the summer?', '여름 계획이 뭐예요?'],
          ["We're going to save money.", '우리는 돈을 모을 거예요.'],
          ['She is going to graduate in winter.', '그녀는 겨울에 졸업할 거예요.'],
        ],
      },
      {
        id: 'u11l3', title: '꿈과 목표', en: 'I want to be…', notes: ['want'],
        words: ['dream', 'become', 'hope', 'try', 'future', 'someday', 'practice', 'goal'],
        tip: {
          title: 'want to + 동사원형 = ~하고 싶다',
          html: `${b('I want to be a doctor.')} 의사가 되고 싶어요.<br>${b('She wants to travel.')} 그녀는 여행하고 싶어 해요. (3인칭은 wants!)<br><br>더 공손하게: ${b("I'd like to")} + 동사원형<br><br>${b('My dream is to')} + 동사원형 = 제 꿈은 ~하는 거예요<br>${b('I hope')} ~ = ~이면 좋겠어요`,
        },
        items: [
          { q: 'I want ___ a pilot.', ko: '조종사가 되고 싶어요.', opts: ['to be', 'be', 'being'], a: 0, why: 'want to + 동사원형' },
          { q: 'He ___ to learn Japanese.', ko: '그는 일본어를 배우고 싶어 해요.', opts: ['wants', 'want', 'is want'], a: 0, why: 'he → wants' },
          { q: '"제 꿈은 가수가 되는 거예요"', opts: ['My dream is to become a singer.', 'My dream is become a singer.', 'My dream to become is a singer.'], a: 0, why: 'My dream is to + 동사원형' },
        ],
        sents: [
          ['I want to become a doctor.', '의사가 되고 싶어요.'],
          ['My dream is to travel the world.', '제 꿈은 세계 여행을 하는 거예요.'],
          ['I hope you like it.', '마음에 들었으면 좋겠어요.'],
          ["I'll try my best.", '최선을 다할게요.'],
          ['I practice English every day.', '저는 매일 영어를 연습해요.'],
          ['What do you want to do in the future?', '앞으로 뭘 하고 싶어요?'],
        ],
      },
      {
        id: 'u11l4', title: '약속 잡기', en: 'Are you free on Friday?',
        words: ['together', 'sure', 'sounds_good', 'how_about', 'invite', 'join', 'cancel', 'instead'],
        tip: {
          title: '제안하고 답하기',
          html: `${b('Are you free on Friday?')} 금요일에 시간 있어요?<br>${b('How about')} + 명사/-ing: ${b('How about Saturday?')} 토요일 어때요?<br>${b('Do you want to')} + 동사? ~할래요?<br><br>좋아요: ${b('Sounds good!')} ${b('Sure!')}<br>거절: ${b("Sorry, I can't. How about Sunday instead?")}`,
        },
        items: [
          { q: '"토요일 어때요?"', opts: ['How about Saturday?', 'How is Saturday about?', 'What about on Saturday is?'], a: 0, why: 'How about + 명사?' },
          { q: '"같이 영화 볼래요?"', opts: ['Do you want to see a movie together?', 'Do you want see a movie together?', 'Are you want to see a movie?'], a: 0, why: 'Do you want to + 동사원형?' },
          { q: '제안에 "좋아!"', opts: ['Sounds good!', 'Sound good is!', 'Good sounds!'], a: 0, why: '(That) sounds good! = 좋아!' },
        ],
        sents: [
          ['Are you free on Friday?', '금요일에 시간 있어요?'],
          ["Let's have dinner together.", '같이 저녁 먹어요.'],
          ['Sounds good!', '좋아요!'],
          ['How about Saturday instead?', '대신 토요일은 어때요?'],
          ['Can I join you?', '같이해도 될까요?'],
          ['Thank you for inviting me.', '초대해 줘서 고마워요.'],
        ],
      },
    ],
  },
  {
    id: 'u12', no: 12, title: '능력과 의무', en: 'I can · I have to', color: '#15a34a', notes: ['can', 'modals'],
    desc: 'can·can\'t, have to·must, should, Could you·May I',
    lessons: [
      {
        id: 'u12l1', title: '할 수 있어요', en: 'I can swim.', notes: ['can'],
        words: ['can', 'sing', 'guitar', 'piano', 'well', 'fix', 'ride', 'climb'],
        tip: {
          title: "can + 동사원형 · can't는 크게",
          html: `${b('I can swim.')} 수영할 수 있어요. · ${b("I can't drive.")} 운전 못 해요.<br>can 뒤에는 동사원형, 주어가 he·she여도 그대로: ${b('She can sing.')}<br><br>🔊 발음 팁: 긍정 ${b('can')}은 약하게 [큰], 부정 ${b("can't")}은 강하게 [캔트]. 소리 세기로 구분해요!<br>'잘'은 ${b('well')}: ${b('She plays the piano well.')}`,
        },
        items: [
          { q: 'She can ___ the guitar.', ko: '그녀는 기타를 칠 수 있어요.', opts: ['play', 'plays', 'to play'], a: 0, why: 'can + 동사원형' },
          { q: '"수영할 줄 알아요?"', opts: ['Can you swim?', 'Do you can swim?', 'Are you can swim?'], a: 0, why: '질문은 Can을 맨 앞으로' },
          { q: 'He sings very ___.', ko: '그는 노래를 정말 잘해요.', opts: ['well', 'good', 'nice'], a: 0, why: '동사를 꾸미는 "잘" = well (good은 형용사)' },
        ],
        sents: [
          ['I can swim.', '저는 수영할 수 있어요.'],
          ["I can't drive.", '저는 운전 못 해요.'],
          ['Can you play the piano?', '피아노 칠 줄 알아요?'],
          ['She sings very well.', '그녀는 노래를 정말 잘해요.'],
          ['Can you fix my bike?', '제 자전거 고쳐 줄 수 있어요?'],
          ['He can ride a horse.', '그는 말을 탈 줄 알아요.'],
        ],
      },
      {
        id: 'u12l2', title: '해야 해요', en: 'I have to go.', notes: ['modals'],
        words: ['have_to', 'must', 'homework', 'rule', 'wear', 'quiet', 'on_time', 'seatbelt'],
        tip: {
          title: "have to = ~해야 한다 · don't have to = 안 해도 된다",
          html: `${b('I have to go now.')} 이제 가야 해요. (3인칭은 ${b('has to')})<br>${b('must')}도 '해야 한다'지만 규칙·강한 의무 느낌이에요.<br><br>⚠️ 부정은 뜻이 완전히 달라요!<br>${b("You don't have to wear a tie.")} 넥타이 안 매도 돼요(필요 없음)<br>${b("You mustn't smoke here.")} 여기서 담배 피우면 안 돼요(금지)`,
        },
        items: [
          { q: 'She ___ to work on Saturday.', ko: '그녀는 토요일에 일해야 해요.', opts: ['has', 'have', 'must'], a: 0, why: 'she → has to' },
          { q: '"안 와도 돼요"', opts: ["You don't have to come.", "You must not come.", "You haven't to come."], a: 0, why: "don't have to = ~할 필요 없다 (must not은 금지)" },
          { q: 'You ___ wear a seatbelt.', ko: '안전벨트를 꼭 매야 해요.', opts: ['must', 'can', 'may'], a: 0, why: '규칙·강한 의무 = must' },
        ],
        sents: [
          ['I have to go now.', '이제 가야 해요.'],
          ['I have a lot of homework.', '숙제가 많아요.'],
          ['You must wear a seatbelt.', '안전벨트를 꼭 매야 해요.'],
          ["You don't have to wear a uniform.", '유니폼은 안 입어도 돼요.'],
          ['Please be on time.', '시간 맞춰 와 주세요.'],
          ['Please be quiet in the library.', '도서관에서는 조용히 해 주세요.'],
        ],
      },
      {
        id: 'u12l3', title: '조언하기', en: 'You should rest.', notes: ['modals'],
        words: ['should', 'rest', 'exercise', 'advice', 'careful', 'drink', 'enough', 'outside'],
        tip: {
          title: 'should = ~하는 게 좋겠어요',
          html: `조언·충고는 ${b('should')} + 동사원형:<br>${b('You should rest.')} 쉬는 게 좋겠어요.<br>${b("You shouldn't drink coffee at night.")} 밤에 커피는 안 마시는 게 좋아요.<br><br>have to·must보다 훨씬 부드러워서 친구에게 조언할 때 딱 좋아요.<br>${b('advice')}(조언)는 셀 수 없어요: ${b('some advice')} (×an advice)`,
        },
        items: [
          { q: 'You ___ see a doctor.', ko: '병원에 가 보는 게 좋겠어요.', opts: ['should', 'shoulds', 'should to'], a: 0, why: 'should + 동사원형' },
          { q: '"밤늦게 먹지 않는 게 좋아요"', opts: ["You shouldn't eat late at night.", "You don't should eat late at night.", 'You should not to eat late at night.'], a: 0, why: "shouldn't + 동사원형" },
          { q: '"조언 좀 해 줄래요?"', opts: ['Can you give me some advice?', 'Can you give me an advice?', 'Can you give me advices?'], a: 0, why: 'advice는 셀 수 없는 명사' },
        ],
        sents: [
          ['You should rest at home.', '집에서 쉬는 게 좋겠어요.'],
          ['You should drink more water.', '물을 더 마시는 게 좋아요.'],
          ["You shouldn't stay up late.", '늦게까지 깨어 있지 않는 게 좋아요.'],
          ['Be careful!', '조심해!'],
          ['Get enough sleep.', '잠을 충분히 자요.'],
          ['Exercise outside every day.', '매일 밖에서 운동하세요.'],
        ],
      },
      {
        id: 'u12l4', title: '부탁과 허락', en: 'Could you…? May I…?', notes: ['can'],
        words: ['could', 'may_aux', 'borrow', 'lend', 'use', 'turn_on', 'turn_off', 'of_course'],
        tip: {
          title: '공손함의 단계',
          html: `부탁: ${b('Can you…?')} → 더 공손하게 ${b('Could you…?')}<br>${b('Could you open the window?')} 창문 좀 열어 주시겠어요?<br><br>허락: ${b('Can I…?')} → 더 공손하게 ${b('May I…?')}<br>${b('May I use your phone?')} 전화 좀 써도 될까요?<br><br>대답: ${b('Of course.')} ${b('Sure.')} ${b('Go ahead.')}<br>🔁 내가 빌리면 ${b('borrow')}, 빌려주면 ${b('lend')}`,
        },
        items: [
          { q: '"펜 좀 빌려도 될까요?"', opts: ['Can I borrow your pen?', 'Can I lend your pen?', 'Can you borrow me your pen?'], a: 0, why: '내가 빌리면 borrow' },
          { q: '"불 좀 켜 주시겠어요?"', opts: ['Could you turn on the light?', 'Could you turn the light open?', 'Could you on the light?'], a: 0, why: 'turn on = 켜다, Could you ~? = 정중한 부탁' },
          { q: '가장 공손한 허락 구하기', opts: ['May I come in?', 'I come in?', 'Come in, can I?'], a: 0, why: 'May I ~? = ~해도 될까요? (가장 공손)' },
        ],
        sents: [
          ['Could you help me, please?', '좀 도와주시겠어요?'],
          ['May I use your phone?', '전화 좀 써도 될까요?'],
          ['Of course.', '물론이죠.'],
          ['Can I borrow your umbrella?', '우산 좀 빌려도 될까요?'],
          ['Can you lend me some money?', '돈 좀 빌려줄 수 있어요?'],
          ['Please turn off your phone.', '휴대폰을 꺼 주세요.'],
        ],
      },
    ],
  },
  {
    id: 'u13', no: 13, title: '몸과 건강', en: 'I have a headache.', color: '#d63f7f', notes: ['have', 'modals'],
    desc: '몸 이름, 아픈 곳 말하기, 약국·병원, 건강 습관',
    lessons: [
      {
        id: 'u13l1', title: '몸', en: 'head, eyes, hands',
        words: ['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'leg', 'stomach'],
        tip: {
          title: '몸은 my·your와 함께',
          html: `영어는 몸을 말할 때 소유격을 붙여요: ${b('Wash your hands.')} 손 씻어. (한국어는 '손 씻어')<br><br>두 개인 건 복수: ${b('eyes')} ${b('ears')} ${b('hands')} ${b('legs')}<br>불규칙 복수: ${b('foot')} → ${b('feet')} · ${b('tooth')} → ${b('teeth')}<br><br>아픈 곳: ${b('My leg hurts.')} 다리가 아파요.`,
        },
        items: [
          { q: '"손 씻어"', opts: ['Wash your hands.', 'Wash hand.', 'Wash the hand your.'], a: 0, why: '소유격 + 복수: your hands' },
          { q: 'My ___ hurt.', ko: '발이 아파요.', opts: ['feet', 'foots', 'feets'], a: 0, why: 'foot의 복수 = feet' },
          { q: '"그녀는 눈이 커요"', opts: ['She has big eyes.', 'She is big eyes.', 'Her eyes big.'], a: 0, why: 'have + 특징: She has big eyes.' },
        ],
        sents: [
          ['Wash your hands.', '손 씻어.'],
          ['She has big eyes.', '그녀는 눈이 커요.'],
          ['My leg hurts.', '다리가 아파요.'],
          ['Open your mouth, please.', '입을 벌려 주세요.'],
          ['My stomach hurts.', '배가 아파요.'],
          ['Close your eyes.', '눈을 감아 봐.'],
        ],
      },
      {
        id: 'u13l2', title: '아파요', en: 'I have a fever.', notes: ['have'],
        words: ['headache', 'stomachache', 'fever', 'cold', 'cough', 'sore_throat', 'hurt', 'runny_nose'],
        tip: {
          title: '증상은 "I have a + 증상"',
          html: `${b('I have a headache.')} 머리가 아파요. · ${b('I have a fever.')} 열이 나요.<br>${b('I have a cold.')} 감기에 걸렸어요. · ${b('I have a sore throat.')} 목이 아파요.<br><br>부위 + ${b('hurts')}: ${b('My back hurts.')} 허리가 아파요.<br><br>'컨디션이 안 좋아요'는 ${b("I don't feel well.")} — condition은 이런 뜻으로 잘 안 써요.`,
        },
        items: [
          { q: '"열이 나요"', opts: ['I have a fever.', 'I am fever.', 'I have fever hot.'], a: 0, why: 'have a + 증상' },
          { q: '"감기에 걸렸어요"', opts: ['I have a cold.', 'I am cold.', 'I have cold.'], a: 0, why: "I'm cold는 '추워요'예요! 감기는 have a cold." },
          { q: 'My head ___.', ko: '머리가 아파요.', opts: ['hurts', 'hurt', 'is hurt'], a: 0, why: 'my head(3인칭 단수) → hurts' },
        ],
        sents: [
          ['I have a headache.', '머리가 아파요.'],
          ['I have a fever and a cough.', '열이 나고 기침을 해요.'],
          ['I have a cold.', '감기에 걸렸어요.'],
          ['I have a sore throat.', '목이 아파요.'],
          ["I don't feel well.", '몸이 좀 안 좋아요.'],
          ['My back hurts.', '허리가 아파요.'],
        ],
      },
      {
        id: 'u13l3', title: '약국·병원', en: 'at the pharmacy',
        words: ['pharmacy', 'medicine', 'pill', 'appointment', 'allergy', 'prescription', 'emergency', 'feel'],
        tip: {
          title: '약은 "먹는" 게 아니라 take',
          html: `약을 먹다 = ${b('take medicine')} (×eat medicine)<br>${b('Take two pills a day.')} 하루에 두 알 드세요.<br><br>💊 ${b('Do I need a prescription?')} 처방전이 필요한가요?<br>${b('I have an allergy to peanuts.')} 땅콩 알레르기가 있어요.<br>🏥 병원 예약은 ${b('appointment')} — 식당·호텔 예약(reservation)과 달라요.<br>🚑 미국 긴급 전화 ${b('nine one one')}`,
        },
        items: [
          { q: '"이 약을 드세요"', opts: ['Take this medicine.', 'Eat this medicine.', 'Drink this medicines.'], a: 0, why: '약을 먹다 = take' },
          { q: '"병원 예약이 있어요"', opts: ['I have a doctor\'s appointment.', 'I have a doctor\'s reservation.', 'I have a hospital promise.'], a: 0, why: '병원·미용실 예약 = appointment' },
          { q: '"속이 안 좋아요"', opts: ["I don't feel well.", "I'm not feel good.", 'I feel not well.'], a: 0, why: "don't feel well = 몸이 안 좋다" },
        ],
        sents: [
          ['Is there a pharmacy near here?', '이 근처에 약국 있어요?'],
          ['I need some cold medicine.', '감기약이 필요해요.'],
          ['Take one pill after meals.', '식후에 한 알 드세요.'],
          ['Do I need a prescription?', '처방전이 필요한가요?'],
          ['I have an allergy to peanuts.', '땅콩 알레르기가 있어요.'],
          ["I'd like to make an appointment.", '진료 예약을 하고 싶어요.'],
        ],
      },
      {
        id: 'u13l4', title: '건강 습관', en: 'I go to the gym.',
        words: ['healthy', 'gym', 'diet', 'weight', 'stress', 'relax', 'jog', 'habit'],
        tip: {
          title: '헬스장은 gym!',
          html: `'헬스장'은 ${b('gym')} — health는 '건강'이에요. ${b('I go to the gym.')} 헬스장에 다녀요.<br>'헬스하다'는 ${b('work out')}.<br><br>살 빼다 ${b('lose weight')} · 살찌다 ${b('gain weight')}<br>${b("I'm on a diet.")} 다이어트 중이에요.<br><br>얼마나 자주? ${b('three times a week')} 일주일에 세 번 · ${b('once a day')} 하루에 한 번`,
        },
        items: [
          { q: '"헬스장에 가요"', opts: ['I go to the gym.', 'I go to the health.', 'I go health club.'], a: 0, why: '헬스장 = gym' },
          { q: '"살을 빼고 싶어요"', opts: ['I want to lose weight.', 'I want to lose my fat weight.', 'I want to diet weight.'], a: 0, why: '살을 빼다 = lose weight' },
          { q: '"일주일에 세 번"', opts: ['three times a week', 'three week a time', 'three times in week'], a: 0, why: '횟수 + a + 기간: three times a week' },
        ],
        sents: [
          ['I go to the gym three times a week.', '저는 일주일에 세 번 헬스장에 가요.'],
          ['I want to lose weight.', '살을 빼고 싶어요.'],
          ["I'm on a diet.", '다이어트 중이에요.'],
          ['Eat healthy food.', '건강한 음식을 먹어요.'],
          ['I jog in the park every morning.', '저는 매일 아침 공원에서 조깅해요.'],
          ['Music helps me relax.', '음악은 긴장을 푸는 데 도움이 돼요.'],
        ],
      },
    ],
  },
  {
    id: 'u14', no: 14, title: '비교와 묘사', en: 'bigger, the biggest', color: '#e2700c', notes: ['comparative', 'superlative'],
    desc: '비교급 -er·more, 최상급 -est·most, 사람 묘사',
    lessons: [
      {
        id: 'u14l1', title: '비교급', en: 'taller than', notes: ['comparative'],
        words: ['big', 'small', 'tall', 'short', 'old', 'young', 'long', 'fast'],
        tip: {
          title: '짧은 형용사 + er + than',
          html: `'~보다 더 …하다' = 형용사-${b('er')} + ${b('than')}<br>${b("I'm taller than my brother.")} 저는 형보다 키가 커요.<br><br>철자: ${b('big')} → ${b('bigger')}(자음 겹치기) · ${b('nice')} → ${b('nicer')} · ${b('easy')} → ${b('easier')}<br><br>한국어는 '형<b>보다</b>'가 앞에 오지만, 영어는 비교 대상(than ~)이 맨 뒤에 와요.`,
        },
        items: [
          { q: 'My brother is ___ than me.', ko: '형은 저보다 키가 커요.', opts: ['taller', 'more tall', 'tallest'], a: 0, why: '짧은 형용사 → -er' },
          { q: 'This bag is ___ than that one.', ko: '이 가방이 저것보다 커요.', opts: ['bigger', 'biger', 'more big'], a: 0, why: 'big → bigger (g를 겹쳐요)' },
          { q: '"지하철이 버스보다 빨라요"', opts: ['The subway is faster than the bus.', 'The subway is fast than the bus.', 'The subway faster is the bus.'], a: 0, why: '형용사-er + than' },
        ],
        sents: [
          ["I'm taller than my brother.", '저는 형보다 키가 커요.'],
          ['The subway is faster than the bus.', '지하철이 버스보다 빨라요.'],
          ['My sister is younger than me.', '여동생은 저보다 어려요.'],
          ['This room is smaller.', '이 방이 더 작아요.'],
          ['Summer days are longer.', '여름엔 낮이 더 길어요.'],
          ['He is older than he looks.', '그는 보기보다 나이가 많아요.'],
        ],
      },
      {
        id: 'u14l2', title: 'more + 긴 형용사', en: 'more beautiful', notes: ['comparative'],
        words: ['beautiful', 'important', 'popular', 'difficult', 'easy', 'comfortable', 'convenient', 'crowded'],
        tip: {
          title: '긴 형용사는 more',
          html: `2음절 이상 긴 형용사는 앞에 ${b('more')}:<br>${b('more beautiful')} · ${b('more important')} · ${b('more expensive')}<br><br>-y로 끝나는 2음절은 -ier: ${b('easy')} → ${b('easier')}, ${b('busy')} → ${b('busier')}<br><br>⚠️ 두 가지를 섞지 마세요: ×more easier · ×beautifuller`,
        },
        items: [
          { q: 'This book is ___ than that one.', ko: '이 책이 저 책보다 더 흥미로워요.', opts: ['more interesting', 'interestinger', 'more interestinger'], a: 0, why: '긴 형용사 → more + 원형' },
          { q: 'English is ___ than math for me.', ko: '저한테는 영어가 수학보다 쉬워요.', opts: ['easier', 'more easy', 'easyer'], a: 0, why: '자음 + y → -ier' },
          { q: '"택시가 더 편해요"', opts: ['A taxi is more comfortable.', 'A taxi is comfortabler.', 'A taxi is most comfortable more.'], a: 0, why: 'comfortable(긴 형용사) → more comfortable' },
        ],
        sents: [
          ['Health is more important than money.', '건강이 돈보다 더 중요해요.'],
          ['This dress is more beautiful.', '이 원피스가 더 예뻐요.'],
          ['English is easier than I thought.', '영어가 생각보다 쉬워요.'],
          ['The subway is more convenient.', '지하철이 더 편리해요.'],
          ['Seoul is more crowded than Busan.', '서울은 부산보다 더 붐벼요.'],
          ['This question is more difficult.', '이 문제가 더 어려워요.'],
        ],
      },
      {
        id: 'u14l3', title: '최상급', en: 'the best', notes: ['superlative'],
        words: ['good', 'bad', 'best', 'worst', 'favorite', 'than', 'most', 'in_the_world'],
        tip: {
          title: 'the + -est / the most',
          html: `'가장 ~한' = ${b('the')} + 형용사-${b('est')} / ${b('the most')} + 긴 형용사<br>${b('the tallest')} · ${b('the most popular')}<br><br>불규칙은 꼭 외워요:<br>${b('good')} – ${b('better')} – ${b('best')} · ${b('bad')} – ${b('worse')} – ${b('worst')}<br><br>범위는 뒤에: ${b('in the world')} · ${b('in my class')}<br>💡 ${b('favorite')}은 그 자체가 '가장 좋아하는' — most를 붙이지 않아요.`,
        },
        items: [
          { q: 'This is ___ pizza in town.', ko: '이게 이 동네 최고의 피자예요.', opts: ['the best', 'the goodest', 'the most good'], a: 0, why: 'good – better – best (불규칙)' },
          { q: 'It was ___ day of my life.', ko: '내 인생 최악의 날이었어요.', opts: ['the worst', 'the baddest', 'the most bad'], a: 0, why: 'bad – worse – worst' },
          { q: '"가장 좋아하는 음식이 뭐예요?"', opts: ["What's your favorite food?", "What's your most favorite food?", 'What food you like most is?'], a: 0, why: 'favorite = 가장 좋아하는 (most ×)' },
        ],
        sents: [
          ['This is the best pizza in town.', '이게 이 동네 최고의 피자예요.'],
          ["What's your favorite food?", '가장 좋아하는 음식이 뭐예요?'],
          ['It was the worst movie ever.', '그건 최악의 영화였어요.'],
          ['She is the most popular student.', '그녀는 가장 인기 있는 학생이에요.'],
          ["It's the tallest building in the world.", '세계에서 가장 높은 건물이에요.'],
          ['Your English is better than mine.', '당신 영어가 제 영어보다 나아요.'],
        ],
      },
      {
        id: 'u14l4', title: '사람 묘사', en: "She's tall with long hair.",
        words: ['hair', 'glasses', 'curly', 'kind', 'funny', 'smart', 'shy', 'friendly'],
        tip: {
          title: '외모는 be · have, 성격은 be',
          html: `키·체형: ${b('She is tall.')} · 머리·눈: ${b('She has long hair.')}<br>안경: ${b('He wears glasses.')}<br>성격: ${b('He is kind and funny.')}<br><br>'어떤 사람이야?'는 ${b("What's he like?")} — '그는 뭘 좋아해?'(What does he like?)와 헷갈리지 마세요!<br>⚠️ ${b('hair')}는 셀 수 없어요: ×She has long hairs.`,
        },
        items: [
          { q: '"그녀는 머리가 길어요"', opts: ['She has long hair.', 'She has long hairs.', 'She is long hair.'], a: 0, why: 'have + 머리 특징, hair는 셀 수 없음' },
          { q: '"그는 어떤 사람이야?"', opts: ["What's he like?", 'What does he like?', 'How is he like?'], a: 0, why: "What's he like? = 성격·외모를 물을 때" },
          { q: '"그는 안경을 써요"', opts: ['He wears glasses.', 'He puts glasses.', 'He wears a glass.'], a: 0, why: '안경을 쓰다 = wear glasses (늘 복수)' },
        ],
        sents: [
          ['She is tall with long hair.', '그녀는 키가 크고 머리가 길어요.'],
          ['He wears glasses.', '그는 안경을 써요.'],
          ['My teacher is kind and funny.', '우리 선생님은 친절하고 재미있어요.'],
          ["What's your boyfriend like?", '남자친구는 어떤 사람이에요?'],
          ['She is smart but a little shy.', '그녀는 똑똑하지만 조금 수줍어해요.'],
          ['Everyone here is very friendly.', '여기 사람들은 모두 정말 친절해요.'],
        ],
      },
    ],
  },
  {
    id: 'u15', no: 15, title: '경험과 문장 잇기', en: 'Have you ever…?', color: '#0f766e', notes: ['perfect', 'conjunctions', 'if_when', 'relative'],
    desc: '현재완료 have p.p., 접속사, if·when 절, 관계사 who·that',
    lessons: [
      {
        id: 'u15l1', title: '경험 말하기', en: 'Have you ever been to…?', notes: ['perfect'],
        words: ['ever', 'before', 'once', 'twice', 'already', 'yet', 'just', 'experience'],
        tip: {
          title: 'have + 과거분사 = ~해 본 적 있다',
          html: `경험: ${b('Have you ever tried kimchi?')} 김치 먹어 본 적 있어요?<br>→ ${b('Yes, I have.')} / ${b("No, I haven't.")} / ${b("I've never tried it.")}<br><br>'가 본 적 있다'는 gone이 아니라 ${b('been')}: ${b("I've been to Japan twice.")}<br><br>완료: ${b("I've already eaten.")} 벌써 먹었어요. · ${b("I haven't finished yet.")} 아직 못 끝냈어요.`,
        },
        items: [
          { q: 'Have you ever ___ to Japan?', ko: '일본에 가 본 적 있어요?', opts: ['been', 'went', 'go'], a: 0, why: '가 본 적 = have been to' },
          { q: '"Have you ever tried kimchi?" — "아니요."', opts: ["No, I haven't.", "No, I didn't.", "No, I don't."], a: 0, why: 'have로 물으면 have로 답해요' },
          { q: "I haven't finished ___.", ko: '아직 다 못 끝냈어요.', opts: ['yet', 'already', 'ever'], a: 0, why: '부정문의 "아직" = yet' },
        ],
        sents: [
          ['Have you ever been to Jeju?', '제주에 가 본 적 있어요?'],
          ["I've been to Japan twice.", '일본에 두 번 가 봤어요.'],
          ["I've never tried it.", '한 번도 안 먹어 봤어요.'],
          ["I've already eaten.", '벌써 먹었어요.'],
          ["I haven't finished yet.", '아직 다 못 끝냈어요.'],
          ['It was a great experience.', '정말 좋은 경험이었어요.'],
        ],
      },
      {
        id: 'u15l2', title: '접속사', en: 'and, but, so, because', notes: ['conjunctions'],
        words: ['and', 'but', 'so', 'because', 'or', 'also', 'then', 'after'],
        tip: {
          title: '문장을 이어 길게 말하기',
          html: `${b('and')} 그리고 · ${b('but')} 하지만 · ${b('or')} 또는<br>${b('so')} 그래서(결과) · ${b('because')} 왜냐하면(이유)<br><br>${b("I was tired, so I went to bed early.")} 피곤해서 일찍 잤어요.<br>${b("I went to bed early because I was tired.")} 피곤했기 때문에 일찍 잤어요.<br><br>한국어 '-아서'는 영어에서 so나 because로 나눠 말해요.`,
        },
        items: [
          { q: 'It was raining, ___ I took a taxi.', ko: '비가 와서 택시를 탔어요.', opts: ['so', 'because', 'but'], a: 0, why: '결과 → so' },
          { q: "I'm happy ___ it's Friday.", ko: '금요일이라서 기분 좋아요.', opts: ['because', 'so', 'or'], a: 0, why: '이유 → because' },
          { q: 'The hotel was old ___ clean.', ko: '호텔은 낡았지만 깨끗했어요.', opts: ['but', 'and', 'so'], a: 0, why: '반대되는 내용 → but' },
        ],
        sents: [
          ['I like cats and dogs.', '저는 고양이와 개를 좋아해요.'],
          ['It was cheap but delicious.', '싸지만 맛있었어요.'],
          ['I was tired, so I went home.', '피곤해서 집에 갔어요.'],
          ["I'm late because of the traffic.", '차가 막혀서 늦었어요.'],
          ['Coffee or tea?', '커피 드릴까요, 차 드릴까요?'],
          ['First we had dinner, then we watched a movie.', '먼저 저녁을 먹고 그다음에 영화를 봤어요.'],
        ],
      },
      {
        id: 'u15l3', title: '만약에·~할 때', en: 'If it rains…', notes: ['if_when'],
        words: ['if', 'when', 'while', 'until', 'umbrella', 'traffic', 'hurry', 'miss'],
        tip: {
          title: 'if·when 절은 미래라도 현재형',
          html: `${b('If it rains, I will stay home.')} 비가 오면 집에 있을 거예요.<br>${b('Call me when you arrive.')} 도착하면 전화해.<br><br>⚠️ if·when 뒤에는 미래 일이라도 <b>현재형</b>: ×If it will rain<br><br>${b('while')} ~하는 동안 · ${b('until')} ~할 때까지<br>${b("Hurry, or we'll miss the bus!")} 서둘러, 안 그러면 버스 놓쳐!`,
        },
        items: [
          { q: 'If it ___ tomorrow, we will stay home.', ko: '내일 비가 오면 우리는 집에 있을 거예요.', opts: ['rains', 'will rain', 'rained'], a: 0, why: 'if 절은 미래라도 현재형' },
          { q: 'Call me when you ___.', ko: '도착하면 전화해.', opts: ['arrive', 'will arrive', 'arrived'], a: 0, why: 'when 절도 현재형' },
          { q: 'Wait here ___ I come back.', ko: '내가 돌아올 때까지 여기서 기다려.', opts: ['until', 'while', 'if'], a: 0, why: '~할 때까지 = until' },
        ],
        sents: [
          ['If it rains, take an umbrella.', '비가 오면 우산을 가져가요.'],
          ['Call me when you get home.', '집에 도착하면 전화해.'],
          ['I listen to music while I work.', '저는 일하는 동안 음악을 들어요.'],
          ['Wait here until I come back.', '내가 돌아올 때까지 여기서 기다려.'],
          ["Hurry, or we'll miss the train!", '서둘러, 안 그러면 기차 놓쳐!'],
          ['If you are tired, go to bed early.', '피곤하면 일찍 자요.'],
        ],
      },
      {
        id: 'u15l4', title: '꾸며 주는 문장', en: 'a friend who lives in Seoul', notes: ['relative'],
        words: ['who', 'which', 'someone', 'something', 'person', 'thing', 'place', 'everyone'],
        tip: {
          title: '꾸미는 말이 뒤에 오는 영어',
          html: `한국어는 꾸미는 말이 앞(<b>서울에 사는</b> 친구), 영어는 뒤(a friend <b>who lives in Seoul</b>)!<br><br>사람 + ${b('who')}: ${b('I have a friend who lives in Seoul.')}<br>사물 + ${b('that')}/${b('which')}: ${b('This is the book that I bought.')}<br><br>순서를 바꿔 생각하는 연습: '내가 산 책' → the book + I bought`,
        },
        items: [
          { q: 'I have a friend ___ speaks Japanese.', ko: '저는 일본어를 하는 친구가 있어요.', opts: ['who', 'which', 'what'], a: 0, why: '사람을 꾸밀 때 who' },
          { q: 'This is the phone ___ I bought yesterday.', ko: '이게 어제 산 휴대폰이에요.', opts: ['that', 'who', 'where'], a: 0, why: '사물 → that / which' },
          { q: '"내가 좋아하는 노래"', opts: ['the song that I like', 'the I like song', 'I like the song that'], a: 0, why: '명사 + that + 주어 + 동사 (꾸미는 말이 뒤로)' },
        ],
        sents: [
          ['I have a friend who lives in Seoul.', '저는 서울에 사는 친구가 있어요.'],
          ['This is the book that I bought.', '이게 제가 산 책이에요.'],
          ['She is someone who helps everyone.', '그녀는 모두를 돕는 사람이에요.'],
          ['I want something that is cheap.', '싼 걸로 원해요.'],
          ['This is a place that I love.', '여기가 제가 정말 좋아하는 곳이에요.'],
          ['He is the person who called me.', '그가 저에게 전화한 사람이에요.'],
        ],
      },
    ],
  },
];
