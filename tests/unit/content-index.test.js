import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const indexPath = path.join(root, 'src/generated/blog-index.json');

test('the content index is generated and internally consistent', () => {
  assert.ok(fs.existsSync(indexPath), 'run npm run validate:content / pretest first');
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  assert.ok(index.count >= 57);

  const slugs = new Set();
  const legacySlugs = new Set();
  for (const post of index.posts) {
    assert.ok(post.title);
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(post.description);
    assert.ok(Array.isArray(post.tags) && post.tags.length > 0);
    assert.ok(post.readingTime >= 1);
    assert.ok(!slugs.has(post.slug), `duplicate slug: ${post.slug}`);
    assert.ok(!legacySlugs.has(post.legacySlug), `duplicate legacy slug: ${post.legacySlug}`);
    slugs.add(post.slug);
    legacySlugs.add(post.legacySlug);
  }

  for (const post of index.posts) {
    for (const prerequisite of post.techTree?.prerequisites || []) {
      assert.ok(slugs.has(prerequisite), `${post.slug} references unknown prerequisite ${prerequisite}`);
    }
    if (post.heroImage && !/^https?:\/\//.test(post.heroImage)) {
      assert.ok(
        fs.existsSync(path.join(root, 'public', post.heroImage.replace(/^\//, ''))),
        `${post.slug} is missing ${post.heroImage}`
      );
    }
  }
});
