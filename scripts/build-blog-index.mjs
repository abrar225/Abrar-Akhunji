#!/usr/bin/env node
/**
 * Builds src/generated/blog-index.json (metadata only) and validates every post.
 * `--check` validates without writing, so CI can run it independently.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseFrontmatter,
  parseContentBlocks,
  normalizeSlug,
  calculateReadingTime,
  findUnsafeMarkdown,
} from '../src/lib/content/frontmatter.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = path.join(root, 'src/content/blogs');
const outDir = path.join(root, 'src/generated');
const outFile = path.join(outDir, 'blog-index.json');
const checkOnly = process.argv.includes('--check');

const errors = [];
const warnings = [];

function readPosts() {
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md')).sort();
  const posts = [];

  for (const file of files) {
    const fileSlug = file.replace(/\.md$/, '');
    const slug = normalizeSlug(fileSlug);
    const rel = `src/content/blogs/${file}`;
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const { data, content } = parseFrontmatter(raw);

    if (!data.title) errors.push(`${rel}: missing title`);
    if (!data.date) errors.push(`${rel}: missing date`);
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) {
      errors.push(`${rel}: date must be YYYY-MM-DD (got "${data.date}")`);
    }
    if (!data.description) errors.push(`${rel}: missing description`);
    if (!data.author) errors.push(`${rel}: missing author`);
    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      errors.push(`${rel}: tags must be a non-empty array`);
    }
    if (!data.heroImage) warnings.push(`${rel}: no heroImage (card will render without an image)`);

    if (data.heroImage && !/^https?:\/\//.test(data.heroImage)) {
      const asset = path.join(root, 'public', String(data.heroImage).replace(/^\//, ''));
      if (!fs.existsSync(asset)) errors.push(`${rel}: heroImage not found: ${data.heroImage}`);
    }

    const blockResult = parseContentBlocks(content);
    for (const message of blockResult.errors) errors.push(`${rel}: ${message}`);

    for (const message of findUnsafeMarkdown(content)) {
      errors.push(`${rel}: unsafe markdown (${message}); remove raw HTML/JS from post content`);
    }

    const localImages = [...content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)|\bsrc="(\/[^"]+)"/g)]
      .map((match) => match[1] || match[2])
      .filter(Boolean);
    for (const image of new Set(localImages)) {
      const asset = path.join(root, 'public', image.replace(/^\//, ''));
      if (!fs.existsSync(asset)) errors.push(`${rel}: inline image not found: ${image}`);
    }

    const text = blockResult.sections
      .filter((section) => section.type !== 'interactive')
      .map((section) => section.content || '')
      .join(' ');
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    if (wordCount < 300) warnings.push(`${rel}: only ${wordCount} words`);

    const techTree = data.techTree && typeof data.techTree === 'object'
      ? {
          branch: data.techTree.branch || 'General',
          level: Number(data.techTree.level) || 1,
          prerequisites: Array.isArray(data.techTree.prerequisites)
            ? data.techTree.prerequisites.map(normalizeSlug)
            : [],
        }
      : null;

    posts.push({
      slug,
      legacySlug: fileSlug,
      sourceFile: file,
      title: String(data.title || 'Untitled'),
      date: String(data.date || ''),
      updated: String(data.updated || data.date || ''),
      description: String(data.description || ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      author: String(data.author || 'Abrar Akhunji'),
      heroImage: data.heroImage ? String(data.heroImage) : null,
      techTree,
      readingTime: calculateReadingTime(text),
      hasDualMode: blockResult.sections.some((section) => section.type === 'eli5' || section.type === 'dev'),
    });
  }

  return posts;
}

const posts = readPosts();
const seen = new Map();
for (const post of posts) {
  if (seen.has(post.slug)) {
    errors.push(`Duplicate slug "${post.slug}" in ${seen.get(post.slug)} and ${post.sourceFile}`);
  }
  seen.set(post.slug, post.sourceFile);
}

const knownSlugs = new Set(posts.map((post) => post.slug));
for (const post of posts) {
  for (const prerequisite of post.techTree?.prerequisites || []) {
    if (!knownSlugs.has(prerequisite)) {
      warnings.push(`${post.sourceFile}: prerequisite "${prerequisite}" does not match a published post`);
    }
  }
}

posts.sort((a, b) => {
  const byDate = new Date(b.date) - new Date(a.date);
  return byDate || a.slug.localeCompare(b.slug);
});

for (const message of warnings) console.warn(`[content] warning: ${message}`);
for (const message of errors) console.error(`[content] error: ${message}`);

if (errors.length > 0) {
  console.error(`\n[content] ${errors.length} error(s). Build stopped.`);
  process.exit(1);
}

const payload = {
  generatedAt: new Date().toISOString(),
  count: posts.length,
  posts,
};

if (checkOnly) {
  console.log(`[content] ${posts.length} posts validated.`);
} else {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`[content] ${posts.length} posts validated → ${path.relative(root, outFile)}`);
}
