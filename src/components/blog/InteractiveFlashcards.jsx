import { useId, useState } from 'react';
import { RotateCcw, ArrowLeft, ArrowRight } from 'lucide-react';

/** A real study deck: one legible, keyboard/touch-operable card at any width. */
export default function InteractiveFlashcards({ config }) {
  const cards = config?.cards || [], [index, setIndex] = useState(0), [flipped, setFlipped] = useState(false), id = useId();
  if (!cards.length) return null;
  const current = Math.min(index, cards.length - 1), card = cards[current];
  const move = direction => { setIndex((current + direction + cards.length) % cards.length); setFlipped(false); };
  return <section className="study-deck" aria-label={config.title || 'Study flashcards'} onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>
    <header><span>Study deck</span><output aria-live="polite">Card {current + 1} of {cards.length}</output></header>
    <button type="button" className={`study-card ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(!flipped)} aria-expanded={flipped} aria-controls={`${id}-definition`} aria-label={flipped ? `Hide definition for ${card.front}` : `Reveal definition for ${card.front}`}>
      <span>{flipped ? 'The idea' : 'The term'}</span><h3>{card.front}</h3><p id={`${id}-definition`} hidden={!flipped}>{card.back}</p><small>{flipped ? 'Tap to return to the term' : 'Tap or press Enter to reveal'}</small>
    </button>
    <div className="study-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous flashcard"><ArrowLeft size={17}/>Previous</button><button type="button" onClick={() => setFlipped(!flipped)}><RotateCcw size={15}/>{flipped ? 'Hide answer' : 'Reveal answer'}</button><button type="button" onClick={() => move(1)} aria-label="Next flashcard">Next<ArrowRight size={17}/></button></div>
  </section>;
}
