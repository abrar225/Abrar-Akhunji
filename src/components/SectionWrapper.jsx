import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SectionWrapper = ({ children, className = "", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const animation = gsap.fromTo(el,
      {
        opacity: 0,
        y: 40,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default SectionWrapper;
