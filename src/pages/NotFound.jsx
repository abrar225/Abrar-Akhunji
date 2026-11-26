import SEO from '../components/SEO';
import { Masthead, SignalLink } from '../components/v5/Primitives';

export default function NotFound() {
  return (
    <main className="signal-missing">
      <SEO title="Page not found | Abrar Akhunji" description="Page not found. Return to the portfolio or explore the work and writing." path="/404/" noindex />
      <Masthead label="404 / Page unavailable" title={<>Signal lost<span>.</span></>} description="This address doesn’t point to a page. Pick up the portfolio, work, or writing from here.">
        <SignalLink to="/">Portfolio home</SignalLink>
        <SignalLink to="/work/" outline>Projects</SignalLink>
        <SignalLink to="/blog/" outline>The Neural Log</SignalLink>
      </Masthead>
    </main>
  );
}
