import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * PerspectiveText - Tilts in 3D and creates a ghosting effect on interaction
 */
const PerspectiveText = ({ text, className = "", theme = "dark" }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const ghostRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on cursor distance from center
      const rotateX = -(clientY - centerY) * 0.05;
      const rotateY = (clientX - centerX) * 0.05;
      
      gsap.to(textRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        x: rotateY * 0.5,
        y: rotateX * 0.5,
        duration: 0.5,
        ease: "power2.out"
      });

      // Ghost effect moves more intensely
      gsap.to(ghostRef.current, {
        rotateX: rotateX * 1.5,
        rotateY: rotateY * 1.5,
        x: rotateY * 2,
        y: rotateX * 2,
        opacity: 0.2,
        duration: 0.7,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to([textRef.current, ghostRef.current], {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: '1000px', cursor: 'default' }}
    >
      <div 
        ref={ghostRef}
        className="absolute inset-0 pointer-events-none opacity-0 blur-sm"
        style={{ 
          color: '#a855f7',
          WebkitTextStroke: theme === 'dark' ? '1px #a855f7' : '1px #7c3aed',
          zIndex: 0
        }}
      >
        {text}
      </div>
      <div 
        ref={textRef}
        className="relative z-10 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {text}
      </div>
    </div>
  );
};

export default PerspectiveText;
