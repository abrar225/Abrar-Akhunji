import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const counter3Ref = useRef(null);
  const websiteContentRef = useRef(null);

  useEffect(() => {
    // Add Montserrat Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const counter3 = counter3Ref.current;
    
    // 1. Dynamic DOM Injection for .counter-3
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j <= 9; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 2. Odometer & Progress Bar Animation
    animate(counter3Ref.current, 5);
    animate(containerRef.current.querySelector(".counter-2"), 6);
    animate(containerRef.current.querySelector(".counter-1"), 2, 4);

    tl.to(containerRef.current.querySelector(".loader-1"), {
      width: "100%",
      duration: 6,
      ease: "power2.inOut",
    }, 0);

    tl.to(containerRef.current.querySelector(".loader-2"), {
      width: "100%",
      duration: 2,
      delay: 1.9,
      ease: "power2.inOut",
    }, 0);

    // 3. The Climax & Layout Transition (At 6s)
    tl.to(containerRef.current.querySelector(".loader"), {
      background: "none",
      duration: 0.1,
    }, 6);

    tl.to(containerRef.current.querySelector(".loader-1"), {
      rotate: 90,
      y: -50,
      duration: 0.5,
    }, 6);

    tl.to(containerRef.current.querySelector(".loader-2"), {
      x: -75,
      y: 75,
      duration: 0.5,
    }, 6);

    // 4. Massive Scaling & Throw off screen (At 7s)
    tl.to(containerRef.current.querySelector(".loader"), {
      scale: 40,
      rotate: 45,
      x: 2000,
      y: 500,
      duration: 0.5,
    }, 7);

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
    }, 7.5);

    // 5. Content Reveal
    tl.to(websiteContentRef.current.querySelectorAll("h1"), {
      y: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.inOut",
    }, 7.5);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <>
      <style>{`
        .loading-screen-wrapper {
          position: fixed;
          inset: 0;
          z-index: 9999;
          font-family: 'Montserrat', sans-serif;
          background: #000;
          color: #fff;
          overflow: hidden;
        }

        .loading-screen {
          position: relative;
          width: 100%;
          height: 100%;
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
          padding: 5px;
          z-index: 2;
        }

        .loader-1, .loader-2 {
          width: 0%;
          height: 3px;
          background: #fff;
        }

        .counter {
          position: absolute;
          bottom: 50px;
          left: 50px;
          display: flex;
          height: 100px;
          font-size: 80px;
          line-height: 100px;
          font-weight: 900;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          user-select: none;
        }

        .counter-1, .counter-2, .counter-3 {
          display: flex;
          flex-direction: column;
        }

        .num {
          height: 100px;
          text-align: center;
        }

        .website-content {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          z-index: 1;
        }

        .header {
          position: relative;
          overflow: hidden;
        }

        .header h1 {
          font-size: 5vw;
          text-transform: uppercase;
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
        }
      `}</style>

      <div className="loading-screen-wrapper" ref={containerRef}>
        <div className="loading-screen">
          <div className="loader">
            <div className="loader-1"></div>
            <div className="loader-2"></div>
          </div>

          <div className="counter">
            <div className="counter-1">
              <div className="num">0</div>
              <div className="num">1</div>
            </div>
            <div className="counter-2">
              <div className="num">0</div>
              <div className="num">1</div>
              <div className="num">2</div>
              <div className="num">3</div>
              <div className="num">4</div>
              <div className="num">5</div>
              <div className="num">6</div>
              <div className="num">7</div>
              <div className="num">8</div>
              <div className="num">9</div>
              <div className="num">0</div>
            </div>
            <div className="counter-3" ref={counter3Ref}>
              {/* Dynamically injected */}
            </div>
          </div>
        </div>

        <div className="website-content" ref={websiteContentRef}>
          <div className="header">
            <div className="header-revealer"></div>
            <h1>Abrar</h1>
          </div>
          <div className="header" style={{ marginLeft: '1rem' }}>
            <div className="header-revealer"></div>
            <h1>Akhunji</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
