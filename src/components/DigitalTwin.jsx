import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ArrowUp, Sparkles } from 'lucide-react';
import { askTwin, parseActions, twinConfigured } from '../lib/twinBrain';
import { answerLocally } from '../lib/twinLocal';
import { canAsk, consume, remaining, mirror, DAILY_LIMIT } from '../lib/rateLimit';

/**
 * DigitalTwin — a living "neural orb" that is Abrar's AI twin.
 *
 * Local-first: common questions about Abrar are answered instantly & free from
 * the portfolio data (twinLocal); only out-of-scope questions hit the LLM, and
 * those are capped per-browser per-day (rateLimit). The twin is agentic — it can
 * drive the site via directives parsed from replies.
 */

const RESUME_URL = 'https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing';
const FIXO_URL = 'https://fixo.firehox.com/';
const EMAIL = 'moabrarakhunji@gmail.com';

const SUGGESTIONS = ['Who is Abrar?', 'Best project?', 'AI/ML skills', 'Open to work?'];

const PROACTIVE = {
  'about-me': "Curious what I'm about? Ask me anything.",
  work: 'These demos are live — want a tour?',
  experience: 'Ask me about my internships or certs.',
  contact: "Want Abrar's email?",
};

/* ── agentic actions ─────────────────────────────────────────────────── */
function runAction({ type, arg }, { setTheme, highlightProject }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis?.scrollTo) window.__lenis.scrollTo(el, { offset: -40 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };
  switch (type) {
    case 'scroll': {
      const map = { home: 'home', about: 'about-me', work: 'work', experience: 'experience', contact: 'contact' };
      scrollTo(map[arg] || arg);
      break;
    }
    case 'open':
      highlightProject?.(arg);
      break;
    case 'theme':
      if (arg === 'dark' || arg === 'light') setTheme?.(arg);
      break;
    case 'resume':
      window.open(RESUME_URL, '_blank', 'noopener');
      break;
    case 'fixo':
      window.open(FIXO_URL, '_blank', 'noopener');
      break;
    case 'email':
      window.location.href = `mailto:${EMAIL}`;
      break;
    default:
      break;
  }
}

/* ── tiny markdown → react (bold, links, bullets, paragraphs) ─────────── */
function inline(text, kp) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g);
  return parts.filter(Boolean).map((part, i) => {
    const key = `${kp}-${i}`;
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={key} className="font-semibold text-fg">{part.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(part)) return <em key={key} className="text-accent-soft not-italic">{part.slice(1, -1)}</em>;
    const md = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (md) return <a key={key} href={md[2]} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-accent-soft">{md[1]}</a>;
    if (/^https?:\/\//.test(part)) return <a key={key} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 break-all">link</a>;
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

function RichText({ text }) {
  const lines = text.split('\n');
  const blocks = [];
  let list = null;
  lines.forEach((ln) => {
    const t = ln.trim();
    if (/^[•\-*]\s+/.test(t)) {
      (list ||= []).push(t.replace(/^[•\-*]\s+/, ''));
    } else {
      if (list) { blocks.push({ t: 'ul', items: list }); list = null; }
      if (t) blocks.push({ t: 'p', text: t });
    }
  });
  if (list) blocks.push({ t: 'ul', items: list });

  return (
    <>
      {blocks.map((b, i) =>
        b.t === 'ul' ? (
          <ul key={i} className="space-y-1.5 my-1.5">
            {b.items.map((it, j) => (
              <li key={j} className="flex gap-2">
                <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                <span>{inline(it, `${i}-${j}`)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>{inline(b.text, `${i}`)}</p>
        )
      )}
    </>
  );
}

/* ── the neural orb ──────────────────────────────────────────────────── */
function Orb({ thinking, reduced, size = 'w-14 h-14 md:w-16 md:h-16' }) {
  return (
    <div className={`relative ${size}`}>
      {!reduced && (
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/30 blur-xl"
          animate={thinking ? { scale: [1, 1.5, 1], opacity: [0.55, 0.2, 0.55] } : { scale: [1, 1.22, 1], opacity: [0.35, 0.14, 0.35] }}
          transition={{ duration: thinking ? 0.9 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div className="absolute inset-0 rounded-full overflow-hidden border border-accent/40 shadow-[0_0_28px_-6px_var(--color-accent)]"
        style={{ background: 'radial-gradient(circle at 32% 26%, #FFAD82 0%, #FF5A1F 46%, #6d1f06 100%)' }}>
        {!reduced && (
          <motion.div
            className="absolute inset-[-45%] opacity-70 mix-blend-screen"
            style={{ background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.55), transparent 38%, rgba(255,180,120,0.6), transparent 72%)' }}
            animate={{ rotate: thinking ? -360 : 360 }}
            transition={{ duration: thinking ? 1.3 : 9, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: 'inset 0 -6px 14px rgba(0,0,0,0.45), inset 4px 4px 10px rgba(255,255,255,0.25)' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles size={18} className="text-white/95 drop-shadow" />
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-muted"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} />
      ))}
    </span>
  );
}

/* ── main ────────────────────────────────────────────────────────────── */
export default function DigitalTwin({ setTheme, highlightProject }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hint, setHint] = useState(null);
  const [dismissedHint, setDismissedHint] = useState(false);
  const [llmLeft, setLlmLeft] = useState(DAILY_LIMIT);

  const scrollRef = useRef(null);
  const abortRef = useRef(null);
  const typeRef = useRef(null);
  const inputRef = useRef(null);

  // proactive whisper on section change
  useEffect(() => {
    if (open || dismissedHint || reduced) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && PROACTIVE[e.target.id]) setHint(PROACTIVE[e.target.id]); }),
      { threshold: 0.5 }
    );
    Object.keys(PROACTIVE).forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [open, dismissedHint, reduced]);

  useEffect(() => { if (!hint) return; const t = setTimeout(() => setHint(null), 6000); return () => clearTimeout(t); }, [hint]);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, thinking]);
  useEffect(() => () => { abortRef.current?.abort(); clearInterval(typeRef.current); }, []);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 350); }, [open]);

  const openChat = useCallback(() => {
    setOpen(true); setHint(null); setLlmLeft(remaining());
    setMessages((m) => (m.length === 0
      ? [{ role: 'assistant', content: "Hey — I'm **Abrar's digital twin**. Ask me about his projects, skills, or FixO CLI, and I'll even walk you around the site." }]
      : m));
  }, []);

  // keyboard: "/" or ⌘K opens, Esc closes
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(e.target.tagName);
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault(); openChat();
      } else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openChat]);

  const typewriter = useCallback((full, actions) => {
    clearInterval(typeRef.current);
    const fire = () => actions.forEach((a) => runAction(a, { setTheme, highlightProject }));
    if (reduced) {
      setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content: full }]);
      fire();
      return;
    }
    let i = 0;
    typeRef.current = setInterval(() => {
      i += 2;
      setMessages((m) => [...m.slice(0, -1), { role: 'assistant', content: full.slice(0, i), streaming: i < full.length }]);
      if (i >= full.length) { clearInterval(typeRef.current); fire(); }
    }, 12);
  }, [reduced, setTheme, highlightProject]);

  const reply = useCallback((full, actions) => {
    setThinking(false);
    setMessages((m) => [...m, { role: 'assistant', content: '', streaming: true }]);
    typewriter(full, actions);
  }, [typewriter]);

  const send = useCallback(async (text) => {
    const q = (text ?? input).trim();
    if (!q || thinking) return;
    setInput(''); setHint(null); setDismissedHint(true);

    const history = [...messages, { role: 'user', content: q }];
    setMessages(history);
    setThinking(true);

    // 1) free local brain
    const local = answerLocally(q);
    if (local) { setTimeout(() => reply(local.text, local.actions), 340); return; }

    // 2) LLM path. The server (PHP proxy) is the real gate; this local check
    // just avoids an obviously-doomed round-trip. The limit can't be bypassed
    // by clearing storage because the server enforces it per IP.
    const limitReached = () => reply(
      `You've used all **${DAILY_LIMIT}** of today's AI questions 🙏 — but I can still answer anything about Abrar's **projects, skills, or experience** for free. Or email him at **${EMAIL}**.`,
      []
    );
    if (!canAsk()) { setTimeout(limitReached, 300); return; }

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    try {
      const { content, remaining: left } = await askTwin(history, { signal: abortRef.current.signal });
      if (left != null) { mirror(left); setLlmLeft(left); } else { setLlmLeft(consume()); }
      const { clean, actions } = parseActions(content);
      reply(clean || 'Hmm, I blanked on that — mind rephrasing?', actions);
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (err.code === 'rate_limited') { mirror(0); setLlmLeft(0); limitReached(); return; }
      reply(`My brain link dropped just now ⚡ — reach Abrar directly at **${EMAIL}**.`, []);
    }
  }, [input, thinking, messages, reply]);

  const showMeter = twinConfigured && llmLeft <= 3;

  return (
    <div className="fixed z-[70] bottom-24 right-4 md:bottom-8 md:right-8 flex flex-col items-end gap-3 pointer-events-none">
      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.55, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 30 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            style={{ transformOrigin: 'bottom right' }}
            className="pointer-events-auto w-[calc(100vw-2rem)] max-w-[380px] h-[64vh] max-h-[580px] rounded-[26px] border border-line bg-surface/90 backdrop-blur-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* header */}
            <div className="relative flex items-center justify-between px-4 py-3 border-b border-line">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <div className="flex items-center gap-3">
                <Orb thinking={thinking} reduced={reduced} size="w-9 h-9" />
                <div>
                  <p className="text-sm font-display font-medium text-fg leading-none">Abrar's Digital Twin</p>
                  <p className="text-[10px] font-mono mt-1 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${twinConfigured ? 'bg-[#28c840]' : 'bg-faint'} ${thinking ? 'animate-pulse' : ''}`} />
                    <span className="text-muted">{thinking ? 'thinking…' : twinConfigured ? 'online · ask me anything' : 'offline'}</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1.5 rounded-lg text-muted hover:text-fg hover:bg-elevated transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="twin-scroll flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && <div className="mb-0.5 shrink-0"><Orb thinking={false} reduced size="w-6 h-6" /></div>}
                  <div className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-accent text-[#0F0E0C] rounded-2xl rounded-br-md font-medium'
                      : 'bg-elevated text-fg/90 rounded-2xl rounded-bl-md'
                  }`}>
                    {m.role === 'assistant' ? <RichText text={m.content} /> : m.content}
                    {m.streaming && <span className="inline-block w-[3px] h-3.5 ml-0.5 -mb-0.5 bg-accent align-middle animate-pulse" />}
                  </div>
                </motion.div>
              ))}

              {thinking && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="mb-0.5 shrink-0"><Orb thinking reduced={reduced} size="w-6 h-6" /></div>
                  <div className="bg-elevated rounded-2xl rounded-bl-md px-3.5 py-2"><TypingDots /></div>
                </div>
              )}
            </div>

            {/* suggestions — shown whenever the twin is idle (after every answer) */}
            {!thinking && !messages[messages.length - 1]?.streaming && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="px-3 py-1.5 text-[11px] font-medium border border-line rounded-full text-muted hover:text-accent hover:border-accent/50 hover:bg-elevated transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <div className="px-3 pt-2 pb-3 border-t border-line">
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask my twin anything…"
                  className="flex-1 bg-elevated rounded-xl px-3.5 py-2.5 text-[13px] text-fg placeholder:text-faint outline-none focus:ring-1 focus:ring-accent/50 transition-shadow"
                />
                <button type="submit" disabled={!input.trim() || thinking} aria-label="Send"
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-accent text-[#0F0E0C] disabled:opacity-30 enabled:hover:scale-105 transition-all">
                  <ArrowUp size={16} />
                </button>
              </form>
              <p className="mt-2 px-1 text-[9px] font-mono text-faint flex items-center justify-between">
                <span>{showMeter ? `⚡ ${llmLeft}/${DAILY_LIMIT} AI questions left today` : 'Powered by FreeLLMAPI'}</span>
                <span className="opacity-60">press / to open</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* proactive whisper */}
      <AnimatePresence>
        {!open && hint && (
          <motion.button
            initial={{ opacity: 0, x: 16, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 16, scale: 0.9 }}
            onClick={openChat}
            className="pointer-events-auto max-w-[220px] px-3.5 py-2 rounded-2xl rounded-br-md bg-surface border border-line shadow-xl text-xs text-fg text-left leading-snug"
          >
            {hint}
          </motion.button>
        )}
      </AnimatePresence>

      {/* orb launcher */}
      {!open && (
        <motion.button onClick={openChat} className="pointer-events-auto" aria-label="Open Abrar's AI Digital Twin" data-cursor="Ask AI"
          whileHover={reduced ? {} : { scale: 1.08 }} whileTap={{ scale: 0.94 }}>
          <Orb thinking={false} reduced={reduced} />
        </motion.button>
      )}
    </div>
  );
}
