export interface SoundItem {
  id: string;
  filename: string;
  duration: number; // in seconds
  description: string;
  category: "Navigation & Action" | "Progress & Narrative" | "Tactile & Physics";
  color: string;
}


export const SOUND_ITEMS: SoundItem[] = [
  {
    id: "hover",
    filename: "hover.wav",
    duration: 0.035,
    description: "Ultra-soft micro felt touch with gentle low-pass cutoff",
    category: "Navigation & Action",
    color: "#60A5FA",
  },
  {
    id: "click",
    filename: "click.wav",
    duration: 0.070,
    description: "Soft tactile rounded glass tap, dual mellow partials",
    category: "Navigation & Action",
    color: "#38BDF8",
  },
  {
    id: "select",
    filename: "select.wav",
    duration: 0.110,
    description: "Gentle ascending D-major harmonic chime interval",
    category: "Navigation & Action",
    color: "#818CF8",
  },
  {
    id: "section",
    filename: "section.wav",
    duration: 0.220,
    description: "Airy, breathy wooden mallet transition with stereo warmth",
    category: "Navigation & Action",
    color: "#A78BFA",
  },
  {
    id: "chapter",
    filename: "chapter.wav",
    duration: 0.450,
    description: "Soft time-skip sweep, gentle low-pass filter glide",
    category: "Progress & Narrative",
    color: "#F472B6",
  },
  {
    id: "building",
    filename: "building.wav",
    duration: 0.060,
    description: "Single quiet D5 marimba pluck designed for hundreds of contribution tiles",
    category: "Progress & Narrative",
    color: "#FB923C",
  },
  {
    id: "replay",
    filename: "replay.wav",
    duration: 0.320,
    description: "Gentle rewind and lift with ascending soft pentatonic swell",
    category: "Progress & Narrative",
    color: "#FBBF24",
  },
  {
    id: "city-complete",
    filename: "city-complete.wav",
    duration: 0.650,
    description: "Restrained, warm pentatonic cadence with glowing tail",
    category: "Progress & Narrative",
    color: "#34D399",
  },
  {
    id: "scatter",
    filename: "scatter.wav",
    duration: 0.250,
    description: "Fine paper-like velvet grains gently dispersing in stereo",
    category: "Tactile & Physics",
    color: "#94A3B8",
  },
  {
    id: "reform",
    filename: "reform.wav",
    duration: 0.400,
    description: "Restrained pentatonic convergence cadence drawing elements home",
    category: "Tactile & Physics",
    color: "#2DD4BF",
  },
  {
    id: "creature",
    filename: "creature.wav",
    duration: 0.090,
    description: "Tiny wooden chirp with delicate frequency inflection",
    category: "Tactile & Physics",
    color: "#A3E635",
  },
  {
    id: "ripple",
    filename: "ripple.wav",
    duration: 0.280,
    description: "Naturally shaped resonant water droplet disturbance",
    category: "Tactile & Physics",
    color: "#22D3EE",
  },
  {
    id: "breach",
    filename: "breach.wav",
    duration: 0.350,
    description: "Soft sub-surface water breakthrough with velvety low-end",
    category: "Tactile & Physics",
    color: "#06B6D4",
  },
  {
    id: "splash",
    filename: "splash.wav",
    duration: 0.500,
    description: "Smooth organic filtered water splash & ambient droplet bloom",
    category: "Tactile & Physics",
    color: "#0EA5E9",
  },
];


