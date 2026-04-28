import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, ChevronLeft, Code, Square, Cpu, Layout, FileCode2, Paintbrush, Zap, Monitor, Smartphone, Tablet, Copy, Check, Terminal, Play, Maximize, Columns, Settings, Lock, CheckCircle2, AlertCircle, X } from 'lucide-react';
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

const DEFAULT_MODELS = [
  { id: "minimax/minimax-m2.5:free", name: "Minimax M2.5 (Fast)" },
  { id: "google/gemma-3-27b-it:free", name: "Google Gemma 3" },
  { id: "openai/gpt-oss-120b:free", name: "GPT OSS 120B" },
  { id: "nvidia/nemotron-nano-9b-v2:free", name: "Nvidia Nemotron" },
  { id: "liquid/lfm-2.5-1.2b-thinking:free", name: "Liquid LFM Thinking" },
  { id: "inclusionai/ling-2.6-flash:free", name: "Ling Flash 2.6" }
];

const PRESETS = [
  "Build a SaaS landing page",
  "Create a dark-mode dashboard",
  "Design a glassmorphic hero section"
];

const BuilderMode = ({ theme, initialModel, onExit }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I am FixO The Builder. What are we creating today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(0); 
  const [previewCode, setPreviewCode] = useState({ html: '', css: '', js: '' });
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [builderCredits, setBuilderCredits] = useState(1);
  const [deviceView, setDeviceView] = useState('desktop'); 
  const [codeTab, setCodeTab] = useState('html'); 
  const [isCopied, setIsCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Responsive / Panel states
  const [activeView, setActiveView] = useState('split'); // 'preview', 'code', 'split'
  const [mobileTab, setMobileTab] = useState('prompt'); // 'prompt', 'preview', 'code'
  
  // API Key & Provider Settings
  const [showSettings, setShowSettings] = useState(false);
  const [provider, setProvider] = useState(localStorage.getItem('fixo_custom_provider') || 'openrouter');
  const [apiKey, setApiKey] = useState(localStorage.getItem('fixo_custom_api_key') || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [fetchedModels, setFetchedModels] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fixo_custom_models')) || [];
    } catch {
      return [];
    }
  });
  
  const activeModels = fetchedModels.length > 0 ? fetchedModels : DEFAULT_MODELS;
  const [selectedModel, setSelectedModel] = useState(initialModel || activeModels[0].id);

  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && activeView === 'split') {
        setActiveView('preview');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeView]);

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
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

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
      setHasGenerated(true);
      
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
      if (window.innerWidth < 768) {
        setMobileTab('preview');
      }
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
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(2) }, 1000);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(3) }, 3000);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(4) }, 5000);
  };

  const handleVerifyAndFetch = async () => {
    if (!apiKey.trim()) return;
    setIsVerifying(true);
    setVerificationStatus(null);
    try {
      let url = '';
      let headers = { 'Authorization': `Bearer ${apiKey}` };
      
      if (provider === 'openrouter') {
        url = 'https://openrouter.ai/api/v1/models';
      } else if (provider === 'openai') {
        url = 'https://api.openai.com/v1/models';
      } else if (provider === 'gemini') {
        url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        headers = {}; 
      }

      if (url) {
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error("Invalid Key");
        const data = await res.json();
        
        let modelsList = [];
        if (provider === 'openrouter' || provider === 'openai') {
          modelsList = data.data.map(m => ({ id: m.id, name: m.id })).filter(m => !m.id.includes('embedding') && !m.id.includes('dall-e') && !m.id.includes('tts') && !m.id.includes('whisper'));
        } else if (provider === 'gemini') {
          modelsList = data.models.map(m => ({ id: m.name, name: m.displayName || m.name })).filter(m => m.id.includes('gemini'));
        }
        
        setFetchedModels(modelsList);
        if (modelsList.length > 0) setSelectedModel(modelsList[0].id);
        
        localStorage.setItem('fixo_custom_provider', provider);
        localStorage.setItem('fixo_custom_api_key', apiKey);
        localStorage.setItem('fixo_custom_models', JSON.stringify(modelsList));
      } else {
        localStorage.setItem('fixo_custom_provider', provider);
        localStorage.setItem('fixo_custom_api_key', apiKey);
      }
      
      setVerificationStatus('success');
      setTimeout(() => setShowSettings(false), 1500);
    } catch (error) {
      setVerificationStatus('error');
      setFetchedModels([]);
    }
    setIsVerifying(false);
  };

  const handleClearKey = () => {
    setApiKey('');
    setFetchedModels([]);
    setVerificationStatus(null);
    localStorage.removeItem('fixo_custom_provider');
    localStorage.removeItem('fixo_custom_api_key');
    localStorage.removeItem('fixo_custom_models');
    setSelectedModel(DEFAULT_MODELS[0].id);
  };

  const handleSendMessage = async (overrideText = null) => {
    const isUsingCustomKey = !!localStorage.getItem('fixo_custom_api_key');
    
    if (!isUsingCustomKey && builderCredits <= 0) {
      setMessages(prev => [...prev, { role: 'ai', text: "You have reached your daily limit of 1 free generation. Please add your own API Key in Settings to continue building!" }]);
      setShowSettings(true);
      return;
    }

    const textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setInputValue("");
    setIsLoading(true);
    setHasGenerated(false);
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    simulateProgress();

    try {
      let response;
      let data;
      
      const requestBody = {
        model: selectedModel,
        messages: [
          { role: "system", content: BUILDER_CONTEXT },
          ...messages.filter(m => m.role === 'user').slice(-3),
          { role: "user", content: textToSend }
        ]
      };

      const customKey = localStorage.getItem('fixo_custom_api_key');
      const customProvider = localStorage.getItem('fixo_custom_provider');

      if (customKey && customProvider === 'openrouter') {
         response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${customKey}` },
          body: JSON.stringify(requestBody),
          signal
        });
      } else if (customKey && customProvider === 'openai') {
         response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${customKey}` },
          body: JSON.stringify(requestBody),
          signal
        });
      } else if (import.meta.env.DEV) {
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}` },
          body: JSON.stringify(requestBody),
          signal
        });
      } else {
        response = await fetch("/api/chat", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({...requestBody, mode: "builder"}),
          signal
        });
      }

      data = await response.json();

      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', text: "Rate limit exceeded. Please wait a minute." }]);
        setIsLoading(false);
        setGenerationStep(0);
        return;
      }

      if (response.status === 401 || response.status === 403) {
        setMessages(prev => [...prev, { role: 'ai', text: "API Key Error. Your custom key might be invalid or out of credits." }]);
        setIsLoading(false);
        setGenerationStep(0);
        setShowSettings(true);
        return;
      }

      const aiResponseText = data.choices?.[0]?.message?.content || "";
      if (aiResponseText) {
        setMessages(prev => [...prev, { role: 'ai', text: "Render complete." }]);
        parseCodeBlocks(aiResponseText);
        
        if (!isUsingCustomKey) {
          const newCredits = builderCredits - 1;
          setBuilderCredits(newCredits);
          localStorage.setItem('fixo_builder_credits', newCredits.toString());
        }
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const steps = [
    { step: 1, text: "Analyzing context...", icon: <Cpu size={14} className="animate-pulse text-violet-400" /> },
    { step: 2, text: "Structuring layout...", icon: <Layout size={14} className="animate-pulse text-fuchsia-400" /> },
    { step: 3, text: "Applying styles...", icon: <Paintbrush size={14} className="animate-pulse text-pink-400" /> },
    { step: 4, text: "Injecting logic...", icon: <FileCode2 size={14} className="animate-pulse text-rose-400" /> }
  ];

  const isUsingCustomKey = !!localStorage.getItem('fixo_custom_api_key');

  return (
    <div className={`flex flex-col md:flex-row h-full w-full overflow-hidden ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#fcfcfc] text-black'}`}>
      
      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSettings(false)}></div>
          <div className={`relative w-full max-w-md p-6 rounded-2xl shadow-2xl border ${theme === 'dark' ? 'bg-[#0a0a0c] border-white/10' : 'bg-white border-black/10'} animate-in fade-in zoom-in-95 duration-200`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Settings className="text-violet-500" size={20} />
                <h3 className="font-bold text-lg">Provider Settings</h3>
              </div>
              <button onClick={() => setShowSettings(false)} className={`p-1 rounded-md transition-all ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>Provider</label>
                <select value={provider} onChange={(e) => setProvider(e.target.value)} className={`w-full p-3 rounded-xl border focus:outline-none transition-all ${theme === 'dark' ? 'bg-white/[0.03] border-white/10 focus:border-violet-500/50' : 'bg-black/[0.02] border-black/10 focus:border-violet-500/50'}`}>
                  <option value="openrouter" className="bg-black text-white">OpenRouter</option>
                  <option value="openai" className="bg-black text-white">OpenAI</option>
                  <option value="gemini" className="bg-black text-white">Google Gemini</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>API Key</label>
                <div className={`relative flex items-center p-1 rounded-xl border focus-within:border-violet-500/50 transition-all ${theme === 'dark' ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/10'}`}>
                  <div className="pl-3 text-violet-500"><Lock size={16} /></div>
                  <input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)} 
                    placeholder="sk-..." 
                    className="flex-1 bg-transparent p-2 text-sm focus:outline-none min-w-0"
                  />
                </div>
              </div>

              {verificationStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-500 text-sm font-medium bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                  <CheckCircle2 size={16} /> API Key Verified & Models Loaded
                </div>
              )}
              {verificationStatus === 'error' && (
                <div className="flex items-center gap-2 text-rose-500 text-sm font-medium bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
                  <AlertCircle size={16} /> Invalid API Key or Network Error
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleClearKey} 
                  className={`flex-1 p-3 rounded-xl border text-sm font-medium transition-all ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                >
                  Clear Key
                </button>
                <button 
                  onClick={handleVerifyAndFetch} 
                  disabled={isVerifying || !apiKey}
                  className="flex-1 p-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isVerifying ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Verify & Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. LEFT PANEL (Prompt & Controls) */}
      <div className={`${mobileTab === 'prompt' ? 'flex' : 'hidden'} md:flex w-full md:w-[300px] lg:w-[320px] flex-col flex-shrink-0 border-r transition-colors duration-300 ${theme === 'dark' ? 'border-white/[0.05] bg-white/[0.01]' : 'border-black/[0.05] bg-black/[0.01]'} backdrop-blur-3xl z-10 relative h-full md:h-auto`}>
        {/* Header */}
        <div className={`p-4 border-b flex-shrink-0 flex items-center justify-between ${theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
          <div className="flex items-center gap-3">
            <button onClick={onExit} className={`p-1.5 rounded-full hover:bg-black/10 ${theme === 'dark' ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'text-black/50 hover:text-black'} transition-all hover:scale-105 active:scale-95`}>
              <ChevronLeft size={18} />
            </button>
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Code size={14} className="text-white" />
              </div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black animate-pulse"></div>
            </div>
            <span className={`text-sm font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400`}>FixO IDE</span>
          </div>
          <button onClick={() => setShowSettings(true)} className={`p-1.5 rounded-lg transition-all hover:scale-105 ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'} ${isUsingCustomKey ? 'ring-1 ring-violet-500/50 text-violet-400' : ''}`} title="API Settings">
             <Settings size={16} className={isUsingCustomKey ? "text-violet-500" : ""} />
          </button>
        </div>

        {/* Settings / Controls */}
        <div className="p-4 space-y-5 flex-shrink-0">
          <div>
            <label className={`text-[11px] font-medium uppercase tracking-wider mb-2 flex items-center justify-between ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>
              <span>AI Model</span>
              {isUsingCustomKey && <span className="text-[9px] text-violet-500 font-bold bg-violet-500/10 px-1.5 py-0.5 rounded">CUSTOM</span>}
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={`w-full text-[13px] p-3 rounded-xl border focus:outline-none appearance-none cursor-pointer transition-all ${
                theme === 'dark' 
                  ? 'bg-white/[0.03] border-white/[0.05] text-white/90 hover:border-violet-500/50 hover:bg-white/[0.05]' 
                  : 'bg-black/[0.02] border-black/[0.05] text-black/90 hover:border-violet-500/50 hover:bg-black/[0.05]'
              }`}
            >
              {activeModels.map(model => (
                <option key={model.id} value={model.id} className="bg-black text-white">{model.name}</option>
              ))}
            </select>
          </div>
          
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${isUsingCustomKey ? (theme === 'dark' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700') : builderCredits > 0 ? (theme === 'dark' ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-violet-500/10 border-violet-500/20 text-violet-700') : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
            <span className="text-xs font-medium">{isUsingCustomKey ? "Unlimited Usage" : "Free Daily Limit"}</span>
            <div className="flex items-center gap-1.5 font-mono text-sm">
              {isUsingCustomKey ? <CheckCircle2 size={14} /> : <Zap size={14} className={builderCredits > 0 ? "fill-current" : ""} />}
              {isUsingCustomKey ? '∞' : `${builderCredits}/1`}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar relative min-h-0">
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10 opacity-50"></div>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[90%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-br-sm' 
                  : `${theme === 'dark' ? 'bg-white/[0.03] border-white/[0.05] text-white/90' : 'bg-black/[0.03] border-black/[0.05] text-black/90'} rounded-bl-sm border backdrop-blur-md`
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && generationStep > 0 && (
            <div className={`flex justify-start animate-in fade-in duration-300`}>
              <div className={`w-full p-5 rounded-2xl rounded-bl-sm border backdrop-blur-md ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.05] text-white/80' : 'bg-black/[0.02] border-black/[0.05] text-black/80'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
                  <span className="font-semibold text-xs text-violet-400 uppercase tracking-widest">Generating</span>
                </div>
                <div className="space-y-4">
                  {steps.map(s => (
                    <div key={s.step} className={`flex items-center gap-3 text-sm transition-opacity duration-500 ${generationStep >= s.step ? 'opacity-100' : 'opacity-30'}`}>
                      {s.icon}
                      <span className={generationStep === s.step ? 'text-white font-medium' : ''}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Input Area */}
        <div className={`p-4 border-t flex-shrink-0 ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]/80' : 'border-black/[0.05] bg-white/80'} backdrop-blur-xl`}>
          <div className={`relative flex items-end gap-2 p-1.5 rounded-2xl border transition-all duration-300 shadow-sm ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.1] focus-within:border-violet-500/50 focus-within:bg-white/[0.04] focus-within:shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'bg-white border-black/[0.1] focus-within:border-violet-500/40 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.1)]'}`}>
            <textarea 
              ref={inputRef}
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyDown={handleKeyDown}
              placeholder="Describe the UI..." 
              disabled={isLoading || (!isUsingCustomKey && builderCredits <= 0)}
              rows={1}
              className="flex-1 bg-transparent text-[13px] p-3 resize-none focus:outline-none custom-scrollbar disabled:opacity-50 min-h-[44px] max-h-[120px]" 
            />
            {isLoading ? (
              <button onClick={handleStop} className="p-2.5 mb-1 mr-1 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500/20 border border-rose-500/20 transition-all active:scale-95 flex-shrink-0" title="Stop">
                <Square size={18} className="fill-current" />
              </button>
            ) : (
              <button onClick={() => handleSendMessage()} disabled={!inputValue.trim()} className="p-2.5 mb-1 mr-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:scale-105 transition-all disabled:opacity-30 disabled:scale-100 active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:shadow-none flex-shrink-0">
                <Send size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT WORKSPACE (Global Wrapper for Preview + Code) */}
      <div className={`${mobileTab !== 'prompt' ? 'flex' : 'hidden'} md:flex flex-1 flex-col relative z-0 h-full overflow-hidden`}>
        
        {/* GLOBAL WORKSPACE TOP BAR */}
        <div className={`flex items-center justify-between px-3 md:px-4 py-3 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]' : 'border-black/[0.05] bg-white'}`}>
          <div className="flex items-center gap-1.5 hidden md:flex">
            <button onClick={() => setActiveView('preview')} className={`p-1.5 rounded-lg transition-all ${activeView === 'preview' ? 'bg-violet-500/20 text-violet-400' : (theme === 'dark' ? 'hover:bg-white/5 text-white/50 hover:text-white' : 'hover:bg-black/5 text-black/50 hover:text-black')}`} title="Preview Only">
              <Maximize size={16} />
            </button>
            <button onClick={() => setActiveView('split')} className={`p-1.5 rounded-lg transition-all ${activeView === 'split' ? 'bg-violet-500/20 text-violet-400' : (theme === 'dark' ? 'hover:bg-white/5 text-white/50 hover:text-white' : 'hover:bg-black/5 text-black/50 hover:text-black')}`} title="Split View">
              <Columns size={16} />
            </button>
            <button onClick={() => setActiveView('code')} className={`p-1.5 rounded-lg transition-all ${activeView === 'code' ? 'bg-violet-500/20 text-violet-400' : (theme === 'dark' ? 'hover:bg-white/5 text-white/50 hover:text-white' : 'hover:bg-black/5 text-black/50 hover:text-black')}`} title="Code Only">
              <Terminal size={16} />
            </button>
          </div>
          <div className="md:hidden flex font-semibold text-xs items-center gap-2">
            <Layout size={16} className="text-violet-500"/> Live Preview
          </div>
          
          {/* Fake Browser URL Bar */}
          <div className={`flex-1 max-w-sm mx-3 flex items-center justify-center px-4 py-2 rounded-full border text-[11px] font-mono tracking-wide truncate ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.05] text-white/40' : 'bg-black/[0.02] border-black/[0.05] text-black/50'}`}>
            <span className="opacity-50">https://</span>fixo.build/preview
          </div>

          <div className="flex items-center gap-1 bg-black/10 dark:bg-black/20 p-1 rounded-lg border border-black/5 dark:border-white/5 hidden lg:flex">
            <button onClick={() => setDeviceView('desktop')} className={`p-1.5 rounded-md transition-all ${deviceView === 'desktop' ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-black shadow-sm') : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/80'}`}><Monitor size={16} /></button>
            <button onClick={() => setDeviceView('tablet')} className={`p-1.5 rounded-md transition-all ${deviceView === 'tablet' ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-black shadow-sm') : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/80'}`}><Tablet size={16} /></button>
            <button onClick={() => setDeviceView('mobile')} className={`p-1.5 rounded-md transition-all ${deviceView === 'mobile' ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-black shadow-sm') : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/80'}`}><Smartphone size={16} /></button>
          </div>
        </div>

        {/* PANELS CONTAINER (Preview + Code) */}
        <div className="flex-1 flex flex-row relative min-h-0 overflow-hidden">
          
          {/* PREVIEW PANEL */}
          <div className={`flex flex-col relative h-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            window.innerWidth < 768 
              ? (mobileTab === 'preview' ? 'w-full opacity-100' : 'w-0 opacity-0 hidden')
              : activeView === 'code' ? 'w-0 opacity-0 overflow-hidden flex-none border-0' : 'flex-1 opacity-100'
          }`}>
            <div className={`flex-1 p-0 md:p-6 lg:p-8 overflow-hidden flex items-center justify-center relative ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f5f5f5]'}`}>
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>
              
              {hasGenerated || isLoading ? (
                <div className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] md:rounded-xl border ${hasGenerated && !isLoading ? 'scale-100 opacity-100' : 'scale-95 opacity-50'} ${theme === 'dark' ? 'border-white/[0.1] bg-[#0a0a0c]' : 'border-black/[0.1] bg-white'} ${
                  window.innerWidth < 768 ? 'w-full h-full' :
                  deviceView === 'desktop' ? 'w-full h-full' :
                  deviceView === 'tablet' ? 'w-[768px] h-full shadow-[0_0_50px_rgba(0,0,0,0.3)]' :
                  'w-[375px] h-[812px] max-h-full shadow-[0_0_50px_rgba(0,0,0,0.3)]'
                }`}>
                  <div className={`hidden md:flex h-10 w-full flex-shrink-0 border-b items-center px-4 gap-2.5 ${theme === 'dark' ? 'bg-[#1a1a1c] border-white/5' : 'bg-[#fcfcfc] border-black/5'}`}>
                    <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm"></div>
                  </div>
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#0a0a0c]">
                       <div className="w-10 h-10 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
                    </div>
                  ) : (
                    <iframe 
                      src={previewUrl} 
                      className={`w-full h-full flex-1 border-none bg-white`}
                      title="Live Preview"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center flex-col max-w-lg mx-auto text-center px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-3xl blur-2xl opacity-20"></div>
                    <div className={`w-24 h-24 rounded-3xl ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-black/[0.02] border-black/[0.05]'} border flex items-center justify-center shadow-inner relative z-10 backdrop-blur-xl`}>
                      <Layout size={40} className="text-violet-500" />
                    </div>
                  </div>
                  <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Start building something amazing</h2>
                  <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Describe your desired UI in the prompt panel, or try one of these suggestions to see FixO in action.</p>
                  <div className="flex flex-col gap-3 w-full max-w-sm">
                    {PRESETS.map((preset, idx) => (
                       <button 
                        key={idx}
                        onClick={() => handleSendMessage(preset)}
                        className={`px-5 py-3.5 rounded-xl border flex items-center gap-3 text-sm transition-all hover:scale-[1.02] active:scale-95 ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.05] text-white/70 hover:bg-white/[0.05] hover:text-white' : 'bg-black/[0.02] border-black/[0.05] text-black/70 hover:bg-black/[0.05] hover:text-black'}`}
                      >
                        <Play size={14} className="text-violet-500" /> {preset}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CODE PANEL */}
          <div className={`flex flex-col h-full border-l transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]' : 'border-black/[0.05] bg-[#fcfcfc]'} z-20 ${
             window.innerWidth < 768 
              ? (mobileTab === 'code' ? 'w-full opacity-100' : 'w-0 opacity-0 hidden')
              : activeView === 'preview' ? 'w-0 opacity-0 overflow-hidden flex-none border-0' 
              : activeView === 'split' ? 'w-[360px] lg:w-[450px] flex-none' 
              : 'flex-1 opacity-100'
          }`}>
            {/* Code Tabs Header */}
            <div className={`flex items-center justify-between p-2 md:p-3 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
              <div className="flex gap-1.5">
                {['html', 'css', 'js'].map(tab => (
                   <button 
                    key={tab} 
                    onClick={() => setCodeTab(tab)} 
                    className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                      codeTab === tab 
                        ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-black/5 text-black shadow-sm border border-black/5') 
                        : (theme === 'dark' ? 'text-white/40 hover:bg-white/5 hover:text-white/70' : 'text-black/40 hover:bg-black/5 hover:text-black/70')
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 pr-1">
                <button onClick={copyToClipboard} className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-black/50 hover:bg-black/5 hover:text-black'}`} title="Copy Code">
                  {isCopied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                <button onClick={handleDownload} disabled={!previewUrl} className={`p-2 rounded-lg transition-all disabled:opacity-30 ${theme === 'dark' ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-black/50 hover:bg-black/5 hover:text-black'}`} title="Download ZIP">
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Code View */}
            <div className={`flex-1 overflow-y-auto p-5 custom-scrollbar min-h-0 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f0f0f0]'}`}>
              {previewCode[codeTab] ? (
                <pre className={`text-[12px] md:text-[13px] font-mono leading-relaxed whitespace-pre-wrap ${
                  codeTab === 'html' ? (theme === 'dark' ? 'text-blue-400' : 'text-blue-700') :
                  codeTab === 'css' ? (theme === 'dark' ? 'text-pink-400' : 'text-pink-700') :
                  (theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700')
                }`}>
                  {previewCode[codeTab]}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-3">
                  <Code size={24} className={theme === 'dark' ? 'text-white/10' : 'text-black/10'} />
                  <p className={`text-xs font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-black/30'}`}>No code generated yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className={`md:hidden flex-shrink-0 border-t flex justify-around p-2 ${theme === 'dark' ? 'bg-[#0a0a0c] border-white/10' : 'bg-white border-black/10'} z-50 relative`}>
        <button 
          onClick={() => setMobileTab('prompt')}
          className={`flex flex-col items-center gap-1 p-2 w-20 rounded-xl transition-all ${mobileTab === 'prompt' ? (theme === 'dark' ? 'text-violet-400 bg-violet-500/10' : 'text-violet-600 bg-violet-50') : (theme === 'dark' ? 'text-white/40' : 'text-black/40')}`}
        >
          <Cpu size={20} />
          <span className="text-[10px] font-medium">Prompt</span>
        </button>
        <button 
          onClick={() => setMobileTab('preview')}
          className={`flex flex-col items-center gap-1 p-2 w-20 rounded-xl transition-all ${mobileTab === 'preview' ? (theme === 'dark' ? 'text-violet-400 bg-violet-500/10' : 'text-violet-600 bg-violet-50') : (theme === 'dark' ? 'text-white/40' : 'text-black/40')}`}
        >
          <Layout size={20} />
          <span className="text-[10px] font-medium">Preview</span>
        </button>
        <button 
          onClick={() => setMobileTab('code')}
          className={`flex flex-col items-center gap-1 p-2 w-20 rounded-xl transition-all ${mobileTab === 'code' ? (theme === 'dark' ? 'text-violet-400 bg-violet-500/10' : 'text-violet-600 bg-violet-50') : (theme === 'dark' ? 'text-white/40' : 'text-black/40')}`}
        >
          <Terminal size={20} />
          <span className="text-[10px] font-medium">Code</span>
        </button>
      </div>

    </div>
  );
};

export default BuilderMode;
