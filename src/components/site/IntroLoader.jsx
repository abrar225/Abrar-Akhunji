import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import IntroCreatures from './IntroCreatures';

const WORDS = ['A little', 'curiosity.', 'A lot of', 'making.', 'Ideas in.', 'Useful things out.'];

function Word({ index }) {
  return <span className={`intro-word intro-word-${index}`} aria-hidden="true">{[...WORDS[index]].map((letter, i) => <span className="intro-letter" key={i}>{letter}</span>)}</span>;
}

/** A short, skippable opening. The actual page loads beneath it. */
export default function IntroLoader({ onComplete }) {
  const root = useRef(null);
  const finish = useRef(null);

  useLayoutEffect(() => {
    const node = root.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, leaving = false;
    const previousOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const unblock = () => {
      document.documentElement.style.overflow = previousOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
    const context = gsap.context(() => {}, node);
    const end = () => {
      if (disposed) return;
      unblock();
      onComplete();
      window.dispatchEvent(new Event('portfolio:intro-complete'));
    };
    let timeline;
    finish.current = (instant = false) => {
      if (leaving || disposed) return;
      leaving = true;
      timeline?.kill();
      context.add(() => {
        gsap.killTweensOf(node.querySelectorAll('*'));
        if (instant || reduced.matches) { end(); return; }
        node.dataset.phase = 'leaving';
        // Fade through to the real workbench; keep the page at its original scroll position.
        gsap.to(node, { opacity: 0, duration: .55, ease: 'power2.inOut', onComplete: end });
      });
    };
    const keyboard = event => {
      if (event.key === 'Escape' || event.key === 'Tab') finish.current(true);
    };
    const preference = () => { if (reduced.matches) finish.current(true); };
    window.addEventListener('keydown', keyboard, true);
    reduced.addEventListener('change', preference);
    // Never leave a blocking curtain if an asset or animation clock stalls.
    const deadline = setTimeout(() => finish.current(true), 8500);
    const start = () => {
      if (disposed || leaving) return;
      context.add(() => {
        node.dataset.phase = 'playing';
        const groups = WORDS.map((_, i) => node.querySelectorAll(`.intro-word-${i} .intro-letter`));
        const letters = node.querySelectorAll('.intro-letter');
        gsap.set(letters, { opacity: 0, yPercent: 35 });

        timeline = gsap.timeline({ onComplete: () => finish.current() });
        const entrances = [0, .15, .8, 1, 1.65, 1.8];
        groups.forEach((group, i) => timeline.to(group, { opacity: 1, yPercent: 0, duration: 1, stagger: .025, ease: 'power2.out' }, entrances[i]));

        const counter = { value: 0 };
        const percentage = node.querySelector('.intro-percentage');
        const bar = node.querySelector('.intro-progress-fill');
        timeline.to(counter, { value: 100, duration: 3.8, ease: 'power1.inOut', onUpdate: () => {
          percentage.textContent = `${String(Math.floor(counter.value)).padStart(2, '0')}%`;
          bar.style.transform = `scaleX(${counter.value / 100})`;
        }, onComplete: () => { node.dataset.loaded = 'true'; } }, 0);
        timeline.to(letters, { opacity: 0, yPercent: -15, duration: .6, stagger: { amount: .5, from: 'end' }, ease: 'power2.inOut' }, 4.1);

      });
    };
    // Wait briefly for the two local typefaces, without letting a missing font trap the visitor.
    const fontDeadline = setTimeout(start, 650);
    Promise.allSettled([document.fonts.load('600 48px Schoolbell'), document.fonts.load('700 100px "Intro Counter"')]).then(() => {
      clearTimeout(fontDeadline);
      if (node.dataset.phase !== 'playing') start();
    });
    if (reduced.matches) finish.current(true);
    return () => {
      disposed = true;
      clearTimeout(deadline); clearTimeout(fontDeadline);
      context.revert(); unblock();
      window.removeEventListener('keydown', keyboard, true);
      reduced.removeEventListener('change', preference);
      finish.current = null;
    };
  }, [onComplete]);

  return <div ref={root} className="intro-loader" data-phase="waiting" data-loaded="false" data-cursor-theme="page">
    <div className="intro-identity"><span className="intro-monogram" aria-hidden="true">a.</span><div><strong>Abrar Akhunji</strong><span>AI &amp; Full-Stack Engineer</span></div></div>
    <IntroCreatures/>
    <span className="intro-edition">Independent mind.<br/>Hands-on engineer.</span>
    <div className="intro-statement" role="img" aria-label="A little curiosity. A lot of making. Ideas in. Useful things out.">
      <div className="intro-line"><Word index={0}/><Word index={1}/></div>
      <div className="intro-line"><Word index={2}/><Word index={3}/></div>
      <p className="intro-postscript"><Word index={4}/> <Word index={5}/></p>
    </div>
    <div className="intro-progress" aria-hidden="true"><div className="intro-progress-track"><span className="intro-progress-fill"/></div><span className="intro-percentage">00%</span><span>Opening the workshop</span></div>
    <span className="sr-only" role="status">Opening Abrar’s workshop. You can skip the introduction.</span>
    <button className="intro-skip" type="button" data-cursor="Enter" onClick={() => finish.current?.()}>Skip animation <span aria-hidden="true">→</span></button>
    <span className="intro-made-by">Imagined &amp; built by Abrar.</span>
  </div>;
}
