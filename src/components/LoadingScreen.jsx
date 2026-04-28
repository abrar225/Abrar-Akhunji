import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete, theme }) => {
  const counter1Ref = useRef(null);
  const counter2Ref = useRef(null);
  const counter3Ref = useRef(null);
  const loader1Ref = useRef(null);
  const loader2Ref = useRef(null);
  const loaderContainerRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const websiteContentRef = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    // 1. Dynamic DOM Injection for Counter 3
    if (counter3Ref.current) {
      // Clear existing children to avoid duplicates in strict mode
      counter3Ref.current.innerHTML = '';
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          const div = document.createElement("div");
          div.className = "num";
          div.textContent = j;
          counter3Ref.current.appendChild(div);
        }
      }
      const finalDiv = document.createElement("div");
      finalDiv.className = "num";
      finalDiv.textContent = "0";
      counter3Ref.current.appendChild(finalDiv);
    }

    // 2. GSAP Timeline Logic
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Odometer Animation
    // Column 3 (0-9 twice + 0 = 21 digits)
    tl.to(counter3Ref.current, {
      y: "-95.23%", // (20/21) * 100
      duration: 5,
      ease: "power2.inOut",
    }, 0);

    // Column 2 (0-9)
    tl.to(counter2Ref.current, {
      y: "-90%",
      duration: 6,
      ease: "power2.inOut",
    }, 0);

    // Column 1 (0-1)
    tl.to(counter1Ref.current, {
      y: "-50%",
      duration: 2,
      delay: 4,
      ease: "power2.inOut",
    }, 0);

    // Progress Bars
    tl.to(loader1Ref.current, {
      width: "100%",
      duration: 6,
      ease: "power2.inOut",
    }, 0);

    tl.to(loader2Ref.current, {
      width: "100%",
      duration: 2,
      delay: 1.9,
      ease: "power2.inOut",
    }, 0);

    // The Climax (at 6s)
    tl.to(loaderContainerRef.current, {
      background: "none",
      duration: 0.1
    }, 6);

    tl.to(loader1Ref.current, {
      rotate: 90,
      y: -50,
      duration: 0.5,
      ease: "power2.out"
    }, 6);

    tl.to(loader2Ref.current, {
      x: -50,
      y: 50,
      duration: 0.5,
      ease: "power2.out"
    }, 6);

    // Transition (at 7s)
    tl.to(loaderContainerRef.current, {
      scale: 40,
      rotate: 45,
      x: 2000,
      y: 500,
      duration: 1,
      ease: "power2.inOut"
    }, 7);

    tl.to(loadingScreenRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }, 7.5);

    // Content Reveal
    tl.to(h1Ref.current, {
      y: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.inOut"
    }, 7.5);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');

          .loading-wrapper {
            font-family: 'Montserrat', sans-serif;
            background: #030303;
            color: #fff;
          }

          .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 50px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.05);
            padding: 5px;
          }

          .loader-1, .loader-2 {
            height: 48%;
            background: #fff;
            width: 0%;
          }

          .counter {
            position: absolute;
            bottom: 50px;
            left: 50px;
            display: flex;
            height: 100px;
            font-size: 100px;
            line-height: 100px;
            font-weight: 900;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            overflow: hidden;
          }

          .counter-col {
            display: flex;
            flex-direction: column;
            transition: transform 0s;
          }

          .num {
            height: 100px;
            text-align: center;
          }

          .website-content {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            background: #030303;
          }

          .header {
            position: relative;
            overflow: hidden;
          }

          .header h1 {
            font-size: 10vw;
            text-transform: uppercase;
            font-weight: 900;
            margin: 0;
            transform: translateY(100%);
          }

          .header-revealer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 2;
            display: none; /* Handled by GSAP if needed */
          }
        `}
      </style>

      <div className="loading-wrapper">
        <div ref={loadingScreenRef} className="loading-screen">
          <div ref={loaderContainerRef} className="loader">
            <div ref={loader1Ref} className="loader-1"></div>
            <div ref={loader2Ref} className="loader-2"></div>
          </div>

          <div className="counter">
            <div ref={counter1Ref} className="counter-col">
              <div className="num">0</div>
              <div className="num">1</div>
            </div>
            <div ref={counter2Ref} className="counter-col">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="num">{i}</div>
              ))}
            </div>
            <div ref={counter3Ref} className="counter-col">
              {/* Dynamically injected */}
            </div>
          </div>
        </div>

        <div ref={websiteContentRef} className="website-content">
          <div className="header">
            <h1 ref={h1Ref}>Abrar</h1>
            <div className="header-revealer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
