
                        document.addEventListener("DOMContentLoaded", () => {
                            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                            // Accessibility: Global Reduced Motion for GSAP
                            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                                gsap.ticker.fps(15); // Reduce frame rate to minimize jarring movement
                            }

                                const insomniacImages = ["mischiefmanagediidraft1.png", "8.debunkingmyths.png", "safarnama.png", "5.mumbai-colorgrading.png", "de57b5f1-9795-4d6d-a063-062ef8a4ee59.jpeg", "d95bb0c2-546c-494c-b40f-0e47506f1a4c.jpeg", "valentinespecialpost.png", "fukcaverageposter.jpg", "1dad6dae-ed67-4d04-86a3-b5cfa019f38f.jpeg", "7.3.dusummervacation.png", "e69df499-dd26-4d02-9eb8-9b7bd40e0505.jpeg", "47a7f269-a9af-4309-a72e-d0120a24d8ea.jpeg", "4031e24f-8d86-4a19-840d-a57f91107b10_1_201_a.jpeg", "2.beyondthehypei3-tiler.png", "2(2).jpg", "ammm.png", "5.histrionicajudges.png", "1.charades.png", "1(1).png", "7.jpeg", "1.1.prajaktakoliibooklaunch(1).png", "12.png", "9.invitationithefinalhand.png", "2e3cb980-6afb-49e3-9f5d-7cea9943c17a.jpeg", "7.2.dusummervacation.png", "1.mschficarousel.png", "1.stillrollin’.png", "7.1.dusummervacation.png", "7.4.dusummervacation.png", "3.evocusidramsoc.png", "1.1.priyanshumodiistandeeihistrionica.png", "20.jpg", "1(2).png", "22.png", "4.sharktankpanelibizstreet.png", "rntl..png", "23.jpg", "f64a91b4-1d10-4ea2-b8fd-6b5ca2825475_1_105_c.jpeg", "13.1.giveaway(1).jpg", "64740a27-7c2f-4e74-a84a-6717f5918fe9_1_105_c.jpeg", "24fb5243-7a38-45aa-88ff-e6742ee477bc.jpeg", "2.playstationicrossroads.png", "19.jpg", "xkmnk.png", "093b1d12-3f48-4208-a33c-0d3f9adfb345.jpeg", "262daae1-dd64-4200-9d3a-26310da58f34_1_105_c.jpeg", "2.raahwarga.png", "chance.jpg", "lalalalalala.png", "7.festiveseasonibrandsicarousel.png", "2.png", "5d27e539-02e0-4930-be55-030e03e58d27.jpeg", "1.jpg", "1.png", "13.2.giveaway.jpg", "3.zomatoiassignmentpost.png"];
                                
                                const canvas = document.getElementById("cursor-trail-canvas");
                                let imgIndex = 0;
                                let lastX = 0;
                                let lastY = 0;
                                const threshold = 180; // pixels to move before spawning next image
                                const activeImages = [];

                                const onGalleryMouseMove = (e) => {
                                    if (window.innerWidth < 768) return;
                                    const rect = canvas.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;

                                    const dist = Math.hypot(x - lastX, y - lastY);
                                    if (dist > threshold) {
                                        lastX = x;
                                        lastY = y;
                                        spawnImage(x, y);
                                    }
                                };

                                const gallerySection = document.getElementById("gallery");
                                new IntersectionObserver((entries) => {
                                    entries.forEach(entry => {
                                        if (entry.isIntersecting) {
                                            canvas.addEventListener("mousemove", onGalleryMouseMove);
                                        } else {
                                            canvas.removeEventListener("mousemove", onGalleryMouseMove);
                                        }
                                    });
                                }, { threshold: 0 }).observe(gallerySection);

                                function spawnImage(x, y) {
                                    if (typeof isAudioInit !== 'undefined' && isAudioInit && typeof boingSynth !== 'undefined') {
                                        // Slight pop sound with very short release
                                        boingSynth.triggerAttackRelease("G5", "64n", "+0", 0.05);
                                    }

                                    const src = `./${insomniacImages[imgIndex]}`;
                                    imgIndex = (imgIndex + 1) % insomniacImages.length;

                                    const img = document.createElement("img");
                                    img.src = src;
                                    
                                    const baseWidth = window.innerWidth < 768 ? 160 : window.innerWidth <= 1440 ? 240 : 320;
                                    const scale = 0.7 + Math.random() * 0.4; // 0.7x to 1.1x scale
                                    const rot = (Math.random() - 0.5) * 15; // More varied rotation
                                    const offsetX = (Math.random() - 0.5) * Math.min(200, window.innerWidth * 0.12); // Imperfect placement
                                    const offsetY = (Math.random() - 0.5) * Math.min(200, window.innerWidth * 0.12);
                                    
                                    img.className = "absolute origin-center rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-none will-change-transform";
                                    img.style.width = `${baseWidth}px`;
                                    img.style.left = `${x + offsetX}px`;
                                    img.style.top = `${y + offsetY}px`;
                                    img.style.transform = `translate(-50%, -50%) scale(0.9) rotate(${rot - 5}deg)`;
                                    img.style.opacity = "0";

                                    canvas.appendChild(img);
                                    activeImages.push(img);

                                    // Appear slowly with a pause (delay) matching the vibe
                                    gsap.to(img, {
                                        opacity: 1,
                                        scale: scale,
                                        rotation: rot,
                                        duration: 1.5,
                                        delay: Math.random() * 0.3 + 0.1, // bit pause
                                        ease: "power2.out",
                                        overwrite: "auto"
                                    });

                                    // Enforce a higher max images to allow a tiled look
                                    if (activeImages.length > 15) {
                                        const oldImg = activeImages.shift();
                                        removeImage(oldImg);
                                    }

                                    // Auto fade out (longer duration so they tile up)
                                    setTimeout(() => {
                                        if (activeImages.includes(img)) {
                                            const idx = activeImages.indexOf(img);
                                            if (idx > -1) activeImages.splice(idx, 1);
                                            removeImage(img);
                                        }
                                    }, 3500);
                                }

                                function removeImage(img) {
                                    gsap.to(img, {
                                        opacity: 0,
                                        scale: 0.8,
                                        duration: 0.8,
                                        ease: "power2.inOut",
                                        onComplete: () => {
                                            if (img.parentNode) {
                                                img.parentNode.removeChild(img);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    