import index from '../generated/blog-index.json';
import {
  normalizeSlug,
  parseFrontmatter,
  parseContentBlocks,
} from './content/frontmatter.js';

const POSTS = index.posts;
const BY_SLUG = new Map(POSTS.map((post) => [post.slug, post]));
const BY_LEGACY = new Map(POSTS.map((post) => [post.legacySlug, post]));
const BY_SLUG_OR_LEGACY = new Map([
  ...POSTS.map((post) => [post.slug, post]),
  ...POSTS.map((post) => [post.legacySlug, post]),
]);

// Markdown is loaded per post, never eagerly. This keeps the entry bundle free
// of the ~1.5MB content corpus.
const RAW_POSTS = import.meta.glob('../content/blogs/*.md', {
  query: '?raw',
  import: 'default',
});
const LOADERS = Object.fromEntries(
  Object.entries(RAW_POSTS).map(([filePath, load]) => [filePath.split('/').pop(), load])
);

export class BlogLoadError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'BlogLoadError';
    this.code = 'blog_load_failed';
    if (cause) this.cause = cause;
  }
}

export function getAllBlogs() {
  return POSTS;
}

export function getLatestBlogs(count = 4) {
  return POSTS.slice(0, count);
}

export function getBlogBySlug(slug) {
  if (!slug) return null;
  return BY_SLUG.get(slug) || BY_SLUG_OR_LEGACY.get(slug) || null;
}

export function getRelatedBlogs(post, limit = 3) {
  if (!post) return [];
  const tags = new Set(post.tags || []);
  const branch = post.techTree?.branch;

  return POSTS
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTags = (candidate.tags || []).filter((tag) => tags.has(tag)).length;
      const sameBranch = branch && candidate.techTree?.branch === branch ? 1 : 0;
      const levelDistance = post.techTree && candidate.techTree
        ? Math.abs((post.techTree.level || 1) - (candidate.techTree.level || 1))
        : 3;
      const recency = new Date(candidate.date).getTime() / 1e13;
      return {
        candidate,
        score: sharedTags * 4 + sameBranch * 2 - levelDistance + recency,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getTopTags(limit = 12) {
  const counts = new Map();
  for (const post of POSTS) {
    for (const tag of post.tags || []) counts.set(tag, (counts.get(tag) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }));
}

/**
 * Loads and parses one post body. Throws BlogLoadError with a user-safe message
 * when the file cannot be read.
 */
export async function loadBlog(postOrSlug) {
  const post = typeof postOrSlug === 'string' ? getBlogBySlug(postOrSlug) : postOrSlug;
  if (!post) throw new BlogLoadError('That post does not exist.');

  const loader = LOADERS[post.sourceFile] || LOADERS[`${post.legacySlug}.md`];
  if (!loader) throw new BlogLoadError('That post is not available in this build.');

  let raw;
  try {
    raw = await loader();
  } catch (error) {
    throw new BlogLoadError('That post could not be loaded. Please try again.', { cause: error });
  }

  const { data, content } = parseFrontmatter(raw);
  const { sections, errors } = parseContentBlocks(content);

  if (errors.length > 0) {
    // The build fails on malformed content, so this is a development signal.
    if (import.meta.env.DEV) console.warn(`[blog] ${post.slug}:`, ...errors);
    if (sections.length === 0) {
      throw new BlogLoadError('This post has invalid content and cannot be displayed.');
    }
  }

  return {
    ...post,
    updated: String(data.updated || post.updated || post.date),
    content,
    sections,
    faq: Array.isArray(data.faq)
      ? data.faq.filter((item) => item && item.question && item.answer)
      : null,
  };
}

/* ── reading state ─────────────────────────────────────────── */

function readStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function isPostRead(slug) {
  if (!slug) return false;
  const target = normalizeSlug(slug);
  return readStorage('readPosts').some((value) => normalizeSlug(value) === target);
}

export function markPostAsRead(slug) {
  if (!slug) return;
  const target = normalizeSlug(slug);
  try {
    const read = readStorage('readPosts');
    if (!read.some((value) => normalizeSlug(value) === target)) {
      read.push(target);
      localStorage.setItem('readPosts', JSON.stringify(read));
    }
  } catch {
    // storage unavailable
  }
}
