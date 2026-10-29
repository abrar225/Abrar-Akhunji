import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** Native scroll is the clock; all decorative transforms are scoped and reversible. */
export default function useBuildStory(root) {
  useLayoutEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    let ctxResizeCleanup;
    const ctx = gsap.context(() => {
      const dock = root.current.querySelector('.story-dock');
      const links = [...dock.querySelectorAll('a')];
      const placePill = link => {
        dock.style.setProperty('--chapter-left', `${link.offsetLeft}px`);
        dock.style.setProperty('--chapter-width', `${link.offsetWidth}px`);
      };
      const activePill = () => placePill(links.find(link => link.hasAttribute('aria-current')) || links[0]);
      const chapters = links.map(link => ({ link, section: root.current.querySelector(link.getAttribute('href')) })).filter(item => item.section);
      const updateChapter = () => {
        let current = chapters[0];
        for (const item of chapters) { if (item.section.getBoundingClientRect().top <= innerHeight * .55) current = item; else break; }
        if (current && !current.link.hasAttribute('aria-current')) {
          links.forEach(link => link.removeAttribute('aria-current'));
          current.link.setAttribute('aria-current', 'step'); placePill(current.link);
        }
      };
      updateChapter(); activePill();
      const resized = () => { updateChapter(); activePill(); };
      // The footer extends beyond this main element's ScrollTrigger range.
      // Continue tracking chapters even after that trigger reaches 100 percent.
      window.addEventListener('scroll', updateChapter, { passive: true });
      window.addEventListener('resize', resized);
      ctxResizeCleanup = () => { window.removeEventListener('resize', resized); window.removeEventListener('scroll', updateChapter); };
      ScrollTrigger.create({trigger: root.current, start:'top top', end:'bottom bottom', onUpdate: self => {
        dock.style.setProperty('--journey', self.progress);
        updateChapter();
      }, onRefresh: () => { updateChapter(); activePill(); }});
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-title-first', {yPercent:10,duration:.9,ease:'power4.out'});
        gsap.from('.hero-title-built', {yPercent:15,duration:1,ease:'power4.out',delay:.08});
        gsap.from('.bench-stamp', {opacity:0,duration:.6,ease:'power2.out',delay:.3});
        gsap.to('.hero-copy h1',{yPercent:-10,ease:'none',scrollTrigger:{trigger:'.hero-section',start:'top top',end:'bottom top',scrub:.7}});
        gsap.fromTo('.problem-sheet',{rotation:8,y:100},{rotation:-3,y:-20,ease:'none',scrollTrigger:{trigger:'.brief-section',start:'top 90%',end:'center 40%',scrub:.8}});
        gsap.fromTo('.brief-title',{xPercent:-8},{xPercent:8,ease:'none',scrollTrigger:{trigger:'.brief-section',start:'top bottom',end:'bottom top',scrub:1}});
        gsap.fromTo('.work-backdrop',{xPercent:10},{xPercent:-12,ease:'none',scrollTrigger:{trigger:'#work',start:'top bottom',end:'bottom top',scrub:1}});
        gsap.fromTo('.build-receipt',{rotation:-8,y:55},{rotation:4,y:0,ease:'power2.out',scrollTrigger:{trigger:'.inspection-section',start:'top 70%',end:'center center',scrub:.7}});
      }, root.current);
    }, root);
    let disposed = false;
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    let frame;
    const sizes = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(refresh); });
    sizes.observe(root.current);
    document.fonts.ready.then(refresh);
    return () => { disposed = true; sizes.disconnect(); cancelAnimationFrame(frame); ctxResizeCleanup?.(); mm.revert(); ctx.revert(); };
  }, [root]);
}
