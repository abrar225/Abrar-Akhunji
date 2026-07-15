import { motion } from "framer-motion";

/**
 * ELI5 / Developer Mode toggle.
 *
 * @param {{ mode: 'eli5' | 'dev', onToggle: (mode: 'eli5' | 'dev') => void }} props
 */
export default function ModeToggle({ mode, onToggle }) {
  const options = [
    { key: "eli5", emoji: "🧒", label: "Simple" },
    { key: "dev", emoji: "👨‍💻", label: "Developer" },
  ];

  return (
    <div
      className="inline-flex items-center bg-surface border border-line rounded-full p-1"
      role="radiogroup"
      aria-label="Reading mode"
    >
      {options.map((opt) => {
        const isActive = mode === opt.key;

        return (
          <button
            key={opt.key}
            role="radio"
            aria-checked={isActive}
            aria-label={`${opt.label} mode`}
            onClick={() => onToggle(opt.key)}
            className={`
              relative z-10 flex items-center gap-1.5
              px-4 py-2 rounded-full text-sm font-mono
              cursor-pointer transition-colors duration-200
              ${isActive ? "text-fg" : "text-muted hover:text-fg/70"}
            `}
          >
            {/* Sliding background indicator */}
            {isActive && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute inset-0 bg-elevated border border-line rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ zIndex: -1 }}
              />
            )}

            <span className="relative" aria-hidden="true">
              {opt.emoji}
            </span>
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
