import { useId, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { visualizerIcons } from '../../lib/content/visualizerIcons';

export default function ConceptVisualizer({ config }) {
  const [activeStep, setActiveStep] = useState(0);
  const id = useId(), reduced = useReducedMotion();

  if (!config || !config.steps || config.steps.length === 0) {
    return null;
  }

  const { title, steps } = config;
  const currentStepData = steps[Math.min(activeStep, steps.length - 1)];

  const renderIcon = (iconName) => {
    if (!iconName) return null;
    
    // Check if it's an emoji (simple heuristic)
    if (/\p{Emoji}/u.test(iconName) && iconName.length <= 4) {
      return <span className="text-xl">{iconName}</span>;
    }

    // Try to render Lucide icon
    const IconComponent = visualizerIcons[iconName];
    if (IconComponent) {
      return <IconComponent size={20} />;
    }

    return null;
  };

  return (
    <div className="concept-diagram my-10">
      {title && <h3 className="text-2xl font-display text-fg mb-6">{title}</h3>}
      
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
        {/* Left Column - Navigation */}
        <div className="flex flex-col gap-2 col-span-1" role="tablist" aria-label={title || 'Concept steps'} aria-orientation="vertical" onKeyDown={event => { const buttons = [...event.currentTarget.querySelectorAll('[role=tab]')]; const current = buttons.indexOf(document.activeElement); const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (current + 1) % steps.length : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (current + steps.length - 1) % steps.length : event.key === 'Home' ? 0 : event.key === 'End' ? steps.length - 1 : -1; if (next >= 0) { event.preventDefault(); setActiveStep(next); buttons[next].focus(); } }}>
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                id={`${id}-tab-${idx}`}
                aria-controls={`${id}-panel`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 border-l-2 ${
                  isActive 
                    ? 'bg-accent/10 border-accent text-accent' 
                    : 'border-transparent text-muted hover:bg-elevated hover:text-fg'
                }`}
              >
                <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${isActive ? 'bg-accent/20' : 'bg-surface border border-line'}`}>
                  {renderIcon(step.icon) || <span className="font-mono text-sm">{idx + 1}</span>}
                </div>
                <span className="font-body font-medium">{step.label || step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right Column - Content Display */}
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${activeStep}`} tabIndex={0} className="col-span-2 bg-surface border border-line rounded-2xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
          {/* Subtle Grid Pattern Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(var(--color-fg) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStep}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : .22, ease: 'easeOut' }}
              className="relative z-10"
            >
              <h4 className="text-2xl font-display text-fg mb-4">
                {currentStepData.title}
              </h4>
              <div 
                className="text-muted leading-relaxed font-body prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: currentStepData.content }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
