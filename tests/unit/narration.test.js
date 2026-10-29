import test from 'node:test';
import assert from 'node:assert/strict';
import { splitNarration, wordBounds, locateNarration } from '../../src/lib/content/narration.js';

test('narration chunks preserve the exact source and stay bounded for long articles', () => {
  const text = '  A useful system starts with a real problem. ' + 'An interface should make the next step clear. '.repeat(45);
  const parts = splitNarration(text);
  assert.ok(parts.length > 5);
  for (const part of parts) { assert.equal(part.text, text.slice(part.start, part.end)); assert.ok(part.text.length <= 160); assert.equal(part.text.trim(), part.text); }
  assert.equal(parts.map(part => part.text).join(' ').replace(/\s+/g,' '), text.trim().replace(/\s+/g,' '));
  assert.deepEqual(splitNarration(' \n '), []);
  assert.equal(splitNarration('x'.repeat(501)).map(part => part.text).join(''), 'x'.repeat(501));
});
test('word seeking lands at a word start across utterance boundaries', () => {
  assert.deepEqual(wordBounds('one two three', 6), { start: 4, end: 7 });
  assert.deepEqual(wordBounds('one two three', 3), { start: 4, end: 7 });
  const queue = [{ text: 'one two', offset: 0 }, { text: 'three four', offset: 7 }];
  assert.deepEqual(locateNarration(queue, 0), { index: 0, char: 0 });
  assert.deepEqual(locateNarration(queue, 7), { index: 1, char: 0 });
  assert.deepEqual(locateNarration(queue, 14), { index: 1, char: 6 });
  assert.deepEqual(locateNarration([], 0), { index: 0, char: 0 });
});
