import { PROJECTS, EXPERIENCE, EDUCATION, SKILLS, CERTIFICATIONS } from '../constants/portfolio';

/**
 * twinBrain — the LLM layer for out-of-scope questions.
 *
 * PRODUCTION: talks to the server-side PHP proxy (/api/twin.php). No API key is
 * ever present in the client bundle; the proxy holds the key and enforces the
 * per-IP daily limit. Returns { content, remaining }.
 *
 * DEV (`npm run dev`): there's no PHP locally, so it calls the FreeLLMAPI
 * gateway directly using a VITE_ dev key. That branch is guarded by
 * import.meta.env.DEV and is dead-code-eliminated from the production build, so
 * the key literal never ships.
 */

const PROXY_URL = import.meta.env.VITE_TWIN_PROXY || `${import.meta.env.BASE_URL || '/'}api/twin.php`;

// dev-only direct config — referenced solely inside `if (import.meta.env.DEV)`
let DEV_KEY = '';
let DEV_ENDPOINT = '';
let DEV_MODEL = 'auto';
if (import.meta.env.DEV) {
  DEV_KEY = import.meta.env.VITE_FREELLM_API_KEY || '';
  DEV_MODEL = import.meta.env.VITE_FREELLM_MODEL || 'auto';
  const base = import.meta.env.VITE_FREELLM_URL || 'https://freellm-for-fixo.vercel.app/v1';
  DEV_ENDPOINT = /\/chat\/completions$/.test(base) ? base : `${base.replace(/\/$/, '')}/chat/completions`;
}

// In prod the proxy is always "configured"; in dev we need a local key.
export const twinConfigured = import.meta.env.DEV ? Boolean(DEV_KEY) : true;

/* ── knowledge base (grounds the model in real portfolio data) ── */
function buildKnowledge() {
  const projects = PROJECTS.map(
    (p) =>
      `• ${p.title} — ${p.category}, ${p.year}. ${p.description} Tech: ${p.tech.join(', ')}.${
        p.demo ? ` Live demo: ${p.demo}.` : ' (no public demo)'
      }`
  ).join('\n');
  const exp = EXPERIENCE.map((e) => `• ${e.role} (${e.date}): ${e.desc}`).join('\n');
  const edu = EDUCATION.map((e) => `• ${e.degree}, ${e.school} (${e.date})`).join('\n');
  const skills = SKILLS.map((s) => `${s.t} (${s.d})`).join('; ');
  const certs = CERTIFICATIONS.map((c) => `• ${c.title}: ${c.desc}`).join('\n');
  return `PROJECTS:\n${projects}\n\nEXPERIENCE:\n${exp}\n\nEDUCATION:\n${edu}\n\nSKILLS: ${skills}\n\nCERTIFICATIONS:\n${certs}`;
}

const SYSTEM_PROMPT = `You are "Abrar's Digital Twin" — a witty, sharp AI embedded in Abrar Akhunji's portfolio website. Abrar is an AI/ML & Full-Stack engineer from Gujarat, India, who "teaches machines to see & think". He builds computer-vision models and full-stack products, writes rap, and cooks. He is open to work.

VOICE: first person as Abrar's twin ("I built...", "Abrar trained..."). Confident, concise, a little playful. 1–3 short sentences unless asked for detail. Never invent facts not in the knowledge base; if unknown, say so and offer to connect them with Abrar.

You can CONTROL this website. When it helps, append ONE directive on its very last line, exactly in this format:
<<action:TYPE:ARG>>
Supported directives:
- <<action:scroll:home|about|work|experience|contact>>
- <<action:open:PROJECT_TITLE>>
- <<action:theme:dark|light>>
- <<action:resume:>>
- <<action:fixo:>>
- <<action:email:>>
Only emit a directive when the user clearly wants that action or it obviously helps. Never show the directive text in your prose; keep it on its own final line.

KNOWLEDGE BASE (the only source of truth):
${buildKnowledge()}`;

const ACTION_RE = /<<\s*action:\s*([a-z]+)\s*:\s*([^>]*)>>/gi;

/** Split a raw reply into clean prose + parsed actions. */
export function parseActions(text) {
  const actions = [];
  let m;
  ACTION_RE.lastIndex = 0;
  while ((m = ACTION_RE.exec(text)) !== null) {
    actions.push({ type: m[1].toLowerCase(), arg: (m[2] || '').trim() });
  }
  const clean = text.replace(ACTION_RE, '').replace(/\n{3,}/g, '\n\n').trim();
  return { clean, actions };
}

/**
 * Ask the twin. `history` = [{role, content}].
 * Returns { content, remaining } where remaining is the server's per-day count
 * left (number) or null when unknown (dev/direct).
 * Throws an error with `.code === 'rate_limited'` when the server cap is hit.
 */
export async function askTwin(history, { signal } = {}) {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.slice(-10).map((m) => ({ role: m.role, content: m.content })),
  ];

  // ── DEV: direct gateway call (local only; stripped from prod build) ──
  if (import.meta.env.DEV && DEV_KEY) {
    const res = await fetch(DEV_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DEV_KEY}` },
      body: JSON.stringify({ model: DEV_MODEL, messages, temperature: 0.6, max_tokens: 600, stream: false }),
      signal,
    });
    if (!res.ok) throw new Error(`Gateway error ${res.status}`);
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) throw new Error('Empty response from gateway.');
    return { content, remaining: null };
  }

  // ── PROD: secure PHP proxy (no key in client) ──
  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (res.status === 429) {
    const err = new Error('Daily limit reached.');
    err.code = 'rate_limited';
    throw err;
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Proxy error ${res.status}${detail ? `: ${detail.slice(0, 160)}` : ''}`);
  }

  const data = await res.json();
  const content = data?.content ?? data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from proxy.');
  const remaining = Number.isFinite(data?.remaining) ? data.remaining : null;
  return { content, remaining };
}
