import React, { useState, useRef, useEffect } from "react";
import { Play, Download, Check, Volume2, Sparkles, FolderArchive, Music, AlertCircle, ExternalLink, RefreshCw } from "lucide-react";
import { SOUND_ITEMS, SoundItem } from "./soundDefs";
import { renderSoundBuffer } from "./soundSynth";
import { encodeAudioBufferToWav } from "./wavEncoder";
import { createZipArchive, ZipFileEntry } from "./zipWriter";


// Robust download trigger that handles sandboxed iframes & popup blockers
function triggerBrowserDownload(
  bytes: Uint8Array,
  filename: string,
  mimeType: string,
  onBlocked?: (url: string) => void
) {
  // 1. Create standard Blob URL with copy to ArrayBuffer
  const copy = new Uint8Array(bytes.length);
  copy.set(bytes);
  const blob = new Blob([copy.buffer], {
    type: mimeType,
  });
  const objectUrl = URL.createObjectURL(blob);


  let downloadInitiated = false;


  try {
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    a.rel = "noopener noreferrer";
    a.target = "_blank"; // Helpful fallback if download attribute is restricted in sandbox
    a.style.display = "none";
    document.body.appendChild(a);


    // Synchronous click
    a.click();
    downloadInitiated = true;


    // Do NOT revoke immediately — allow plenty of time (60 seconds) for browser consumption
    setTimeout(() => {
      try {
        if (a.parentNode) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(objectUrl);
      } catch (_) {}
    }, 60000);
  } catch (err) {
    console.warn("Anchor click failed:", err);
  }


  // Also notify fallback handler if requested so the user has an explicit direct link/button
  if (onBlocked) {
    onBlocked(objectUrl);
  }


  return objectUrl;
}


export default function Component() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");


  // Pre-rendered status & buffer storage
  const [renderedStatus, setRenderedStatus] = useState<"idle" | "rendering" | "ready" | "error">("idle");
  const [renderedCount, setRenderedCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // Download states
  const [zipBlobUrl, setZipBlobUrl] = useState<string | null>(null);
  const [downloadSuccessZip, setDownloadSuccessZip] = useState(false);
  const [downloadedSingleId, setDownloadedSingleId] = useState<string | null>(null);


  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());
  const wavBytesRef = useRef<Map<string, Uint8Array>>(new Map());
  const zipBytesRef = useRef<Uint8Array | null>(null);


  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext({ sampleRate: 48000 });
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };


  // Pre-render all 14 sound effects automatically into memory on load
  const preRenderAllSounds = async () => {
    setRenderedStatus("rendering");
    setErrorMessage(null);
    setRenderedCount(0);


    try {
      const zipEntries: ZipFileEntry[] = [];


      for (let i = 0; i < SOUND_ITEMS.length; i++) {
        const item = SOUND_ITEMS[i];
        let buf = audioBuffersRef.current.get(item.id);
        if (!buf) {
          buf = await renderSoundBuffer(item.id, item.duration);
          audioBuffersRef.current.set(item.id, buf);
        }


        let wav = wavBytesRef.current.get(item.id);
        if (!wav) {
          wav = encodeAudioBufferToWav(buf);
          wavBytesRef.current.set(item.id, wav);
        }


        zipEntries.push({
          filename: item.filename,
          data: wav,
        });


        setRenderedCount(i + 1);
      }


      // Generate ZIP archive
      const zipBytes = createZipArchive(zipEntries);
      zipBytesRef.current = zipBytes;


      // Create permanent Blob URL for the ready ZIP
      const copyZip = new Uint8Array(zipBytes.length);
      copyZip.set(zipBytes);
      const blob = new Blob([copyZip.buffer], {
        type: "application/zip",
      });
      const url = URL.createObjectURL(blob);
      setZipBlobUrl(url);


      setRenderedStatus("ready");
    } catch (err) {
      console.error("Rendering failed:", err);
      setErrorMessage(err instanceof Error ? err.message : "Sound synthesis error");
      setRenderedStatus("error");
    }
  };


  // Run initial synthesis on mount
  useEffect(() => {
    preRenderAllSounds();
  }, []);


  const handlePreview = async (sound: SoundItem) => {
    try {
      const ctx = getAudioContext();
      if (currentSourceRef.current) {
        try {
          currentSourceRef.current.stop();
        } catch (_) {}
      }


      setPlayingId(sound.id);


      let buffer = audioBuffersRef.current.get(sound.id);
      if (!buffer) {
        buffer = await renderSoundBuffer(sound.id, sound.duration);
        audioBuffersRef.current.set(sound.id, buffer);
      }


      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      currentSourceRef.current = src;


      src.onended = () => {
        setPlayingId((curr) => (curr === sound.id ? null : curr));
      };


      src.start();
    } catch (e) {
      console.error("Playback error:", e);
      setPlayingId(null);
    }
  };


  const handleDownloadSingleWav = async (sound: SoundItem) => {
    try {
      setDownloadedSingleId(sound.id);


      let wavBytes = wavBytesRef.current.get(sound.id);
      if (!wavBytes) {
        let buffer = audioBuffersRef.current.get(sound.id);
        if (!buffer) {
          buffer = await renderSoundBuffer(sound.id, sound.duration);
          audioBuffersRef.current.set(sound.id, buffer);
        }
        wavBytes = encodeAudioBufferToWav(buffer);
        wavBytesRef.current.set(sound.id, wavBytes);
      }


      triggerBrowserDownload(wavBytes, sound.filename, "audio/wav");


      setTimeout(() => {
        setDownloadedSingleId((curr) => (curr === sound.id ? null : curr));
      }, 2000);
    } catch (err) {
      console.error("Single WAV download error:", err);
      setDownloadedSingleId(null);
    }
  };


  const handleDownloadAllZip = () => {
    if (!zipBytesRef.current) {
      preRenderAllSounds();
      return;
    }


    try {
      setDownloadSuccessZip(true);
      triggerBrowserDownload(zipBytesRef.current, "portfolio-sound-kit.zip", "application/zip");
      setTimeout(() => setDownloadSuccessZip(false), 3000);
    } catch (err) {
      console.error("ZIP download trigger error:", err);
    }
  };


  const categories = ["All", "Navigation & Action", "Progress & Narrative", "Tactile & Physics"];
  const filteredSounds =
    activeCategory === "All"
      ? SOUND_ITEMS
      : SOUND_ITEMS.filter((s) => s.category === activeCategory);


  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-stone-950 text-stone-100 p-4 sm:p-6 md:p-8 font-sans selection:bg-amber-400 selection:text-stone-900">
      <div className="w-full max-w-4xl bg-stone-900/95 border border-stone-800/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-700/50">
                <Sparkles className="w-3 h-3 mr-1" /> Original Interface Kit
              </span>
              <span className="text-xs text-stone-400 font-mono">D-Major Pentatonic</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-50">
              Little Useful Things
            </h1>
            <p className="text-sm text-stone-400 mt-1 max-w-xl leading-relaxed">
              Warm, soft interface sound effects synthesized in browser with OfflineAudioContext.
              Felt mallet partials, rounded glass, marimba plucks, and gentle water grains. Stereo 48kHz, peaks &lt; 0.35, zero harshness.
            </p>
          </div>


          {/* Download All ZIP Controls */}
          <div className="flex flex-col items-stretch sm:items-end gap-2.5">
            <button
              onClick={handleDownloadAllZip}
              disabled={renderedStatus === "rendering"}
              className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-150 shadow-lg ${
                downloadSuccessZip
                  ? "bg-emerald-600 text-white shadow-emerald-950/40"
                  : renderedStatus === "rendering"
                  ? "bg-amber-800 text-stone-300 cursor-wait opacity-90"
                  : "bg-amber-500 hover:bg-amber-400 text-stone-950 hover:shadow-amber-500/20 active:scale-[0.98]"
              }`}
            >
              {renderedStatus === "rendering" ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing ({renderedCount}/14)...</span>
                </>
              ) : downloadSuccessZip ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Triggered Download!</span>
                </>
              ) : (
                <>
                  <FolderArchive className="w-4 h-4" />
                  <span>Download all WAVs ZIP</span>
                </>
              )}
            </button>


            {/* Direct fallback link in case iframe blocks programmatic click */}
            {zipBlobUrl && (
              <a
                href={zipBlobUrl}
                download="portfolio-sound-kit.zip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-amber-400/80 hover:text-amber-300 underline flex items-center justify-center sm:justify-end gap-1 font-mono transition-colors"
              >
                <span>Direct link (fallback)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}


            <span className="text-[11px] text-stone-500 font-mono text-center sm:text-right">
              14 Stereo 48kHz WAVs • Pure OfflineAudioContext
            </span>
          </div>
        </div>


        {/* Rendering Status Banner */}
        {renderedStatus === "rendering" && (
          <div className="mt-4 p-3 bg-stone-950/80 border border-stone-800 rounded-xl flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Rendering all 14 stereo 48kHz buffers into memory...</span>
            </div>
            <span className="font-mono text-amber-400">{renderedCount} / 14</span>
          </div>
        )}


        {renderedStatus === "error" && (
          <div className="mt-4 p-3 bg-rose-950/50 border border-rose-800/80 rounded-xl flex items-center justify-between text-xs text-rose-300">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage || "Audio render error"}</span>
            </div>
            <button
              onClick={preRenderAllSounds}
              className="px-2.5 py-1 bg-rose-900 hover:bg-rose-800 text-rose-100 rounded text-[11px] font-medium"
            >
              Retry
            </button>
          </div>
        )}


        {/* Categories Bar & Quick Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 pb-4">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-950/60 rounded-xl border border-stone-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-stone-800 text-amber-300 shadow-sm"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>


          <div className="flex items-center gap-4 text-xs text-stone-400 font-mono">
            <span>Peaks: &lt; 0.35</span>
            <span>•</span>
            <span>Rate: 48,000 Hz</span>
            <span>•</span>
            <span>16-bit PCM</span>
          </div>
        </div>


        {/* Sound FX Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          {filteredSounds.map((sound) => {
            const isPlaying = playingId === sound.id;
            const isSingleDownloaded = downloadedSingleId === sound.id;
            const hasWav = wavBytesRef.current.has(sound.id);


            return (
              <div
                key={sound.id}
                className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-150 ${
                  isPlaying
                    ? "bg-stone-800/90 border-amber-500/50 shadow-md ring-1 ring-amber-500/30"
                    : "bg-stone-950/50 hover:bg-stone-950/80 border-stone-800/80 hover:border-stone-700/80"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                  {/* Preview Button */}
                  <button
                    onClick={() => handlePreview(sound)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-90 ${
                      isPlaying
                        ? "bg-amber-400 text-stone-950 shadow-md scale-105"
                        : "bg-stone-800 text-stone-200 hover:bg-amber-500/20 hover:text-amber-300"
                    }`}
                    title={`Preview ${sound.filename}`}
                  >
                    {isPlaying ? (
                      <Volume2 className="w-5 h-5 animate-pulse" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    )}
                  </button>


                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-stone-200 truncate">
                        {sound.filename}
                      </span>
                      <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 shrink-0">
                        {Math.round(sound.duration * 1000)}ms
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 truncate mt-0.5">
                      {sound.description}
                    </p>
                  </div>
                </div>


                {/* Individual Download Action */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleDownloadSingleWav(sound)}
                    className={`p-2 rounded-lg transition-colors ${
                      isSingleDownloaded
                        ? "text-emerald-400 bg-stone-800"
                        : "text-stone-400 hover:text-stone-100 hover:bg-stone-800"
                    }`}
                    title={`Download ${sound.filename}`}
                  >
                    {isSingleDownloaded ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        {/* Kit Specification / Design Notes Footer */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <div className="flex items-center gap-2">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Tuned to D-major pentatonic (D4, E4, F#4, A4, B4, D5, F#5, A5)</span>
          </div>
          <span className="text-stone-400">Zero external assets • Pure Web Audio DSP</span>
        </div>
      </div>
    </div>
  );
}


