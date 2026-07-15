import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, CheckCircle, XCircle, Terminal, HelpCircle, Clock } from 'lucide-react';

/* ── Prompt Playground Widget ── */
function PromptPlayground({ config }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setIsThinking(true);
    setResponse(null);
    // Simulate AI thinking
    setTimeout(() => {
      setIsThinking(false);
      setResponse(config.simulatedResponse || `Great prompt! In a real implementation, this would call the ${config.model || 'AI'} API with your input. The key takeaway is that prompt engineering is about being specific and providing context.`);
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-line bg-surface overflow-hidden">
      <div className="px-5 py-3 border-b border-line flex items-center gap-2">
        <Terminal size={14} className="text-accent" />
        <span className="text-xs font-mono text-accent uppercase tracking-widest">
          {config.title || 'Prompt Playground'}
        </span>
      </div>
      <div className="p-5 space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={config.placeholder || 'Type your prompt here...'}
          className="w-full bg-elevated border border-line rounded-xl p-4 text-sm text-fg placeholder:text-faint font-mono resize-none focus:outline-none focus:border-accent/50 transition-colors"
          rows={3}
        />
        {config.examples && (
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-mono text-faint uppercase tracking-widest">Try:</span>
            {config.examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setInput(ex)}
                className="text-xs px-2.5 py-1 rounded-full bg-elevated border border-line text-muted hover:text-accent hover:border-accent/50 transition-colors font-mono"
              >
                {ex}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isThinking}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-[#0F0E0C] rounded-full text-sm font-medium hover:bg-accent-soft transition-colors disabled:opacity-50"
          >
            <Play size={14} /> Run
          </motion.button>
          <button
            onClick={() => { setInput(''); setResponse(null); }}
            className="flex items-center gap-2 px-4 py-2.5 border border-line rounded-full text-sm text-muted hover:text-fg transition-colors"
          >
            <RotateCcw size={14} /> Clear
          </button>
        </div>

        <AnimatePresence>
          {(isThinking || response) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 p-4 rounded-xl bg-elevated border border-line"
            >
              {isThinking ? (
                <div className="flex items-center gap-3 text-muted text-sm">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <RotateCcw size={14} />
                  </motion.div>
                  Thinking...
                </div>
              ) : (
                <p className="text-sm text-fg leading-relaxed font-mono">{response}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Quiz Widget ── */
function QuizBlock({ config }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === config.correct;

  return (
    <div className="rounded-2xl border border-line bg-surface overflow-hidden">
      <div className="px-5 py-3 border-b border-line flex items-center gap-2">
        <HelpCircle size={14} className="text-accent" />
        <span className="text-xs font-mono text-accent uppercase tracking-widest">Quick Check</span>
      </div>
      <div className="p-5 space-y-4">
        <p className="text-fg text-base font-medium">{config.question}</p>
        <div className="space-y-2">
          {config.options?.map((option, i) => {
            let borderColor = 'var(--color-line)';
            let bgColor = 'transparent';
            if (submitted && i === config.correct) {
              borderColor = '#1F6F5C';
              bgColor = 'rgba(31, 111, 92, 0.1)';
            } else if (submitted && i === selected && !isCorrect) {
              borderColor = '#A0325A';
              bgColor = 'rgba(160, 50, 90, 0.1)';
            } else if (!submitted && i === selected) {
              borderColor = 'var(--color-accent)';
              bgColor = 'rgba(255, 90, 31, 0.05)';
            }

            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={() => !submitted && setSelected(i)}
                disabled={submitted}
                className="w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-center gap-3"
                style={{ borderColor, backgroundColor: bgColor }}
              >
                <span className="w-6 h-6 rounded-full border border-line flex items-center justify-center text-xs font-mono text-muted flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-fg">{option}</span>
                {submitted && i === config.correct && <CheckCircle size={16} className="ml-auto text-[#1F6F5C]" />}
                {submitted && i === selected && !isCorrect && i !== config.correct && <XCircle size={16} className="ml-auto text-[#A0325A]" />}
              </motion.button>
            );
          })}
        </div>
        {!submitted ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => selected !== null && setSubmitted(true)}
            disabled={selected === null}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-[#0F0E0C] rounded-full text-sm font-medium hover:bg-accent-soft transition-colors disabled:opacity-30"
          >
            Check Answer
          </motion.button>
        ) : (
          <div className={`p-3 rounded-xl text-sm ${isCorrect ? 'bg-[rgba(31,111,92,0.1)] text-[#1F6F5C]' : 'bg-[rgba(160,50,90,0.1)] text-[#A0325A]'}`}>
            {isCorrect ? '✅ Correct!' : '❌ Not quite.'} {config.explanation || ''}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Timeline Widget ── */
function TimelineBlock({ config }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="rounded-2xl border border-line bg-surface overflow-hidden">
      <div className="px-5 py-3 border-b border-line flex items-center gap-2">
        <Clock size={14} className="text-accent" />
        <span className="text-xs font-mono text-accent uppercase tracking-widest">
          {config.title || 'Timeline'}
        </span>
      </div>
      <div className="p-5">
        <div className="relative ml-4 border-l border-line space-y-6">
          {config.steps?.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveStep(i)}
              className="relative pl-6 text-left w-full group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span
                className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300"
                style={{
                  borderColor: i <= activeStep ? 'var(--color-accent)' : 'var(--color-line)',
                  backgroundColor: i <= activeStep ? 'var(--color-accent)' : 'var(--color-surface)',
                  boxShadow: i === activeStep ? '0 0 8px rgba(255,90,31,0.4)' : 'none',
                }}
              />
              <p className={`text-xs font-mono uppercase tracking-widest mb-1 transition-colors ${i === activeStep ? 'text-accent' : 'text-faint'}`}>
                {step.label || `Step ${i + 1}`}
              </p>
              <p className={`text-sm transition-colors ${i === activeStep ? 'text-fg' : 'text-muted'}`}>
                {step.title}
              </p>
              <AnimatePresence>
                {i === activeStep && step.detail && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-muted mt-1 leading-relaxed"
                  >
                    {step.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main InteractiveBlock Router ── */
import InteractiveChart from './InteractiveChart';
import InteractiveFlashcards from './InteractiveFlashcards';
import ConceptVisualizer from './ConceptVisualizer';

export default function InteractiveBlock({ widgetType, config }) {
  switch (widgetType) {
    case 'prompt-playground':
      return <PromptPlayground config={config} />;
    case 'quiz':
      return <QuizBlock config={config} />;
    case 'timeline':
      return <TimelineBlock config={config} />;
    case 'chart':
      return <InteractiveChart config={config} />;
    case 'flashcards':
      return <InteractiveFlashcards config={config} />;
    case 'concept':
      return <ConceptVisualizer config={config} />;
    default:
      return (
        <div className="p-4 rounded-xl border border-line bg-surface text-muted text-sm font-mono">
          Unknown interactive widget: {widgetType}
        </div>
      );
  }
}
