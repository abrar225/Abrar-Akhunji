import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { PROJECTS, EXPERIENCE, SKILLS } from '../constants/portfolio';
import { soundFX } from '../lib/soundFX';
import { askTwin, parseActions } from '../lib/twinBrain';
import { answerLocally } from '../lib/twinLocal';
import { canAsk, consume, remaining, mirror, DAILY_LIMIT } from '../lib/rateLimit';

/* ── ASCII banners ── */
const ASCII_BANNER_FULL = `
  █████╗ ██████╗ ██████╗  █████╗ ██████╗ 
 ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔══██╗
 ███████║██████╔╝██████╔╝███████║██████╔╝
 ██╔══██║██╔══██╗██╔══██╗██╔══██║██╔══██╗
 ██║  ██║██████╔╝██║  ██║██║  ██║██║  ██║
 ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
           FIXO CLI v2.6.0 — ARCHITECT EDITION
`;

const ASCII_BANNER_COMPACT = `
 ╔═══════════════════════════╗
 ║  FIXO CLI v2.6 — ABRAR   ║
 ║  ARCHITECT EDITION        ║
 ╚═══════════════════════════╝
`;

export default function CyberTerminal({ isOpen, onClose }) {
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState('green');
  const [isThinking, setIsThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [history, setHistory] = useState([]);
  const [aiHistory, setAiHistory] = useState([]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const containerRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Init terminal on open
  useEffect(() => {
    if (isOpen) {
      soundFX.playSciFi();
      setHistory([
        { text: isMobile ? ASCII_BANNER_COMPACT : ASCII_BANNER_FULL, type: 'banner' },
        { text: "Type 'help' for commands, or just ask me anything.", type: 'sys' },
        { text: `[AI Engine: Online | ${remaining()}/${DAILY_LIMIT} queries remaining]`, type: 'sys' },
      ]);
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      abortRef.current?.abort();
    }
  }, [isOpen, isMobile]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Virtual keyboard handling for mobile
  useEffect(() => {
    if (!isOpen || typeof visualViewport === 'undefined') return;
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${visualViewport.height}px`;
      }
    };
    visualViewport.addEventListener('resize', handleResize);
    return () => visualViewport.removeEventListener('resize', handleResize);
  }, [isOpen]);

  /* ── AI query handler ── */
  const queryAI = useCallback(async (question, currentAiHistory) => {
    // 1. Try local brain first (free, instant)
    const local = answerLocally(question);
    if (local) {
      return {
        text: local.text
          .replace(/\*\*([^*]+)\*\*/g, '$1')
          .replace(/\*([^*]+)\*/g, '$1'),
        source: 'local',
      };
    }

    // 2. Check rate limit
    if (!canAsk()) {
      return {
        text: `[RATE LIMIT] Daily AI quota exhausted (${DAILY_LIMIT}/${DAILY_LIMIT} used).\nLocal commands (help, projects, skills, etc.) still available.\nReset: midnight UTC.`,
        source: 'limit',
      };
    }

    // 3. LLM path
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    const messages = [
      ...currentAiHistory.slice(-8),
      { role: 'user', content: question },
    ];

    try {
      const { content, remaining: left } = await askTwin(messages, {
        signal: abortRef.current.signal,
      });
      if (left != null) mirror(left); else consume();

      const { clean } = parseActions(content);
      const terminalText = (clean || 'No response received.')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/#{1,6}\s/g, '');

      return { text: terminalText, source: 'llm', messages };
    } catch (err) {
      if (err.name === 'AbortError') return null;
      if (err.code === 'rate_limited') {
        mirror(0);
        return {
          text: '[RATE LIMIT] Server reports daily quota exhausted.\nUse local commands or contact: abrar@abrarakhunji.com',
          source: 'limit',
        };
      }
      return {
        text: `[ERROR] AI connection failed: ${err.message}\nFallback to local commands available.`,
        source: 'error',
      };
    }
  }, []);

  /* ── Command processor ── */
  const handleCommand = useCallback(async (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.trim();
    if (!cmd || isThinking) return;

    soundFX.playClick();
    const newHist = [...history, { text: `$ ${cmd}`, type: 'user' }];
    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    setInput('');

    switch (mainCmd) {
      case 'help':
        newHist.push({
          type: 'output',
          text: `
FIXO CLI — COMMAND REFERENCE
═══════════════════════════════════════
  help             Show this manual
  whoami / bio     Developer credentials
  projects         List all projects
  project <id>     Inspect project specs
  skills           Technical arsenal
  experience       Career timeline
  theme <color>    Set theme (green|amber|cyan)
  fixo run test    Run FixO test suite
  ask <question>   Ask the AI anything
  clear            Clear terminal buffer
  exit             Close terminal
═══════════════════════════════════════
  TIP: Any unrecognized input is
  automatically sent to the AI.

  [AI Queries: ${remaining()}/${DAILY_LIMIT} remaining]
`,
        });
        setHistory(newHist);
        return;

      case 'whoami':
      case 'bio':
        newHist.push({
          type: 'output',
          text: `
┌─────────────────────────────────────┐
│  NAME:     Abrar Akhunji            │
│  ROLE:     Full-Stack AI Engineer   │
│  LOCATION: Gujarat, India          │
│  CORE:     Python, Django, PyTorch, │
│            React, OpenCV, ViT       │
│  MISSION:  Engineering autonomous,  │
│            self-correcting systems  │
│  STATUS:   Open to work            │
└─────────────────────────────────────┘
`,
        });
        setHistory(newHist);
        return;

      case 'projects':
        newHist.push({
          type: 'output',
          text: PROJECTS.map(
            (p, i) => `[${String(i + 1).padStart(2, '0')}] ${p.title.padEnd(30)} ${p.category.padEnd(16)} ${p.year}`
          ).join('\n'),
        });
        setHistory(newHist);
        return;

      case 'project': {
        const idx = parseInt(arg, 10) - 1;
        if (isNaN(idx) || !PROJECTS[idx]) {
          newHist.push({ type: 'error', text: "[ERR] Invalid project ID. Usage: 'project 1'" });
        } else {
          const p = PROJECTS[idx];
          newHist.push({
            type: 'output',
            text: `
== PROJECT: ${p.title} ==
  Category:     ${p.category} (${p.year})
  Description:  ${p.description}
  Architecture: ${p.architecture || 'Modular pipeline'}
  Tech Stack:   ${p.tech.join(', ')}
  Features:
${p.features.map((f) => `    > ${f}`).join('\n')}
`,
          });
        }
        setHistory(newHist);
        return;
      }

      case 'skills':
        newHist.push({
          type: 'output',
          text: SKILLS.map((s) => `  [${s.t.padEnd(18)}] > ${s.d}`).join('\n'),
        });
        setHistory(newHist);
        return;

      case 'experience':
        newHist.push({
          type: 'output',
          text: EXPERIENCE.map((e) => `  * ${e.role} (${e.date})\n    ${e.desc}`).join('\n\n'),
        });
        setHistory(newHist);
        return;

      case 'theme':
        if (['green', 'amber', 'cyan'].includes(arg)) {
          setTheme(arg);
          newHist.push({ type: 'sys', text: `[SYS] Phosphor theme > ${arg.toUpperCase()}` });
        } else {
          newHist.push({ type: 'error', text: "[ERR] Invalid theme. Options: green | amber | cyan" });
        }
        setHistory(newHist);
        return;

      case 'fixo':
        if (parts.slice(1).join(' ') === 'run test') {
          newHist.push(
            { type: 'sys', text: '⚡ Initializing FixO Autonomous Self-Correction Loop...' },
            { type: 'sys', text: '[PASS] Tree-Sitter AST workspace indexing complete.' },
            { type: 'sys', text: '[PASS] FreeLLMAPI multi-provider router connected.' },
            { type: 'sys', text: '[PASS] All 42 unit test suites passed — 0 failures.' },
            { type: 'sys', text: '[DONE] FixO test suite completed successfully.' }
          );
        } else {
          newHist.push({ type: 'error', text: "[ERR] Unknown FixO flag. Try: 'fixo run test'" });
        }
        setHistory(newHist);
        return;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        onClose?.();
        return;

      default:
        break;
    }

    // ── AI Handler (for `ask` or any unrecognized input) ──
    const question = mainCmd === 'ask' && arg ? arg : cmd;

    if (!question.trim()) {
      newHist.push({ type: 'error', text: "[ERR] No question provided. Usage: ask <your question>" });
      setHistory(newHist);
      return;
    }

    newHist.push({ type: 'thinking', text: '[PROCESSING...] Querying AI engine' });
    setHistory(newHist);
    setIsThinking(true);

    const result = await queryAI(question, aiHistory);

    setIsThinking(false);
    if (!result) return;

    if (result.messages) {
      setAiHistory(result.messages);
    }

    setHistory((prev) => {
      const updated = prev.filter((h) => h.type !== 'thinking');
      const sourceTag = result.source === 'local' ? '[LOCAL]' : result.source === 'llm' ? '[AI]' : '[SYS]';
      updated.push({
        type: result.source === 'error' || result.source === 'limit' ? 'error' : 'ai-response',
        text: `${sourceTag} ${result.text}`,
      });
      if (result.source === 'llm') {
        updated.push({
          type: 'sys',
          text: `[${remaining()}/${DAILY_LIMIT} AI queries remaining]`,
        });
      }
      return updated;
    });
  }, [input, history, isThinking, aiHistory, queryAI, onClose]);

  const themeColors = {
    green: { text: '#00FF66', border: 'rgba(0,255,102,0.3)', glow: 'rgba(0,255,102,0.15)' },
    amber: { text: '#FFB000', border: 'rgba(255,176,0,0.3)', glow: 'rgba(255,176,0,0.15)' },
    cyan: { text: '#00E5FF', border: 'rgba(0,229,255,0.3)', glow: 'rgba(0,229,255,0.15)' },
  };
  const tc = themeColors[theme];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-xl"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full h-full sm:h-[85vh] sm:max-h-[700px] max-w-5xl sm:mx-4 sm:rounded-xl flex flex-col overflow-hidden font-mono"
            style={{
              color: tc.text,
              borderColor: tc.border,
              borderWidth: '1px',
              borderStyle: 'solid',
              backgroundColor: '#000',
              boxShadow: `0 0 50px ${tc.glow}`,
            }}
          >
            {/* Scanline CRT FX */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20 opacity-60" />

            {/* Header */}
            <div
              className="p-3 sm:p-4 flex items-center justify-between shrink-0 z-30"
              style={{ borderBottom: `1px solid ${tc.border}`, backgroundColor: 'rgba(0,0,0,0.8)' }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <TerminalIcon size={16} />
                <span className="text-[10px] sm:text-xs tracking-widest uppercase font-bold truncate">
                  FixO CLI — Interactive Terminal
                </span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                {['green', 'amber', 'cyan'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setTheme(c)}
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-current transition-transform hover:scale-125"
                    style={{
                      backgroundColor: c === 'green' ? '#00FF66' : c === 'amber' ? '#FFB000' : '#00E5FF',
                    }}
                    title={`Theme ${c}`}
                  />
                ))}
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded hover:bg-white/10 transition-colors ml-2 sm:ml-4"
                  aria-label="Close terminal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Output Screen */}
            <div className="p-3 sm:p-4 md:p-6 overflow-y-auto flex-1 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm leading-relaxed z-10">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={
                    h.type === 'user'
                      ? 'font-bold opacity-100'
                      : h.type === 'error'
                      ? 'text-red-400'
                      : h.type === 'sys'
                      ? 'opacity-80 italic'
                      : h.type === 'thinking'
                      ? 'opacity-70 animate-pulse'
                      : h.type === 'ai-response'
                      ? 'opacity-95 border-l-2 border-current/30 pl-3'
                      : h.type === 'banner'
                      ? 'whitespace-pre overflow-x-auto opacity-90'
                      : 'whitespace-pre-wrap opacity-90'
                  }
                >
                  {h.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Prompt Input */}
            <div
              className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3 z-30 shrink-0"
              style={{
                borderTop: `1px solid ${tc.border}`,
                backgroundColor: 'rgba(0,0,0,0.8)',
                paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))',
              }}
            >
              <span className="font-bold text-xs sm:text-sm">{isThinking ? '⏳' : '$'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                disabled={isThinking}
                placeholder={isThinking ? 'Processing...' : "Type command or ask anything..."}
                className="w-full bg-transparent outline-none placeholder:opacity-40 text-[11px] sm:text-xs md:text-sm disabled:opacity-50"
                style={{ color: 'inherit' }}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
