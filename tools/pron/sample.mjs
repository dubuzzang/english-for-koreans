// 한글 발음 표기 눈으로 확인하기:  node tools/pron/sample.mjs water "Nice to meet you."
import { toHangulParts } from '../../js/core/hangul.js';

const show = (s) => console.log(s.padEnd(46), toHangulParts(s).map((p) => (p.b ? `[${p.t}]` : p.t)).join(''));
const args = process.argv.slice(2);
const list = args.length ? args : ['Nice to meet you.', "I'm from Korea.", 'Can I get an iced americano?', 'What time is it?', "It's a quarter past six.",
  'How much is this?', 'Thank you very much.', 'I have a headache.', 'Excuse me, where is the restroom?', 'Have a nice trip!',
  "I'd like the chicken salad.", 'She studies English every day.', 'Do you speak English?', 'My name is Mina.', "I've been to Japan twice.",
  'The subway is faster than the bus.', 'Wednesday', 'Saturday', 'thirty', 'forty', 'comfortable', 'vegetable', 'restaurant', 'chocolate',
  'Korean', 'girlfriend', 'refrigerator', 'apartment', 'kimchi', 'Jisu', 'K-pop', 'TV', 'ATM', "Mina's", 'sunnier', 'gladder'];
for (const s of list) show(s);
