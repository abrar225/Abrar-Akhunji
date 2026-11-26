import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function SignalLink({ children, to, href, outline = false, Icon = ArrowUpRight }) {
  const className = `signal-button${outline ? ' signal-button-outline' : ''}`;
  const contents = <>{children}<Icon size={18} aria-hidden="true" /></>;
  if (to) return <Link to={to} className={className}>{contents}</Link>;
  const external = href.startsWith('https://');
  return <a href={href} className={className} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{contents}</a>;
}

export function Masthead({ label, title, description, children, aside }) {
  return (
    <header className="signal-masthead">
      <div className={`signal-wrap${aside ? ' signal-masthead-split' : ''}`}>
        <div>
          {label && <p className="signal-label">{label}</p>}
          <h1>{title}</h1>
          {description && <p className="signal-masthead-description">{description}</p>}
          {children && <div className="signal-actions">{children}</div>}
        </div>
        {aside}
      </div>
    </header>
  );
}
