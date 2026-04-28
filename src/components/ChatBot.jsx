import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, X, Volume2, VolumeX, Wrench, Square, Zap, Trash2, Paperclip, ChevronRight, Settings } from 'lucide-react';
import BuilderMode from './BuilderMode';

const PORTFOLIO_CONTEXT = `
You are an AI Assistant for Abrar Akhunji's portfolio website.
Key Information:
- Name: Abrar Akhunji
- Tagline: "I constantly try to improve."
- Education: 
  1. B.E. in Information Technology (2023-Present) at Kalol Institute of Technology & Research Center.
  2. Diploma in IT (2020-2023) at Government Polytechnic, Himmatnagar.
- Skills: 
  - AI/ML: Numpy, Pandas, OpenCV, Basic Model Training, Data Preprocessing.
  - Languages: Python, Java, PHP, JavaScript.
  - Web: Django, Flask, HTML, CSS.
  - Tools: Git, GitHub, Android Studio, VSCode, Kali Linux.
- Projects: Lyra Music AI, CivicEye, TerraFlow, NeuroVision.
- Certifications: Google Cybersecurity Professional, Smart India Hackathon 2022.
`;

const AVAILABLE_MODELS = [
  { id: "minimax/minimax-m2.5:free", name: "Minimax M2.5 (Fast)" },
  { id: "google/gemma-3-27b-it:free", name: "Google Gemma 3" },
  { id: "openai/gpt-oss-120b:free", name: "GPT OSS 120B" },
  { id: "nvidia/nemotron-nano-9b-v2:free", name: "Nvidia Nemotron" },
  { id: "liquid/lfm-2.5-1.2b-thinking:free", name: "Liquid LFM Thinking" },
  { id: "inclusionai/ling-2.6-flash:free", name: "Ling Flash 2.6" }
];

const SUGGESTIONS = [
  "Who is Abrar?",
  "What are your skills?",
  "Tell me about your projects",
  "Can you code?"
];

const ChatBot = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState('normal'); // 'normal', 'builder'
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Welcome. I am FixO, an AI assistant built to help you navigate Abrar's universe. How can I assist you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [isMuted, setIsMuted] = useState(false);
  const [chatCredits, setChatCredits] = useState(10);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const resetTime = localStorage.getItem('fixo_chat_reset');
    const storedCredits = localStorage.getItem('fixo_chat_credits');
    const now = Date.now();
    
    if (!resetTime || now > parseInt(resetTime)) {
      localStorage.setItem('fixo_chat_reset', (now + 24 * 60 * 60 * 1000).toString());
      localStorage.setItem('fixo_chat_credits', '10');
      setChatCredits(10);
    } else if (storedCredits) {
      setChatCredits(parseInt(storedCredits));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, chatMode]);

  const speakText = (text) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-US'));
    if (englishVoice) utterance.voice = englishVoice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'ai', text: "Process halted." }]);
    }
  };

  const handleClearChat = () => {
    setMessages([{ role: 'ai', text: "Memory cleared. How can I help?" }]);
  };

  const handleSendMessage = async (customText) => {
    if (chatCredits <= 0) {
      setMessages(prev => [...prev, { role: 'ai', text: "Daily limit of 10 messages reached. See you tomorrow!" }]);
      return;
    }

    const textToSend = typeof customText === 'string' ? customText : inputValue;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const lowerText = textToSend.toLowerCase();

    // STATIC ROUTING
    const unethicalKeywords = ['bomb', 'kill', 'hack', 'steal', 'murder', 'weapon', 'drugs', 'illegal'];
    if (unethicalKeywords.some(keyword => lowerText.includes(keyword))) {
      const responseText = "I'm designed to discuss Abrar's portfolio, not harmful activities. Let's redirect our focus.";
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      speakText(responseText);
      setIsLoading(false);
      return;
    }

    const adultKeywords = ['sex', 'porn', 'nude', 'nsfw', 'hookup'];
    if (adultKeywords.some(keyword => lowerText.includes(keyword))) {
      const responseText = "Let's keep the conversation professional.";
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      speakText(responseText);
      setIsLoading(false);
      return;
    }

    const faqMap = {
      'who are you': "I am FixO, Abrar's AI Assistant. I have comprehensive knowledge of his projects, skills, and background.",
      'what are you': "I am an AI interface built by Abrar to assist visitors in exploring his work.",
      'who is abrar': "Abrar Akhunji is a dedicated developer pursuing a B.E. in Information Technology. He builds AI/ML solutions and modern web applications.",
      'tell me about abrar': "Abrar Akhunji is a dedicated developer pursuing a B.E. in Information Technology. He builds AI/ML solutions and modern web applications.",
      'projects': "Abrar has engineered several systems including Lyra Music AI, CivicEye (AI crime detection), TerraFlow, and NeuroVision. Would you like specifics on any of these?",
      'skills': "Abrar's tech stack includes Python, Java, JavaScript, AI/ML (Pandas, OpenCV), Django, and React.",
      'can you code': "Absolutely. I have a dedicated IDE. Click the Wrench icon to unlock FixO Builder Mode."
    };

    for (const [key, answer] of Object.entries(faqMap)) {
      if (lowerText.includes(key)) {
        setMessages(prev => [...prev, { role: 'ai', text: answer }]);
        speakText(answer);
        setIsLoading(false);
        return;
      }
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      let response;
      let data;
      
      const requestBody = JSON.stringify({
        model: selectedModel,
        messages: [
          { role: "system", content: PORTFOLIO_CONTEXT },
          { role: "user", content: textToSend }
        ],
        mode: "chat"
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
        const text = "Rate limit exceeded. Please try again later.";
        setMessages(prev => [...prev, { role: 'ai', text }]);
        speakText(text);
        return;
      }

      const aiResponseText = data.choices?.[0]?.message?.content || "Connection failed. Please try again.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
      speakText(aiResponseText);
      
      const newCredits = chatCredits - 1;
      setChatCredits(newCredits);
      localStorage.setItem('fixo_chat_credits', newCredits.toString());
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log("Fetch aborted");
      } else {
        const errorText = "Network error. Unable to reach AI.";
        setMessages(prev => [...prev, { role: 'ai', text: errorText }]);
        speakText(errorText);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <>
      {/* Floating Trigger - Premium Orb */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-6 md:right-12 z-[70] transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center group`}
      >
        <div className={`relative flex items-center justify-center w-16 h-16 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all ${isOpen ? 'rotate-90 scale-90' : 'rotate-0 scale-100'} ${theme === 'dark' ? 'bg-[#0a0a0c] border border-white/10' : 'bg-white border border-black/5'}`}>
          {/* Glowing layers */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-500"></div>
          <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 opacity-20 blur-md"></div>
          
          {isOpen ? (
            <X size={24} className={`${theme === 'dark' ? 'text-white/80' : 'text-black/80'} z-10`} />
          ) : (
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600">
              <Sparkles size={20} className="text-white" />
            </div>
          )}
        </div>
      </button>

      {/* Main Chat Interface */}
      {isOpen && (
        <div className={`fixed z-[70] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          chatMode === 'builder' 
            ? 'inset-0 w-full h-full rounded-none border-0' 
            : `bottom-28 right-6 md:right-12 w-[calc(100vw-3rem)] md:w-[420px] h-[600px] max-h-[80vh] rounded-3xl border shadow-2xl`
        } ${theme === 'dark' ? 'bg-[#0a0a0c]/90 border-white/[0.08]' : 'bg-[#fcfcfc]/95 border-black/[0.05]'} backdrop-blur-3xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8`}>
          
          {chatMode === 'builder' ? (
            <BuilderMode 
              theme={theme} 
              initialModel={selectedModel} 
              onExit={() => setChatMode('normal')} 
            />
          ) : (
            <>
              {/* HEADER */}
              <div className={`px-5 py-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/[0.05] bg-white/[0.01]' : 'border-black/[0.05] bg-black/[0.01]'}`}>
                <div className="flex items-center gap-3">
                  <div className="relative group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#0a0a0c] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-base font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400`}>FixO</h3>
                    <p className={`text-[10px] uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>AI Assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded-full border ${chatCredits > 0 ? (theme === 'dark' ? 'border-white/10 text-white/60 bg-white/5' : 'border-black/10 text-black/60 bg-black/5') : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
                    <Zap size={10} className={chatCredits > 0 ? "fill-current text-violet-400" : ""} />
                    <span className="text-[10px] font-mono">{chatCredits}/10</span>
                  </div>
                  <button 
                    onClick={() => setChatMode('builder')} 
                    className={`p-2 rounded-full transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20' : 'bg-violet-50 text-violet-600 hover:bg-violet-100'}`}
                    title="Open Builder Mode"
                  >
                    <Wrench size={16} />
                  </button>
                  <button 
                    onClick={handleClearChat} 
                    className={`p-2 rounded-full transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-black/40 hover:text-black hover:bg-black/5'}`}
                    title="Clear Chat"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className={`p-2 rounded-full transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-black/40 hover:text-black hover:bg-black/5'}`}
                    title={isMuted ? "Unmute Voice" : "Mute Voice"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>

              {/* CHAT AREA */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar relative">
                {/* Background Noise for texture */}
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>
                
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-2xl rounded-tr-sm shadow-[0_4px_15px_rgba(139,92,246,0.2)]' 
                        : `${theme === 'dark' ? 'bg-white/[0.04] text-gray-200 border-white/[0.08]' : 'bg-black/[0.03] text-gray-800 border-black/[0.05]'} rounded-2xl rounded-tl-sm border backdrop-blur-xl shadow-sm`
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start animate-in fade-in">
                    <div className={`px-4 py-3 rounded-2xl rounded-tl-sm border backdrop-blur-xl flex items-center gap-2 ${theme === 'dark' ? 'bg-white/[0.04] border-white/[0.08]' : 'bg-black/[0.03] border-black/[0.05]'}`}>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* INPUT AREA */}
              <div className={`p-4 pt-2 border-t relative z-10 ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]/80' : 'border-black/[0.05] bg-white/80'} backdrop-blur-xl`}>
                
                {/* Suggestions */}
                {messages.length === 1 && (
                  <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-3 mb-1 w-full">
                    {SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(suggestion)}
                        disabled={isLoading}
                        className={`flex-shrink-0 text-[11px] px-3.5 py-1.5 rounded-full border transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                          theme === 'dark' 
                            ? 'border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/20' 
                            : 'border-black/[0.08] text-black/60 hover:text-black hover:bg-black/[0.02] hover:border-black/20'
                        }`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className={`relative flex items-center p-1.5 rounded-full border transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-white/[0.02] border-white/[0.1] focus-within:border-violet-500/50 focus-within:bg-white/[0.04]' 
                    : 'bg-black/[0.02] border-black/[0.1] focus-within:border-violet-500/50 focus-within:bg-black/[0.04]'
                }`}>
                  <button type="button" className={`p-2 ml-1 rounded-full transition-colors ${theme === 'dark' ? 'text-white/40 hover:text-white hover:bg-white/10' : 'text-black/40 hover:text-black hover:bg-black/5'}`}>
                    <Paperclip size={16} />
                  </button>
                  
                  <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="Message FixO..." 
                    disabled={isLoading || chatCredits <= 0} 
                    className="flex-1 bg-transparent px-3 py-2 text-sm transition-colors focus:outline-none disabled:opacity-50" 
                  />
                  
                  {isLoading ? (
                    <button type="button" onClick={handleStop} className="p-2 mr-1 rounded-full bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 transition-all active:scale-95" title="Stop">
                      <Square size={16} className="fill-current" />
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || chatCredits <= 0} 
                      className="p-2 mr-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white transition-all duration-300 disabled:opacity-30 disabled:scale-100 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(139,92,246,0.3)] disabled:shadow-none"
                    >
                      <ChevronRight size={16} />
                    </button>
                  )}
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
