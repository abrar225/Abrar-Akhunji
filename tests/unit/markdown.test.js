import test from 'node:test';
import assert from 'node:assert/strict';
import { markdownToHtml } from '../../src/lib/content/markdown.js';

test('renders headings with stable ids and slot markers', () => {
  const html = markdownToHtml('## Hello world\n\nBody');
  assert.match(html, /<h2 id="hello-world" data-slot="blog-heading">Hello world<\/h2>/);
});

test('deduplicates repeated heading ids', () => {
  const html = markdownToHtml('## Same\n\n## Same');
  assert.match(html, /id="same"/);
  assert.match(html, /id="same-2"/);
});

test('wraps tables for responsive scrolling', () => {
  const html = markdownToHtml('| A | B |\n| - | - |\n| 1 | 2 |');
  assert.match(html, /<div class="table-wrap">/);
  assert.match(html, /<table>/);
});

test('protects real math and leaves prices alone', () => {
  const html = markdownToHtml('Value $K$ and $5.00 and $$E=mc^2$$ and $0.75 per million tokens$.');
  assert.equal((html.match(/class="math-slot"/g) || []).length, 2);
  assert.match(html, /data-tex="K"/);
  assert.match(html, /data-tex="E=mc\^2"/);
  assert.match(html, /\$5\.00/);
});

test('does not touch math inside fenced code blocks', () => {
  const html = markdownToHtml('```js\nconst price = "$5.00";\nconst x = "$K$";\n```');
  assert.equal((html.match(/class="math-slot"/g) || []).length, 0);
});

test('renders raw HTML as authored (validated at build time)', () => {
  const html = markdownToHtml('**bold** and [link](/hire/)');
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /href="\/hire\/"/);
});
