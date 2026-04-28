import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * TextPressure - A high-performance interactive typography component
 * Uses Variable Fonts to react to mouse proximity.
 */
const TextPressure = ({ 
  text = "FIXO", 
  fontFamily = "'Roboto Flex', sans-serif",
  minWidth = 25,
  maxWidth = 151,
  minWeight = 100,
  maxWeight = 1000,
  minItalic = 0,
  maxItalic = 1,
  proximity = 300,
  height = '100%',
  className = ""
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [chars, setChars] = useState([]);

  // Split text into characters
  useEffect(() => {
    setChars(text.toUpperCase().split(''));
  }, [text]);

  useEffect(() => {
    if (!chars.length || !titleRef.current) return;

    // 1. Initial GSAP Entrance
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // 2. Mouse Tracking with Lerp
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        cursorRef.current.x = e.touches[0].clientX;
        cursorRef.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 3. Cache Bounding Boxes for Performance
    let charData = [];
    const updateCache = () => {
      charData = spansRef.current.map(span => {
        if (!span) return null;
        const rect = span.getBoundingClientRect();
        return {
          element: span,
          centerX: rect.left + rect.width / 2,
          centerY: rect.top + rect.height / 2
        };
      }).filter(Boolean);
    };

    // Debounced Resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCache, 200);
    };
    window.addEventListener('resize', handleResize);
    
    // Initial cache after layout
    setTimeout(updateCache, 200);

    // 4. Interaction Loop
    let rafId;
    const loop = () => {
      // Linear Interpolation for Smooth Cursor
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      charData.forEach(data => {
        const dx = data.centerX - mouseRef.current.x;
        const dy = data.centerY - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Value Mapping: Inverse Proximity
        const influence = Math.max(0, 1 - distance / proximity);
        
        // Map values to axes (clamped to Roboto Flex limits)
        const wdth = Math.min(151, Math.max(25, minWidth + (maxWidth - minWidth) * influence));
        const wght = Math.min(1000, Math.max(100, minWeight + (maxWeight - minWeight) * influence));
        const ital = Math.min(1, Math.max(0, minItalic + (maxItalic - minItalic) * influence));

        // Apply Font Variation Settings
        data.element.style.fontVariationSettings = `'wdth' ${wdth}, 'wght' ${wght}, 'ital' ${ital}`;
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
    };
  }, [chars, proximity, minWidth, maxWidth, minWeight, maxWeight, minItalic, maxItalic]);

  return (
    <div className={`stage ${className}`} style={{ ...stageStyles, height }}>
      <div 
        ref={containerRef}
        className="pressure" 
        data-text={text}
        style={pressureStyles}
      >
        <h1 ref={titleRef} className="pressure-title" style={titleStyles}>
          {chars.map((char, index) => (
            <span 
              key={index} 
              ref={el => spansRef.current[index] = el}
              style={{ display: 'inline-block', willChange: 'font-variation-settings' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:ital,wdth,wght@0,25..151,100..1000;1,25..151,100..1000&display=swap');
        
        .pressure-title span {
          user-select: none;
          white-space: nowrap;
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          font-family: ${fontFamily};
          line-height: 1.1;
        }
      `}</style>
    </div>
  );
};

// Inline Styles
const stageStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  overflow: 'hidden',
  width: '100%'
};

const pressureStyles = {
  position: 'relative',
  textAlign: 'center',
  width: '100%'
};

const titleStyles = {
  fontSize: 'clamp(4rem, 15vw, 12rem)',
  fontWeight: 100,
  margin: 0,
  padding: 0,
  lineHeight: 1,
  color: 'inherit',
  cursor: 'default'
};

export default TextPressure;
