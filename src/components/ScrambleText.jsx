import React, { useRef, useEffect, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';

/**
 * ScrambleText — decode/scramble reveal (creative-dev "terminal" DNA).
 * Cycles random glyphs and resolves to the target string, left to right.
 * Fires when it scrolls into view (once), or on `hover`.
 */
export default function ScrambleText({
  text = '',
  className = '',
  as: Tag = 'span',
  speed = 1,
  trigger = 'view', // 'view' | 'hover' | 'mount'
}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const raf = useRef(null);
  const [display, setDisplay] = useState(text);

  const run = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(text);
      return;
    }
    cancelAnimationFrame(raf.current);
    const queue = text.split('').map((to) => ({
      to,
      start: Math.floor(Math.random() * 20 * speed),
      end: Math.floor(Math.random() * 20 * speed) + 20 * speed,
    }));
    frame.current = 0;
    const tick = () => {
      let out = '';
      let done = 0;
      for (let i = 0; i < queue.length; i++) {
        const { to, start, end } = queue[i];
        if (frame.current >= end) {
          done++;
          out += to;
        } else if (frame.current >= start) {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          out += to === ' ' ? ' ' : '';
        }
      }
      setDisplay(out);
      if (done === queue.length) return;
      frame.current++;
      raf.current = requestAnimationFrame(tick);
    };
    tick();
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (trigger === 'mount') {
      run();
      return () => cancelAnimationFrame(raf.current);
    }
    if (trigger === 'view') {
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(raf.current);
      };
    }
    // hover
    el.addEventListener('mouseenter', run);
    return () => {
      el.removeEventListener('mouseenter', run);
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {display}
    </Tag>
  );
}
