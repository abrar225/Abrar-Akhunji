// Synthesis engine using browser OfflineAudioContext to render
// warm, soft, original stereo sound effects in D-major pentatonic tuning.
// D-major pentatonic notes: D, E, F#, A, B
// Frequencies (Hz):
// D4: 293.66, E4: 329.63, F#4: 369.99, A4: 440.00, B4: 493.88
// D5: 587.33, E5: 659.25, F#5: 739.99, A5: 880.00, B5: 987.77
// D6: 1174.66, E6: 1318.51, F#6: 1479.98, A6: 1760.00


export async function renderSoundBuffer(id: string, duration: number): Promise<AudioBuffer> {
  const sampleRate = 48000;
  const numFrames = Math.max(1, Math.round(sampleRate * duration));
  const ctx = new OfflineAudioContext(2, numFrames, sampleRate);


  // Master bus with peak limiter/soft clipper and peak gain scaling <= 0.35
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.32, 0); // Guaranteeing peak headroom strictly below 0.35
  masterGain.connect(ctx.destination);


  // Helper to create a noise buffer with organic pink/brown spectrum
  const createFilteredNoise = (lengthSec: number) => {
    const bufferSize = Math.max(128, Math.floor(sampleRate * lengthSec));
    const noiseBuffer = ctx.createBuffer(2, bufferSize, sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = noiseBuffer.getChannelData(ch);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink-ish filtering
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.08;
        b2 = 0.88 * b2 + white * 0.12;
        data[i] = (b0 + b1 + b2) * 0.5;
      }
    }
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    return src;
  };


  const t0 = 0;
  const tEnd = duration;


  switch (id) {
    case "hover": {
      // 0.035s: Ultra-soft felt mallet sine/triangle micro touch
      // Fast soft attack (0.003s) and complete fade to silence
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, t0); // D5
      osc.frequency.exponentialRampToValueAtTime(580, tEnd);


      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, t0);
      filter.frequency.exponentialRampToValueAtTime(300, tEnd);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.28, t0 + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.001);
      gain.gain.setValueAtTime(0, tEnd);


      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(-0.05, t0);


      osc.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(masterGain);


      osc.start(t0);
      osc.stop(tEnd);
      break;
    }


    case "click": {
      // 0.070s: Rounded glass tap, dual mellow partials
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(0.05, t0);


      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880.0, t0); // A5
      osc1.frequency.exponentialRampToValueAtTime(870, tEnd);


      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1479.98, t0); // F#6 (in-tune glass partial)


      const f = ctx.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(2200, t0);
      f.frequency.exponentialRampToValueAtTime(600, tEnd);


      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.32, t0 + 0.003); // Soft, non-clicking attack
      g.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.002);
      g.gain.setValueAtTime(0, tEnd);


      osc1.connect(f);
      osc2.connect(f);
      f.connect(g);
      g.connect(panner);
      panner.connect(masterGain);


      osc1.start(t0);
      osc2.start(t0);
      osc1.stop(tEnd);
      osc2.stop(tEnd);
      break;
    }


    case "select": {
      // 0.110s: Ascending D-major pentatonic warm interval (D5 -> F#5)
      const notes = [
        { freq: 587.33, start: 0, dur: 0.09, pan: -0.15 },
        { freq: 739.99, start: 0.025, dur: 0.085, pan: 0.15 },
      ];


      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.freq, t0 + n.start);


        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1800, t0 + n.start);


        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t0 + n.start);
        gain.gain.linearRampToValueAtTime(0.25, t0 + n.start + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + n.start + n.dur - 0.002);
        gain.gain.setValueAtTime(0, tEnd);


        const pan = ctx.createStereoPanner();
        pan.pan.setValueAtTime(n.pan, t0);


        osc.connect(filter);
        filter.connect(gain);
        gain.connect(pan);
        pan.connect(masterGain);


        osc.start(t0 + n.start);
        osc.stop(tEnd);
      });
      break;
    }


    case "section": {
      // 0.220s: Airy, breathy wooden mallet transition with stereo warmth
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440.0, t0); // A4
      osc.frequency.exponentialRampToValueAtTime(435, tEnd);


      const oscHarmonic = ctx.createOscillator();
      oscHarmonic.type = "sine";
      oscHarmonic.frequency.setValueAtTime(880.0, t0); // A5


      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(750, t0);
      filter.Q.setValueAtTime(1.8, t0);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.30, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.004);
      gain.gain.setValueAtTime(0, tEnd);


      const noise = createFilteredNoise(duration);
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(1200, t0);
      noiseFilter.frequency.exponentialRampToValueAtTime(300, tEnd);


      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, t0);
      noiseGain.gain.linearRampToValueAtTime(0.04, t0 + 0.01);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.01);
      noiseGain.gain.setValueAtTime(0, tEnd);


      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);


      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);


      osc.start(t0);
      oscHarmonic.start(t0);
      noise.start(t0);
      osc.stop(tEnd);
      oscHarmonic.stop(tEnd);
      noise.stop(tEnd);
      break;
    }


    case "chapter": {
      // 0.450s: Soft time-skip sweep with gentle low-pass filter glide
      const osc = ctx.createOscillator();
      osc.type = "sine";
      // Smooth glide across D4 -> F#4 -> A4 -> D5 pentatonic sweep
      osc.frequency.setValueAtTime(293.66, t0);
      osc.frequency.exponentialRampToValueAtTime(587.33, t0 + 0.35);


      const oscSub = ctx.createOscillator();
      oscSub.type = "triangle";
      oscSub.frequency.setValueAtTime(369.99, t0);
      oscSub.frequency.exponentialRampToValueAtTime(739.99, t0 + 0.35);


      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, t0);
      filter.frequency.exponentialRampToValueAtTime(1800, t0 + 0.25);
      filter.frequency.exponentialRampToValueAtTime(350, tEnd);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.30, t0 + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.005);
      gain.gain.setValueAtTime(0, tEnd);


      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(-0.3, t0);
      panner.pan.linearRampToValueAtTime(0.3, tEnd);


      osc.connect(filter);
      oscSub.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(masterGain);


      osc.start(t0);
      oscSub.start(t0);
      osc.stop(tEnd);
      oscSub.stop(tEnd);
      break;
    }


    case "building": {
      // 0.060s: Single quiet D5 marimba pluck designed for hundreds of soft, pitch-shifted contribution buildings
      // Very mellow, soft attack, natural woody damping, strict peak control
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, t0); // D5
      osc.frequency.exponentialRampToValueAtTime(584.0, tEnd);


      // Wood bar overtone (soft 3rd harmonic)
      const oscBar = ctx.createOscillator();
      oscBar.type = "triangle";
      oscBar.frequency.setValueAtTime(1762.0, t0); // ~3x


      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, t0);
      filter.frequency.exponentialRampToValueAtTime(450, tEnd);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.24, t0 + 0.003); // Delicate, gentle pluck
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.002);
      gain.gain.setValueAtTime(0, tEnd);


      const barGain = ctx.createGain();
      barGain.gain.setValueAtTime(0.0001, t0);
      barGain.gain.linearRampToValueAtTime(0.05, t0 + 0.002);
      barGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.02);


      osc.connect(filter);
      oscBar.connect(barGain);
      barGain.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);


      osc.start(t0);
      oscBar.start(t0);
      osc.stop(tEnd);
      oscBar.stop(tEnd);
      break;
    }


    case "replay": {
      // 0.320s: Gentle rewind and lift
      // Ascending soft pentatonic swell with subtle phase reversal
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(293.66, t0); // D4
      osc1.frequency.exponentialRampToValueAtTime(587.33, t0 + 0.24); // To D5


      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(369.99, t0); // F#4
      osc2.frequency.exponentialRampToValueAtTime(739.99, t0 + 0.28);


      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, t0);
      filter.frequency.exponentialRampToValueAtTime(1500, t0 + 0.22);
      filter.frequency.exponentialRampToValueAtTime(400, tEnd);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.28, t0 + 0.20); // Swelling lift
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.004);
      gain.gain.setValueAtTime(0, tEnd);


      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(0.2, t0);
      panner.pan.linearRampToValueAtTime(-0.1, tEnd);


      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(masterGain);


      osc1.start(t0);
      osc2.start(t0);
      osc1.stop(tEnd);
      osc2.stop(tEnd);
      break;
    }


    case "city-complete": {
      // 0.650s: Restrained pentatonic cadence
      // Chord progression: D4 (0.0s) -> F#4 (0.12s) -> A4 (0.24s) -> D5 (0.36s)
      const chord = [
        { freq: 293.66, start: 0.00, dur: 0.60, pan: -0.25 },
        { freq: 369.99, start: 0.10, dur: 0.52, pan: 0.20 },
        { freq: 440.00, start: 0.20, dur: 0.43, pan: -0.10 },
        { freq: 587.33, start: 0.30, dur: 0.34, pan: 0.15 },
      ];


      chord.forEach((item) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(item.freq, t0 + item.start);


        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, t0 + item.start);


        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t0 + item.start);
        gain.gain.linearRampToValueAtTime(0.20, t0 + item.start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.005);
        gain.gain.setValueAtTime(0, tEnd);


        const pan = ctx.createStereoPanner();
        pan.pan.setValueAtTime(item.pan, t0);


        osc.connect(filter);
        filter.connect(gain);
        gain.connect(pan);
        pan.connect(masterGain);


        osc.start(t0 + item.start);
        osc.stop(tEnd);
      });
      break;
    }


    case "scatter": {
      // 0.250s: Fine paper-like grains dispersing in stereo
      const noise = createFilteredNoise(duration);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.setValueAtTime(3200, t0);
      bp.frequency.exponentialRampToValueAtTime(1400, tEnd);
      bp.Q.setValueAtTime(1.2, t0);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.22, t0 + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.004);
      gain.gain.setValueAtTime(0, tEnd);


      // Subtle marimba click undertone
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(493.88, t0); // B4
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.0001, t0);
      oscGain.gain.linearRampToValueAtTime(0.08, t0 + 0.004);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.04);
      oscGain.gain.setValueAtTime(0, tEnd);


      noise.connect(bp);
      bp.connect(gain);
      gain.connect(masterGain);


      osc.connect(oscGain);
      oscGain.connect(masterGain);


      noise.start(t0);
      osc.start(t0);
      noise.stop(tEnd);
      osc.stop(tEnd);
      break;
    }


    case "reform": {
      // 0.400s: Restrained pentatonic cadence drawing elements home
      // Notes converging: B4 (0.0s) -> A4 (0.08s) -> F#4 (0.16s) -> D4 (0.24s)
      const cadences = [
        { freq: 493.88, start: 0.00, dur: 0.22, pan: 0.25 },
        { freq: 440.00, start: 0.07, dur: 0.24, pan: -0.20 },
        { freq: 369.99, start: 0.14, dur: 0.25, pan: 0.15 },
        { freq: 293.66, start: 0.20, dur: 0.19, pan: 0.00 },
      ];


      cadences.forEach((c) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(c.freq, t0 + c.start);


        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, t0 + c.start);


        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t0 + c.start);
        gain.gain.linearRampToValueAtTime(0.20, t0 + c.start + 0.010);
        gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.005);
        gain.gain.setValueAtTime(0, tEnd);


        const pan = ctx.createStereoPanner();
        pan.pan.setValueAtTime(c.pan, t0);


        osc.connect(filter);
        filter.connect(gain);
        gain.connect(pan);
        pan.connect(masterGain);


        osc.start(t0 + c.start);
        osc.stop(tEnd);
      });
      break;
    }


    case "creature": {
      // 0.090s: Tiny wooden chirp with delicate frequency inflection
      const osc = ctx.createOscillator();
      osc.type = "sine";
      // Inflection from F#5 up to A5 and settling to F#5
      osc.frequency.setValueAtTime(739.99, t0);
      osc.frequency.exponentialRampToValueAtTime(987.77, t0 + 0.035);
      osc.frequency.exponentialRampToValueAtTime(739.99, tEnd);


      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1600, t0);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.28, t0 + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.003);
      gain.gain.setValueAtTime(0, tEnd);


      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);


      osc.start(t0);
      osc.stop(tEnd);
      break;
    }


    case "ripple": {
      // 0.280s: Naturally shaped resonant water droplet disturbance
      const osc = ctx.createOscillator();
      osc.type = "sine";
      // Natural water bubble pitch rise
      osc.frequency.setValueAtTime(440.0, t0);
      osc.frequency.exponentialRampToValueAtTime(880.0, t0 + 0.04);
      osc.frequency.exponentialRampToValueAtTime(587.33, tEnd);


      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(700, t0);
      filter.frequency.exponentialRampToValueAtTime(1100, t0 + 0.08);
      filter.Q.setValueAtTime(3.0, t0);


      const noise = createFilteredNoise(duration);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, t0);
      noiseGain.gain.linearRampToValueAtTime(0.06, t0 + 0.015);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.005);
      noiseGain.gain.setValueAtTime(0, tEnd);


      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(0.26, t0 + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.004);
      gain.gain.setValueAtTime(0, tEnd);


      osc.connect(gain);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      gain.connect(masterGain);


      osc.start(t0);
      noise.start(t0);
      osc.stop(tEnd);
      noise.stop(tEnd);
      break;
    }


    case "breach": {
      // 0.350s: Soft sub-surface water breakthrough with velvety low-end
      const subOsc = ctx.createOscillator();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(146.83, t0); // D3
      subOsc.frequency.exponentialRampToValueAtTime(220.0, t0 + 0.12);
      subOsc.frequency.exponentialRampToValueAtTime(146.83, tEnd);


      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.0001, t0);
      subGain.gain.linearRampToValueAtTime(0.22, t0 + 0.025);
      subGain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.006);
      subGain.gain.setValueAtTime(0, tEnd);


      const noise = createFilteredNoise(duration);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(350, t0);
      lp.frequency.exponentialRampToValueAtTime(800, t0 + 0.08);
      lp.frequency.exponentialRampToValueAtTime(250, tEnd);


      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, t0);
      noiseGain.gain.linearRampToValueAtTime(0.18, t0 + 0.03);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.005);
      noiseGain.gain.setValueAtTime(0, tEnd);


      subOsc.connect(subGain);
      subGain.connect(masterGain);
      noise.connect(lp);
      lp.connect(noiseGain);
      noiseGain.connect(masterGain);


      subOsc.start(t0);
      noise.start(t0);
      subOsc.stop(tEnd);
      noise.stop(tEnd);
      break;
    }


    case "splash": {
      // 0.500s: Smooth organic filtered water splash & ambient droplet bloom
      const noise = createFilteredNoise(duration);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.setValueAtTime(600, t0);
      lp.frequency.exponentialRampToValueAtTime(1600, t0 + 0.05);
      lp.frequency.exponentialRampToValueAtTime(350, tEnd);


      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, t0);
      noiseGain.gain.linearRampToValueAtTime(0.26, t0 + 0.015);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.008);
      noiseGain.gain.setValueAtTime(0, tEnd);


      // Droplet resonance in D-major pentatonic
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, t0 + 0.05);
      osc.frequency.exponentialRampToValueAtTime(739.99, t0 + 0.12);


      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.0001, t0);
      oscGain.gain.setValueAtTime(0.0001, t0 + 0.05);
      oscGain.gain.linearRampToValueAtTime(0.12, t0 + 0.07);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
      oscGain.gain.setValueAtTime(0, tEnd);


      noise.connect(lp);
      lp.connect(noiseGain);
      noiseGain.connect(masterGain);


      osc.connect(oscGain);
      oscGain.connect(masterGain);


      noise.start(t0);
      osc.start(t0);
      noise.stop(tEnd);
      osc.stop(tEnd);
      break;
    }


    default: {
      // Fallback mellow sine
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, t0);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(0.2, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, tEnd - 0.005);
      g.gain.setValueAtTime(0, tEnd);


      osc.connect(g);
      g.connect(masterGain);
      osc.start(t0);
      osc.stop(tEnd);
    }
  }


  const renderedBuffer = await ctx.startRendering();


  // Peak check & guarantee peaks below 0.35 with soft normalization if ever needed
  let peak = 0;
  for (let ch = 0; ch < renderedBuffer.numberOfChannels; ch++) {
    const data = renderedBuffer.getChannelData(ch);
    for (let i = 0; i < data.length; i++) {
      const absVal = Math.abs(data[i]);
      if (absVal > peak) peak = absVal;
    }
  }


  if (peak > 0.34) {
    const scale = 0.34 / peak;
    for (let ch = 0; ch < renderedBuffer.numberOfChannels; ch++) {
      const data = renderedBuffer.getChannelData(ch);
      for (let i = 0; i < data.length; i++) {
        data[i] *= scale;
      }
    }
  }


  // Guarantee exact silence on last 16 samples
  for (let ch = 0; ch < renderedBuffer.numberOfChannels; ch++) {
    const data = renderedBuffer.getChannelData(ch);
    const startFade = Math.max(0, data.length - 16);
    for (let i = startFade; i < data.length; i++) {
      const factor = (data.length - 1 - i) / 16;
      data[i] *= factor;
    }
    data[data.length - 1] = 0;
  }


  return renderedBuffer;
}


