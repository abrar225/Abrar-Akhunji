import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, ChevronLeft, Code, Square, Cpu, Layout, FileCode2, Paintbrush, Loader2, Zap, Monitor, Smartphone, Tablet, Copy, Check, Terminal } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const BUILDER_CONTEXT = `
You are FixO The Builder, an expert UI/UX developer and creative designer.
Your goal is to build stunning, modern, and beautiful web interfaces.
When the user asks you to build or design something, you must return EXACTLY THREE markdown code blocks:
1. \`\`\`html (The HTML structure, do not include <html> or <body> tags, just the inner content)
2. \`\`\`css (The CSS styling, use modern aesthetics, flexbox, grid, glassmorphism if applicable)
3. \`\`\`javascript (The interactive JS logic)

DO NOT return any other text, explanations, or conversational filler. ONLY the code blocks.
`;

const AVAILABLE_MODELS = [
  { id: "minimax/minimax-m2.5:free", name: "Minimax M2.5 (Fast)" },
  { id: "google/gemma-3-27b-it:free", name: "Google Gemma 3" },
  { id: "openai/gpt-oss-120b:free", name: "GPT OSS 120B" },
  { id: "nvidia/nemotron-nano-9b-v2:free", name: "Nvidia Nemotron" },
  { id: "liquid/lfm-2.5-1.2b-thinking:free", name: "Liquid LFM Thinking" },
  { id: "inclusionai/ling-2.6-flash:free", name: "Ling Flash 2.6" }
];

const PRESETS = ["Minimal", "Futuristic", "Glassmorphic"];

const BuilderMode = ({ theme, initialModel, onExit }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I am FixO The Builder. What are we creating today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(0); 
  const [previewCode, setPreviewCode] = useState({ html: '', css: '', js: '' });
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedModel, setSelectedModel] = useState(initialModel || AVAILABLE_MODELS[0].id);
  const [builderCredits, setBuilderCredits] = useState(1);
  const [deviceView, setDeviceView] = useState('desktop'); // desktop, tablet, mobile
  const [codeTab, setCodeTab] = useState('html'); // html, css, js
  const [isCopied, setIsCopied] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const resetTime = localStorage.getItem('fixo_builder_reset');
    const storedCredits = localStorage.getItem('fixo_builder_credits');
    const now = Date.now();
    
    if (!resetTime || now > parseInt(resetTime)) {
      localStorage.setItem('fixo_builder_reset', (now + 24 * 60 * 60 * 1000).toString());
      localStorage.setItem('fixo_builder_credits', '1');
      setBuilderCredits(1);
    } else if (storedCredits) {
      setBuilderCredits(parseInt(storedCredits));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, generationStep]);

  useEffect(() => {
    if (previewCode.html || previewCode.css || previewCode.js) {
      const combinedCode = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Inter', system-ui, sans-serif; margin: 0; min-height: 100vh; background: ${theme === 'dark' ? '#0a0a0c' : '#ffffff'}; color: ${theme === 'dark' ? '#ffffff' : '#000000'}; overflow-x: hidden; }
            ${previewCode.css}
          </style>
        </head>
        <body>
          ${previewCode.html}
          <script>
            ${previewCode.js}
          </script>
        </body>
        </html>
      `;
      const blob = new Blob([combinedCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      
      return () => URL.revokeObjectURL(url);
    }
  }, [previewCode, theme]);

  const parseCodeBlocks = (text) => {
    const htmlMatch = text.match(/```html\n([\s\S]*?)```/) || text.match(/```html([\s\S]*?)```/);
    const cssMatch = text.match(/```css\n([\s\S]*?)```/) || text.match(/```css([\s\S]*?)```/);
    const jsMatch = text.match(/```(?:javascript|js)\n([\s\S]*?)```/) || text.match(/```(?:javascript|js)([\s\S]*?)```/);

    if (htmlMatch || cssMatch || jsMatch) {
      setPreviewCode({
        html: htmlMatch ? htmlMatch[1].trim() : '',
        css: cssMatch ? cssMatch[1].trim() : '',
        js: jsMatch ? jsMatch[1].trim() : ''
      });
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setGenerationStep(0);
      setMessages(prev => [...prev, { role: 'ai', text: "Process interrupted." }]);
    }
  };

  const simulateProgress = () => {
    setGenerationStep(1);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(2) }, 1500);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(3) }, 4000);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(4) }, 6500);
  };

  const handleSendMessage = async (overrideText = null) => {
    if (builderCredits <= 0) {
      setMessages(prev => [...prev, { role: 'ai', text: "You have reached your daily limit of 1 builder generation. Please come back tomorrow!" }]);
      return;
    }

    const textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInputValue("");
    setIsLoading(true);
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    simulateProgress();

    try {
      let response;
      let data;
      
      const requestBody = JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: BUILDER_CONTEXT },
          ...messages.filter(m => m.role === 'user').slice(-3),
          { role: "user", content: textToSend }
        ],
        mode: "builder"
      });

      if (import.meta.env.DEV) {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: requestBody,
          signal
        });
        data = await response.json();
      } else {
        response = await fetch("/api/chat", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody,
          signal
        });
        data = await response.json();
      }

      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', text: "Rate limit exceeded. Please wait a minute." }]);
        setIsLoading(false);
        setGenerationStep(0);
        return;
      }

      const aiResponseText = data.choices?.[0]?.message?.content || "";
      if (aiResponseText) {
        setMessages(prev => [...prev, { role: 'ai', text: "Render complete." }]);
        parseCodeBlocks(aiResponseText);
        const newCredits = builderCredits - 1;
        setBuilderCredits(newCredits);
        localStorage.setItem('fixo_builder_credits', newCredits.toString());
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Generation failed." }]);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to the Builder API." }]);
      }
    } finally {
      setIsLoading(false);
      setGenerationStep(0);
      abortControllerRef.current = null;
    }
  };

  const handleDownload = async () => {
    if (!previewCode.html && !previewCode.css && !previewCode.js) return;
    const zip = new JSZip();
    const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FixO Generated UI</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    ${previewCode.html}
    <script src="script.js"></script>
</body>
</html>`;

    zip.file("index.html", indexHtml.trim());
    zip.file("style.css", previewCode.css || "/* No CSS generated */");
    zip.file("script.js", previewCode.js || "// No JS generated");

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "fixo-generated-ui.zip");
  };

  const copyToClipboard = () => {
    const code = previewCode[codeTab];
    if (!code) return;
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const steps = [
    { step: 1, text: "Analyzing context...", icon: <Cpu size={12} className="animate-pulse text-violet-400" /> },
    { step: 2, text: "Structuring layout...", icon: <Layout size={12} className="animate-pulse text-fuchsia-400" /> },
    { step: 3, text: "Applying styles...", icon: <Paintbrush size={12} className="animate-pulse text-pink-400" /> },
    { step: 4, text: "Injecting logic...", icon: <FileCode2 size={12} className="animate-pulse text-rose-400" /> }
  ];

  return (
    <div className={`flex h-full w-full overflow-hidden ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#fcfcfc]'}`}>
      
      {/* 1. LEFT PANEL (Prompt & Controls) */}
      <div className={`w-[320px] flex flex-col flex-shrink-0 border-r ${theme === 'dark' ? 'border-white/[0.05] bg-white/[0.01]' : 'border-black/[0.05] bg-black/[0.01]'} backdrop-blur-3xl z-10 relative shadow-[10px_0_30px_-15px_rgba(0,0,0,0.5)]`}>
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
          <div className="flex items-center gap-3">
            <button onClick={onExit} className={`p-1.5 rounded-full hover:bg-black/10 ${theme === 'dark' ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'text-black/50 hover:text-black'} transition-all hover:scale-105 active:scale-95`}>
              <ChevronLeft size={18} />
            </button>
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Code size={12} className="text-white" />
              </div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black animate-pulse"></div>
            </div>
            <span className={`text-sm font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400`}>FixO IDE</span>
          </div>
        </div>

        {/* Settings / Controls */}
        <div className="p-4 space-y-4">
          <div>
            <label className={`text-[10px] font-medium uppercase tracking-wider mb-2 block ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={`w-full text-[11px] p-2.5 rounded-xl border focus:outline-none appearance-none cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'bg-white/[0.03] border-white/[0.05] text-white/80 hover:border-violet-500/50 hover:bg-white/[0.05]' 
                  : 'bg-black/[0.02] border-black/[0.05] text-black/80 hover:border-violet-500/50 hover:bg-black/[0.05]'
              }`}
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model.id} value={model.id} className="bg-black text-white">{model.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`text-[10px] font-medium uppercase tracking-wider mb-2 block ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Presets</label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(preset => (
                <button key={preset} onClick={() => setInputValue(`Build a ${preset.toLowerCase()} hero section`)} className={`text-[10px] px-3 py-1.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'bg-white/[0.03] border-white/[0.05] text-white/60 hover:text-white hover:border-white/20' : 'bg-black/[0.03] border-black/[0.05] text-black/60 hover:text-black hover:border-black/20'}`}>
                  {preset}
                </button>
              ))}
            </div>
          </div>
          
          <div className={`p-3 rounded-xl border flex items-center justify-between ${builderCredits > 0 ? (theme === 'dark' ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-violet-500/10 border-violet-500/20 text-violet-700') : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            <span className="text-xs font-medium">Daily Limit</span>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Zap size={12} className={builderCredits > 0 ? "fill-current" : ""} />
              {builderCredits}/1
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative">
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10 opacity-50"></div>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-3 rounded-2xl text-xs leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-sm' 
                  : `${theme === 'dark' ? 'bg-white/[0.03] border-white/[0.05] text-white/80' : 'bg-black/[0.03] border-black/[0.05] text-black/80'} rounded-bl-sm border backdrop-blur-md`
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && generationStep > 0 && (
            <div className={`flex justify-start`}>
              <div className={`w-full p-4 rounded-2xl rounded-bl-sm border backdrop-blur-md ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.05] text-white/70' : 'bg-black/[0.02] border-black/[0.05] text-black/70'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
                  <span className="font-semibold text-[10px] text-violet-400 uppercase tracking-widest">Generating</span>
                </div>
                <div className="space-y-3">
                  {steps.map(s => (
                    <div key={s.step} className={`flex items-center gap-3 text-xs transition-opacity duration-500 ${generationStep >= s.step ? 'opacity-100' : 'opacity-20'}`}>
                      {s.icon}
                      <span className={generationStep === s.step ? 'text-white font-medium' : ''}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/[0.05] bg-black/20' : 'border-black/[0.05] bg-white/20'} backdrop-blur-xl`}>
          <div className={`relative flex items-end gap-2 p-1.5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/[0.03] border-white/[0.1] focus-within:border-violet-500/50 focus-within:bg-white/[0.05]' : 'bg-black/[0.03] border-black/[0.1] focus-within:border-violet-500/50 focus-within:bg-black/[0.05]'}`}>
            <textarea 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Describe the UI..." 
              disabled={isLoading || builderCredits <= 0}
              rows={2}
              className="flex-1 bg-transparent text-xs p-2.5 resize-none focus:outline-none custom-scrollbar disabled:opacity-50" 
            />
            {isLoading ? (
              <button onClick={handleStop} className="p-2 mb-1 mr-1 bg-rose-500/20 text-rose-500 rounded-xl hover:bg-rose-500/30 transition-all active:scale-95" title="Stop">
                <Square size={16} className="fill-current" />
              </button>
            ) : (
              <button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || builderCredits <= 0} className="p-2 mb-1 mr-1 bg-white text-black rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Send size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. CENTER PANEL (Live Preview) */}
      <div className="flex-1 flex flex-col relative z-0">
        <div className={`flex items-center justify-between px-4 py-3 border-b ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]' : 'border-black/[0.05] bg-white'}`}>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowRightPanel(!showRightPanel)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${showRightPanel ? 'bg-violet-500/20 text-violet-400' : (theme === 'dark' ? 'hover:bg-white/5 text-white/50 hover:text-white' : 'hover:bg-black/5 text-black/50 hover:text-black')}`}>
              <Terminal size={14} /> Code
            </button>
          </div>
          
          {/* Fake Browser URL Bar */}
          <div className={`flex-1 max-w-md mx-4 flex items-center justify-center px-4 py-1.5 rounded-full border text-[10px] font-mono tracking-wide ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.05] text-white/30' : 'bg-black/[0.02] border-black/[0.05] text-black/40'}`}>
            <span className="opacity-50">https://</span>fixo.build/preview
          </div>

          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
            <button onClick={() => setDeviceView('desktop')} className={`p-1.5 rounded-md transition-all ${deviceView === 'desktop' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}><Monitor size={14} /></button>
            <button onClick={() => setDeviceView('tablet')} className={`p-1.5 rounded-md transition-all ${deviceView === 'tablet' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}><Tablet size={14} /></button>
            <button onClick={() => setDeviceView('mobile')} className={`p-1.5 rounded-md transition-all ${deviceView === 'mobile' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80'}`}><Smartphone size={14} /></button>
          </div>
        </div>

        {/* Browser Canvas */}
        <div className={`flex-1 p-4 md:p-8 overflow-hidden flex items-center justify-center relative ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f0f0f0]'}`}>
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>
          
          <div className={`relative transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col overflow-hidden shadow-2xl rounded-xl border ${theme === 'dark' ? 'border-white/[0.1] bg-[#0a0a0c]' : 'border-black/[0.1] bg-white'} ${
            deviceView === 'desktop' ? 'w-full h-full' :
            deviceView === 'tablet' ? 'w-[768px] h-full shadow-[0_0_50px_rgba(0,0,0,0.5)]' :
            'w-[375px] h-[812px] shadow-[0_0_50px_rgba(0,0,0,0.5)]'
          }`}>
            
            {/* Fake macOS Window Controls */}
            <div className={`h-8 w-full border-b flex items-center px-4 gap-2 ${theme === 'dark' ? 'bg-[#1a1a1c] border-white/5' : 'bg-[#f5f5f5] border-black/5'}`}>
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
            </div>

            {previewUrl ? (
              <iframe 
                src={previewUrl} 
                className={`w-full h-full border-none transition-opacity duration-700 ${isLoading ? 'opacity-30' : 'opacity-100'} bg-white`}
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex-1 flex items-center justify-center flex-col gap-4">
                <div className="w-16 h-16 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                  <Layout size={24} className="text-white/20" />
                </div>
                <p className="text-xs font-mono text-white/30 tracking-widest uppercase">Canvas Empty</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. RIGHT PANEL (Code Output) */}
      <div className={`w-[360px] flex-shrink-0 flex flex-col border-l transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${showRightPanel ? 'translate-x-0' : 'translate-x-full absolute right-0 h-full shadow-2xl z-20'} ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]' : 'border-black/[0.05] bg-white'}`}>
        
        {/* Code Tabs Header */}
        <div className={`flex items-center justify-between p-2 border-b ${theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
          <div className="flex gap-1">
            {['html', 'css', 'js'].map(tab => (
              <button 
                key={tab} 
                onClick={() => setCodeTab(tab)} 
                className={`px-4 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-all ${
                  codeTab === tab 
                    ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black') 
                    : (theme === 'dark' ? 'text-white/40 hover:bg-white/5 hover:text-white/70' : 'text-black/40 hover:bg-black/5 hover:text-black/70')
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 pr-2">
            <button onClick={copyToClipboard} className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'text-white/40 hover:bg-white/10 hover:text-white' : 'text-black/40 hover:bg-black/10 hover:text-black'}`} title="Copy Code">
              {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
            <button onClick={handleDownload} disabled={!previewUrl} className={`p-1.5 rounded-lg transition-all disabled:opacity-30 ${theme === 'dark' ? 'text-white/40 hover:bg-white/10 hover:text-white' : 'text-black/40 hover:bg-black/10 hover:text-black'}`} title="Download ZIP">
              <Download size={14} />
            </button>
          </div>
        </div>

        {/* Code View */}
        <div className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${theme === 'dark' ? 'bg-[#050505]' : 'bg-gray-50'}`}>
          {previewCode[codeTab] ? (
            <pre className={`text-[11px] font-mono leading-relaxed whitespace-pre-wrap ${
              codeTab === 'html' ? 'text-blue-400' :
              codeTab === 'css' ? 'text-pink-400' :
              'text-yellow-400'
            }`}>
              {previewCode[codeTab]}
            </pre>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-xs font-mono text-white/20 uppercase tracking-widest">No code yet</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default BuilderMode;
