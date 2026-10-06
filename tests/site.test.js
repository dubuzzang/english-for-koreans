import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { HEADERS, SITE_FILES } from '../scripts/build-site.mjs';
import { render as renderProfile, PROFILE_PATH, APP_URL } from '../scripts/gen-ios-profile.mjs';
import { APP_ORIGIN } from '../js/core/transfer.js';

test('배포 폴더 구성과 Cloudflare 헤더', () => {
  for (const f of ['index.html', 'sw.js', 'audio', 'css', 'js', 'icons']) assert.ok(SITE_FILES.includes(f), f);
  assert.match(HEADERS, /\/audio\/\*\.mp3\n\s+Cache-Control: public, max-age=31536000, immutable/);
  assert.match(HEADERS, /\/sw\.js\n\s+Cache-Control: no-cache/);
  const m = JSON.parse(readFileSync('manifest.webmanifest', 'utf8'));
  assert.equal(m.display, 'standalone');
  assert.equal(m.short_name, 'Hello');
  assert.ok(m.icons.some((i) => i.purpose === 'maskable'));
  for (const i of m.icons) assert.ok(existsSync(i.src), i.src);
});

test('안드로이드 앱(만들었다면): assetlinks 패키지가 TWA 설정과 같고, APK가 있다', { skip: !existsSync('android/twa-manifest.json') }, () => {
  const links = JSON.parse(readFileSync('.well-known/assetlinks.json', 'utf8'));
  const twa = JSON.parse(readFileSync('android/twa-manifest.json', 'utf8'));
  const t = links[0].target;
  assert.equal(t.package_name, twa.packageId);
  assert.match(t.sha256_cert_fingerprints[0], /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/);
  assert.equal(twa.host, 'english-for-koreans.pages.dev');
  assert.ok(existsSync('download/hello.apk'), 'download/hello.apk 없음');
  assert.ok(statSync('download/hello.apk').size > 500_000);
});

test('아이폰 설치 파일(구성 프로파일): 최신이고, 앱 주소의 홈 화면 아이콘을 전체 화면으로 추가한다', () => {
  assert.ok(existsSync(PROFILE_PATH), `${PROFILE_PATH} 없음 — node scripts/gen-ios-profile.mjs`);
  const xml = readFileSync(PROFILE_PATH, 'utf8');
  assert.equal(xml, renderProfile(), '프로파일이 오래됨 — node scripts/gen-ios-profile.mjs');
  assert.ok(APP_URL.startsWith(`${APP_ORIGIN}/`));
  assert.match(xml, /<key>PayloadType<\/key><string>com\.apple\.webClip\.managed<\/string>/);
  assert.match(xml, /<key>FullScreen<\/key><true\/>/);
  assert.match(xml, /<key>Icon<\/key>\s*<data>\s*iVBORw0KGgo/); // PNG
  assert.equal((xml.match(/<dict>/g) || []).length, (xml.match(/<\/dict>/g) || []).length);
  // 사파리가 프로파일로 받으려면 이 형식이어야 하고, APK 헤더(/download/hello.apk)와 섞이면 안 된다
  assert.match(HEADERS, /\/download\/hello\.mobileconfig\n\s+Content-Type: application\/x-apple-aspen-config/);
  assert.ok(!/\/download\/\*/.test(HEADERS), '/download/* 규칙은 모든 파일에 APK 형식을 붙인다');
});
