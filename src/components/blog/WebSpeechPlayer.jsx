import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Headphones, User, UserPlus } from "lucide-react";

export default function WebSpeechPlayer({ contentRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  
  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);
  const originalNodes = useRef([]); // To restore DOM after highlighting

  // Initialize voices
  useEffect(() => {
    if (!synth) {
      setIsSupported(false);
      return;
    }
    const loadVoices = () => {
      const allVoices = synth.getVoices();
      // Try to find a good male and female voice
      const engVoices = allVoices.filter(v => v.lang.startsWith('en'));
      setVoices(engVoices);
      if (engVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(engVoices[0]);
      }
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

  const highlightWord = useCallback((charIndex) => {
    if (!contentRef.current) return;
    removeHighlight();

    let currentLength = 0;
    let targetNode = null;
    let offset = 0;

    const walker = document.createTreeWalker(contentRef.current, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const len = node.nodeValue.length;
      if (currentLength + len > charIndex) {
        targetNode = node;
        offset = charIndex - currentLength;
        break;
      }
      currentLength += len;
    }

    if (targetNode) {
      // Find the end of the word
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
        
        mark.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (e) {
        // Ignore range errors if boundaries are weird
      }
    }
  }, [contentRef, removeHighlight]);

  const togglePlay = () => {
    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      if (synth.paused) {
        synth.resume();
        setIsPlaying(true);
      } else {
        // Start fresh
        if (!contentRef.current) return;
        removeHighlight();
        synth.cancel();
        
        const text = contentRef.current.textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        utterance.onboundary = (e) => {
          if (e.name === 'word') {
            highlightWord(e.charIndex);
          }
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          removeHighlight();
        };
        
        utteranceRef.current = utterance;
        synth.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <div className="bg-surface border border-line rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 font-mono text-xs text-accent">
        <Headphones size={14} strokeWidth={2.5} />
        <span>🎧 Listen to this article (Free AI TTS)</span>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-4">
        {/* Play / Pause */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center
                     text-white cursor-pointer shadow-lg shadow-accent/20 transition-shadow
                     hover:shadow-accent/40"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isPlaying ? (
              <motion.span key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Pause size={18} fill="currentColor" />
              </motion.span>
            ) : (
              <motion.span key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        
        {/* Voice Selector */}
        <div className="flex-1">
           <select 
             className="w-full bg-elevated border border-line rounded-lg px-3 py-2 text-sm font-mono text-fg focus:border-accent outline-none appearance-none cursor-pointer"
             onChange={(e) => {
               const voice = voices.find(v => v.name === e.target.value);
               if (voice) {
                 setSelectedVoice(voice);
                 if (isPlaying) {
                    synth.cancel();
                    setIsPlaying(false);
                 }
               }
             }}
             value={selectedVoice?.name || ''}
           >
             {voices.map(v => (
               <option key={v.name} value={v.name}>
                 {v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google US English') ? '👩 ' : '👨 ' } 
                 {v.name}
               </option>
             ))}
           </select>
        </div>
      </div>
    </div>
  );
}
