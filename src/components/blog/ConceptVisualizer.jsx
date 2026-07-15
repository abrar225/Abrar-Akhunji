import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function ConceptVisualizer({ config }) {
  const [activeStep, setActiveStep] = useState(0);

  if (!config || !config.steps || config.steps.length === 0) {
    return null;
  }

  const { title, steps } = config;
  const currentStepData = steps[activeStep];

  const renderIcon = (iconName) => {
    if (!iconName) return null;
    
    // Check if it's an emoji (simple heuristic)
    if (/\p{Emoji}/u.test(iconName) && iconName.length <= 4) {
      return <span className="text-xl">{iconName}</span>;
    }

    // Try to render Lucide icon
    const IconComponent = LucideIcons[iconName];
    if (IconComponent) {
      return <IconComponent size={20} />;
    }

    return null;
  };

  return (
    <div className="my-10">
      {title && <h3 className="text-2xl font-display text-fg mb-6">{title}</h3>}
      
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
        {/* Left Column - Navigation */}
        <div className="flex flex-col gap-2 col-span-1">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={idx}
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
        <div className="col-span-2 bg-surface border border-line rounded-2xl p-8 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
          {/* Subtle Grid Pattern Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(var(--color-fg) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
