import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizePath,
  absoluteUrl,
  postPath,
  blogPath,
  hirePath,
} from '../../src/lib/content/urls.js';

test('normalizes paths to one canonical trailing-slash shape', () => {
  assert.equal(normalizePath('/'), '/');
  assert.equal(normalizePath(''), '/');
  assert.equal(normalizePath('/blog'), '/blog/');
  assert.equal(normalizePath('/blog/'), '/blog/');
  assert.equal(normalizePath('blog/post'), '/blog/post/');
  assert.equal(normalizePath('/blog/post/?tag=ai'), '/blog/post/');
});

test('builds absolute URLs on the canonical domain', () => {
  assert.equal(absoluteUrl('/blog/'), 'https://abrarakhunji.com/blog/');
  assert.equal(absoluteUrl('/blog/post'), 'https://abrarakhunji.com/blog/post/');
});

test('post paths always end with a slash', () => {
  assert.equal(postPath('hy-memory'), '/blog/hy-memory/');
  assert.equal(postPath('/hy-memory/'), '/blog/hy-memory/');
  assert.equal(blogPath(), '/blog/');
  assert.equal(hirePath(), '/hire/');
});
