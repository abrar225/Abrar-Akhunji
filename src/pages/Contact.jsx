import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowUpRight, Copy, Check, Globe2, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { PERSON_ID, absoluteUrl, contactPath } from '../lib/content/urls.js';
import services from '../data/services.json';

const social = [
  ['GitHub', 'https://github.com/abrar225'],
  ['LinkedIn', 'https://www.linkedin.com/in/abrar-akhunji/'],
  ['X', 'https://x.com/Abrarakhunji'],
  ['Hugging Face', 'https://huggingface.co/abrar225'],
];

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(services.email);
      setCopyStatus('Email address copied.');
    } catch {
      setCopyStatus('Couldn’t copy. You can select the address or open it in your mail app.');
    }
  }
  const canonical = absoluteUrl(contactPath());

  const schemas = [{
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${canonical}#contact`,
    name: 'Contact Abrar Akhunji — Engineering & Inquiries',
    url: canonical,
    description: 'Get in touch with Abrar Akhunji for AI/ML engineering, consulting, full-stack systems and technical partnerships.',
    mainEntity: { '@id': PERSON_ID },
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: canonical },
    ],
  }];

  return (
    <>
      <SEO
        title="Contact Abrar Akhunji | AI & Full-Stack Engineer"
        description="Contact Abrar Akhunji for AI/ML engineering engagements, full-stack contracts, technical architecture reviews, or full-time roles."
        path={contactPath()}
        schema={schemas}
        keywords={['Contact Abrar Akhunji', 'hire AI engineer', 'contact ML consultant Ahmedabad']}
      />

      <main className="patch-contact">
        <header className="patch-contact-lead">
          <div className="patch-wide patch-contact-grid">
            <div className="patch-contact-intro">
              <h1>Let’s talk.</h1>
              <p>Tell me what you’re building or the kind of teammate you’re looking for. I’m open to engineering roles, projects, and collaborations.</p>
              <Link className="patch-action" to="/hire/">Ways to work together <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <section className="patch-contact-panel" aria-labelledby="direct-email">
              <h2 id="direct-email"><Mail size={19} aria-hidden="true" /> Direct email</h2>
              <a className="patch-contact-email" href={`mailto:${services.email}`}>{services.email}<ArrowUpRight size={22} aria-hidden="true" /></a>
              <button type="button" onClick={copyEmail}>{copyStatus === 'Email address copied.' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />} Copy email</button>
              <p className="patch-copy-status" role="status">{copyStatus}</p>
              <p className="patch-contact-hours"><Globe2 size={17} aria-hidden="true" /><span>Ahmedabad, India · UTC+5:30<br />Typically reply within 24 business hours.</span></p>
            </section>
          </div>
        </header>
        <div className="patch-wide patch-info-body patch-contact-grid patch-contact-directory">
          <section className="patch-contact-social">
            <h2>Find me elsewhere</h2>
            <ul>{social.map(([name, url]) => <li key={name}><a href={url} target="_blank" rel="noreferrer">{name}<ArrowUpRight size={18} aria-hidden="true" /></a></li>)}</ul>
          </section>
          <section className="patch-locations">
            <h2>Where I work</h2>
            <ul>{services.locations.map(({ city, note }) => <li key={city}><h3>{city}</h3><p>{note}</p></li>)}</ul>
          </section>
        </div>
      </main>
    </>
  );
}
