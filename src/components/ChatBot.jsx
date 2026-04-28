import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';

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

const ChatBot = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Abrar's AI Assistant. Ask me anything about his projects, skills, or experience! ✨" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const prompt = `System Context: ${PORTFOLIO_CONTEXT}\nUser Question: ${userMessage.text}\nAnswer:`;
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, error connecting to AI." }]);
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
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="text-purple-500" />}
        {!isOpen && (
          <span className={`absolute right-full mr-4 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-md ${theme === 'dark' ? 'text-white' : 'text-black'} text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10`}>
            Ask AI about me
          </span>
        )}
      </button>

      {isOpen && (
        <div className={`fixed bottom-44 right-6 md:right-12 z-[70] w-[90vw] md:w-[380px] h-[500px] ${theme === 'dark' ? 'bg-black/90' : 'bg-white/95'} backdrop-blur-xl border ${theme === 'dark' ? 'border-white/10' : 'border-black/5'} rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300`}>
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'} flex items-center gap-3`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Abrar's Assistant</h3>
              <p className="text-[10px] text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>Powered by Gemini</p>
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
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about skills..." className={`flex-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-purple-500' : 'bg-black/5 border-black/10 text-black focus:border-purple-500'} rounded-xl px-4 py-2 text-sm transition-colors focus:outline-none`} />
              <button type="submit" disabled={isLoading} className="p-2 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors"><Send size={18} /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
