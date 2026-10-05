// 형식: 영어 | 한국어 뜻 | 품사 | 예문 | 예문 번역 | 플래그 | 메모
// 품사: n 명사 · v 동사 · adj 형용사 · adv 부사 · pron 대명사 · num 수사 · int 감탄사 · phr 표현 · prep 전치사 · conj 접속사 · q 의문사 · det 한정사 · aux 조동사
// 플래그: id=… alt=…(허용 답안, / 구분, 띄어쓰기는 _) pl=…(불규칙 복수) cmp=more|er unc(셀 수 없음) plonly(늘 복수) nocmp(비교급 없음) proper nodrill uk=…(영국식)

export const RAW1 = {
  greet: `
hello | 안녕하세요 | int | Hello, I'm Mina. | 안녕하세요, 저는 미나예요.
hi | 안녕(가볍게) | int | Hi, Tom! | 안녕, 톰! | | Hello보다 가볍고 친근한 인사예요.
good morning | 좋은 아침이에요, 안녕하세요(오전) | phr | Good morning, everyone! | 여러분, 좋은 아침이에요!
good afternoon | 안녕하세요(오후 인사) | phr | Good afternoon. How can I help you? | 안녕하세요. 무엇을 도와드릴까요?
good evening | 안녕하세요(저녁 인사) | phr | Good evening, and welcome! | 안녕하세요, 어서 오세요! | | 저녁에 만났을 때 하는 인사예요.
good night | 잘 자요, 안녕히 주무세요 | phr | Good night, see you tomorrow. | 잘 자, 내일 봐. | | 헤어지거나 자러 갈 때만 써요. 밤에 만났을 때는 Good evening!
bye | 안녕(헤어질 때) | int | Bye, see you later! | 안녕, 나중에 봐! | alt=goodbye | 한국어 '안녕'은 만날 때·헤어질 때 다 쓰지만, 영어는 Hi와 Bye로 나눠요.
see you | 또 봐요 | phr | See you tomorrow! | 내일 봐요! | alt=see_you_later
how are you? | 어떻게 지내요?, 안녕하세요? | phr | Hi, Jisu. How are you? | 안녕, 지수야. 잘 지내? | | 진짜 안부라기보다 인사말이에요. Good, thanks! 정도로 짧게 답하면 돼요.
I'm fine | 잘 지내요, 괜찮아요 | phr | I'm fine, thanks. | 잘 지내요, 고마워요. | | 원어민은 I'm good. / Pretty good.도 많이 써요.
thank you | 고맙습니다, 감사합니다 | phr | Thank you for your help. | 도와주셔서 감사합니다. | | th는 혀끝을 이 사이에 살짝 대고 — '땡큐'보다 '쌩큐'에 가까워요.
thanks | 고마워요(가볍게) | int | Thanks a lot! | 정말 고마워요!
and you? | 당신은요?(되물을 때) | phr | I'm good, thanks. And you? | 저는 잘 지내요, 고마워요. 당신은요?
not bad | 나쁘지 않아요 | phr | Not bad, thanks. | 나쁘지 않아요, 고마워요. | | '꽤 괜찮다'는 긍정적인 느낌이에요.
great | 아주 좋은, 훌륭한 | adj | That's a great idea! | 그거 좋은 생각이에요!
so-so | 그저 그래요 | phr | The movie was so-so. | 영화는 그저 그랬어요.
nice to meet you | 만나서 반가워요 | phr | Hi, I'm Tom. Nice to meet you. | 안녕하세요, 톰이에요. 만나서 반가워요. | | 대답은 Nice to meet you, too.
please | 부디, ~해 주세요 | adv | Water, please. | 물 주세요. | | 부탁할 때 끝에 붙이면 공손해져요.
you're welcome | 천만에요 | phr | You're welcome. Have a nice day! | 천만에요. 좋은 하루 보내세요!
sorry | 미안해요, 죄송해요 | int | I'm sorry I'm late. | 늦어서 죄송해요. | | 끝을 올려 Sorry?라고 하면 '뭐라고요?'라는 뜻이 돼요.
excuse me | 실례합니다 | phr | Excuse me, where is the restroom? | 실례합니다, 화장실이 어디예요? | | 말을 걸거나 지나갈 때. 잘못해서 사과할 때는 Sorry.
yes | 네, 예 | int | Yes, I'm Korean. | 네, 한국 사람이에요.
no | 아니요 | int | No, thank you. | 아니요, 괜찮아요.
okay | 좋아요, 알겠어요 | int | Okay, see you at six. | 좋아요, 6시에 봐요. | alt=ok
no problem | 문제없어요, 별말씀을요 | phr | No problem. I'm happy to help. | 문제없어요. 기꺼이 도와드릴게요.
welcome | 환영해요, 어서 오세요 | int | Welcome to Korea! | 한국에 오신 걸 환영해요!
congratulations | 축하해요 | int | Congratulations on your new job! | 새 직장 축하해요! | | 줄여서 Congrats!
good luck | 행운을 빌어요 | phr | Good luck on your test! | 시험 잘 봐! | | 한국식 응원 "파이팅!"은 영어로 Good luck! / You can do it!
take care | 잘 지내, 몸조심해 | phr | Bye, take care! | 안녕, 잘 지내!
have a nice day | 좋은 하루 보내세요 | phr | Thank you, and have a nice day! | 고맙습니다, 좋은 하루 보내세요!
long time no see | 오랜만이에요 | phr | Long time no see! How have you been? | 오랜만이야! 어떻게 지냈어?
what's up? | 별일 없어?, 뭐 해? | phr | Hey, what's up? | 야, 별일 없어? | | 친한 사이 인사. 대답은 Not much.(별일 없어)
of course | 물론이죠 | phr | Of course you can! | 물론 돼요!
sure | 그럼요, 물론 | int | Sure, no problem. | 그럼요, 문제없어요.
I see | 그렇군요, 알겠어요 | phr | Oh, I see. Thank you. | 아, 그렇군요. 고마워요.
I don't know | 모르겠어요 | phr | Sorry, I don't know. | 죄송해요, 모르겠어요.
pardon? | 뭐라고요?(다시 말해 달라고) | int | Pardon? Can you say that again? | 네? 다시 말씀해 주시겠어요? | | Sorry?라고 끝을 올려 말해도 돼요.
cheers | 건배!, 고마워(영국) | int | Cheers to our team! | 우리 팀을 위하여, 건배!
bless you | (재채기한 사람에게) 몸조심해요 | phr | Bless you! Do you have a cold? | 블레스 유! 감기 걸렸어요? | | 누가 재채기하면 꼭 해 주는 말이에요. 대답은 Thank you.
wait a minute | 잠깐만요 | phr | Wait a minute, please. | 잠깐만 기다려 주세요.
let's go | 가자! | phr | Let's go! We're late. | 가자! 우리 늦었어.
good job | 잘했어요 | phr | Good job, everyone! | 다들 잘했어요!
how's it going? | 잘 지내?, 어떻게 돼 가? | phr | Hey Mike, how's it going? | 안녕 마이크, 잘 지내?
pretty good | 꽤 좋아요 | phr | I'm pretty good, thanks. | 꽤 좋아요, 고마워요.
me too | 나도요 | phr | Me too! I love pizza. | 나도! 피자 정말 좋아해.
never mind | 신경 쓰지 마세요, 됐어요 | phr | Never mind. It's okay. | 신경 쓰지 마. 괜찮아.
my pleasure | 천만에요(기꺼이 한 일이에요) | phr | It was my pleasure. | 제가 좋아서 한 일인걸요.
sounds good | 좋아요(제안에 대한 대답) | phr | Pizza tonight? Sounds good! | 오늘 밤 피자? 좋아! | | 제안에 '좋아요'라고 할 때 가장 많이 쓰는 말이에요. Sounds great!도 좋아요.
how about | ~ 어때요? | phr | How about Friday? | 금요일 어때요? | | How about + 명사/-ing: How about going to the beach?
`,

  people: `
person | 사람 | n | She is a very nice person. | 그녀는 정말 좋은 사람이에요. | pl=people
people | 사람들 | n | Many people live in Seoul. | 서울에는 많은 사람이 살아요. | plonly
man | 남자, 남성 | n | That man is my teacher. | 저 남자분이 제 선생님이에요. | pl=men
woman | 여자, 여성 | n | The woman is a doctor. | 그 여자분은 의사예요. | pl=women
boy | 남자아이, 소년 | n | The boy is ten years old. | 그 남자아이는 열 살이에요.
girl | 여자아이, 소녀 | n | The little girl is very cute. | 그 어린 여자아이는 정말 귀여워요.
child | 아이, 어린이 | n | They have one child. | 그들은 아이가 하나 있어요. | pl=children
kid | 아이(구어) | n | The kids are playing outside. | 아이들이 밖에서 놀고 있어요.
baby | 아기 | n | The baby is sleeping. | 아기가 자고 있어요.
friend | 친구 | n | Jisu is my best friend. | 지수는 제 가장 친한 친구예요. | | 영어 friend는 나이와 상관없이 써요. 열 살 차이가 나도 친구!
family | 가족 | n | This is my family. | 이쪽은 제 가족이에요.
mother | 어머니, 엄마 | n | This is my mother. | 이분은 제 어머니예요. | alt=mom | 말할 때는 mom(영국 mum)을 많이 써요.
father | 아버지, 아빠 | n | My father works in Busan. | 저희 아버지는 부산에서 일하세요. | alt=dad | 말할 때는 dad.
parents | 부모님 | n | My parents live in Daegu. | 부모님은 대구에 사세요. | plonly
brother | 형제(형·오빠·남동생) | n | I have one brother. | 저는 형제가 한 명 있어요. | | 형·오빠·남동생 모두 brother! 굳이 밝히려면 older/younger brother.
sister | 자매(언니·누나·여동생) | n | My sister is a student. | 제 여동생은 학생이에요. | | 언니·누나·여동생 모두 sister. 서로 이름을 불러요.
son | 아들 | n | Their son is a doctor. | 그들의 아들은 의사예요.
daughter | 딸 | n | My daughter is five. | 제 딸은 다섯 살이에요.
husband | 남편 | n | Her husband is very kind. | 그녀의 남편은 정말 친절해요.
wife | 아내 | n | This is my wife, Mina. | 이쪽은 제 아내 미나예요. | pl=wives
grandmother | 할머니 | n | My grandmother lives with us. | 할머니는 저희와 함께 사세요. | alt=grandma | 외할머니·친할머니 구분 없이 grandmother(grandma).
grandfather | 할아버지 | n | My grandfather is eighty. | 할아버지는 여든이세요. | alt=grandpa
grandparents | 조부모님 | n | We visit our grandparents every summer. | 우리는 여름마다 조부모님 댁에 가요. | plonly
uncle | 삼촌, 이모부, 고모부 | n | My uncle lives in Canada. | 삼촌은 캐나다에 살아요. | | 삼촌·외삼촌·이모부·고모부가 모두 uncle!
aunt | 이모, 고모, 숙모 | n | My aunt is a teacher. | 이모는 선생님이에요. | | 이모·고모·숙모·외숙모가 모두 aunt. 한국어보다 훨씬 단순하죠?
cousin | 사촌 | n | My cousin is the same age as me. | 제 사촌은 저랑 동갑이에요.
boyfriend | 남자친구 | n | Her boyfriend is from Canada. | 그녀의 남자친구는 캐나다 사람이에요.
girlfriend | 여자친구 | n | I'm meeting my girlfriend tonight. | 오늘 밤에 여자친구를 만나요. | | 여성이 동성 친구를 말할 때는 보통 friend라고 해요.
neighbor | 이웃 | n | Our neighbor has a big dog. | 우리 이웃은 큰 개를 키워요. | uk=neighbour
guest | 손님 | n | We have guests tonight. | 오늘 밤에 손님이 와요.
name | 이름 | n | My name is Minsu. | 제 이름은 민수예요.
age | 나이 | n | Age is just a number. | 나이는 숫자에 불과해요. | | 나이는 How old are you?로 물어요. 처음 만난 어른에게 나이를 묻는 건 실례일 수 있어요.
adult | 어른, 성인 | n | One adult and one child, please. | 어른 한 명, 아이 한 명이요.
married | 결혼한 | adj | Are you married? | 결혼하셨어요? | nocmp
single | 미혼인, 하나의 | adj | I'm single. | 저는 미혼이에요. | nocmp
twins | 쌍둥이 | n | They are twins. | 그들은 쌍둥이예요. | plonly
roommate | 룸메이트 | n | My roommate is from Japan. | 제 룸메이트는 일본에서 왔어요.
`,

  jobs: `
job | 직업, 일자리 | n | I love my job. | 저는 제 일이 정말 좋아요.
teacher | 선생님, 교사 | n | My mom is a teacher. | 우리 엄마는 선생님이에요. | | 선생님을 "Teacher!"라고 부르지 않아요. Mr./Ms. + 성(Mr. Smith)으로 불러요.
student | 학생 | n | I'm a university student. | 저는 대학생이에요.
doctor | 의사 | n | I need a doctor. | 의사가 필요해요.
nurse | 간호사 | n | The nurse is very kind. | 그 간호사는 정말 친절해요.
chef | 요리사, 셰프 | n | He is a chef at a hotel. | 그는 호텔 요리사예요. | | cook도 요리사(동사로는 '요리하다').
engineer | 엔지니어, 기술자 | n | She is an engineer. | 그녀는 엔지니어예요.
office worker | 회사원 | n | I'm an office worker. | 저는 회사원이에요. | | '샐러리맨'은 콩글리시. I work at a company.라고 해도 돼요.
police officer | 경찰관 | n | The police officer helped me. | 경찰관이 저를 도와줬어요.
firefighter | 소방관 | n | My uncle is a firefighter. | 삼촌은 소방관이에요.
farmer | 농부 | n | My grandfather was a farmer. | 할아버지는 농부셨어요.
driver | 운전기사, 운전자 | n | The bus driver is friendly. | 그 버스 기사님은 친절해요.
lawyer | 변호사 | n | She wants to be a lawyer. | 그녀는 변호사가 되고 싶어 해요.
singer | 가수 | n | She is a famous singer. | 그녀는 유명한 가수예요.
actor | 배우 | n | He is a famous actor. | 그는 유명한 배우예요. | | 한국어 '탤런트'는 영어로 actor예요. talent는 '재능'이라는 뜻이에요.
artist | 예술가, 화가 | n | My sister is an artist. | 제 언니는 화가예요.
writer | 작가 | n | She is a writer. | 그녀는 작가예요.
designer | 디자이너 | n | I'm a web designer. | 저는 웹 디자이너예요.
dentist | 치과 의사 | n | I'm going to the dentist. | 치과에 가요. | | go to the dentist = 치과에 가다
pilot | 조종사, 기장 | n | My cousin is a pilot. | 제 사촌은 조종사예요.
cashier | 계산원 | n | The cashier is very fast. | 계산원이 아주 빨라요.
server | 종업원, 웨이터 | n | Our server is very friendly. | 우리 테이블 종업원이 정말 친절해요. | alt=waiter | 미국 식당에서는 waiter/waitress보다 server라고 많이 해요.
boss | 상사, 사장 | n | My boss is very busy. | 제 상사는 정말 바빠요.
coworker | 직장 동료 | n | My coworkers are nice. | 제 동료들은 좋아요. | alt=colleague
programmer | 프로그래머 | n | He is a computer programmer. | 그는 컴퓨터 프로그래머예요.
scientist | 과학자 | n | She wants to be a scientist. | 그녀는 과학자가 되고 싶어 해요.
businessman | 사업가 | n | My father is a businessman. | 저희 아버지는 사업가예요. | pl=businessmen
part-time job | 아르바이트 | n | I have a part-time job at a cafe. | 저는 카페에서 아르바이트를 해요. | | '알바(Arbeit)'는 독일어에서 온 말이에요. 영어로는 part-time job.
company | 회사 | n | I work for a big company. | 저는 큰 회사에 다녀요.
office | 사무실 | n | Our office is on the fifth floor. | 우리 사무실은 5층이에요.
`,

  countries: `
Korea | 한국 | n | I'm from Korea. | 저는 한국에서 왔어요. | proper | 정식 명칭은 South Korea. 외국에서는 South Korea라고 하면 더 분명해요.
Korean | 한국의, 한국인, 한국어 | adj | I'm Korean. | 저는 한국 사람이에요. | proper nocmp | 나라는 Korea, 사람·언어는 Korean. 항상 대문자로 써요.
America | 미국 | n | My cousin lives in America. | 제 사촌은 미국에 살아요. | proper alt=the_US/USA | 보통 the US, the States라고도 해요.
American | 미국의, 미국인 | adj | Tom is American. | 톰은 미국 사람이에요. | proper nocmp
English | 영어, 영국의 | n | I'm learning English. | 저는 영어를 배우고 있어요. | proper unc
Japan | 일본 | n | Japan is close to Korea. | 일본은 한국과 가까워요. | proper
Japanese | 일본어, 일본의 | adj | She speaks Japanese. | 그녀는 일본어를 해요. | proper nocmp
China | 중국 | n | China is a very big country. | 중국은 정말 큰 나라예요. | proper
Chinese | 중국어, 중국의 | adj | I like Chinese food. | 저는 중국 음식을 좋아해요. | proper nocmp
Canada | 캐나다 | n | Canada is very cold in winter. | 캐나다는 겨울에 정말 추워요. | proper
Canadian | 캐나다의, 캐나다인 | adj | My teacher is Canadian. | 우리 선생님은 캐나다 사람이에요. | proper nocmp
England | 잉글랜드, 영국 | n | London is in England. | 런던은 잉글랜드에 있어요. | proper | 영국 전체는 the UK, 영국 사람은 British.
British | 영국의, 영국인 | adj | He has a British accent. | 그는 영국식 억양이 있어요. | proper nocmp
Australia | 호주 | n | Australia has kangaroos. | 호주에는 캥거루가 있어요. | proper
France | 프랑스 | n | Paris is in France. | 파리는 프랑스에 있어요. | proper
French | 프랑스어, 프랑스의 | adj | I love French bread. | 저는 프랑스 빵을 좋아해요. | proper nocmp
Germany | 독일 | n | My friend is from Germany. | 제 친구는 독일에서 왔어요. | proper
German | 독일어, 독일의 | adj | German cars are popular. | 독일 차는 인기가 많아요. | proper nocmp
Spain | 스페인 | n | I want to visit Spain. | 스페인에 가 보고 싶어요. | proper
Spanish | 스페인어, 스페인의 | adj | I'm learning Spanish these days. | 요즘 스페인어를 배우고 있어요. | proper nocmp
Vietnam | 베트남 | n | We went to Vietnam on vacation. | 우리는 베트남으로 휴가를 갔어요. | proper
India | 인도 | n | India has many languages. | 인도에는 언어가 많아요. | proper
country | 나라 | n | Which country are you from? | 어느 나라에서 왔어요?
language | 언어 | n | How many languages do you speak? | 몇 개 언어를 하세요?
world | 세계 | n | I want to travel around the world. | 세계 일주를 하고 싶어요.
foreigner | 외국인 | n | Many foreigners visit Seoul. | 많은 외국인이 서울을 찾아요. | | 상대를 직접 foreigner라고 부르면 거리감이 느껴질 수 있어요.
capital | 수도 | n | Seoul is the capital of Korea. | 서울은 한국의 수도예요.
accent | 억양, 말투 | n | Your accent is very good. | 억양이 정말 좋네요.
abroad | 해외에(서) | adv | I want to study abroad. | 해외에서 공부하고 싶어요. | | 앞에 to를 붙이지 않아요: go abroad (×go to abroad)
`,

  numbers: `
zero | 0, 영 | num | My number has three zeros. | 제 번호에는 0이 세 개 있어요. | | 전화번호를 읽을 때 0은 보통 "oh"라고 해요.
one | 1, 하나 | num | I have one sister. | 저는 언니가 한 명 있어요.
two | 2, 둘 | num | Two coffees, please. | 커피 두 잔 주세요.
three | 3, 셋 | num | I have three cats. | 저는 고양이가 세 마리 있어요. | | th는 혀끝을 윗니와 아랫니 사이에 살짝 대고 내요 — '쓰리'보다 혀가 앞으로!
four | 4, 넷 | num | We are a family of four. | 우리는 네 식구예요.
five | 5, 다섯 | num | It's five o'clock. | 5시예요. | | v는 윗니로 아랫입술을 살짝 물고 소리 내요.
six | 6, 여섯 | num | I get up at six. | 저는 6시에 일어나요.
seven | 7, 일곱 | num | There are seven days in a week. | 일주일은 7일이에요.
eight | 8, 여덟 | num | I sleep eight hours a day. | 저는 하루에 8시간 자요.
nine | 9, 아홉 | num | Class starts at nine. | 수업은 9시에 시작해요.
ten | 10, 열 | num | I need ten minutes. | 10분 필요해요.
eleven | 11, 열하나 | num | My brother is eleven. | 남동생은 열한 살이에요.
twelve | 12, 열둘 | num | There are twelve months in a year. | 1년은 12개월이에요.
thirteen | 13, 열셋 | num | She is thirteen years old. | 그녀는 열세 살이에요. | | -teen(13~19)은 뒤에 강세: thir-TEEN. 30 THIR-ty와 헷갈리지 마세요!
fourteen | 14, 열넷 | num | Fourteen people came to the party. | 파티에 14명이 왔어요.
fifteen | 15, 열다섯 | num | It costs fifteen dollars. | 15달러예요.
twenty | 20, 스물 | num | I'm twenty years old. | 저는 스무 살이에요.
thirty | 30, 서른 | num | The bus comes every thirty minutes. | 버스는 30분마다 와요. | | 앞에 강세: THIR-ty. 13(thir-TEEN)과 구분하세요.
forty | 40, 마흔 | num | My dad is forty. | 아빠는 마흔이세요. | | four에서 u가 빠진 forty! 철자 주의.
fifty | 50, 쉰 | num | Fifty people work here. | 여기서 50명이 일해요.
hundred | 100, 백 | num | About a hundred people came. | 100명쯤 왔어요.
thousand | 1,000, 천 | num | This phone costs a thousand dollars. | 이 휴대폰은 천 달러예요. | | 10,000은 ten thousand — 영어에는 '만' 단위가 없어요. 세 자리씩 끊어 읽어요.
million | 100만 | num | Seoul has about ten million people. | 서울에는 약 천만 명이 살아요.
first | 첫 번째의, 처음 | num | This is my first time in New York. | 뉴욕은 이번이 처음이에요.
second | 두 번째의; 초 | num | Turn left at the second corner. | 두 번째 모퉁이에서 왼쪽으로 도세요.
third | 세 번째의 | num | My office is on the third floor. | 제 사무실은 3층이에요.
number | 숫자, 번호 | n | What's your phone number? | 전화번호가 뭐예요?
half | 반, 절반 | n | It's half past three. | 3시 반이에요. | pl=halves | half past = ~시 반
a lot of | 많은 | det | I have a lot of friends. | 저는 친구가 많아요. | | 셀 수 있는 것·없는 것 모두에 써요.
many | (수가) 많은 | det | How many people are there? | 몇 명 있어요? | | 셀 수 있는 명사(people, books)에 써요.
much | (양이) 많은 | det | I don't have much time. | 시간이 별로 없어요. | | 셀 수 없는 명사(time, money)에 써요. 주로 부정문·질문에.
dozen | 12개, 다스 | n | A dozen eggs, please. | 달걀 한 판(12개) 주세요.
`,
};
