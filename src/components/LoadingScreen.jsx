import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onComplete, theme }) => {
  const counter3Ref = useRef(null);
  const loadingScreenRef = useRef(null);
  const loader1Ref = useRef(null);
  const loader2Ref = useRef(null);
  const loaderContainerRef = useRef(null);
  const counter1Ref = useRef(null);
  const counter2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Dynamic DOM Injection for counter-3
      if (counter3Ref.current) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j <= 9; j++) {
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

      // Helper function to animate counter columns
      const animateCounter = (selector, duration, delay = 0) => {
        const numHeight = selector.querySelector(".num").offsetHeight;
        const totalDistance = (selector.querySelectorAll(".num").length - 1) * numHeight;
        gsap.to(selector, {
          y: -totalDistance,
          duration: duration,
          delay: delay,
          ease: "power2.inOut",
        });
      };

      // Odometer Animations (Faster & Smoother)
      if (counter3Ref.current) animateCounter(counter3Ref.current, 3);
      if (counter2Ref.current) animateCounter(counter2Ref.current, 3.5);
      if (counter1Ref.current) animateCounter(counter1Ref.current, 1.2, 2.3);

      // Progress Bars (Faster)
      gsap.to(loader1Ref.current, {
        width: "100%",
        duration: 3.5,
        ease: "expo.inOut",
      });

      gsap.to(loader2Ref.current, {
        width: "100%",
        duration: 1.5,
        delay: 1.2,
        ease: "expo.inOut",
      });

      // The Climax & Layout Transition (Snappier)
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to({}, { duration: 3.5 }) // Absolute 3.5s mark (End of main progress)
        .to(loaderContainerRef.current, {
          background: "none",
          duration: 0.1
        })
        .to(loader1Ref.current, {
          rotate: 90,
          y: -50,
          duration: 0.4,
          ease: "back.out(2)"
        }, "+=0.05")
        .to(loader2Ref.current, {
          x: -50,
          y: 50,
          duration: 0.4,
          ease: "back.out(2)"
        }, "<")
        .to(loaderContainerRef.current, {
          scale: 45,
          rotate: 45,
          x: 2500,
          y: 700,
          duration: 1.2,
          ease: "expo.in"
        }, 4) // Precise 4s mark
        .to(loadingScreenRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.6,
          ease: "power2.inOut"
        }, 4.2); // Precise 4.2s mark
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={loadingScreenRef}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden font-['Montserrat',sans-serif] ${theme === 'dark' ? 'bg-[#030303] text-white' : 'bg-[#fcfcfc] text-black'}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
        
        .num {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: 900;
          line-height: 1;
        }

        .counter-col {
          display: flex;
          flex-direction: column;
          transition: transform 0.1s;
        }

        .loader-bar {
          height: 100%;
          background: currentColor;
          width: 0;
        }
      `}</style>

      {/* Counter Odometer */}
      <div className="absolute bottom-10 left-10 h-[100px] overflow-hidden flex" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
        <div ref={counter1Ref} className="counter-col">
          <div className="num">0</div>
          <div className="num">1</div>
        </div>
        <div ref={counter2Ref} className="counter-col">
          {[0,1,2,3,4,5,6,7,8,9,0].map((n, i) => <div key={i} className="num">{n}</div>)}
        </div>
        <div ref={counter3Ref} className="counter-col">
          {/* Dynamically populated */}
        </div>
      </div>

      {/* Progress Bars Loader */}
      <div 
        ref={loaderContainerRef}
        className={`relative w-[300px] h-[40px] border flex flex-col gap-1 p-1 ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}
      >
        <div className="flex-1 overflow-hidden relative">
          <div ref={loader1Ref} className="loader-bar"></div>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div ref={loader2Ref} className="loader-bar"></div>
        </div>
      </div>

      {/* Subtle branding */}
      <div className="absolute top-10 right-10 flex flex-col items-end opacity-20">
        <span className="text-[10px] tracking-[0.3em] font-bold uppercase">System Initializing</span>
        <span className="text-[10px] tracking-[0.3em] font-bold uppercase">FixO Intelligence v4.0</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
