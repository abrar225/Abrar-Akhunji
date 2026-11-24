import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import data from '../../data/portfolio.json';
import services from '../../data/services.json';
import latestBlogs from '../../generated/blog-latest.json';
import { postPath } from '../../lib/content/urls';
import { EMAIL, RESUME } from '../../lib/projects';

const GitHubCity = lazy(() => import('../github/GitHubCity'));
const formatDate = new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });

export function Profile() {
  const [activity, setActivity] = useState(false);

  return (
    <section id="about-me" className="v5-profile" aria-labelledby="v5-profile-title">
      <div className="v5-wrap">
        <div className="v5-profile-grid">
          <div className="v5-profile-copy">
            <p className="v5-meta">A little about me</p>
            <h2 id="v5-profile-title">The person behind the builds.</h2>
            <p className="v5-section-lead">I’m Abrar, an AI and full-stack engineer in Ahmedabad. I work across models, interfaces, and the systems that connect them.</p>
            <p>Off-screen, I write rap, cook with friends, and usually have another small project on the go.</p>
            <Link className="v5-text-link" to="/about/">More about me <ArrowUpRight size={20} /></Link>
          </div>
          <figure className="v5-portrait">
            <div className="v5-pass-top"><span>Engineering portfolio</span><span>Ahmedabad, IN</span></div>
            <div className="v5-portrait-frame">
              <img src="/assets/build-room/portrait.webp" alt="Portrait of Abrar Akhunji" width="720" height="960" loading="lazy" decoding="async" />
            </div>
            <figcaption><strong>Abrar Akhunji</strong><span>AI &amp; Full-Stack Engineer</span><div className="v5-pass-code" aria-hidden="true" /></figcaption>
          </figure>
        </div>
        <div className="v5-record" id="experience">
          <div>
            <h3>Experience</h3>
            <a className="v5-text-link" href={RESUME} target="_blank" rel="noreferrer">Full résumé <ArrowUpRight size={17} /></a>
          </div>
          <ol>
            {data.experience.map(job => <li key={job.role}>
              <p className="v5-meta">{job.date}</p>
              <h4>{job.role}</h4>
              <p>{job.desc}</p>
            </li>)}
          </ol>
        </div>
        <div className="v5-profile-more">
          <details id="practice">
            <summary>Toolkit <Plus size={20} /></summary>
            <dl>{data.skills.map(({ t, d }) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
          </details>
          <details>
            <summary>Education &amp; recognition <Plus size={20} /></summary>
            <ul>{data.education.map(({ degree, school, date }) => <li key={degree}><strong>{degree}</strong><p>{school} · {date}</p></li>)}</ul>
            <ul>{data.certifications.map(certificate => <li key={certificate.title}>
              {certificate.driveLink ? <a href={certificate.driveLink} target="_blank" rel="noreferrer">{certificate.title} <ArrowUpRight size={14} /></a> : certificate.title}
            </li>)}</ul>
          </details>
          <details id="activity" onToggle={event => setActivity(event.currentTarget.open)}>
            <summary>GitHub activity <Plus size={20} /></summary>
            {activity && <div className="v5-activity"><Suspense fallback={<p role="status">Loading GitHub activity…</p>}><GitHubCity /></Suspense></div>}
          </details>
          <a className="v5-experiment-link" href="/agents-at-work/">Agents at Work <ArrowUpRight size={20} /></a>
        </div>
      </div>
    </section>
  );
}

export function Writing() {
  const [selected, setSelected] = useState(0);
  const posts = latestBlogs.posts.slice(0, 3);
  const current = posts[selected];
  return (
    <section id="writing" className="v5-writing" aria-labelledby="v5-writing-title">
      <div className="v5-wrap">
        <div className="v5-section-heading">
          <div><p className="v5-meta">Notes from the rabbit hole</p><h2 id="v5-writing-title">The Neural Log.</h2></div>
          <Link className="v5-text-link" to="/blog/">All articles <ArrowUpRight size={21} /></Link>
        </div>
        <div className="v5-writing-grid">
          <Link className="v5-writing-cover" to={postPath(current.slug)} aria-label={`Read ${current.title}`}>
            <div className="v5-cover-top"><span>Engineering field notes</span><time dateTime={current.date}>{formatDate.format(new Date(current.date))}</time></div>
            <span className="v5-cover-masthead" aria-hidden="true">THE<br />NEURAL<br />LOG.</span>
            <div className="v5-cover-graphic" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <div className="v5-cover-bottom"><p>{current.title.split(':')[0]}</p><ArrowUpRight size={26} /></div>
          </Link>
          <ol>{posts.map((post, position) => (
            <li key={post.slug} onPointerEnter={event => {
              if (!event.currentTarget.parentElement.contains(document.activeElement)) setSelected(position);
            }} onFocus={() => setSelected(position)} data-current={position === selected}>
              <Link to={postPath(post.slug)}>
                <time className="v5-meta" dateTime={post.date}>{formatDate.format(new Date(post.date))}</time>
                <h3>{post.title}</h3>
                <ArrowUpRight size={22} />
              </Link>
            </li>
          ))}</ol>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyFailed(false);
      setCopied(true);
    } catch {
      setCopyFailed(true);
    }
  };
  return (
    <section id="contact" className="v5-contact" aria-labelledby="v5-contact-title">
      <div className="v5-wrap">
        <aside id="services" className="v5-availability">
          <p><span className="v5-status-light" /> {services.availability}</p>
          <Link className="v5-text-link" to="/hire/">Hiring &amp; collaboration <ArrowUpRight size={20} /></Link>
        </aside>
        <div className="v5-contact-grid">
          <div>
            <p className="v5-meta">Have something in mind?</p>
            <h2 id="v5-contact-title">Let’s build<br />something.</h2>
            <a className="v5-email" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={23} /></a>
            <button className="v5-copy-email" type="button" onClick={copyEmail}>{copied ? 'Email copied' : copyFailed ? 'Copy unavailable. Use the email link.' : 'Copy email address'}</button>
            <p className="sr-only" role="status">{copied ? 'Email address copied to clipboard.' : copyFailed ? `Copy unavailable. Email ${EMAIL}.` : ''}</p>
          </div>
          <div className="v5-contact-side">
            <a className="v5-contact-mark" href={`mailto:${EMAIL}`} aria-label="Email Abrar"><ArrowUpRight /></a>
            <div className="v5-socials">
              <a href="https://github.com/abrar225" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
              <a href="https://www.linkedin.com/in/abrar-akhunji/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a>
              <Link to="/contact/">Contact details <ArrowUpRight size={15} /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
