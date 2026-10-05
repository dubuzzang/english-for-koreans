// 형식: 영어 | 한국어 뜻 | 품사 | 예문 | 예문 번역 | 플래그 | 메모 (vocab-1.js 참고)

export const RAW5 = {
  verbs: `
be | ~이다, (~에) 있다 | v | I want to be a doctor. | 저는 의사가 되고 싶어요. | nodrill | am·is·are / was·were — 한국어 '~이다'와 '있다'를 모두 맡아요.
have | 가지고 있다; 먹다 | v | I have two brothers. | 저는 형제가 둘 있어요. | | 3인칭 단수는 has. have lunch(점심을 먹다)처럼도 써요.
do | 하다 | v | What do you do on weekends? | 주말에 뭐 해요?
go | 가다 | v | I go to school by bus. | 저는 버스로 학교에 가요.
come | 오다 | v | Can you come to my party? | 내 파티에 올 수 있어?
get up | 일어나다 | v | I get up at seven. | 저는 7시에 일어나요. | | wake up(잠에서 깨다)한 뒤 침대에서 나오는 게 get up.
wake up | 잠에서 깨다 | v | I wake up early every day. | 저는 매일 일찍 깨요.
eat | 먹다 | v | Let's eat lunch together. | 같이 점심 먹자.
drink | 마시다 | v | I drink a lot of water. | 저는 물을 많이 마셔요.
work | 일하다; 일 | v | I work at a bank. | 저는 은행에서 일해요.
study | 공부하다 | v | I study English every day. | 저는 매일 영어를 공부해요.
sleep | 자다 | v | I sleep seven hours a day. | 저는 하루에 7시간 자요.
like | 좋아하다 | v | I like music. | 저는 음악을 좋아해요. | | like + 동사-ing: I like swimming.(수영하는 걸 좋아해요)
love | 정말 좋아하다, 사랑하다 | v | I love pizza! | 저는 피자를 정말 좋아해요!
hate | 싫어하다 | v | I hate cold weather. | 저는 추운 날씨가 싫어요.
want | 원하다 | v | I want a new bike. | 새 자전거를 갖고 싶어요. | | want to + 동사원형 = ~하고 싶다
need | 필요하다 | v | I need your help. | 당신 도움이 필요해요.
live | 살다 | v | I live in Seoul. | 저는 서울에 살아요.
speak | (언어를) 말하다 | v | Do you speak English? | 영어 하세요? | | 언어를 할 줄 안다고 할 땐 speak, 대화하다는 talk.
know | 알다 | v | Do you know her? | 그녀를 알아요? | | k를 발음하지 않아요: [노우].
cook | 요리하다 | v | My dad cooks dinner on weekends. | 아빠는 주말에 저녁을 요리하세요.
drive | 운전하다 | v | Can you drive? | 운전할 줄 알아요?
read | 읽다 | v | I read books on the subway. | 저는 지하철에서 책을 읽어요. | | 과거형도 철자는 read지만 발음이 [레드]로 바뀌어요.
understand | 이해하다 | v | Sorry, I don't understand. | 죄송해요, 이해를 못 했어요.
remember | 기억하다 | v | Do you remember me? | 저 기억하세요?
watch | 보다(지켜보다) | v | I watch TV in the evening. | 저는 저녁에 TV를 봐요. | | 움직이는 걸 지켜보면 watch, 그냥 눈에 보이면 see, 일부러 쳐다보면 look at.
listen to | ~을 듣다 | v | I'm listening to music. | 음악을 듣고 있어요. | | 귀 기울여 들으면 listen to, 그냥 들리면 hear.
wait for | ~을 기다리다 | v | I'm waiting for the bus. | 버스를 기다리고 있어요.
call | 전화하다; 부르다 | v | I'll call you tonight. | 오늘 밤에 전화할게.
play | 놀다; (운동·악기를) 하다 | v | Let's play soccer. | 축구하자. | | 운동은 play soccer, 악기는 play the piano(the를 붙여요).
write | 쓰다 | v | Please write your name here. | 여기에 이름을 써 주세요. | | w를 발음하지 않아요: [라이트].
text | 문자를 보내다 | v | I'll text you later. | 나중에 문자할게. | | 카톡 같은 메시지를 보낼 때도 text나 message라고 해요.
run | 달리다 | v | I run every morning. | 저는 매일 아침 달려요.
swim | 수영하다 | v | Can you swim? | 수영할 줄 알아요?
sit | 앉다 | v | Can I sit here? | 여기 앉아도 돼요?
make | 만들다 | v | I'm making dinner. | 저녁을 만들고 있어요.
take | 가져가다; (교통수단을) 타다 | v | I take the subway to work. | 저는 지하철을 타고 출근해요. | | take a photo(사진 찍다), take a shower(샤워하다)처럼 두루 써요.
dance | 춤추다 | v | Let's dance! | 춤추자!
shop | 쇼핑하다 | v | We're shopping at the mall. | 우리는 쇼핑몰에서 쇼핑하고 있어요.
talk | 이야기하다 | v | Can we talk now? | 지금 얘기할 수 있어요?
hear | 들리다, 듣다 | v | I can't hear you. | 잘 안 들려요.
call back | 다시 전화하다 | v | I'll call you back later. | 나중에 다시 전화할게요. | | 대명사는 가운데에: call you back
teach | 가르치다 | v | She teaches English. | 그녀는 영어를 가르쳐요.
learn | 배우다 | v | I'm learning Spanish these days. | 요즘 스페인어를 배우고 있어요.
stay | 머무르다 | v | I'm staying home today. | 오늘은 집에 있을 거예요.
open | 열다 | v | Open the window, please. | 창문 좀 열어 주세요. | id=open_v
close | 닫다 | v | Close the door, please. | 문 좀 닫아 주세요. | | 동사는 [클로우즈], 형용사 '가까운'은 [클로우스]로 발음이 달라요.
help | 돕다; 도움 | v | Can you help me? | 좀 도와주실래요?
come in | 들어오다 | v | Please come in. | 들어오세요.
sit down | 앉다 | v | Please sit down. | 앉으세요.
worry | 걱정하다 | v | Don't worry. | 걱정 마세요.
let's | ~하자 | aux | Let's take a break. | 좀 쉬어요. | | Let's + 동사원형. 부정은 Let's not ~.
walk | 걷다 | v | I walk to work. | 저는 걸어서 출근해요. | | l을 발음하지 않아요: [워크]. work [워ㄹ크]와 구분!
clean | 청소하다 | v | I clean my room on Saturdays. | 저는 토요일마다 방을 청소해요. | id=clean_v
finish | 끝내다 | v | I finish work at six. | 저는 6시에 일을 마쳐요.
start | 시작하다 | v | The class starts at nine. | 수업은 9시에 시작해요.
wash | 씻다, 빨다 | v | Wash your hands. | 손 씻어.
see | 보다; 만나다 | v | I saw a good movie yesterday. | 어제 좋은 영화를 봤어요.
meet | 만나다 | v | Let's meet at six. | 6시에 만나요.
get | 받다, 사다, 얻다 | v | I got a present from my friend. | 친구한테 선물을 받았어요. | | get은 '받다·사다·되다·도착하다' 등 뜻이 아주 많아요.
give | 주다 | v | My mom gave me this watch. | 엄마가 이 시계를 주셨어요.
find | 찾다, 발견하다 | v | I can't find my phone. | 휴대폰을 못 찾겠어요.
leave | 떠나다; 두고 오다 | v | The bus leaves at eight. | 버스는 8시에 출발해요.
bring | 가져오다 | v | Can you bring some water? | 물 좀 가져다줄래요?
lose | 잃어버리다; 지다 | v | I lost my wallet. | 지갑을 잃어버렸어요.
will | ~할 것이다 | aux | I will call you tomorrow. | 내일 전화할게요. | | 축약형: I'll, you'll · 부정: won't
promise | 약속하다 | v | I promise. | 약속할게.
forget | 잊다 | v | Don't forget your umbrella. | 우산 잊지 마.
decide | 결정하다 | v | I can't decide. | 결정을 못 하겠어요.
plan | 계획 | n | What are your plans for the weekend? | 주말 계획이 뭐예요?
move | 이사하다; 움직이다 | v | We're going to move next month. | 우리는 다음 달에 이사할 거예요.
get married | 결혼하다 | v | They're going to get married in May. | 그들은 5월에 결혼할 거예요. | | marry + 사람: She married Tom. / 그냥 결혼하다: get married
graduate | 졸업하다 | v | I graduate next year. | 저는 내년에 졸업해요.
save | 저축하다, 아끼다 | v | I'm saving money for a trip. | 여행 가려고 돈을 모으고 있어요.
dream | 꿈 | n | My dream is to become a pilot. | 제 꿈은 조종사가 되는 거예요.
become | ~이 되다 | v | I want to become a doctor. | 의사가 되고 싶어요.
hope | 바라다 | v | I hope you like it. | 마음에 들었으면 좋겠어요.
try | 해 보다, 노력하다 | v | Try this cake. It's delicious. | 이 케이크 먹어 봐. 맛있어.
practice | 연습하다 | v | I practice English every day. | 저는 매일 영어를 연습해요. | uk=practise
invite | 초대하다 | v | Thank you for inviting me. | 초대해 줘서 고마워요.
join | 함께하다, 가입하다 | v | Can I join you? | 같이해도 될까요?
cancel | 취소하다 | v | I need to cancel my reservation. | 예약을 취소해야 해요.
can | ~할 수 있다 | aux | I can swim. | 저는 수영할 수 있어요. | | 부정은 can't. 긍정 can은 약하게 [컨], can't는 강하게 [캔트] 말해요.
sing | 노래하다 | v | She sings very well. | 그녀는 노래를 정말 잘해요.
fix | 고치다 | v | Can you fix my computer? | 제 컴퓨터 고쳐 줄 수 있어요?
ride | (자전거·말 등을) 타다 | v | Can you ride a bike? | 자전거 탈 줄 알아요?
climb | 오르다 | v | Let's climb that mountain. | 저 산에 올라가자. | | b를 발음하지 않아요: [클라임].
have to | ~해야 한다 | aux | I have to go now. | 이제 가야 해요. | | 3인칭은 has to. don't have to = ~할 필요 없다
must | ~해야 한다 | aux | You must wear a seatbelt. | 안전벨트를 꼭 매야 해요. | | must not = ~하면 안 된다(금지)
should | ~하는 게 좋겠다 | aux | You should see a doctor. | 병원에 가 보는 게 좋겠어요.
could | ~해 주시겠어요?; ~할 수 있었다 | aux | Could you help me? | 좀 도와주시겠어요? | | Can you…?보다 공손한 부탁이에요.
may | ~해도 될까요? | aux | May I come in? | 들어가도 될까요? | id=may_aux
borrow | 빌리다 | v | Can I borrow your pen? | 펜 좀 빌려도 될까요? | | 내가 빌리면 borrow, 남에게 빌려주면 lend.
lend | 빌려주다 | v | Can you lend me some money? | 돈 좀 빌려줄 수 있어요?
use | 사용하다 | v | Can I use your phone? | 전화 좀 써도 될까요?
turn on | 켜다 | v | Can you turn on the light? | 불 좀 켜 줄래요?
turn off | 끄다 | v | Please turn off your phone. | 휴대폰을 꺼 주세요.
say | 말하다 | v | What did you say? | 뭐라고 했어요?
tell | 말해 주다, 알려 주다 | v | Can you tell me the way to the station? | 역에 가는 길 좀 알려 주시겠어요? | | tell + 사람: tell me, tell him
ask | 묻다, 부탁하다 | v | Can I ask you a question? | 질문 하나 해도 될까요?
answer | 대답하다, (전화를) 받다 | v | Please answer the phone. | 전화 좀 받아 줘.
think | 생각하다 | v | I think so, too. | 저도 그렇게 생각해요.
look | 보다; ~해 보이다 | v | You look tired. | 피곤해 보여요. | | look + 형용사 = ~해 보이다
look for | ~을 찾다 | v | I'm looking for the subway station. | 지하철역을 찾고 있어요.
send | 보내다 | v | I'll send you a message. | 메시지 보낼게요.
sell | 팔다 | v | Do you sell batteries? | 건전지 파세요?
put | 놓다, 두다 | v | Put your bag here. | 가방은 여기 두세요.
keep | 보관하다; 계속하다 | v | Keep the change. | 잔돈은 가지세요.
begin | 시작하다 | v | The movie begins at seven. | 영화는 7시에 시작해요.
win | 이기다 | v | Our team won the game! | 우리 팀이 경기에서 이겼어요!
spend | (시간·돈을) 쓰다 | v | I spend a lot of money on food. | 저는 먹는 데 돈을 많이 써요.
grow | 자라다; 키우다 | v | I grew up in Busan. | 저는 부산에서 자랐어요.
break | 깨다, 고장 내다 | v | Don't break the glass. | 유리잔 깨지 마.
choose | 고르다 | v | Choose one color. | 색 하나를 고르세요.
fly | 날다; 비행기로 가다 | v | We're flying to Tokyo tomorrow. | 우리는 내일 비행기로 도쿄에 가요.
build | 짓다 | v | They're building a new hospital. | 새 병원을 짓고 있어요.
catch | 잡다; (교통수단을) 타다 | v | I have to catch the last bus. | 막차를 타야 해요.
stand | 서다, 서 있다 | v | Please stand in line. | 줄을 서 주세요.
show | 보여 주다 | v | Can you show me another one? | 다른 거 보여 주실래요?
smile | 미소 짓다 | v | Smile for the camera! | 카메라 보고 웃어요!
laugh | (소리 내어) 웃다 | v | Everyone laughed at his joke. | 모두 그의 농담에 웃었어요. | | gh를 [f]로 발음해요: [래프].
cry | 울다 | v | The baby is crying. | 아기가 울고 있어요.
agree | 동의하다 | v | I agree with you. | 당신 의견에 동의해요.
enjoy | 즐기다 | v | I enjoyed the movie. | 영화 재미있게 봤어요. | | enjoy + 명사/-ing. 그냥 '즐겨!'는 Have fun!
happen | 일어나다, 생기다 | v | What happened? | 무슨 일이에요?
change | 바꾸다 | v | Can I change my seat? | 자리를 바꿔도 될까요?
carry | 나르다, 들고 다니다 | v | Can you carry this bag? | 이 가방 좀 들어 줄래요?
hurry | 서두르다 | v | Hurry up! We're late. | 서둘러! 늦었어.
check | 확인하다 | v | Let me check. | 확인해 볼게요. | id=check_v
`,

  adverbs: `
always | 항상 | adv | I always drink coffee in the morning. | 저는 아침에 항상 커피를 마셔요. | | 빈도부사는 일반동사 앞, be동사 뒤: I always walk. / I'm always late.
usually | 보통, 대개 | adv | I usually walk to work. | 저는 보통 걸어서 출근해요.
often | 자주 | adv | I often watch movies at night. | 저는 밤에 영화를 자주 봐요. | | t를 발음하지 않는 사람이 많아요: [오픈].
sometimes | 가끔 | adv | We sometimes eat out. | 우리는 가끔 외식해요.
never | 절대 ~않다, 한 번도 ~않다 | adv | He is never late. | 그는 절대 늦지 않아요. | | never 자체가 부정이라 not을 또 쓰지 않아요.
very | 매우, 아주 | adv | It's very cold. | 정말 추워요.
really | 정말, 진짜 | adv | Really? That's amazing! | 정말? 대단하다!
too | 너무; ~도 | adv | It's too expensive. | 너무 비싸요. | | 문장 끝의 too는 '~도': Me too. / I like it, too.
also | 또한 | adv | I also speak Japanese. | 저는 일본어도 해요.
again | 다시 | adv | Can you say that again? | 다시 말씀해 주시겠어요?
well | 잘 | adv | She sings very well. | 그녀는 노래를 정말 잘해요. | | good은 형용사, well은 부사: You speak English well.
a little | 조금, 약간 | adv | I speak a little English. | 저는 영어를 조금 해요.
together | 함께 | adv | Let's go together. | 같이 가요.
maybe | 아마, 어쩌면 | adv | Maybe tomorrow. | 아마 내일요.
probably | 아마도(꽤 확실히) | adv | It will probably rain tomorrow. | 내일 아마 비가 올 거예요.
already | 이미, 벌써 | adv | I already ate lunch. | 벌써 점심 먹었어요.
yet | 아직(부정문·질문) | adv | I haven't finished yet. | 아직 다 못 끝냈어요.
just | 방금; 그냥, 딱 | adv | I just arrived. | 방금 도착했어요.
ever | (질문에서) 한 번이라도 | adv | Have you ever been to Jeju? | 제주에 가 본 적 있어요?
before | 전에 | adv | I've seen this movie before. | 이 영화 전에 본 적 있어요.
once | 한 번 | adv | I've been to Japan once. | 일본에 한 번 가 봤어요.
twice | 두 번 | adv | I go to the gym twice a week. | 저는 일주일에 두 번 헬스장에 가요.
and | 그리고, ~와 | conj | I like cats and dogs. | 저는 고양이와 개를 좋아해요.
but | 하지만 | conj | It's small but cozy. | 작지만 아늑해요.
so | 그래서; 정말 | conj | I was tired, so I went to bed early. | 피곤해서 일찍 잤어요.
because | 왜냐하면, ~ 때문에 | conj | I'm happy because it's Friday. | 금요일이라서 기분 좋아요.
or | 또는, 아니면 | conj | Coffee or tea? | 커피 드릴까요, 차 드릴까요?
then | 그다음에, 그러면 | adv | First wash your hands, then eat. | 먼저 손 씻고 그다음에 먹어.
after | ~ 후에 | prep | Let's go out after dinner. | 저녁 먹고 나가자.
if | 만약 ~라면 | conj | If it rains, we'll stay home. | 비가 오면 우리는 집에 있을 거예요. | | if 절에서는 미래라도 현재형: If it rains (×If it will rain)
when | ~할 때; 언제 | conj | Call me when you arrive. | 도착하면 전화해.
while | ~하는 동안 | conj | I listen to music while I work. | 저는 일하는 동안 음악을 들어요.
until | ~까지 | conj | Wait here until I come back. | 내가 돌아올 때까지 여기서 기다려.
right now | 지금 당장 | adv | I'm busy right now. | 지금은 바빠요.
outside | 밖에, 밖에서 | adv | Let's eat outside. | 밖에서 먹자.
inside | 안에, 안으로 | adv | It's cold. Let's go inside. | 추워. 안으로 들어가자.
enough | 충분히, 충분한 | adv | Get enough sleep. | 잠을 충분히 자요.
than | ~보다 | conj | I'm taller than my brother. | 저는 형보다 키가 커요.
on time | 제시간에 | adv | Please be on time. | 시간 맞춰 와 주세요. | | on time 정각에·제시간에, in time 늦지 않게
instead | 대신에 | adv | Let's have tea instead. | 대신 차 마셔요.
`,

  pronouns: `
I | 나, 저 | pron | I'm from Korea. | 저는 한국에서 왔어요. | | 문장 어디에 있든 항상 대문자 I!
my | 나의, 내 | pron | This is my bag. | 이건 제 가방이에요.
me | 나를, 나에게 | pron | Can you help me? | 저 좀 도와주실래요?
you | 너, 당신, 여러분 | pron | Are you a student? | 학생이에요? | | 한 명이든 여러 명이든, 반말이든 존댓말이든 모두 you!
your | 너의, 당신의 | pron | What's your name? | 이름이 뭐예요?
he | 그(남자) | pron | He is my brother. | 그는 제 남동생이에요.
she | 그녀 | pron | She is a nurse. | 그녀는 간호사예요.
it | 그것 | pron | It's my phone. | 그건 제 휴대폰이에요. | | 날씨·시간·거리를 말할 때도 주어로 써요: It's cold. It's three o'clock.
we | 우리 | pron | We are classmates. | 우리는 반 친구예요.
they | 그들, 그것들 | pron | They are my parents. | 이분들은 저희 부모님이에요.
this | 이것, 이 | pron | This is my book. | 이건 제 책이에요.
that | 저것, 그것 | pron | What's that? | 저건 뭐예요?
these | 이것들 | pron | These are my shoes. | 이건 제 신발이에요.
those | 저것들 | pron | Those are not my shoes. | 저건 제 신발이 아니에요.
what | 무엇, 무슨 | q | What's your name? | 이름이 뭐예요?
where | 어디 | q | Where are you from? | 어디에서 왔어요?
who | 누구; ~하는 (사람) | q | Who is that man? | 저 남자는 누구예요?
why | 왜 | q | Why are you late? | 왜 늦었어요?
how | 어떻게 | q | How do you spell your name? | 이름 철자가 어떻게 돼요?
which | 어느, 어떤 것 | q | Which one do you want? | 어느 걸 원해요?
how many | 몇 개, 몇 명 | q | How many brothers do you have? | 형제가 몇 명이에요?
how old | 몇 살 | q | How old are you? | 몇 살이에요?
how often | 얼마나 자주 | q | How often do you exercise? | 얼마나 자주 운동해요?
everyone | 모두, 모든 사람 | pron | Hello, everyone! | 안녕하세요, 여러분! | | everyone은 단수 취급: Everyone is here.
someone | 누군가 | pron | Someone is at the door. | 누가 문 앞에 와 있어요.
something | 무언가 | pron | I want something to drink. | 뭔가 마실 게 필요해요.
nothing | 아무것도 ~ 않다 | pron | There's nothing in the fridge. | 냉장고에 아무것도 없어요.
everything | 모든 것 | pron | Thank you for everything. | 여러모로 고마웠어요.
anything | 무엇이든, 아무것도 | pron | Do you need anything? | 필요한 거 있어요?
thing | 것, 물건 | n | I have many things to do. | 할 일이 많아요.
place | 장소, 곳 | n | This is my favorite place. | 여기가 제가 가장 좋아하는 곳이에요.
`,

  prep: `
in | ~ 안에; (달·연도·도시) ~에 | prep | My phone is in my bag. | 휴대폰은 가방 안에 있어요.
on | ~ 위에; (요일·날짜) ~에 | prep | The book is on the table. | 책은 탁자 위에 있어요.
at | (지점·시각) ~에 | prep | I'm at the bus stop. | 저는 버스 정류장에 있어요.
under | ~ 아래에 | prep | The cat is under the bed. | 고양이는 침대 밑에 있어요.
next to | ~ 옆에 | prep | The bank is next to the cafe. | 은행은 카페 옆에 있어요.
behind | ~ 뒤에 | prep | The car is behind the house. | 차는 집 뒤에 있어요.
in front of | ~ 앞에 | prep | Let's meet in front of the station. | 역 앞에서 만나요.
between | ~ 사이에 | prep | The cafe is between the bank and the hotel. | 카페는 은행과 호텔 사이에 있어요.
from | ~에서(부터), ~ 출신 | prep | I'm from Seoul. | 저는 서울 출신이에요.
to | ~로, ~에게 | prep | I go to school every day. | 저는 매일 학교에 가요.
with | ~와 함께 | prep | I live with my parents. | 저는 부모님과 함께 살아요.
for | ~을 위해; ~ 동안 | prep | This is for you. | 이거 당신 거예요(선물이에요).
about | ~에 대해; 약 | prep | Let's talk about it. | 그것에 대해 얘기해 보자.
of | ~의 | prep | A cup of tea, please. | 차 한 잔 주세요.
into | ~ 안으로 | prep | She went into the room. | 그녀는 방 안으로 들어갔어요.
across | ~ 건너편에 | prep | The bank is across the street. | 은행은 길 건너편에 있어요.
around | ~ 주위에; 약, ~쯤 | prep | Let's meet around six. | 6시쯤 만나요.
during | ~ 동안(기간 중에) | prep | I slept during the movie. | 영화 보는 동안 잤어요.
since | ~ 이후로 | prep | I've lived here since 2020. | 2020년부터 여기 살았어요.
up | 위로 | adv | Stand up, please. | 일어서 주세요.
down | 아래로 | adv | Go down the stairs. | 계단을 내려가세요.
over there | 저쪽에 | adv | The restroom is over there. | 화장실은 저쪽에 있어요.
`,

  school: `
school | 학교 | n | I go to school by bus. | 저는 버스로 학교에 가요. | | go to school(학교에 가다·다니다)에는 the를 쓰지 않아요.
class | 수업, 반 | n | My English class starts at nine. | 영어 수업은 9시에 시작해요.
classmate | 반 친구 | n | She is my classmate. | 그녀는 제 반 친구예요.
homework | 숙제 | n | I have a lot of homework. | 숙제가 많아요. | unc | 셀 수 없어요: much homework (×homeworks)
test | 시험 | n | I have a test tomorrow. | 내일 시험이 있어요. | alt=exam
question | 질문, 문제 | n | Can I ask a question? | 질문해도 될까요?
answer | 정답, 대답 | n | That's the right answer! | 그게 정답이에요! | id=answer_n
university | 대학교 | n | My brother goes to university. | 오빠는 대학에 다녀요. | | 미국에서는 college라고도 해요. [유니버시티] — y 소리로 시작해서 a university.
pen | 펜 | n | Can I borrow a pen? | 펜 좀 빌릴 수 있을까요?
pencil | 연필 | n | Write your name with a pencil. | 연필로 이름을 쓰세요.
notebook | 공책 | n | I write new words in my notebook. | 저는 새 단어를 공책에 적어요. | | 노트북 컴퓨터는 laptop! notebook은 공책이에요.
dictionary | 사전 | n | Look it up in the dictionary. | 사전에서 찾아보세요.
word | 단어, 말 | n | What does this word mean? | 이 단어는 무슨 뜻이에요?
sentence | 문장 | n | Make a sentence with this word. | 이 단어로 문장을 만들어 보세요.
grammar | 문법 | n | English grammar is not easy. | 영어 문법은 쉽지 않아요. | unc
meeting | 회의 | n | I have a meeting at two. | 2시에 회의가 있어요. | | 한국어 '미팅(소개팅)'은 영어로 blind date예요.
email | 이메일 | n | Please check your email. | 이메일을 확인해 주세요.
report | 보고서 | n | I have to finish this report today. | 오늘 이 보고서를 끝내야 해요.
interview | 면접, 인터뷰 | n | I have a job interview tomorrow. | 내일 취업 면접이 있어요.
salary | 월급, 급여 | n | My salary is not very high. | 제 월급은 그렇게 높지 않아요.
rule | 규칙 | n | Please follow the rules. | 규칙을 지켜 주세요.
uniform | 교복, 유니폼 | n | We wear uniforms at school. | 우리는 학교에서 교복을 입어요.
seatbelt | 안전벨트 | n | Please fasten your seatbelt. | 안전벨트를 매 주세요.
advice | 조언, 충고 | n | Can I give you some advice? | 조언 하나 해도 될까요? | unc | 셀 수 없어요: a piece of advice (×an advice)
goal | 목표 | n | My goal is to speak English well. | 제 목표는 영어를 잘하는 거예요.
history | 역사 | n | I love Korean history. | 저는 한국사를 정말 좋아해요. | unc
math | 수학 | n | Math is my favorite subject. | 수학은 제가 가장 좋아하는 과목이에요. | unc uk=maths
science | 과학 | n | She is good at science. | 그녀는 과학을 잘해요. | unc
subject | 과목; 주제 | n | What's your favorite subject? | 가장 좋아하는 과목이 뭐예요?
idea | 생각, 아이디어 | n | That's a good idea! | 좋은 생각이에요!
information | 정보 | n | I need more information. | 정보가 더 필요해요. | unc | 셀 수 없어요 (×informations)
example | 예, 보기 | n | Can you give me an example? | 예를 하나 들어 줄래요?
experience | 경험 | n | It was a great experience. | 정말 좋은 경험이었어요.
`,

  hobbies: `
hobby | 취미 | n | What's your hobby? | 취미가 뭐예요? | | What do you do for fun?(재미로 뭐 해요?)이라고도 많이 물어요.
music | 음악 | n | I listen to music every day. | 저는 매일 음악을 들어요. | unc
movie | 영화 | n | Let's watch a movie tonight. | 오늘 밤에 영화 보자. | uk=film
sport | 스포츠, 운동 경기 | n | What sports do you like? | 어떤 운동 좋아해요?
soccer | 축구 | n | Let's play soccer. | 축구하자. | unc uk=football | 미국에서 football은 미식축구예요.
baseball | 야구 | n | Baseball is popular in Korea. | 야구는 한국에서 인기가 많아요. | unc
basketball | 농구 | n | He plays basketball after school. | 그는 방과 후에 농구를 해요. | unc
tennis | 테니스 | n | I play tennis on Saturdays. | 저는 토요일마다 테니스를 쳐요. | unc
yoga | 요가 | n | I do yoga every morning. | 저는 매일 아침 요가를 해요. | unc | 운동에 따라 play soccer, do yoga, go swimming처럼 동사가 달라요.
game | 게임, 경기 | n | Do you play video games? | 비디오 게임 해요?
guitar | 기타 | n | I play the guitar. | 저는 기타를 쳐요. | | 악기 앞에는 the: play the guitar
piano | 피아노 | n | She plays the piano very well. | 그녀는 피아노를 정말 잘 쳐요.
song | 노래 | n | This is my favorite song. | 이건 제가 가장 좋아하는 노래예요.
concert | 콘서트 | n | I'm going to a concert tonight. | 오늘 밤에 콘서트에 가요.
party | 파티 | n | Are you coming to my birthday party? | 내 생일 파티에 올 거야?
picnic | 소풍 | n | Let's have a picnic in the park. | 공원에서 소풍하자.
camping | 캠핑 | n | We go camping in summer. | 우리는 여름에 캠핑을 가요. | unc
hiking | 등산, 하이킹 | n | Let's go hiking this weekend. | 이번 주말에 등산 가요. | unc | go + -ing: go hiking, go shopping, go swimming
fishing | 낚시 | n | My dad loves fishing. | 아빠는 낚시를 정말 좋아하세요. | unc
drawing | 그림 그리기 | n | My hobby is drawing. | 제 취미는 그림 그리기예요. | unc
photo | 사진 | n | Can you take a photo of us? | 저희 사진 좀 찍어 주실래요? | | take a photo = 사진을 찍다
K-pop | 케이팝 | n | I love K-pop. | 저는 케이팝을 정말 좋아해요. | unc proper
drama | 드라마 | n | I watch Korean dramas. | 저는 한국 드라마를 봐요.
YouTube | 유튜브 | n | I watch YouTube every night. | 저는 매일 밤 유튜브를 봐요. | unc proper
social media | 소셜 미디어, SNS | n | I don't use social media much. | 저는 소셜 미디어를 별로 안 해요. | unc | 'SNS'는 영어권에서 잘 안 써요. social media라고 해요.
selfie | 셀카 | n | Let's take a selfie! | 셀카 찍자! | | '셀카'는 selfie!
fan | 팬 | n | I'm a big fan of BTS. | 저는 BTS의 열렬한 팬이에요. | | '광팬'은 a big fan. '매니아'는 영어로 잘 안 써요.
free time | 여가 시간 | n | What do you do in your free time? | 여가 시간에 뭐 해요? | unc
cooking | 요리 | n | Cooking is my hobby. | 요리가 제 취미예요. | unc
reading | 독서 | n | I love reading. | 저는 독서를 정말 좋아해요. | unc
paint | (그림을) 그리다, 칠하다 | v | I like to paint flowers. | 저는 꽃 그리는 걸 좋아해요.
`,
};
