import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, X, Volume2, VolumeX, Wrench } from 'lucide-react';
import PuzzleGate from './PuzzleGate';
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
  const [chatMode, setChatMode] = useState('normal'); // 'normal', 'puzzle', 'builder'
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm FixO, Abrar's AI Assistant. Ask me anything about his projects, skills, or experience! ✨" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);

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

  const handleSendMessage = async (customText) => {
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
      const responseText = "I'm a portfolio bot, not a Bond villain! Try asking about Abrar's projects instead. 🕵️‍♂️";
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      speakText(responseText);
      setIsLoading(false);
      return;
    }

    const adultKeywords = ['sex', 'porn', 'nude', 'nsfw', 'hookup'];
    if (adultKeywords.some(keyword => lowerText.includes(keyword))) {
      const responseText = "Control majnu control! 🎬 Let's keep it professional.";
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      speakText(responseText);
      setIsLoading(false);
      return;
    }

    const faqMap = {
      'who are you': "I am FixO, Abrar's personal AI Assistant. I can tell you about his projects, skills, and experience!",
      'what are you': "I am FixO, an AI Assistant built by Abrar. I'm here to help you navigate his portfolio and learn about his work.",
      'who is abrar': "Abrar Akhunji is a passionate developer constantly trying to improve. He holds a Diploma in IT and is currently pursuing a B.E. in Information Technology. He loves building AI/ML solutions and web applications!",
      'tell me about abrar': "Abrar Akhunji is a passionate developer constantly trying to improve. He holds a Diploma in IT and is currently pursuing a B.E. in Information Technology. He loves building AI/ML solutions and web applications!",
      'projects': "Abrar has built several cool projects including Lyra Music AI, CivicEye (AI crime detection), TerraFlow, and NeuroVision. Would you like to know more about a specific one?",
      'skills': "Abrar is skilled in Python, Java, JavaScript, AI/ML (Pandas, OpenCV), and web frameworks like Django and React. He's a versatile full-stack developer!",
      'can you code': "I can definitely talk about code! For writing code, click the Wrench icon to unlock my Phase 2 Builder Mode."
    };

    for (const [key, answer] of Object.entries(faqMap)) {
      if (lowerText.includes(key)) {
        setMessages(prev => [...prev, { role: 'ai', text: answer }]);
        speakText(answer);
        setIsLoading(false);
        return;
      }
    }

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
              { role: "system", content: PORTFOLIO_CONTEXT },
              { role: "user", content: textToSend }
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
              { role: "system", content: PORTFOLIO_CONTEXT },
              { role: "user", content: textToSend }
            ]
          })
        });
        data = await response.json();
      }

      if (response.status === 429) {
        const text = "Too Many Requests. Please slow down and try again later.";
        setMessages(prev => [...prev, { role: 'ai', text }]);
        speakText(text);
        return;
      }

      const aiResponseText = data.choices?.[0]?.message?.content || "I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
      speakText(aiResponseText);
    } catch (error) {
      const errorText = "Sorry, error connecting to AI.";
      setMessages(prev => [...prev, { role: 'ai', text: errorText }]);
      speakText(errorText);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-28 right-6 md:right-12 z-[70] p-4 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group`}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className={chatMode === 'builder' ? 'text-orange-500' : 'text-purple-500'} />}
        {!isOpen && (
          <span className={`absolute right-full mr-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-md ${theme === 'dark' ? 'text-white' : 'text-black'} text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10`}>
            {chatMode === 'builder' ? 'Open Builder' : 'Ask AI about me'}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={`fixed bottom-44 right-6 md:right-12 z-[70] ${chatMode === 'builder' ? 'w-[90vw] md:w-[800px] h-[600px] max-h-[80vh]' : 'w-[90vw] md:w-[380px] h-[500px]'} ${theme === 'dark' ? 'bg-black/90' : 'bg-white/95'} backdrop-blur-xl border ${theme === 'dark' ? 'border-white/10' : 'border-black/5'} rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300 transition-all`}>
          
          {chatMode === 'puzzle' && (
            <PuzzleGate 
              theme={theme} 
              onSuccess={() => setChatMode('builder')} 
              onCancel={() => setChatMode('normal')} 
            />
          )}

          {chatMode === 'builder' ? (
            <BuilderMode 
              theme={theme} 
              selectedModel={selectedModel} 
              onExit={() => setChatMode('normal')} 
            />
          ) : (
            <>
              {/* NORMAL CHAT MODE */}
              <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>FixO</h3>
                    <p className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>Powered by Firehox</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setChatMode('puzzle')} 
                    className={`p-1.5 rounded-lg border transition-colors ${theme === 'dark' ? 'bg-white/10 border-orange-500/50 text-orange-400 hover:bg-orange-500/20' : 'bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100'}`}
                    title="Unlock Builder Mode"
                  >
                    <Wrench size={14} />
                  </button>
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className={`p-1.5 rounded-lg border transition-colors ${theme === 'dark' ? 'bg-white/10 border-white/20 text-gray-300 hover:text-white' : 'bg-black/5 border-black/10 text-gray-700 hover:text-black'}`}
                    title={isMuted ? "Unmute Voice" : "Mute Voice"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className={`text-[10px] p-1.5 rounded-lg border focus:outline-none appearance-none cursor-pointer ${
                      theme === 'dark' 
                        ? 'bg-white/10 border-white/20 text-gray-300 hover:border-purple-500' 
                        : 'bg-black/5 border-black/10 text-gray-700 hover:border-purple-500'
                    }`}
                  >
                    {AVAILABLE_MODELS.map(model => (
                      <option key={model.id} value={model.id} className="bg-black text-white">{model.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-tr-sm' : `${theme === 'dark' ? 'bg-white/10 text-gray-200' : 'bg-black/5 text-gray-800'} rounded-tl-sm border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}`}>{msg.text}</div>
                  </div>
                ))}
                {isLoading && <div className="text-xs text-gray-500 animate-pulse">Thinking...</div>}
                <div ref={messagesEndRef} />
              </div>
              
              <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10 bg-black/50' : 'border-black/5 bg-white/50'}`}>
                <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 mb-2">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(suggestion)}
                      disabled={isLoading}
                      className={`whitespace-nowrap text-[10px] px-3 py-1.5 rounded-full border transition-colors ${
                        theme === 'dark' 
                          ? 'border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/40' 
                          : 'border-black/20 text-gray-700 hover:bg-black/5 hover:border-black/40'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about skills..." className={`flex-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-purple-500' : 'bg-black/5 border-black/10 text-black focus:border-purple-500'} rounded-xl px-4 py-2 text-sm transition-colors focus:outline-none`} />
                  <button type="submit" disabled={isLoading} className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50"><Send size={18} /></button>
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
