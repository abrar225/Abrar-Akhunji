import { marked } from 'marked';

// Vite's feature to import multiple files. 'query: "?raw"' brings them in as strings.
const blogFiles = import.meta.glob('../content/blogs/*.md', { query: '?raw', eager: true });

/* ─────────────────────────────────────────────
   Browser-safe frontmatter parser
   (replaces gray-matter which requires Node.js)
   ───────────────────────────────────────────── */
function parseFrontmatter(raw) {
  const content = raw.replace(/\r\n/g, '\n');

  // Check for opening ---
  if (!content.startsWith('---')) {
    return { data: {}, content };
  }

  // Find closing ---
  const endIdx = content.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { data: {}, content };
  }

  const yamlBlock = content.slice(4, endIdx); // skip the first '---\n'
  const body = content.slice(endIdx + 4);     // skip '\n---\n'

  const data = parseSimpleYaml(yamlBlock);
  return { data, content: body };
}

/**
 * Minimal YAML parser that handles our blog frontmatter format:
 *  - key: "value"  /  key: value  /  key: null
 *  - key: ["a", "b"]  (JSON inline arrays)
 *  - key: []
 *  - nested objects (2-space indented keys)
 *  - YAML list items (- key: val)
 */
function parseSimpleYaml(yaml) {
  const result = {};
  const lines = yaml.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith('#')) {
      i++;
      continue;
    }

    // Top-level key
    const topMatch = line.match(/^(\w[\w-]*):\s*(.*)?$/);
    if (!topMatch) {
      i++;
      continue;
    }

    const key = topMatch[1];
    const rawValue = (topMatch[2] || '').trim();

    // Check if next lines are indented (nested object or array)
    if (rawValue === '' || rawValue === null) {
      // Peek ahead for indented content
      const nested = collectIndented(lines, i + 1);
      if (nested.lines.length > 0) {
        // Determine if it's a list (starts with "- ") or an object
        const firstNested = nested.lines[0].trimStart();
        if (firstNested.startsWith('- ')) {
          result[key] = parseYamlList(nested.lines);
        } else {
          result[key] = parseNestedObject(nested.lines);
        }
        i = nested.nextIndex;
      } else {
        result[key] = null;
        i++;
      }
    } else {
      result[key] = parseValue(rawValue);
      i++;
    }
  }

  return result;
}

/** Collect all lines that are indented more than the current level */
function collectIndented(lines, startIdx) {
  const collected = [];
  let i = startIdx;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      // Allow blank lines within indented blocks
      if (i + 1 < lines.length && (lines[i + 1].startsWith('  ') || lines[i + 1].startsWith('\t'))) {
        collected.push(line);
        i++;
        continue;
      }
      break;
    }
    if (line.startsWith('  ') || line.startsWith('\t')) {
      collected.push(line);
      i++;
    } else {
      break;
    }
  }
  return { lines: collected, nextIndex: i };
}

/** Parse a nested YAML object (indented key: value pairs) */
function parseNestedObject(lines) {
  const obj = {};
  for (const line of lines) {
    const m = line.trim().match(/^(\w[\w-]*):\s*(.*)$/);
    if (m) {
      obj[m[1]] = parseValue(m[2].trim());
    }
  }
  return obj;
}

/** Parse a YAML list (lines starting with "- ") */
function parseYamlList(lines) {
  const items = [];
  let currentItem = null;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('- ')) {
      // New list item
      if (currentItem !== null) items.push(currentItem);

      const afterDash = trimmed.slice(2).trim();
      // Check if it's an object item: "- key: value"
      const objMatch = afterDash.match(/^(\w[\w-]*):\s*(.*)$/);
      if (objMatch) {
        currentItem = {};
        currentItem[objMatch[1]] = parseValue(objMatch[2].trim());
      } else {
        // Simple list item: "- value"
        currentItem = parseValue(afterDash);
      }
    } else {
      // Continuation of previous item (nested property)
      const objMatch = trimmed.match(/^(\w[\w-]*):\s*(.*)$/);
      if (objMatch && typeof currentItem === 'object' && currentItem !== null) {
        currentItem[objMatch[1]] = parseValue(objMatch[2].trim());
      }
    }
  }
  if (currentItem !== null) items.push(currentItem);
  return items;
}

/** Parse a single YAML value */
function parseValue(raw) {
  if (raw === '' || raw === undefined) return null;
  if (raw === 'null') return null;
  if (raw === 'true') return true;
  if (raw === 'false') return false;

  // JSON inline array: ["a", "b"]
  if (raw.startsWith('[')) {
    try { return JSON.parse(raw); } catch { return raw; }
  }

  // Quoted string
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }

  // Number
  if (/^-?\d+(\.\d+)?$/.test(raw)) {
    return Number(raw);
  }

  return raw;
}

/* ─────────────────────────────────────────────
   Content block parser & blog API
   ───────────────────────────────────────────── */

/**
 * Parse custom content blocks (:::eli5, :::dev, :::interactive) from markdown.
 * Returns structured sections array.
 */
function parseContentBlocks(rawMarkdown) {
  const sections = [];
  const lines = rawMarkdown.split('\n');
  let currentBlock = null;
  let currentContent = [];
  let neutralContent = [];
  let widgetType = '';

  for (const line of lines) {
    // Detect block openers
    if (line.trim().startsWith(':::eli5')) {
      if (neutralContent.length > 0) {
        sections.push({ type: 'neutral', content: neutralContent.join('\n') });
        neutralContent = [];
      }
      currentBlock = 'eli5';
      currentContent = [];
      continue;
    }
    if (line.trim().startsWith(':::dev')) {
      if (neutralContent.length > 0) {
        sections.push({ type: 'neutral', content: neutralContent.join('\n') });
        neutralContent = [];
      }
      currentBlock = 'dev';
      currentContent = [];
      continue;
    }
    if (line.trim().startsWith(':::interactive')) {
      if (neutralContent.length > 0) {
        sections.push({ type: 'neutral', content: neutralContent.join('\n') });
        neutralContent = [];
      }
      const parts = line.trim().split(' ');
      widgetType = parts[1] || 'generic';
      currentBlock = 'interactive';
      currentContent = [];
      continue;
    }

    // Detect block closer (bare :::)
    if (line.trim() === ':::' && currentBlock) {
      if (currentBlock === 'interactive') {
        let config = {};
        try {
          config = JSON.parse(currentContent.join('\n'));
        } catch {
          config = { raw: currentContent.join('\n') };
        }
        sections.push({
          type: 'interactive',
          widgetType,
          config,
        });
      } else {
        sections.push({
          type: currentBlock,
          content: currentContent.join('\n'),
        });
      }
      currentBlock = null;
      currentContent = [];
      widgetType = '';
      continue;
    }

    // Accumulate content
    if (currentBlock) {
      currentContent.push(line);
    } else {
      neutralContent.push(line);
    }
  }

  // Flush remaining neutral content
  if (neutralContent.length > 0) {
    sections.push({ type: 'neutral', content: neutralContent.join('\n') });
  }

  return sections;
}

/**
 * Calculate estimated reading time in minutes.
 */
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Get all blogs, parsed with full metadata.
 */
export function getAllBlogs() {
  const blogs = [];

  for (const path in blogFiles) {
    const rawContent = blogFiles[path].default;
    const { data, content } = parseFrontmatter(rawContent);
    const slug = path.split('/').pop().replace('.md', '');

    // Parse content blocks for dual-mode rendering
    const sections = parseContentBlocks(content);

    // Calculate reading time from combined text
    const allText = sections
      .filter((s) => s.type !== 'interactive')
      .map((s) => s.content || '')
      .join(' ');

    blogs.push({
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      author: data.author || 'Abrar Akhunji',
      heroImage: data.heroImage || null,
      // Audio & Captions
      audio: data.audio || null,
      captions: data.captions || [],
      // Tech Tree
      techTree: data.techTree || null,
      // Parsed content
      sections,
      content, // raw markdown body (kept for fallback)
      readingTime: calculateReadingTime(allText),
    });
  }

  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single blog by slug.
 */
export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

/**
 * Convert raw markdown string to HTML.
 */
export function markdownToHtml(markdown) {
  return marked(markdown);
}

/**
 * Get unique tech tree branches from all blogs.
 */
export function getTechTreeBranches() {
  const blogs = getAllBlogs().filter((b) => b.techTree);
  const branches = {};

  for (const blog of blogs) {
    const branch = blog.techTree.branch || 'General';
    if (!branches[branch]) {
      branches[branch] = [];
    }
    branches[branch].push(blog);
  }

  for (const branch in branches) {
    branches[branch].sort((a, b) => (a.techTree.level || 0) - (b.techTree.level || 0));
  }

  return branches;
}

/**
 * Check if a blog post has been read (using localStorage).
 */
export function isPostRead(slug) {
  try {
    const read = JSON.parse(localStorage.getItem('readPosts') || '[]');
    return read.includes(slug);
  } catch {
    return false;
  }
}

/**
 * Mark a blog post as read.
 */
export function markPostAsRead(slug) {
  try {
    const read = JSON.parse(localStorage.getItem('readPosts') || '[]');
    if (!read.includes(slug)) {
      read.push(slug);
      localStorage.setItem('readPosts', JSON.stringify(read));
    }
  } catch {
    // localStorage unavailable
  }
}
