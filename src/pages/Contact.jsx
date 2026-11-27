import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { PageLead, Action } from '../patchbay/Interior';
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
      <PageLead label="Contact" title={<>Let’s talk<span>.</span></>}
        description="For engineering roles, project inquiries, and collaborations, tell me what you’re building or the kind of teammate you’re looking for.">
        <Action href={`mailto:${services.email}`}>Send an email</Action>
        <Action to="/hire/">Ways to work together</Action>
      </PageLead>
      <div className="patch-wide patch-info-body">

        <div className="patch-contact-grid">
          <section className="patch-contact-address">
            <h2>Direct email</h2>
            <a href={`mailto:${services.email}`}>{services.email} <ArrowUpRight size={20} /></a>
            <button type="button" onClick={copyEmail}>{copyStatus === 'Email address copied.' ? <Check size={17} /> : <Copy size={17} />} Copy email</button>
            <p className="patch-copy-status" role="status">{copyStatus}</p>
            <p>Typically respond within 24 business hours. Based in Ahmedabad, on India Standard Time (UTC+5:30).</p>
          </section>
          <section className="patch-contact-social">
            <h2>Find me elsewhere</h2>
            <ul>{social.map(([name, url]) => <li key={name}><a href={url} target="_blank" rel="noreferrer">{name}<ArrowUpRight size={18} /></a></li>)}</ul>
          </section>
        </div>
        <section className="patch-locations">
          <h2>Where I work</h2>
          <ul>{services.locations.map(({ city, note }) => <li key={city}><h3>{city}</h3><p>{note}</p></li>)}</ul>
          <Link className="patch-inline" to="/hire/">Engineering services <ArrowUpRight size={17} /></Link>
        </section>
      </div>
      </main>
    </>
  );
}
