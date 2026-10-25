import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseFrontmatter,
  parseContentBlocks,
  findUnsafeMarkdown,
  calculateReadingTime,
  normalizeSlug,
} from '../../src/lib/content/frontmatter.js';

const SAMPLE = `---
title: "Test post"
date: "2026-01-01"
description: "A test post."
tags: ["AI", "Testing"]
techTree:
  branch: "LLMs"
  level: 2
  prerequisites: ["2026-01-01-base"]
faq:
  - question: "What is it?"
    answer: "A test."
---
Body content.
`;

test('parses frontmatter, nested objects and FAQ lists', () => {
  const { data, content } = parseFrontmatter(SAMPLE);
  assert.equal(data.title, 'Test post');
  assert.equal(data.date, '2026-01-01');
  assert.deepEqual(data.tags, ['AI', 'Testing']);
  assert.equal(data.techTree.branch, 'LLMs');
  assert.equal(data.techTree.level, 2);
  assert.deepEqual(data.techTree.prerequisites, ['2026-01-01-base']);
  assert.equal(data.faq[0].question, 'What is it?');
  assert.equal(data.faq[0].answer, 'A test.');
  assert.equal(content.trim(), 'Body content.');
});

test('normalizes date-prefixed slugs', () => {
  assert.equal(normalizeSlug('2026-01-01-test-post'), 'test-post');
  assert.equal(normalizeSlug('test-post'), 'test-post');
});

test('supports interactive widgets nested inside a mode block', () => {
  const markdown = `Intro.

:::eli5
Simple intro.
:::interactive chart
{"title":"Chart","data":[],"series":[]}
:::
Simple outro.
:::

:::dev
Technical intro.
:::`;

  const { sections, errors } = parseContentBlocks(markdown);
  assert.deepEqual(errors, []);
  assert.deepEqual(sections.map((section) => section.type), [
    'neutral', 'eli5', 'interactive', 'eli5', 'dev',
  ]);
  assert.equal(sections[2].widgetType, 'chart');
  assert.equal(sections[2].config.title, 'Chart');
  assert.match(sections[3].content, /Simple outro/);
});

test('reports unclosed blocks instead of silently dropping content', () => {
  const { sections, errors } = parseContentBlocks(':::dev\nUnclosed body');
  assert.equal(sections.length, 1);
  assert.match(errors.join(' '), /Unclosed :::dev/);
});

test('reports invalid interactive JSON and keeps a fallback config', () => {
  const { sections, errors } = parseContentBlocks(':::interactive chart\n{bad json}\n:::');
  assert.match(errors.join(' '), /invalid JSON/);
  assert.equal(sections[0].type, 'interactive');
  assert.ok(sections[0].config.raw);
});

test('flags raw HTML/JS but not code samples', () => {
  assert.deepEqual(findUnsafeMarkdown('Plain markdown'), []);
  assert.match(findUnsafeMarkdown('<script>alert(1)</script>').join(' '), /script/);
  assert.match(findUnsafeMarkdown('<img src=x onerror=alert(1)>').join(' '), /event handler/);
  assert.deepEqual(findUnsafeMarkdown('```html\n<script>alert(1)</script>\n```'), []);
  assert.deepEqual(findUnsafeMarkdown('    onChange={(e) => setValue(e)}'), []);
});

test('calculates reading time with a one-minute floor', () => {
  assert.equal(calculateReadingTime('word '.repeat(400)), 2);
  assert.equal(calculateReadingTime('short'), 1);
});
