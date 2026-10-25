/**
 * Single source of truth for blog frontmatter, custom blocks and markdown.
 * Used by the browser bundle and by the Node build scripts.
 */

export function normalizeSlug(value = '') {
  return String(value).trim().replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

/* ── frontmatter ─────────────────────────────────────────────── */

export function parseFrontmatter(raw) {
  const content = String(raw || '').replace(/\r\n/g, '\n');
  if (!content.startsWith('---')) return { data: {}, content };

  const endIdx = content.indexOf('\n---', 3);
  if (endIdx === -1) return { data: {}, content };

  const yamlBlock = content.slice(4, endIdx);
  const body = content.slice(endIdx + 4);
  return { data: parseSimpleYaml(yamlBlock), content: body };
}

function parseSimpleYaml(yaml) {
  const result = {};
  const lines = String(yaml || '').split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {
      i += 1;
      continue;
    }

    const topMatch = line.match(/^([\w-]+):\s*(.*)?$/);
    if (!topMatch) {
      i += 1;
      continue;
    }

    const key = topMatch[1];
    const rawValue = (topMatch[2] || '').trim();

    if (rawValue === '') {
      const nested = collectIndented(lines, i + 1);
      if (nested.lines.length > 0) {
        const firstNested = nested.lines[0].trimStart();
        result[key] = firstNested.startsWith('- ')
          ? parseYamlList(nested.lines)
          : parseNestedObject(nested.lines);
        i = nested.nextIndex;
      } else {
        result[key] = null;
        i += 1;
      }
    } else {
      result[key] = parseValue(rawValue);
      i += 1;
    }
  }

  return result;
}

function collectIndented(lines, startIdx) {
  const collected = [];
  let i = startIdx;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      if (i + 1 < lines.length && /^(\s{2,}|\t)/.test(lines[i + 1])) {
        collected.push(line);
        i += 1;
        continue;
      }
      break;
    }
    if (/^(\s{2,}|\t)/.test(line)) {
      collected.push(line);
      i += 1;
    } else {
      break;
    }
  }
  return { lines: collected, nextIndex: i };
}

function parseNestedObject(lines) {
  const obj = {};
  for (const line of lines) {
    const match = line.trim().match(/^([\w-]+):\s*(.*)$/);
    if (match) obj[match[1]] = parseValue(match[2].trim());
  }
  return obj;
}

function parseYamlList(lines) {
  const items = [];
  let currentItem = null;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('- ')) {
      if (currentItem !== null) items.push(currentItem);
      const afterDash = trimmed.slice(2).trim();
      const objMatch = afterDash.match(/^([\w-]+):\s*(.*)$/);
      if (objMatch) {
        currentItem = {};
        currentItem[objMatch[1]] = parseValue(objMatch[2].trim());
      } else {
        currentItem = parseValue(afterDash);
      }
    } else if (typeof currentItem === 'object' && currentItem !== null) {
      const objMatch = trimmed.match(/^([\w-]+):\s*(.*)$/);
      if (objMatch) currentItem[objMatch[1]] = parseValue(objMatch[2].trim());
    }
  }

  if (currentItem !== null) items.push(currentItem);
  return items;
}

function parseValue(raw) {
  if (raw === '' || raw === undefined) return null;
  if (raw === 'null') return null;
  if (raw === 'true') return true;
  if (raw === 'false') return false;

  if (raw.startsWith('[')) {
    try { return JSON.parse(raw); } catch { return raw; }
  }

  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }

  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  return raw;
}

/* ── custom ::: blocks ──────────────────────────────────────── */

const BLOCK_OPEN = /^:::(eli5|dev|interactive)(?:\s+(.*))?$/;

export function parseContentBlocks(rawMarkdown) {
  const sections = [];
  const errors = [];
  const lines = String(rawMarkdown || '').replace(/\r\n/g, '\n').split('\n');
  let current = null;
  let parent = null;
  let currentContent = [];
  let neutralContent = [];
  let widgetType = '';

  const flushNeutral = () => {
    if (neutralContent.length === 0) return;
    const body = neutralContent.join('\n');
    if (body.trim()) sections.push({ type: 'neutral', content: body });
    neutralContent = [];
  };

  const pushCurrent = (closed) => {
    if (!current) return;
    const body = currentContent.join('\n');
    if (!closed) errors.push(`Unclosed :::${current} block`);

    if (current === 'interactive') {
      let config = {};
      try {
        config = body.trim() ? JSON.parse(body) : {};
      } catch (error) {
        errors.push(`Interactive widget "${widgetType || 'generic'}" has invalid JSON: ${error.message}`);
        config = { raw: body };
      }
      if (body.trim()) sections.push({ type: 'interactive', widgetType: widgetType || 'generic', config });
    } else if (body.trim()) {
      sections.push({ type: current, content: body });
    }
  };

  for (const line of lines) {
    const openMatch = line.trim().match(BLOCK_OPEN);
    if (openMatch) {
      const nextType = openMatch[1];

      if (current === 'interactive') {
        errors.push(`:::${nextType} opened while an interactive widget was still open`);
        continue;
      }

      if (nextType === 'interactive') {
        // Interactive widgets may sit inside a mode block. Flush the mode
        // content, render the widget, then resume the same mode afterwards.
        if (current) {
          pushCurrent(true);
          parent = current;
        } else {
          flushNeutral();
          parent = null;
        }
        current = 'interactive';
        widgetType = (openMatch[2] || 'generic').trim();
        currentContent = [];
        continue;
      }

      if (current) {
        errors.push(`:::${nextType} opened before :::${current} was closed`);
        pushCurrent(true);
      } else {
        flushNeutral();
      }
      current = nextType;
      widgetType = '';
      currentContent = [];
      continue;
    }

    if (line.trim() === ':::' && current) {
      pushCurrent(true);
      currentContent = [];
      widgetType = '';
      if (parent) {
        current = parent;
        parent = null;
      } else {
        current = null;
      }
      continue;
    }

    if (current) currentContent.push(line);
    else neutralContent.push(line);
  }

  if (current) {
    pushCurrent(false);
    if (parent) {
      errors.push(`Unclosed :::${parent} block`);
      current = parent;
      currentContent = [];
      pushCurrent(false);
    }
  }
  flushNeutral();

  return { sections, errors };
}

export function calculateReadingTime(text, wordsPerMinute = 200) {
  const words = String(text || '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/* ── safety checks used by the content build ────────────────── */

const DANGEROUS_PATTERNS = [
  [/<script\b/i, '<script> tag'],
  [/<iframe\b/i, '<iframe> tag'],
  [/<object\b/i, '<object> tag'],
  [/<embed\b/i, '<embed> tag'],
  [/\son[a-z]+\s*=/i, 'inline event handler'],
  [/javascript\s*:/i, 'javascript: URL'],
];

export function findUnsafeMarkdown(source) {
  const findings = [];
  const withoutCode = String(source || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`\n]*`/g, '')
    // Markdown indented code blocks are code, not live HTML.
    .replace(/^(?: {4,}|\t).*$/gm, '');
  for (const [pattern, label] of DANGEROUS_PATTERNS) {
    if (pattern.test(withoutCode)) findings.push(label);
  }
  return findings;
}
