import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { HEADERS, SITE_FILES } from '../scripts/build-site.mjs';

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
