// 아이폰 설치 파일: download/hello.mobileconfig (홈 화면에 Hello 앱 아이콘을 추가하는 구성 프로파일 · 웹 클립)
// 아이폰은 앱 스토어 밖에서 앱 파일을 설치할 수 없어서, 사파리 "홈 화면에 추가"와 같은 결과를 파일로 내려받게 한다.
// 사용: node scripts/gen-ios-profile.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const PROFILE_PATH = 'download/hello.mobileconfig';
export const APP_URL = 'https://english-for-koreans.pages.dev/#/home';
// 다시 만들어도 같은 프로파일로 보이도록 고정 (다시 설치하면 덮어쓴다)
const ID = 'io.github.dubuzzang.hello';
const UUID_PROFILE = 'C6387B25-1965-437E-B40E-1765C809CF44';
const UUID_CLIP = 'FA57059A-4D63-4210-8AE2-1D40CE144F57';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const str = (k, v) => `<key>${k}</key><string>${esc(v)}</string>`;
const bool = (k, v) => `<key>${k}</key><${v ? 'true' : 'false'}/>`;

export function render() {
  const icon = readFileSync(join(ROOT, 'icons/apple-touch-icon.png')).toString('base64').replace(/.{1,68}/g, '\t\t\t$&\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>PayloadContent</key>
	<array>
		<dict>
			${bool('FullScreen', true)}
			<key>Icon</key>
			<data>
${icon}			</data>
			${bool('IsRemovable', true)}
			${str('Label', 'Hello')}
			${str('PayloadDescription', '홈 화면에 Hello(한국인을 위한 영어) 앱 아이콘을 추가합니다.')}
			${str('PayloadDisplayName', 'Hello 앱 아이콘')}
			${str('PayloadIdentifier', `${ID}.webclip`)}
			${str('PayloadType', 'com.apple.webClip.managed')}
			${str('PayloadUUID', UUID_CLIP)}
			<key>PayloadVersion</key><integer>1</integer>
			${bool('Precomposed', true)}
			${str('URL', APP_URL)}
		</dict>
	</array>
	${str('PayloadDescription', '한국인을 위한 영어 학습 앱 Hello를 홈 화면에 설치합니다. 아이콘을 누르면 앱처럼 전체 화면으로 열려요. 지우려면 아이콘을 길게 눌러 삭제하거나, 설정 → 일반 → VPN 및 기기 관리에서 프로파일을 제거하세요.')}
	${str('PayloadDisplayName', 'Hello · 한국인을 위한 영어')}
	${str('PayloadIdentifier', ID)}
	${str('PayloadOrganization', 'Hello · english-for-koreans.pages.dev')}
	${bool('PayloadRemovalDisallowed', false)}
	${str('PayloadType', 'Configuration')}
	${str('PayloadUUID', UUID_PROFILE)}
	<key>PayloadVersion</key><integer>1</integer>
</dict>
</plist>
`;
}

if (process.argv[1] && process.argv[1].endsWith('gen-ios-profile.mjs')) {
  mkdirSync(join(ROOT, 'download'), { recursive: true });
  writeFileSync(join(ROOT, PROFILE_PATH), render());
  console.log(`${PROFILE_PATH} 생성 → ${APP_URL}`);
}
