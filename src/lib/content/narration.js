/** Short utterances retain exact source offsets for seeking and highlighting. */
export function splitNarration(text, limit = 160) {
  const parts = [];
  let start = 0;
  while (start < text.length) {
    while (start < text.length && /\s/.test(text[start])) start++;
    if (start >= text.length) break;
    let end = Math.min(text.length, start + limit);
    if (end < text.length) {
      const sentence = [...text.slice(start, end).matchAll(/[.!?](?:\s|$)/g)].at(-1);
      if (sentence && sentence.index > limit * .35) end = start + sentence.index + 1;
      else { const space = text.lastIndexOf(' ', end); if (space > start) end = space; }
    }
    const spoken = text.slice(start, end).trimEnd();
    if (spoken) parts.push({ text: spoken, start, end: start + spoken.length });
    start = end;
  }
  return parts;
}
export function wordBounds(text, position) {
  let start = Math.max(0, Math.min(text.length, position));
  while (start < text.length && /\s/.test(text[start])) start++;
  while (start > 0 && !/\s/.test(text[start - 1])) start--;
  let end = start;
  while (end < text.length && !/\s/.test(text[end])) end++;
  return { start, end };
}
export function locateNarration(queue, position) {
  const index = queue.findIndex(part => position < part.offset + part.text.length);
  const partIndex = index < 0 ? Math.max(0, queue.length - 1) : index, part = queue[partIndex];
  return { index: partIndex, char: part ? wordBounds(part.text, Math.max(0, position - part.offset)).start : 0 };
}
export function collectNarration(root) {
  const queue = []; let offset = 0;
  if (!root) return queue;
  for (const element of root.querySelectorAll('.markdown-body :is(h1,h2,h3,h4,p,li)')) {
    if (element.closest('pre, table, .katex, [aria-hidden=true]') || element.parentElement.closest('li')) continue;
    const points = []; let text = '';
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, { acceptNode(node) {
      return node.parentElement.closest('pre, button, select, textarea, svg, math, .katex, [aria-hidden=true]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    } });
    while (walker.nextNode()) { const node = walker.currentNode; points.push({ node, start: text.length }); text += node.textContent; }
    for (const part of splitNarration(text)) { queue.push({ ...part, element, points, fullText: text, offset }); offset += part.text.length; }
  }
  return queue;
}
