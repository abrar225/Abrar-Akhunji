import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Masthead, SignalLink } from '../components/v5/Primitives';
import { PERSON_ID, absoluteUrl, aboutPath } from '../lib/content/urls.js';
import { RESUME } from '../lib/projects';
import portfolio from '../data/portfolio.json';

export default function About() {
  const canonical = absoluteUrl(aboutPath());

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

      <main className="signal-about">
      <Masthead label="About" title={<>Abrar Akhunji<span>.</span></>}
        description="I’m an AI/ML and full-stack engineer in Ahmedabad, India. I work across model inference, system architecture, and the production interfaces people use."
        aside={<figure><img src="/assets/build-room/portrait.webp" alt="Abrar Akhunji" width="480" height="540" /></figure>}>
        <SignalLink href={RESUME}>View résumé</SignalLink>
        <SignalLink to="/contact/" outline>Get in touch</SignalLink>
      </Masthead>
      <div className="signal-wrap signal-info-body signal-profile-index">

        <section className="signal-profile-row">
          <h2>What I work on</h2>
          <div>
            <p>I build software around local model inference, computer vision, and the full-stack systems that put those capabilities in people’s hands.</p>
            <p>Lately I’ve been exploring local AI execution and developer toolchains, and writing about latent attention, KV caching, and speculative decoding.</p>
            <SignalLink to="/blog/">Read my writing</SignalLink>
          </div>
        </section>
        <section id="experience" className="signal-profile-row">
          <h2>Experience</h2>
          <ol className="signal-timeline">
            {portfolio.experience.map((item) => <li key={item.role}><p className="signal-label">{item.date}</p><h3>{item.role}</h3><p>{item.desc}</p></li>)}
          </ol>
        </section>
        <section className="signal-profile-row">
          <h2>Education &amp; credentials</h2>
          <ul className="signal-timeline">
            {portfolio.education.map((item) => <li key={item.degree}><p className="signal-label">{item.date}</p><h3>{item.degree}</h3><p>{item.school}</p></li>)}
            {portfolio.certifications.map((item) => <li key={item.title}><h3>{item.driveLink ? <a href={item.driveLink} target="_blank" rel="noreferrer">{item.title} <ArrowUpRight size={15} /></a> : item.title}</h3><p>{item.desc}</p></li>)}
          </ul>
        </section>
      </div>
      </main>
    </>
  );
}
