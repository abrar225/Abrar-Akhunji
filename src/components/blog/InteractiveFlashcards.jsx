import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { X, Sparkles } from 'lucide-react';

export default function InteractiveFlashcards({ config }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCard, setActiveCard] = useState(null);

  const cards = config.cards || [];
  const numCards = cards.length;

  // Layout the cards in a fan shape when none are active
  const fanOutCards = () => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      if (activeCard === i) return; // Skip active card

      const center = (numCards - 1) / 2;
      const offset = i - center;
      const rotation = offset * 8; // 8 degrees per card
      const xPos = offset * 60;    // 60px spread per card
      const yPos = Math.abs(offset) * 10; // Slight arc downward

      gsap.to(card, {
        x: xPos,
        y: yPos,
        rotation: rotation,
        scale: 1,
        zIndex: i,
        width: 280,
        height: 380,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  };

  useEffect(() => {
    // Initial layout
    fanOutCards();
  }, [activeCard, numCards]);

  const handleMouseEnter = (e, i) => {
    if (activeCard !== null) return;
    const card = cardsRef.current[i];
    
    // Lift the card and straighten it slightly
    gsap.to(card, {
      y: -40,
      scale: 1.05,
      rotation: 0,
      zIndex: 100, // Bring to absolute front on hover
      duration: 0.4,
      ease: 'power3.out',
      boxShadow: '0 20px 40px -10px rgba(255, 90, 31, 0.15)',
      borderColor: 'var(--color-accent)'
    });

    // Push neighbors away slightly
    cardsRef.current.forEach((c, idx) => {
      if (c && idx !== i) {
        const distance = idx - i;
        const currentRot = gsap.getProperty(c, "rotation");
        gsap.to(c, {
          x: "+=" + (distance > 0 ? 30 : -30),
          rotation: currentRot + (distance > 0 ? 5 : -5),
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    });
  };

  const handleMouseMove = (e, i) => {
    if (activeCard !== null) return;
    const card = cardsRef.current[i];
    
    // Magnetic tracking (parallax) inside the card bounds
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      x: (i - (numCards - 1) / 2) * 60 + (x * 0.2), // Base X + mouse offset
      y: -40 + (y * 0.2), // Base Hover Y + mouse offset
      rotationX: -y * 0.05,
      rotationY: x * 0.05,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (e, i) => {
    if (activeCard !== null) return;
    // Reset back to fan position
    fanOutCards();
    const card = cardsRef.current[i];
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderColor: 'var(--color-line)',
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  const handleClick = (i) => {
    if (activeCard === i) return;
    
    const card = cardsRef.current[i];
    setActiveCard(i);

    // Animate active card to full width/height in center
    gsap.to(card, {
      x: 0,
      y: 0,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      width: '100%',
      height: 400,
      zIndex: 200,
      duration: 0.8,
      ease: 'expo.inOut',
      boxShadow: '0 0 0 1px var(--color-accent), 0 30px 60px -20px rgba(0,0,0,0.5)',
      borderColor: 'transparent'
    });

    // Fade out front text, fade in back text
    const frontEl = card.querySelector('.card-front');
    const backEl = card.querySelector('.card-back');
    const closeBtn = card.querySelector('.card-close');

    gsap.to(frontEl, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.inOut' });
    gsap.fromTo(backEl, 
      { opacity: 0, y: 20, display: 'none' },
      { opacity: 1, y: 0, display: 'flex', duration: 0.6, delay: 0.4, ease: 'power3.out' }
    );
    gsap.fromTo(closeBtn,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.4, delay: 0.6, ease: 'back.out(1.5)' }
    );

    // Push other cards far out to the edges and fade them
    cardsRef.current.forEach((c, idx) => {
      if (c && idx !== i) {
        gsap.to(c, {
          x: (idx < i ? -1 : 1) * (window.innerWidth / 2 + 300), // Throw off screen
          rotation: (idx < i ? -45 : 45),
          opacity: 0,
          duration: 0.8,
          ease: 'expo.inOut'
        });
      }
    });
  };

  const handleClose = (e, i) => {
    e.stopPropagation(); // Prevent re-triggering click
    
    const card = cardsRef.current[i];
    setActiveCard(null);

    // Fade out back text, fade in front text
    const frontEl = card.querySelector('.card-front');
    const backEl = card.querySelector('.card-back');
    const closeBtn = card.querySelector('.card-close');

    gsap.to(backEl, { opacity: 0, y: -20, display: 'none', duration: 0.3, ease: 'power2.inOut' });
    gsap.to(closeBtn, { opacity: 0, scale: 0.5, duration: 0.2 });
    gsap.to(frontEl, { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: 'power3.out' });

    // Bring other cards back from the edges
    cardsRef.current.forEach((c, idx) => {
      if (c && idx !== i) {
        gsap.set(c, { opacity: 1 }); // Ensure visible
      }
    });

    // Reset layout is handled by useEffect triggering fanOutCards()
    const currentCardBg = card;
    gsap.to(currentCardBg, {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderColor: 'var(--color-line)',
      duration: 0.8,
      ease: 'expo.inOut'
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] my-12 flex items-center justify-center overflow-visible"
      style={{ perspective: '1200px' }}
    >
      {/* Background Graphic to frame the deck */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-30">
        <Sparkles size={120} className="text-line mb-4" strokeWidth={0.5} />
        <p className="text-xs font-mono uppercase tracking-widest text-faint">Select a card to expand</p>
      </div>

      {cards.map((card, i) => (
        <div
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
          onClick={() => handleClick(i)}
          onMouseEnter={(e) => handleMouseEnter(e, i)}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseLeave={(e) => handleMouseLeave(e, i)}
          className="absolute bg-surface border border-line rounded-3xl p-8 cursor-pointer overflow-hidden transform-gpu will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            backgroundImage: `radial-gradient(circle at top right, rgba(255, 90, 31, 0.03), transparent 60%)`,
            width: 280,
            height: 380,
          }}
        >
          {/* Noise overlay for texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')` }}></div>

          {/* Front of Card (Term) */}
          <div className="card-front absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none">
            <span className="text-xs font-mono text-accent mb-6 uppercase tracking-[0.2em]">Term {i + 1}</span>
            <h3 className="text-3xl font-display text-fg leading-tight">
              {card.front}
            </h3>
          </div>

          {/* Back of Card (Definition - hidden initially) */}
          <div className="card-back absolute inset-0 hidden flex-col items-start justify-center p-12 pointer-events-none">
            <span className="text-xs font-mono text-accent mb-4 uppercase tracking-[0.2em]">{card.front}</span>
            <p className="text-lg md:text-xl font-body text-fg leading-relaxed">
              {card.back}
            </p>
          </div>

          {/* Close Button */}
          <button
            className="card-close absolute top-6 right-6 p-2 rounded-full bg-elevated border border-line text-muted hover:text-accent hover:border-accent/50 transition-colors z-50 pointer-events-auto opacity-0 scale-50"
            onClick={(e) => handleClose(e, i)}
            aria-label="Close card"
          >
            <X size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
