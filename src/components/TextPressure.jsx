import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * TextPressure - Elite Interactive Typography
 * Uses 'Fraunces' Variable Font for a fancy, high-end look.
 */
const TextPressure = ({ 
  text = "FIXO", 
  fontFamily = "'Fraunces', serif",
  fontSize = "clamp(3rem, 12vw, 10rem)",
  minWidth = 50,
  maxWidth = 100,
  minWeight = 100,
  maxWeight = 900,
  minItalic = 0,
  maxItalic = 1,
  proximity = 300,
  height = 'auto',
  className = ""
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [chars, setChars] = useState([]);

  useEffect(() => {
    setChars(text.toUpperCase().split(''));
  }, [text]);

  useEffect(() => {
    if (!chars.length || !titleRef.current) return;

    gsap.fromTo(titleRef.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' }
    );

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

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCache, 200);
    };
    window.addEventListener('resize', handleResize);
    setTimeout(updateCache, 500);

    let rafId;
    const loop = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 10;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 10;

      charData.forEach(data => {
        const dx = data.centerX - mouseRef.current.x;
        const dy = data.centerY - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / proximity);
        
        const wdth = minWidth + (maxWidth - minWidth) * influence;
        const wght = minWeight + (maxWeight - minWeight) * influence;
        const ital = minItalic + (maxItalic - minItalic) * influence;
        
        const opacity = 0.4 + (0.6 * influence);
        const colorScale = influence * 100;

        data.element.style.fontVariationSettings = `'wdth' ${wdth}, 'wght' ${wght}, 'ital' ${ital}, 'SOFT' ${influence * 100}, 'WONK' ${influence}`;
        data.element.style.opacity = opacity;
        data.element.style.color = influence > 0.1 
          ? `color-mix(in srgb, #a855f7 ${colorScale}%, currentColor)` 
          : 'currentColor';
        data.element.style.filter = `drop-shadow(0 0 ${influence * 20}px rgba(168, 85, 247, 0.4))`;
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

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
      <div ref={containerRef} className="pressure" style={pressureStyles}>
        <h1 ref={titleRef} className="pressure-title" style={{ ...titleStyles, fontSize }}>
          {chars.map((char, index) => (
            <span 
              key={index} 
              ref={el => spansRef.current[index] = el}
              style={spanStyles}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,100..900,0..100,0..1;1,9..144,100..900,0..100,0..1&display=swap');
        
        .pressure-title {
          font-family: ${fontFamily};
          white-space: nowrap !important;
          display: flex !important;
          flex-wrap: nowrap !important;
          justify-content: center;
          align-items: center;
          width: fit-content;
          margin: 0 auto;
        }

        .pressure-title span {
          display: inline-block;
          user-select: none;
          transition: color 0.3s ease, opacity 0.3s ease;
          will-change: font-variation-settings, opacity, color, filter;
        }
      `}</style>
    </div>
  );
};

const stageStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  overflow: 'visible', // Allow font growth to breathe
  width: '100%',
  zIndex: 10
};

const pressureStyles = {
  position: 'relative',
  textAlign: 'center',
  width: '100%',
  overflow: 'visible'
};

const titleStyles = {
  fontSize: 'clamp(3rem, 12vw, 10rem)',
  margin: 0,
  padding: '1rem 0',
  lineHeight: 1,
  cursor: 'default'
};

const spanStyles = {
  display: 'inline-block',
  transition: 'none' // We handle animation in RAF for maximum performance
};

export default TextPressure;
