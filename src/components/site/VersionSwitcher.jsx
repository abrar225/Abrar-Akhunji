import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import versions from '../../../versions/manifest.json';
import './version-switcher.css';

export default function VersionSwitcher() {
  const disclosure = useRef(null);

  useEffect(() => {
    const control = disclosure.current;
    if (!control) return;
    const closeOutside = event => {
      if (!control.contains(event.target)) control.open = false;
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, []);

  if (import.meta.env.VITE_SHOW_VERSIONS !== '1') return null;

  return (
    <details className="version-switcher" ref={disclosure} onKeyDown={event => {
      if (event.key !== 'Escape' || !event.currentTarget.open) return;
      event.stopPropagation();
      event.currentTarget.open = false;
      event.currentTarget.querySelector('summary').focus();
    }}>
      <summary>Versions <ChevronDown size={14} aria-hidden="true" /></summary>
      <ul aria-label="Portfolio versions">
        {versions.toReversed().map(({ version, slug, name, date, current }) => (
          <li key={slug}>
            <a href={current ? '/' : `/versions/${slug}/`} aria-current={current ? 'true' : undefined}>
              <span>v{version} · {name}</span>
              <small>{date.slice(0, 4)} · {current ? 'Current' : 'Archived'}</small>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
