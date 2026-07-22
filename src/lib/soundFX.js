/**
 * soundFX.js — Native Web Audio API synthesizer for UI sound feedback.
 * Zero dependencies. Synthesizes subtle sci-fi clicks, blips, and sweeps.
 */

let ctx = null;
let muted = false;

try {
  muted = localStorage.getItem('sound_muted') === 'true';
} catch {
  muted = false;
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) ctx = new AudioCtx();
  }
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

export const soundFX = {
  isMuted() {
    return muted;
  },

  toggleMute() {
    muted = !muted;
    try {
      localStorage.setItem('sound_muted', String(muted));
    } catch {}
    return muted;
  },

  playHover() {
    if (muted) return;
    const ac = getAudioContext();
    if (!ac) return;

    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(920, ac.currentTime + 0.03);

      gain.gain.setValueAtTime(0.015, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ac.destination);

      osc.start();
      osc.stop(ac.currentTime + 0.03);
    } catch {}
  },

  playClick() {
    if (muted) return;
    const ac = getAudioContext();
    if (!ac) return;

    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ac.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ac.destination);

      osc.start();
      osc.stop(ac.currentTime + 0.05);
    } catch {}
  },

  playSciFi() {
    if (muted) return;
    const ac = getAudioContext();
    if (!ac) return;

    try {
      const osc1 = ac.createOscillator();
      const osc2 = ac.createOscillator();
      const gain = ac.createGain();

      osc1.type = 'sine';
      osc2.type = 'sawtooth';

      osc1.frequency.setValueAtTime(320, ac.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1240, ac.currentTime + 0.12);

      osc2.frequency.setValueAtTime(640, ac.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(2480, ac.currentTime + 0.12);

      gain.gain.setValueAtTime(0.03, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.14);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ac.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ac.currentTime + 0.14);
      osc2.stop(ac.currentTime + 0.14);
    } catch {}
  },

  playToggle() {
    if (muted) return;
    const ac = getAudioContext();
    if (!ac) return;

    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ac.currentTime + 0.08);

      gain.gain.setValueAtTime(0.025, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ac.destination);

      osc.start();
      osc.stop(ac.currentTime + 0.08);
    } catch {}
  },
};
