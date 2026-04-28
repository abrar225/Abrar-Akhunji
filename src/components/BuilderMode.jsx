import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, RefreshCw, ChevronLeft, Bot, Code } from 'lucide-react';
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

const BuilderMode = ({ theme, selectedModel, onExit }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I am FixO The Builder. Describe what you want me to build (e.g., 'A modern login form with glassmorphism') and I will generate the code and live preview!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewCode, setPreviewCode] = useState({ html: '', css: '', js: '' });
  const [previewUrl, setPreviewUrl] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let response;
      let data;
      
      if (import.meta.env.DEV) {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              { role: "system", content: BUILDER_CONTEXT },
              ...messages.filter(m => m.role === 'user').slice(-3), // Keep last 3 user messages for context
              { role: "user", content: userMessage.text }
            ]
          })
        });
        data = await response.json();
      } else {
        response = await fetch("/api/chat", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: selectedModel,
            messages: [
              { role: "system", content: BUILDER_CONTEXT },
              ...messages.filter(m => m.role === 'user').slice(-3),
              { role: "user", content: userMessage.text }
            ]
          })
        });
        data = await response.json();
      }

      if (response.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', text: "Rate limit exceeded. Please wait a minute." }]);
        return;
      }

      const aiResponseText = data.choices?.[0]?.message?.content || "";
      if (aiResponseText) {
        setMessages(prev => [...prev, { role: 'ai', text: "I've generated the code. Check the live preview!" }]);
        parseCodeBlocks(aiResponseText);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Failed to generate code." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to the Builder API." }]);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden">
      {/* Left Chat Pane */}
      <div className={`w-full md:w-80 flex flex-col border-r ${theme === 'dark' ? 'border-white/10 bg-black/90' : 'border-black/10 bg-white/95'}`}>
        <div className={`p-3 border-b flex items-center gap-2 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          <button onClick={onExit} className={`p-1.5 rounded-lg hover:bg-black/10 ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors`}>
            <ChevronLeft size={18} />
          </button>
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-yellow-500 to-orange-500 flex items-center justify-center">
            <Code size={12} className="text-white" />
          </div>
          <span className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>The Builder</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-2.5 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-orange-600 text-white rounded-tr-sm' : `${theme === 'dark' ? 'bg-white/10 text-gray-200' : 'bg-black/5 text-gray-800'} rounded-tl-sm border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}`}>{msg.text}</div>
            </div>
          ))}
          {isLoading && <div className="text-[10px] text-gray-500 animate-pulse flex items-center gap-1"><RefreshCw size={10} className="animate-spin" /> Generating UI...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className={`p-3 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Build a hero section..." className={`flex-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-orange-500' : 'bg-black/5 border-black/10 text-black focus:border-orange-500'} rounded-lg px-3 py-1.5 text-xs transition-colors focus:outline-none`} />
            <button type="submit" disabled={isLoading} className="p-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-colors disabled:opacity-50"><Send size={14} /></button>
          </form>
        </div>
      </div>

      {/* Right Preview Pane */}
      <div className="flex-1 flex flex-col bg-gray-900 relative">
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button 
            onClick={handleDownload}
            disabled={!previewUrl}
            className="flex items-center gap-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white text-[10px] px-3 py-1.5 rounded-lg border border-white/10 shadow-lg transition-colors"
          >
            <Download size={12} /> ZIP
          </button>
        </div>
        
        {previewUrl ? (
          <iframe 
            src={previewUrl} 
            className="w-full h-full border-none bg-white"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 flex-col gap-3">
            <Code size={48} className="opacity-20" />
            <p className="text-sm font-mono opacity-50">Preview will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderMode;
