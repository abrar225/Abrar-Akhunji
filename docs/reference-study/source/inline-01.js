
        // Define stackData at the very top of the script so it is initialized before renderStack() execution
        const stackData = [
            {
                company: 'Grimbyte Technologies', desc: 'Consulting firm specialising in marketing transformation & GTM strategies', duration: '4 Weeks', role: 'Brand Strategy Intern',
                points: [
                    'Configured <strong class="text-current underline decoration-2 underline-offset-2">GA4, Meta & SEMrush dashboards</strong> for 6+ clients - replaced vanity metrics with performance KPIs to validate marketing spend and optimize budget allocation.',
                    'Mapped <strong class="text-current underline decoration-2 underline-offset-2">CX journeys for 4 clients</strong> to identify friction points & optimize user flows, reducing drop-off rates & manual touchpoints while improving lead capture.'
                ],
                stats: [{ num: '6+', label: 'Clients' }, { num: '4', label: 'CX Journeys Mapped' }, { num: '3', label: 'Tools Deployed' }]
            },
            {
                company: 'Blue Tea', desc: "India's leading herbal tea brand, featured on Shark Tank India, with 1M+ global customers", duration: '4 Weeks', role: 'Live Project Associate',
                points: [
                    'Executed a targeted <strong class="text-current underline decoration-2 underline-offset-2">offline activation strategy</strong>, securing 5+ strategic B2B partnerships to distribute 2,000+ units, penetrating high-value customer segments.',
                    'Architected an <strong class="text-current underline decoration-2 underline-offset-2">influencer campaign model</strong>, managing outreach to 90+ creators, achieving ₹0.10 CPV - outperforming industry benchmarks & maximizing ROI.'
                ],
                stats: [{ num: '90+', label: 'Creators outreached' }, { num: '₹0.10', label: 'CPV achieved' }, { num: '2K+', label: 'Units distributed' }]
            },
            {
                company: 'Dr. Water', desc: 'Global US-based brand delivering premium hydrogen hydration solutions', duration: '8 Weeks', role: 'Project Head',
                points: [
                    'Identified <strong class="text-current underline decoration-2 underline-offset-2">6 key customer personas</strong> through primary & secondary research, analyzing 200+ responses & behavioural patterns, framing 360° marketing strategies.',
                    'Benchmarked <strong class="text-current underline decoration-2 underline-offset-2">18+ hydration brands</strong>, defining competitive gaps & synthesized over 2,000 data points, leveraging insights to inform targeted marketing strategies.'
                ],
                stats: [{ num: '6', label: 'Personas mapped' }, { num: '2K+', label: 'Data points' }, { num: '18+', label: 'Brands benchmarked' }]
            },
            {
                company: 'Frost & Sullivan', desc: 'International consulting firm specialising in market research & strategic advisory', duration: '4 Weeks', role: 'Live Project Associate',
                points: [
                    'Benchmarked advancements in <strong class="text-current underline decoration-2 underline-offset-2">six mobility domains</strong>, identifying synergies projected to unlock ₹42,000 crore+ in combined market opportunities.',
                    'Evaluated & ranked <strong class="text-current underline decoration-2 underline-offset-2">200+ technologies</strong> using the Mobility Innovation Scoring Model, identifying the top 10 innovations for strategic client focus.'
                ],
                stats: [{ num: '200+', label: 'Tech ranked' }, { num: '₹42K Cr+', label: 'Market opportunity' }, { num: '6', label: 'Mobility domains' }]
            }
        ];

        // Safety check around Lucide icon initialization
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        gsap.registerPlugin(ScrollTrigger, Draggable);

        // --- AUDIO DESIGN (TONE.JS) ---
        let isAudioInit = false;

        const soundToggleBtn = document.getElementById('sound-toggle');
        const soundIconOff = soundToggleBtn.querySelector('.sound-icon-off');
        const soundIconOn = soundToggleBtn.querySelector('.sound-icon-on');

        soundToggleBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (!isAudioInit) {
                // Resume AudioContext (browsers suspend it until a user gesture)
                await Tone.start();
                isAudioInit = true;
                soundIconOff.classList.add('hidden');
                soundIconOn.classList.remove('hidden');
            } else {
                isAudioInit = false;
                soundIconOff.classList.remove('hidden');
                soundIconOn.classList.add('hidden');
                // Suspend the AudioContext so nothing can slip through even if
                // isAudioInit is bypassed somewhere
                try { await Tone.getContext().rawContext.suspend(); } catch (_) {}
            }
        });
        
        const uiReverb = new Tone.Reverb({ decay: 4, wet: 0.6 }).toDestination();
        const dopaminePad = new Tone.PolySynth(Tone.AMSynth, {
            harmonicity: 2.5,
            oscillator: { type: "sine" },
            envelope: { attack: 0.3, decay: 0.5, sustain: 0.6, release: 2.5 },
            modulation: { type: "sine" },
            modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.1, release: 0.2 }
        }).connect(uiReverb);
        dopaminePad.volume.value = -16;

        const lockSynth = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 2,
            oscillator: { type: 'sine' },
            envelope: { attack: 0.01, decay: 0.4, sustain: 0.01, release: 1.4 }
        }).toDestination();
        lockSynth.volume.value = -10;

        const arrivalSynth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "triangle" },
            envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 2 }
        }).toDestination();
        arrivalSynth.volume.value = -12;

        const gearSynth = new Tone.MembraneSynth({
            pitchDecay: 0.01,
            octaves: 4,
            oscillator: { type: 'square' },
            envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.01 }
        }).toDestination();
        gearSynth.volume.value = -18;

        const beepSynth = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
        }).toDestination();
        beepSynth.volume.value = -12;

        const f1MetroSynth = new Tone.FMSynth({
            harmonicity: 3.5,
            modulationIndex: 15,
            oscillator: { type: "sawtooth" },
            modulation: { type: "square" },
            envelope: { attack: 0.8, decay: 0.2, sustain: 0.8, release: 1.5 }
        }).toDestination();
        f1MetroSynth.volume.value = -18;

        // Custom synthesized paper rustle
        const paperRustleSynth = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.03, decay: 0.12, sustain: 0.1, release: 0.15 }
        }).toDestination();
        paperRustleSynth.volume.value = -20;

        // Tactile hover tick sound
        const hoverTickSynth = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.02 }
        }).toDestination();
        hoverTickSynth.volume.value = -24;

        // Funny pop sound for general clicks
        const popSynth = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 6,
            oscillator: { type: "sine" },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
        }).toDestination();
        popSynth.volume.value = -8;

        // Bouncy boing sound for modals and cards
        const boingSynth = new Tone.FMSynth({
            harmonicity: 0.5,
            modulationIndex: 10,
            oscillator: { type: "sine" },
            modulation: { type: "square" },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 }
        }).toDestination();
        boingSynth.volume.value = -12;

        const clickSynth = new Tone.Synth({
            oscillator: { type: "triangle" },
            envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.08 }
        }).toDestination();
        clickSynth.volume.value = -10;

        const decryptSynth = new Tone.MetalSynth({
            frequency: 440,
            envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.2 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).toDestination();
        decryptSynth.volume.value = -14;

        // --- LENIS SCROLL SETUP ---
        const worldViewport = document.getElementById('world-viewport');
        const worldContainer = document.getElementById('world-container');
        
        let lenis;
        try {
            lenis = new Lenis({
                wrapper: worldViewport,
                content: worldContainer,
                duration: 0.8,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
            // Merge Lenis into GSAP's single ticker (eliminates a second RAF loop)
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);

            ScrollTrigger.defaults({ scroller: worldViewport });
            lenis.on('scroll', ScrollTrigger.update);

            // Lock scroll while the preloader / opening quote is visible
            lenis.stop();
        } catch (e) {
            console.warn('Lenis failed to initialise — falling back to native scroll:', e);
            document.body.style.overflow = 'auto';
        }

        // --- PRELOADER & HERO REVEAL ---
        const preloaderBg = document.getElementById('preloader-bg');
        const preloaderContent = document.getElementById('preloader-content');
        const gradBox = document.getElementById('grad-box');
        const heroBgTarget = document.getElementById('hero-bg-target');
        const heroLighting = document.getElementById('hero-lighting');
        const heroText3d = document.getElementById('hero-text-3d');
        
        gsap.set('#intro-thumb-container', { opacity: 1 });
        gsap.set('#intro-thumb-lighting', { opacity: 1 });
        gsap.set('.hero-overlay-text', { opacity: 0 });
        gsap.set(heroText3d, { opacity: 0, scale: 0.12, rotate: -4, y: -114 });
        gsap.set('#hero-lighting', { opacity: 0 });
        gsap.set('#hero-badges', { opacity: 0, y: 15 });
        gsap.set('#skip-btn', { opacity: 0, pointerEvents: 'none' });
        gsap.set('#main-nav-container', { opacity: 0, y: 30, filter: "blur(8px)", pointerEvents: 'none' }); 
        gsap.set('#top-ribbon', { opacity: 0, y: -40, filter: "blur(8px)", pointerEvents: 'none' });
        gsap.set('#preloader-bg', { opacity: 1 });

        const splitTextToChars = (id) => {
            const el = document.getElementById(id);
            if(!el) return [];
            const text = el.innerText;
            el.innerHTML = text.split('').map(c => `<span class="char inline-block will-change-[opacity,filter]">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
            const chars = el.querySelectorAll('.char');
            gsap.set(chars, { opacity: 0, filter: "blur(24px)" });
            return chars;
        };

        const charI = splitTextToChars('intro-i');
        const charIntentionally = splitTextToChars('intentionally');
        const charMake = splitTextToChars('make');
        const charMisalignment = splitTextToChars('misalignment');
        const charLook = splitTextToChars('look');
        const charIntentionalEnd = splitTextToChars('intentional-end');

        const introTl = gsap.timeline();
        const charDur = 1.0; const stg = 0.025; 

        // Loading Percentage Animation
        const loadingProgress = document.getElementById('loading-progress');
        const loaderBar = document.getElementById('loader-bar');
        const loaderDot = document.getElementById('loader-dot');
        if(loadingProgress) {
            gsap.to({ val: 0 }, {
                val: 100,
                duration: 4.9,
                ease: "power1.inOut",
                onUpdate: function() {
                    const raw = this.targets()[0].val;
                    const percent = Math.floor(raw).toString().padStart(2, '0');
                    loadingProgress.innerText = `${percent}%`;
                    if (loaderBar) loaderBar.style.width = Math.floor(raw) + '%';
                },
                onComplete: function() {
                    if (loaderDot) {
                        loaderDot.style.backgroundColor = '#22c55e';
                        loaderDot.style.boxShadow = '0 0 10px rgba(34,197,94,0.8)';
                    }
                }
            });
        }

        introTl.to(charI, { opacity: 1, filter: "blur(0px)", duration: charDur, stagger: stg, ease: "power2.out" })
            .addLabel("intent", "-=0.6")
            .to(gradBox, { width: "100%", duration: 1.0, ease: "power4.inOut" }, "intent")
            .to(charIntentionally, { opacity: 1, filter: "blur(0px)", duration: charDur, stagger: stg, ease: "power2.out" }, "intent")
            .addLabel("line2", "-=0.6")
            .to(charMake, { opacity: 1, filter: "blur(0px)", duration: charDur, stagger: stg, ease: "power2.out" }, "line2")
            .to(charMisalignment, { opacity: 1, filter: "blur(0px)", duration: charDur, stagger: stg, ease: "power2.out" }, "line2+=0.2")
            .addLabel("line3", "-=0.6")
            .to(charLook, { opacity: 1, filter: "blur(0px)", duration: charDur, stagger: stg, ease: "power2.out" }, "line3")
            .to(charIntentionalEnd, { opacity: 1, filter: "blur(0px)", duration: charDur, stagger: stg, ease: "power2.out" }, "line3+=0.2");

        // Show skip early so users can bypass the intro quickly
        introTl.add(() => {
            gsap.to('#skip-btn', { opacity: 1, duration: 0.5, ease: "power2.out" });
            document.getElementById('skip-btn').style.pointerEvents = 'auto';
        }, 0.5);

        // Subtle blue-to-translucent breathing during the intro
        // Not enough to see the hero, just enough to feel spatial depth
        introTl.to(preloaderBg, { 
            opacity: 0.88, 
            duration: 2.0, 
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1
        }, 0.5);

        introTl.to({}, { duration: 0.5 }); 

        const allTextChars = [...charI, ...charIntentionally, ...charMake, ...charMisalignment, ...charLook, ...charIntentionalEnd];
        introTl.addLabel("outro");
        introTl.to(allTextChars, { opacity: 0, filter: "blur(12px)", duration: 0.6, stagger: { amount: 0.5, from: "end" }, ease: "power2.inOut" }, "outro");
        introTl.to(gradBox, { opacity: 0, filter: "blur(12px)", duration: 0.6, ease: "power2.inOut" }, "outro+=0.4");

        introTl.add(() => revealHero(1.0), "outro+=0.8");

        let revealHeroHasRun = false;

        function revealHero(speed = 1.0) {
            if (revealHeroHasRun) return;
            revealHeroHasRun = true;

            // Guarantee scroll starts at 0 — browser may restore a previous session position
            if (worldViewport) worldViewport.scrollTop = 0;

            // Unlock immediately — never rely on onComplete to unfreeze the page
            isPhysicsActive = true;
            if (typeof lenis !== 'undefined' && lenis) lenis.start();
            if (preloaderBg)      preloaderBg.style.pointerEvents      = 'none';
            if (preloaderContent) preloaderContent.style.pointerEvents  = 'none';

            const d = 1.5 * speed;

            // Hide skip button and loader — display:none ensures it never bleeds through
            gsap.to(['#skip-btn', '#loader-container'], {
                opacity: 0, duration: 0.2,
                onComplete: () => {
                    const _s = document.getElementById('skip-btn');
                    if (_s) { _s.style.pointerEvents = 'none'; _s.style.display = 'none'; }
                }
            });

            const revealTl = gsap.timeline({
                onComplete: () => {
                    preloaderContent.style.display = 'none';
                    preloaderBg.style.display = 'none';
                    gsap.set(['#main-nav-container', '#top-ribbon'], { clearProps: "filter" });
                    // Recalculate all ScrollTrigger positions now that the preloader is fully
                    // gone and fonts have had time to load — prevents pin-spacer and section
                    // offset mismatches that cause the "negative spacing" layout glitch.
                    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                }
            });

            // 1. Text elements fade out (vital if skipped early)
            revealTl.to('.char, #grad-box, #intro-i, #intentionally, #make, #misalignment, #look, #intentional-end', { 
                opacity: 0, 
                duration: 0.5 * speed, 
                ease: "power2.inOut" 
            }, 0);

            // 2. Blue preloader-bg fades behind the expanding video
            revealTl.to(preloaderBg, { 
                opacity: 0, 
                duration: d * 0.8, 
                ease: "power3.inOut"
            }, d * 0.2);

            // 3. Fullscreen video (in hero) scales slightly
            revealTl.to('#intro-vid', { scale: 1.05, duration: d, ease: "expo.inOut" }, 0);

            // 4. Lighting overlay on fullscreen video fades
            revealTl.to('#intro-thumb-lighting', { 
                opacity: 0, 
                duration: d * 0.8, 
                ease: "power2.inOut" 
            }, d * 0.2);

            // 5. Hero text animates in during the curtain lift
            revealTl.to(heroText3d, { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                rotate: -4,              // keep the rotation — just scale up
                duration: d * 1.1,       // slightly longer for drama
                ease: "expo.out" 
            }, d * 0.4);

            // 5. Lighting overlay on fullscreen video fades
            revealTl.to('#intro-thumb-lighting', { 
                opacity: 0, 
                duration: d * 0.8, 
                ease: "power2.inOut" 
            }, d * 0.2);

            // 6. Hero text animates in during the curtain lift
            revealTl.to(heroText3d, { 
                opacity: 1, 
                scale: 1, 
                y: 0, 
                rotate: -4,              // keep the rotation — just scale up
                duration: d * 1.1,       // slightly longer for drama
                ease: "expo.out" 
            }, d * 0.4);

            // 5. Hero lighting (parallax radial gradient) fades in
            revealTl.to('#hero-lighting', { 
                opacity: 1, 
                duration: d, 
                ease: "power2.inOut" 
            }, 0.5 * speed);

            // 6. Overlay text labels (2026, Marketing & Creativity) fade in
            revealTl.to('.hero-overlay-text', { 
                opacity: 1, 
                duration: 0.8 * speed, 
                stagger: 0.15 
            }, d * 0.7);

            // 7. Badge — slides in from left after everything is settled
            revealTl.to('#hero-badges', { 
                opacity: 1, y: 0, 
                duration: 0.8 * speed, 
                ease: "expo.out" 
            }, d * 0.85);

            // 8. Nav — rises from below, after the scene is fully revealed
            // Keep pointer-events on the container as 'none' — the inner <nav> has
            // pointer-events-auto already, and a full-width container with auto would
            // block clicks on the sound-toggle button beneath it.
            revealTl.to('#main-nav-container', {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.0 * speed,
                ease: "expo.out"
            }, d * 0.9);

            // 9. Top ribbon — slides down from above, staggered from nav by 0.1s
            revealTl.to('#top-ribbon', { 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                duration: 1.0 * speed, 
                ease: "expo.out", 
                pointerEvents: 'auto' 
            }, d * 0.9 + 0.1 * speed);
        }

        const skipBtnInner = document.getElementById('skip-btn-inner');
        if (skipBtnInner) {
            skipBtnInner.addEventListener('click', () => {
                if (isAudioInit) popSynth.triggerAttackRelease("G4", "8n");

                // 1. Kill the intro timeline and any standalone tweens it may have spawned
                introTl.kill();
                gsap.killTweensOf([preloaderBg, preloaderContent, '#skip-btn', '#loader-container']);
                gsap.killTweensOf(allTextChars);
                gsap.killTweensOf(gradBox);

                // 2. Force every preloader element to its final hidden state — no animation,
                //    no GSAP state lingering, no tween races
                gsap.set(allTextChars, { opacity: 0, filter: 'blur(0px)' });
                gsap.set(gradBox,      { opacity: 0 });
                gsap.set(preloaderBg,  { opacity: 0 });
                if (preloaderContent) { preloaderContent.style.display      = 'none'; }
                const _skipEl = document.getElementById('skip-btn');
                if (_skipEl) { _skipEl.style.opacity = '0'; _skipEl.style.pointerEvents = 'none'; }

                // 3. Unlock scroll immediately — never wait for an animation to complete
                if (worldViewport) worldViewport.scrollTop = 0;
                if (typeof lenis !== 'undefined' && lenis) lenis.start();
                isPhysicsActive = true;

                // 4. Run the hero reveal (handles #intro-vid, hero text, nav, ribbon)
                revealHero(0.5);
            });
        }

        // --- BUILD TIMELINE TRACK TICKS ---
        const tickContainer = document.getElementById('nav-ticks-container');
        const tickTopContainer = document.getElementById('nav-ticks-top-container');
        let tickHTML = ''; let tickTopHTML = '';
        for(let i=0; i<80; i++) {
            const h = i % 5 === 0 ? '16px' : '8px';
            tickHTML += `<div style="width:2px; height:${h}; background:var(--beige); opacity:0.4;"></div>`;
            tickTopHTML += `<div style="width:2px; height:${h}; background:var(--beige); opacity:0.4;"></div>`;
        }
        if (tickContainer) tickContainer.innerHTML = tickHTML;
        if (tickTopContainer) tickTopContainer.innerHTML = tickTopHTML;

        // --- NAVIGATION STATE TRACKER ---
        let isWarping = false;
        let currentActiveId = 'hero';

        const navSections = ['hero', 'about', 'experience', 'vending', 'gallery', 'contact'];
        const navBottomLinks = document.querySelectorAll('#main-nav a.nav-link-route');
        const navTopLinks = document.querySelectorAll('#top-nav a.nav-item-top');
        const navIndicator = document.getElementById('nav-indicator');

        function updateNavState(id, force = false) {
            if (isWarping && !force) return;
            currentActiveId = id;

            navBottomLinks.forEach(link => link.classList.remove('active'));
            navTopLinks.forEach(link => link.classList.remove('text-[var(--navy)]', 'font-extrabold'));
            navTopLinks.forEach(link => link.classList.add('text-[var(--blue)]')); 

            const activeBottom = Array.from(navBottomLinks).find(l => l.getAttribute('href') === `#${id}`);
            const activeTop = Array.from(navTopLinks).find(l => l.getAttribute('href') === `#${id}`);

            if(activeBottom) {
                activeBottom.classList.add('active');
                const indicatorLeftOffset = window.innerWidth >= 768 ? 6 : 4;
                gsap.to(navIndicator, {
                    x: activeBottom.offsetLeft - indicatorLeftOffset,
                    width: activeBottom.offsetWidth,
                    duration: force ? 0 : 0.4, 
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        }

        window.addEventListener('resize', () => {
            if (!isWarping) {
                updateNavState(currentActiveId, true);
            }
        });
        
        if (document.fonts) {
            document.fonts.ready.then(() => {
                updateNavState('hero', true);
                // Fonts may finish loading after the preloader's ScrollTrigger.refresh() fires,
                // causing pin-spacer heights to be wrong on first load (gap bug). Re-refresh here
                // so spacers are always measured after real font metrics are in place.
                requestAnimationFrame(() => {
                    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                });
            });
        } else {
            setTimeout(() => {
                updateNavState('hero', true);
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                // Set transit train height based on viewport
                if (window.innerWidth >= 1880 && window.innerWidth <= 1960 && window.innerHeight >= 900 && window.innerHeight <= 980) {
                    const trainEl = document.getElementById('transit-train');
                    if (trainEl) {
                        trainEl.style.setProperty('height', '170px', 'important');
                    }
                }
                if (window.innerWidth >= 1561 && window.innerWidth <= 1660 && window.innerHeight >= 740 && window.innerHeight <= 840) {
                    const trainEl = document.getElementById('transit-train');
                    if (trainEl) {
                        trainEl.style.setProperty('height', '150px', 'important');
                    }
                }
                if (window.innerWidth >= 2500 && window.innerWidth <= 2600) {
                    // Force Projects heading size
                    const projHeading = document.querySelector('#proj-section-badge + h2');
                    if (projHeading) projHeading.style.setProperty('font-size', '200px', 'important');

                    // Force stack card sizes
                    document.querySelectorAll('.stack-card').forEach(card => {
                        card.style.setProperty('padding-top', '36px', 'important');
                        card.style.setProperty('padding-bottom', '36px', 'important');

                        const company = card.querySelector('.text-xl, [class*="text-2xl"]');
                        if (company) company.style.setProperty('font-size', '28px', 'important');

                        const role = card.querySelector('.text-5xl, [class*="text-6xl"]');
                        if (role) role.style.setProperty('font-size', '72px', 'important');

                        const desc = card.querySelector('[class*="text-\\[11px\\]"], [class*="text-\\[12px\\]"]');
                        if (desc) desc.style.setProperty('font-size', '16px', 'important');
                    });
                    const trainEl2 = document.getElementById('transit-train');
                    if (trainEl2) trainEl2.style.setProperty('height', '350px', 'important');
                }
            }, 250);
        }

        if (window.innerWidth >= 2500 && window.innerWidth <= 2600) {
            const applyCardSizes = () => {
                document.querySelectorAll('.stack-card').forEach(card => {
                    card.style.setProperty('padding-top', '40px', 'important');
                    card.style.setProperty('padding-bottom', '40px', 'important');
                    const company = card.querySelector('[class*="text-xl"], [class*="text-2xl"]');
                    if (company) company.style.setProperty('font-size', '32px', 'important');
                    const role = card.querySelector('[class*="text-5xl"], [class*="text-6xl"]');
                    if (role) role.style.setProperty('font-size', '80px', 'important');
                    const desc = card.querySelectorAll('[class*="text-[11px]"], [class*="text-[12px]"], [class*="text-[13px]"]');
                    desc.forEach(el => el.style.setProperty('font-size', '18px', 'important'));
                });
            };

            applyCardSizes();

            const stackObserver = new MutationObserver(applyCardSizes);
            const stackArea = document.getElementById('stack-area');
            if (stackArea) stackObserver.observe(stackArea, { childList: true, subtree: true });
        }

        // --- SYSTEM TRANSIT WARP (NAVBAR TRANSITIONS) ---
        const mainNavBrutal = document.getElementById('main-nav');
        
        [...navBottomLinks, ...navTopLinks].forEach(link => {
            link.addEventListener('click', async (e) => {
                if (isAudioInit) popSynth.triggerAttackRelease("C5", "8n");
                e.preventDefault();
                if(isWarping) return;
                isWarping = true;
                
                // Auto-audio init removed, now controlled exclusively via the sound toggle.

                const targetId = link.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                const sectionName = link.innerText.replace(/[0-9.]/g, '').trim().toUpperCase();
                // Refresh before measuring so pin-spacer heights are always current
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                let targetScroll = worldViewport.scrollTop + targetEl.getBoundingClientRect().top;

                // UX Hint: When navigating to Origin (#about), scroll just deep enough (40vh) so the diary has emerged, but before the camera starts tracking across the pages or zooming.
                if (targetId === '#about') {
                    targetScroll += window.innerHeight * 0.4;
                }

                document.body.classList.add('traveling');
                document.body.style.pointerEvents = 'none'; 
                lockSynth.triggerAttackRelease("C2", "8n");

                const origWidth = mainNavBrutal.offsetWidth;
                const transitTl = gsap.timeline({
                    onComplete: () => {
                        document.body.classList.remove('traveling');
                        document.body.style.pointerEvents = 'auto';
                        isWarping = false;
                    }
                });

                // Safety net: if the timeline stalls or errors, unlock nav after 4s
                setTimeout(() => {
                    isWarping = false;
                    document.body.style.pointerEvents = 'auto';
                    document.body.classList.remove('traveling');
                }, 4000);

                transitTl.to('.nav-item, .nav-item-top', { opacity: 0, duration: 0.2 }, 0);
                transitTl.to(navIndicator, { 
                    width: "100%", x: 0, 
                    backgroundColor: "var(--blue)", 
                    duration: 0.3, ease: "power4.inOut" 
                }, 0);
                
                transitTl.to(mainNavBrutal, { 
                    width: "110vw", 
                    padding: "30px 0",
                    borderWidth: "8px",
                    borderColor: "var(--beige)",
                    duration: 0.6,
                    ease: "power4.inOut"
                }, 0.1);

                transitTl.to(worldViewport, {
                    scale: 0.82, 
                    rotationX: 28, 
                    y: "-4vh", 
                    transformPerspective: 1200, 
                    transformOrigin: "center center",
                    borderRadius: "24px", 
                    filter: "brightness(0.35) blur(6px)", 
                    duration: 0.6,
                    ease: "power3.inOut"
                }, 0.1);

                transitTl.add(() => {
                    document.getElementById('timeline-dest-text').innerText = `TARGET: ${sectionName}`;
                    if (isAudioInit) {
                        dopaminePad.triggerAttackRelease(["E4", "G4", "B4", "D5"], "1m");
                    }
                    if(targetEl) {
                        lenis.scrollTo(targetScroll, {
                            duration: 1.4,
                            easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                        });
                    }
                    // When jumping to Origin, the scrub (lag=2.2s) would leave the notebook at
                    // opacity:0 when the viewport un-dims. Instantly seek aboutTl to the correct
                    // progress so content is pre-rendered before the screen brightens.
                    if (targetId === '#about' && typeof aboutTl !== 'undefined') {
                        const st = ScrollTrigger.getAll().find(s => s.trigger === document.querySelector('#about') && s.vars && s.vars.scrub);
                        if (st) {
                            const p = Math.max(0, Math.min(1, (targetScroll - st.start) / (st.end - st.start)));
                            aboutTl.progress(p, true);
                        }
                    }
                }, 0.6);
                
                transitTl.to('#nav-timeline-track', { opacity: 1, duration: 0.2 }, 0.4);
                transitTl.fromTo('#nav-ticks-container', { x: "0vw" }, { x: "-200vw", duration: 1.8, ease: "power2.inOut" }, 0.4);
                transitTl.fromTo('#nav-ticks-top-container', { x: "0vw" }, { x: "-200vw", duration: 1.8, ease: "power2.inOut" }, 0.4);

                const passby = document.getElementById('cinematic-passby');
                if (passby) {
                    transitTl.to(passby, { opacity: 1, duration: 0.1 }, 0.5);
                    transitTl.to(passby, { opacity: 0, duration: 0.2 }, 1.8);
                }

                transitTl.to('#nav-timeline-track', { opacity: 0, duration: 0.3 }, 1.8); 

                const isDesktop = window.innerWidth >= 768;
                transitTl.to(mainNavBrutal, { 
                    width: origWidth, 
                    padding: isDesktop ? "6px" : "4px",
                    borderWidth: isDesktop ? "3px" : "2px",
                    borderColor: "var(--navy)",
                    duration: 0.7,
                    ease: "expo.out",
                    clearProps: "width" 
                }, 2.0);
                
                transitTl.add(() => {
                    navIndicator.style.backgroundColor = "var(--blue)";
                    arrivalSynth.triggerAttackRelease(["C4", "E4", "G4"], "4n"); 
                    updateNavState(targetId.replace('#', ''), false);
                }, 2.1);

                transitTl.to(worldViewport, {
                    scale: 1,
                    rotationX: 0,
                    y: "0vh",
                    borderRadius: "0px",
                    filter: "brightness(1) blur(0px)",
                    duration: 0.9,
                    ease: "expo.out"
                }, 2.0);

                transitTl.to('.nav-item, .nav-item-top', { opacity: 1, duration: 0.4 }, 2.3);
                transitTl.add(() => { updateNavState(targetId.replace('#', ''), true); }, 2.8);
            });
        });

        // --- CURSOR LOGIC ---
        const cursorCore = document.getElementById('cursor-core');
        const trailContainer = document.getElementById('cursor-trail-container');

        // If the custom cursor element failed to render, restore native pointer
        if (!cursorCore) {
            document.body.style.setProperty('cursor', 'auto', 'important');
        }
        
        let globalMouseX = window.innerWidth / 2;
        let globalMouseY = window.innerHeight / 2;
        let isHovering = false;
        let isMagneticLock = false;
        let prevMouseX = globalMouseX;
        let mouseVelX = 0;
        let swingForce = 0;

        gsap.set(cursorCore, { xPercent: -50, yPercent: -50 });

        const trailCount = 10;
        const trailElements = [];
        
        for (let i = 0; i < trailCount; i++) {
            const el = document.createElement('div');
            const size = Math.max(2, 16 - (i * 1.1)); 
            const opacity = 1 - (i * 0.05); 
            el.className = 'absolute top-0 left-0 bg-white rounded-full pointer-events-none will-change-transform box-border border-[0px] border-white';
            gsap.set(el, { width: size, height: size, opacity: opacity, xPercent: -50, yPercent: -50 });
            trailContainer.appendChild(el);
            trailElements.push({ el: el, x: globalMouseX, y: globalMouseY, baseSize: size, baseOpacity: opacity });
        }

        window.addEventListener('mousemove', (e) => {
            globalMouseX = e.clientX;
            globalMouseY = e.clientY;
        });

        window.addEventListener('mousedown', () => {
            gsap.to(cursorCore, { scale: 0.5, duration: 0.1 });
            if (isHovering) gsap.to(trailElements[0].el, { scale: 0.85, duration: 0.1 });
        });

        window.addEventListener('mouseup', () => {
            gsap.to(cursorCore, { scale: 1, duration: 0.4, ease: "back.out(3)" });
            if (isHovering) gsap.to(trailElements[0].el, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });

            const ripple = document.createElement('div');
            ripple.className = 'fixed rounded-full border border-white mix-blend-difference pointer-events-none z-[9999]';
            document.body.appendChild(ripple);
            gsap.set(ripple, { x: globalMouseX, y: globalMouseY, xPercent: -50, yPercent: -50, width: 20, height: 20, borderWidth: "3px" });
            gsap.to(ripple, { width: 120, height: 120, opacity: 0, borderWidth: "0px", duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
            setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 800);
        });

        gsap.ticker.add(() => {
            if (document.hidden) return;
            gsap.set(cursorCore, { x: globalMouseX, y: globalMouseY });
            let leaderX = globalMouseX;
            let leaderY = globalMouseY;

            if (isMagneticLock) {
                for (let i = 0; i < trailCount; i++) {
                    const pt = trailElements[i];
                    pt.x += (leaderX - pt.x) * 0.3;
                    pt.y += (leaderY - pt.y) * 0.3;
                    gsap.set(pt.el, { x: pt.x, y: pt.y });
                }
                return;
            }

            for (let i = 0; i < trailCount; i++) {
                const pt = trailElements[i];
                const springStiffness = 0.4; 
                pt.x += (leaderX - pt.x) * springStiffness;
                pt.y += (leaderY - pt.y) * springStiffness;
                gsap.set(pt.el, { x: pt.x, y: pt.y });
                leaderX = pt.x;
                leaderY = pt.y;
            }
        });

        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, .cursor-pointer, .cursor-hover, .nav-item, .stack-card, .archival-card, .nav-item-top, #vending-coin, .scratch-coin-element, .draggable-sticker');
            if (target && !isMagneticLock && !target.closest('[data-no-cursor-change]')) {
                isHovering = true;
                if(isAudioInit) hoverTickSynth.triggerAttackRelease("C5", "64n");
                gsap.to(cursorCore, { scale: 0, duration: 0.2 });
                gsap.to(trailElements[0].el, { 
                    width: 46, height: 46, 
                    backgroundColor: "transparent", 
                    borderWidth: "2px", 
                    borderRadius: "50%",
                    duration: 0.4, 
                    ease: "back.out(2)" 
                });
                for (let i = 1; i < trailCount; i++) {
                    gsap.to(trailElements[i].el, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
                }
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, .cursor-pointer, .cursor-hover, .nav-item, .stack-card, .archival-card, .nav-item-top, #vending-coin, .scratch-coin-element, .draggable-sticker');
            if (target && !isMagneticLock && !target.closest('[data-no-cursor-change]')) {
                if (!target.contains(e.relatedTarget)) {
                    isHovering = false;
                    gsap.to(cursorCore, { scale: 1, duration: 0.2 });
                    gsap.to(trailElements[0].el, { 
                        width: trailElements[0].baseSize, 
                        height: trailElements[0].baseSize, 
                        backgroundColor: "white", 
                        borderWidth: "0px", 
                        borderRadius: "50%",
                        duration: 0.3, 
                        ease: "power2.out" 
                    });
                    for (let i = 1; i < trailCount; i++) {
                        gsap.to(trailElements[i].el, { 
                            scale: 1, 
                            opacity: trailElements[i].baseOpacity, 
                            duration: 0.4, 
                            delay: i * 0.015, 
                            ease: "back.out(1.5)",
                            overwrite: "auto" 
                        });
                    }
                }
            }
        });

        // --- HERO PARALLAX ---
        let isPhysicsActive = false;
        let currMouseX = window.innerWidth / 2;
        let currMouseY = window.innerHeight / 2;
        let currTextScale = 1;

        // --- HERO LABELS PARALLAX ---
        const quoteBlock = document.getElementById('hero-quote-block');
        const rolesBlock = document.getElementById('hero-roles-block');
        const tiltCards = document.querySelectorAll('.js-tilt-card');
        const vendingWall = document.getElementById('vending-wall-environment');
        
        // Initialize custom properties for buttery interpolation
        tiltCards.forEach(card => {
            card.targetRotX = 0;
            card.targetRotY = 0;
            card.targetRotZ = parseFloat(card.dataset.origRot || 0);
            card.currentRotX = 0;
            card.currentRotY = 0;
            card.currentRotZ = card.targetRotZ;
            card.isHovered = false;
        });
        
        gsap.ticker.add(() => {
            if(!isPhysicsActive || isWarping) return;

            mouseVelX = globalMouseX - prevMouseX;
            prevMouseX = globalMouseX;

            swingForce += (mouseVelX * 0.18 - swingForce) * 0.08;

            currMouseX += (globalMouseX - currMouseX) * 0.06;
            currMouseY += (globalMouseY - currMouseY) * 0.06;

            const normX = (currMouseX / window.innerWidth - 0.5) * 2;
            const normY = (currMouseY / window.innerHeight - 0.5) * 2;

            if (heroBgTarget) {
                gsap.set(heroBgTarget, { x: normX * -30, y: normY * -30, rotationY: normX * 4, rotationX: normY * -4 });
            }

            if (heroText3d) {
                const targetScale = isMagneticLock ? 1.03 : 1;
                currTextScale += (targetScale - currTextScale) * 0.08;
                gsap.set(heroText3d, { x: normX * 25, y: normY * 25, rotationY: normX * 5, rotationX: normY * -5, scale: currTextScale });

                const shadowMax = 60; 
                const shX = normX * -shadowMax; 
                const shY = normY * -shadowMax;
                
                let shadowStr = '';
                const layers = 40; 
                for(let i=1; i<=layers; i++) {
                    const factor = i / layers;
                    const r = Math.round(1 + (5 - 1) * factor);
                    const g = Math.round(44 + (16 - 44) * factor);
                    const b = Math.round(235 + (36 - 235) * factor);
                    shadowStr += `${shX * factor}px ${shY * factor}px 0 rgba(${r},${g},${b}, 1), `;
                }
                const shBlur = isMagneticLock ? 40 : 25; 
                shadowStr += `${shX * 1.1}px ${shY * 1.1}px ${shBlur}px rgba(5, 16, 36, 0.8)`;
                heroText3d.style.textShadow = shadowStr;
            }

            if (heroLighting) {
                heroLighting.style.background = `radial-gradient(circle 1100px at ${currMouseX}px ${currMouseY}px, rgba(244, 239, 230, 0) 0%, rgba(5, 16, 36, 0.65) 100%)`;
            }

            // Apply global inverse parallax to labels
            if (quoteBlock) {
                gsap.set(quoteBlock, { x: normX * 15, y: normY * 20 });
            }
            if (rolesBlock) {
                gsap.set(rolesBlock, { x: normX * -15, y: normY * -20 });
            }

            // Apply subtle deep-background parallax to vending wall
            if (vendingWall) {
                gsap.set(vendingWall, { x: normX * -25, y: normY * -25 });
            }

            // Global Perspective Tilt Integration
            tiltCards.forEach(card => {
                if (!card.isHovered) {
                    // Global tilt based on overall mouse position
                    card.targetRotX = normY * -15;
                    card.targetRotY = normX * 15;
                    
                    // Apply realistic hanging pendulum swing modifier
                    let swingMod = 0;
                    if (card.classList.contains('hanging-hinge-top')) {
                        swingMod = swingForce * 1.6;
                    } else if (card.classList.contains('hanging-hinge-left')) {
                        swingMod = swingForce * 0.9;
                    }
                    card.targetRotZ = parseFloat(card.dataset.origRot || 0) + (normX * 3) + swingMod;
                } else {
                    card.targetRotZ = swingForce * 0.4;
                }
                
                // Smooth interpolation for buttery movement
                card.currentRotX += (card.targetRotX - card.currentRotX) * 0.1;
                card.currentRotY += (card.targetRotY - card.currentRotY) * 0.1;
                card.currentRotZ += (card.targetRotZ - card.currentRotZ) * 0.1;
                
                gsap.set(card, {
                    rotationX: card.currentRotX,
                    rotationY: card.currentRotY,
                    rotateZ: card.currentRotZ
                });
            });
        });

        // --- 3D PERSPECTIVE TILT FOR HERO LABELS (Event Listeners) ---
        tiltCards.forEach(card => {
            const parent = card.parentElement;
            
            parent.addEventListener('mouseenter', () => {
                card.isHovered = true;
                gsap.to(card, {
                    scale: 1.05, // Lift off canvas
                    boxShadow: "0px 20px 40px rgba(5,16,36,0.3)", // Softened floating shadow
                    duration: 0.4,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });

            parent.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 768) return;
                const rect = parent.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Update target rotations based on local mouse position relative to center
                card.targetRotX = ((y - centerY) / centerY) * -18; 
                card.targetRotY = ((x - centerX) / centerX) * 18;
                card.targetRotZ = 0; // Snap straight when hovered
            });

            parent.addEventListener('mouseleave', () => {
                card.isHovered = false;
                
                // Restore brutalist defaults for shadow and scale
                const origShadow = card.dataset.origShadow;
                gsap.to(card, {
                    scale: 1,
                    boxShadow: origShadow,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.4)",
                    overwrite: "auto"
                });
            });
        });

        if (heroText3d) {
            heroText3d.addEventListener('mouseenter', () => {
                isMagneticLock = true;
                if(typeof isAudioInit !== 'undefined' && isAudioInit && typeof hoverTickSynth !== 'undefined') {
                    hoverTickSynth.triggerAttackRelease("C5", "64n");
                }
            });
            heroText3d.addEventListener('mouseleave', () => {
                isMagneticLock = false;
            });
        }

        // --- ABOUT: ARCHIVAL CINEMATIC REALISM DIARY WITH BLUEPRINT PATH TRACING ---
        const aboutSection = document.getElementById('about');

        if (aboutSection) {
            
            // Dynamically calculate the EXACT length of the SVG path for perfect sync
            const tracePath = document.getElementById('blueprint-trace-path');
            let pathLen = 4000;
            if (tracePath) {
                pathLen = tracePath.getTotalLength();
                // Apply measured length to BOTH paths so they draw in perfect sync
                gsap.set('.map-line-path', { strokeDasharray: pathLen, strokeDashoffset: pathLen });
            }

            // ── EXACT NODE FRACTIONS ──────────────────────────────────────────────────
            // Sample path at 2000 points. For each SVG node position find the nearest
            // sample (searching forward from the previous node so the result is monotonic).
            // dashoffset value = (1 - nodeFrac[i]) * pathLen
            const _arcSamples = [];
            if (tracePath) {
                const _NS = 2000;
                for (let i = 0; i <= _NS; i++) {
                    const l  = (i / _NS) * pathLen;
                    const pt = tracePath.getPointAtLength(l);
                    _arcSamples.push({ l, x: pt.x, y: pt.y });
                }
            }
            const _nodeSVGPos = [
                [330, 360],   // 0  origin
                [78,  550],   // 1  U-turn / personal-cutout
                [380, 750],   // 2  strategy phrase
                [850, 140],   // 3  polaroid
                [1250,100],   // 4  art-stats (186M)
                [1200,320],   // 5  art-terminal (philosophy)
                [1300,680],   // 6  stamp-blue area
                [1075,680],   // 7  stamp-yellow
                [850, 680],   // 8  stamp-red
                [850, 750],   // 9
                [1050,800],   // 10 end
            ];
            let _searchStart = 0;
            const _nf = _nodeSVGPos.map(([tx, ty]) => {
                const startIdx = Math.floor(_searchStart * _arcSamples.length);
                let bestD = Infinity, bestL = 0;
                for (let i = startIdx; i < _arcSamples.length; i++) {
                    const s = _arcSamples[i];
                    const d = (s.x - tx) ** 2 + (s.y - ty) ** 2;
                    if (d < bestD) { bestD = d; bestL = s.l; }
                }
                _searchStart = bestL / pathLen;
                return _searchStart;  // drawn fraction when line tip is at this node
            });

            // Measure each element's center as % of notebook container (before GSAP moves anything)
            const spotMap = {};
            const nbEl = document.getElementById('notebook-container');
            // Pre-sampled path points for spotlight-follows-line-tip tracking
            const _lineTipSamples = [];
            if (nbEl) {
                const nbr = nbEl.getBoundingClientRect();
                ['#intro-sticky-note','#origin-headline','#origin-micro-story','#personal-cutout',
                 '#frag-strategy-annot','#frag-origin-cursive',
                 '#art-polaroid','#art-terminal','#art-stats','#experience-typewriter',
                 '.evidence-stamp-blue','.evidence-stamp-yellow','.evidence-stamp-red',
                 '#other-highlights-block','#torn-signature-paper'].forEach(sel => {
                    const el = document.querySelector(sel);
                    if (el) {
                        const r = el.getBoundingClientRect();
                        spotMap[sel] = {
                            x: +((r.left + r.width/2  - nbr.left) / nbr.width  * 100).toFixed(1),
                            y: +((r.top  + r.height/2 - nbr.top)  / nbr.height * 100).toFixed(1)
                        };
                    }
                });

                // Some elements use md:bottom-[-8%] / md:bottom-[-4%] so their centres
                // fall outside the notebook container (y > 100).  Clamp every entry so
                // the spotlight and camera maths always receive an in-bounds coordinate.
                Object.keys(spotMap).forEach(sel => {
                    spotMap[sel].x = Math.max(3, Math.min(97, spotMap[sel].x));
                    spotMap[sel].y = Math.max(3, Math.min(97, spotMap[sel].y));
                });
                // Sample the SVG path into spotlight-coordinate space so lensUpdate can
                // move the spotlight to the exact line tip each frame without any tween lag.
                if (tracePath) {
                    const svgEl = tracePath.ownerSVGElement;
                    const svgR  = svgEl.getBoundingClientRect();
                    const N = 300;
                    for (let i = 0; i <= N; i++) {
                        const l  = (i / N) * pathLen;
                        const pt = tracePath.getPointAtLength(l);
                        _lineTipSamples.push({
                            f: i / N,
                            x: (svgR.left + (pt.x / 1500) * svgR.width  - nbr.left) / nbr.width  * 100,
                            y: (svgR.top  + (pt.y /  850) * svgR.height - nbr.top)  / nbr.height * 100
                        });
                    }
                }
            }
            const spotTo = (sel, nx=0, ny=0) => {
                const s = spotMap[sel] || {x:50, y:50};
                return { "--spot-x": (s.x+nx)+"%", "--spot-y": (s.y+ny)+"%" };
            };
            // Seed spotlight at the first note so it doesn't fly in from centre
            gsap.set('#cinematic-spotlight', spotTo('#intro-sticky-note'));
            const spotLerp = (a, b, t, nx=0, ny=0) => {
                const sa = spotMap[a] || {x:50, y:50};
                const sb = spotMap[b] || {x:50, y:50};
                return { "--spot-x": (sa.x+(sb.x-sa.x)*t+nx)+"%", "--spot-y": (sa.y+(sb.y-sa.y)*t+ny)+"%" };
            };

            // Book starts already open but tilted away and at 60% visibility instead of total darkness
            gsap.set('#notebook-container', { 
                xPercent: 0, 
                rotationX: 32,      // steep downward tilt — like floating above a table
                rotationY: -8,      // slight left lean for cinematic entry angle
                rotationZ: 3, 
                scale: 0.6,         // pulled far back — camera will push in dramatically
                opacity: 0.6, 
                y: 80,
                transformOrigin: "center center"
            });

            // Cover is already flipped open — left page visible from frame 0
            gsap.set('#book-cover-hinge', { rotationY: -180 });

            // Stickers hidden — will appear after entry
            gsap.set('.draggable-sticker', { opacity: 0, y: 20, pointerEvents: 'none' });

            // All content elements hidden — camera will reveal them sequentially
            gsap.set('.focus-lift-target', { opacity: 0, scale: 0.95 });

            // Tagline hidden — appears first before book
            gsap.set('#open-book-label', { opacity: 0, y: 12 });

            // Blueprint path hidden (dasharray/dashoffset already set above for both paths)

            // Master Cinematic Timeline coordinating scrolling and elements drawing
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#about",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2.2,             // heavier scrub lag = deliberate, weighted pacing
                    invalidateOnRefresh: true
                }
            });

            // ── PROXIMITY LENS ENGINE ────────────────────────────────────────────────
            // States per element:
            //   ACTIVE   → entrance pop tween, then full optical proximity curve
            //   NEXT     → ghost bleed preview (closest unvisited)
            //   RESTING  → spotlight has passed: dim + blurred, stays visible
            //   DARK     → not yet reached: opacity 0
            const LENS_FOCAL_R    = 16;   // %-units: inner zone — fully sharp
            const LENS_BLEED_R    = 40;   // %-units: outer zone — curve falloff
            const LENS_BLEED_OP   = 0.22; // next-element preview opacity (increased)
            const LENS_RESTING_OP = 0.5;  // opacity once spotlight has passed
            const LENS_RESTING_BL = 1;    // px blur in resting state
            const LENS_MAX_BLUR   = 7;    // px blur at full defocus / dark

            // Stamps stay in spotMap for spotlight tweens but are excluded from lens management
            // (opacity driven directly by scrub timeline instead)
            const _noLensSelectors = new Set(['.evidence-stamp-blue','.evidence-stamp-yellow','.evidence-stamp-red']);

            const lensTargets = Object.keys(spotMap).map(sel => {
                if (_noLensSelectors.has(sel)) return null;
                const el = document.querySelector(sel);
                if (!el || !spotMap[sel]) return null;
                return {
                    sel, el, pos: spotMap[sel],
                    setOp: gsap.quickSetter(el, 'opacity'),
                    wasActive: false, entering: false,
                    // Lerp-rendered values — chase their targets smoothly each frame
                    rendOp: 0.0, rendBl: LENS_MAX_BLUR
                };
            }).filter(Boolean);

            // ── ELEMENT GROUPS ───────────────────────────────────────────────────────
            // Followers share their leader's opacity/blur — they blur/unblur as one unit.
            // Followers are stripped from lensTargets so they never independently drive activeIdx.
            const _lensGroups = [
                { leader: '#origin-headline', followers: ['#origin-micro-story', '#frag-origin-cursive'] }
            ];
            const _followerSelSet = new Set(_lensGroups.flatMap(g => g.followers));

            // Pull out follower elements before stripping them
            const _followerElMap = {};
            lensTargets.forEach(t => { if (_followerSelSet.has(t.sel)) _followerElMap[t.sel] = t.el; });

            // Strip followers from main array (iterate backwards to keep indices stable)
            for (let i = lensTargets.length - 1; i >= 0; i--) {
                if (_followerSelSet.has(lensTargets[i].sel)) lensTargets.splice(i, 1);
            }

            // Attach follower elements to their leader
            _lensGroups.forEach(({ leader, followers }) => {
                const lt = lensTargets.find(t => t.sel === leader);
                if (lt) lt.linkedEls = followers.map(s => _followerElMap[s]).filter(Boolean);
            });

            // Hard-reset ALL managed elements (leaders + followers)
            lensTargets.forEach(t => {
                const all = t.linkedEls ? [t.el, ...t.linkedEls] : [t.el];
                gsap.set(all, { opacity: 0, scale: 1, filter: `blur(${LENS_MAX_BLUR}px)` });
            });

            const _spotlightEl = document.getElementById('cinematic-spotlight');
            let lensActive = false;
            let _lastActiveIdx = -1;
            let _prevTlTime    = -1;

            const _triggerEntrance = (target) => {
                // Kill any in-progress scale tweens on previously entering elements
                lensTargets.forEach(t => {
                    if (t.entering && t !== target) {
                        const prevEls = t.linkedEls ? [t.el, ...t.linkedEls] : [t.el];
                        gsap.killTweensOf(prevEls);
                        t.entering = false;
                    }
                });

                // Snap opacity & blur IMMEDIATELY — scroll-speed independent
                target.rendOp = 1.0;
                target.rendBl = 0;
                target.entering = false; // Don't block LERP tick

                const allEls = target.linkedEls ? [target.el, ...target.linkedEls] : [target.el];
                // Apply directly so there's zero visual lag
                target.setOp(1.0);
                target.el.style.filter = 'none';
                if (target.linkedEls) {
                    target.linkedEls.forEach(el => { el.style.opacity = 1; el.style.filter = 'none'; });
                }

                // Scale pop from wherever element is — no jump if re-triggered mid-animation
                gsap.killTweensOf(allEls);
                gsap.to(allEls, { scale: 1.0, duration: 0.4, ease: 'power3.out' });
            };

            // How much closer a candidate must be before activeIdx switches (%-units).
            // Prevents rapid flipping between densely packed page-1 elements.
            const LENS_HYSTERESIS = 3;
            // Per-frame lerp speed — higher = snappier, lower = smoother
            const LERP_K = 0.06;

            // Camera pan tracking — follows spotlight with heavy damping for stable glide
            let _camX = 0, _camY = 0;    // start at centre — camera follows spotlight smoothly from T=0
            const _nbXSet = gsap.quickSetter('#notebook-container', 'xPercent');
            const _nbYSet = gsap.quickSetter('#notebook-container', 'yPercent');

            const lensUpdate = () => {
                if (!lensActive || !_spotlightEl) return;

                // Hard-dark on full rewind
                if (aboutTl.time() < 0.9) {
                    _lastActiveIdx = -1; _prevTlTime = -1;
                    lensTargets.forEach(t => {
                        t.wasActive = false; t.entering = false;
                        const allEls = t.linkedEls ? [t.el, ...t.linkedEls] : [t.el];
                        gsap.killTweensOf(allEls);
                        t.rendOp = 0; t.rendBl = LENS_MAX_BLUR;
                        t.setOp(0);
                        allEls.forEach(el => { el.style.filter = `blur(${LENS_MAX_BLUR}px)`; });
                    });
                    return;
                }

                // Direction: compare timeline time to previous frame
                const tlTime   = aboutTl.time();
                const isForward = _prevTlTime < 0 ? true : tlTime >= _prevTlTime;
                _prevTlTime    = tlTime;

                // Read spotlight position (driven by spotTo() tweens — always on element centres)
                const cs = getComputedStyle(_spotlightEl);
                const sx = parseFloat(cs.getPropertyValue('--spot-x')) || 50;
                const sy = parseFloat(cs.getPropertyValue('--spot-y')) || 50;

                // CAMERA TRACKING: multiply by current scale to exactly counteract zoom displacement.
                // At scale s, an element at sx% appears at (sx-50)*s % offset from viewport centre —
                // so we need to pan by that same amount to bring it back to centre.
                {
                    const nbScale = gsap.getProperty('#notebook-container', 'scale') || 1.35;
                    let camTX = (50 - sx) * nbScale;
                    let camTY = (50 - sy) * nbScale * 0.85; // 0.85: vertical pan slightly softer
                    // Fade camera pan in over first 1s so spotlight seed doesn't cause entry snap
                    const _tNow = aboutTl.time();
                    if (_tNow < 1.0) {
                        const _ef = _tNow / 1.0;
                        camTX *= _ef;
                        camTY *= _ef;
                    }
                    // Park camera back to centre 2s before Phase 3 so re-entry from projects never jumps
                    if (_tNow > 27.0) {
                        const _pf = Math.min(1, (_tNow - 27.0) / 2.0);
                        camTX *= (1 - _pf);
                        camTY *= (1 - _pf);
                    }
                    _camX += (camTX - _camX) * 0.04;
                    _camY += (camTY - _camY) * 0.04;
                    _nbXSet(_camX);
                    _nbYSet(_camY);
                }

                // Pass 1 — ACTIVE: find closest; only switch with hysteresis
                let minD = Infinity, candidateIdx = 0;
                lensTargets.forEach(({ pos }, i) => {
                    const dx = sx - pos.x, dy = sy - pos.y;
                    const d = Math.sqrt(dx * dx * 0.65 + dy * dy);
                    if (d < minD) { minD = d; candidateIdx = i; }
                });

                let activeIdx = _lastActiveIdx < 0 ? candidateIdx : _lastActiveIdx;
                if (candidateIdx !== activeIdx) {
                    const { pos: aPos } = lensTargets[activeIdx];
                    const adx = sx - aPos.x, ady = sy - aPos.y;
                    const curD = Math.sqrt(adx * adx * 0.65 + ady * ady);
                    if (curD - minD >= LENS_HYSTERESIS) activeIdx = candidateIdx;
                }

                if (activeIdx !== _lastActiveIdx) {
                    if (isForward) {
                        // Forward: mark visited, pop entrance
                        lensTargets[activeIdx].wasActive = true;
                        // Skip entrance pop on the very first activation — let LERP smooth it in
                        if (_lastActiveIdx >= 0) {
                            _triggerEntrance(lensTargets[activeIdx]);
                        }
                    } else {
                        // Backward: mirror of forward — let Pass 3 LERP re-blur naturally.
                        // Just un-visit the leaving element and let proximity curve fade it out.
                        if (_lastActiveIdx >= 0 && _lastActiveIdx < lensTargets.length) {
                            const leaving = lensTargets[_lastActiveIdx];
                            leaving.wasActive = false;
                            leaving.entering  = false;
                            const leavingEls = leaving.linkedEls ? [leaving.el, ...leaving.linkedEls] : [leaving.el];
                            gsap.killTweensOf(leavingEls);
                            // Softly shrink scale so next forward entrance starts clean
                            gsap.to(leavingEls, { scale: 0.95, duration: 0.4, ease: 'power2.in' });
                            // rendOp/rendBl intentionally NOT snapped — Pass 3 LERP drives
                            // them to 0/MAX_BLUR at the same speed as forward unblur
                        }
                    }
                    _lastActiveIdx = activeIdx;
                }

                // Pass 2 — NEXT preview
                // Forward: closest dark (unvisited) element — peek at what's coming
                // Backward: closest resting (visited) element — peek at what's about to go dark
                let nextD = Infinity, nextIdx = -1;
                lensTargets.forEach((t, i) => {
                    if (i === activeIdx) return;
                    const shouldPreview = isForward ? !t.wasActive : t.wasActive;
                    if (!shouldPreview) return;
                    const dx = sx - t.pos.x, dy = sy - t.pos.y;
                    const d = Math.sqrt(dx * dx * 0.65 + dy * dy);
                    if (d < nextD) { nextD = d; nextIdx = i; }
                });

                // Pass 3 — compute target op/bl, then lerp rendered values toward them
                lensTargets.forEach((t, i) => {
                    if (t.entering) return; // GSAP owns this element during entrance pop

                    let targetOp, targetBl;

                    if (i === activeIdx) {
                        const dx = sx - t.pos.x, dy = sy - t.pos.y;
                        const dist = Math.sqrt(dx * dx * 0.65 + dy * dy);
                        if (dist <= LENS_FOCAL_R) {
                            targetOp = 1.0; targetBl = 0;
                        } else if (dist <= LENS_BLEED_R) {
                            const tv  = (dist - LENS_FOCAL_R) / (LENS_BLEED_R - LENS_FOCAL_R);
                            const tc  = tv * tv * tv;
                            targetOp = Math.max(LENS_RESTING_OP, LENS_BLEED_OP + (1 - LENS_BLEED_OP) * (1 - tc));
                            targetBl = LENS_MAX_BLUR * tc;
                        } else {
                            targetOp = LENS_RESTING_OP; targetBl = LENS_MAX_BLUR;
                        }
                    } else if (i === nextIdx) {
                        targetOp = LENS_BLEED_OP; targetBl = LENS_MAX_BLUR;
                    } else if (t.wasActive) {
                        targetOp = LENS_RESTING_OP; targetBl = LENS_RESTING_BL;
                    } else {
                        targetOp = 0; targetBl = LENS_MAX_BLUR;
                    }

                    // Lerp rendered values toward target — no hard snaps
                    t.rendOp += (targetOp - t.rendOp) * LERP_K;
                    t.rendBl += (targetBl - t.rendBl) * LERP_K;

                    const filterStr = t.rendBl < 0.05 ? 'none' : `blur(${t.rendBl.toFixed(2)}px)`;
                    t.setOp(t.rendOp);
                    t.el.style.filter = filterStr;

                    // Sync grouped followers — identical opacity + blur as their leader
                    if (t.linkedEls) {
                        t.linkedEls.forEach(el => {
                            el.style.opacity = t.rendOp;
                            el.style.filter  = filterStr;
                        });
                    }
                });
            };
            // Store reference so we can remove it when the section is offscreen
            const lensTickerFn = lensUpdate;
            gsap.ticker.add(lensTickerFn);

            // Activate only while the about section is in the viewport.
            // Also pause/resume the ticker fn to stop 60fps work when scrolled away.
            ScrollTrigger.create({
                trigger: '#about',
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => {
                    lensActive = true;
                    _camX = gsap.getProperty('#notebook-container', 'xPercent') || 0;
                    _camY = gsap.getProperty('#notebook-container', 'yPercent') || 0;
                    gsap.ticker.add(lensTickerFn);
                },
                onLeave:      () => { lensActive = false; gsap.ticker.remove(lensTickerFn); },
                onEnterBack:  () => {
                    lensActive = true;
                    // Seed camera from actual notebook position so there's no jump on re-entry
                    _camX = gsap.getProperty('#notebook-container', 'xPercent') || 0;
                    _camY = gsap.getProperty('#notebook-container', 'yPercent') || 0;
                    gsap.ticker.add(lensTickerFn);
                },
                onLeaveBack:  () => { lensActive = false; gsap.ticker.remove(lensTickerFn); }
            });

            const nodes = document.querySelectorAll('.active-blueprint-node');

            // PHASE 1 — Book drifts into frame & camera focuses precisely on 'Open Book Note' (T=0.0 to T=2.5)
            aboutTl.to('#notebook-container', { 
                opacity: 1, 
                duration: 0.8, ease: "power2.out" 
            }, 0.0);

            aboutTl.to('#notebook-container', {
                rotationX: 8,
                rotationY: -3,
                rotationZ: 0,
                scale: window.innerWidth > 768 ? 1.35 : 1.15,
                duration: 2.5, ease: "power2.inOut"
            }, 0.0);

            // Stickers drift in while book settles
            aboutTl.to('.draggable-sticker', { 
                opacity: 1, y: 0, pointerEvents: 'auto',
                duration: 0.8, stagger: 0.12, ease: "back.out(1.2)"
            }, 1.2);

            // Paper rustle sound on settle
            aboutTl.add(() => { if(isAudioInit) paperRustleSynth.triggerAttackRelease("2n"); }, 1.0);

// PHASE 2 — Blueprint begins & Camera tracks exact edge of the mapped line
            // Fade in the spotlight from its initial 60% visibility
            aboutTl.to('#cinematic-spotlight', { opacity: 1, duration: 2.0, ease: "power2.inOut" }, 2.0);

            // Blueprint line — fractions computed from actual path arc lengths (_nf[])
            // so the line tip lands exactly on each SVG node dot when the timeline reaches that time.
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[0]) * pathLen, duration: 2.4, ease: "sine.inOut" }, 2.5);  // → origin
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[1]) * pathLen, duration: 2.1, ease: "sine.inOut" }, 4.9);  // → U-turn / cutout
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[2]) * pathLen, duration: 1.2, ease: "sine.inOut" }, 7.0);  // → strategy
            // Slow approach to polaroid in two stages (pacing beat between strategy and polaroid)
            const _nf3mid = _nf[2] + (_nf[3] - _nf[2]) * 0.75;  // 75% of the way from strategy to polaroid
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf3mid) * pathLen, duration: 4.2, ease: "sine.inOut" }, 8.2);
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[3]) * pathLen,  duration: 2.7, ease: "sine.inOut" }, 12.4); // → polaroid
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[4]) * pathLen,  duration: 1.8, ease: "sine.inOut" }, 15.1); // → art-stats (186M)
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[5]) * pathLen,  duration: 2.5, ease: "sine.inOut" }, 16.9); // → art-terminal (philosophy)
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[6]) * pathLen,  duration: 1.7, ease: "sine.inOut" }, 19.4); // → stamp-blue area
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[7]) * pathLen,  duration: 1.4, ease: "sine.inOut" }, 21.1); // → stamp-yellow
            aboutTl.to('.map-line-path', { strokeDashoffset: (1-_nf[8]) * pathLen,  duration: 0.6, ease: "sine.inOut" }, 22.5); // → stamp-red
            aboutTl.to('.map-line-path', { strokeDashoffset: 0,                      duration: 1.4, ease: "sine.inOut" }, 23.1); // → end

            // Constant tight zoom for smooth documentary tracking
            const steadyZoom = window.innerWidth > 768 ? 1.65 : 1.40;
            const page2Zoom = window.innerWidth > 768 ? 1.80 : 1.50;
            
            // Smoothly push in to the steady zoom right as the blueprint begins
            aboutTl.to('#notebook-container', { scale: steadyZoom, duration: 2.5, ease: "power2.inOut" }, 1.5);
            
            // Slight close-up on the "it started as making things… strategy came later" paragraph
            const strategyZoom = window.innerWidth > 768 ? 1.74 : 1.48;
            aboutTl.to('#notebook-container', { scale: strategyZoom, duration: 2.3, ease: "sine.inOut" }, 4.9);

            // Push in even further for an intimate view when transitioning to the 2nd page
            aboutTl.to('#notebook-container', { scale: page2Zoom, duration: 3.5, ease: "power2.inOut" }, 11.0);

            // -------------------------------------------------------------------------
            // THE JOURNEY TIMELINE (Synchronized perfectly with the drawn line tip)
            // -------------------------------------------------------------------------

            // Intro Sticky Note ("I'm an open book") — spotlight arrives at T=1.0
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#intro-sticky-note'), duration: 1.0, ease: "sine.inOut" }, 1.0);
            // Bridge: spotlight glides from intro note → origin headline by T=2.5,
            // so the line-tip tracker picks up from the exact same position (no snap)
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#origin-headline'), duration: 0.8, ease: "sine.inOut" }, 2.0);

            // Node 0 — Origin headline.
            // Line draws T=2.5→4.9 (dur 2.4). Spotlight matches: same start, same duration.
            aboutTl.to(nodes[0], { opacity: 0.8, duration: 0.2 }, 4.9);
            aboutTl.add(() => {
                document.getElementById('sneaker-circle-path').classList.add('draw-active');
                if(isAudioInit) beepSynth.triggerAttackRelease("E5", "32n");
            }, 2.5);
            aboutTl.to('#notebook-container',  { rotationX: 10, rotationY: -4, duration: 2.4, ease: "sine.inOut" }, 2.5);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#origin-headline'),     duration: 2.4, ease: "sine.inOut" }, 2.5);

            // Node 1 — Personal Cutout.
            // Line draws T=4.9→7.0 (dur 2.1).
            aboutTl.to(nodes[1], { opacity: 0.8, duration: 0.2 }, 7.0);
            aboutTl.to('#notebook-container',  { rotationX: 8,  rotationY: -2, duration: 2.1, ease: "sine.inOut" }, 4.9);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#personal-cutout'),     duration: 2.1, ease: "sine.inOut" }, 4.9);

            // Node 2 — Strategy annotation.
            // Line draws T=7.0→8.2 (dur 1.2).
            aboutTl.to('#notebook-container',  { rotationX: 9,  rotationY: 0,  duration: 1.2, ease: "sine.inOut" }, 7.0);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#frag-strategy-annot'), duration: 1.2, ease: "sine.inOut" }, 7.0);
            aboutTl.to(nodes[2], { opacity: 0.8, duration: 0.2 }, 8.2);

            aboutTl.to('#notebook-container',  { rotationX: 8,  rotationY: 2,  duration: 4.2, ease: "sine.inOut" }, 8.2);

            // Node 3 — Art Polaroid.
            // Line draws T=8.2→15.1 (two segments, total 6.9s). Spotlight matches full journey.
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#art-polaroid'),        duration: 6.9, ease: "sine.inOut" }, 8.2);
            aboutTl.to(nodes[3], { opacity: 0.8, duration: 0.2 }, 15.1);
            if(isAudioInit) aboutTl.add(() => beepSynth.triggerAttackRelease("C5", "16n"), 12.4);
            aboutTl.to('#notebook-container',  { rotationX: 6,  rotationY: 4,  duration: 2.7, ease: "sine.inOut" }, 12.4);

            // Node 4 — Philosophy note (art-terminal). Spotlight visits philosophy first per user request.
            // Start early (T=13.5) so spotlight has 3.4s to travel the large page-1→page-2 gap
            // at the same gentle pace as the line. Arrives at T=16.9 when line reaches this node.
            aboutTl.to('#notebook-container',  { rotationX: 12, rotationY: 5,  duration: 3.4, ease: "sine.inOut" }, 13.5);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#art-terminal'),        duration: 3.4, ease: "sine.inOut" }, 13.5);
            aboutTl.to(nodes[4], { opacity: 0.8, duration: 0.2 }, 16.9);

            // Node 5 — 186M+ Stats (art-stats). Spotlight visits after philosophy.
            // Line draws T=16.9→19.4 (dur 2.5).
            aboutTl.to('#notebook-container',  { rotationX: 8,  rotationY: 2,  duration: 2.5, ease: "sine.inOut" }, 16.9);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#art-stats'),           duration: 2.5, ease: "sine.inOut" }, 16.9);
            aboutTl.to(nodes[5], { opacity: 0.8, duration: 0.2 }, 19.4);

            // Node 6 — Experience Typewriter.
            // Line draws T=19.4→21.1 (dur 1.7).
            aboutTl.to('#notebook-container',  { rotationX: 12, rotationY: 6,  duration: 1.7, ease: "sine.inOut" }, 19.4);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#experience-typewriter'),duration: 1.7, ease: "sine.inOut" }, 19.4);
            aboutTl.to(nodes[6], { opacity: 0.8, duration: 0.15 }, 21.1);
            aboutTl.fromTo('.evidence-stamp-blue', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 19.4);

            // Node 7 — Blue Stamp.
            // Line draws T=21.1→22.5 (dur 1.4).
            aboutTl.to('#notebook-container',  { rotationX: 12, rotationY: 6,  duration: 1.4, ease: "sine.inOut" }, 21.1);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('.evidence-stamp-blue'), duration: 1.4, ease: "sine.inOut" }, 21.1);
            aboutTl.to(nodes[7], { opacity: 0.8, duration: 0.15 }, 22.5);
            aboutTl.fromTo('.evidence-stamp-yellow', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 21.1);

            // Node 8 — Yellow Stamp.
            // Line draws T=22.5→23.1 (dur 0.6).
            aboutTl.to('#notebook-container',  { rotationX: 12, rotationY: 6,  duration: 0.6, ease: "sine.inOut" }, 22.5);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('.evidence-stamp-yellow'),duration: 0.6, ease: "sine.inOut" }, 22.5);
            aboutTl.to(nodes[8], { opacity: 0.8, duration: 0.15 }, 23.1);
            aboutTl.fromTo('.evidence-stamp-red', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 22.5);

            // Node 9 — Red Stamp.
            // Line draws T=23.1→24.5 (dur 1.4).
            aboutTl.to('#notebook-container',  { rotationX: 12, rotationY: 2,  duration: 1.4, ease: "sine.inOut" }, 23.1);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('.evidence-stamp-red'),  duration: 1.4, ease: "sine.inOut" }, 23.1);
            aboutTl.to(nodes[9], { opacity: 0.8, duration: 0.2 }, 24.5);

            // Node 10 — Torn signature / finale (T=24.5, after line completes).
            aboutTl.to(nodes[10], { opacity: 0.8, duration: 0.2 }, 24.5);
            aboutTl.to('#cinematic-spotlight', { ...spotTo('#torn-signature-paper'), duration: 2.5, ease: "sine.inOut" }, 24.5);
            // Fallback: force-reveal torn-signature at T=27 in case proximity detection misses it
            // at certain resolutions where both bottom elements clamp to the same y value.
            aboutTl.add(() => {
                const tgt = lensTargets.find(t => t.sel === '#torn-signature-paper');
                if (tgt && !tgt.wasActive) _triggerEntrance(tgt);
            }, 27.0);

            // -------------------------------------------------------------------------
            // PHASE 3: THE SUBMERGE & BLACKOUT (T = 26.0s)
            // -------------------------------------------------------------------------
            const tSubmerge = 29.0;

            // Hand off element opacity control to the dissolve tween — lens engine steps aside.
            // onStart: forward scroll crosses T=25 → deactivate lens.
            // onReverseComplete: user scrubs back past T=25 → reactivate lens.
            aboutTl.to({}, { duration: 0.01,
                onStart:          () => { lensActive = false; },
                onReverseComplete: () => { lensActive = true;  }
            }, tSubmerge);

            // Dissolve notebook and physical textures
            aboutTl.to('.realistic-paper-stack-right, #left-page-base, #intro-sticky-note, .draggable-sticker, .focus-lift-target, .active-blueprint-node, #system-grid-transient, .paper-texture, .ruled-paper-lines, #cinematic-spotlight', { 
                opacity: 0, 
                duration: 2.5, 
                ease: "power2.inOut" 
            }, tSubmerge);

            // Transition BG to deep matte charcoal/black (#050508)
            aboutTl.to('#about', {
                backgroundColor: "#000000",
                duration: 2.5,
                ease: "power2.inOut"
            }, tSubmerge);

            // Fade in void grain (3-4% opacity) for texture
            aboutTl.to('#void-grain', {
                opacity: 0.04,
                duration: 2.5,
                ease: "power2.inOut"
            }, tSubmerge);

            // The Line: loses shadow, changes to soft archival ink (beige)
            const tracePathEl = document.getElementById('blueprint-trace-path');
            aboutTl.to(tracePathEl, {
                stroke: "var(--beige)",
                opacity: 0.85,
                duration: 2.5,
                ease: "power2.inOut"
            }, tSubmerge);

            // Fade out the glow line entirely so we don't have duplicate lines during morph
            aboutTl.to('#blueprint-trace-path-glow', {
                opacity: 0,
                duration: 2.5,
                ease: "power2.inOut"
            }, tSubmerge);
            
            // Strip filter immediately at the start of submerge
            aboutTl.to({}, {
                duration: 0.1,
                onStart: () => document.getElementById('blueprint-trace-path')?.removeAttribute('filter'),
                onReverseComplete: () => document.getElementById('blueprint-trace-path')?.setAttribute('filter', 'url(#cinematic-glow)')
            }, tSubmerge);

            // The Camera: cinematically pulls back and pans to absolute center (0, 0)
            aboutTl.to('#notebook-container', {
                scale: window.innerWidth > 768 ? 1.0 : 0.8, // Centered framing scale
                xPercent: 0,
                yPercent: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                duration: 4.5, // Matches the easing and length of the morph
                ease: "power3.inOut"
            }, tSubmerge);

            // PHASE 4: THE SIGNATURE MORPH (T = 27.5s to 32.0s)
            // -------------------------------------------------------------------------
            const tMorph = 30.5;
            const sigPathEl = document.getElementById('signature-source-path');

            if (tracePathEl && sigPathEl) {
                // Uniform Point Sampling Engine (100% Geometry control - no CSS tangling)
                const numPoints = 200;
                const sourcePoints = [];
                const targetPoints = [];
                let isEngineInit = false;

                const initMorphEngine = () => {
                    if (isEngineInit) return;
                    const traceLen = tracePathEl.getTotalLength();
                    const sigLen = sigPathEl.getTotalLength();

                    for(let i=0; i<numPoints; i++) {
                        const tracePt = tracePathEl.getPointAtLength((i/(numPoints-1)) * traceLen);
                        sourcePoints.push({x: tracePt.x, y: tracePt.y});

                        const sigPt = sigPathEl.getPointAtLength((i/(numPoints-1)) * sigLen);
                        targetPoints.push({x: sigPt.x, y: sigPt.y});
                    }
                    isEngineInit = true;
                };

                const morphObj = { progress: 0 };
                let originalD = null;

                // Ensure strokeDasharray is removed so the whole line is visible during morph
                aboutTl.to(tracePathEl, { strokeDasharray: "none", strokeDashoffset: 0, duration: 0.1 }, tMorph - 0.1);

                aboutTl.to(morphObj, {
                    progress: 1,
                    duration: 4.5,
                    ease: "power3.inOut",
                    onStart: () => {
                        if (!originalD) originalD = tracePathEl.getAttribute('d');
                        initMorphEngine();
                    },
                    onUpdate: () => {
                        if (!isEngineInit) initMorphEngine();
                        if (!isEngineInit) return;
                        let d = "M ";
                        for(let i=0; i<numPoints; i++) {
                            const curX = sourcePoints[i].x + (targetPoints[i].x - sourcePoints[i].x) * morphObj.progress;
                            const curY = sourcePoints[i].y + (targetPoints[i].y - sourcePoints[i].y) * morphObj.progress;
                            d += `${curX},${curY} `;
                            if(i === 0) d += "L ";
                        }
                        tracePathEl.setAttribute('d', d);
                    },
                    onReverseComplete: () => {
                        // Atomically restore the original route path + dash state so the
                        // map-route shape never flashes while strokeDasharray is still "none"
                        if (originalD) tracePathEl.setAttribute('d', originalD);
                        gsap.set(tracePathEl, { strokeDasharray: pathLen, strokeDashoffset: 0 });
                    }
                }, tMorph);
            }

            // PHASE 5: THE EPILOGUE
            // -------------------------------------------------------------------------
            const tEpilogue = 34.5;
            aboutTl.to('#epilogue-quote', {
                opacity: 0.4,
                duration: 1.0,
                ease: "power2.out"
            }, tEpilogue);

            // Removed the cinematic hold to prevent the user from scrolling over empty space
        }

        // --- PHYSICAL STICKERS DRAGGABILITY ENGINE ---
        const stickersList = document.querySelectorAll('.draggable-sticker');
        if (stickersList.length > 0) {
            Draggable.create(stickersList, {
                bounds: "#about-sticky-wrap",
                type: "x,y",
                edgeResistance: 0.7,
                onPress: function() {
                    // Slight physical scaling when lifting the vinyl sticker
                    gsap.to(this.target, { 
                        scale: 1.15, 
                        zIndex: 200, 
                        filter: "drop-shadow(15px 25px 20px rgba(5,16,36,0.45))", 
                        duration: 0.2,
                        ease: "power2.out" 
                    });
                    if (isAudioInit) {
                        paperRustleSynth.triggerAttackRelease("8n");
                        hoverTickSynth.triggerAttackRelease("E5", "32n");
                    }
                },
                onRelease: function() {
                    // Soft settle drop spring back
                    gsap.to(this.target, { 
                        scale: 1.0, 
                        filter: "drop-shadow(4px 8px 12px rgba(5,16,36,0.3))", 
                        duration: 0.4, 
                        ease: "elastic.out(1, 0.45)" 
                    });
                    if (isAudioInit) {
                        paperRustleSynth.triggerAttackRelease("12n");
                    }
                }
            });
        }

        // --- TERMINAL TYPEWRITER ---
        const typeLines = [
            "> 5 PROBLEMS I WAS HANDED.",
            "> 5 TIMES IT WORKED.",
            "",
            "> ACTUAL WORK.",
            "> ACTUAL NUMBERS."
        ];
        const typeContainer = document.getElementById("terminal-typewriter");
        const awaiting = document.getElementById("terminal-awaiting");
        
        if (typeContainer) {
            let lineIdx = 0;
            let charIdx = 0;
            typeContainer.innerHTML = "";
            
            let isTyping = false;
            function typeNextChar() {
                if (isTyping) return;
                isTyping = true;
                if (lineIdx >= typeLines.length) {
                    if(awaiting) {
                        awaiting.classList.remove('hidden');
                        if (isAudioInit) clickSynth.triggerAttackRelease("C6", "32n", "+0", 0.3);
                    }
                    isTyping = false;
                    return;
                }

                let currentLineText = typeLines[lineIdx];
                if (charIdx === 0) {
                    let div = document.createElement("div");
                    if (currentLineText === "") {
                        div.innerHTML = "<br>";
                    }
                    typeContainer.appendChild(div);
                }

                if (currentLineText !== "") {
                    let divs = typeContainer.querySelectorAll("div");
                    let currentDiv = divs[divs.length - 1];
                    currentDiv.textContent += currentLineText.charAt(charIdx);
                    if (isAudioInit && charIdx % 2 === 0) {
                        hoverTickSynth.triggerAttackRelease("G5", "64n", "+0", 0.05);
                    }
                }

                charIdx++;
                if (charIdx >= currentLineText.length) {
                    charIdx = 0;
                    lineIdx++;
                    isTyping = false;
                    setTimeout(typeNextChar, currentLineText === "" ? 50 : 250);
                } else {
                    isTyping = false;
                    setTimeout(typeNextChar, 15); // Fast typing speed
                }
            }
            
            const terminalObserver = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    setTimeout(typeNextChar, 500); // slight delay before starting
                    terminalObserver.disconnect();
                }
            }, { threshold: 0.5 });
            
            terminalObserver.observe(typeContainer);
        }

        // --- DECRYPTION ENGINE ---
        const decryptElements = document.querySelectorAll('.decrypt-target');
        const decryptChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
        
        decryptElements.forEach(el => {
            if(!el.dataset.decrypt) return;
            el.dataset.original = el.dataset.decrypt;
            const trigger = el.closest('.blur-reveal-group') || el;
            
            trigger.addEventListener('mouseenter', () => {
                if(el.dataset.animating === "true") return;
                el.dataset.animating = "true";
                if(isAudioInit) decryptSynth.triggerAttackRelease("16n");
                
                let iterations = 0;
                clearInterval(el.interval);
                
                el.interval = setInterval(() => {
                    el.innerText = el.innerText.split("").map((letter, index) => {
                        if(index < iterations) {
                            return el.dataset.original[index] || "";
                        }
                        return decryptChars[Math.floor(Math.random() * decryptChars.length)];
                    }).join("");
                    
                    if(iterations >= el.dataset.original.length) {
                        clearInterval(el.interval);
                        el.innerText = el.dataset.original; 
                        el.dataset.animating = "false";
                    }
                    iterations += 1/2; 
                }, 30);
            });
            trigger.addEventListener('mouseleave', () => {
                clearInterval(el.interval);
                el.innerText = el.dataset.original;
                el.dataset.animating = 'false';
            });
        });

        // --- STACK TRACE LOGIC ---
        const stackArea = document.getElementById('stack-area');
        let stackOpenIdx = -1;

        function renderStack() {
            if(!stackArea) return;
            stackArea.innerHTML = '';
            
            const themes = [
                { bg: 'bg-[var(--blue)]', text: 'text-[var(--beige)]', border: 'border-[var(--navy)]', shadow: 'shadow-[14px_14px_0_rgba(5,16,36,0.95),_0_30px_60px_-10px_rgba(0,0,0,0.7),_inset_1px_1px_0_rgba(255,255,255,0.4)]', divider: 'bg-[var(--beige)]', dot: 'bg-[var(--beige)]' },
                { bg: 'bg-[var(--beige)]', text: 'text-[var(--navy)]', border: 'border-[var(--blue)]', shadow: 'shadow-[14px_14px_0_rgba(1,44,235,0.9),_0_30px_60px_-10px_rgba(0,0,0,0.3),_inset_1px_1px_0_rgba(255,255,255,0.8)]', divider: 'bg-[var(--blue)]', dot: 'bg-[var(--blue)]' },
                { bg: 'bg-[var(--navy)]', text: 'text-[var(--beige)]', border: 'border-[var(--blue)]', shadow: 'shadow-[14px_14px_0_rgba(1,44,235,0.7),_0_30px_60px_-10px_rgba(0,0,0,0.8),_inset_1px_1px_0_rgba(255,255,255,0.15)]', divider: 'bg-[var(--beige)]', dot: 'bg-[var(--beige)]' },
                { bg: 'bg-[var(--blue)]', text: 'text-[var(--beige)]', border: 'border-[var(--navy)]', shadow: 'shadow-[14px_14px_0_rgba(5,16,36,0.95),_0_30px_60px_-10px_rgba(0,0,0,0.7),_inset_1px_1px_0_rgba(255,255,255,0.4)]', divider: 'bg-[var(--beige)]', dot: 'bg-[var(--beige)]' },
                { bg: 'bg-[var(--beige)]', text: 'text-[var(--navy)]', border: 'border-[var(--blue)]', shadow: 'shadow-[14px_14px_0_rgba(1,44,235,0.9),_0_30px_60px_-10px_rgba(0,0,0,0.3),_inset_1px_1px_0_rgba(255,255,255,0.8)]', divider: 'bg-[var(--blue)]', dot: 'bg-[var(--blue)]' }
            ];

            stackData.forEach((c, i) => {
                const theme = themes[i % themes.length];
                const card = document.createElement('div');
                card.className = `stack-card absolute w-full left-0 border-[2px] md:border-[3px] px-5 py-4 md:px-8 md:py-6 cursor-pointer ${theme.bg} ${theme.text} ${theme.border} ${theme.shadow}`;
                const initialTilt = i % 2 === 0 ? -2.0 : 2.0;
                card.style.transformOrigin = 'center center';
                card.style.transform = `rotate(${initialTilt}deg)`;
                
                let pointsHtml = c.points.map(p => {
                    const styledP = p.replace(/<strong class="[^"]*">/g, '<strong class="font-bold underline decoration-[1.5px] underline-offset-4 tracking-wide text-[105%]">');
                    return `
                    <div class="flex gap-4 md:gap-5 items-start mb-5 md:mb-6">
                        <div class="w-[5px] h-[5px] rounded-none mt-2.5 flex-shrink-0 bg-current opacity-60"></div>
                        <div class="font-['DM_Sans'] text-[14px] md:text-[15px] font-[500] leading-[1.8] text-justify opacity-100 w-full pr-4 md:pr-8 text-current drop-shadow-sm">${styledP}</div>
                    </div>
                `}).join('');

                let statsHtml = c.stats.map(s => `
                    <div class="flex flex-col border-l-[2px] ${theme.border} pl-4 md:pl-5 mb-6">
                        <span class="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-wide leading-none mb-1 mt-0 drop-shadow-sm">${s.num}</span>
                        <span aria-hidden="true" class="font-['Schoolbell'] text-[10px] md:text-[11px] uppercase tracking-widest opacity-80 font-bold">${s.label}</span>
                    </div>
                `).join('');

                card.innerHTML = `
                    <!-- Dossier Background Elements -->
                    <div class="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

                    <div class="flex justify-between items-start w-full relative z-20 gap-4 mb-2 pr-2 md:pr-4">
                        <div class="flex flex-row items-baseline flex-wrap gap-x-4">
                            <div aria-hidden="true" class="font-['Bebas_Neue'] text-xl md:text-2xl uppercase tracking-wider opacity-90 shrink-0">
                                ${c.company}
                            </div>
                            ${c.desc ? `<div class="font-['DM_Sans'] text-[11px] md:text-[12px] normal-case tracking-normal opacity-70 leading-snug">${c.desc}</div>` : ''}
                        </div>
                        <div class="flex items-center gap-3 shrink-0 pointer-events-none">
                            <div class="w-8 md:w-12 h-3 md:h-4 bg-current opacity-80"></div>
                        </div>
                    </div>

                    <div class="w-full h-[1px] ${theme.divider} opacity-20 mb-3 mt-1 relative z-10"></div>

                    <div class="flex justify-between items-end w-full relative z-20 mb-4 pr-2 md:pr-4">
                        <div class="font-['Schoolbell'] text-5xl md:text-6xl leading-[1.1] text-current capitalize transform -rotate-[1deg]">${c.role}</div>
                        <div class="font-['DM_Sans'] text-[11px] md:text-[13px] font-bold uppercase tracking-normal opacity-60 mb-2 pl-2">// ${c.duration}</div>
                    </div>

                    <div class="card-expand mt-0 relative z-10">
                        <div class="w-full h-[1px] ${theme.divider} opacity-20 mt-2 mb-6 md:mb-8"></div>

                        <div class="flex flex-col md:flex-row gap-8 md:gap-12 w-full relative z-10">
                            <!-- Left Column: Points -->
                            <div class="flex flex-col flex-[2] md:w-[65%] pr-0 md:pr-4">
                                ${pointsHtml}
                                <div class="w-full flex justify-center mt-4 pb-2">
                                    <span aria-hidden="true" class="font-['Schoolbell'] text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-50 border-b border-current/30 pb-1 hover:opacity-100 transition-opacity">
                                        [ CLICK ANYWHERE TO CLOSE ]
                                    </span>
                                </div>
                            </div>

                            <!-- Right Column: Stats -->
                            <div class="flex flex-col flex-[1] md:w-[35%] pt-2 relative">
                                <div class="absolute bottom-4 right-0 font-['Schoolbell'] text-[40px] md:text-[50px] text-current opacity-[0.12] transform -rotate-[15deg] uppercase border-[4px] border-current px-4 py-1 leading-none pointer-events-none mix-blend-overlay font-bold z-0">Archived</div>
                                <div class="relative z-10">
                                    ${statsHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Dynamic GSAP hover state for physical dossier feel
                card.addEventListener('mouseenter', () => {
                    if (stackOpenIdx !== i) gsap.to(card, { y: -8, scale: 1.02, duration: 0.3, ease: "power2.out", overwrite: "auto" });
                });
                card.addEventListener('mousemove', (e) => {
                    if (stackOpenIdx === i) return;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width/2;
                    const y = e.clientY - rect.top - rect.height/2;
                    gsap.to(card, { rotationY: x * 0.05, rotationX: -y * 0.05, duration: 0.2, ease: "power1.out", overwrite: "auto" });
                });
                card.addEventListener('mouseleave', () => {
                    if (stackOpenIdx !== i) gsap.to(card, { y: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
                });

                card.addEventListener('click', () => { 
                    gsap.to(card, { y: 0, duration: 0.2, overwrite: "auto" }); // Reset hover state
                    stackOpenIdx = stackOpenIdx === i ? -1 : i; 
                    updateStack(false); 
                    if (typeof triggerExploration === 'function') triggerExploration(`stack_card_${i}`);
                });
                stackArea.appendChild(card);
            });
            updateStack(true);
        }

        function updateStack(immediate = false) {
            if(!stackArea) return;
            const _shortVP = window.innerWidth > 768 && window.innerHeight <= 800;
            const STACK_GAP = window.innerWidth > 768 ? (_shortVP ? 70 : 95) : 75;
            const els = stackArea.querySelectorAll('.stack-card');

            // Increased push amount to make room for the much larger typography
            const pushAmount = window.innerWidth > 768 ? 320 : 380;
            const collapsedCardBaseHeight = window.innerWidth > 768 ? (_shortVP ? 125 : 160) : 140;
            
            els.forEach((el, i) => {
                const tilt = i % 2 === 0 ? -2.0 : 2.0;
                const isOpen = stackOpenIdx === i;
                const pushDown = stackOpenIdx >= 0 && i > stackOpenIdx ? pushAmount : 0;
                
                const vars = {
                    top: (i * STACK_GAP + pushDown),
                    rotation: isOpen ? 0 : tilt,
                    scale: isOpen ? 1.02 : 1,
                    zIndex: i + 1,
                    overwrite: "auto"
                };

                if (immediate) {
                    gsap.set(el, vars);
                } else {
                    gsap.to(el, { ...vars, duration: 0.4, ease: "power3.out" });
                }
                
                const exp = el.querySelector('.card-expand');
                const icon = el.querySelector('.expand-icon');
                if(isOpen) {
                    exp.classList.add('open');
                    exp.style.marginTop = '20px';
                    if (icon) icon.innerText = 'COLLAPSE -';
                } else {
                    exp.classList.remove('open');
                    exp.style.marginTop = '0px';
                    if (icon) icon.innerText = 'EXPAND +';
                }
            });
            
            const totalH = ((stackData.length - 1) * STACK_GAP) + collapsedCardBaseHeight + (stackOpenIdx >= 0 ? pushAmount : 0);
            if (immediate) {
                gsap.set(stackArea, { height: totalH });
            } else {
                gsap.to(stackArea, { height: totalH, duration: 0.4, ease: "power3.out" });
            }

            // At short viewports (1366×768), animate the entire content wrapper
            // (header + cards) upward when a card is open — mirrors the natural
            // overflow-clipping effect that justify-center produces at 1710×968.
            const projContentWrap = stackArea.parentElement;
            if (projContentWrap) {
                const wrapY = (_shortVP && stackOpenIdx >= 0) ? -100 : 0;
                if (immediate) {
                    gsap.set(projContentWrap, { y: wrapY });
                } else {
                    gsap.to(projContentWrap, { y: wrapY, duration: 0.4, ease: "power3.out" });
                }
            }
            if (window.innerWidth >= 2500) {
                stackArea.querySelectorAll('.stack-card').forEach(card => {
                    card.style.setProperty('padding-top', '40px', 'important');
                    card.style.setProperty('padding-bottom', '40px', 'important');
                    card.style.setProperty('width', '100%', 'important');
                    card.style.setProperty('max-width', '1800px', 'important');
                    card.style.setProperty('margin-left', 'auto', 'important');
                    card.style.setProperty('margin-right', 'auto', 'important');

                    card.querySelectorAll('*').forEach(el => {
                        const classes = Array.from(el.classList);

                        // Role title — Schoolbell font, large text
                        if (classes.includes('text-5xl') || classes.includes('text-6xl') ||
                            classes.some(c => c === 'md:text-6xl')) {
                            el.style.setProperty('font-size', '80px', 'important');
                            el.style.setProperty('line-height', '1', 'important');
                        }

                        // Company name — Bebas Neue
                        if (classes.includes('text-xl') || classes.some(c => c === 'md:text-2xl')) {
                            el.style.setProperty('font-size', '32px', 'important');
                        }

                        // Small descriptor text
                        if (classes.some(c => c === 'text-[11px]' || c === 'md:text-[12px]' ||
                            c === 'text-[12px]' || c === 'md:text-[13px]' || c === 'text-[13px]')) {
                            el.style.setProperty('font-size', '18px', 'important');
                        }
                    });
                });

                // Also increase STACK_GAP effect by adjusting card tops
                const els2 = stackArea.querySelectorAll('.stack-card');
                els2.forEach((el, i) => {
                    const currentTop = parseFloat(el.style.top) || (i * 95);
                    gsap.set(el, { top: i * 140 });
                });
            }
        }

        renderStack();
        window.addEventListener('resize', () => { if(document.getElementById('stack-area')) updateStack(true); });

        // --- STACK CURSOR LABEL ---
        const stackCursorLabel = document.getElementById('stack-cursor-label');
        const galleryCursorLabel = document.getElementById('gallery-cursor-label');
        const dissectScrollLabel = document.getElementById('dissect-scroll-label');
        let stackLabelVisible = false;
        let galleryLabelVisible = false;
        let dissectLabelVisible = false;

        window.addEventListener('mousemove', (e) => {
            if (stackCursorLabel) {
                gsap.set(stackCursorLabel, { x: e.clientX + 18, y: e.clientY });
            }
            if (galleryCursorLabel) {
                gsap.set(galleryCursorLabel, { x: e.clientX + 18, y: e.clientY });
            }
            if (dissectScrollLabel) {
                gsap.set(dissectScrollLabel, { x: e.clientX + 18, y: e.clientY });
            }
        });

        const transitCsViewEl = document.getElementById('transit-case-study-view');
        if (transitCsViewEl && dissectScrollLabel) {
            transitCsViewEl.addEventListener('mouseenter', () => {
                dissectLabelVisible = true;
                dissectScrollLabel.classList.add('visible');
            });
            transitCsViewEl.addEventListener('mouseleave', () => {
                dissectLabelVisible = false;
                dissectScrollLabel.classList.remove('visible');
            });
        }

        const cursorTrailCanvas = document.getElementById('cursor-trail-canvas');
        if (cursorTrailCanvas) {
            cursorTrailCanvas.addEventListener('mouseenter', () => {
                if (!galleryLabelVisible) {
                    galleryLabelVisible = true;
                    galleryCursorLabel.classList.add('visible');
                }
            });
            cursorTrailCanvas.addEventListener('mouseleave', () => {
                galleryLabelVisible = false;
                galleryCursorLabel.classList.remove('visible');
            });
        }

        document.addEventListener('mouseover', (e) => {
            if (!stackCursorLabel) return;
            const card = e.target.closest('.stack-card');
            if (card && !stackLabelVisible) {
                stackLabelVisible = true;
                stackCursorLabel.classList.add('visible');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (!stackCursorLabel) return;
            const card = e.target.closest('.stack-card');
            if (card && !card.contains(e.relatedTarget)) {
                stackLabelVisible = false;
                stackCursorLabel.classList.remove('visible');
            }
        });

        // --- CLICK OUTSIDE CARDS TO CLOSE ---
        const experienceSection = document.getElementById('experience');
        if (experienceSection) {
            experienceSection.addEventListener('click', (e) => {
                if (stackOpenIdx !== -1 && !e.target.closest('.stack-card')) {
                    stackOpenIdx = -1;
                    updateStack(false);
                }
            });
        }

        // --- INTERACTIVE VENDING & 3D COVERFLOW LOGIC ---
        function buildFlow() {
          const N = {
            nc: { cx: 450, y: 40, w: 220, h: 44, t: 'start', lb: ['NEW CUSTOMER'] },
            reg: { cx: 450, y: 120, w: 240, h: 44, t: 'main', lb: ['Registration / Sign-up'] },
            welc: { cx: 450, y: 200, w: 560, h: 70, t: 'email', lb: ['T+0 (Immediate)', 'Welcome Email + Brand Story + Most Loved Products'], nt: 'Carousel of models wearing SINS drips & short tagline. Based on Gender & Age.' },
            left: { cx: 160, y: 340, w: 240, h: 46, t: 'branch', lb: ['Customer left the site'] },
            expl: { cx: 620, y: 340, w: 280, h: 46, t: 'main', lb: ['Explored Pages / Products'] },
            l_24: { cx: 160, y: 440, w: 280, h: 70, t: 'email', lb: ['T+24H', '"Someone in your city just bought X product"'], nt: 'Location-based trigger' },
            l_end: { cx: 160, y: 560, w: 280, h: 30, t: 'exit2', lb: ['→ Move to Old Customer sequence'] },
            noadd: { cx: 440, y: 440, w: 160, h: 46, t: 'branch', lb: ["Didn't add"] },
            cart: { cx: 820, y: 440, w: 180, h: 46, t: 'branch', lb: ['Added to Cart'] },
            b2h: { cx: 380, y: 560, w: 340, h: 90, t: 'email', lb: ['B + 2H', '"You forgot me, but I am still', 'thinking about you" + Moodboard'], nt: 'Moodboard: Ways to style with clothes they likely own' },
            b24h: { cx: 380, y: 720, w: 340, h: 70, t: 'email', lb: ['B + 24H', 'Hot selling/Vibe based creative', 'Free delivery for next 24H'], nt: 'Based on product browsed' },
            bend: { cx: 380, y: 840, w: 160, h: 40, t: 'exit', lb: ['Campaign Exits'] },
            cout: { cx: 680, y: 560, w: 180, h: 46, t: 'branch', lb: ['Checked Out'] },
            ncout: { cx: 960, y: 560, w: 220, h: 46, t: 'branch', lb: ["Didn't check out"] },
            d0: { cx: 680, y: 660, w: 280, h: 70, t: 'email', lb: ['D + 0', 'Elite taste validation + Receipt', '+ Tracking information'] },
            deliv: { cx: 680, y: 770, w: 140, h: 44, t: 'main', lb: ['Delivery'] },
            e48: { cx: 680, y: 860, w: 280, h: 70, t: 'email', lb: ['E + 48H', 'Fit Check + Feedback', '+ Instagram Story push'] },
            e20: { cx: 680, y: 970, w: 280, h: 60, t: 'email', lb: ['E + 20 Days', 'Product recommendation matching item'] },
            e25: { cx: 680, y: 1070, w: 280, h: 70, t: 'email', lb: ['E + 25 Days', '"10% Off + 50+20 Credits" combo', 'with a 12-hour countdown'] },
            eend: { cx: 680, y: 1180, w: 280, h: 30, t: 'exit2', lb: ['→ Move to Old Customer sequence'] },
            c1h: { cx: 980, y: 660, w: 320, h: 70, t: 'email', lb: ['C + 1H', '"I guess your crush texted you,', 'that\'s why you left me on seen"'] },
            c24: { cx: 980, y: 770, w: 320, h: 70, t: 'email', lb: ['C + 24H', '"10% Off + 50 Credits" combo', 'with a 12-hour countdown'] },
            c48: { cx: 980, y: 880, w: 320, h: 70, t: 'email', lb: ['C + 48H', '"Your bag is about to be stolen"', 'in next 2 hours.'] },
            ccout: { cx: 860, y: 1000, w: 160, h: 46, t: 'branch', lb: ['Checked out'] },
            ccout_n: { cx: 860, y: 1070, w: 260, h: 30, t: 'exit2', lb: ['→ Move to Checked out sequence'] },
            cnc: { cx: 1100, y: 1000, w: 200, h: 46, t: 'branch', lb: ["Didn't check out"] },
            cnc_end: { cx: 1100, y: 1080, w: 180, h: 40, t: 'exit', lb: ['Campaign Exits'] }
          };

          const E=[
            ['nc', 'reg'], ['reg', 'welc'], 
            ['welc', 'left'], ['welc', 'expl'],
            ['left', 'l_24'], ['l_24', 'l_end'],
            ['expl', 'noadd'], ['expl', 'cart'],
            ['noadd', 'b2h'], ['b2h', 'b24h'], ['b24h', 'bend'],
            ['cart', 'cout'], ['cart', 'ncout'],
            ['cout', 'd0'], ['d0', 'deliv'], ['deliv', 'e48'], ['e48', 'e20'], ['e20', 'e25'], ['e25', 'eend'],
            ['ncout', 'c1h'], ['c1h', 'c24'], ['c24', 'c48'],
            ['c48', 'ccout'], ['c48', 'cnc'],
            ['ccout', 'ccout_n'], ['cnc', 'cnc_end']
          ];

          const TC={
            start: {f:'var(--text-color)', s:'var(--text-color)', c:'var(--bg-color)', fw:'900', fs:'14'},
            main:  {f:'transparent', s:'var(--text-color)', c:'var(--text-color)', fw:'900', fs:'13'},
            email: {f:'var(--bg-color)', s:'var(--text-color)', c:'var(--text-color)', fw:'800', fs:'12'},
            branch:{f:'var(--text-color)', s:'var(--text-color)', c:'var(--bg-color)', fw:'900', fs:'13'},
            exit:  {f:'transparent', s:'var(--text-color)', c:'var(--text-color)', fw:'900', fs:'12', d:'8,4'},
            exit2: {f:'transparent', s:'transparent', c:'var(--text-color)', fw:'900', fs:'12'},
          };

          let eS='', nS='';

          for(const[a,b] of E){
            const na = N[a], nb = N[b];
            const x1 = na.cx, y1 = na.y + na.h, x2 = nb.cx, y2 = nb.y;
            const my = (y1 + y2) / 2;
            
            eS += `<path d="M${x1},${y1} L${x1},${my} L${x2},${my} L${x2},${y2}" fill="none" stroke="var(--text-color)" stroke-width="4" stroke-linejoin="round" marker-end="url(#fa)"/>`;
          }

          for(const[id,n] of Object.entries(N)){
            const c = TC[n.t];
            const lh = 18; 
            const lines = n.lb;
            const totalH = (lines.length - 1) * lh;
            const firstY = n.y + (n.h / 2) - (totalH / 2) + 5;

            const rx = n.cx - (n.w / 2);
            
            nS += `<rect x="${rx}" y="${n.y}" width="${n.w}" height="${n.h}" fill="${c.f}" stroke="${c.s}" stroke-width="4"${c.d ? ` stroke-dasharray="${c.d}"` : ''}/>`;
            
            nS += `<text text-anchor="middle" font-family="DM Sans, sans-serif" font-size="${c.fs}" font-weight="${c.fw}" fill="${c.c}">`;
            lines.forEach((l, i) => {
                nS += `<tspan x="${n.cx}" y="${firstY + i * lh}">${l}</tspan>`;
            });
            nS += `</text>`;
            
            if (n.nt) {
                nS += `<text x="${n.cx}" y="${n.y + n.h + 18}" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" font-weight="700" fill="var(--text-color)" opacity="0.6">${n.nt}</text>`;
            }
          }

          return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1250 1250" width="100%" height="auto" style="display:block; min-width:850px;">
            <defs>
              <marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 Z" fill="var(--text-color)"/>
              </marker>
            </defs>
            ${eS}${nS}
          </svg>`;
        }

        const cachedFlowSVG = buildFlow();

        const inventoryData = [
            { 
                id: 'Krishna Shukla', client: 'Krishna Shukla', tags: ['Identity Content', 'Comedy Business'], stat: '₹4.4L Revenue', bg: '#F4EFE6', text: '#051024', sysId: '01',
                customHTML: `
                <div class="brutal-wrap" style="--bg-color: #F4EFE6; --text-color: #051024;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Freelance · Brand & Business Manager</span>
                        <h1 class="brutal-title">KRISHNA SHUKLA</h1>
                        <div class="brutal-sub">Stand-up artist, Delhi · 130K+ Instagram followers</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">Content Strategy</span>
                            <span class="brutal-tag">Creator Economy</span>
                            <span class="brutal-tag">Touring Business</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text">
                        <span class="brutal-overline mb-3 block" style="font-size: 0.85rem; letter-spacing: 0.1em; opacity: 0.8;">THE PROBLEM</span>
                        186M views. Zero revenue infrastructure.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl md:text-3xl tracking-tight mt-2 inline-block mb-4">The attention existed. The business didn't.</span>
                        <div class="font-['Schoolbell'] text-xs uppercase tracking-widest opacity-80 space-y-1">
                            <div>— Trapped in a local echo chamber</div>
                            <div>— Passive viewers who rarely shared</div>
                            <div>— Limited to unscalable, ad-hoc college gigs</div>
                        </div>
                    </div>

                    <div class="brutal-grid-3 reveal-blur" style="transition-delay: 0.2s;">
                        <div class="brutal-grid-item">
                            <div class="brutal-num">01</div>
                            <div class="brutal-item-title text-xl">Identity based Content</div>
                            <div class="brutal-item-desc">Shifted to highly relatable, POV-driven identity content to acquire cold audiences aggressively.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">02</div>
                            <div class="brutal-item-title text-xl">Virality Engine</div>
                            <div class="brutal-item-desc">Achieved <strong class="text-[var(--text-color)] font-bold">3x Loop Rate</strong> & <strong class="text-[var(--text-color)] font-bold">1:3 Share-to-Like</strong> - turning viewers into distributors.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">03</div>
                            <div class="brutal-item-title text-xl">Touring IP</div>
                            <div class="brutal-item-desc">Operationalized <strong class="text-[var(--text-color)] font-bold">40+ shows</strong> across Delhi, Jaipur, Lucknow & Goa with repeatable logistics.</div>
                        </div>
                    </div>

                    <!-- Enhanced Editorial Phone Ecosystem Section -->
                    <div class="relative w-full mt-24 mb-32 py-16 flex flex-col items-center justify-center overflow-visible reveal-blur">
                        
                        <!-- Giant background text to kill negative space -->
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0 overflow-hidden mix-blend-color-burn">
                            <span class="font-['Bebas_Neue'] text-[35vw] text-[#051024] leading-none whitespace-nowrap tracking-tighter">ECOSYSTEM</span>
                        </div>

                        <!-- Central staging platform/grid for the phones -->
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[80%] h-[90%] border-2 border-[#051024]/10 bg-[rgba(5,16,36,0.015)] z-0 rounded-3xl overflow-hidden" style="background-image: radial-gradient(rgba(5,16,36,0.1) 1px, transparent 1px); background-size: 24px 24px;">
                            <!-- Accent crosshairs -->
                            <div class="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#051024]/30"></div>
                            <div class="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#051024]/30"></div>
                            <div class="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#051024]/30"></div>
                            <div class="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#051024]/30"></div>
                        </div>

                        <!-- Repositioned brutalist header -->
                        <div class="absolute -top-6 left-4 md:left-[10%] z-30 bg-[#F4EFE6] px-5 py-3 border-4 border-[#051024] shadow-[6px_6px_0_#051024] transform -rotate-2 hover:rotate-0 transition-transform">
                            <div aria-hidden="true" class="font-['Schoolbell'] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#051024]">Visual Evidence // Platform Ecosystem</div>
                        </div>

                        <!-- Left Context Sticker & Arrow -->
                        <div class="hidden xl:flex absolute left-[6%] top-[30%] flex-col items-start z-30 transform -rotate-3">
                            <div aria-hidden="true" class="bg-[#051024] text-[#F4EFE6] font-['Schoolbell'] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-[#051024] shadow-[4px_4px_0_rgba(0,0,0,0.2)]">Data Node 01</div>
                            <div class="font-['Bebas_Neue'] text-7xl text-[#051024] leading-[0.8] mt-4 tracking-tight drop-shadow-sm">186.3M</div>
                            <div class="font-['DM_Sans'] text-xs font-bold text-[#051024]/60 uppercase tracking-widest mt-2">Total Views Generated</div>
                            <!-- Hand drawn arrow pointing to center screen -->
                            <svg class="w-20 h-20 text-[#FF3333] mt-2 opacity-80 rotate-[15deg] transform translate-x-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 12H2"/><path d="M14 20l8-8-8-8"/></svg>
                        </div>

                        <!-- Right Context Handwritten Note -->
                        <div class="hidden xl:block absolute right-[5%] bottom-[25%] font-['Gloria_Hallelujah'] text-[20px] text-[#051024] rotate-3 z-30 leading-[1.3]">
                            <svg class="absolute -left-16 -top-2 w-16 h-16 text-[#051024] -rotate-[160deg] opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 12H2"/><path d="M14 20l8-8-8-8"/></svg>
                            <span class="bg-yellow-200/60 mix-blend-multiply px-2 py-1">Engagement shifted.</span><br>
                            Followers went from <br>passive to active distributors.
                        </div>

                        <!-- Interactive Phone Scene -->
                        <div class="mockup-scene !m-0 z-20 w-full max-w-[1000px]">
                            <div class="mockup-phone mockup-left">
                                <img loading="lazy" src="./ksm3.png" alt="Reach Analytics" class="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(5,16,36,0.35)]" />
                            </div>
                            <div class="mockup-phone mockup-center z-30">
                                <img loading="lazy" src="./ksm1.png" alt="Dashboard Analytics" class="w-full h-auto object-contain filter drop-shadow-[0_30px_60px_rgba(5,16,36,0.45)]" />
                            </div>
                            <div class="mockup-phone mockup-right">
                                <img loading="lazy" src="./ksm2.png" alt="Profile View" class="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(5,16,36,0.35)]" />
                            </div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-12 w-max reveal-text">Impact Verification // Metrics</div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[3rem] my-16 reveal-blur" style="transition-delay: 0.4s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">100K+</div>
                            <div class="brutal-stat-sub">Followers</div>
                            <div class="brutal-stat-label">115% Growth in 3 Months</div>
                        </div>
                        <div class="brutal-stat-card relative">
                            <!-- Arrow pointing down (B -> E) -->
                            <div class="absolute hidden md:block" style="right: 15%; top: calc(100% - 15px); height: calc(3rem + 30px); width: 10px; background-color: #FF3333; opacity: 1; z-index: 50;">
                                <div aria-hidden="true" class="absolute top-1/2 left-6 -translate-y-1/2 whitespace-nowrap text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-white bg-[#FF3333] px-3 py-1.5 border-2 border-[#111] shadow-[4px_4px_0_#111]">Reinforces Loop</div>
                                <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-r-[16px] border-t-[22px] border-transparent" style="border-top-color: #FF3333;"></div>
                            </div>
                            <div class="brutal-stat-big">46%</div>
                            <div class="brutal-stat-sub">Engagement Rate</div>
                            <div class="brutal-stat-label">30% More Than Industry Avg</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">₹4L+</div>
                            <div class="brutal-stat-sub">Standup Revenue</div>
                            <div class="brutal-stat-label">₹40K+ Worth Brand Partnerships</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">186M+</div>
                            <div class="brutal-stat-sub">Views</div>
                            <div class="brutal-stat-label">54M+ Accounts Reached</div>
                        </div>
                        <div class="brutal-stat-card relative">
                            <!-- Arrow pointing up (E -> B) -->
                            <div class="absolute hidden md:block" style="left: 15%; bottom: calc(100% - 15px); height: calc(3rem + 30px); width: 10px; background-color: #FF3333; opacity: 1; z-index: 50;">
                                <div aria-hidden="true" class="absolute top-1/2 right-6 -translate-y-1/2 whitespace-nowrap text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-white bg-[#FF3333] px-3 py-1.5 border-2 border-[#111] shadow-[4px_4px_0_#111]">Causes High Engagement</div>
                                <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[22px] border-transparent" style="border-bottom-color: #FF3333;"></div>
                            </div>
                            <div class="brutal-stat-big">3X</div>
                            <div class="brutal-stat-sub">Loop Rate</div>
                            <div class="brutal-stat-label">1:3 Shares to Likes Ratio</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">40+</div>
                            <div class="brutal-stat-sub">Shows Pan-India</div>
                            <div class="brutal-stat-label">Jaipur, Kanpur, Lucknow, Gurugram</div>
                        </div>
                    </div>
                </div>`
            },
            { 
                id: 'RNTL.', client: 'RNTL.', tags: ['Trust Engineering', 'Paid Social'], stat: '4.6X Lift', bg: '#8A9ED8', text: '#051024', sysId: '02', logo: 'rntllogo.svg', logoClass: 'mix-blend-multiply',
                customHTML: `
                <div class="brutal-wrap" style="--bg-color: #8A9ED8; --text-color: #051024;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Founding Marketer · Core Team</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">RNTL.</h1>
                            <img loading="lazy" src="./rntllogo.svg" class="h-[clamp(40px,8vw,90px)] w-auto object-contain shrink-0 mix-blend-multiply" alt="RNTL." />
                        </div>
                        <div class="brutal-sub">Fashion rental marketplace for Gen-Z</div>
                        <div class="brutal-tags mb-8">
                            <span class="brutal-tag">Meta Ads</span>
                            <span class="brutal-tag">Consumer Psychology</span>
                            <span class="brutal-tag">Brand Launch</span>
                        </div>

                    </div>

                    <div class="brutal-split reveal-blur" style="transition-delay: 0.1s;">
                        <div class="brutal-split-left">
                            <div class="brutal-split-title">Consumer Fear</div>
                            <div class="brutal-split-body mb-4 uppercase">"Why rent when I can own?"</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm leading-relaxed uppercase mt-auto border-t-4 border-current pt-4">Renting felt like a sunk cost. No social proof, no category trust, zero brand history. The "is this brand real?" question came before any purchase intent.</div>
                        </div>
                        <div class="brutal-split-right">
                            <div class="brutal-split-title">Our Answer</div>
                            <div class="brutal-split-body mb-4 uppercase">Borrowed equity. Sell the lifestyle, not the product.</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm leading-relaxed uppercase mt-auto border-t-4 border-current pt-4">Made credible people endorse renting as a lifestyle - removing the trust deficit before it was even asked.</div>
                        </div>
                    </div>


                    <div class="mt-24 mb-16 flex flex-col items-center justify-center reveal-blur" style="transition-delay: 0.3s;">
                        <img loading="lazy" src="./rntlspotlightseries.png" alt="RNTL Spotlight Series" class="w-full max-w-4xl h-auto object-contain filter drop-shadow-[8px_8px_0_rgba(0,0,0,0.8)] mix-blend-color-burn" />
                        <div class="brutal-overline !mt-6 text-center tracking-widest text-lg md:text-xl">5 Industry Voices • 2M+ Combined Network</div>
                    </div>
                    
                    <div class="relative w-full max-w-4xl mx-auto mt-32 mb-40 reveal-blur" style="transition-delay: 0.4s;">
                        <!-- Top Left Annotation (Points to Card 1) -->
                        <div class="hidden lg:flex absolute -top-24 left-0 w-48 flex-col items-center gap-1 z-40 transform -translate-x-8">
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Positioned RNTL as a legitimate industry player from Day 1.</p>
                            <svg class="w-8 h-10 text-[#051024] mt-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 C 8 12, 16 22, 12 30" /><path d="M6 24 L 12 30 L 18 24" /></svg>
                        </div>
                        
                        <!-- Top Right Annotation (Points to Card 5) -->
                        <div class="hidden lg:flex absolute -top-24 right-0 w-48 flex-col items-center gap-1 z-40 transform translate-x-8">
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Defined flow & interaction convo for narrative consistency.</p>
                            <svg class="w-8 h-10 text-[#051024] mt-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 C 16 12, 8 22, 12 30" /><path d="M6 24 L 12 30 L 18 24" /></svg>
                        </div>

                        <!-- Bottom Left Annotation (Points to Card 2) -->
                        <div class="hidden lg:flex absolute -bottom-28 left-[20%] w-56 flex-col items-center gap-1 z-40 transform -translate-x-4">
                            <svg class="w-8 h-10 text-[#051024] mb-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 30 C 8 20, 16 10, 12 2" /><path d="M6 8 L 12 2 L 18 8" /></svg>
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Removed consumer fear of "is this brand trustable?" via borrowed equity.</p>
                        </div>

                        <!-- Bottom Right Annotation (Points to Card 4) -->
                        <div class="hidden lg:flex absolute -bottom-28 right-[20%] w-56 flex-col items-center gap-1 z-40 transform translate-x-4">
                            <svg class="w-8 h-10 text-[#051024] mb-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 30 C 16 20, 8 10, 12 2" /><path d="M6 8 L 12 2 L 18 8" /></svg>
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Planned Q&A and SKU integration to endorse renting.</p>
                        </div>

                        <!-- Interactive Circle on the right (from screenshot) -->
                        <div class="hidden lg:flex absolute -right-[15%] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[1.5px] border-[#6a5e3e] items-center justify-center opacity-80 pointer-events-none">
                            <div class="w-2 h-2 rounded-full bg-[#6a5e3e]"></div>
                        </div>

                        <div class="flex flex-col md:flex-row w-full h-[600px] md:h-[450px] gap-2 md:gap-3 overflow-hidden group/accordion relative z-20 px-4 md:px-0">
                            <!-- EP 1 -->
                            <a href="https://instagram.com/reel/DPQl2kmE-qq/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="./ep1.jpg" alt="Episode 1" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Nikita Luther</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">95K+ • Winner – Traitors</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 1</div>
                                </div>
                            </a>
                            <!-- EP 2 -->
                            <a href="https://instagram.com/reel/DPatQBiEzfe/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="./ep2.jpg" alt="Episode 2" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Harpriya Bains</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">215K+ • Stand-up Comedian</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 2</div>
                                </div>
                            </a>
                            <!-- EP 3 -->
                            <a href="https://instagram.com/reel/DPflCywE3rh/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="./ep3.jpg" alt="Episode 3" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Anya Singh</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">496K+ • Actress, Stree 2</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 3</div>
                                </div>
                            </a>
                            <!-- EP 4 -->
                            <a href="https://instagram.com/reel/DP3Td-Nk63U/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="./ep4.jpg" alt="Episode 4" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Ranjit Bajaj</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">1.1M+ • Owner, Minerva FC</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 4</div>
                                </div>
                            </a>
                            <!-- EP 5 -->
                            <a href="https://instagram.com/reel/DRY7Y8rkzaH/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="./ep5.jpg" alt="Episode 5" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Rajat Barmecha</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">87K+ • Actor, Udaan</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 5</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text" style="transition-delay: 0.3s;">
                        Meta Pilot Run - Catalog + Personality Led Brand Launch Ad Campaign. <br/>
                        <span class="font-[400] text-xl">Executed a micro-budget pilot to validate acquisition channels for Gen Z fashion rentals. Identified "Social Proof" as the core trust lever, achieving a 4.6x Efficiency Lift by pivoting from only catalog ads to +personality-led Reels.</span>
                    </div>

                    <div class="mt-12 mb-20 reveal-blur" style="transition-delay: 0.4s;">
                        <span aria-hidden="true" class="brutal-overline mb-4 block text-[10px]">Platforms Stack</span>
                        <img loading="lazy" src="./metachart.png" alt="Platforms" class="w-[560px] max-w-full md:w-[800px] h-auto object-contain mix-blend-color-burn opacity-90 filter drop-shadow-sm" />
                    </div>

                    <div class="brutal-stats-grid reveal-blur" style="transition-delay: 0.4s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">35+%</div>
                            <div class="brutal-stat-sub">Hook Rate</div>
                            <div class="brutal-stat-label">Industry Benchmark: 20-25%</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">₹18.4</div>
                            <div class="brutal-stat-sub">Cost per Messaging Conversation</div>
                            <div class="brutal-stat-label">@4k Impressions</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big"><₹0.9</div>
                            <div class="brutal-stat-sub">Cost Per Click (CPC)</div>
                            <div class="brutal-stat-label">25-50% Less than Industry Avg</div>
                        </div>
                    </div>

                    <!-- Award-winning Overlapping Comparison Block -->
                    <!-- Full-bleed Formula Section to kill negative space -->
                    <div class="relative w-full mt-32 mb-40 py-16 md:py-24 flex flex-col items-center justify-center overflow-visible reveal-blur">
                        
                        <!-- Dynamic Background Band breaking out of standard padding -->
                        <div class="absolute inset-x-[-10vw] top-1/2 -translate-y-1/2 h-[80%] md:h-[95%] bg-[#051024] shadow-[inset_0_20px_60px_rgba(0,0,0,0.8)] transform -skew-y-3 border-y-[8px] border-[#F4EFE6] overflow-hidden flex items-center z-0">
                            <!-- Infinite Ticker text -->
                            <div class="whitespace-nowrap flex font-['Bebas_Neue'] text-[150px] md:text-[250px] text-[#F4EFE6]/5 uppercase tracking-tighter leading-none select-none" style="animation: ticker 40s linear infinite;">
                                THE WINNING FORMULA // THE WINNING FORMULA // THE WINNING FORMULA // THE WINNING FORMULA // THE WINNING FORMULA // 
                            </div>
                        </div>

                        <div class="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-[1200px] mx-auto px-4 md:px-0 gap-16 md:gap-0">
                            
                            <!-- Catalog Grid (Left) -->
                            <div class="w-[95%] md:w-[52%] z-10 transform md:rotate-[-5deg] md:-translate-y-16 hover:!rotate-[-1deg] hover:!z-50 transition-all duration-500 hover:scale-[1.04] shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative group">
                                <!-- Realistic Tape -->
                                <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 border border-white/20 transform -rotate-[4deg] shadow-sm z-30 mix-blend-overlay" style="backdrop-filter: blur(3px);"></div>
                                <!-- Badge -->
                                <div class="bg-[#F4EFE6] text-[#051024] font-bold uppercase text-[11px] md:text-[14px] px-5 py-2.5 absolute -left-4 md:-left-8 top-12 border-4 border-[#051024] shadow-[6px_6px_0_#051024] z-20 whitespace-nowrap -rotate-3 group-hover:rotate-0 transition-transform">
                                    Catalog Ad Set <span class="font-normal opacity-60 ml-2">Phase 01</span>
                                </div>
                                <img loading="lazy" src="./catalog_grid.jpg" alt="Catalog Grid" class="w-full border-4 md:border-8 border-[#051024] filter saturate-[0.85] contrast-[1.05]" />
                            </div>

                            <!-- Center Connector / + Sign -->
                            <div class="hidden md:flex z-40 flex-col items-center justify-center transform hover:scale-110 pointer-events-none transition-transform duration-300 md:-mx-16 lg:-mx-20 mt-16 shadow-2xl rounded-full">
                                <div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F4EFE6] border-[6px] border-[#051024] shadow-[8px_8px_0_#051024] flex items-center justify-center text-[#051024] text-6xl md:text-8xl font-black relative overflow-hidden">
                                    <div class="absolute inset-2 rounded-full border-[3px] border-dashed border-[#051024]/40 animate-[spin_12s_linear_infinite]"></div>
                                    <span class="relative z-10 drop-shadow-md">+</span>
                                </div>
                            </div>
                            
                            <!-- Personality Grid (Right) -->
                            <div class="w-[95%] md:w-[52%] z-20 transform md:rotate-[5deg] md:translate-y-20 hover:!rotate-[1deg] hover:!z-50 transition-all duration-500 hover:scale-[1.04] shadow-[0_35px_70px_rgba(0,0,0,0.8)] relative group">
                                <!-- Realistic Tape -->
                                <div class="absolute -top-4 right-16 w-20 h-8 bg-white/40 border border-white/20 transform rotate-[6deg] shadow-sm z-30 mix-blend-overlay" style="backdrop-filter: blur(3px);"></div>
                                <!-- Badge -->
                                <div class="bg-[#051024] text-[#F4EFE6] font-bold uppercase text-[11px] md:text-[14px] px-5 py-2.5 absolute -right-4 md:-right-8 bottom-12 border-4 border-[#051024] shadow-[6px_6px_0_#F4EFE6] z-20 whitespace-nowrap rotate-3 group-hover:rotate-0 transition-transform">
                                    Personality-Led <span class="font-normal opacity-60 ml-2">Phase 02</span>
                                </div>
                                <a href="https://linkedin.com/posts/bajkamalsingh_marketing-strategy-consumerbehaviour-activity-7419962873264734208-qPWS" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] block group/link">
                                    <img loading="lazy" src="./personality_grid.jpg" alt="Personality Grid" class="w-full border-4 md:border-8 border-[#051024] filter saturate-[1.1] contrast-[1.1]" />
                                    <div class="absolute inset-0 bg-[#051024]/60 opacity-0 group-hover/link:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none z-40 border-4 border-transparent backdrop-blur-[3px]">
                                        <span class="bg-[#F4EFE6] text-[#051024] text-[12px] md:text-[16px] font-black uppercase tracking-widest px-8 py-4 shadow-[8px_8px_0_#051024] transform scale-90 group-hover/link:scale-100 transition-transform duration-400 ease-out">Dissect on LinkedIn ↗</span>
                                    </div>
                                </a>
                            </div>
                            
                        </div>
                        
                        <!-- Handwritten Annotation floating outside -->
                        <div class="absolute bottom-8 left-[10%] hidden xl:block font-['Gloria_Hallelujah'] font-medium text-[20px] text-[#F4EFE6] -rotate-6 z-30 opacity-90 drop-shadow-lg pointer-events-none leading-[1.3]">
                            Social proof scaled the conversion.
                            <svg class="absolute -top-8 right-[-50px] w-16 h-16 text-[#F4EFE6] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                        </div>
                    </div>

                    <!-- Expanded Brutalist Ad Breakup Analysis -->
                    <div class="relative w-full mt-24 mb-10 reveal-blur flex flex-col items-center">
                        <!-- Giant background text to kill negative space -->
                        <div class="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.05] z-0 mix-blend-color-burn">
                            <span class="font-['Bebas_Neue'] text-[35vw] text-[#051024] leading-none whitespace-nowrap">TEARDOWN</span>
                        </div>

                        <div class="relative w-full max-w-[1200px] z-10 px-4 md:px-0">
                            <!-- Brutalist Header overlapping the frame -->
                            <div class="absolute -top-10 md:-top-16 left-2 md:left-12 z-30 bg-[#F4EFE6] border-4 border-[#051024] p-4 md:p-6 shadow-[8px_8px_0_#051024] transform -rotate-3 transition-transform hover:rotate-0 duration-300">
                                <div aria-hidden="true" class="font-['Schoolbell'] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#051024]/70 mb-2 border-b-2 border-[#051024]/20 pb-2">Phase 03 // Deep Dive</div>
                                <h3 class="font-['Bebas_Neue'] text-4xl md:text-6xl text-[#051024] leading-[0.85] tracking-wide">AD BREAKUP <br/>ANALYSIS</h3>
                            </div>

                            <!-- Main Image Frame -->
                            <div class="w-full bg-[#051024] p-3 md:p-8 pt-20 md:pt-28 border-4 border-[#051024] shadow-[16px_16px_0_rgba(5,16,36,0.4)] group/frame relative transition-all duration-500 hover:shadow-[24px_24px_0_rgba(5,16,36,0.5)] hover:-translate-y-2">
                                
                                <!-- Top Right Context -->
                                <div aria-hidden="true" class="absolute top-4 right-4 md:top-8 md:right-8 text-[#F4EFE6]/60 font-['Schoolbell'] text-[9px] md:text-xs uppercase tracking-widest text-right max-w-[200px] md:max-w-[300px]">
                                    Detailed teardown of the winning creative asset structure.
                                </div>
                                
                                <a href="https://linkedin.com/posts/bajkamalsingh_marketing-strategy-consumerbehaviour-activity-7419962873264734208-qPWS" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] block relative border-2 border-[#333] overflow-hidden bg-[#F4EFE6]">
                                    <!-- The Image -->
                                    <img loading="lazy" src="./ad_breakup.jpg" alt="Ad Breakup" class="w-full object-cover filter saturate-[0.95] contrast-[1.05] transition-transform duration-700 group-hover/frame:scale-[1.03]" />
                                    
                                    <!-- Dynamic Hover State -->
                                    <div class="absolute inset-0 bg-[#051024]/70 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none z-40 backdrop-blur-[3px]">
                                        <div class="bg-[#F4EFE6] border-4 border-[#051024] text-[#051024] flex flex-col items-center p-6 md:p-10 shadow-[12px_12px_0_#051024] transform scale-90 group-hover/frame:scale-100 transition-transform duration-400 ease-out">
                                            <span class="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest leading-none mb-1 text-center">DISSECT ON LINKEDIN</span>
                                            <span aria-hidden="true" class="font-['Schoolbell'] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-3 bg-[#051024] text-[#F4EFE6] px-4 py-2 border border-[#051024] shadow-[4px_4px_0_#F4EFE6]">↗ Open Full Teardown</span>
                                        </div>
                                    </div>
                                </a>
                                
                                <!-- Bottom Decorative Bar -->
                                <div aria-hidden="true" class="mt-4 md:mt-6 flex justify-between items-center border-t border-[#F4EFE6]/10 pt-4 font-['Schoolbell'] text-[9px] md:text-[10px] text-[#F4EFE6]/50 uppercase tracking-widest">
                                    <span>Fig. 1 — Creative Anatomy</span>
                                    <span class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#8DE254] shadow-[0_0_8px_#8DE254] animate-pulse"></div> Verified Strategy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            { 
                id: 'Sins Crew', client: 'Sinskari', tags: ['Email Funnel', 'D2C Strategy'], stat: '25+ Carts Recovered', bg: '#012CEB', text: '#F4EFE6', sysId: '03', logo: 'sinskarilogo.svg', logoClass: 'invert brightness-0',
                customHTML: `
                <div class="brutal-wrap" style="--bg-color: #012CEB; --text-color: #F4EFE6;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Strategy Intern · 4 Weeks</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">SINS CREW</h1>
                            <img loading="lazy" src="./sinskarilogo.svg" class="h-[clamp(40px,8vw,90px)] w-auto object-contain shrink-0 invert brightness-0" alt="Sinskari" />
                        </div>
                        <div class="brutal-sub">Sinskari - Growing D2C streetwear brand for Gen-Z India</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">Email Automation</span>
                            <span class="brutal-tag">CX Journey</span>
                            <span class="brutal-tag">Retention</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text" style="transition-delay: 0.1s;">
                        No behavioral triggers. No segment logic. No recovery sequences.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl tracking-tight">Revenue was bleeding through abandoned carts daily - with zero infrastructure to catch it.</span>
                    </div>

                    <div class="brutal-overline w-max mt-8 reveal-text" style="transition-delay: 0.2s;">Automated Email Funnel Architecture - Designed from scratch</div>
                    <div class="brutal-flow-container reveal-blur" style="transition-delay: 0.3s;">
                        ${cachedFlowSVG}
                    </div>

                    <div class="brutal-overline mt-12 w-max reveal-text" style="transition-delay: 0.4s;">Impact Validation</div>

                    <div class="brutal-stats-grid reveal-blur" style="transition-delay: 0.5s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">25+</div>
                            <div class="brutal-stat-sub">Carts Recovered</div>
                            <div class="brutal-stat-label">Direct Revenue Save</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">10%</div>
                            <div class="brutal-stat-sub">Conversion Boost</div>
                            <div class="brutal-stat-label">Site-wide Lift</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">15%</div>
                            <div class="brutal-stat-sub">Traffic Increase</div>
                            <div class="brutal-stat-label">Return Sessions</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">10%</div>
                            <div class="brutal-stat-sub">Drop-off Reduced</div>
                            <div class="brutal-stat-label">Funnel Optimization</div>
                        </div>
                    </div>
                </div>`
            },
            { 
                id: 'Histrionica', client: 'Dramsoc SRCC', tags: ['Brand Growth', 'Sponsorships'], stat: '₹55L+ Secured', bg: '#111111', text: '#F4EFE6', sysId: '04', logo: 'dramlogo.svg', logoClass: '',
                customHTML: `
                <div class="brutal-wrap" style="--bg-color: #111111; --text-color: #F4EFE6;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Vice President · The Dramatics Society, SRCC</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">HISTRIONICA</h1>
                            <img loading="lazy" src="./dramlogo.svg" class="h-[clamp(80px,14vw,140px)] w-auto object-contain shrink-0" alt="Dramsoc" />
                        </div>
                        <div class="brutal-sub">DU's most-followed college society · Tier-1 flagship annual festival</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">Sponsorships</span>
                            <span class="brutal-tag">Performance Mktg</span>
                            <span class="brutal-tag">Creative Direction</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text">
                        One of DU's oldest societies had no systematic growth engine.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl md:text-3xl tracking-tight">Sponsorships were ad-hoc. Digital presence minimal. No playbook for brand partnerships or content at scale.</span>
                    </div>

                    <div class="brutal-stats-grid mt-12 reveal-blur" style="transition-delay: 0.1s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">₹55L+</div>
                            <div class="brutal-stat-label">Sponsorship Value Secured</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">33M+</div>
                            <div class="brutal-stat-label">Total Campaign Reach</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">234%</div>
                            <div class="brutal-stat-label">Year over Year Growth</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">12K+</div>
                            <div class="brutal-stat-label">Total Event Footfall</div>
                        </div>
                    </div>

                    <div class="brutal-grid-2 reveal-blur" style="transition-delay: 0.2s;">
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Sponsorship Strategy</div>
                            <div class="brutal-item-desc">Swiggy, Rapido, McDonald's, Redtape, Zebronics. Negotiated & closed ₹55L+ in brand deals. Managed 30+ sponsors for JFL.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Performance Marketing</div>
                            <div class="brutal-item-desc">2.2M+ reach in under 3 days. 837K incremental boost. 96.4% ↑ in unique visitors. 283K interactions via adspend.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Creative Direction</div>
                            <div class="brutal-item-desc">A/B tested across 6+ locations. All visual assets directed to create FOMO and drive engagement at scale.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Social Growth</div>
                            <div class="brutal-item-desc">Most-followed college club, DU. Grew to 10K+ followers in 6 months. 270%+ engagement boost via data-driven optimization.</div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Executive Roles // Breakout</div>
                    
                    <div class="brutal-grid-3 reveal-blur" style="transition-delay: 0.3s; border-top: none;">
                        <div class="brutal-grid-item" style="border-top: 8px solid var(--text-color);">
                            <div class="brutal-item-title text-xl">Growth Strategy</div>
                            <div class="brutal-item-desc">Grew Account to 10K+ Followers (6 months): Achieved most-followed college club status in Delhi University.</div>
                        </div>
                        <div class="brutal-grid-item" style="border-top: 8px solid var(--text-color);">
                            <div class="brutal-item-title text-xl">Social Media Mgmt</div>
                            <div class="brutal-item-desc">Conceptualised, designed and executed campaigns for celebrity events, sponsored collaborations, and high-engagement content.</div>
                        </div>
                        <div class="brutal-grid-item" style="border-top: 8px solid var(--text-color);">
                            <div class="brutal-item-title text-xl">Creative Direction</div>
                            <div class="brutal-item-desc">Led Creative Direction for all visual assets (static, reels) to drive buzz, create FOMO and leverage emerging trends.</div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 mb-8 text-center text-[#F4EFE6] opacity-50">Visual Archives // Static Campaigns</div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto mb-16 px-4 reveal-blur" style="transition-delay: 0.3s;">
                        <!-- Asset 1: Audition Workshop -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[var(--blue)] hover:shadow-[12px_12px_0_var(--blue)] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform rotate-2 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds1" loading="lazy" src="./tds1.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Tier 1 Post</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">Audition Workshop</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Asset 2: MostlySane -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[#e53935] hover:shadow-[12px_12px_0_#e53935] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform -rotate-2 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds2" loading="lazy" src="./tds2.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Creator Collab</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">MostlySane</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Asset 3: Open Mic -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[#f9ce34] hover:shadow-[12px_12px_0_#f9ce34] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform rotate-1 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds3" loading="lazy" src="./tds3.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Flagship Event</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">The Grand Open Mic</div>
                                </div>
                            </div>
                        </div>

                        <!-- Asset 4: Judges -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[#8e24aa] hover:shadow-[12px_12px_0_#8e24aa] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform -rotate-1 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds4" loading="lazy" src="./tds4.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Panel Reveal</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">Judges Panel</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-24 w-max mx-auto text-[#F4EFE6] opacity-50 reveal-text">Video Campaigns // Archive</div>

                    <!-- Award-Winning Hover Reveal List -->
                    <div class="w-full max-w-5xl mx-auto flex flex-col mt-8 md:mt-12 mb-24 reveal-blur relative z-20 border-t border-[#333]" style="transition-delay: 0.4s;">
                        
                        <!-- Reel 1 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">01</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Event Pre-Buzz</h3>
                            </div>
                            
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        28.2K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr1" loading="lazy" src="./tdsr1.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>

                            <!-- Desktop Hover Image -->
                            <div class="absolute left-[45%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:-rotate-6 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr1" loading="lazy" src="./tdsr1.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 2 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">02</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Freshers' Welcome</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        25.4K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr2" loading="lazy" src="./tdsr2.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[55%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:rotate-3 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr2" loading="lazy" src="./tdsr2.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 3 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">03</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">30-Year Legacy</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        30.4K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr3" loading="lazy" src="./tdsr3.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[50%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:-rotate-2 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr3" loading="lazy" src="./tdsr3.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 4 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">04</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Celebrity Collab</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        30.2K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr4" loading="lazy" src="./tdsr4.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[60%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:rotate-6 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr4" loading="lazy" src="./tdsr4.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 5 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">05</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Viral Sketch</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-[#f9ce34] md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2 drop-shadow-[0_0_8px_rgba(249,206,52,0.4)]">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        471K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr5" loading="lazy" src="./tdsr5.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[40%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:-rotate-4 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr5" loading="lazy" src="./tdsr5.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 6 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">06</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Artist Reveal</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-[#f9ce34] md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2 drop-shadow-[0_0_8px_rgba(249,206,52,0.4)]">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        451K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr6" loading="lazy" src="./tdsr6.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[50%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:rotate-2 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr6" loading="lazy" src="./tdsr6.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>`
            },
            { 
                id: 'Signal', client: 'Jio Hotstar', tags: ['GTM Strategy', 'Campus Marketing'], stat: '7L+ Impressions', bg: '#D8E0E8', text: '#012CEB', sysId: '05', logo: 'hotstarlogo.svg', logoClass: 'mix-blend-multiply',
                customHTML: `
                <div class="brutal-wrap" style="--bg-color: #D8E0E8; --text-color: #012CEB;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Marketing & GTM Strategy Lead</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">SIGNAL</h1>
                            <img loading="lazy" src="./hotstarlogo.svg" class="h-[clamp(40px,8vw,90px)] w-auto object-contain shrink-0 mix-blend-multiply" alt="Hotstar" />
                        </div>
                        <div class="brutal-sub">Jio Hotstar show launch · 5–7 college campuses · 30,000+ Gen-Z target</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">GTM</span>
                            <span class="brutal-tag">Campus Activation</span>
                            <span class="brutal-tag">Influencer Network</span>
                            <span class="brutal-tag">OTT</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text">
                        Gen-Z doesn't show up for ads. They show up for culture.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl md:text-3xl tracking-tight">The challenge: make a streaming show launch feel like a campus moment - and then convert it.</span>
                    </div>

                    <div class="brutal-overline mt-12 w-max reveal-text">GTM Execution Phases</div>

                    <div class="brutal-grid-2 reveal-blur" style="transition-delay: 0.1s;">
                        <div class="brutal-grid-item">
                            <div class="brutal-num">01</div>
                            <div class="brutal-item-title">Audience Architecture</div>
                            <div class="brutal-item-desc">Tiered segmentation across 5–7 campuses with hyper-personalized messaging at each touchpoint. (30,000+ students reached).</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">02</div>
                            <div class="brutal-item-title">Micro-Influencer Network</div>
                            <div class="brutal-item-desc">Built and scaled 25–40 campus influencers to unlock organic reach and compress cost-per-reach vs paid channels. (45,000+ organic reach).</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">03</div>
                            <div class="brutal-item-title">Celebrity Amplification</div>
                            <div class="brutal-item-desc">Orchestrated campaigns featuring Abhishek Malhan & Khushboo Patani to spike live engagement and drive cultural credibility.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">04</div>
                            <div class="brutal-item-title">UGC Conversion Engine</div>
                            <div class="brutal-item-desc">Converted on-ground attendees into content distributors - turning footfall into organic amplification. (8,000+ peer-to-peer shares).</div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Visual Evidence // Live Activation</div>
                    <div class="brutal-contact-sheet reveal-blur" style="transition-delay: 0.3s;">
                        <div class="brutal-img-wrap" style="min-height: 350px;">
                            <div class="brutal-img-meta">ARCHIVE 01 // STAGE</div>
                            <img loading="lazy" src="./hs6.PNG" alt="Stage Moment" />
                        </div>
                        <div class="brutal-img-wrap" style="min-height: 350px;">
                            <div class="brutal-img-meta">ARCHIVE 02 // PANEL</div>
                            <img loading="lazy" src="./hs3.PNG" alt="Panel Discussion" />
                        </div>
                        <div class="brutal-img-wrap" style="min-height: 350px;">
                            <div class="brutal-img-meta">ARCHIVE 03 // CROWD</div>
                            <img loading="lazy" src="./hs5.PNG" alt="Crowd Engagement" />
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Digital & Physical Scale</div>
                    <div class="brutal-split mt-4 reveal-blur" style="transition-delay: 0.4s;">
                        <div class="brutal-split-left">
                            <div class="brutal-split-title">Pre-Buzz Artifacts</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm mb-6 uppercase">Distributed via Micro-influencer network to 45,000+ students.</div>
                            <div class="brutal-img-wrap mb-6" style="min-height: 120px;">
                                <div class="brutal-img-meta">BANNER // A</div>
                                <img loading="lazy" src="./hs1.jpg" alt="Campaign Banner A" />
                            </div>
                            <div class="brutal-img-wrap" style="min-height: 120px;">
                                <div class="brutal-img-meta">BANNER // B</div>
                                <img loading="lazy" src="./hs2.jpg" alt="Campaign Banner B" />
                            </div>
                        </div>
                        <div class="brutal-split-right" style="background: transparent; color: var(--text-color);">
                            <div class="brutal-split-title">On-Ground Translation</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm mb-6 uppercase">Turning digital hype into physical presence.</div>
                            <div class="brutal-img-wrap h-full" style="min-height: 250px;">
                                <div class="brutal-img-meta">EVIDENCE // SCREENING</div>
                                <img loading="lazy" src="./hs4.PNG" alt="Screening Event" />
                            </div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Campaign Impact</div>

                    <div class="brutal-stats-grid reveal-blur" style="transition-delay: 0.5s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">7L+</div>
                            <div class="brutal-stat-label">Impressions in 72hrs</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">15%</div>
                            <div class="brutal-stat-label">Conversion Rate Peak</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">40K+</div>
                            <div class="brutal-stat-label">Total Engagements</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">1.3K+</div>
                            <div class="brutal-stat-label">Attendees Converted</div>
                        </div>
                    </div>
                </div>`
            }
        ];
        
        // --- 4. CAREER TRANSIT SYSTEM LOGIC ---
        // Dynamically add summaries and properties to the inventoryData array to avoid touching existing customHTML
        if (inventoryData[0]) { inventoryData[0].summary = "Engineered creator growth systems capturing massive reach & brand revenue."; inventoryData[0].points = ["Created relatable POV content to acquire cold audiences", "Turned passive viewers into active distributors with 3x Loop Rate", "Operationalized & scaled a 40+ show touring business"]; inventoryData[0].name = "Krishna Shukla"; inventoryData[0].metrics = ["186M+", "₹4.4L", "32X"]; inventoryData[0].metricLabels = ["REACH", "REVENUE", "ROI"]; inventoryData[0].keyword = "Growth"; }
        if (inventoryData[1]) { inventoryData[1].summary = "Validated acquisition channels for Gen Z sustainable fashion rentals."; inventoryData[1].points = ["Used borrowed equity to remove consumer trust deficit", "Positioned brand as a legitimate player from Day 1", "Made credible industry voices endorse renting as a lifestyle"]; inventoryData[1].name = "Rntl."; inventoryData[1].metrics = ["ACQ", "500+", "4X"]; inventoryData[1].metricLabels = ["FOCUS", "BETA USERS", "GROWTH"]; inventoryData[1].keyword = "Acquisition"; }
        if (inventoryData[2]) { inventoryData[2].summary = "Architected automated email flows to dramatically lift retention."; inventoryData[2].points = ["Built automated email funnel architecture from scratch", "Plugged revenue bleeding from daily abandoned carts", "Recovered 25+ carts & boosted conversion by 10%"]; inventoryData[2].name = "Sinkari"; inventoryData[2].metrics = ["10%", "90%", "30D"]; inventoryData[2].metricLabels = ["REV LIFT", "RETENTION", "WINDOW"]; inventoryData[2].keyword = "Retention"; }
        if (inventoryData[3]) { inventoryData[3].summary = "Secured brand sponsorships and scaled digital presence for flagship fest."; inventoryData[3].points = ["Closed ₹55L+ in brand sponsorships with 30+ brands", "Grew Instagram to 10K+ followers as DU's #1 club", "Generated 33M+ total campaign reach for flagship events"]; inventoryData[3].name = "Dramsoc"; inventoryData[3].metrics = ["₹55L+", "40K", "72H"]; inventoryData[3].metricLabels = ["SPONSORSHIP", "FOOTFALL", "DURATION"]; inventoryData[3].keyword = "Scale"; }
        if (inventoryData[4]) { inventoryData[4].summary = "Orchestrated hyper-localized campus launch generating massive organic reach."; inventoryData[4].points = ["Turned a streaming show launch into an organic campus moment", "Scaled 25-40 micro-influencers to reach 30,000+ students", "Converted event footfall into 8,000+ organic peer-to-peer shares"]; inventoryData[4].name = "Jio Hotstar"; inventoryData[4].metrics = ["7L+", "15%", "40K+"]; inventoryData[4].metricLabels = ["IMPRESSIONS", "CONVERSION", "SIGNUPS"]; inventoryData[4].keyword = "Launch"; }

        const transitWorld = document.getElementById('transit-world');
        const transitStationsContainer = document.getElementById('transit-stations-container');
        const transitMapView = document.getElementById('transit-map-view');
        const transitCsView = document.getElementById('transit-case-study-view');
        const transitCsContent = document.getElementById('transit-cs-content');
        const backToTransitBtn = document.getElementById('back-to-transit-btn');
        const progressText = document.getElementById('transit-progress-text');
        
        let exploredTransit = new Set();
        
        const dmrcStations = ["NORTH CAMPUS", "GTB NAGAR", "VISHWAVIDYALAYA", "KASHMERE GATE", "RAJIV CHOWK", "RNTL TERMINAL"];
        
        const transitStations = [
            { 
                isOrigin: true, 
                name: "NORTH CAMPUS", 
                stationName: dmrcStations[0], 
                stat: "Origin", 
                summary: "INSTRUCTION MANUAL",
                points: [
                    `<svg class="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg> SWIPE L/R`,
                    `<svg class="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg> STEP OUT`,
                    `<svg class="w-3 h-3 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> MIND GAP`
                ],
                metricLabels: ["SYSTEM", "MODE", "STATUS"],
                metrics: ["ACTIVE", "MANUAL", "READY"],
                keyword: "Terminal"
            },
            ...inventoryData.map((d, i) => ({ ...d, stationName: dmrcStations[i+1] || `STATION ${i+2}` }))
        ];

        let activeStationIdx = 0;

        const dummyStationsList = ["VISHWAVIDYALAYA", "GTB NAGAR", "KASHMERE GATE", "RAJIV CHOWK", "MANDI HOUSE"];

        function buildRouteMap() {
            const container = document.getElementById('fixed-route-nodes');
            if (!container) return;
            
            let html = '';
            const totalNodes = transitStations.length + dummyStationsList.length; // 6 + 5 = 11
            
            for(let i = 0; i < totalNodes; i++) {
                const isMajor = (i % 2 === 0);
                const majorIndex = isMajor ? i / 2 : -1;
                const dummyIndex = isMajor ? -1 : (i - 1) / 2;
                
                const left = (i / (totalNodes - 1)) * 100;
                
                if (isMajor) {
                    let name = majorIndex === 0 ? "ORIGIN" : (inventoryData[majorIndex-1].name || `PROJECT ${majorIndex}`).toUpperCase();
                    if (name.includes(' ')) name = name.replace(' ', '<br/>');
                    html += `
                        <div class="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-20 fixed-route-node route-major" data-idx="${majorIndex}" style="left: ${left}%; top: 50%;">
                            <!-- Station Node -->
                            <div class="route-dot w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-[5px] border-[#0A0A1A] bg-white transition-all duration-500 relative z-10"></div>
                            <!-- Blue Tilted Label -->
                            <div aria-hidden="true" class="absolute bottom-full mb-[-4px] md:mb-0 bg-[#0F35FF] px-2 py-[3px] transform rotate-[-58deg] origin-bottom-left left-[50%] ml-[11px] md:ml-[15px] transition-all duration-500 opacity-60 node-label text-center font-['Lilita_One'] text-white text-[11px] md:text-[13px] uppercase" style="line-height: 1.04; letter-spacing: -0.02em;">${name}</div>
                        </div>
                    `;
                } else {
                    let name = dummyStationsList[dummyIndex];
                    if (name === "VISHWAVIDYALAYA") name = "VISHWA-<br/>VIDYALAYA";
                    else if (name.includes(' ')) name = name.replace(' ', '<br/>');
                    html += `
                        <div class="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-10 fixed-route-node route-dummy" style="left: ${left}%; top: 50%;">
                            <!-- Node -->
                            <div class="route-dot w-4 h-4 md:w-5 md:h-5 rounded-full border-[3px] md:border-[5px] border-[#0A0A1A] bg-white transition-all duration-500 relative z-10"></div>
                            <!-- Text Below -->
                            <div aria-hidden="true" class="absolute top-full mt-[-4px] md:mt-0 font-['Lilita_One'] text-[#0A0A1A] text-[11px] md:text-[13px] opacity-80 node-label text-center transform rotate-[-58deg] origin-top-right right-[50%] mr-[11px] md:mr-[15px] uppercase" style="line-height: 1.04; letter-spacing: -0.02em;">
                                ${name}
                            </div>
                        </div>
                    `;
                }
            }
            container.innerHTML = html;
        }

        function updateRouteMapUI(index) {
            const totalNodes = transitStations.length + dummyStationsList.length; // 11
            const targetNodeIndex = index * 2; // e.g. index=0 -> 0, index=1 -> 2
            
            const targetPercentage = (targetNodeIndex / (totalNodes - 1)) * 100;
            const progressLine = document.getElementById('fixed-progress-line');
            if(progressLine) progressLine.style.width = targetPercentage + "%";

            const nodes = document.querySelectorAll('.fixed-route-node');
            nodes.forEach((nodeEl, idx) => {
                const dot = nodeEl.querySelector('.route-dot');
                const label = nodeEl.querySelector('.node-label');
                const isMajor = nodeEl.classList.contains('route-major');
                
                if (idx <= targetNodeIndex) {
                    dot.style.backgroundColor = '#0F35FF';
                    dot.style.borderColor = '#0A0A1A';
                    
                    if (isMajor) {
                        label.style.opacity = '1';
                        // Active node gets a larger dot
                        if (idx === targetNodeIndex) {
                            dot.style.transform = 'scale(1)';
                        } else {
                            dot.style.transform = 'scale(1)';
                        }
                    } else {
                        // Completed dummy
                        dot.style.transform = 'scale(1)';
                    }
                } else {
                    dot.style.backgroundColor = 'white';
                    dot.style.borderColor = '#0A0A1A';
                    dot.style.transform = 'scale(1)';
                    if (isMajor) {
                        label.style.opacity = '0.4';
                    }
                }
            });
        }

        function buildTransitSystem() {
            if (!transitStationsContainer) return;
            let html = '';

            transitStations.forEach((st, i) => {
                const projectName = st.name || st.stat;
                const summary = st.summary;
                const stat = st.stat;
                const keyword = st.keyword || "System";
                
                const clickHandler = i === 0 ? '' : `onclick="stepOutToCaseStudy(event, ${i - 1})"`;

                html += `
                    <div class="relative h-full w-[100vw] flex-shrink-0 flex flex-col items-center justify-end pb-[185px] md:pb-[280px] z-[40]" data-index="${i}">
                        
                        <!-- Oversized Faded Background Keyword -->
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Schoolbell'] text-[35vw] md:text-[25vw] leading-none text-[#0B0B0B] opacity-[0.03] whitespace-nowrap z-0 pointer-events-none tracking-tighter mix-blend-multiply">
                            ${keyword}
                        </div>

                        <!-- THE MOUNTED BILLBOARD ASSEMBLY -->
                        <div class="relative flex flex-col items-center w-[95%] md:w-[1035px] max-w-[95%] z-[50] group mb-2 md:mb-4 -translate-y-[25px]">
                            
                            <!-- Delhi Metro LED Display Board -->
                            <div class="w-[90%] md:w-[700px] h-[30px] md:h-[40px] bg-[#0A0A0A] border-[3px] border-[#222] border-b-0 rounded-t-[8px] z-[55] flex items-center justify-center overflow-hidden px-4 shadow-[inset_0_4px_15px_rgba(0,0,0,1)] relative self-end mr-[2%] md:mr-[5%]">
                                <!-- Subtle reflection on LED glass -->
                                <div class="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                                <div class="text-[#FFB000] font-['DM_Mono'] text-[9px] md:text-[13px] font-bold tracking-widest uppercase w-full text-center whitespace-nowrap" style="text-shadow: 0 0 8px rgba(255,176,0,0.9);">
                                    ${i === 0 ? `WELCOME TO DELHI METRO • NEXT STATION: ${transitStations[1].stationName}` : `कृपया दरवाजों से दूर रहें • NEXT STATION: ${transitStations[i+1] ? transitStations[i+1].stationName : 'TERMINUS'}`}
                                </div>
                            </div>
                            
                            <!-- Heavy Industrial Support Columns -->
                            <div class="absolute -bottom-[180px] md:-bottom-[280px] left-[15%] w-[24px] md:w-[32px] h-[250px] md:h-[350px] bg-[#111] border-r-[4px] border-[#222] shadow-[inset_4px_0_8px_rgba(0,0,0,0.5)] z-[45]">
                                <div class="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDhsOC04bTAtNEwtNCA4IiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-20"></div>
                            </div>
                            <div class="absolute -bottom-[180px] md:-bottom-[280px] right-[15%] w-[24px] md:w-[32px] h-[250px] md:h-[350px] bg-[#111] border-l-[4px] border-[#222] shadow-[inset_-4px_0_8px_rgba(0,0,0,0.5)] z-[45]">
                                <div class="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDhsOC04bTAtNEwtNCA4IiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-20"></div>
                            </div>
                            
                            <!-- Heavy Mounting Brackets -->
                            <div class="absolute bottom-[20%] left-[15%] w-[40px] md:w-[50px] h-[20px] bg-[#080808] -translate-x-1/2 rounded-sm z-[46] border-[2px] border-[#222]"></div>
                            <div class="absolute bottom-[20%] right-[15%] w-[40px] md:w-[50px] h-[20px] bg-[#080808] translate-x-1/2 rounded-sm z-[46] border-[2px] border-[#222]"></div>
                            <div class="absolute top-[30%] left-[15%] w-[40px] md:w-[50px] h-[20px] bg-[#080808] -translate-x-1/2 rounded-sm z-[46] border-[2px] border-[#222]"></div>
                            <div class="absolute top-[30%] right-[15%] w-[40px] md:w-[50px] h-[20px] bg-[#080808] translate-x-1/2 rounded-sm z-[46] border-[2px] border-[#222]"></div>

                            <!-- Billboard Frame (Flatter, Cinematic Proportions) -->
                            <div class="w-full h-[220px] md:h-[240px] bg-[#0B0B0B] border-[6px] md:border-[8px] border-[#0B0B0B] flex flex-col md:flex-row items-stretch shadow-[16px_16px_0_rgba(11,11,11,0.2)] transition-transform duration-500 relative z-[50]">
                                
                                <!-- Left Panel (Dynamic Background) -->
                                <div class="w-full md:w-[45%] flex flex-col justify-center items-center border-b-[6px] md:border-b-0 md:border-r-[6px] md:border-r-[8px] border-[#0B0B0B] relative overflow-hidden py-4 md:py-6" style="background: radial-gradient(circle at 50% 50%, ${st.bg || '#0F35FF'} 0%, #050505 140%);">
                                    
                                    <!-- CRT Scanline Overlay -->
                                    <div class="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-overlay z-[5]" style="background-image: repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.9) 2px, rgba(0,0,0,0.9) 4px); background-size: 100% 4px;"></div>
                                    <!-- Print Noise Overlay -->
                                    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-60 mix-blend-overlay pointer-events-none z-[6]"></div>
                                    
                                    <!-- Massive Handwritten Project Name -->
                                    <h3 class="font-['Schoolbell'] text-[70px] md:text-[90px] leading-[0.8] relative z-10 billboard-float text-center transform -rotate-2" style="color: ${st.text || '#FFFFFF'}; text-shadow: 4px 4px 0px #0B0B0B, 6px 6px 0px rgba(0,0,0,0.3);">${projectName}</h3>
                                </div>

                                <!-- Right Panel (Solid Black) -->
                                <div class="w-full md:w-[55%] flex flex-col justify-between bg-[#0B0B0B] text-white p-4 md:p-6 relative h-full overflow-hidden group/panel">
                                    <!-- Subtle Grid Background -->
                                    <div class="absolute inset-0 pointer-events-none opacity-20 z-0" style="background-image: linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px); background-size: 20px 20px;"></div>
                                    
                                    <!-- Glitch Accents -->
                                    <div class="absolute top-3 right-3 w-[4px] h-[18px] bg-[#0F35FF] shadow-[2px_2px_0_rgba(255,42,42,0.9),-2px_-2px_0_rgba(255,176,0,0.9)] opacity-80 group-hover/panel:opacity-100 group-hover/panel:translate-x-[2px] transition-all duration-75 z-10"></div>
                                    <div class="absolute bottom-3 right-3 w-[24px] h-[4px] bg-[#FF2A2A] shadow-[2px_-2px_0_rgba(15,53,255,0.9)] opacity-80 group-hover/panel:opacity-100 group-hover/panel:-translate-y-[2px] transition-all duration-75 z-10"></div>
                                    
                                    <!-- Top: Campaign Description & Key Points -->
                                    <div class="flex flex-col gap-2 relative z-10">
                                        <p class="font-['Open_Sauce_One'] font-bold text-[13px] md:text-[15px] leading-[1.4] text-[#F4EFE6] w-[95%] uppercase tracking-[-0.02em]">
                                            ${summary}
                                        </p>
                                        ${i === 0 ? `
                                        <div class="flex gap-2 flex-wrap mt-2">
                                            ${st.points ? st.points.map(p => `<span aria-hidden="true" class="flex items-center px-2 py-1 bg-[#1A1A1A] text-[#F4EFE6] font-['DM_Mono'] text-[9px] md:text-[10px] font-bold tracking-widest uppercase border border-[#333] hover:border-[#0F35FF] transition-colors shadow-[2px_2px_0_#000]">${p}</span>`).join('') : ''}
                                        </div>
                                        ` : `
                                        <ul class="flex flex-col gap-1.5 mt-2 ml-1">
                                            ${st.points ? st.points.map(p => `<li aria-hidden="true" class="flex items-start gap-2"><svg class="w-3 h-3 text-[#FF2A2A] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg><span class="text-[#D1D1D1] font-['Open_Sauce_One'] text-[10px] md:text-[12px] font-medium leading-snug tracking-tight">${p}</span></li>`).join('') : ''}
                                        </ul>
                                        `}
                                        ${i === 0 ? `
                                        <div class="mt-3 flex flex-col gap-2.5 border-t border-[#333] pt-2.5">
                                            <div class="flex items-center gap-3">
                                                <div class="w-6 h-6 md:w-7 md:h-7 rounded-sm bg-[#D4A017] flex items-center justify-center text-[#0B0B0B] shrink-0 border-[2px] border-white/20">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                                </div>
                                                <div class="flex flex-col">
                                                    <div aria-hidden="true" class="font-['DM_Mono'] text-[#D4A017] text-[9px] md:text-[10px] font-black tracking-widest uppercase mb-0.5">Navigate</div>
                                                    <div aria-hidden="true" class="font-['Inter'] text-[#A0A0A0] text-[9px] md:text-[10px] font-medium leading-tight">Arrow keys to browse projects.</div>
                                                </div>
                                            </div>

                                            <div class="flex items-center gap-3">
                                                <div class="w-6 h-6 md:w-7 md:h-7 rounded-sm bg-[#0F35FF] flex items-center justify-center text-white shrink-0 border-[2px] border-white/20">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                                                </div>
                                                <div class="flex flex-col">
                                                    <div aria-hidden="true" class="font-['Inter'] text-white text-[10px] md:text-[11px] font-black tracking-widest uppercase mb-0.5">Step Out</div>
                                                    <div aria-hidden="true" class="font-['Inter'] text-white/55 text-[10px] md:text-[11px] font-medium leading-tight">Yellow button → deep-dive the project.</div>
                                                </div>
                                            </div>
                                        </div>
                                        ` : ''}
                                    </div>

                                    <!-- Bottom: Oversized Impact Metrics -->
                                    ${i !== 0 ? `
                                    <div class="flex justify-between items-end w-full border-t border-white/40 pt-3 mt-auto">
                                        <div class="flex flex-col">
                                            <span aria-hidden="true" class="font-['Open_Sauce_One'] font-bold text-white text-[9px] md:text-[11px] tracking-widest uppercase mb-1">${st.metricLabels ? st.metricLabels[0] : 'METRIC 1'}</span>
                                            <div class="font-['Bebas_Neue'] text-[35px] md:text-[50px] leading-[0.8] tracking-tight text-white">${st.metrics ? st.metrics[0] : stat}</div>
                                        </div>
                                        <div class="flex flex-col">
                                            <span aria-hidden="true" class="font-['Open_Sauce_One'] font-bold text-white text-[9px] md:text-[11px] tracking-widest uppercase mb-1">${st.metricLabels ? st.metricLabels[1] : 'METRIC 2'}</span>
                                            <div class="font-['Bebas_Neue'] text-[35px] md:text-[50px] leading-[0.8] tracking-tight text-white">${st.metrics ? st.metrics[1] : '80%'}</div>
                                        </div>
                                        <div class="flex flex-col text-right">
                                            <span aria-hidden="true" class="font-['Open_Sauce_One'] font-bold text-white text-[9px] md:text-[11px] tracking-widest uppercase mb-1">${st.metricLabels ? st.metricLabels[2] : 'METRIC 3'}</span>
                                            <div class="font-['Bebas_Neue'] text-[35px] md:text-[50px] leading-[0.8] tracking-tight text-white">${st.metrics ? st.metrics[2] : '24H'}</div>
                                        </div>
                                    </div>
                                    ` : ''}
                                </div>
                                
                                <!-- Top Left Aligned Step Out Button -->
                                ${i !== 0 ? `
                                <button id="step-out-btn-${i}" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F35FF] step-out-btn attention-pulse absolute -top-5 md:-top-7 -left-4 md:-left-8 bg-[#D4A017] hover:bg-[#FF2A2A] text-[#0B0B0B] hover:text-white font-['Open_Sauce_One'] text-[12px] md:text-[14px] font-bold tracking-wide leading-tight uppercase px-5 md:px-8 py-2 md:py-3 border-[4px] border-[#0B0B0B] shadow-[8px_8px_0_rgba(11,11,11,1)] flex items-center gap-3 hover:translate-y-[2px] hover:shadow-[4px_4px_0_rgba(11,11,11,1)] transition-all cursor-pointer z-[60] w-max opacity-0 pointer-events-none group text-left" style="background-image: repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(11,11,11,0.15) 10px, rgba(11,11,11,0.15) 20px);" ${clickHandler}>
                                    <div class="flex flex-col">
                                        <span>STEP OUT FOR</span>
                                        <span>DISSECTION</span>
                                    </div>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:scale-110 transition-transform ml-2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                                </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            transitStationsContainer.innerHTML = html;
            transitWorld.style.width = `${transitStations.length * 100}vw`;
            
            buildRouteMap();
            setTimeout(() => { navigateTransit(0); }, 500);
        }

        const nextBtn = document.getElementById('transit-next-btn');
        const prevBtn = document.getElementById('transit-prev-btn');

        if(nextBtn) {
            nextBtn.addEventListener('click', () => {
                if(activeStationIdx < transitStations.length - 1) navigateTransit(activeStationIdx + 1);
            });
        }
        if(prevBtn) {
            prevBtn.addEventListener('click', () => {
                if(activeStationIdx > 0) navigateTransit(activeStationIdx - 1);
            });
        }

        // --- METRO WELCOME ANIMATION ---
        function triggerMetroEntrance() {
            const enterBtn = document.getElementById('metro-enter-btn');
            if (enterBtn) enterBtn.style.pointerEvents = 'none';

            const tl = gsap.timeline({
                onComplete: () => {
                    const overlay = document.getElementById('metro-doors-overlay');
                    if (overlay) overlay.style.display = 'none';
                }
            });

            tl.to('#metro-door-text', { opacity: 0, duration: 0.3 })
              .to('#metro-door-left', { x: "-100%", duration: 1.5, ease: "power3.inOut" }, "-=0.1")
              .to('#metro-door-right', { x: "100%", duration: 1.5, ease: "power3.inOut" }, "<");
        }

        ScrollTrigger.create({
            trigger: "#vending",
            start: "top 50%",
            once: true,
            onEnter: () => {
                const doorText = document.getElementById('metro-door-text');
                if (doorText) {
                    doorText.style.pointerEvents = 'auto';
                    gsap.to(doorText, { opacity: 1, duration: 0.5 });
                }
            }
        });

        const metroEnterBtn = document.getElementById('metro-enter-btn');
        if (metroEnterBtn) {
            metroEnterBtn.addEventListener('click', triggerMetroEntrance);
        }
        
        // Lock the Experience/Projects section for a brief scroll duration
        ScrollTrigger.create({
            trigger: "#experience",
            start: "top top",
            end: "+=600",
            pin: true,
            pinSpacing: true,
        });

        // Lock the Metro section in place for a short scroll duration
        ScrollTrigger.create({
            trigger: "#vending",
            start: () => window.innerWidth <= 1380 ? "top -6%" : "top top",
            end: () => window.innerWidth >= 2500 ? "+=3000" : "+=1200",
            pin: true,
            pinSpacing: true,
        });

        function navigateTransit(index) {
            activeStationIdx = index;
            const targetX = -(index * 100); 
            
            // Update the LED Route Map UI
            updateRouteMapUI(index);

            // Real physical device vibration (Haptics)
            if (navigator.vibrate) {
                navigator.vibrate([40, 50, 40, 50, 60, 50, 200]);
            }

            // Improved visual vibration: tight, high-frequency, multi-axis rattle
            gsap.to('#transit-train', { 
                y: "random(-1.5, 1.5)", x: "random(-0.5, 0.5)", rotationZ: "random(-0.2, 0.2)", 
                duration: 0.04, yoyo: true, repeat: 40, ease: "power1.inOut",
                onComplete: () => { gsap.set('#transit-train', { y: 0, x: 0, rotationZ: 0 }); }
            });

            if (isAudioInit) {
                if(typeof f1MetroSynth !== 'undefined') {
                    f1MetroSynth.triggerAttackRelease("C3", 0.9);
                    f1MetroSynth.frequency.setValueAtTime("C2", Tone.now());
                    f1MetroSynth.frequency.exponentialRampToValueAtTime("C6", Tone.now() + 0.45);
                    f1MetroSynth.frequency.exponentialRampToValueAtTime("C2", Tone.now() + 0.9);
                }
                if(typeof gearSynth !== 'undefined') {
                    for(let i=0; i<4; i++) {
                        gearSynth.triggerAttackRelease("C1", "32n", Tone.now() + (i * 0.2) + Math.random()*0.1);
                    }
                }
            }

            gsap.to(transitWorld, { x: `${targetX}vw`, duration: 3.5, ease: "sine.inOut" });
            
            if(progressText) {
                progressText.innerText = `0${index + 1} / 0${transitStations.length}`;
            }

            // --- DELHI METRO ANNOUNCEMENT LOGIC ---
            const announcementText = document.getElementById('metro-announcement-text');
            const announcementBox = document.getElementById('metro-announcement');
            
            const secondaryLines = [
                "kripya darwazo se duri banaye rakhein",
                "apni zaruri vastuon ka dhyan rakhein",
                "darwaze bayin aur khulenge"
            ];

            if (announcementText && announcementBox && index > 0) {
                const nextStationName = transitStations[index].stationName || `STATION ${index}`;
                const secondaryLine = secondaryLines[(index - 1) % secondaryLines.length];

                announcementText.innerHTML = `AGLA STATION <span class="text-white">${nextStationName}</span> HAI. ${secondaryLine.toUpperCase()}.`;
                
                // Show visually
                gsap.killTweensOf(announcementBox);
                gsap.to(announcementBox, { opacity: 1, y: 0, duration: 0.5 });
                gsap.to(announcementBox, { opacity: 0, y: -10, duration: 0.5, delay: 5 });
            }

            // --- STEP OUT BUTTON VISIBILITY ---
            gsap.to('.step-out-btn', { opacity: 0, pointerEvents: 'none', duration: 0.3 });
            if (index > 0) {
                const activeBtn = document.getElementById(`step-out-btn-${index}`);
                if (activeBtn) {
                    // Show the button only after the train stops (delay of 1s to match train movement)
                    gsap.to(activeBtn, { opacity: 1, pointerEvents: 'auto', duration: 0.5, delay: 1 });
                }
            }
        }

        // --- CREATIVE HERO LABELS DYNAMIC ENHANCEMENT ---
        // This targets badges/labels globally in your top hero section
        document.addEventListener('DOMContentLoaded', () => {
            const heroSection = document.querySelector('section:first-of-type, header, #hero');
            if (heroSection) {
                // Target elements that typically act as labels/badges in brutalist design
                const potentialLabels = heroSection.querySelectorAll('span.border, span.bg-\\[var\\(--navy\\)\\], span.bg-\\[var\\(--blue\\)\\], .badge, span.px-3, span.px-4, span.text-xs');
                
                potentialLabels.forEach(label => {
                    // Filter out elements that are too long or contain heavy HTML inside them
                    if (label.textContent.length > 40 || label.classList.contains('creative-enhanced') || label.children.length > 1) return;
                    
                    label.classList.add('creative-enhanced', 'cursor-pointer', 'relative', 'overflow-hidden', 'group', 'transition-all', 'duration-300', 'inline-block', 'will-change-transform');
                    
                    const originalText = label.innerText || label.textContent;
                    
                    // Inject creative inner structure for slide-up reveal effect
                    label.innerHTML = `
                        <span class="relative z-10 group-hover:text-[var(--beige)] transition-colors duration-300 flex items-center gap-2">
                            <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            ${originalText}
                        </span>
                        <div class="absolute inset-0 bg-[var(--blue)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"></div>
                    `;
                    
                    // Add physics-like Brutalist hover interactions
                    label.addEventListener('mouseenter', () => {
                        const randomRotation = Math.random() > 0.5 ? 3 : -3;
                        label.style.transform = `translateY(-4px) rotate(${randomRotation}deg) scale(1.05)`;
                        label.style.boxShadow = '4px 4px 0px var(--blue)';
                        label.style.borderColor = 'var(--blue)';
                    });
                    
                    label.addEventListener('mouseleave', () => {
                        label.style.transform = 'translateY(0) rotate(0) scale(1)';
                        label.style.boxShadow = 'none';
                        label.style.borderColor = ''; 
                    });
                });
            }
        });

        // Scroll lock while a card is dissected — blocks all scroll outside #transit-case-study-view
        let _dissectScrollLockHandler = null;
        function _lockDissectScroll() {
            const csView = document.getElementById('transit-case-study-view');
            _dissectScrollLockHandler = (e) => {
                if (csView && csView.contains(e.target)) return;
                e.preventDefault();
                e.stopPropagation();
            };
            window.addEventListener('wheel',      _dissectScrollLockHandler, { passive: false });
            window.addEventListener('touchmove',  _dissectScrollLockHandler, { passive: false });
        }
        function _unlockDissectScroll() {
            if (_dissectScrollLockHandler) {
                window.removeEventListener('wheel',     _dissectScrollLockHandler);
                window.removeEventListener('touchmove', _dissectScrollLockHandler);
                _dissectScrollLockHandler = null;
            }
        }

        window.stepOutToCaseStudy = function(event, dataIndex) {
            if (event) event.stopPropagation();

            if (typeof lenis !== 'undefined') lenis.stop();
            document.body.style.overflow = 'hidden';
            _lockDissectScroll();

            if (isAudioInit && typeof arrivalSynth !== 'undefined') arrivalSynth.triggerAttackRelease(["E4", "G4", "C5"], "8n");

            const data = inventoryData[dataIndex];
            const bgHex = data.bg || '#F4EFE6';
            const textHex = data.text || '#051024';

            // Overlay slides up first — DOM injection happens only after it covers the screen
            const overlay = document.createElement('div');
            overlay.id = 'step-out-overlay';
            overlay.className = 'fixed inset-0 z-[9998] transform translate-y-full';
            overlay.style.backgroundColor = bgHex;
            document.body.appendChild(overlay);

            gsap.to(overlay, {
                y: "0%",
                duration: 0.55,
                ease: "power3.inOut",
                onComplete: () => {
                    // Inject content while overlay fully covers screen (no visible repaint)
                    transitCsContent.innerHTML = data.customHTML;
                    transitCsContent.style.backgroundColor = bgHex;
                    transitCsContent.style.borderColor = textHex;
                    transitCsContent.style.boxShadow = `16px 16px 0px ${textHex}`;

                    // Swap views
                    gsap.set(transitMapView, { height: 0, opacity: 0 });
                    transitMapView.classList.add('hidden');
                    transitCsView.classList.remove('hidden');
                    gsap.set(transitCsView, { opacity: 0, y: 20 });

                    // Slide overlay off to the top while content fades up underneath
                    gsap.to(overlay, {
                        y: "-100%",
                        duration: 0.55,
                        ease: "power3.inOut",
                        onComplete: () => overlay.remove()
                    });
                    gsap.to(transitCsView, {
                        opacity: 1, y: 0,
                        duration: 0.45,
                        delay: 0.1,
                        ease: "power3.out",
                        onComplete: () => {
                            if (typeof ScrollTrigger !== 'undefined') {
                                ScrollTrigger.refresh();
                                const revealElements = transitCsContent.querySelectorAll('.reveal-text, .reveal-blur, .mockup-scene');
                                revealElements.forEach((el) => {
                                    ScrollTrigger.create({
                                        trigger: el,
                                        scroller: transitCsView,
                                        start: "top 90%",
                                        toggleClass: "is-visible",
                                        once: false
                                    });
                                });
                            }
                        }
                    });
                }
            });

            if (typeof triggerExploration === 'function') triggerExploration(`transit_project_${data.id}`);
        };

        if (backToTransitBtn) {
            backToTransitBtn.addEventListener('click', () => {
                if (typeof lenis !== 'undefined') lenis.start();
                document.body.style.overflow = '';
                _unlockDissectScroll();
                if (isAudioInit && typeof popSynth !== 'undefined') popSynth.triggerAttackRelease("C4", "8n");
                
                // Clear dynamic triggers
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.getAll().forEach(st => {
                        if (st.trigger && transitCsContent.contains(st.trigger)) st.kill();
                    });
                }

                // Create overlay to cover again
                const overlay = document.createElement('div');
                overlay.id = 'step-out-overlay';
                overlay.className = 'fixed inset-0 bg-[#F4EFE6] z-[9998] transform translate-y-full opacity-0';
                document.body.appendChild(overlay);

                gsap.to(overlay, { 
                    y: "0%", opacity: 1, duration: 0.4, ease: "power3.inOut",
                    onComplete: () => {
                        transitCsView.classList.add('hidden');
                        transitCsContent.innerHTML = '';
                        
                        transitMapView.classList.remove('hidden');
                        gsap.set(transitMapView, { height: '100%', opacity: 1 });
                        
                        gsap.to(overlay, { y: "100%", duration: 0.5, ease: "power3.inOut", onComplete: () => {
                            overlay.remove();
                            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                        }});
                    }
                });
            });
        }

        // Initialize Transit System
        buildTransitSystem();
        // --- END CAREER TRANSIT SYSTEM LOGIC ---

        // --- TOP RIBBON SYSTEM HUD & FOMO LOGIC ---
        const exploredMilestones = new Set();
        const TOTAL_MILESTONES = 12; 

        function triggerExploration(milestone) {
            // milestone tracking kept for internal use; bar/pct now driven by scroll position
            exploredMilestones.add(milestone);
        }

        // Drive "You've seen" bar & pct from actual scroll progress (start → footer)
        const _ribbonBar = document.getElementById('scroll-progress-bar');
        const _ribbonPct = document.getElementById('scroll-pct');
        if (typeof lenis !== 'undefined' && lenis) {
            lenis.on('scroll', ({ progress }) => {
                const pct = Math.min(100, Math.round(progress * 100));
                if (_ribbonBar) _ribbonBar.style.width = pct + '%';
                if (_ribbonPct) _ribbonPct.textContent = pct + '%';
            });
        }

        let sessionSeconds = 0;
        const timerEl = document.getElementById('session-timer');

        setInterval(() => {
            sessionSeconds++;
            const m = Math.floor(sessionSeconds / 60);
            const s = sessionSeconds % 60;
            if(timerEl) timerEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        }, 1000);

        // --- HUMANLY HONEST QUOTES ROTATOR ---
        const hinglishPhrases = [
            "Built this site myself. Blame me for the bugs.",
            "Started as a designer. Ended up leading creative teams.",
            "Fastest way to know me: Best Work → Contact.",
            "The blue stayed. Everything else changed.",
            "This website exists because a PDF felt boring.",
            "Most proud of the projects in \"Best Work\"."
        ];
        let hinglishIdx = 0;
        const phraseEl = document.getElementById('hinglish-phrase');
        if (phraseEl) {
            setInterval(() => {
                gsap.to(phraseEl, {
                    y: -10, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
                        hinglishIdx = (hinglishIdx + 1) % hinglishPhrases.length;
                        phraseEl.innerText = hinglishPhrases[hinglishIdx];
                        gsap.set(phraseEl, { y: 10 });
                        gsap.to(phraseEl, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
                    }
                });
            }, 8000);
        }

        const clockEl = document.getElementById('live-ist');

        function updateIST() {
            const time = new Date().toLocaleTimeString('en-IN', { 
                timeZone: 'Asia/Kolkata', 
                hour12: false 
            }); 
            if(clockEl) clockEl.textContent = time;
        }

        updateIST();
        setInterval(updateIST, 1000);

        // --- DEFERRED SCROLLTRIGGERS ---
        navSections.forEach(id => {
            ScrollTrigger.create({
                trigger: `#${id}`,
                start: "top 60%",
                end: "bottom 40%",
                onEnter: () => { updateNavState(id); triggerExploration(`section_${id}`); },
                onEnterBack: () => updateNavState(id)
            });
        });

        // Gates stay closed until the user clicks "ENTER METRO" — no auto-open.

        // --- PROJECTS SECTION CREATIVE REVEAL ---
        const projTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#experience",
                start: "top 65%",
                once: true
            }
        });
        
        projTl.fromTo(".proj-grid-line", { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 1.5, ease: "power3.inOut", stagger: 0.1 }, 0);
        projTl.fromTo("#proj-section-badge", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(2)" }, 0.2);
        projTl.fromTo(["#proj-title-word1", "#proj-title-word2"], { y: "110%", rotationZ: 5, opacity: 0 }, { y: "0%", rotationZ: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }, 0.3);
        projTl.fromTo("#proj-helper-sticker", { scale: 0.5, opacity: 0, rotationZ: 15 }, { scale: 1, opacity: 1, rotationZ: -2, duration: 0.6, ease: "back.out(1.5)", clearProps: "transform" }, 0.5);
        projTl.fromTo("#stack-area", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.5);
        projTl.fromTo(".stack-card", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)", onStart: () => { if (typeof isAudioInit !== 'undefined' && isAudioInit && typeof hoverTickSynth !== 'undefined') hoverTickSynth.triggerAttackRelease("C5", "64n"); } }, 0.7);

        // --- CONTACT SECTION ANIMATION ---
        gsap.fromTo('.contact-stagger', 
            { opacity: 0, y: 15 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.7, 
                stagger: 0.1, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#contact",
                    start: "top 75%",
                }
            }
        );
        // --- SPREAD OBSERVER FOR DECKS ---
        const spreadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-spread');
                    // Stop observing once spread
                    spreadObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });
        
        document.querySelectorAll('.spread-deck, .spread-reels').forEach(el => spreadObserver.observe(el));
    