import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { visualizerIcons } from '../../src/lib/content/visualizerIcons.js';
test('every existing article visualizer retains its named icon',()=>{
 for(const name of fs.readdirSync('src/content/blogs')){
  if(!name.endsWith('.md'))continue;
  const text=fs.readFileSync(`src/content/blogs/${name}`,'utf8');
  for(const match of text.matchAll(/"icon"\s*:\s*"([A-Z][A-Za-z0-9]*)"/g))assert.ok(visualizerIcons[match[1]],`${name}: ${match[1]}`);
 }
});
