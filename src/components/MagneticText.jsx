import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * MagneticText - Each character pulls towards the mouse
 */
const MagneticText = ({ text, className = "", theme = "dark" }) => {
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const [chars, setChars] = useState([]);

  useEffect(() => {
    setChars(text.split(''));
  }, [text]);

  useEffect(() => {
    if (!chars.length) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      charsRef.current.forEach((char, i) => {
        if (!char) return;
        const rect = char.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const limit = 150;
        if (distance < limit) {
          const power = (limit - distance) / limit;
          gsap.to(char, {
            x: dx * power * 0.3,
            y: dy * power * 0.3,
            color: theme === 'dark' ? '#a855f7' : '#7c3aed',
            scale: 1 + (power * 0.2),
            duration: 0.4,
            ease: "power2.out"
          });
        } else {
          gsap.to(char, {
            x: 0,
            y: 0,
            color: 'inherit',
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [chars, theme]);

  return (
    <div ref={containerRef} className={`inline-flex ${className}`} style={{ cursor: 'default' }}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={el => charsRef.current[i] = el}
          style={{ 
            display: 'inline-block', 
            whiteSpace: 'pre',
            transition: 'color 0.3s ease'
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default MagneticText;
