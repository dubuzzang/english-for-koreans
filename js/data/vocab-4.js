// 형식: 영어 | 한국어 뜻 | 품사 | 예문 | 예문 번역 | 플래그 | 메모 (vocab-1.js 참고)

export const RAW4 = {
  nature: `
weather | 날씨 | n | How's the weather today? | 오늘 날씨 어때요? | unc
sun | 해, 햇볕 | n | The sun is very strong today. | 오늘 햇볕이 정말 강해요.
rain | 비가 오다; 비 | v | It's raining now. | 지금 비가 와요. | | 날씨는 it을 주어로 써요: It's raining. It's cold.
snow | 눈이 오다; 눈 | v | It snows a lot in winter. | 겨울엔 눈이 많이 와요.
wind | 바람 | n | The wind is very strong. | 바람이 정말 세요.
cloud | 구름 | n | There are no clouds in the sky. | 하늘에 구름 한 점 없어요.
sunny | 맑은, 화창한 | adj | It's sunny today. | 오늘은 화창해요.
cloudy | 흐린 | adj | It's cloudy and cold. | 흐리고 추워요.
rainy | 비 오는 | adj | I don't like rainy days. | 저는 비 오는 날이 싫어요.
windy | 바람 부는 | adj | It's windy outside. | 밖에 바람이 불어요.
cold | 추운, 차가운 | adj | It's so cold today! | 오늘 너무 추워요! | id=cold_adj
warm | 따뜻한 | adj | It's warm in spring. | 봄에는 따뜻해요.
cool | 시원한; 멋진 | adj | It's cool in the evening. | 저녁엔 시원해요. | | 구어로는 '멋진'이라는 뜻도: That's cool!
humid | 습한 | adj | Korean summers are hot and humid. | 한국의 여름은 덥고 습해요. | cmp=more
spring | 봄 | n | Spring is my favorite season. | 봄은 제가 가장 좋아하는 계절이에요.
summer | 여름 | n | We go to the beach in summer. | 우리는 여름에 바닷가에 가요.
fall | 가을 | n | The leaves are beautiful in fall. | 가을엔 단풍이 아름다워요. | alt=autumn | 미국은 fall, 영국은 autumn을 많이 써요.
winter | 겨울 | n | It snows in winter. | 겨울엔 눈이 와요.
season | 계절 | n | Korea has four seasons. | 한국은 사계절이 있어요.
temperature | 온도, 기온 | n | The temperature is below zero. | 기온이 영하예요. | | 미국은 화씨(°F)를 써요. 32°F가 0°C예요.
sky | 하늘 | n | The sky is clear today. | 오늘은 하늘이 맑아요.
mountain | 산 | n | Let's climb the mountain. | 산에 올라가요.
river | 강 | n | The Han River is beautiful at night. | 한강은 밤에 아름다워요.
sea | 바다 | n | I want to swim in the sea. | 바다에서 수영하고 싶어요.
beach | 해변, 바닷가 | n | Let's go to the beach. | 바닷가에 가자.
lake | 호수 | n | There's a lake near my house. | 우리 집 근처에 호수가 있어요.
island | 섬 | n | Jeju is a beautiful island. | 제주는 아름다운 섬이에요. | | s를 발음하지 않아요: [아일런드].
tree | 나무 | n | There's a big tree in the park. | 공원에 큰 나무가 있어요.
flower | 꽃 | n | These flowers smell nice. | 이 꽃들은 향기가 좋아요.
forest | 숲 | n | We walked in the forest. | 우리는 숲속을 걸었어요.
nature | 자연 | n | I love nature. | 저는 자연을 사랑해요. | unc
air | 공기 | n | The air is fresh here. | 여기는 공기가 상쾌해요. | unc
fine dust | 미세먼지 | n | The fine dust is bad today. | 오늘 미세먼지가 심해요. | unc | air pollution(대기 오염)이라고도 해요.
`,

  animals: `
animal | 동물 | n | Do you like animals? | 동물 좋아해요?
dog | 개 | n | I have a dog. | 저는 개를 키워요.
cat | 고양이 | n | My cat sleeps all day. | 우리 고양이는 하루 종일 자요.
pet | 반려동물 | n | Do you have any pets? | 반려동물 키워요?
bird | 새 | n | The birds are singing. | 새들이 노래하고 있어요.
horse | 말 | n | Can you ride a horse? | 말 탈 줄 알아요?
cow | 소 | n | Cows give us milk. | 소는 우리에게 우유를 줘요.
pig | 돼지 | n | Pigs are smart animals. | 돼지는 똑똑한 동물이에요.
rabbit | 토끼 | n | The rabbit is eating a carrot. | 토끼가 당근을 먹고 있어요.
mouse | 쥐 | n | There's a mouse in the kitchen! | 부엌에 쥐가 있어! | pl=mice
tiger | 호랑이 | n | Tigers are big cats. | 호랑이는 큰 고양잇과 동물이에요.
lion | 사자 | n | The lion is the king of animals. | 사자는 동물의 왕이에요.
bear | 곰 | n | There are bears in this forest. | 이 숲에는 곰이 있어요.
monkey | 원숭이 | n | The monkey is very funny. | 그 원숭이는 정말 웃겨요.
elephant | 코끼리 | n | Elephants have long noses. | 코끼리는 코가 길어요.
snake | 뱀 | n | I'm afraid of snakes. | 저는 뱀이 무서워요.
duck | 오리 | n | There are ducks on the lake. | 호수에 오리들이 있어요.
sheep | 양 | n | The sheep are eating grass. | 양들이 풀을 먹고 있어요. | pl=sheep | 복수도 sheep 그대로예요.
puppy | 강아지 | n | What a cute puppy! | 정말 귀여운 강아지네요!
kitten | 새끼 고양이 | n | The kitten is playing with a ball. | 아기 고양이가 공을 가지고 놀고 있어요.
zoo | 동물원 | n | Let's go to the zoo. | 동물원에 가요.
insect | 곤충, 벌레 | n | I don't like insects. | 저는 벌레가 싫어요. | alt=bug
dolphin | 돌고래 | n | Dolphins are very smart. | 돌고래는 정말 똑똑해요.
`,

  adjectives: `
big | 큰 | adj | This bag is too big. | 이 가방은 너무 커요.
small | 작은 | adj | My room is small. | 제 방은 작아요.
tall | 키가 큰, 높은 | adj | He is very tall. | 그는 키가 정말 커요.
short | 짧은, 키가 작은 | adj | She has short hair. | 그녀는 머리가 짧아요.
long | 긴 | adj | The movie was too long. | 영화가 너무 길었어요.
old | 나이 든; 오래된 | adj | This building is very old. | 이 건물은 정말 오래됐어요. | | 반대말: young(사람이 젊은), new(물건이 새로운)
young | 어린, 젊은 | adj | My parents look young. | 저희 부모님은 젊어 보이세요.
new | 새로운 | adj | I bought a new phone. | 새 휴대폰을 샀어요.
good | 좋은 | adj | This is a good book. | 이거 좋은 책이에요.
bad | 나쁜 | adj | The weather is bad today. | 오늘 날씨가 안 좋아요.
nice | 좋은, 친절한, 멋진 | adj | She is very nice. | 그녀는 정말 친절해요.
beautiful | 아름다운 | adj | What a beautiful day! | 정말 아름다운 날이에요!
pretty | 예쁜; 꽤 | adj | She has a pretty smile. | 그녀는 미소가 예뻐요. | | 부사로는 '꽤': pretty good(꽤 좋은)
cute | 귀여운 | adj | Your puppy is so cute! | 강아지 정말 귀엽다!
handsome | 잘생긴 | adj | Her brother is handsome. | 그녀의 오빠는 잘생겼어요. | cmp=more
fast | 빠른; 빨리 | adj | The subway is fast. | 지하철은 빨라요.
slow | 느린 | adj | The internet is slow today. | 오늘 인터넷이 느려요.
easy | 쉬운 | adj | This question is easy. | 이 문제는 쉬워요.
difficult | 어려운 | adj | English grammar is difficult. | 영어 문법은 어려워요. | alt=hard
hard | 어려운; 딱딱한 | adj | This bread is hard. | 이 빵은 딱딱해요. | | 부사로는 '열심히': work hard
important | 중요한 | adj | This meeting is very important. | 이 회의는 정말 중요해요.
popular | 인기 있는 | adj | K-pop is popular around the world. | 케이팝은 전 세계에서 인기가 있어요.
famous | 유명한 | adj | This restaurant is famous. | 이 식당은 유명해요.
interesting | 흥미로운, 재미있는 | adj | This book is interesting. | 이 책은 흥미로워요. | | 사물이 흥미로우면 interesting, 내가 흥미를 느끼면 interested.
boring | 지루한 | adj | The movie was boring. | 영화가 지루했어요. | | 내가 지루하면 I'm bored. (I'm boring은 '나는 지루한 사람이야'!)
fun | 즐거운, 재미있는 | adj | The party was really fun. | 파티는 정말 재미있었어요. | cmp=more | fun은 '즐거운', funny는 '웃기는'.
busy | 바쁜 | adj | I'm busy right now. | 지금 바빠요.
free | 한가한; 무료의 | adj | Are you free tonight? | 오늘 밤에 시간 있어요? | nocmp | '무료'라는 뜻도 있어요: It's free.(공짜예요)
clean | 깨끗한 | adj | My room is clean. | 제 방은 깨끗해요.
dirty | 더러운 | adj | My shoes are dirty. | 제 신발이 더러워요.
quiet | 조용한 | adj | The library is quiet. | 도서관은 조용해요. | cmp=er
noisy | 시끄러운 | adj | This street is noisy. | 이 거리는 시끄러워요. | alt=loud
safe | 안전한 | adj | Seoul is a safe city. | 서울은 안전한 도시예요.
dangerous | 위험한 | adj | It's dangerous to swim here. | 여기서 수영하는 건 위험해요.
rich | 부유한, 부자인 | adj | He is very rich. | 그는 정말 부자예요.
poor | 가난한; 불쌍한 | adj | The poor dog is cold. | 불쌍한 강아지가 추워해요.
strong | 강한, 힘센 | adj | He is very strong. | 그는 정말 힘이 세요.
weak | 약한 | adj | I feel weak today. | 오늘 기운이 없어요.
heavy | 무거운 | adj | This box is heavy. | 이 상자는 무거워요.
empty | 빈 | adj | The bottle is empty. | 병이 비었어요. | nocmp
open | 열린, 영업 중인 | adj | Is the store open now? | 가게 지금 열었어요? | nocmp
closed | 닫힌, 영업 끝난 | adj | The bank is closed on Sundays. | 은행은 일요일에 문을 닫아요. | nocmp
right | 옳은, 맞는 | adj | You're right! | 네 말이 맞아! | id=right_adj nocmp
wrong | 틀린, 잘못된 | adj | Sorry, wrong number. | 죄송해요, 전화 잘못 걸었어요. | nocmp
same | 같은 | adj | We are the same age. | 우리는 나이가 같아요. | nocmp
different | 다른 | adj | Korean and English are very different. | 한국어와 영어는 정말 달라요.
comfortable | 편안한 | adj | These shoes are comfortable. | 이 신발은 편해요.
convenient | 편리한 | adj | The subway is very convenient. | 지하철은 정말 편리해요.
crowded | 붐비는 | adj | The subway is crowded in the morning. | 아침에는 지하철이 붐벼요.
special | 특별한 | adj | Today is a special day. | 오늘은 특별한 날이에요.
perfect | 완벽한 | adj | Your English is perfect! | 영어 완벽하네요! | nocmp
wonderful | 멋진, 훌륭한 | adj | We had a wonderful time. | 정말 즐거운 시간을 보냈어요.
amazing | 놀라운, 굉장한 | adj | The view is amazing! | 경치가 끝내줘요!
terrible | 끔찍한, 형편없는 | adj | The traffic was terrible. | 교통이 끔찍했어요.
high | 높은 | adj | Prices are high here. | 여기는 물가가 높아요.
low | 낮은 | adj | The price is low. | 가격이 낮아요.
wide | 넓은 | adj | The road is wide. | 길이 넓어요.
narrow | 좁은 | adj | This street is very narrow. | 이 길은 정말 좁아요. | cmp=er
thick | 두꺼운 | adj | This book is very thick. | 이 책은 정말 두꺼워요.
thin | 얇은, 마른 | adj | He is tall and thin. | 그는 키가 크고 말랐어요.
soft | 부드러운, 푹신한 | adj | This bed is soft. | 이 침대는 푹신해요.
wet | 젖은 | adj | My shoes are wet. | 신발이 젖었어요.
dry | 마른, 건조한 | adj | The air is very dry. | 공기가 정말 건조해요.
fresh | 신선한 | adj | These vegetables are fresh. | 이 채소들은 신선해요.
ready | 준비된 | adj | Are you ready? | 준비됐어요? | nocmp
possible | 가능한 | adj | Is it possible? | 그게 가능해요? | nocmp
true | 사실인 | adj | Is that true? | 그거 사실이에요? | nocmp
careful | 조심하는 | adj | Be careful! | 조심해!
favorite | 가장 좋아하는 | adj | What's your favorite food? | 가장 좋아하는 음식이 뭐예요? | nocmp uk=favourite | favorite 자체가 '가장 좋아하는'이라 most를 붙이지 않아요.
real | 진짜의 | adj | Is this real gold? | 이거 진짜 금이에요? | nocmp
excellent | 훌륭한 | adj | Your English is excellent. | 영어 실력이 훌륭하네요. | nocmp
large | 큰 | adj | A large coffee, please. | 커피 큰 사이즈로 주세요. | | 사이즈: small · medium · large
best | 가장 좋은, 최고의 | adj | This is the best pizza in town. | 여기가 이 동네 최고의 피자예요. | nocmp | good – better – best
worst | 가장 나쁜, 최악의 | adj | That was the worst movie ever. | 그건 최악의 영화였어요. | nocmp | bad – worse – worst
most | 가장 (많은) | adv | She is the most popular student. | 그녀는 가장 인기 있는 학생이에요. | | 긴 형용사의 최상급: the most + 형용사
in the world | 세계에서 | phr | It's the tallest building in the world. | 세계에서 가장 높은 건물이에요. | | 최상급 뒤에 범위: in the world, in my class, of all
cozy | 아늑한 | adj | This cafe is cozy. | 이 카페는 아늑해요.
`,

  emotions: `
happy | 행복한, 기쁜 | adj | I'm so happy today. | 오늘 정말 행복해요.
sad | 슬픈 | adj | Why are you sad? | 왜 슬퍼요?
angry | 화난 | adj | Are you angry with me? | 나한테 화났어요?
tired | 피곤한 | adj | I'm really tired today. | 오늘 정말 피곤해요.
bored | 지루해하는, 심심한 | adj | I'm bored. Let's go out. | 심심해. 나가자. | | 내가 심심할 땐 I'm bored. (I'm boring ×)
excited | 신이 난, 들뜬 | adj | I'm so excited about the trip! | 여행 생각에 정말 신나요!
nervous | 긴장한, 떨리는 | adj | I'm nervous about the interview. | 면접 때문에 긴장돼요.
worried | 걱정하는 | adj | I'm worried about my test. | 시험이 걱정돼요.
scared | 무서워하는 | adj | I'm scared of the dark. | 저는 어둠이 무서워요. | alt=afraid
surprised | 놀란 | adj | I was surprised by the news. | 그 소식에 놀랐어요.
glad | 기쁜, 반가운 | adj | I'm glad to see you. | 만나서 기뻐요.
lonely | 외로운 | adj | I feel lonely sometimes. | 가끔 외로워요.
upset | 속상한 | adj | She's upset because she lost her phone. | 그녀는 휴대폰을 잃어버려서 속상해요. | cmp=more
proud | 자랑스러운 | adj | I'm proud of you. | 네가 자랑스러워.
kind | 친절한 | adj | Thank you. You're very kind. | 고마워요. 정말 친절하시네요.
funny | 웃긴 | adj | My brother is really funny. | 우리 오빠는 정말 웃겨요. | | 웃기는 건 funny, 즐거운 건 fun.
smart | 똑똑한 | adj | She is very smart. | 그녀는 정말 똑똑해요.
shy | 수줍은 | adj | He is shy at first. | 그는 처음엔 수줍어해요.
friendly | 친근한, 다정한 | adj | Everyone here is friendly. | 여기 사람들은 다 친절해요. | | 끝이 -ly지만 형용사예요.
lazy | 게으른 | adj | I'm lazy on Sundays. | 일요일엔 게을러져요.
honest | 정직한, 솔직한 | adj | Please be honest with me. | 나한테 솔직하게 말해 줘. | cmp=more | h를 발음하지 않아요: an honest man
polite | 예의 바른 | adj | Thank you for being so polite. | 정중하게 대해 주셔서 고마워요. | cmp=more
calm | 침착한, 차분한 | adj | Stay calm. | 침착해. | | l을 발음하지 않아요: [캄].
feeling | 감정, 기분 | n | I know the feeling. | 그 기분 알아요.
mood | 기분 | n | I'm in a good mood today. | 오늘 기분이 좋아요.
fine | 괜찮은 | adj | Don't worry. I'm fine. | 걱정 마. 난 괜찮아. | nocmp
curly | 곱슬곱슬한 | adj | She has curly hair. | 그녀는 곱슬머리예요.
interested | 관심 있는 | adj | I'm interested in history. | 저는 역사에 관심이 있어요. | | interested in ~ = ~에 관심이 있다
`,
};
