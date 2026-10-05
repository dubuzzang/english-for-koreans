// 6~10단원: 일상(현재형) · 지금 하는 일(진행형) · 시간과 날짜 · 이동과 여행 · 과거
const b = (s) => `<b class="en">${s}</b>`;

export const UNITS2 = [
  {
    id: 'u6', no: 6, title: '나의 하루', en: 'My daily life', color: '#0e9f9a', notes: ['present', 'do_does', 'frequency'],
    desc: '현재형과 3인칭 -s, do·does 질문과 부정, 좋아하는 것, 빈도부사',
    lessons: [
      {
        id: 'u6l1', title: '하루 일과', en: 'I get up at seven.', notes: ['present'],
        words: ['get_up', 'wake_up', 'eat', 'go', 'work', 'study', 'sleep', 'every_day'],
        tip: {
          title: '습관은 현재형, he·she는 -s',
          html: `늘 하는 일·습관은 <b>현재형</b>: ${b('I work.')} ${b('I study English.')}<br><br>주어가 he·she·it(3인칭 단수)이면 동사에 <b>-s</b>!<br>${b('She works.')} · ${b('He goes.')} · ${b('She studies.')}(y → ies)<br><br>한국어엔 없는 규칙이라 원어민과 대화할 때 가장 많이 빠뜨려요. 'he·she면 -s' 주문처럼 외워요!`,
        },
        items: [
          { q: 'She ___ up at seven.', ko: '그녀는 7시에 일어나요.', opts: ['gets', 'get', 'getting'], a: 0, why: 'she → 동사 + s: gets up' },
          { q: 'I ___ to school every day.', ko: '저는 매일 학교에 가요.', opts: ['go', 'goes', 'going'], a: 0, why: 'I → 동사원형 그대로' },
          { q: 'He ___ English.', ko: '그는 영어를 공부해요.', opts: ['studies', 'studys', 'study'], a: 0, why: '자음 + y로 끝나면 y → ies' },
        ],
        sents: [
          ['I get up at seven.', '저는 7시에 일어나요.'],
          ['I go to work every day.', '저는 매일 출근해요.'],
          ['She studies English.', '그녀는 영어를 공부해요.'],
          ['He sleeps at eleven.', '그는 11시에 자요.'],
          ['We eat breakfast together.', '우리는 아침을 같이 먹어요.'],
          ['My dad works in Seoul.', '아빠는 서울에서 일하세요.'],
        ],
      },
      {
        id: 'u6l2', title: '좋아하는 것', en: 'I like music.',
        words: ['like', 'love', 'hate', 'want', 'need', 'music', 'movie', 'sport'],
        tip: {
          title: 'like + 명사 / like + -ing',
          html: `${b('I like music.')} 음악을 좋아해요.<br>${b('I like swimming.')} 수영하는 걸 좋아해요. (동사는 -ing로)<br><br>좋아하는 정도: ${b('love')} 정말 좋아해 > ${b('like')} 좋아해 > ${b("don't like")} 안 좋아해 > ${b('hate')} 싫어해<br><br>질문 ${b('Do you like movies?')} → ${b('Yes, I do.')} / ${b("No, I don't.")}`,
        },
        items: [
          { q: 'She ___ music.', ko: '그녀는 음악을 좋아해요.', opts: ['likes', 'like', 'liking'], a: 0, why: 'she → likes' },
          { q: '"영화 좋아해요?"', opts: ['Do you like movies?', 'Are you like movies?', 'You like movies do?'], a: 0, why: '일반동사 질문: Do + 주어 + 동사원형' },
          { q: '"Do you like coffee?" — "아니요."', opts: ["No, I don't.", "No, I'm not.", 'No, I like not.'], a: 0, why: 'Do로 물으면 do로 답해요: No, I don\'t.' },
        ],
        sents: [
          ['I like music.', '저는 음악을 좋아해요.'],
          ['Do you like movies?', '영화 좋아해요?'],
          ['Yes, I do.', '네, 좋아해요.'],
          ["She doesn't like coffee.", '그녀는 커피를 안 좋아해요.'],
          ['I love K-pop.', '저는 케이팝을 정말 좋아해요.'],
          ['I need a new phone.', '새 휴대폰이 필요해요.'],
        ],
      },
      {
        id: 'u6l3', title: 'do·does 질문', en: 'Do you…?', notes: ['do_does'],
        words: ['live', 'speak', 'know', 'cook', 'drive', 'read', 'understand', 'remember'],
        tip: {
          title: '질문은 Do/Does, 부정은 don\'t/doesn\'t',
          html: `일반동사 질문은 앞에 ${b('Do')} — he·she·it이면 ${b('Does')}!<br>${b('Do you live here?')} · ${b('Does he speak Korean?')}<br><br>Does·doesn't 뒤에는 <b>동사원형</b> (-s는 does가 가져갔어요)<br>${b("He doesn't drive.")} (×He doesn't drives)<br><br>의문사는 맨 앞에: ${b('Where do you live?')}`,
        },
        items: [
          { q: '___ she speak English?', ko: '그녀는 영어를 하나요?', opts: ['Does', 'Do', 'Is'], a: 0, why: 'she → Does' },
          { q: "He doesn't ___ meat.", ko: '그는 고기를 안 먹어요.', opts: ['eat', 'eats', 'eating'], a: 0, why: "doesn't 뒤엔 동사원형" },
          { q: '"어디 사세요?"', opts: ['Where do you live?', 'Where you live?', 'Where are you live?'], a: 0, why: '의문사 + do + 주어 + 동사원형' },
        ],
        sents: [
          ['Where do you live?', '어디 사세요?'],
          ['I live in Seoul.', '저는 서울에 살아요.'],
          ['Does he speak Korean?', '그는 한국어를 하나요?'],
          ["He doesn't drive.", '그는 운전을 안 해요.'],
          ['Do you know her?', '그녀를 알아요?'],
          ['I read books on the subway.', '저는 지하철에서 책을 읽어요.'],
        ],
      },
      {
        id: 'u6l4', title: '얼마나 자주', en: 'always, usually…', notes: ['frequency'],
        words: ['always', 'usually', 'often', 'sometimes', 'never', 'weekend', 'morning', 'night'],
        tip: {
          title: '빈도부사의 자리',
          html: `${b('always')} 100% > ${b('usually')} > ${b('often')} > ${b('sometimes')} > ${b('never')} 0%<br><br>자리: <b>일반동사 앞, be동사 뒤</b><br>${b('I always walk to work.')} 저는 항상 걸어서 출근해요.<br>${b("She's never late.")} 그녀는 절대 늦지 않아요.<br><br>never는 그 자체가 부정이라 not을 또 쓰지 않아요.`,
        },
        items: [
          { q: '"저는 항상 걸어서 출근해요"', opts: ['I always walk to work.', 'I walk always to work.', 'Always I walk to work.'], a: 0, why: '빈도부사는 일반동사 앞' },
          { q: '"그녀는 절대 늦지 않아요"', opts: ['She is never late.', 'She never is late.', "She isn't never late."], a: 0, why: 'be동사 뒤 + never(그 자체가 부정)' },
          { q: '"How often do you exercise?" — "주말마다요."', opts: ['Every weekend.', 'In weekend every.', 'Weekends all.'], a: 0, why: 'every + 단수: every weekend, every day' },
        ],
        sents: [
          ['I always drink coffee in the morning.', '저는 아침에 항상 커피를 마셔요.'],
          ['She usually walks to work.', '그녀는 보통 걸어서 출근해요.'],
          ['We sometimes eat out.', '우리는 가끔 외식해요.'],
          ['He is never late.', '그는 절대 늦지 않아요.'],
          ['What do you do on weekends?', '주말에 뭐 해요?'],
          ['I often watch movies at night.', '저는 밤에 영화를 자주 봐요.'],
        ],
      },
    ],
  },
  {
    id: 'u7', no: 7, title: '지금 하는 일', en: 'What are you doing?', color: '#2b72e8', notes: ['progressive', 'ing'],
    desc: '현재진행 be + -ing, -ing 철자, 전화 통화, 현재형과 진행형',
    lessons: [
      {
        id: 'u7l1', title: '지금 뭐 해요?', en: "I'm watching TV.", notes: ['progressive'],
        words: ['now', 'watch', 'listen_to', 'wait_for', 'call', 'play', 'write', 'text'],
        tip: {
          title: 'be + -ing = ~하고 있다',
          html: `지금 하고 있는 일은 <b>be동사 + 동사-ing</b>: 한국어 '-고 있다'와 똑같아요.<br>${b("I'm watching TV.")} TV 보고 있어요.<br>${b("She's listening to music.")} 그녀는 음악을 듣고 있어요.<br><br>질문: ${b('What are you doing?')} 뭐 하고 있어요?<br>⚠️ be동사를 빠뜨리지 마세요: ×I watching TV.`,
        },
        items: [
          { q: 'I ___ TV now.', ko: '지금 TV 보고 있어요.', opts: ['am watching', 'watching', 'am watch'], a: 0, why: 'be(am) + watching' },
          { q: '"뭐 하고 있어요?"', opts: ['What are you doing?', 'What do you doing?', 'What you are doing?'], a: 0, why: '의문사 + be + 주어 + -ing' },
          { q: 'She ___ for the bus.', ko: '그녀는 버스를 기다리고 있어요.', opts: ['is waiting', 'waits now', 'are waiting'], a: 0, why: 'she → is + waiting' },
        ],
        sents: [
          ['What are you doing?', '뭐 하고 있어요?'],
          ["I'm watching TV.", 'TV 보고 있어요.'],
          ["She's listening to music.", '그녀는 음악을 듣고 있어요.'],
          ["We're waiting for the bus.", '우리는 버스를 기다리고 있어요.'],
          ['He is calling his mom.', '그는 엄마에게 전화하고 있어요.'],
          ['The kids are playing outside.', '아이들이 밖에서 놀고 있어요.'],
        ],
      },
      {
        id: 'u7l2', title: '-ing 만들기', en: 'running, making', notes: ['ing'],
        words: ['run', 'swim', 'sit', 'make', 'take', 'come', 'dance', 'shop'],
        tip: {
          title: '-ing 철자 규칙 세 가지',
          html: `① 대부분: + ing → ${b('playing')}, ${b('reading')}<br>② e로 끝나면 e를 빼고: ${b('make')} → ${b('making')}, ${b('come')} → ${b('coming')}<br>③ 짧은 모음 + 자음 하나로 끝나면 자음을 한 번 더: ${b('run')} → ${b('running')}, ${b('swim')} → ${b('swimming')}, ${b('shop')} → ${b('shopping')}<br><br>+ ie → ying: ${b('lie')} → ${b('lying')}`,
        },
        items: [
          { q: 'He is ___.', ko: '그는 달리고 있어요.', opts: ['running', 'runing', 'runnning'], a: 0, why: 'run(짧은 모음 u + 자음 n) → n을 한 번 더: running' },
          { q: "I'm ___ dinner.", ko: '저녁을 만들고 있어요.', opts: ['making', 'makeing', 'makking'], a: 0, why: 'e로 끝나면 e를 빼고 -ing' },
          { q: 'They are ___ in the pool.', ko: '그들은 수영장에서 수영하고 있어요.', opts: ['swimming', 'swiming', 'swimmming'], a: 0, why: 'swim → swimming (m을 겹쳐요)' },
        ],
        sents: [
          ["He's running in the park.", '그는 공원에서 달리고 있어요.'],
          ["I'm making dinner.", '저녁을 만들고 있어요.'],
          ['They are swimming.', '그들은 수영하고 있어요.'],
          ['Are you coming?', '오고 있어요?'],
          ["I'm taking a photo.", '사진을 찍고 있어요.'],
          ["We're shopping at the mall.", '우리는 쇼핑몰에서 쇼핑하고 있어요.'],
        ],
      },
      {
        id: 'u7l3', title: '전화 통화', en: 'Can you talk now?',
        words: ['busy', 'free', 'talk', 'hear', 'later', 'moment', 'again', 'call_back'],
        tip: {
          title: '전화에서는 "This is…"',
          html: `전화로 자기를 밝힐 때는 I'm 대신 ${b('This is')}: ${b('Hi, this is Mina.')} 안녕하세요, 미나예요.<br><br>${b('Can you talk now?')} 지금 통화 괜찮아요?<br>${b("Sorry, I'm busy right now.")} 미안, 지금 바빠.<br>${b("I'll call you back.")} 다시 전화할게요.<br>${b("I can't hear you.")} 잘 안 들려요.`,
        },
        items: [
          { q: '전화에서 "저 지수예요"', opts: ['Hi, this is Jisu.', 'Hi, I am Jisu here.', 'Hi, Jisu is me.'], a: 0, why: '전화에서는 This is + 이름' },
          { q: '"지금 바빠요"', opts: ["I'm busy right now.", "I'm busying now.", 'I busy now.'], a: 0, why: 'busy는 형용사 → be동사 + busy' },
          { q: '"다시 전화할게요"', opts: ["I'll call you back.", "I'll back call you.", 'I call you again back.'], a: 0, why: 'call + 사람 + back' },
        ],
        sents: [
          ['Hello, this is Mina.', '여보세요, 미나예요.'],
          ['Can you talk now?', '지금 통화 괜찮아요?'],
          ["Sorry, I'm busy right now.", '미안, 지금 바빠.'],
          ["I'll call you back later.", '나중에 다시 전화할게요.'],
          ["I can't hear you.", '잘 안 들려요.'],
          ['Just a moment, please.', '잠깐만 기다려 주세요.'],
        ],
      },
      {
        id: 'u7l4', title: '현재형 vs 진행형', en: 'I work / I\'m working',
        words: ['today', 'these_days', 'tonight', 'teach', 'learn', 'rain', 'snow', 'stay'],
        tip: {
          title: '늘 하는 일 vs 지금·요즘 하는 일',
          html: `현재형 = 늘·습관: ${b('She teaches English.')} (직업이 영어 선생님)<br>진행형 = 지금·요즘: ${b("I'm learning Spanish these days.")}<br><br>한국어는 둘 다 '-요'로 말할 때가 많아서 헷갈려요.<br><br>⚠️ know·like·want 같은 <b>상태</b> 동사는 진행형으로 잘 안 써요: ${b('I know him.')} (×I'm knowing)<br>날씨: ${b("It's raining now.")} · ${b('It snows a lot in winter.')}`,
        },
        items: [
          { q: '"요즘 영어를 배우고 있어요"', opts: ["I'm learning English these days.", 'I learning English these days.', 'I am learn English these days.'], a: 0, why: '요즘 하는 일 → be + -ing' },
          { q: 'It ___ now.', ko: '지금 비가 오고 있어요.', opts: ['is raining', 'rains', 'raining'], a: 0, why: '지금 → is raining' },
          { q: '"그를 알아요"', opts: ['I know him.', "I'm knowing him.", 'I am know him.'], a: 0, why: 'know는 상태 동사 — 진행형 ×' },
        ],
        sents: [
          ["It's raining now.", '지금 비가 와요.'],
          ['It snows a lot in winter.', '겨울엔 눈이 많이 와요.'],
          ["I'm staying home today.", '오늘은 집에 있어요.'],
          ['She teaches English.', '그녀는 영어를 가르쳐요.'],
          ["I'm learning Spanish these days.", '요즘 스페인어를 배우고 있어요.'],
          ['What are you doing tonight?', '오늘 밤에 뭐 해요?'],
        ],
      },
    ],
  },
  {
    id: 'u8', no: 8, title: '시간과 날짜', en: 'What time is it?', color: '#a16207', notes: ['time', 'prep_time'],
    desc: '시각 읽기, 요일·월·날짜, 시간 전치사 at·on·in',
    lessons: [
      {
        id: 'u8l1', title: '몇 시예요?', en: 'What time is it?', notes: ['time'],
        words: ['what_time', 'oclock', 'half', 'quarter', 'minute', 'hour', 'a_m', 'p_m'],
        tip: {
          title: '시각은 숫자 그대로 읽으면 OK',
          html: `${b('What time is it?')} 몇 시예요? → ${b("It's three o'clock.")} 3시예요.<br><br>요즘 가장 흔한 방법은 숫자를 그대로: 3:15 ${b('three fifteen')} · 3:30 ${b('three thirty')} · 3:45 ${b('three forty-five')}<br><br>전통 방식도 알아 두세요: ${b('a quarter past three')}(3시 15분) · ${b('half past three')}(3시 반) · ${b('a quarter to four')}(4시 15분 전)<br>오전 ${b('a.m.')} · 오후 ${b('p.m.')}는 숫자 뒤에: 9 a.m.`,
        },
        items: [
          { q: '3:30', opts: ['three thirty', 'thirty three', 'three and thirty'], a: 0, why: '시 + 분 순서로: three thirty' },
          { q: '"몇 시예요?"', opts: ['What time is it?', 'What time is now?', 'How time is it?'], a: 0, why: '시간·날씨의 주어는 it: What time is it?' },
          { q: '7:00', opts: ["seven o'clock", 'seven hour', 'seven clock'], a: 0, why: "정각은 o'clock" },
        ],
        sents: [
          ['What time is it?', '몇 시예요?'],
          ["It's three o'clock.", '3시예요.'],
          ["It's half past six.", '6시 반이에요.'],
          ["It's a quarter to nine.", '9시 15분 전이에요.'],
          ['I have ten minutes.', '10분 있어요.'],
          ['The movie is two hours long.', '영화는 두 시간짜리예요.'],
        ],
      },
      {
        id: 'u8l2', title: '요일', en: 'Monday, Tuesday…', notes: ['prep_time'],
        words: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'week'],
        tip: {
          title: '요일 앞에는 on',
          html: `요일은 항상 <b>대문자</b>, 앞에는 ${b('on')}: ${b('on Monday')} 월요일에<br>'월요일마다'는 복수로: ${b('on Mondays')}<br><br>🔤 ${b('Wednesday')}는 가운데 d를 읽지 않아요: [웬즈데이]<br><br>${b('What day is it today?')} 오늘 무슨 요일이에요? → ${b("It's Friday!")}`,
        },
        items: [
          { q: '"월요일에"', opts: ['on Monday', 'in Monday', 'at Monday'], a: 0, why: '요일 앞은 on' },
          { q: '"오늘 무슨 요일이에요?"', opts: ['What day is it today?', 'What date is today day?', 'Which day today?'], a: 0, why: 'What day = 무슨 요일 (What date = 며칠)' },
          { q: '수요일 철자', opts: ['Wednesday', 'Wensday', 'Wednsday'], a: 0, why: 'Wed-nes-day — 쓸 때는 d가 있어요!' },
        ],
        sents: [
          ['What day is it today?', '오늘 무슨 요일이에요?'],
          ["It's Friday!", '금요일이에요!'],
          ['See you on Monday.', '월요일에 봐요.'],
          ['I work from Monday to Friday.', '월요일부터 금요일까지 일해요.'],
          ['I play tennis on Saturdays.', '토요일마다 테니스를 쳐요.'],
          ['Have a nice weekend!', '주말 잘 보내요!'],
        ],
      },
      {
        id: 'u8l3', title: '월과 날짜', en: 'in May',
        words: ['january', 'march', 'may', 'july', 'september', 'december', 'month', 'birthday'],
        tip: {
          title: '월 앞에는 in, 날짜는 서수',
          html: `월 앞에는 ${b('in')}: ${b('in May')} · 날짜 앞에는 ${b('on')}: ${b('on May fifth')}<br><br>날짜는 서수로 읽어요: ${b('first')} ${b('second')} ${b('third')} ${b('fourth')}… → March 1 = ${b('March first')}<br><br>📅 미국식 숫자 날짜는 <b>월/일/연</b>: 5/3 = 5월 3일 (영국은 일/월)<br>${b('When is your birthday?')} 생일이 언제예요?`,
        },
        items: [
          { q: '"5월에"', opts: ['in May', 'on May', 'at May'], a: 0, why: '월 앞은 in' },
          { q: '3월 1일 읽기', opts: ['March first', 'March one', 'March oneth'], a: 0, why: '날짜는 서수: first, second, third…' },
          { q: '"생일이 언제예요?"', opts: ['When is your birthday?', 'When your birthday is?', 'What is your birthday day?'], a: 0, why: 'When + be동사 + 주어?' },
        ],
        sents: [
          ['When is your birthday?', '생일이 언제예요?'],
          ['My birthday is in May.', '제 생일은 5월이에요.'],
          ["It's on July fourth.", '7월 4일이에요.'],
          ['School starts in March.', '학교는 3월에 시작해요.'],
          ['It snows in December.', '12월에 눈이 와요.'],
          ['Happy birthday!', '생일 축하해요!'],
        ],
      },
      {
        id: 'u8l4', title: '하루의 때', en: 'in the morning', notes: ['prep_time'],
        words: ['yesterday', 'tomorrow', 'afternoon', 'evening', 'early', 'late', 'soon', 'ago'],
        tip: {
          title: 'in the morning, at night',
          html: `${b('in the morning')} 아침에 · ${b('in the afternoon')} 오후에 · ${b('in the evening')} 저녁에 · 밤에는 ${b('at night')}!<br><br>${b('yesterday')} ${b('today')} ${b('tomorrow')} 앞에는 전치사를 쓰지 않아요 (×on tomorrow).<br><br>'~ 전에'는 기간 뒤에 ${b('ago')}: ${b('two days ago')} 이틀 전에`,
        },
        items: [
          { q: '"밤에"', opts: ['at night', 'in night', 'on night'], a: 0, why: '밤에 = at night' },
          { q: '"내일 봐요"', opts: ['See you tomorrow.', 'See you on tomorrow.', 'See you at tomorrow.'], a: 0, why: 'tomorrow 앞엔 전치사 ×' },
          { q: '"사흘 전에"', opts: ['three days ago', 'ago three days', 'before three days'], a: 0, why: '기간 + ago' },
        ],
        sents: [
          ['I study in the morning.', '저는 아침에 공부해요.'],
          ['See you tomorrow!', '내일 봐요!'],
          ['I was busy yesterday.', '어제는 바빴어요.'],
          ["I'm sorry, I'm late.", '늦어서 죄송해요.'],
          ['I came here two years ago.', '2년 전에 여기 왔어요.'],
          ['Call me in the evening.', '저녁에 전화 주세요.'],
        ],
      },
    ],
  },
  {
    id: 'u9', no: 9, title: '이동과 여행', en: 'Getting around', color: '#0891b2', notes: ['imperative', 'prep_place'],
    desc: '교통수단 by, 길 묻기와 안내, 여행 준비, 명령문·Let\'s',
    lessons: [
      {
        id: 'u9l1', title: '교통수단', en: 'by bus',
        words: ['bus', 'subway', 'taxi', 'train', 'airport', 'station', 'ticket', 'by'],
        tip: {
          title: 'by bus · take the subway',
          html: `교통수단으로 갈 때: ${b('by')} + 교통수단(관사 없이) — ${b('by bus')} ${b('by subway')} ${b('by car')}<br>걸어서는 ${b('on foot')}<br><br>'(교통수단을) 타다'는 ${b('take')}: ${b('I take the subway.')}<br><br>${b('How do I get to the airport?')} 공항에 어떻게 가요?`,
        },
        items: [
          { q: '"버스로"', opts: ['by bus', 'by a bus', 'with bus'], a: 0, why: 'by + 교통수단(관사 없이)' },
          { q: '"지하철을 타요"', opts: ['I take the subway.', 'I ride subway the.', 'I get subway.'], a: 0, why: '교통수단을 타다 = take' },
          { q: '"걸어서"', opts: ['on foot', 'by foot walk', 'with feet'], a: 0, why: '걸어서 = on foot' },
        ],
        sents: [
          ['I go to work by bus.', '저는 버스로 출근해요.'],
          ['I take the subway.', '저는 지하철을 타요.'],
          ['Where is the bus stop?', '버스 정류장이 어디예요?'],
          ['One ticket to Busan, please.', '부산행 표 한 장 주세요.'],
          ['How do I get to the airport?', '공항에 어떻게 가요?'],
          ["Let's take a taxi.", '택시 타요.'],
        ],
      },
      {
        id: 'u9l2', title: '길 묻기', en: 'Go straight.', notes: ['imperative'],
        words: ['left', 'right', 'straight', 'turn', 'corner', 'block', 'street', 'map'],
        tip: {
          title: '길 안내는 동사로 시작',
          html: `길 안내는 <b>명령문</b>(동사원형으로 시작)으로 해요. 무례한 게 아니에요!<br>${b('Go straight.')} 쭉 가세요. · ${b('Turn left.')} 왼쪽으로 도세요.<br>${b("It's on your right.")} 오른쪽에 있어요.<br><br>물어볼 땐: ${b('Excuse me, where is the station?')}<br>${b('Can you show me on the map?')} 지도에서 보여 주실래요?`,
        },
        items: [
          { q: '"왼쪽으로 도세요"', opts: ['Turn left.', 'Left turn.', 'You turn to left.'], a: 0, why: '명령문 = 동사원형으로 시작' },
          { q: '"쭉 가세요"', opts: ['Go straight.', 'Straight go.', 'Going straight.'], a: 0, why: 'Go straight.' },
          { q: '"오른쪽에 있어요"', opts: ["It's on your right.", "It's in right.", "It's at the right side your."], a: 0, why: 'on your right / on your left' },
        ],
        sents: [
          ['Excuse me, where is the station?', '실례합니다, 역이 어디예요?'],
          ['Go straight for two blocks.', '두 블록 직진하세요.'],
          ['Turn right at the corner.', '모퉁이에서 오른쪽으로 도세요.'],
          ["It's on your left.", '왼쪽에 있어요.'],
          ['Can you show me on the map?', '지도에서 보여 주실래요?'],
          ["It's next to the bank.", '은행 옆에 있어요.'],
        ],
      },
      {
        id: 'u9l3', title: '여행 준비', en: 'Have a nice trip!',
        words: ['passport', 'hotel', 'trip', 'travel', 'suitcase', 'reservation', 'check_in', 'visit'],
        tip: {
          title: 'trip은 명사, travel은 동사',
          html: `${b('Have a nice trip!')} 즐거운 여행 되세요! (×Have a nice travel)<br>${b('I love to travel.')} 여행하는 걸 좋아해요.<br><br>🏨 호텔에서: ${b('I have a reservation.')} 예약했어요. · ${b("I'd like to check in.")}<br><br>🧳 '캐리어'는 콩글리시! ${b('suitcase')} 또는 ${b('luggage')}라고 해요.`,
        },
        items: [
          { q: '"좋은 여행 되세요!"', opts: ['Have a nice trip!', 'Have a nice travel!', 'Nice traveling have!'], a: 0, why: 'trip(명사) — travel은 주로 동사' },
          { q: '"예약했어요"', opts: ['I have a reservation.', 'I did reserve.', 'I am reservation.'], a: 0, why: 'have a reservation = 예약이 있다' },
          { q: '"체크인하고 싶어요"', opts: ["I'd like to check in.", 'I want check in do.', 'I like check in.'], a: 0, why: "I'd like to + 동사원형 = ~하고 싶어요(공손)" },
        ],
        sents: [
          ['Have a nice trip!', '즐거운 여행 되세요!'],
          ['I have a reservation.', '예약했어요.'],
          ["I'd like to check in, please.", '체크인하고 싶어요.'],
          ['Here is my passport.', '여기 제 여권이요.'],
          ['I want to travel to Canada.', '캐나다로 여행 가고 싶어요.'],
          ['We visit my grandparents every summer.', '우리는 여름마다 조부모님 댁에 가요.'],
        ],
      },
      {
        id: 'u9l4', title: "부탁·Let's", en: "Don't worry. Let's go!", notes: ['imperative'],
        words: ['open_v', 'close', 'stop', 'help', 'come_in', 'sit_down', 'worry', 'lets'],
        tip: {
          title: "명령·금지·제안",
          html: `해라: 동사원형 — ${b('Sit down, please.')} 앉으세요.<br>하지 마: ${b("Don't")} + 동사원형 — ${b("Don't worry.")} 걱정 마세요.<br>하자: ${b("Let's")} + 동사원형 — ${b("Let's go!")} 가자!<br><br>please를 붙이면 부드러워지고, 더 공손하게는 ${b('Could you…?')}`,
        },
        items: [
          { q: '"걱정 마세요"', opts: ["Don't worry.", 'No worry.', 'Not worry.'], a: 0, why: "Don't + 동사원형" },
          { q: '"같이 가자!"', opts: ["Let's go together!", 'Let go together us!', "Let's going together!"], a: 0, why: "Let's + 동사원형" },
          { q: '"앉으세요"', opts: ['Please sit down.', 'Please sitting down.', 'Please to sit down.'], a: 0, why: 'Please + 동사원형' },
        ],
        sents: [
          ['Please come in.', '들어오세요.'],
          ['Please sit down.', '앉으세요.'],
          ["Don't worry.", '걱정 마세요.'],
          ["Let's take a break.", '좀 쉬어요.'],
          ['Stop here, please.', '여기서 세워 주세요.'],
          ['Can you help me?', '좀 도와주실래요?'],
        ],
      },
    ],
  },
  {
    id: 'u10', no: 10, title: '과거', en: 'What did you do?', color: '#e5484d', notes: ['past', 'irregular', 'was_were'],
    desc: '규칙 과거 -ed, 불규칙 동사, was·were, did 질문과 부정',
    lessons: [
      {
        id: 'u10l1', title: '어제 한 일', en: 'I walked.', notes: ['past'],
        words: ['walk', 'clean_v', 'finish', 'start', 'wash', 'arrive', 'last_night', 'last_week'],
        tip: {
          title: '과거는 -ed',
          html: `대부분의 동사는 끝에 ${b('-ed')}: ${b('walk')} → ${b('walked')}, ${b('clean')} → ${b('cleaned')}<br>e로 끝나면 -d만: ${b('arrive')} → ${b('arrived')}<br><br>-ed 발음은 세 가지:<br>[t] ${b('walked')} [워크트] · [d] ${b('cleaned')} [클리인드] · [id] ${b('started')} [스타르티드]<br><br>과거는 주어와 상관없이 모양이 같아요!`,
        },
        items: [
          { q: 'I ___ my room yesterday.', ko: '어제 방을 청소했어요.', opts: ['cleaned', 'clean', 'cleaning'], a: 0, why: '과거: clean + ed' },
          { q: 'She ___ home at nine.', ko: '그녀는 9시에 집에 도착했어요.', opts: ['arrived', 'arriveed', 'arrives'], a: 0, why: 'e로 끝나면 -d만' },
          { q: '"어젯밤에"', opts: ['last night', 'yesterday night', 'before night'], a: 0, why: '어젯밤 = last night (yesterday night ×)' },
        ],
        sents: [
          ['I walked to work yesterday.', '어제 걸어서 출근했어요.'],
          ['I cleaned my room last night.', '어젯밤에 방을 청소했어요.'],
          ['The movie started at seven.', '영화는 7시에 시작했어요.'],
          ['We arrived late.', '우리는 늦게 도착했어요.'],
          ['She finished her homework.', '그녀는 숙제를 끝냈어요.'],
          ['I washed the dishes last week.', '지난주에 설거지를 했어요.'],
        ],
      },
      {
        id: 'u10l2', title: '불규칙 과거', en: 'went, ate, saw', notes: ['irregular'],
        words: ['see', 'meet', 'get', 'give', 'find', 'leave', 'bring', 'lose'],
        tip: {
          title: '자주 쓰는 동사일수록 불규칙',
          html: `가장 많이 쓰는 동사들은 -ed가 아니라 모양이 바뀌어요. 통째로 외워요!<br>${b('go')} → ${b('went')} · ${b('eat')} → ${b('ate')} · ${b('see')} → ${b('saw')}<br>${b('meet')} → ${b('met')} · ${b('get')} → ${b('got')} · ${b('buy')} → ${b('bought')}<br><br>💡 '연습 → 불규칙 동사' 드릴로 매일 조금씩 익혀 보세요.`,
        },
        items: [
          { q: 'I ___ a movie yesterday.', ko: '어제 영화를 봤어요.', opts: ['saw', 'seed', 'seen'], a: 0, why: 'see의 과거 = saw' },
          { q: 'We ___ at the cafe.', ko: '우리는 카페에서 만났어요.', opts: ['met', 'meeted', 'meet'], a: 0, why: 'meet의 과거 = met' },
          { q: 'I ___ my wallet.', ko: '지갑을 잃어버렸어요.', opts: ['lost', 'losed', 'loss'], a: 0, why: 'lose의 과거 = lost' },
        ],
        sents: [
          ['I saw a good movie yesterday.', '어제 좋은 영화를 봤어요.'],
          ['We met at a party.', '우리는 파티에서 만났어요.'],
          ['I got a present from my friend.', '친구한테 선물을 받았어요.'],
          ['She gave me a book.', '그녀가 저에게 책을 줬어요.'],
          ['I lost my phone.', '휴대폰을 잃어버렸어요.'],
          ['He left at six.', '그는 6시에 떠났어요.'],
        ],
      },
      {
        id: 'u10l3', title: 'was·were', en: 'I was tired.', notes: ['was_were'],
        words: ['tired', 'sick', 'bored', 'angry', 'sad', 'happy', 'excited', 'nervous'],
        tip: {
          title: 'be동사의 과거: was · were',
          html: `am·is → ${b('was')} / are → ${b('were')}<br>${b('I was tired.')} 피곤했어요. · ${b('They were happy.')} 그들은 행복했어요.<br><br>부정: ${b("wasn't")} · ${b("weren't")} / 질문: ${b('Were you sick?')}<br><br>⚠️ ${b("I'm bored.")} 나 심심해 ≠ ${b("I'm boring.")} 나는 지루한 사람이야!`,
        },
        items: [
          { q: 'I ___ tired yesterday.', ko: '어제 피곤했어요.', opts: ['was', 'were', 'am'], a: 0, why: 'I의 과거 be = was' },
          { q: 'They ___ very happy.', ko: '그들은 정말 행복했어요.', opts: ['were', 'was', 'did'], a: 0, why: 'they의 과거 be = were' },
          { q: '"심심했어요"', opts: ['I was bored.', 'I was boring.', 'I bored.'], a: 0, why: '내가 지루함을 느끼면 bored' },
        ],
        sents: [
          ['I was tired yesterday.', '어제 피곤했어요.'],
          ['Were you sick?', '아팠어요?'],
          ['She was nervous before the test.', '그녀는 시험 전에 긴장했어요.'],
          ['We were so excited!', '우리는 정말 신났어요!'],
          ["He wasn't angry.", '그는 화나지 않았어요.'],
          ['The kids were bored.', '아이들은 심심해했어요.'],
        ],
      },
      {
        id: 'u10l4', title: '과거 질문', en: 'Did you have fun?', notes: ['past'],
        words: ['fun', 'party', 'concert', 'vacation', 'weather', 'beach', 'interesting', 'boring'],
        tip: {
          title: 'Did + 동사원형?',
          html: `과거 질문은 주어와 상관없이 ${b('Did')} + 주어 + <b>동사원형</b>:<br>${b('Did you have fun?')} 재미있었어요? (×Did you had)<br><br>부정도 ${b("didn't")} + 동사원형: ${b("I didn't go.")}<br><br>어땠는지 물을 땐 ${b('How was')} ~?: ${b('How was your vacation?')} → ${b('It was great!')}`,
        },
        items: [
          { q: '"재미있었어요?"', opts: ['Did you have fun?', 'Did you had fun?', 'Do you had fun?'], a: 0, why: 'Did 뒤에는 동사원형' },
          { q: '"휴가 어땠어요?"', opts: ['How was your vacation?', 'How did your vacation?', 'How is your vacation was?'], a: 0, why: 'How was + 명사?' },
          { q: "I ___ go to the party.", ko: '저는 파티에 안 갔어요.', opts: ["didn't", "don't", "wasn't"], a: 0, why: "과거 부정 = didn't + 동사원형" },
        ],
        sents: [
          ['How was your vacation?', '휴가 어땠어요?'],
          ['It was great!', '정말 좋았어요!'],
          ['Did you have fun at the party?', '파티에서 재미있었어요?'],
          ['The concert was amazing.', '콘서트는 정말 멋졌어요.'],
          ['We went to the beach.', '우리는 바닷가에 갔어요.'],
          ["I didn't like the movie. It was boring.", '그 영화는 별로였어요. 지루했어요.'],
        ],
      },
    ],
  },
];
