import { ArrowDown, ArrowDownRight, Asterisk, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RESUME } from '../../lib/projects';
import { SignalLink } from './Primitives';
import InkPaper from './InkPaper';

export default function Poster() {
  return (
    <section id="home" className="signal-hero">
      <InkPaper />
      <div className="signal-wrap signal-poster">
        <div className="signal-hero-top signal-label">
          <span><span className="signal-registration" aria-hidden="true">⊹</span> Engineering portfolio</span>
          <span className="signal-location"><MapPin size={14} aria-hidden="true" /> Ahmedabad, India</span>
        </div>
        <div className="signal-hero-grid">
          <div className="signal-hero-copy">
            <p className="signal-hero-role signal-hero-reveal"><Asterisk size={20} aria-hidden="true" /> AI &amp; full-stack engineer</p>
            <h1 className="signal-hero-title" aria-label="Abrar Akhunji">
              <span><span data-name-line="">Abrar</span></span>
              <span><span data-name-line="">Akhunji</span></span>
            </h1>
            <p className="signal-hero-description signal-hero-reveal">I build local AI tools, developer software, and native apps.</p>
            <div className="signal-actions signal-hero-reveal">
              <Link className="signal-button" to="/#work">Explore my work <ArrowDown size={18} /></Link>
              <SignalLink href={RESUME} outline>Résumé</SignalLink>
            </div>
          </div>
          <div className="signal-hero-collage">
            <div className="signal-hero-halftone" aria-hidden="true" />
            <p className="signal-side-note" aria-hidden="true">from model<br />to interface <ArrowDownRight size={24} /></p>
            <figure className="signal-photo-print" data-poster-photo="">
              <span className="signal-photo-tape" aria-hidden="true" />
              <img src="/assets/build-room/portrait.webp" alt="Abrar Akhunji" width="720" height="960" fetchPriority="high" />
              <figcaption><span>ABRAR A.</span><span aria-hidden="true">✳</span></figcaption>
            </figure>
            <span className="signal-print-mark" aria-hidden="true"><Asterisk size={45} strokeWidth={1.3} /></span>
          </div>
        </div>
        <div className="signal-hero-bottom">
          <p className="signal-label"><span className="signal-status" /> Open to engineering roles &amp; collaborations</p>
          <Link to="/#work" aria-label="Scroll to selected work"><ArrowDown size={20} /></Link>
        </div>
      </div>
    </section>
  );
}
