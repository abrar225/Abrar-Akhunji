import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { PageLead, Action } from '../patchbay/Interior';
import { PERSON_ID, absoluteUrl, aboutPath } from '../lib/content/urls.js';
import { RESUME } from '../lib/projects';
import portfolio from '../data/portfolio.json';
import { gsap } from '../patchbay/scroll';

function TimelineTrace() {
  return <svg className="patch-timeline-trace" viewBox="0 0 40 320" preserveAspectRatio="none" aria-hidden="true">
    <path d="M34 0H18Q7 0 7 11V300Q7 315 22 315H34" vectorEffect="non-scaling-stroke" />
    <path data-draw d="M34 0H18Q7 0 7 11V300Q7 315 22 315H34" vectorEffect="non-scaling-stroke" />
  </svg>;
}

export default function About() {
  const canonical = absoluteUrl(aboutPath());
  const profile = useRef(null);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      for (const timeline of profile.current.querySelectorAll('.patch-timeline-wrap')) {
        const path = timeline.querySelector('[data-draw]');
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: timeline, start: 'top 87%', end: 'bottom 56%', scrub: true },
        });
      }
    });
    return () => media.revert();
  }, []);

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${canonical}#about`,
    name: 'About Abrar Akhunji — AI/ML & Full-Stack Engineer',
    url: canonical,
    description: 'Background, engineering philosophy, education and technical journey of Abrar Akhunji, an AI and full-stack engineer in Ahmedabad, India.',
    mainEntity: { '@id': PERSON_ID },
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: canonical },
    ],
  }];

  return (
    <>
      <SEO
        title="About Abrar Akhunji | AI & Full-Stack Engineer"
        description="Learn about Abrar Akhunji, an AI/ML and full-stack software engineer based in Ahmedabad, India. Background, education, philosophy and technical expertise."
        path={aboutPath()}
        schema={schemas}
        keywords={['About Abrar Akhunji', 'AI engineer Ahmedabad', 'ML developer India', 'software engineer biography']}
      />

      <main className="patch-about">
      <PageLead label="About" title="Abrar Akhunji"
        description="I’m an AI/ML and full-stack engineer in Ahmedabad, India. I work across model inference, system architecture, and the production interfaces people use."
        aside={<figure><img src="/assets/build-room/portrait.webp" alt="Abrar Akhunji" width="480" height="540" /></figure>}>
        <Action href={RESUME}>View résumé</Action>
        <Action to="/contact/">Get in touch</Action>
      </PageLead>
      <div className="patch-wide patch-info-body patch-profile-index" ref={profile}>

        <section className="patch-profile-row">
          <h2>What I work on</h2>
          <div>
            <p>I build software around local model inference, computer vision, and the full-stack systems that put those capabilities in people’s hands.</p>
            <p>Lately I’ve been exploring local AI execution and developer toolchains, and writing about latent attention, KV caching, and speculative decoding.</p>
            <Action to="/blog/">Read my writing</Action>
          </div>
        </section>
        <section id="experience" className="patch-profile-row">
          <h2>Experience</h2>
          <div className="patch-timeline-wrap"><TimelineTrace /><ol className="patch-timeline">
            {portfolio.experience.map((item) => <li key={item.role}><p className="patch-label">{item.date}</p><h3>{item.role}</h3><p>{item.desc}</p></li>)}
          </ol></div>
        </section>
        <section className="patch-profile-row">
          <h2>Education &amp; credentials</h2>
          <div className="patch-timeline-wrap"><TimelineTrace /><ul className="patch-timeline">
            {portfolio.education.map((item) => <li key={item.degree}><p className="patch-label">{item.date}</p><h3>{item.degree}</h3><p>{item.school}</p></li>)}
            {portfolio.certifications.map((item) => <li key={item.title}><h3>{item.driveLink ? <a href={item.driveLink} target="_blank" rel="noreferrer">{item.title} <ArrowUpRight size={15} /></a> : item.title}</h3><p>{item.desc}</p></li>)}
          </ul></div>
        </section>
      </div>
      </main>
    </>
  );
}
