import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function ExperienceRecord({ jobs }) {
  const [active, setActive] = useState(0);
  return <div className="experience-record"><div className="experience-heading"><p className="section-kicker">Experience</p><h3>The work behind<br/>the work.</h3><p>Each role added another piece to the toolkit.</p></div><div className="experience-track">{jobs.map((job, i) => <article className={active === i ? 'is-open' : ''} key={`${job.role}:${job.date}`}><button type="button" aria-expanded={active === i} aria-controls={`experience-${i}`} onClick={() => setActive(active === i ? null : i)}><span className="experience-dot" aria-hidden="true"/><span><small>{job.date}</small><strong>{job.role}</strong></span>{active === i ? <Minus size={18}/> : <Plus size={18}/>}</button><div id={`experience-${i}`} hidden={active !== i}><p>{job.desc}</p></div></article>)}</div></div>;
}
