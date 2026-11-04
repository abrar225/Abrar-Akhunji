import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('Goal 1: robots.txt declares Content-Signal directive', () => {
  const robots = read('dist/robots.txt');
  assert.match(robots, /^Content-Signal:\s*search=yes,\s*ai-train=no/m);
});

test('Goal 2: Organization or LocalBusiness schema is complete on the homepage', () => {
  const html = read('index.html');
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  const schemas = scripts.map(s => {
    try { return JSON.parse(s[1]); } catch { return null; }
  }).filter(Boolean);

  const orgSchema = schemas.find(s => {
    const types = Array.isArray(s['@type']) ? s['@type'] : [s['@type']];
    return types.includes('Organization') || types.includes('LocalBusiness');
  });

  assert.ok(orgSchema, 'expected Organization or LocalBusiness schema');
  assert.equal(orgSchema.name, 'Abrar Akhunji');
  assert.equal(orgSchema.url, 'https://abrarakhunji.com/');
  assert.equal(orgSchema.email, 'abrar@abrarakhunji.com');
  assert.ok(orgSchema.telephone, 'expected telephone property on business node');
  assert.ok(orgSchema.founder);
  assert.ok(orgSchema.address);
  assert.ok(Array.isArray(orgSchema.sameAs) && orgSchema.sameAs.length > 0);
});

test('Goal 3: About, contact and legal pages exist and are linked from the homepage', () => {
  const homeHtml = read('dist/index.html');
  assert.match(homeHtml, /href="\/about\/"/);
  assert.match(homeHtml, /href="\/contact\/"/);
  assert.match(homeHtml, /href="\/terms\/"/);
  assert.match(homeHtml, /href="\/privacy\/"/);

  assert.ok(fs.existsSync(path.join(root, 'dist/about/index.html')));
  assert.ok(fs.existsSync(path.join(root, 'dist/contact/index.html')));
  assert.ok(fs.existsSync(path.join(root, 'dist/terms/index.html')));
  assert.ok(fs.existsSync(path.join(root, 'dist/privacy/index.html')));

  const sitemap = read('dist/sitemap.xml');
  assert.match(sitemap, /<loc>https:\/\/abrarakhunji\.com\/about\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/abrarakhunji\.com\/contact\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/abrarakhunji\.com\/terms\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/abrarakhunji\.com\/privacy\/<\/loc>/);
});

test('Goal 4: Serves Markdown representation and htaccess content negotiation', () => {
  assert.ok(fs.existsSync(path.join(root, 'dist/index.md')));
  const md = read('dist/index.md');
  assert.match(md, /# Abrar Akhunji/);
  assert.match(md, /Engineering Services/);
  assert.match(md, /Featured Builds/);

  const htaccess = read('public/.htaccess');
  assert.match(htaccess, /RewriteCond %\{HTTP_ACCEPT\} text\/markdown/);
  assert.match(htaccess, /RewriteRule \^\$ index\.md/);
  assert.match(htaccess, /AddType text\/markdown;charset=UTF-8 \.md/);
  assert.match(htaccess, /Header append Vary "Accept"/);
});

test('Goal 5: Homepage advertises resources via RFC 8288 Link headers', () => {
  const htaccess = read('public/.htaccess');
  assert.match(htaccess, /Header always set Link '<\/llms\.txt>; rel="alternate"; type="text\/markdown"/);
});

test('Goal 6: Exposes WebMCP tools via navigator.modelContext and form annotations', () => {
  const html = read('index.html');
  assert.match(html, /navigator\.modelContext\.registerTool/);
  assert.match(html, /name:\s*['"]search_content['"]/);
  assert.match(html, /name:\s*['"]get_contact_info['"]/);
  assert.match(html, /toolname="search_content"/);
  assert.match(html, /toolname="get_contact_info"/);
  assert.match(html, /tooldescription=/);
});

test('Goal 7: MCP Server Card is published conforming to SEP-1649 / SEP-2127', () => {
  const cardPath = path.join(root, 'public/.well-known/mcp/server-card.json');
  assert.ok(fs.existsSync(cardPath), 'server-card.json must exist in public/.well-known/mcp/');
  const distCardPath = path.join(root, 'dist/.well-known/mcp/server-card.json');
  assert.ok(fs.existsSync(distCardPath), 'server-card.json must exist in dist/.well-known/mcp/');

  const card = JSON.parse(fs.readFileSync(cardPath, 'utf8'));
  assert.ok(card.name, 'card must have name');
  assert.ok(card.version, 'card must have version');
  assert.ok(card.endpoint, 'card must have endpoint URL');
  assert.ok(card.capabilities, 'card must declare capabilities');

  const htaccess = read('public/.htaccess');
  assert.match(htaccess, /RewriteRule \^\\\.well-known\/ - \[L\]/);
  assert.match(htaccess, /Access-Control-Allow-Origin/);
});
