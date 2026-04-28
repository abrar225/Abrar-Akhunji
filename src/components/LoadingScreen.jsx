import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * LoadingScreen - Elite Frontend Creative Preloader
 * Orchestrates a complex sequence: Odometer -> Dual Progress -> Climax -> Scale Out -> Content Reveal
 */
const LoadingScreen = ({ onComplete }) => {
  const counter3Ref = useRef(null);
  const loader1Ref = useRef(null);
  const loader2Ref = useRef(null);
  const loadingScreenRef = useRef(null);
  const loaderContainerRef = useRef(null);
  const websiteContentRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // 1. Dynamic Odometer Number Generation
    const c3 = counter3Ref.current;
    if (c3 && c3.children.length === 0) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          const div = document.createElement('div');
          div.className = 'num';
          div.textContent = j;
          c3.appendChild(div);
        }
      }
      const finalDiv = document.createElement('div');
      finalDiv.className = 'num';
      finalDiv.textContent = '0';
      c3.appendChild(finalDiv);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Final handoff to parent App
        gsap.to(loadingScreenRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onComplete
        });
      }
    });
    timelineRef.current = tl;

    // 2. Odometer Motion Logic
    tl.to('.counter-3', {
      y: '-95.23%', 
      duration: 5,
      ease: "power2.inOut",
    }, 0);

    tl.to('.counter-2', {
      y: '-90.9%',
      duration: 6,
      ease: "power2.inOut",
    }, 0);

    tl.to('.counter-1', {
      y: '-50%',
      duration: 2,
      delay: 4,
      ease: "power2.inOut",
    }, 0);

    // 3. Progress Bar Logic
    tl.to(loader1Ref.current, {
      width: '100%',
      duration: 6,
      ease: "power2.inOut",
    }, 0);

    tl.to(loader2Ref.current, {
      width: '100%',
      duration: 2,
      delay: 1.9,
      ease: "power2.inOut",
    }, 0);

    // 4. THE CLIMAX (6s)
    tl.to(loaderContainerRef.current, {
      background: 'transparent',
      duration: 0.1
    }, 6);

    tl.to(loader1Ref.current, {
      rotate: 90,
      y: -50,
      duration: 0.5,
      ease: "power2.inOut"
    }, 6);

    tl.to(loader2Ref.current, {
      x: -50,
      y: 50,
      duration: 0.5,
      ease: "power2.inOut"
    }, 6);

    // 5. THE SCALE THROW (7s)
    tl.to(loaderContainerRef.current, {
      scale: 60,
      rotate: 45,
      x: 2500,
      y: 800,
      duration: 1.2,
      ease: "power4.inOut"
    }, 7);

    // 6. FADE OUT & REVEAL (7.5s)
    tl.to(loadingScreenRef.current, {
      backgroundColor: 'transparent',
      duration: 0.5
    }, 7.5);

    tl.from('.header h1', {
      y: 300,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.inOut",
      skewY: 10
    }, 7.2);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');

        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 10000;
          font-family: 'Montserrat', sans-serif;
          background: #000;
          overflow: hidden;
        }

        .loading-screen {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .loader {
          position: absolute;
          width: 300px;
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-blur: 5px;
        }

        .loader-1, .loader-2 {
          width: 0;
          height: 3px;
          background: #fff;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        .counter {
          position: absolute;
          bottom: 40px;
          left: 40px;
          height: 120px;
          display: flex;
          font-size: 120px;
          font-weight: 900;
          line-height: 120px;
          color: #fff;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          letter-spacing: -5px;
        }

        .counter-1, .counter-2, .counter-3 {
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .num {
          height: 120px;
          text-align: center;
          min-width: 80px;
        }

        .website-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .header {
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .header h1 {
          font-size: 10vw;
          font-weight: 900;
          color: #fff;
          margin: -2vw 0;
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -0.05em;
        }
      `}</style>

      <div className="preloader-root" ref={loadingScreenRef}>
        <div className="loading-screen">
          <div className="loader" ref={loaderContainerRef}>
            <div className="loader-1" ref={loader1Ref}></div>
            <div className="loader-2" ref={loader2Ref}></div>
          </div>

          <div className="counter">
            <div className="counter-1">
              <div className="num">0</div>
              <div className="num">1</div>
            </div>
            <div className="counter-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n, i) => (
                <div key={i} className="num">{n}</div>
              ))}
            </div>
            <div className="counter-3" ref={counter3Ref}>
              {/* Injected */}
            </div>
          </div>
        </div>

        <div className="website-content" ref={websiteContentRef}>
          <div className="header">
            <h1>FIXO</h1>
            <h1>STUDIO</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;

