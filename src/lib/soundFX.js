/**
 * soundFX.js — Native Web Audio API synthesizer.
 * Zero dependencies. The context is created only after a user gesture.
 */

let ctx = null;
let muted = false;
let unlocked = false;
let installed = false;
let noiseBuf = null;

try {
  muted = localStorage.getItem('sound_muted') === 'true';
} catch {
  muted = false;
}

function prefersReduced() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ensureContext() {
  if (ctx || typeof window === 'undefined') return ctx;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  ctx = new AudioCtx();
  return ctx;
}

function installUnlock() {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  const unlock = () => {
    unlocked = true;
    const ac = ensureContext();
    if (ac && ac.state === 'suspended') ac.resume().catch(() => {});
  };
  window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
  window.addEventListener('keydown', unlock, { capture: true });
  window.addEventListener('touchstart', unlock, { capture: true, passive: true });
}

installUnlock();

function getAudioContext() {
  if (!unlocked || muted || typeof window === 'undefined') return null;
  const ac = ensureContext();
  if (ac && ac.state === 'suspended') ac.resume().catch(() => {});
  return ac;
}

function noiseBuffer(ac, seconds) {
  if (noiseBuf && noiseBuf.sampleRate === ac.sampleRate) return noiseBuf;
  const len = Math.floor(ac.sampleRate * seconds);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const data = buf.getChannelData(0);
  let pink = 0;
  for (let i = 0; i < len; i += 1) {
    const white = Math.random() * 2 - 1;
    pink = pink * 0.96 + white * 0.04;
    data[i] = pink * 3.1;
  }
  noiseBuf = buf;
  return buf;
}

function envGain(ac, peak, t, attack, release) {
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak), t + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  return gain;
}

function tone(ac, dest, type, f0, f1, t, dur, peak) {
  const osc = ac.createOscillator();
  const gain = envGain(ac, peak, t, Math.min(0.03, dur * 0.35), Math.max(0.02, dur - 0.02));
  osc.type = type;
  osc.frequency.setValueAtTime(Math.max(1, f0), t);
  if (f1 && f1 !== f0) osc.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t + dur);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function playNeural(ac, t) {
  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 3.4;
  filter.frequency.setValueAtTime(420, t);
  filter.frequency.exponentialRampToValueAtTime(1680, t + 0.26);
  filter.frequency.exponentialRampToValueAtTime(620, t + 0.62);
  const bus = ac.createGain();
  bus.gain.value = 1;
  bus.connect(filter);
  filter.connect(ac.destination);
  tone(ac, bus, 'sine', 220, 330, t, 0.62, 0.016);
  tone(ac, bus, 'sine', 223.5, 335, t, 0.62, 0.01);
  tone(ac, bus, 'triangle', 440, 659.25, t, 0.58, 0.012);
  [2480, 3320, 4180].forEach((freq, i) => {
    tone(ac, ac.destination, 'sine', freq, freq * 1.04, t + 0.1 + i * 0.09, 0.045, 0.008);
  });
}

function playLattice(ac, t) {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    tone(ac, ac.destination, 'sine', freq, freq, t + i * 0.072, 0.08, 0.02);
  });
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.Q.value = 12;
  filter.frequency.setValueAtTime(140, t);
  filter.connect(ac.destination);
  tone(ac, filter, 'sine', 92, 74, t, 0.16, 0.03);
}

function playScan(ac, t) {
  const filter = ac.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(900, t);
  filter.frequency.exponentialRampToValueAtTime(3200, t + 0.28);
  filter.frequency.exponentialRampToValueAtTime(1400, t + 0.55);
  filter.Q.value = 0.7;
  filter.connect(ac.destination);
  tone(ac, filter, 'sine', 330, 880, t, 0.52, 0.02);
  tone(ac, filter, 'triangle', 660, 1760, t + 0.04, 0.46, 0.009);
}

export const soundFX = {
  isMuted() {
    return muted;
  },

  toggleMute() {
    muted = !muted;
    try {
      localStorage.setItem('sound_muted', String(muted));
    } catch { /* storage unavailable */ }
    return muted;
  },

  playHover() {
    const ac = getAudioContext();
    if (!ac) return;
    try {
      tone(ac, ac.destination, 'sine', 780, 920, ac.currentTime, 0.03, 0.015);
    } catch { /* audio unavailable */ }
  },

  playClick() {
    const ac = getAudioContext();
    if (!ac) return;
    try {
      tone(ac, ac.destination, 'triangle', 1100, 280, ac.currentTime, 0.05, 0.04);
    } catch { /* audio unavailable */ }
  },

  playSciFi() {
    const ac = getAudioContext();
    if (!ac) return;
    try {
      const t = ac.currentTime;
      tone(ac, ac.destination, 'sine', 320, 1240, t, 0.12, 0.02);
      tone(ac, ac.destination, 'sawtooth', 640, 2480, t, 0.12, 0.012);
    } catch { /* audio unavailable */ }
  },

  playToggle() {
    const ac = getAudioContext();
    if (!ac) return;
    try {
      tone(ac, ac.destination, 'sine', 440, 880, ac.currentTime, 0.08, 0.025);
    } catch { /* audio unavailable */ }
  },

  playStageMorph(stageIndex, { manual = false } = {}) {
    void manual;
    if (prefersReduced()) return;
    const ac = getAudioContext();
    if (!ac) return;
    const index = ((stageIndex % 3) + 3) % 3;
    try {
      const t = ac.currentTime + 0.01;
      if (index === 0) playNeural(ac, t);
      else if (index === 1) playLattice(ac, t);
      else playScan(ac, t);
    } catch { /* audio unavailable */ }
  },

  playDolphinBreach(intensity = 0.8) {
    if (prefersReduced()) return;
    const ac = getAudioContext();
    if (!ac) return;
    try {
      const t = ac.currentTime;
      const amount = Math.max(0.35, Math.min(1, intensity));
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 6.2;
      filter.frequency.setValueAtTime(1280, t);
      filter.frequency.exponentialRampToValueAtTime(2400, t + 0.1);
      filter.frequency.exponentialRampToValueAtTime(1860, t + 0.18);
      filter.frequency.exponentialRampToValueAtTime(2700, t + 0.28);
      const gain = ac.createGain();
      const peak = Math.min(0.022, Math.max(0.016, 0.02 * amount));
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(peak, t + 0.028);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, peak * 0.72), t + 0.16);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
      filter.connect(gain);
      gain.connect(ac.destination);

      const osc = ac.createOscillator();
      const tri = ac.createOscillator();
      osc.type = 'sine';
      tri.type = 'triangle';
      [osc, tri].forEach((node) => {
        node.frequency.setValueAtTime(1150, t);
        node.frequency.exponentialRampToValueAtTime(2350, t + 0.09);
        node.frequency.exponentialRampToValueAtTime(1780, t + 0.16);
        node.frequency.exponentialRampToValueAtTime(2950, t + 0.28);
      });
      const mod = ac.createOscillator();
      const modGain = ac.createGain();
      mod.type = 'sine';
      mod.frequency.setValueAtTime(14, t);
      mod.frequency.linearRampToValueAtTime(27, t + 0.28);
      modGain.gain.setValueAtTime(36, t);
      modGain.gain.linearRampToValueAtTime(160, t + 0.22);
      mod.connect(modGain);
      modGain.connect(osc.frequency);
      const triGain = ac.createGain();
      triGain.gain.value = 0.32;
      osc.connect(filter);
      tri.connect(triGain);
      triGain.connect(filter);
      osc.start(t);
      tri.start(t);
      mod.start(t);
      osc.stop(t + 0.34);
      tri.stop(t + 0.34);
      mod.stop(t + 0.34);

      const clicks = [3320, 3680, 4120, 4540, 3980];
      clicks.forEach((freq, i) => {
        const ping = ac.createOscillator();
        const pingGain = ac.createGain();
        const start = t + 0.018 + i * 0.026;
        ping.type = 'sine';
        ping.frequency.setValueAtTime(freq, start);
        pingGain.gain.setValueAtTime(0.0001, start);
        pingGain.gain.exponentialRampToValueAtTime(0.011 * amount, start + 0.002);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.008);
        ping.connect(pingGain);
        pingGain.connect(ac.destination);
        ping.start(start);
        ping.stop(start + 0.012);
      });

      const src = ac.createBufferSource();
      src.buffer = noiseBuffer(ac, 0.22);
      const rush = ac.createBiquadFilter();
      rush.type = 'bandpass';
      rush.Q.value = 0.65;
      rush.frequency.setValueAtTime(520, t);
      rush.frequency.exponentialRampToValueAtTime(1680, t + 0.08);
      const rushGain = envGain(ac, 0.01 * amount, t, 0.018, 0.12);
      src.connect(rush);
      rush.connect(rushGain);
      rushGain.connect(ac.destination);
      src.start(t);
      src.stop(t + 0.16);
    } catch { /* audio unavailable */ }
  },

  playDolphinSplash(intensity = 0.8) {
    if (prefersReduced()) return;
    const ac = getAudioContext();
    if (!ac) return;
    try {
      const t = ac.currentTime;
      const amount = Math.max(0.35, Math.min(1, intensity));
      const src = ac.createBufferSource();
      src.buffer = noiseBuffer(ac, 0.48);
      const filter = ac.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 0.85;
      filter.frequency.setValueAtTime(350, t);
      filter.frequency.exponentialRampToValueAtTime(1400, t + 0.07);
      filter.frequency.exponentialRampToValueAtTime(280, t + 0.32);
      const gain = envGain(ac, 0.026 * amount, t, 0.012, 0.3);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
      src.start(t);
      src.stop(t + 0.36);
      tone(ac, ac.destination, 'sine', 480, 140, t, 0.28, 0.02 * amount);
      tone(ac, ac.destination, 'sine', 280, 620, t + 0.08, 0.09, 0.012 * amount);
      tone(ac, ac.destination, 'sine', 360, 780, t + 0.15, 0.08, 0.01 * amount);
      tone(ac, ac.destination, 'sine', 420, 920, t + 0.22, 0.07, 0.009 * amount);
    } catch { /* audio unavailable */ }
  },

  playFishSchool(intensity = 0.7) {
    if (prefersReduced()) return;
    const ac = getAudioContext();
    if (!ac) return;
    try {
      const t = ac.currentTime;
      const amount = Math.max(0.25, Math.min(1, intensity));
      const src = ac.createBufferSource();
      src.buffer = noiseBuffer(ac, 0.5);
      const filter = ac.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 9;
      filter.frequency.setValueAtTime(180, t);
      filter.frequency.exponentialRampToValueAtTime(520, t + 0.14);
      filter.frequency.exponentialRampToValueAtTime(240, t + 0.38);
      const gain = envGain(ac, 0.024 * amount, t, 0.04, 0.32);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ac.destination);
      src.start(t);
      src.stop(t + 0.4);
      tone(ac, ac.destination, 'sine', 640, 240, t + 0.02, 0.09, 0.01 * amount);
      tone(ac, ac.destination, 'sine', 210, 96, t + 0.04, 0.22, 0.012 * amount);
    } catch { /* audio unavailable */ }
  },
};
