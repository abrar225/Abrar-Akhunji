import { PROJECTS, EXPERIENCE, EDUCATION, SKILLS, CERTIFICATIONS } from '../constants/portfolio';

/**
 * twinLocal — the "free brain".
 *
 * Answers common questions about Abrar instantly from the portfolio data, so
 * the token-costing LLM is only used for genuinely out-of-scope questions.
 * Returns { text, actions } on a confident match, or null → escalate to the LLM.
 *
 * Answers use a tiny markup the chat UI understands: **bold**, • bullets,
 * newlines, and [label](url) / bare links.
 */

// normalise with padding so single-word phrases can match on word boundaries
const norm = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()} `;
const has = (q, phrase) => (phrase.includes(' ') ? q.includes(phrase) : q.includes(` ${phrase} `));

// ── project name → answer ────────────────────────────────────────────────
const STOP = new Set(['the', 'and', 'app', 'system', 'cli', 'vs', 'android', 'management']);
const PROJECT_ALIASES = PROJECTS.map((p) => {
  const words = p.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
  return { p, aliases: Array.from(new Set([norm(p.title).trim(), ...words])) };
});

function projectAnswer(p) {
  return {
    text:
      `**${p.title}** · ${p.category} · ${p.year}\n\n${p.description}\n\n` +
      `**Stack:** ${p.tech.join(' · ')}` +
      (p.demo ? `\n\n[Open live demo ↗](${p.demo})` : '') +
      (p.github ? `\n[Source on GitHub ↗](${p.github})` : ''),
    actions: [{ type: 'scroll', arg: 'work' }],
  };
}

// ── general intents (ordered specific → general; first tie wins) ──────────
const INTENTS = [
  {
    id: 'resume',
    phrases: ['resume', 'cv', 'curriculum'],
    build: () => ({ text: "Opening Abrar's résumé now ↗", actions: [{ type: 'resume', arg: '' }] }),
  },
  {
    id: 'projects',
    phrases: ['projects', 'project', 'portfolio', 'showcase', 'built', 'your work', 'best work', 'best project', 'what have you'],
    build: () => ({
      text:
        `Abrar has shipped **${PROJECTS.length}+ projects**. A few highlights 👇\n` +
        PROJECTS.slice(0, 4).map((p) => `• **${p.title}** — ${p.description.split('. ')[0]}.`).join('\n') +
        `\n\nTaking you to them now ↓`,
      actions: [{ type: 'scroll', arg: 'work' }],
    }),
  },
  {
    id: 'skills',
    phrases: ['skill', 'skills', 'tech stack', 'technolog', 'stack', 'framework', 'languages', 'tools', 'expertise', 'good at'],
    build: () => ({
      text: `Here's Abrar's toolkit 🧰\n${SKILLS.map((s) => `• **${s.t}** — ${s.d}`).join('\n')}`,
      actions: [],
    }),
  },
  {
    id: 'experience',
    phrases: ['experience', 'internship', 'intern', 'career', 'job', 'companies', 'company', 'brainybeam', 'work history', 'worked'],
    build: () => ({
      text: `Abrar's journey so far 🚀\n${EXPERIENCE.map((e) => `• **${e.role}** — ${e.date}`).join('\n')}`,
      actions: [{ type: 'scroll', arg: 'experience' }],
    }),
  },
  {
    id: 'education',
    phrases: ['education', 'study', 'studied', 'college', 'university', 'degree', 'diploma', 'academic', 'kalol', 'polytechnic'],
    build: () => ({
      text: `Education 🎓\n${EDUCATION.map((e) => `• **${e.degree}** — ${e.school} (${e.date})`).join('\n')}`,
      actions: [],
    }),
  },
  {
    id: 'certs',
    phrases: ['certificat', 'certification', 'cert', 'award', 'achievement', 'hackathon', 'cybersecurity', 'gunipreneur', 'recognition'],
    build: () => ({
      text: `Certifications & wins 🏆\n${CERTIFICATIONS.slice(0, 6).map((c) => `• **${c.title}** — ${c.desc}`).join('\n')}`,
      actions: [],
    }),
  },
  {
    id: 'contact',
    phrases: ['contact', 'email', 'reach', 'get in touch', 'hire', 'available', 'open to work', 'freelance', 'work with', 'collaborat', 'connect'],
    build: () => ({
      text: `Reach Abrar at **moabrarakhunji@gmail.com** ✉️ — he's **open to work** and replies fast. Scrolling you to the contact section ↓`,
      actions: [{ type: 'scroll', arg: 'contact' }],
    }),
  },
  {
    id: 'location',
    phrases: ['location', 'based', 'where are you', 'where do you', 'which city', 'country', 'live in', 'from gujarat'],
    build: () => ({ text: `Abrar is based in **Gujarat, India** 🇮🇳 — open to remote & relocation.`, actions: [] }),
  },
  {
    id: 'hobbies',
    phrases: ['hobby', 'hobbies', 'rap', 'music', 'song', 'cook', 'free time', 'offline', 'for fun', 'outside of'],
    build: () => ({ text: `Off the clock, Abrar writes **rap songs** 🎤, cooks with friends 🍳, and tinkers with new tech.`, actions: [] }),
  },
  {
    id: 'help',
    phrases: ['what can you do', 'help me', 'commands', 'how to use', 'how does this work'],
    build: () => ({
      text:
        `I can tell you about Abrar's **projects, skills, experience, education & certs**, open his **résumé**, jump you to any **section**, or boot the **FixO** demo. Try a suggestion below 👇`,
      actions: [],
    }),
  },
  {
    id: 'greeting',
    phrases: ['hi', 'hello', 'hey', 'yo', 'hola', 'sup', 'namaste', 'good morning', 'good evening', 'howdy'],
    build: () => ({
      text: `Hey! 👋 I'm Abrar's digital twin. Ask me about his **projects**, **skills**, or **FixO CLI** — or say "show me your best work".`,
      actions: [],
    }),
  },
  {
    id: 'thanks',
    phrases: ['thank', 'thanks', 'thx', 'appreciate', 'cheers'],
    build: () => ({ text: `Anytime! 🙌 Anything else you'd like to know about Abrar?`, actions: [] }),
  },
  {
    id: 'identity',
    phrases: ['who is abrar', 'who are you', 'about abrar', 'about you', 'about yourself', 'tell me about', 'introduce', 'who is he', 'what do you do', 'your background', 'who r u'],
    build: () => ({
      text:
        `**Abrar Akhunji** is an AI/ML & Full-Stack engineer from Gujarat, India — he teaches machines to *see & think* 👁️\n\n` +
        `He builds computer-vision systems (Vision Transformers, medical imaging) and ships full-stack products with **Django, React & Next.js**. Right now he's **open to work**.`,
      actions: [],
    }),
  },
];

/** Try to answer locally. Returns { text, actions } or null (→ use LLM). */
export function answerLocally(raw) {
  const q = norm(raw);
  if (!q.trim()) return null;

  let best = null; // { score, build }

  // project-specific matches get a priority bump
  for (const { p, aliases } of PROJECT_ALIASES) {
    const score = aliases.reduce((n, a) => n + (has(q, a) ? 1 : 0), 0);
    if (score > 0 && (!best || score + 1 > best.score)) best = { score: score + 1, build: () => projectAnswer(p) };
  }

  for (const intent of INTENTS) {
    const score = intent.phrases.reduce((n, ph) => n + (has(q, ph) ? 1 : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { score, build: intent.build };
  }

  return best ? best.build() : null;
}
