import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Headphones, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { siteAudio } from '../../lib/audio/siteAudio';
import { collectNarration, locateNarration, wordBounds } from '../../lib/content/narration';

export default function WebSpeechPlayer({ contentRef }) {
  const [supported] = useState(() => 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined');
  const [voices, setVoices] = useState([]), [voiceURI, setVoiceURI] = useState(''), [rate, setRate] = useState(1);
  const [status, setStatus] = useState('idle'), [progress, setProgress] = useState(0), [estimated, setEstimated] = useState(false), [message, setMessage] = useState('');
  const [following, setFollowing] = useState(false);
  const session = useRef({ token: 0, utterance: null, timer: 0, queue: [], position: 0, playing: false, total: 0, element: null });
  const follow = useRef(false), scrollUntil = useRef(0);
  useEffect(()=>{siteAudio.narration(status==='playing');return()=>siteAudio.narration(false);},[status]);
  function clearHighlight() {
    session.current.element?.classList.remove('is-narrating'); session.current.element = null;
    window.CSS?.highlights?.delete('narration');
  }
  function cancel() {
    const active = session.current;
    active.token++; active.utterance = null; active.playing = false;
    clearInterval(active.timer); active.timer = 0;
    if (supported) window.speechSynthesis.cancel();
    clearHighlight();
  }
  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const load = () => {
      const available = synth.getVoices(), english = available.filter(voice => /^en\b/i.test(voice.lang));
      const list = english.length ? english : available; setVoices(list);
      const preferred = english.find(voice => /natural|enhanced|premium|neural/i.test(voice.name)) || english.find(voice => voice.default) || english[0] || list[0];
      setVoiceURI(current => list.some(voice => voice.voiceURI === current) ? current : preferred?.voiceURI || '');
    };
    load(); synth.addEventListener?.('voiceschanged', load);
    const suspend = () => { scrollUntil.current = Date.now() + 4000; };
    const key = event => { if (['PageUp', 'PageDown', 'ArrowUp', 'ArrowDown', 'Home', 'End', ' '].includes(event.key)) suspend(); };
    window.addEventListener('wheel', suspend, { passive: true }); window.addEventListener('touchmove', suspend, { passive: true }); window.addEventListener('keydown', key);
    const active = session.current;
    return () => {
      active.token++; active.utterance = null; active.playing = false; clearInterval(active.timer); synth.cancel();
      active.element?.classList.remove('is-narrating'); window.CSS?.highlights?.delete('narration');
      synth.removeEventListener?.('voiceschanged', load); window.removeEventListener('wheel', suspend); window.removeEventListener('touchmove', suspend); window.removeEventListener('keydown', key);
    };
  }, [supported]);
  function prepare() {
    const active = session.current;
    if (!active.queue.length) { active.queue = collectNarration(contentRef.current); active.total = active.queue.reduce((sum, part) => sum + part.text.length, 0); }
    return active;
  }
  function showPosition(part, char, precise) {
    const active = session.current; active.position = part.offset + char;
    setProgress(active.total ? active.position / active.total * 100 : 0);
    if (active.element !== part.element) {
      clearHighlight(); active.element = part.element; part.element.classList.add('is-narrating');
      if (follow.current && Date.now() >= scrollUntil.current) {
        const rect = part.element.getBoundingClientRect();
        if (rect.top < 120 || rect.bottom > innerHeight - 100) part.element.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    }
    if (!precise || !window.CSS?.highlights || typeof Highlight === 'undefined') return;
    const bounds = wordBounds(part.fullText, part.start + char);
    const locate = value => [...part.points].reverse().find(point => point.start <= value);
    const a = locate(bounds.start), b = locate(Math.max(bounds.start, bounds.end - 1));
    if (!a || !b || !a.node.isConnected || !b.node.isConnected) return;
    const range = new Range(); range.setStart(a.node, bounds.start - a.start); range.setEnd(b.node, bounds.end - b.start);
    CSS.highlights.set('narration', new Highlight(range));
  }
  function playFrom(position, nextRate = rate, nextURI = voiceURI) {
    if (!supported) return;
    const active = prepare(); cancel();
    if (!active.total) { setStatus('error'); setMessage('There is no article text to read yet.'); return; }
    const token = active.token, synth = window.speechSynthesis, voice = voices.find(item => item.voiceURI === nextURI);
    const initial = locateNarration(active.queue, position >= active.total ? 0 : position);
    setMessage(''); setStatus('playing'); active.playing = true;
    function speakPart(index, char = 0) {
      if (active.token !== token) return;
      const part = active.queue[index];
      if (!part) { active.playing = false; active.position = active.total; clearInterval(active.timer); clearHighlight(); setProgress(100); setStatus('ended'); return; }
      const utterance = new SpeechSynthesisUtterance(part.text.slice(char));
      utterance.rate = nextRate; utterance.lang = voice?.lang || 'en-IN'; if (voice) utterance.voice = voice;
      active.utterance = utterance;
      let boundary = false, startedAt = 0;
      setEstimated(false); showPosition(part, char, false);
      utterance.onstart = () => {
        if (active.token !== token) return;
        startedAt = performance.now(); clearInterval(active.timer);
        active.timer = setInterval(() => {
          if (active.token !== token || boundary || !active.playing || !startedAt) return;
          const current = Math.min(part.text.length - 1, char + Math.floor((performance.now() - startedAt) / 1000 * 14 * nextRate));
          setEstimated(true); showPosition(part, current, false);
        }, 500);
      };
      utterance.onboundary = event => {
        if (active.token !== token || (event.name !== 'word' && event.name !== 'sentence')) return;
        boundary = true; setEstimated(false); showPosition(part, Math.min(part.text.length, char + event.charIndex), true);
      };
      utterance.onend = () => { if (active.token !== token) return; clearInterval(active.timer); speakPart(index + 1); };
      utterance.onerror = event => {
        if (active.token !== token) return;
        cancel(); setStatus('error');
        setMessage(event.error === 'not-allowed' ? 'Your browser blocked playback. Press Play again or choose another voice.' : 'This voice could not finish reading. Choose another voice and press Play to continue.');
      };
      try { synth.speak(utterance); } catch { cancel(); setStatus('error'); setMessage('Playback could not start. Choose another voice and try again.'); }
    }
    speakPart(initial.index, initial.char);
  }
  function pause() { cancel(); setStatus('paused'); }
  function seek(percent) {
    const active = prepare(), playing = active.playing, next = locateNarration(active.queue, active.total * percent / 100), part = active.queue[next.index];
    const position = percent >= 100 ? active.total : (part?.offset || 0) + next.char;
    cancel(); active.position = position; setProgress(percent); setEstimated(false);
    if (playing && percent < 100) playFrom(position); else setStatus(percent >= 100 ? 'ended' : 'paused');
  }
  function section(direction) {
    const active = prepare();
    const headings = active.queue.filter(part => /^H[1-4]$/.test(part.element.tagName) && part.start === 0);
    const target = direction > 0 ? headings.find(part => part.offset > active.position + 1) : [...headings].reverse().find(part => part.offset < active.position - 2);
    seek(active.total ? ((target?.offset ?? (direction > 0 ? active.total : 0)) / active.total * 100) : 0);
  }
  function changeRate(value) { setRate(value); if (session.current.playing) playFrom(session.current.position, value); }
  function changeVoice(value) { setVoiceURI(value); if (session.current.playing) playFrom(session.current.position, rate, value); }
  return <section className="narrator" aria-label="Article narrator">
    <div className="narrator-heading"><div><Headphones size={17}/><h2>Listen to this note</h2></div><span>{status === 'playing' ? 'Reading' : status === 'paused' ? 'Paused' : status === 'ended' ? 'Finished' : 'Article narrator'}</span></div>
    {!supported ? <p role="status">This browser does not provide speech playback. The full article is available below.</p> : <>
      <div className="narrator-settings"><label>Voice<select aria-label="Narration voice" value={voiceURI} onChange={event => changeVoice(event.target.value)}>{!voices.length && <option value="">Browser default</option>}{voices.map(voice => <option value={voice.voiceURI} key={voice.voiceURI}>{voice.name} · {voice.lang}{voice.localService ? ' · device' : ''}</option>)}</select></label><label>Speed<select aria-label="Narration speed" value={rate} onChange={event => changeRate(Number(event.target.value))}>{[.75,1,1.25,1.5,2].map(speed => <option value={speed} key={speed}>{speed}×</option>)}</select></label></div>
      <div className="narrator-transport"><button type="button" className="narrator-play" onClick={() => status === 'playing' ? pause() : playFrom(session.current.position)} aria-label={status === 'playing' ? 'Pause narration' : 'Play narration'}>{status === 'playing' ? <Pause size={19}/> : <Play size={19}/>}</button><div className="narrator-timeline"><label htmlFor="narration-progress">{Math.round(progress)}% <span>{estimated ? 'Estimated progress' : 'Reading progress'}</span></label><input id="narration-progress" type="range" min="0" max="100" step="1" value={progress} onChange={event => seek(Number(event.target.value))} aria-label="Narration progress" aria-valuetext={`${Math.round(progress)} percent${estimated ? ', estimated' : ''}`}/></div><button type="button" onClick={() => section(-1)} aria-label="Previous narration section"><SkipBack size={17}/></button><button type="button" onClick={() => section(1)} aria-label="Next narration section"><SkipForward size={17}/></button><button type="button" onClick={() => { const playing = session.current.playing; cancel(); session.current.position = 0; setProgress(0); setEstimated(false); if (playing) playFrom(0); else setStatus('idle'); }} aria-label="Restart narration"><RotateCcw size={16}/></button></div>
      <div className="narrator-foot"><label><input type="checkbox" checked={following} onChange={event => { follow.current = event.target.checked; setFollowing(event.target.checked); }}/>Follow text</label><span>Browser voices. Article text only; code and widgets stay quiet.</span></div>
      {message && <p className="narrator-error" role="alert">{message}</p>}
      {status === 'playing' && <button type="button" className="narrator-floating" onClick={pause} aria-label="Pause article narration"><Pause size={17}/><span>Pause reading</span></button>}
    </>}
  </section>;
}
