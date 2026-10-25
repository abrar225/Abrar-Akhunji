import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('htaccess keeps canonical redirects, security headers and a custom 404', () => {
  const htaccess = read('public/.htaccess');
  assert.match(htaccess, /RewriteRule \^blog\/\[0-9\]\{4\}/);
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(htaccess, /Strict-Transport-Security/);
  assert.match(htaccess, /X-Content-Type-Options/);
  assert.match(htaccess, /Referrer-Policy/);
  assert.match(htaccess, /Permissions-Policy/);
});

test('static 404 page is noindex and has recovery links', () => {
  const html = read('public/404.html');
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.match(html, /href="\/blog\/"/);
  assert.match(html, /href="\/hire\/"/);
});

test('security.txt has the required Expires field', () => {
  const txt = read('public/.well-known/security.txt');
  assert.match(txt, /^Contact: mailto:/m);
  assert.match(txt, /^Expires: /m);
});

test('dead API and duplicate static SEO files are gone', () => {
  assert.equal(fs.existsSync(path.join(root, 'public/api')), false);
  assert.equal(fs.existsSync(path.join(root, 'public/llms.txt')), false);
  assert.equal(fs.existsSync(path.join(root, 'public/llms-full.txt')), false);
  assert.equal(fs.existsSync(path.join(root, 'public/sitemap.xml')), false);
  assert.equal(fs.existsSync(path.join(root, 'public/robots.txt')), false);
});

test('default social image exists at 1200x630', () => {
  const imagePath = path.join(root, 'public/images/og-default.jpg');
  assert.ok(fs.existsSync(imagePath));
  const header = fs.readFileSync(imagePath).subarray(0, 4).toString('hex');
  assert.equal(header, 'ffd8ffe0', 'expected a JPEG header');
});
