// 형식: 영어 | 한국어 뜻 | 품사 | 예문 | 예문 번역 | 플래그 | 메모 (vocab-1.js 참고)

export const RAW3 = {
  city: `
city | 도시 | n | Seoul is a big city. | 서울은 큰 도시예요.
town | 동네, 소도시 | n | I grew up in a small town. | 저는 작은 마을에서 자랐어요.
street | 거리, ~가 | n | There are many cafes on this street. | 이 거리에는 카페가 많아요.
road | 도로, 길 | n | This road is always busy. | 이 도로는 늘 붐벼요.
bank | 은행 | n | Is there a bank near here? | 이 근처에 은행 있어요?
hospital | 병원 | n | My mom works at a hospital. | 엄마는 병원에서 일하세요. | | 큰 병원은 hospital, 동네 의원은 clinic. '병원에 가다'는 보통 go to the doctor.
park | 공원 | n | Let's take a walk in the park. | 공원에서 산책해요.
restaurant | 식당 | n | This restaurant is famous for its pasta. | 이 식당은 파스타로 유명해요.
cafe | 카페 | n | Let's meet at the cafe. | 카페에서 만나요.
convenience store | 편의점 | n | There's a convenience store on the corner. | 모퉁이에 편의점이 있어요.
store | 가게 | n | The store closes at nine. | 가게는 9시에 문을 닫아요. | alt=shop | 미국은 store, 영국은 shop을 많이 써요.
supermarket | 슈퍼마켓 | n | I buy food at the supermarket. | 저는 슈퍼마켓에서 장을 봐요. | alt=grocery_store
mall | 쇼핑몰 | n | Let's go shopping at the mall. | 쇼핑몰에 쇼핑하러 가요.
market | 시장 | n | The market is busy on weekends. | 시장은 주말에 붐벼요.
library | 도서관 | n | I study at the library. | 저는 도서관에서 공부해요.
museum | 박물관, 미술관 | n | The museum is free on Sundays. | 박물관은 일요일에 무료예요.
church | 교회 | n | They go to church on Sundays. | 그들은 일요일마다 교회에 가요.
post office | 우체국 | n | Where's the post office? | 우체국이 어디예요?
police station | 경찰서 | n | Where is the police station? | 경찰서가 어디예요?
movie theater | 영화관 | n | Let's meet in front of the movie theater. | 영화관 앞에서 만나요. | uk=cinema
building | 건물 | n | That building is very tall. | 저 건물은 정말 높아요.
bridge | 다리 | n | There are many bridges in Seoul. | 서울에는 다리가 많아요.
corner | 모퉁이 | n | Turn right at the corner. | 모퉁이에서 오른쪽으로 도세요.
block | 블록, 구역 | n | Go straight for two blocks. | 두 블록 직진하세요. | | 미국 도시는 바둑판 모양이라 길을 블록 단위로 알려 줘요.
map | 지도 | n | Can you show me on the map? | 지도에서 보여 줄 수 있어요?
here | 여기, 여기에 | adv | Come here, please. | 이리 와 주세요.
there | 거기, 저기 | adv | The bank is over there. | 은행은 저기 있어요.
near | ~ 가까이에, 가까운 | prep | Is there a cafe near here? | 이 근처에 카페 있어요?
far | 먼, 멀리 | adj | Is it far from here? | 여기서 멀어요?
downtown | 시내에, 도심 | adv | Let's go downtown. | 시내에 가자. | | go downtown처럼 앞에 to를 쓰지 않아요.
neighborhood | 동네 | n | I like my neighborhood. | 저는 우리 동네가 좋아요. | uk=neighbourhood
parking lot | 주차장 | n | The parking lot is full. | 주차장이 꽉 찼어요. | uk=car_park
crosswalk | 횡단보도 | n | Cross at the crosswalk. | 횡단보도로 건너세요.
traffic light | 신호등 | n | Stop at the traffic light. | 신호등에서 멈추세요.
restroom | (공공) 화장실 | n | Excuse me, where's the restroom? | 실례지만 화장실이 어디예요? | | 미국 식당·가게 화장실은 restroom이라고 하는 게 가장 자연스러워요.
ATM | 현금인출기 | n | Is there an ATM near here? | 이 근처에 현금인출기 있어요?
`,

  transport: `
bus | 버스 | n | I go to work by bus. | 저는 버스로 출근해요.
subway | 지하철 | n | The subway is fast and cheap. | 지하철은 빠르고 싸요. | uk=underground | 런던 지하철은 the Underground(the Tube)라고 해요.
taxi | 택시 | n | Let's take a taxi. | 택시 타자. | alt=cab
train | 기차 | n | The train leaves at ten. | 기차는 10시에 출발해요.
airport | 공항 | n | How do I get to the airport? | 공항에 어떻게 가요?
station | 역 | n | The station is next to the bank. | 역은 은행 옆에 있어요.
bus stop | 버스 정류장 | n | Where is the bus stop? | 버스 정류장이 어디예요?
ticket | 표, 티켓 | n | One ticket to Busan, please. | 부산행 표 한 장 주세요.
car | 자동차 | n | I have a small car. | 저는 작은 차가 있어요.
bike | 자전거 | n | I ride my bike to school. | 저는 자전거로 학교에 가요. | alt=bicycle
plane | 비행기 | n | The plane is late. | 비행기가 늦어요. | alt=airplane
ship | 배 | n | We went to Jeju by ship. | 우리는 배를 타고 제주에 갔어요.
by | ~로(교통수단); ~ 옆에 | prep | I go to school by subway. | 저는 지하철로 학교에 가요. | | by + 교통수단(관사 없이): by bus, by car. 걸어서는 on foot.
left | 왼쪽; 왼쪽으로 | n | Turn left at the corner. | 모퉁이에서 왼쪽으로 도세요.
right | 오른쪽; 오른쪽으로 | n | It's on your right. | 오른쪽에 있어요. | | '옳은'이라는 뜻도 있어요: You're right!(맞아!)
straight | 똑바로, 곧장 | adv | Go straight for two blocks. | 두 블록 직진하세요.
turn | 돌다 | v | Turn right at the light. | 신호등에서 오른쪽으로 도세요.
stop | 멈추다, 세우다; 정류장 | v | Stop here, please. | 여기서 세워 주세요.
passport | 여권 | n | Here's my passport. | 여기 제 여권이요.
hotel | 호텔 | n | I'm staying at a hotel downtown. | 시내 호텔에 묵고 있어요.
trip | 여행 | n | Have a nice trip! | 즐거운 여행 되세요! | | trip은 명사(여행), travel은 주로 동사(여행하다). ×Have a nice travel!
travel | 여행하다 | v | I love to travel. | 저는 여행을 정말 좋아해요.
suitcase | 여행 가방, 캐리어 | n | My suitcase is too heavy. | 제 캐리어가 너무 무거워요. | | '캐리어'는 콩글리시! suitcase 또는 luggage라고 해요.
luggage | 짐, 수하물 | n | How much luggage do you have? | 짐이 얼마나 되세요? | unc | 셀 수 없어요: a piece of luggage
reservation | 예약 | n | I have a reservation. | 예약했어요. | | make a reservation = 예약하다 (book도 같은 뜻)
check in | 체크인하다, 탑승 수속하다 | v | I'd like to check in, please. | 체크인하고 싶어요.
check out | 체크아웃하다 | v | I'd like to check out, please. | 체크아웃할게요.
visit | 방문하다 | v | We visit my grandparents every summer. | 우리는 여름마다 조부모님 댁에 가요.
vacation | 휴가, 방학 | n | We went to the beach on vacation. | 우리는 휴가 때 바닷가에 갔어요. | uk=holiday
tour | 관광, 투어 | n | We took a city tour. | 시티 투어를 했어요.
tourist | 관광객 | n | This area is full of tourists. | 이 지역은 관광객으로 가득해요.
seat | 자리, 좌석 | n | Is this seat taken? | 이 자리 주인 있어요?
window seat | 창가 자리 | n | Can I have a window seat? | 창가 자리로 주시겠어요? | | 통로 쪽 자리는 aisle seat [아일 씨트] — s를 발음하지 않아요!
flight | 비행, 항공편 | n | My flight is at seven in the morning. | 제 비행기는 아침 7시예요.
gate | 탑승구 | n | Please go to gate twelve. | 12번 탑승구로 가세요.
traffic | 교통(량) | n | There's a lot of traffic today. | 오늘 차가 많이 막혀요. | unc | 차가 막히다 = traffic is heavy / I'm stuck in traffic.
driver's license | 운전면허증 | n | Can I see your driver's license? | 운전면허증 좀 보여 주시겠어요?
gas station | 주유소 | n | Is there a gas station near here? | 이 근처에 주유소 있어요? | uk=petrol_station | '주유'의 기름은 gas(미국)·petrol(영국)
transfer | 갈아타다 | v | Transfer to line two at City Hall. | 시청에서 2호선으로 갈아타세요.
miss | 놓치다; 그리워하다 | v | Hurry, or we'll miss the bus! | 서둘러, 안 그러면 버스 놓쳐! | | I miss you.(보고 싶어)의 miss와 같은 단어예요.
arrive | 도착하다 | v | What time does the train arrive? | 기차는 몇 시에 도착해요? | | arrive at + 건물·역, arrive in + 도시·나라
get on | (버스·지하철에) 타다 | v | Get on the bus here. | 여기서 버스를 타세요. | | 버스·지하철·비행기는 get on/off, 승용차·택시는 get in/out of.
get off | 내리다 | v | Get off at the next stop. | 다음 정류장에서 내리세요.
line | 줄; (지하철) 노선 | n | Take line two. | 2호선을 타세요.
`,

  body: `
body | 몸 | n | Exercise is good for your body. | 운동은 몸에 좋아요.
head | 머리 | n | My head hurts. | 머리가 아파요.
face | 얼굴 | n | Wash your face. | 세수해.
eye | 눈 | n | She has big eyes. | 그녀는 눈이 커요.
ear | 귀 | n | My ears are cold. | 귀가 시려요.
nose | 코 | n | I have a runny nose. | 콧물이 나요.
mouth | 입 | n | Open your mouth, please. | 입을 벌려 주세요. | | th 발음 [마우쓰] — mouse(쥐) [마우스]와 구분해요!
tooth | 이, 치아 | n | I brush my teeth three times a day. | 저는 하루에 세 번 이를 닦아요. | pl=teeth
hair | 머리카락 | n | She has long hair. | 그녀는 머리가 길어요. | unc | 머리카락 전체는 셀 수 없어요 (×hairs).
hand | 손 | n | Wash your hands before dinner. | 저녁 먹기 전에 손 씻어.
arm | 팔 | n | My arm hurts. | 팔이 아파요.
leg | 다리 | n | My legs are tired. | 다리가 피곤해요.
foot | 발 | n | My feet hurt. | 발이 아파요. | pl=feet
back | 등, 허리 | n | My back hurts. | 허리가 아파요. | | 허리 통증도 보통 back pain이라고 해요.
stomach | 배, 위 | n | My stomach hurts. | 배가 아파요.
shoulder | 어깨 | n | My shoulders are stiff. | 어깨가 뻐근해요.
neck | 목 | n | I have a pain in my neck. | 목이 아파요. | | 목 안쪽(목구멍)은 throat.
throat | 목구멍 | n | My throat hurts. | 목이 아파요.
heart | 심장, 마음 | n | My heart is beating fast. | 심장이 빨리 뛰어요.
headache | 두통 | n | I have a headache. | 머리가 아파요. | | 증상은 have a + 증상: have a headache / a fever / a cold
stomachache | 복통 | n | I have a stomachache. | 배가 아파요.
fever | 열 | n | I have a fever. | 열이 나요.
cold | 감기 | n | I have a cold. | 감기에 걸렸어요. | | '추운'의 cold와 같은 단어예요. catch a cold = 감기에 걸리다
cough | 기침 | n | I have a bad cough. | 기침이 심해요.
sore throat | 인후통, 목 아픔 | n | I have a sore throat. | 목이 아파요.
runny nose | 콧물 | n | I have a runny nose. | 콧물이 나요.
hurt | 아프다, 다치게 하다 | v | My leg hurts. | 다리가 아파요. | | 아픈 부위가 주어예요: My head hurts.
sick | 아픈 | adj | I feel sick today. | 오늘 몸이 안 좋아요. | | 미국에서 sick은 '아픈'. 영국에서는 '토할 것 같은'이라는 뜻도 있어요.
pharmacy | 약국 | n | Is there a pharmacy near here? | 이 근처에 약국 있어요? | alt=drugstore
medicine | 약 | n | Take this medicine after meals. | 이 약은 식후에 드세요. | unc | 약을 먹다 = take medicine (×eat medicine)
pill | 알약 | n | Take two pills a day. | 하루에 두 알 드세요.
appointment | (병원 등의) 예약, 약속 | n | I have a doctor's appointment. | 병원 예약이 있어요. | | 식당·호텔은 reservation, 병원·미용실은 appointment.
allergy | 알레르기 | n | I have a peanut allergy. | 저는 땅콩 알레르기가 있어요.
prescription | 처방전 | n | Do you have a prescription? | 처방전 있으세요?
emergency | 응급 상황, 비상 | n | Call nine one one! It's an emergency! | 911에 전화해요! 응급 상황이에요! | | 미국 긴급 전화는 911 (nine one one).
feel | 느끼다, (몸 상태가) ~하다 | v | I don't feel well. | 몸이 좀 안 좋아요. | | '컨디션이 안 좋아요'는 I don't feel well.
healthy | 건강한 | adj | Eat healthy food. | 건강한 음식을 드세요.
health | 건강 | n | Health is the most important thing. | 건강이 가장 중요해요. | unc
gym | 헬스장, 체육관 | n | I go to the gym three times a week. | 저는 일주일에 세 번 헬스장에 가요. | | '헬스장'은 gym! health는 '건강'이라는 뜻이에요.
diet | 식단; 다이어트 | n | I'm on a diet. | 저 다이어트 중이에요.
weight | 몸무게 | n | I want to lose weight. | 살을 빼고 싶어요. | unc | lose weight 살을 빼다 · gain weight 살이 찌다
stress | 스트레스 | n | I have a lot of stress at work. | 직장에서 스트레스가 많아요. | unc
relax | 쉬다, 긴장을 풀다 | v | Relax and take a deep breath. | 긴장 풀고 숨을 깊이 쉬어요.
rest | 쉬다; 휴식 | v | You should rest at home. | 집에서 쉬는 게 좋겠어요.
exercise | 운동하다; 운동 | v | I exercise every morning. | 저는 매일 아침 운동해요.
jog | 조깅하다 | v | I jog in the park. | 저는 공원에서 조깅해요.
habit | 습관 | n | Reading is a good habit. | 독서는 좋은 습관이에요.
`,

  clothes: `
clothes | 옷 | n | I need new clothes. | 새 옷이 필요해요. | plonly | th 발음이 어려워 [클로우즈]처럼 말해도 통해요.
shirt | 셔츠 | n | I like this blue shirt. | 이 파란 셔츠가 마음에 들어요. | | '와이셔츠'는 dress shirt, '티'는 T-shirt.
T-shirt | 티셔츠 | n | This T-shirt is too small. | 이 티셔츠는 너무 작아요.
pants | 바지 | n | These pants are too long. | 이 바지는 너무 길어요. | plonly uk=trousers | 늘 복수: a pair of pants. 영국에서 pants는 '속옷'이니 주의!
jeans | 청바지 | n | I always wear jeans. | 저는 항상 청바지를 입어요. | plonly
shorts | 반바지 | n | It's hot. Wear shorts. | 더워. 반바지 입어. | plonly
skirt | 치마 | n | She's wearing a red skirt. | 그녀는 빨간 치마를 입고 있어요.
dress | 원피스, 드레스 | n | That dress looks good on you. | 그 원피스 잘 어울려요. | | '원피스'는 콩글리시! 영어로는 dress.
jacket | 재킷, 점퍼 | n | Take a jacket. It's cold. | 재킷 가져가. 추워. | | 한국어 '점퍼'는 jacket이에요.
coat | 코트 | n | Put on your coat. | 코트 입어.
sweater | 스웨터 | n | This sweater is warm. | 이 스웨터는 따뜻해요.
hoodie | 후드티 | n | I love my gray hoodie. | 저는 제 회색 후드티가 정말 좋아요. | | '후드티'는 hoodie라고 해요.
shoes | 신발 | n | These shoes are nice. | 이 신발 예쁘네요. | plonly
sneakers | 운동화 | n | I need new sneakers. | 새 운동화가 필요해요. | plonly
socks | 양말 | n | Where are my socks? | 내 양말 어디 있지? | plonly
hat | 모자(챙이 둘린) | n | Wear a hat. The sun is strong. | 모자 써. 햇볕이 강해. | | 야구 모자는 cap.
glasses | 안경 | n | She wears glasses. | 그녀는 안경을 써요. | plonly | 늘 복수: a pair of glasses. 안경을 쓰다 = wear glasses
size | 크기, 사이즈 | n | Do you have this in a bigger size? | 이거 더 큰 사이즈 있어요?
price | 가격 | n | The price is too high. | 가격이 너무 비싸요.
how much | 얼마 | phr | How much is this? | 이거 얼마예요? | | 양·가격은 How much, 개수는 How many.
dollar | 달러 | n | It's ten dollars. | 10달러예요.
cent | 센트 | n | It costs ninety-nine cents. | 99센트예요.
cheap | 싼 | adj | This bag is really cheap. | 이 가방 정말 싸요.
expensive | 비싼 | adj | That's too expensive. | 그건 너무 비싸요.
buy | 사다 | v | I want to buy a new phone. | 새 휴대폰을 사고 싶어요.
pay | 돈을 내다, 지불하다 | v | Can I pay by card? | 카드로 계산해도 돼요?
sale | 할인 판매 | n | Everything is on sale today. | 오늘은 모두 할인 중이에요. | | on sale = 할인 중, for sale = 판매 중
discount | 할인 | n | Can I get a discount? | 할인받을 수 있어요?
cash | 현금 | n | Can I pay in cash? | 현금으로 내도 돼요? | unc
credit card | 신용카드 | n | Can I pay by credit card? | 신용카드로 계산해도 돼요?
receipt | 영수증 | n | Can I have a receipt? | 영수증 주시겠어요? | | p를 발음하지 않아요: [리씨트].
fitting room | 탈의실 | n | Where's the fitting room? | 탈의실이 어디예요?
try on | 입어 보다 | v | Can I try it on? | 입어 봐도 돼요? | | 대명사는 가운데에: try it on (×try on it)
wear | 입다, 쓰다, 신다 | v | I wear glasses. | 저는 안경을 써요. | | 옷·신발·안경·모자·시계 모두 wear!
shopping | 쇼핑 | n | Let's go shopping. | 쇼핑하러 가자. | unc | '아이쇼핑'은 window-shopping이라고 해요.
just looking | 그냥 둘러보는 중 | phr | I'm just looking, thanks. | 그냥 둘러보는 중이에요, 고마워요. | | 점원이 Can I help you? 하고 물을 때 쓰는 말이에요.
`,

  colors: `
color | 색깔 | n | What's your favorite color? | 가장 좋아하는 색이 뭐예요? | uk=colour
red | 빨간색, 빨간 | adj | I want a red jacket. | 빨간 재킷을 원해요. | nocmp
blue | 파란색, 파란 | adj | The sky is blue. | 하늘이 파래요. | nocmp
black | 검은색, 검은 | adj | Do you have this in black? | 이거 검은색 있어요? | nocmp
white | 흰색, 흰 | adj | I want white pants. | 흰 바지를 원해요. | nocmp
yellow | 노란색, 노란 | adj | Bananas are yellow. | 바나나는 노란색이에요. | nocmp
green | 초록색, 초록의 | adj | Green tea is good for you. | 녹차는 몸에 좋아요. | nocmp
orange | 주황색, 주황의 | adj | The leaves turn orange in fall. | 가을엔 잎이 주황색으로 변해요. | id=orange_color nocmp
pink | 분홍색, 분홍의 | adj | She loves pink. | 그녀는 분홍색을 좋아해요. | nocmp
purple | 보라색, 보라의 | adj | Purple is my favorite color. | 보라색은 제가 가장 좋아하는 색이에요. | nocmp
brown | 갈색, 갈색의 | adj | He has brown eyes. | 그는 갈색 눈이에요. | nocmp
gray | 회색, 회색의 | adj | It's gray and cloudy today. | 오늘은 흐리고 잿빛이에요. | nocmp uk=grey
gold | 금, 금색 | n | Is this real gold? | 이거 진짜 금이에요? | unc
silver | 은, 은색 | n | I like silver more than gold. | 저는 금보다 은이 좋아요. | unc
dark | 어두운, 짙은 | adj | It's dark outside. | 밖이 어두워요.
light | 연한, 밝은; 가벼운 | adj | I want light blue. | 연한 파란색이 좋아요. | id=light_adj
`,
};
