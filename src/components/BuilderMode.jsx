import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, RefreshCw, ChevronLeft, Code, Square, Cpu, Layout, FileCode2, Paintbrush, Loader2, Zap } from 'lucide-react';
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

const BuilderMode = ({ theme, initialModel, onExit }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I am FixO The Builder. Describe what you want me to build (e.g., 'A modern login form with glassmorphism') and I will generate the code and live preview!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(0); // 0=none, 1=analyzing, 2=html, 3=css, 4=js
  const [previewCode, setPreviewCode] = useState({ html: '', css: '', js: '' });
  const [previewUrl, setPreviewUrl] = useState('');
  const [activeTab, setActiveTab] = useState('preview'); // 'preview', 'code'
  const [selectedModel, setSelectedModel] = useState(initialModel || AVAILABLE_MODELS[0].id);
  const [builderCredits, setBuilderCredits] = useState(5);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const resetTime = localStorage.getItem('fixo_builder_reset');
    const storedCredits = localStorage.getItem('fixo_builder_credits');
    const now = Date.now();
    
    if (!resetTime || now > parseInt(resetTime)) {
      localStorage.setItem('fixo_builder_reset', (now + 24 * 60 * 60 * 1000).toString());
      localStorage.setItem('fixo_builder_credits', '5');
      setBuilderCredits(5);
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
            body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; background: ${theme === 'dark' ? '#0f0f11' : '#f0f0f0'}; color: ${theme === 'dark' ? '#fff' : '#000'}; }
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
      setMessages(prev => [...prev, { role: 'ai', text: "Generation stopped by user." }]);
    }
  };

  const simulateProgress = () => {
    setGenerationStep(1);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(2) }, 2000);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(3) }, 5000);
    setTimeout(() => { if (abortControllerRef.current) setGenerationStep(4) }, 8000);
  };

  const handleSendMessage = async () => {
    if (builderCredits <= 0) {
      setMessages(prev => [...prev, { role: 'ai', text: "You have reached your daily limit of 5 builder actions. Please try again tomorrow!" }]);
      return;
    }

    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
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
          { role: "user", content: userMessage.text }
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
        setMessages(prev => [...prev, { role: 'ai', text: "I've generated the code. Check the live preview!" }]);
        parseCodeBlocks(aiResponseText);
        const newCredits = builderCredits - 1;
        setBuilderCredits(newCredits);
        localStorage.setItem('fixo_builder_credits', newCredits.toString());
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Failed to generate code." }]);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log("Fetch aborted");
      } else {
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

  const steps = [
    { step: 1, text: "Analyzing Request...", icon: <Cpu size={12} className="animate-pulse text-blue-400" /> },
    { step: 2, text: "Writing HTML Structure...", icon: <Layout size={12} className="animate-bounce text-orange-400" /> },
    { step: 3, text: "Designing CSS Styles...", icon: <Paintbrush size={12} className="animate-bounce text-pink-400" /> },
    { step: 4, text: "Adding Interactive Logic...", icon: <FileCode2 size={12} className="animate-bounce text-yellow-400" /> }
  ];

  return (
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
      {/* Left Chat Pane */}
      <div className={`w-full md:w-80 flex flex-col border-r ${theme === 'dark' ? 'border-white/10 bg-black/90' : 'border-black/10 bg-white/95'} backdrop-blur-xl`}>
        <div className={`p-3 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
          <div className="flex items-center gap-2">
            <button onClick={onExit} className={`p-1.5 rounded-lg hover:bg-black/10 ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>
              <ChevronLeft size={18} />
            </button>
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Code size={12} className="text-white" />
            </div>
            <span className={`text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400`}>The Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded border ${builderCredits > 0 ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
              <Zap size={10} />
              <span>{builderCredits}/5</span>
            </div>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={`text-[9px] max-w-[100px] truncate p-1 rounded-md border focus:outline-none appearance-none cursor-pointer ${
                theme === 'dark' 
                  ? 'bg-black/50 border-white/20 text-gray-300 hover:border-purple-500' 
                  : 'bg-white/50 border-black/10 text-gray-700 hover:border-purple-500'
              }`}
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model.id} value={model.id} className="bg-black text-white">{model.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-2.5 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-tr-sm shadow-md' : `${theme === 'dark' ? 'bg-white/5 text-gray-200' : 'bg-black/5 text-gray-800'} rounded-tl-sm border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}`}>{msg.text}</div>
            </div>
          ))}
          
          {isLoading && generationStep > 0 && (
            <div className={`flex justify-start`}>
              <div className={`max-w-[85%] p-3 rounded-xl rounded-tl-sm border text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-black/5 border-black/10 text-gray-700'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Loader2 size={14} className="animate-spin text-purple-500" />
                  <span className="font-semibold text-[10px] text-purple-400 uppercase tracking-wider">FixO is working</span>
                </div>
                <div className="space-y-2">
                  {steps.map(s => (
                    <div key={s.step} className={`flex items-center gap-2 text-[10px] ${generationStep >= s.step ? 'opacity-100' : 'opacity-30'}`}>
                      {s.icon}
                      <span className={generationStep === s.step ? 'text-white' : ''}>{s.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={`p-3 border-t ${theme === 'dark' ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'}`}>
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Build a hero section..." 
              disabled={isLoading}
              className={`flex-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-purple-500' : 'bg-black/5 border-black/10 text-black focus:border-purple-500'} rounded-lg px-3 py-1.5 text-xs transition-colors focus:outline-none disabled:opacity-50`} 
            />
            {isLoading ? (
              <button type="button" onClick={handleStop} className="p-1.5 bg-red-600/20 text-red-500 border border-red-500/50 rounded-lg hover:bg-red-600/40 transition-colors" title="Stop Generation">
                <Square size={14} className="fill-current" />
              </button>
            ) : (
              <button type="submit" disabled={!inputValue.trim() || builderCredits <= 0} className="p-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-500 hover:to-pink-400 transition-colors disabled:opacity-50">
                <Send size={14} />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Right Preview Pane */}
      <div className={`flex-1 flex flex-col relative ${theme === 'dark' ? 'bg-[#0f0f11]' : 'bg-gray-100'}`}>
        <div className="absolute top-3 left-3 z-10 flex gap-2 bg-black/50 backdrop-blur-md p-1 rounded-lg border border-white/10">
          <button onClick={() => setActiveTab('preview')} className={`text-[10px] px-3 py-1 rounded-md transition-colors ${activeTab === 'preview' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}>Preview</button>
          <button onClick={() => setActiveTab('code')} className={`text-[10px] px-3 py-1 rounded-md transition-colors ${activeTab === 'code' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}>Code</button>
        </div>

        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button 
            onClick={handleDownload}
            disabled={!previewUrl}
            className="flex items-center gap-1 bg-black/50 hover:bg-black/80 backdrop-blur-md disabled:opacity-50 text-white text-[10px] px-3 py-1.5 rounded-lg border border-white/10 shadow-lg transition-colors"
          >
            <Download size={12} /> ZIP
          </button>
        </div>
        
        {activeTab === 'preview' ? (
          previewUrl ? (
            <iframe 
              src={previewUrl} 
              className="w-full h-full border-none bg-white rounded-r-2xl"
              title="Live Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 flex-col gap-3">
              <Code size={48} className="opacity-20" />
              <p className="text-sm font-mono opacity-50">Preview will appear here</p>
            </div>
          )
        ) : (
          <div className="flex-1 overflow-y-auto p-6 pt-16 bg-[#1e1e1e] text-gray-300 font-mono text-xs custom-scrollbar rounded-r-2xl">
            {previewCode.html || previewCode.css || previewCode.js ? (
              <div className="space-y-6">
                {previewCode.html && (<div><h4 className="text-blue-400 mb-2 border-b border-white/10 pb-1">HTML</h4><pre className="overflow-x-auto text-[10px] whitespace-pre-wrap">{previewCode.html}</pre></div>)}
                {previewCode.css && (<div><h4 className="text-pink-400 mb-2 border-b border-white/10 pb-1">CSS</h4><pre className="overflow-x-auto text-[10px] whitespace-pre-wrap">{previewCode.css}</pre></div>)}
                {previewCode.js && (<div><h4 className="text-yellow-400 mb-2 border-b border-white/10 pb-1">JavaScript</h4><pre className="overflow-x-auto text-[10px] whitespace-pre-wrap">{previewCode.js}</pre></div>)}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-20">Code will appear here</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderMode;
