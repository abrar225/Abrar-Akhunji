import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Headphones, Settings2 } from "lucide-react";

const MALE_VOICES = ['siri male', 'alex', 'daniel', 'microsoft david', 'google uk english male'];
const FEMALE_VOICES = ['siri female', 'samantha', 'microsoft zira', 'google us english'];

export default function WebSpeechPlayer({ contentRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  
  // Options
  const [voiceGender, setVoiceGender] = useState('female');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [availableVoices, setAvailableVoices] = useState({ male: null, female: null });
  
  // Progress tracking
  const [progress, setProgress] = useState(0);
  
  const synth = window.speechSynthesis;
  const globalOffsetRef = useRef(0);
  const totalLengthRef = useRef(0);
  const utteranceRef = useRef(null);

  // Initialize voices
  useEffect(() => {
    if (!synth) {
      setIsSupported(false);
      return;
    }
    const loadVoices = () => {
      const voices = synth.getVoices();
      
      const findBestVoice = (priorities) => {
        for (const p of priorities) {
          const found = voices.find(v => v.name.toLowerCase().includes(p));
          if (found) return found;
        }
        // Fallback
        return voices.find(v => v.lang.startsWith('en')) || voices[0];
      };
      
      setAvailableVoices({
        male: findBestVoice(MALE_VOICES),
        female: findBestVoice(FEMALE_VOICES)
      });
    };
    
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (synth) synth.cancel();
      removeHighlight();
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
        
        // Smart scroll: only scroll if out of viewport
        const rect = mark.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const topThreshold = 100; // Header offset
        const bottomThreshold = viewportHeight - 100;
        
        if (rect.top < topThreshold || rect.bottom > bottomThreshold) {
           mark.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (e) {
        // Ignore range errors
      }
    }
  }, [contentRef, removeHighlight]);

  const speak = (startIndex = 0, overrideGender = null, overrideRate = null) => {
    if (!contentRef.current) return;
    
    synth.cancel();
    removeHighlight();
    
    const fullText = contentRef.current.textContent;
    totalLengthRef.current = fullText.length;
    
    const textToSpeak = fullText.substring(startIndex);
    if (!textToSpeak.trim()) return;
    
    globalOffsetRef.current = startIndex;
    
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const activeGender = overrideGender || voiceGender;
    const selectedVoice = availableVoices[activeGender];
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = overrideRate || playbackRate;
    
    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const absoluteIndex = globalOffsetRef.current + e.charIndex;
        highlightWord(absoluteIndex);
        
        // Update progress bar
        if (totalLengthRef.current > 0) {
           setProgress((absoluteIndex / totalLengthRef.current) * 100);
        }
      }
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      removeHighlight();
    };
    
    utteranceRef.current = utterance;
    synth.speak(utterance);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      if (synth.paused) {
        synth.resume();
        setIsPlaying(true);
      } else {
        // Start fresh or resume from last progress if stopped
        const startIdx = Math.floor((progress / 100) * totalLengthRef.current) || 0;
        speak(startIdx);
      }
    }
  };

  const handleSeek = (e) => {
    if (!contentRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    
    setProgress(percentage * 100);
    
    const fullText = contentRef.current.textContent;
    totalLengthRef.current = fullText.length;
    let targetIndex = Math.floor(percentage * totalLengthRef.current);
    
    // Backup to nearest word boundary
    while(targetIndex > 0 && !/\s/.test(fullText[targetIndex - 1])) {
       targetIndex--;
    }
    
    if (isPlaying || synth.paused) {
       speak(targetIndex);
    }
  };

  const handleGenderToggle = () => {
    const newGender = voiceGender === 'female' ? 'male' : 'female';
    setVoiceGender(newGender);
    if (isPlaying || synth.paused) {
       const currentAbsolute = Math.floor((progress / 100) * totalLengthRef.current) || 0;
       setTimeout(() => speak(currentAbsolute, newGender, null), 10);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newSpeed = speeds[nextIdx];
    setPlaybackRate(newSpeed);
    
    if (isPlaying || synth.paused) {
       const currentAbsolute = Math.floor((progress / 100) * totalLengthRef.current) || 0;
       setTimeout(() => speak(currentAbsolute, null, newSpeed), 10);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="bg-surface border border-line rounded-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs text-accent">
          <Headphones size={14} strokeWidth={2.5} />
          <span>🎧 Advanced Neural Narrator</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Speed Control */}
          <button 
            onClick={cycleSpeed}
            className="text-xs font-mono px-2 py-1 rounded bg-elevated border border-line text-muted hover:text-fg hover:border-accent transition-colors"
          >
            {playbackRate}x
          </button>
          
          {/* Voice Gender Toggle */}
          <button 
            onClick={handleGenderToggle}
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
        >
          <motion.div 
            className="absolute top-0 left-0 h-full bg-accent"
            style={{ width: `${progress}%` }}
            layout
          />
          <div className="absolute inset-0 bg-fg/0 group-hover:bg-fg/5 transition-colors" />
        </div>
      </div>
    </div>
  );
}
