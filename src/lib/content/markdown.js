import { Marked } from 'marked';

/* ── markdown ───────────────────────────────────────────────── */

function slugifyHeading(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const markdown = new Marked({
  gfm: true,
  breaks: false,
  renderer: {
    heading({ tokens, depth, text }) {
      const id = slugifyHeading(text);
      const inner = this.parser.parseInline(tokens);
      return `<h${depth}${id ? ` id="${id}"` : ''} data-slot="blog-heading">${inner}</h${depth}>\n`;
    },
  },
});

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isMathish(tex) {
  const trimmed = tex.trim();
  if (!trimmed || trimmed.length > 200) return false;
  if (/\\[a-zA-Z]+/.test(trimmed)) return true;
  if (/^\d/.test(trimmed)) return false;
  if (/^\s|\s$/.test(tex)) return false;
  return true;
}

function protectMath(source) {
  const segments = source.split(
    /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`|:::interactive\s+\w+\n\{[\s\S]*?\n\}\n:::\n?)/g
  );

  return segments
    .map((segment) => {
      if (/^(```|~~~|`|:::interactive)/.test(segment)) return segment;
      return segment
        .replace(/\$\$([^$]+?)\$\$/g, (match, tex) => {
          const trimmed = tex.trim();
          if (!trimmed) return match;
          return `<span class="math-slot" data-display="1" data-tex="${escapeAttr(trimmed)}"></span>`;
        })
        .replace(/(^|[^\w$])\$(?!\$)([^$\n]+?)\$(?!\w)/g, (match, lead, tex) => (
          isMathish(tex)
            ? `${lead}<span class="math-slot" data-display="0" data-tex="${escapeAttr(tex.trim())}"></span>`
            : match
        ));
    })
    .join('');
}

function dedupeHeadingIds(html) {
  const seen = new Map();
  return html.replace(/\sid="([^"]+)"/g, (match, id) => {
    const count = (seen.get(id) || 0) + 1;
    seen.set(id, count);
    return count === 1 ? match : ` id="${id}-${count}"`;
  });
}

export function markdownToHtml(source) {
  const html = markdown.parse(protectMath(String(source || '')));
  return dedupeHeadingIds(html)
    .replace(/<table>[\s\S]*?<\/table>/g, (table) => `<div class="table-wrap">${table}</div>`);
}
