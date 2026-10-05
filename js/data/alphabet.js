// 영어 알파벳 26자 — 한국어 화자 기준 설명
// say: 녹음으로 읽을 글자(이름), name: 글자 이름, ko: 대표 소리(한글 근사), tip: 한국인 포인트, special: 한국인이 특히 주의할 소리

export const LETTERS = [
  { up: 'A', lo: 'a', say: 'A', name: '에이', ko: 'ㅐ · 에이 · ㅏ', ipa: 'æ · eɪ · ɑ', ex: [['apple', '사과'], ['cake', '케이크'], ['father', '아버지']], tip: '한 글자가 여러 소리를 내요. 짧은 a는 [애] — 입을 크게 벌려요. 끝에 e가 붙으면 [에이]: cake, name.' },
  { up: 'B', lo: 'b', say: 'B', name: '비', ko: 'ㅂ', ipa: 'b', ex: [['ball', '공'], ['bag', '가방']], tip: '두 입술을 붙였다 떼며 목을 울려요. 윗니가 입술에 닿는 v와 달라요.' },
  { up: 'C', lo: 'c', say: 'C', name: '씨', ko: 'ㅋ · ㅆ', ipa: 'k · s', ex: [['cat', '고양이'], ['city', '도시']], tip: 'a·o·u 앞에서는 [k], e·i·y 앞에서는 [s]: cat [캣] / city [씨리].' },
  { up: 'D', lo: 'd', say: 'D', name: '디', ko: 'ㄷ', ipa: 'd', ex: [['dog', '개'], ['desk', '책상']], tip: '목을 울리는 [d]. 미국식은 모음 사이에서 ㄹ처럼 약해지기도 해요: body [바리].' },
  { up: 'E', lo: 'e', say: 'E', name: '이', ko: 'ㅔ · 이', ipa: 'ɛ · iː', ex: [['egg', '달걀'], ['he', '그']], tip: '짧은 e는 [에]. 단어 끝의 e는 보통 소리가 없고 앞 모음을 바꿔요: cake [케이크], home [호움].' },
  { up: 'F', lo: 'f', say: 'F', name: '에프', ko: 'ㅍ(f)', ipa: 'f', ex: [['fish', '생선'], ['coffee', '커피']], tip: '윗니를 아랫입술에 살짝 대고 바람을 내보내요. 두 입술을 터뜨리는 p(ㅍ)와 다른 소리예요! fan(선풍기) ≠ pan(냄비)', special: true },
  { up: 'G', lo: 'g', say: 'G', name: '지', ko: 'ㄱ · ㅈ', ipa: 'g · dʒ', ex: [['go', '가다'], ['orange', '오렌지']], tip: '보통 [g], e·i 앞에서는 [ʤ](ㅈ)인 경우가 많아요: go / orange [오린지].' },
  { up: 'H', lo: 'h', say: 'H', name: '에이치', ko: 'ㅎ', ipa: 'h', ex: [['hand', '손'], ['hour', '시간']], tip: '[h] 소리. 가끔 소리가 나지 않아요: hour [아우어], honest [아니스트] → 그래서 an hour!' },
  { up: 'I', lo: 'i', say: 'I', name: '아이', ko: '이 · 아이', ipa: 'ɪ · aɪ', ex: [['sit', '앉다'], ['time', '시간']], tip: '짧은 i는 힘을 뺀 짧은 [이]. 길게 [이-] 하면 다른 단어가 돼요: sit(앉다) ≠ seat(좌석), ship(배) ≠ sheep(양)', special: true },
  { up: 'J', lo: 'j', say: 'J', name: '제이', ko: 'ㅈ', ipa: 'dʒ', ex: [['juice', '주스'], ['job', '직업']], tip: '한국어 ㅈ과 비슷하지만 입술을 살짝 내밀어요.' },
  { up: 'K', lo: 'k', say: 'K', name: '케이', ko: 'ㅋ', ipa: 'k', ex: [['key', '열쇠'], ['kitchen', '부엌']], tip: 'kn으로 시작하면 k는 소리가 없어요: know [노우], knife [나이프].' },
  { up: 'L', lo: 'l', say: 'L', name: '엘', ko: 'ㄹ(l)', ipa: 'l', ex: [['light', '빛'], ['hello', '안녕']], tip: '혀끝을 윗니 뒤 잇몸에 꼭 붙이고 소리 내요. 혀를 말아 어디에도 닿지 않는 r과 달라요! light(빛) ≠ right(오른쪽)', special: true },
  { up: 'M', lo: 'm', say: 'M', name: '엠', ko: 'ㅁ', ipa: 'm', ex: [['milk', '우유'], ['name', '이름']], tip: '한국어 ㅁ과 같아요.' },
  { up: 'N', lo: 'n', say: 'N', name: '엔', ko: 'ㄴ', ipa: 'n', ex: [['nose', '코'], ['sun', '해']], tip: '한국어 ㄴ과 같아요. ng는 받침 ㅇ: sing [씽].' },
  { up: 'O', lo: 'o', say: 'O', name: '오우', ko: 'ㅏ · 오우 · ㅓ', ipa: 'ɑ · oʊ · ʌ', ex: [['hot', '뜨거운'], ['go', '가다'], ['love', '사랑']], tip: 'o도 여러 소리예요: hot [핫] · go [고우] · love [러브]. [오]로만 읽으면 어색해요.' },
  { up: 'P', lo: 'p', say: 'P', name: '피', ko: 'ㅍ', ipa: 'p', ex: [['pen', '펜'], ['apple', '사과']], tip: '두 입술을 붙였다가 터뜨려요. f와 구분하세요: pan / fan.' },
  { up: 'Q', lo: 'q', say: 'Q', name: '큐', ko: '크w', ipa: 'kw', ex: [['queen', '여왕'], ['question', '질문']], tip: '거의 항상 qu로 써요. [크]와 [우]를 붙여 한 번에: queen [퀸], question [퀘스천].' },
  { up: 'R', lo: 'r', say: 'R', name: '알', ko: 'ㄹ(r)', ipa: 'ɹ', ex: [['red', '빨간색'], ['very', '매우']], tip: '혀끝을 입천장에 닿지 않게 살짝 뒤로 말고, 입술은 조금 둥글게. 한국어 ㄹ과 다른 소리예요! 단어 앞 r은 [우r]처럼 시작하면 쉬워요.', special: true },
  { up: 'S', lo: 's', say: 'S', name: '에스', ko: 'ㅅ · ㅆ', ipa: 's', ex: [['sun', '해'], ['bus', '버스']], tip: '혀끝으로 내는 [s]. si를 한국어 "시"([ɕi])처럼 하면 she(그녀)처럼 들려요 — [씨]에 가깝게 내요. see ≠ she', special: true },
  { up: 'T', lo: 't', say: 'T', name: '티', ko: 'ㅌ', ipa: 't', ex: [['ten', '10'], ['water', '물']], tip: '미국식은 모음 사이에서 ㄹ처럼 약해져요: water [워러], better [베러]. th는 전혀 다른 소리!' },
  { up: 'U', lo: 'u', say: 'U', name: '유', ko: 'ㅓ · 유 · 우', ipa: 'ʌ · juː · ʊ', ex: [['cup', '컵'], ['music', '음악'], ['put', '놓다']], tip: 'u도 여러 소리: cup [컵] · music [뮤직] · put [풋]. 짧은 u는 대부분 [어]예요.' },
  { up: 'V', lo: 'v', say: 'V', name: '브이', ko: 'ㅂ(v)', ipa: 'v', ex: [['very', '매우'], ['love', '사랑']], tip: '윗니를 아랫입술에 대고 목을 울려요. b(ㅂ)가 아니에요! very(매우) ≠ berry(베리)', special: true },
  { up: 'W', lo: 'w', say: 'W', name: '더블유', ko: '우(w)', ipa: 'w', ex: [['water', '물'], ['window', '창문']], tip: '입술을 동그랗게 오므렸다가 펴면서 다음 모음으로: we [위], wood [우드], woman [우먼].' },
  { up: 'X', lo: 'x', say: 'X', name: '엑스', ko: 'ㅋㅅ', ipa: 'ks', ex: [['box', '상자'], ['six', '6']], tip: '[ks] 두 소리를 붙여요: box [박스].' },
  { up: 'Y', lo: 'y', say: 'Y', name: '와이', ko: '이(y)', ipa: 'j', ex: [['yes', '네'], ['you', '너']], tip: '모음 앞에서는 반모음 [j]: yes [예스], year [이어]. 단어 끝에서는 모음: happy [해피], my [마이].' },
  { up: 'Z', lo: 'z', say: 'Z', name: '지', ko: 'ㅈ(z)', ipa: 'z', ex: [['zoo', '동물원'], ['zero', '0']], tip: 'ㅅ 소리를 목을 울려 내는 [z] — ㅈ과 달라요! 글자 이름은 미국 [지], 영국 [제드].', special: true },
];

// 한국인이 헷갈리는 소리 — 최소대립쌍 듣기 훈련 [단어, 뜻, 단어, 뜻]
export const PAIRS = [
  { id: 'fp', title: 'f ↔ p', desc: 'f는 윗니로 아랫입술을 살짝 물고 바람을, p는 두 입술을 터뜨려요.', pairs: [['fan', '선풍기', 'pan', '프라이팬'], ['fork', '포크', 'pork', '돼지고기'], ['coffee', '커피', 'copy', '복사'], ['fine', '좋은', 'pine', '소나무']] },
  { id: 'vb', title: 'v ↔ b', desc: 'v는 윗니+아랫입술 마찰, b는 두 입술. 둘 다 ㅂ으로 발음하면 구분이 안 돼요.', pairs: [['very', '매우', 'berry', '베리(열매)'], ['vote', '투표하다', 'boat', '보트'], ['van', '승합차', 'ban', '금지하다'], ['vest', '조끼', 'best', '최고의']] },
  { id: 'rl', title: 'r ↔ l', desc: 'r은 혀를 어디에도 대지 않고 말고, l은 혀끝을 윗잇몸에 붙여요. 한국인이 가장 어려워하는 구분!', pairs: [['right', '오른쪽', 'light', '빛'], ['rice', '쌀', 'lice', '이(머릿니)'], ['road', '길', 'load', '짐'], ['pray', '기도하다', 'play', '놀다'], ['correct', '맞는', 'collect', '모으다']] },
  { id: 'ths', title: 'th ↔ s', desc: 'th[θ]는 혀끝을 윗니와 아랫니 사이에 살짝 내밀고 바람을, s는 혀를 이 뒤에 두고.', pairs: [['think', '생각하다', 'sink', '싱크대'], ['thick', '두꺼운', 'sick', '아픈'], ['mouth', '입', 'mouse', '쥐'], ['thank', '감사하다', 'sank', '가라앉았다']] },
  { id: 'thd', title: 'th ↔ d', desc: '목을 울리는 th[ð]도 혀끝을 이 사이에. d는 혀를 윗잇몸에 대고 터뜨려요.', pairs: [['they', '그들', 'day', '날'], ['though', '~이지만', 'dough', '반죽'], ['breathe', '숨 쉬다', 'breed', '번식하다']] },
  { id: 'ssh', title: 's ↔ sh', desc: '한국어 "시"는 sh에 가까워요. see는 혀끝을 앞쪽에 두고 [씨], she는 입술을 내밀고 [쉬].', pairs: [['see', '보다', 'she', '그녀'], ['sip', '홀짝이다', 'ship', '배'], ['seat', '좌석', 'sheet', '시트'], ['save', '저축하다', 'shave', '면도하다']] },
  { id: 'iee', title: 'i ↔ ee', desc: '짧은 i[ɪ]는 힘을 빼고 짧게, ee[iː]는 입꼬리를 옆으로 당기고 길게.', pairs: [['ship', '배', 'sheep', '양'], ['live', '살다', 'leave', '떠나다'], ['sit', '앉다', 'seat', '좌석'], ['fill', '채우다', 'feel', '느끼다']] },
  { id: 'eae', title: 'e ↔ a', desc: 'e[ɛ]는 [에], a[æ]는 입을 크게 벌린 [애]. 한국어 에/애를 더 크게 구분해요.', pairs: [['bed', '침대', 'bad', '나쁜'], ['men', '남자들', 'man', '남자'], ['pen', '펜', 'pan', '프라이팬'], ['said', '말했다', 'sad', '슬픈']] },
  { id: 'uo', title: 'u ↔ o', desc: '짧은 u[ʌ]는 힘 뺀 [어], o[ɑ]는 입을 크게 벌린 [아].', pairs: [['cup', '컵', 'cop', '경찰'], ['luck', '운', 'lock', '자물쇠'], ['hut', '오두막', 'hot', '뜨거운']] },
  { id: 'uuu', title: 'u ↔ oo', desc: '짧은 [ʊ]는 입술을 덜 내밀고 짧게, oo[uː]는 입술을 쭉 내밀고 길게.', pairs: [['full', '가득 찬', 'fool', '바보'], ['pull', '당기다', 'pool', '수영장']] },
];

// 발음 규칙 요약 (발음 기초 화면 하단)
export const SOUND_RULES = [
  { title: '철자대로 읽지 않아요', body: '같은 a도 cat [캣] · cake [케이크] · father [파더]처럼 달라요. 단어마다 소리를 같이 익혀요 — 🔊 버튼과 한글 표기를 함께 보세요.' },
  { title: '강세가 생명', body: '단어마다 세게 읽는 음절이 하나 있어요: com<b>PU</b>ter, ba<b>NA</b>na. 한글 표기에서 <b>굵은 글자</b>가 강세예요. 강세가 틀리면 철자가 맞아도 못 알아들어요.' },
  { title: '약한 모음은 [어]', body: '강세 없는 모음은 힘 빠진 [어]가 돼요: banana [버<b>내</b>너], about [어<b>바</b>웃].' },
  { title: '끝 자음에 "으"를 붙이지 마세요', body: 'strike는 1음절이에요. 스-트-라-이-크처럼 모음을 넣지 말고, 끝 자음은 살짝만: bus는 [버스]보다 [벗ㅅ]에 가깝게.' },
  { title: '이어서 읽어요 (연음)', body: '자음 뒤에 모음이 오면 붙여요: an apple [어내플] · check it out [체끼라웃] · thank you [쌩큐].' },
  { title: '미국식 t', body: '모음 사이의 t·d는 ㄹ처럼 약해져요: water [워러] · better [베러] · city [씨리].' },
  { title: '소리 나지 않는 글자', body: 'know·knife(k) · write(w) · hour(h) · listen(t) · climb(b) · island(s) · Wednesday(d)' },
  { title: '한국어에 없는 소리 6개', body: '<b>f · v · th · r · l · z</b> — 한글로는 정확히 쓸 수 없어요. "헷갈리는 소리" 탭에서 귀부터 익혀요.' },
];
