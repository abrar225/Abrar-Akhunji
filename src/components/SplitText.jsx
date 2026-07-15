import React, { useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * SplitText — editorial mask reveal.
 * Splits a string into words (or chars) inside overflow-hidden masks and
 * slides each piece up from below on scroll. This is the "Text-String-Animation"
 * DNA: per-token staggered motion with a clean line clip.
 *
 * props:
 *  - text: string
 *  - as: element tag for the wrapper (default 'div')
 *  - type: 'word' | 'char'
 *  - stagger, delay, duration, y
 *  - trigger: 'scroll' | 'mount'
 *  - start: ScrollTrigger start (default 'top 85%')
 */
export default function SplitText({
  text = '',
  as: Tag = 'div',
  type = 'word',
  className = '',
  stagger = 0.06,
  delay = 0,
  duration = 1.1,
  start = 'top 85%',
  trigger = 'scroll',
  onDone,
}) {
  const ref = useRef(null);

  const tokens = useMemo(() => {
    if (type === 'char') {
      return text.split('').map((c) => (c === ' ' ? ' ' : c));
    }
    return text.split(' ');
  }, [text, type]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll('.split-inner');

    if (prefersReduced()) {
      gsap.set(inners, { y: 0, opacity: 1 });
      onDone?.();
      return;
    }

    gsap.set(inners, { yPercent: 118, opacity: 0 });

    const animate = () =>
      gsap.to(inners, {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'expo.out',
        stagger,
        onComplete: onDone,
      });

    let st;
    let tween;
    if (trigger === 'mount') {
      tween = animate();
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          tween = animate();
        },
      });
    }

    return () => {
      st?.kill();
      tween?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, type]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {tokens.map((tok, i) => (
        <span key={i} className="split-mask" aria-hidden="true">
          <span className="split-inner">
            {tok}
            {type === 'word' && i < tokens.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
