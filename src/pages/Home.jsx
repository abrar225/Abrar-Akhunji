import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '../components/SEO';
import Hero from '../components/v5/Hero';
import { Engineering, Work } from '../components/v5/Work';
import { Contact, Profile, Writing } from '../components/v5/Editorial';
import { selectedProject } from '../lib/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const project = selectedProject(params.get('project'));
  const page = useRef(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.v5-contact-sheet', { y: 25, rotationZ: -2 }, {
        y: 0, rotationZ: 0, duration: .85, ease: 'power3.out',
      });
      gsap.fromTo('.v5-film-edge', { y: 28 }, {
        y: 0, duration: 1.1, stagger: .08, ease: 'power3.out',
      });
    }, page);
    media.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
      gsap.fromTo('.v5-aperture', { y: 0, rotate: 0 }, {
        y: -94,
        rotate: 13,
        ease: 'none',
        scrollTrigger: { trigger: '.v5-hero', start: 'top top', end: 'bottom top', scrub: .5 },
      });
      gsap.fromTo('.v5-portrait img', { scale: 1.11, yPercent: 4 }, {
        scale: 1,
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.v5-portrait', start: 'top 95%', end: 'center 50%', scrub: .5 },
      });
      gsap.fromTo('.v5-portrait', { rotate: 6, y: 35 }, {
        rotate: -2, y: 0, ease: 'none',
        scrollTrigger: { trigger: '.v5-profile-grid', start: 'top 95%', end: 'center 48%', scrub: .55 },
      });
      gsap.fromTo('.v5-writing-cover', { y: 35, rotationZ: -5 }, {
        y: 0, rotationZ: -2, ease: 'none',
        scrollTrigger: { trigger: '.v5-writing-grid', start: 'top 95%', end: 'center 65%', scrub: .55 },
      });
    }, page);
    media.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      const projection = page.current.querySelector('.v5-projection');
      const sheet = projection.querySelector('.v5-contact-sheet');
      gsap.set(sheet, { transformPerspective: 1100 });
      const turn = gsap.quickTo(sheet, 'rotationY', { duration: .48, ease: 'power3.out' });
      const tilt = gsap.quickTo(sheet, 'rotationX', { duration: .48, ease: 'power3.out' });
      const move = event => {
        const { left, top, width, height } = projection.getBoundingClientRect();
        turn(((event.clientX - left) / width - .5) * 7);
        tilt((.5 - (event.clientY - top) / height) * 6);
      };
      const reset = () => { turn(0); tilt(0); };
      projection.addEventListener('pointermove', move, { passive: true });
      projection.addEventListener('pointerleave', reset);
      return () => {
        projection.removeEventListener('pointermove', move);
        projection.removeEventListener('pointerleave', reset);
      };
    }, page);
    return () => media.revert();
  }, []);

  const select = slug => {
    if (slug === project.slug) return;
    const next = new URLSearchParams(params);
    next.set('project', slug);
    navigate({ search: next.toString(), hash: window.location.hash }, { replace: true, preventScrollReset: true });
  };

  return (
    <main ref={page} id="main-content" className="v5-home" tabIndex={-1}>
      <SEO title="Abrar Akhunji — AI & Full-Stack Engineer in Ahmedabad" description="AI and full-stack engineer in Ahmedabad. Explore the local AI tools, developer software, and native products Abrar Akhunji builds and the engineering behind them." path="/" image="/assets/v5/og-home.jpg" />
      <Hero project={project} onSelect={select} />
      <Work project={project} onSelect={select} />
      <Engineering project={project} />
      <Profile />
      <Writing />
      <Contact />
    </main>
  );
}
