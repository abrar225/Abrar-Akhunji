import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Headphones } from "lucide-react";

const MALE_VOICES = ['siri male', 'alex', 'daniel', 'microsoft david', 'google uk english male'];
const FEMALE_VOICES = ['siri female', 'samantha', 'microsoft zira', 'google us english'];

// Average speaking speed (~150 wpm ≈ 14 chars/sec at 1x) — used to estimate
// progress on browsers that never fire `onboundary` (e.g. Chrome on Android).
const CHARS_PER_SECOND = 14;

export default function WebSpeechPlayer({ contentRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  // Feature-detect once, outside the render cycle
  const [isSupported] = useState(() =>
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined'
  );

  // Options
  const [voiceGender, setVoiceGender] = useState('female');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [availableVoices, setAvailableVoices] = useState({ male: null, female: null });

  // Progress tracking
  const [progress, setProgress] = useState(0);

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const currentIndexRef = useRef(0);   // absolute char position in the article
  const totalLengthRef = useRef(0);
  const utteranceRef = useRef(null);
  const boundaryFiredRef = useRef(false); // did this browser give us word events?
  const estimatorRef = useRef(null);   // fallback progress timer
  const keepAliveRef = useRef(null);   // Chrome >15s utterance watchdog
  // While the user is manually scrolling (reading back, reaching for pause),
  // karaoke auto-follow must yield — otherwise every spoken word yanks the
  // viewport back to the highlight and the page becomes unscrollable.
  const userScrollUntilRef = useRef(0);

  // Detect USER-initiated scrolling only (wheel / touch / keys) — our own
  // scrollIntoView doesn't fire these, so auto-follow never suspends itself.
  useEffect(() => {
    const suspendAutoScroll = () => { userScrollUntilRef.current = Date.now() + 4000; };
    const onKeyScroll = (e) => {
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (scrollKeys.includes(e.key)) suspendAutoScroll();
    };
    window.addEventListener('wheel', suspendAutoScroll, { passive: true });
    window.addEventListener('touchmove', suspendAutoScroll, { passive: true });
    window.addEventListener('keydown', onKeyScroll);
    return () => {
      window.removeEventListener('wheel', suspendAutoScroll);
      window.removeEventListener('touchmove', suspendAutoScroll);
      window.removeEventListener('keydown', onKeyScroll);
    };
  }, []);

  const removeHighlight = useCallback(() => {
    if (!contentRef.current) return;
    const marks = contentRef.current.querySelectorAll("mark.tts-highlight");
    marks.forEach(mark => {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    });
  }, [contentRef]);

  const stopTimers = useCallback(() => {
    if (estimatorRef.current) { clearInterval(estimatorRef.current); estimatorRef.current = null; }
    if (keepAliveRef.current) { clearInterval(keepAliveRef.current); keepAliveRef.current = null; }
  }, []);

  // Initialize voices + full cleanup on unmount
  useEffect(() => {
    if (!isSupported) return;
    const synth = synthRef.current;
    const loadVoices = () => {
      const voices = synth.getVoices();
      if (!voices.length) return; // some browsers populate late — wait for the event

      const findBestVoice = (priorities) => {
        for (const p of priorities) {
          const found = voices.find(v => v.name.toLowerCase().includes(p));
          if (found) return found;
        }
        // Fallback
        return voices.find(v => v.lang && v.lang.startsWith('en')) || voices[0] || null;
      };

      setAvailableVoices({
        male: findBestVoice(MALE_VOICES),
        female: findBestVoice(FEMALE_VOICES)
      });
    };

    loadVoices();
    // addEventListener is safer than overwriting onvoiceschanged (Safari fires it repeatedly)
    if (typeof synth.addEventListener === 'function') {
      synth.addEventListener('voiceschanged', loadVoices);
    } else if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof synth.removeEventListener === 'function') {
        synth.removeEventListener('voiceschanged', loadVoices);
      } else if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = null;
      }
      synth.cancel();
      stopTimers();
      removeHighlight();
    };
  }, [isSupported, removeHighlight, stopTimers]);

  const highlightWord = useCallback((absoluteCharIndex) => {
    if (!contentRef.current) return;
    removeHighlight();

    let currentLength = 0;
    let targetNode = null;
    let offset = 0;

    const walker = document.createTreeWalker(contentRef.current, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const len = node.nodeValue.length;
      if (currentLength + len > absoluteCharIndex) {
        targetNode = node;
        offset = absoluteCharIndex - currentLength;
        break;
      }
      currentLength += len;
    }

    if (targetNode) {
      const text = targetNode.nodeValue;
      let endOffset = offset;
      while (endOffset < text.length && !/\s/.test(text[endOffset])) {
        endOffset++;
      }

      try {
        const range = document.createRange();
        range.setStart(targetNode, offset);
        range.setEnd(targetNode, endOffset);

        const mark = document.createElement("mark");
        mark.className = "tts-highlight";
        mark.style.backgroundColor = "rgba(255, 90, 31, 0.25)";
        mark.style.color = "var(--color-fg)";
        mark.style.borderRadius = "4px";
        mark.style.padding = "0 2px";
        mark.style.boxShadow = "0 0 12px rgba(255, 90, 31, 0.2)";

        range.surroundContents(mark);

        // Smart scroll: only follow the narration if the user isn't scrolling
        // themselves (4s grace after their last wheel/touch/key input)
        if (Date.now() >= userScrollUntilRef.current) {
          const rect = mark.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const topThreshold = 100; // Header offset
          const bottomThreshold = viewportHeight - 100;

          if (rect.top < topThreshold || rect.bottom > bottomThreshold) {
             mark.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      } catch {
        // Range can fail if a word spans nested elements — highlighting is
        // cosmetic, playback continues fine without it.
      }
    }
  }, [contentRef, removeHighlight]);

  const updateProgressUI = useCallback((absoluteIndex) => {
    currentIndexRef.current = absoluteIndex;
    if (totalLengthRef.current > 0) {
      setProgress(Math.min(100, (absoluteIndex / totalLengthRef.current) * 100));
    }
  }, []);

  const speak = useCallback((startIndex = 0, overrideGender = null, overrideRate = null) => {
    const synth = synthRef.current;
    if (!synth || !contentRef.current) return;

    synth.cancel();
    stopTimers();
    removeHighlight();

    const fullText = contentRef.current.textContent;
    totalLengthRef.current = fullText.length;

    const safeStart = Math.max(0, Math.min(startIndex, fullText.length - 1));
    const textToSpeak = fullText.substring(safeStart);
    if (!textToSpeak.trim()) return;

    currentIndexRef.current = safeStart;
    boundaryFiredRef.current = false;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const activeGender = overrideGender || voiceGender;
    const selectedVoice = availableVoices[activeGender];
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    const rate = overrideRate || playbackRate;
    utterance.rate = rate;

    utterance.onboundary = (e) => {
      if (utteranceRef.current !== utterance) return; // superseded by a newer utterance
      if (e.name === 'word') {
        boundaryFiredRef.current = true;
        const absoluteIndex = safeStart + e.charIndex;
        highlightWord(absoluteIndex);
        updateProgressUI(absoluteIndex);
      }
    };

    utterance.onend = () => {
      if (utteranceRef.current !== utterance) return;
      stopTimers();
      setIsPlaying(false);
      setProgress(100);
      currentIndexRef.current = 0; // next play restarts from the top
      removeHighlight();
    };

    utterance.onerror = (e) => {
      if (utteranceRef.current !== utterance) return;
      // 'interrupted'/'canceled' fire on our own cancel() calls — not real errors
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      stopTimers();
      setIsPlaying(false);
      removeHighlight();
    };

    utteranceRef.current = utterance;

    // Chrome quirk: speak() immediately after cancel() is sometimes silently
    // dropped — a micro-delay makes it reliable everywhere.
    setTimeout(() => {
      if (utteranceRef.current !== utterance) return;
      synth.speak(utterance);
    }, 50);
    setIsPlaying(true);

    // Watchdog 1 — Chrome desktop silently pauses long utterances (~15s in).
    // A periodic resume() while speaking un-sticks it; harmless no-op elsewhere.
    keepAliveRef.current = setInterval(() => {
      if (synth.speaking && !synth.paused) synth.resume();
    }, 10000);

    // Watchdog 2 — time-based progress estimator for browsers that never fire
    // onboundary (Chrome Android, some voices). Word events take precedence.
    const startedAt = Date.now();
    estimatorRef.current = setInterval(() => {
      if (boundaryFiredRef.current) return; // real word events are driving the UI
      if (!synth.speaking) return;
      const elapsed = (Date.now() - startedAt) / 1000;
      const estimated = safeStart + Math.floor(elapsed * CHARS_PER_SECOND * rate);
      updateProgressUI(Math.min(estimated, totalLengthRef.current));
    }, 500);
  }, [availableVoices, contentRef, highlightWord, playbackRate, removeHighlight, stopTimers, updateProgressUI, voiceGender]);

  // Pause is implemented as cancel + remembered position. Native pause()/resume()
  // is broken on Android Chrome and unreliable on iOS Safari; restarting the
  // utterance from the saved char index behaves identically on every platform
  // (it's the same mechanism seeking already uses).
  const togglePlay = () => {
    const synth = synthRef.current;
    if (!synth) return;
    if (isPlaying) {
      synth.cancel();
      stopTimers();
      setIsPlaying(false);
    } else {
      speak(currentIndexRef.current || 0);
    }
  };

  const seekToClientX = (clientX, target) => {
    if (!contentRef.current) return;
    const rect = target.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));

    setProgress(percentage * 100);

    const fullText = contentRef.current.textContent;
    totalLengthRef.current = fullText.length;
    let targetIndex = Math.floor(percentage * totalLengthRef.current);

    // Backup to nearest word boundary
    while (targetIndex > 0 && !/\s/.test(fullText[targetIndex - 1])) {
       targetIndex--;
    }

    currentIndexRef.current = targetIndex;
    if (isPlaying) {
      speak(targetIndex);
    }
  };

  const handleSeek = (e) => seekToClientX(e.clientX, e.currentTarget);

  const handleGenderToggle = () => {
    const newGender = voiceGender === 'female' ? 'male' : 'female';
    setVoiceGender(newGender);
    if (isPlaying) {
      speak(currentIndexRef.current, newGender, null);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackRate(newSpeed);

    if (isPlaying) {
      speak(currentIndexRef.current, null, newSpeed);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="bg-surface border border-line rounded-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <Headphones size={14} strokeWidth={2.5} />
          <span>🎧 Advanced Neural Narrator</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Speed Control */}
          <button
            onClick={cycleSpeed}
            aria-label={`Playback speed ${playbackRate}x — click to change`}
            className="text-xs font-mono px-2 py-1 rounded bg-elevated border border-line text-muted hover:text-fg hover:border-accent transition-colors"
          >
            {playbackRate}x
          </button>

          {/* Voice Gender Toggle */}
          <button
            onClick={handleGenderToggle}
            aria-label={`Voice: ${voiceGender} — click to switch`}
            className="flex items-center bg-elevated border border-line rounded-full p-1 relative w-16 h-8 cursor-pointer transition-colors"
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full shadow-sm bg-accent flex items-center justify-center transition-transform duration-300 ${voiceGender === 'male' ? 'translate-x-8' : 'translate-x-0'}`}>
              <span className="text-xs">{voiceGender === 'female' ? '👩' : '👨'}</span>
            </div>
            <div className="w-full flex justify-between px-2 text-xs opacity-50 select-none">
               <span>👩</span>
               <span>👨</span>
            </div>
          </button>
        </div>
      </div>

      {/* Controls & Timeline */}
      <div className="flex items-center gap-4">
        {/* Play / Pause */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center
                     text-white shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.span key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Pause size={20} fill="currentColor" />
              </motion.span>
            ) : (
              <motion.span key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play size={20} fill="currentColor" className="ml-1" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Timeline Bar */}
        <div
          className="flex-1 h-3 bg-elevated border border-line rounded-full cursor-pointer relative overflow-hidden group"
          onClick={handleSeek}
          role="slider"
          aria-label="Narration progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            style={{ width: `${progress}%` }}
            layout
          />
          <div className="absolute inset-0 bg-fg/0 group-hover:bg-fg/5 transition-colors" />
        </div>
      </div>

      {/* Floating pause — always reachable while narrating, no matter where
          the karaoke highlight has scrolled the page */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={togglePlay}
            aria-label="Pause narration"
            className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-accent text-white
                       flex items-center justify-center shadow-xl shadow-accent/30
                       hover:scale-105 active:scale-95 transition-transform"
          >
            <Pause size={22} fill="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
