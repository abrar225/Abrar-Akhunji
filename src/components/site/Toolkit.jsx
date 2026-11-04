import { useState } from 'react';
import toolIcons from '../../data/tool-icons.json';
import data from '../../data/portfolio.json';
import packages from '../../../package.json';
import { buildToolkit } from '../../lib/toolkit';
import './toolkit.css';
// Brand paths from Simple Icons 16.36.0. Tools without a path use a labeled monogram.
function ToolMark({ name }) {
 const path = toolIcons[name];
 return path ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d={path}/></svg>
  : <i aria-hidden="true">{name.split(/[^a-z0-9]+/i).slice(0, 2).map(part => part[0]).join('').toUpperCase()}</i>;
}

const tools = buildToolkit(data, packages).flatMap(group => group.tools);

export default function Toolkit() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="toolkit" aria-label="Tools I reach for">
      <h3>A tool for the job.</h3>
      <div className="toolkit-conveyor" data-paused={paused}>
        <div className="toolkit-belt">
          {[0, 1].map(copy => (
            <ul className="toolkit-belt-lap" key={copy} aria-hidden={copy === 1 || undefined}>
              {tools.map(({ name }) => (
                <li className="toolkit-token" key={name}>
                  <ToolMark name={name}/>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button className="toolkit-belt-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
        Pause tool belt
      </button>
    </section>
  );
}
