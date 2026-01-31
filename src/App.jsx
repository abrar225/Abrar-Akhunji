import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Code2,
  Cpu,
  Terminal,
  Database,
  Layers,
  Brain,
  Download,
  User,
  Briefcase,
  CheckCircle2,
  Globe,
  Music,
  Cloud,
  Home,
  Sparkles,
  MessageSquare,
  Send,
  X,
  Bot,
  FileCode,
  Monitor,
  GraduationCap,
  Award,
  Trophy,
  Quote,
  Instagram,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 🔒 SECURE API CONFIGURATION
// ============================================
// The API URL should point to your backend proxy (e.g., Vercel)
// In development, this uses localhost. In production, it uses VITE_API_URL.
const API_URL = import.meta.env.VITE_API_URL || '/api/chat';

// ============================================
// 📚 KNOWLEDGE BASE - Predefined Answers
// ============================================
const KNOWLEDGE_BASE = {
  // Quick Questions with Predefined Answers
  "what are abrar's main skills?": {
    answer: "Abrar specializes in AI/ML and Full-Stack Development. His core skills include Python, Django, Flask, OpenCV, Pandas, NumPy for AI/ML work, and JavaScript, React for web development. He's also proficient with Git, GitHub, Android Studio, and has experience with Kali Linux for cybersecurity tasks.",
    tags: ["skills", "technical"]
  },

  "tell me about his projects": {
    answer: "Abrar has built impressive projects including: 1) Library Management System (Django, MySQL) - a full-stack solution for inventory and payments, 2) Cattle Breed Identification System - AI model recognizing 41 Indian cattle breeds using Vision Transformers, 3) Brain Tumor Detection - MRI-based detection using Computer Vision, 4) Real vs AI Image Detector - deep learning system to identify AI-generated images, and 5) Kid's Space Android App - educational app for children.",
    tags: ["projects", "portfolio"]
  },

  "what's his educational background?": {
    answer: "Abrar is currently pursuing a Bachelor of Engineering in Information Technology (2023-Present) at Kalol Institute of Technology & Research Center. He previously completed his Diploma in Information Technology (2020-2023) from Government Polytechnic, Himmatnagar with a strong foundation in programming and software development.",
    tags: ["education", "background"]
  },

  "what technologies does he work with?": {
    answer: "Abrar works with a diverse tech stack: Python (Django, Flask), JavaScript, Java, PHP for programming; OpenCV, TensorFlow/PyTorch, NumPy, Pandas for AI/ML; MySQL for databases; HTML, CSS, React for frontend; Git/GitHub for version control; and Android Studio for mobile development. He's experienced with both backend systems and modern web frameworks.",
    tags: ["technologies", "stack"]
  },

  "does he have any certifications?": {
    answer: "Yes! Abrar holds the Google Cybersecurity Professional Certificate and was a participant in Smart India Hackathon 2022. He's also completed various AI/ML workshops including AI/ML Basics Workshop. He continuously upskills through certifications and hands-on projects.",
    tags: ["certifications", "achievements"]
  },

  // Additional Common Questions
  "contact": {
    answer: "You can reach Abrar at moabrarakhunji@gmail.com. He's based in Gujarat, India and is actively looking for opportunities in AI/ML and Full-Stack Development roles.",
    tags: ["contact", "email"]
  },

  "experience": {
    answer: "Abrar is currently working as a Full-Stack Python Intern at BrainyBeam (Jan 2026 - Present), focusing on advanced Django and Python development. Previously, he worked as a Python Django Intern (July 2025) and Web Developer & Designer Intern (Jun-Aug 2024), gaining hands-on experience in backend architecture, REST APIs, and responsive UI design.",
    tags: ["experience", "work"]
  },

  "location": {
    answer: "Abrar is based in Gujarat, India (PIN: 383001). He's open to remote opportunities and relocation for the right role.",
    tags: ["location", "india"]
  }
};

// Portfolio context for AI
const PORTFOLIO_CONTEXT = `
You are an AI Assistant for Abrar Akhunji's portfolio website.
Key Information:
- Name: Abrar Akhunji
- Tagline: "I constantly try to improve."
- Current Role: Full-Stack Python Intern at BrainyBeam (Jan 2026 - Present)
- Education: 
  1. B.E. in Information Technology (2023-Present) at Kalol Institute of Technology & Research Center.
  2. Diploma in IT (2020-2023) at Government Polytechnic, Himmatnagar.
- Skills: 
  - AI/ML: NumPy, Pandas, OpenCV, TensorFlow/PyTorch, Vision Transformers, Model Training, Data Preprocessing
  - Languages: Python, Java, PHP, JavaScript
  - Web: Django, Flask, React, HTML, CSS, REST APIs
  - Tools: Git, GitHub, Android Studio, VSCode, Kali Linux, MySQL
- Projects: 
  1. Library Management System (Django, MySQL)
  2. Cattle Breed Identification (Vision Transformers, 41 breeds)
  3. Brain Tumor Detection (MRI, Computer Vision)
  4. Real vs AI Image Detector (Deep Learning)
  5. Kid's Space Android App
- Certifications: Google Cybersecurity Professional, Smart India Hackathon 2022, AI/ML Workshops
- Contact: moabrarakhunji@gmail.com
- Location: Gujarat, India
`;

// ============================================
// 🤖 SMART ANSWER FUNCTION
// ============================================
const getSmartAnswer = (question) => {
  const normalizedQuestion = question.toLowerCase().trim();

  // Check for exact matches in knowledge base
  if (KNOWLEDGE_BASE[normalizedQuestion]) {
    return { answer: KNOWLEDGE_BASE[normalizedQuestion].answer, source: 'knowledge_base' };
  }

  // Check for keyword matches
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    if (normalizedQuestion.includes(key) ||
      value.tags.some(tag => normalizedQuestion.includes(tag))) {
      return { answer: value.answer, source: 'knowledge_base' };
    }
  }

  // If no match found, return null (will use Gemini API)
  return null;
};

// --- Theme Toggle Component ---
const ThemeToggle = ({ theme, toggleTheme }) => (
  <motion.button
    onClick={toggleTheme}
    className="fixed top-24 right-6 md:right-12 z-[70] p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-purple-600" />}
  </motion.button>
);


// --- NEW COMPONENT: CustomCursor (Themed) ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-purple-500 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
      />
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-purple-500/50 rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
          borderColor: isHovering ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.3)'
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
};

// --- NEW COMPONENT: LoadingScreen (Tech/Terminal Style) ---
const LoadingScreen = ({ onComplete, theme }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("INITIALIZING_SYSTEM");

  const loadingTexts = [
    "LOADING_ASSETS",
    "COMPILING_SHADERS",
    "CONNECTING_NEURAL_NET",
    "FETCHING_DATA",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Change text based on progress milestones
        const index = Math.floor((prev / 100) * loadingTexts.length);
        setText(loadingTexts[Math.min(index, loadingTexts.length - 1)]);
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[#030303] text-white' : 'bg-[#f8f9fa] text-black'}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-[300px] font-mono text-xs md:text-sm">
        <div className="flex justify-between mb-2 text-gray-500">
          <span>STATUS</span>
          <span className="text-purple-500 animate-pulse">PROCESSING</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/10 mb-4 relative overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">
            {`> ${text}...`}
          </span>
          <span className="font-bold text-purple-400 text-xl">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- NEW COMPONENT: SectionWrapper (GSAP Powered) ---
const SectionWrapper = ({ children, className = "", delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const animation = gsap.fromTo(el,
      {
        opacity: 0,
        y: 40,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// --- ChatBot Component ---
const ChatBot = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Abrar's AI Assistant. Ask me anything about his projects, skills, or experience! ✨" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageLimit, setMessageLimit] = useState({ count: 0, resetTime: null });
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef(null);

  const MESSAGE_LIMIT = 10; // Rate limit: 10 messages per 24 hours
  const LIMIT_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Message limit management with 24-hour reset
  const initializeMessageLimit = () => {
    try {
      const stored = localStorage.getItem('chatbot_message_limit');
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();

        // Check if 24 hours have passed
        if (now >= data.resetTime) {
          // Reset the limit
          const newData = { count: 0, resetTime: now + LIMIT_DURATION };
          localStorage.setItem('chatbot_message_limit', JSON.stringify(newData));
          return newData;
        }
        return data;
      } else {
        // First time - initialize
        const newData = { count: 0, resetTime: Date.now() + LIMIT_DURATION };
        localStorage.setItem('chatbot_message_limit', JSON.stringify(newData));
        return newData;
      }
    } catch (error) {
      // Fallback if localStorage is not available
      return { count: 0, resetTime: Date.now() + LIMIT_DURATION };
    }
  };

  const incrementMessageCount = () => {
    try {
      const current = initializeMessageLimit();
      current.count += 1;
      localStorage.setItem('chatbot_message_limit', JSON.stringify(current));
      setMessageLimit(current);
      return current.count;
    } catch (error) {
      return 0;
    }
  };

  const getRemainingMessages = () => {
    const current = messageLimit.count > 0 ? messageLimit : initializeMessageLimit();
    return MESSAGE_LIMIT - current.count;
  };

  const getTimeUntilReset = () => {
    const current = messageLimit.resetTime ? messageLimit : initializeMessageLimit();
    const remaining = current.resetTime - Date.now();
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    return { hours, minutes, milliseconds: remaining };
  };

  // Quick question suggestions
  const quickQuestions = [
    "What are Abrar's main skills?",
    "Tell me about his projects",
    "What's his educational background?",
    "What technologies does he work with?",
    "Does he have any certifications?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize message limit when chatbot opens
  useEffect(() => {
    if (isOpen) {
      const limit = initializeMessageLimit();
      setMessageLimit(limit);
    }
  }, [isOpen]);

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setShowQuickQuestions(false);
    handleSendMessage(question);
  };

  const handleSendMessage = async (quickQuestion = null) => {
    const messageText = quickQuestion || inputValue.trim();
    if (!messageText) return;

    // Check 24-hour limit
    const currentLimit = initializeMessageLimit();
    if (currentLimit.count >= MESSAGE_LIMIT) {
      const timeLeft = getTimeUntilReset();
      setMessages(prev => [...prev, {
        role: 'ai',
        text: `You've reached the daily limit of ${MESSAGE_LIMIT} messages. Limit resets in ${timeLeft.hours}h ${timeLeft.minutes}m. 🔄`
      }]);
      return;
    }

    const userMessage = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowQuickQuestions(false);

    // Increment the count in localStorage
    incrementMessageCount();

    try {
      // 🔍 STEP 1: Check Knowledge Base First
      const knowledgeBaseAnswer = getSmartAnswer(messageText);

      if (knowledgeBaseAnswer) {
        // Answer found in knowledge base - instant response!
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate thinking
        setMessages(prev => [...prev, {
          role: 'ai',
          text: knowledgeBaseAnswer.answer + " 💡"
        }]);
        setIsLoading(false);
        return;
      }

      // 🤖 STEP 2: Use Backend Proxy API for AI questions
      // This is secure because the API key stays on the server

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || data.error);
      }

      const aiResponseText = data.response;

      if (aiResponseText) {
        setMessages(prev => [...prev, { role: 'ai', text: aiResponseText + " 🤖" }]);
      } else {
        throw new Error("No response from AI");
      }

    } catch (error) {
      console.error('AI Error:', error);

      // Provide helpful error messages
      let errorMessage = "Sorry, I'm experiencing technical difficulties. ";

      if (error.message.includes('API Error: 400')) {
        errorMessage += "The API key might be invalid. Please check the configuration. 🔑";
      } else if (error.message.includes('API Error: 429')) {
        errorMessage += "Too many requests. Please try again in a moment. ⏳";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += "Network error. Please check your internet connection. 🌐";
      } else {
        errorMessage += "Try asking about Abrar's skills, projects, or experience! 💡";
      }

      setMessages(prev => [...prev, { role: 'ai', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-24 md:bottom-28 right-6 md:right-10 z-[70]">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl -z-10"
            />
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`p-3.5 md:p-4 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center group relative overflow-hidden transition-all duration-300`}
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <Sparkles size={20} className="md:w-6 md:h-6 text-purple-600" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip - Hidden on mobile for better UX */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                className={`absolute right-full mr-4 pointer-events-none hidden lg:block`}
              >
                <div className={`
                  ${theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'}
                  backdrop-blur-md text-[10px] font-mono tracking-widest px-4 py-2 rounded-full
                  opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0
                  border shadow-2xl flex items-center gap-3 whitespace-nowrap
                `}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  ASK AI ASSISTANT
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            data-chatbot-container
            className={`fixed bottom-16 md:bottom-24 right-4 md:right-6 z-[70] w-[calc(100vw-2rem)] sm:w-[350px] md:w-[400px] max-w-[min(400px,calc(100vw-2rem))] h-[calc(100vh-12rem)] sm:h-[480px] md:h-[550px] max-h-[min(600px,calc(100vh-8rem))] ${theme === 'dark' ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-2xl border ${theme === 'dark' ? 'border-white/10' : 'border-black/5'} rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Abrar's Assistant</h3>
                  <p className="text-[10px] text-purple-400 flex items-center gap-1 uppercase tracking-tighter font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                    POWERED BY FIREHOX
                  </p>
                  <p className={`text-[9px] font-mono mt-0.5 text-green-400`}>
                    ✓ Secure AI Proxy Enabled
                  </p>
                </div>
              </div>
              {/* Close button - visible on all devices */}
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-black/10 text-gray-600'} transition-colors`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" style={{ scrollBehavior: 'smooth', position: 'relative' }}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-sm'
                    : `${theme === 'dark' ? 'bg-white/10 text-gray-200' : 'bg-black/5 text-gray-800'} rounded-tl-sm border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`
                    }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Quick Questions - Show only at start */}
              {showQuickQuestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} font-mono`}>Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.slice(0, window.innerWidth < 640 ? 3 : 5).map((question, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickQuestion(question)}
                        className={`text-xs px-3 py-2 rounded-full ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} transition-colors border ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-300'}`}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-purple-500 animate-pulse font-mono pl-1">
                  <span className="w-1 h-1 bg-purple-500 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1 h-1 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.5s]"></span>
                  THINKING...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10 bg-black/50' : 'border-black/5 bg-white/50'}`}>
              {/* Rate Limit Indicator */}
              <div className="mb-2 flex items-center justify-between">
                <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
                  Messages: {messageLimit.count}/{MESSAGE_LIMIT}
                </span>
                {messageLimit.count >= MESSAGE_LIMIT ? (
                  <span className="text-[10px] text-red-400 font-mono animate-pulse">
                    Resets in {getTimeUntilReset().hours}h {getTimeUntilReset().minutes}m
                  </span>
                ) : getRemainingMessages() <= 2 ? (
                  <span className="text-[10px] text-orange-400 font-mono">
                    {getRemainingMessages()} left
                  </span>
                ) : null}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={messageLimit.count >= MESSAGE_LIMIT ? "Daily limit reached..." : "Ask about skills..."}
                  disabled={messageLimit.count >= MESSAGE_LIMIT}
                  className={`flex-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white focus:border-purple-500' : 'bg-black/5 border-black/10 text-black focus:border-purple-500'} rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border`}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim() || messageLimit.count >= MESSAGE_LIMIT}
                  className={`p-2.5 bg-purple-600 text-white rounded-xl transition-all ${isLoading || !inputValue.trim() || messageLimit.count >= MESSAGE_LIMIT ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500 active:scale-95'}`}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- 3D Background ---
const ThreeBackground = ({ theme }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const isDark = theme === 'dark';
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Core Sphere
    const geo = new THREE.IcosahedronGeometry(1.8, 2);
    const mat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x8b5cf6 : 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.03 : 0.08
    });
    const core = new THREE.Mesh(geo, mat);
    scene.add(core);

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 18;
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: isDark ? 0xffffff : 0x000000,
      transparent: true,
      opacity: isDark ? 0.3 : 0.15
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      core.rotation.y += 0.002;
      core.rotation.x += 0.001;
      particles.rotation.y -= 0.0005;
      camera.position.y = window.scrollY * -0.002; // Parallax
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, [theme]);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- Components ---

const FloatingDock = ({ theme }) => {
  const links = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about-me' },
    { icon: Layers, label: 'Work', href: '#work' },
    { icon: Briefcase, label: 'Exp', href: '#experience' },
    { icon: Mail, label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[95vw] max-w-max">
      <nav className={`flex items-center justify-center gap-1 md:gap-2 px-2 py-2 ${theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'} backdrop-blur-xl border rounded-full shadow-2xl ring-1 ring-white/5`}>
        {links.map((link, idx) => (
          <a key={idx} href={link.href} className={`group relative p-2 md:p-3 rounded-full ${theme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-black/10'} transition-all duration-300`}>
            <link.icon size={18} className={`${theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-black'} transition-colors`} />
            <span className={`absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} border border-white/10 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl`}>
              {link.label}
            </span>
          </a>
        ))}
        <div className={`w-px h-6 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} mx-1 md:mx-1`}></div>
        <a href="mailto:moabrarakhunji@gmail.com" className={`px-3 md:px-4 py-1.5 md:py-2 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-full text-[10px] md:text-sm font-bold transition-colors`}>Hire Me</a>
      </nav>
    </div>
  );
};

const SectionHeader = ({ title, number, theme }) => (
  <div className={`flex items-baseline gap-4 mb-8 border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} pb-4`}>
    <span className="font-mono text-xs text-purple-400">0{number}</span>
    <h2 className={`text-2xl md:text-3xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h2>
  </div>
);

const AdvancedProjectCard = ({ project, theme }) => (
  <div className="w-[85vw] md:w-[60vw] flex-shrink-0 snap-center min-h-[500px] h-auto md:h-[75vh]">
    <div className={`group relative h-full rounded-3xl overflow-hidden border ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-black/5 bg-white/60'} backdrop-blur-md transition-all duration-500 hover:border-purple-500/30 shadow-2xl`}>
      <div className="grid md:grid-cols-2 h-full">
        <div className={`p-6 md:p-8 lg:p-10 flex flex-col justify-between relative z-20 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/20'} overflow-y-auto custom-scrollbar`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full border ${theme === 'dark' ? 'border-white/10 bg-white/5 text-purple-300' : 'border-black/5 bg-black/5 text-purple-600'} text-[10px] font-mono uppercase tracking-wider`}>{project.category}</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono`}>{project.year}</span>
            </div>
            <h3 className={`text-2xl md:text-3xl lg:text-4xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} mb-4 leading-tight`}>{project.title}</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed mb-6`}>{project.description}</p>
            <ul className="space-y-3 mb-6">
              {project.features.map((feature, idx) => (
                <li key={idx} className={`flex items-start gap-3 text-xs md:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <CheckCircle2 size={14} className="text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-[10px] font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase mb-3`}>Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(t => <span key={t} className={`px-2 py-1 text-[10px] border ${theme === 'dark' ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'} rounded`}>{t}</span>)}
            </div>
            <div className="flex gap-4">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs md:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors`}>Live Demo <ArrowUpRight size={14} /></a>
              ) : (
                <span className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-400 cursor-not-allowed">Live Demo (Soon)</span>
              )}

              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-xs md:text-sm font-bold ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}><Github size={14} /> Source</a>
              ) : (
                <span className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-400 cursor-not-allowed"><Github size={14} /> Source (Soon)</span>
              )}
            </div>
          </div>
        </div>
        <div className="relative h-[250px] md:h-full overflow-hidden order-first md:order-last">
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-black/80 md:bg-gradient-to-l' : 'bg-gradient-to-b from-transparent to-white/40 md:bg-gradient-to-l'} z-10`} />
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const heroTextRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // Handle Lenis and GSAP together
  useLayoutEffect(() => {
    if (isLoading) return;

    let lenis;
    let updateLenis;

    let ctx = gsap.context(() => {
      // 1. Lenis Smooth Scroll
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      // Synchronize ScrollTrigger with Lenis
      lenis.on('scroll', ScrollTrigger.update);

      updateLenis = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);

      // 2. Hero Animations
      const heroElements = heroTextRef.current?.children;
      if (heroElements) {
        const tl = gsap.timeline();
        tl.fromTo(heroElements[0], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2)
          .fromTo(heroElements[2], { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.4)
          .fromTo(heroElements[4], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.6);
      }

      // 3. Responsive Scroll (Horizontal on Desktop, Vertical on Mobile)
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (sectionRef.current && scrollRef.current) {
          const amountToScroll = scrollRef.current.scrollWidth - window.innerWidth;

          gsap.to(scrollRef.current, {
            x: -amountToScroll,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${amountToScroll}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      });

      // 4. Handle Hash Navigation
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          lenis.scrollTo(hash, { offset: 0, duration: 1.2 });
        }, 1200);
      }
    });

    // Refresh ScrollTrigger after elements are likely rendered
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    return () => {
      if (lenis) {
        lenis.destroy();
      }
      if (updateLenis) {
        gsap.ticker.remove(updateLenis);
      }
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isLoading]);


  const projects = [
    { title: "Library Management System", category: "FULL STACK", year: "2025", description: "A high-performance ecosystem designed to bridge the gap between physical pages and digital convenience. Manage inventory, process secure payments, and build a community of readers.", features: ["Inventory management system", "Secure payment processing", "Reader community platform", "Digital catalog integration"], tech: ["Python", "Django", "MySQL", "HTML", "CSS", "JavaScript"], image: "images/library_management.png", github: "https://github.com/abrar225/Library-Management-System", demo: null },
    { title: "Real vs AI Image Detector", category: "COMPUTER VISION", year: "2025", description: "A deep-learning powered system that identifies whether an image is AI-generated or real using advanced image forensics and transformer-based feature extraction.", features: ["AI-vs-Real image classification", "Vision Transformer–based feature embedding", "Noise & artifact pattern detection"], tech: ["Python", "OpenCV", "NumPy", "Pandas", "TensorFlow/PyTorch"], image: "images/Real vs AI.png", github: null, demo: null },
    { title: "Cattle Breed Identification System", category: "AI/ML", year: "2025", description: "An ensemble-based AI tool capable of classifying 41 Indian cattle breeds using Vision Transformers and image preprocessing techniques.", features: ["Recognition of 41 unique cattle breeds", "Vision Transformer (ViT) embeddings", "Clean dataset preprocessing pipeline"], tech: ["Python", "OpenCV", "Vision Transformer"], image: "images/Cattel Breed.png", github: "https://github.com/abrar225/AI_cattle_vison", demo: "https://huggingface.co/spaces/abrar225/BreedAI" },
    { title: "Brain Tumor Detection (MRI)", category: "HEALTHCARE AI", year: "2024", description: "A Computer Vision model trained on MRI scan data to detect tumor presence with high accuracy using classical image processing and ML techniques.", features: ["Automated MRI-based tumor detection", "Binary classification (tumor / no tumor)", "Mask processing + thresholding + contour analysis"], tech: ["Python", "OpenCV", "NumPy", "Pandas"], image: "images/Brain Tumor Detection.png", github: "https://github.com/abrar225/Brain-Tumer-Detection-System", demo: null },
    { title: "Kid's Space (Android App)", category: "ANDROID", year: "2023", description: "An interactive educational Android app designed for kids, focused on simple UI/UX and modular Java development.", features: ["Clean, kid-friendly UI", "Built using XML layouts", "Focused on kid's study"], tech: ["Android Studio", "XML", "Java"], image: "images/Kid’s Space.png", github: null, demo: null }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#030303] text-gray-300' : 'bg-[#f8f9fa] text-gray-800'} font-sans selection:bg-purple-500/30 selection:text-purple-200 transition-colors duration-300`}>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} theme={theme} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ThreeBackground theme={theme} />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          {/* Header */}
          <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 pointer-events-none">
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-black/50 to-transparent' : 'bg-gradient-to-b from-white/50 to-transparent'} pointer-events-none h-32`}></div>
            <div className="pointer-events-auto">
              <span className={`font-bold tracking-tighter text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>ABRAR<span className="text-purple-500">.</span></span>
            </div>
            <div className="hidden md:flex items-center gap-6 pointer-events-auto">
              <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}>GH</a>
              <a href="https://www.linkedin.com/in/abrar-akhunji/" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}>LI</a>
              <a href="https://www.instagram.com/strick.9_/" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} hover:text-purple-500 transition-colors`}>IG</a>
              <span className="text-xs font-mono text-gray-700">/</span>
              <span className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>INDIA, GJ</span>
            </div>
          </header>

          <FloatingDock theme={theme} />
          <ChatBot theme={theme} />

          <main className="relative z-10">

            {/* Hero Section */}
            <section id="home" className="min-h-[90vh] flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-6 pt-32 pb-20 relative z-10">
              <SectionWrapper className="space-y-6 flex flex-col items-center">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${theme === 'dark' ? 'border-purple-500/20 bg-purple-500/10' : 'border-purple-500/30 bg-purple-100/50'} backdrop-blur-md`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                  <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'} tracking-widest uppercase`}>Open to work</span>
                </div>
                <h1
                  ref={heroTextRef}
                  className={`text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'} leading-[1.1] md:leading-[0.9]`}
                >
                  <span className="font-museo inline-block">Engineer of</span> <br />
                  <span className="font-custom text-purple-500 text-6xl sm:text-7xl md:text-9xl block mt-2 mb-2">Intelligent</span>
                  <span className="font-museo inline-block">Systems.</span>
                </h1>
                <p className={`max-w-lg text-base md:text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed pt-4`}>
                  I bridge the gap between <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>complex AI models</span> and <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}>scalable web architectures</span>. Building the next generation of digital products.
                </p>
              </SectionWrapper>
              <SectionWrapper delay={0.2} className="mt-16 md:mt-24 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 border-t border-white/10 sm:border-t pt-8">
                {['Experience', 'Focus', 'Stack'].map((label, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <p className={`text-[10px] md:text-xs font-mono ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'} uppercase mb-1`}>{label}</p>
                    <p className={`text-xs md:text-sm ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>{['Early Career — AI & Web Development', 'AI/ML & Full Stack', 'Python • React • Java'][i]}</p>
                  </div>
                ))}
              </SectionWrapper>
            </section>

            {/* About Me */}
            <section id="about-me" className="py-24 md:py-40 max-w-6xl mx-auto px-6 relative z-20">
              <div className="absolute inset-0 -z-10">
                <div className={`absolute top-1/4 right-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-200/20'} rounded-full blur-[100px]`}></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                <div className="md:col-span-7 space-y-8">
                  <SectionWrapper>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <div className={`h-px w-24 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} ml-4`}></div>
                      <span className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>bio.txt</span>
                    </div>
                    <h2 className={`text-4xl md:text-6xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} leading-tight`}>
                      I speak <span className="font-serif italic text-purple-400">Code</span> & <br />
                      <span className="font-serif italic text-purple-400">Algorithms.</span>
                    </h2>
                  </SectionWrapper>
                  <SectionWrapper delay={0.2} className={`space-y-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm leading-relaxed font-mono border-l ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'} pl-6 p-4 rounded-r-xl`}>
                    <p>
                      <span className="text-purple-400">const</span> <span className={theme === 'dark' ? 'text-yellow-200' : 'text-yellow-600'}>Abrar</span> = <span className="text-blue-400">{`{`}</span><br />
                      &nbsp;&nbsp;role: <span className="text-green-500">"AI/ML Engineer + Python Developer + Full-Stack Learner"</span>,<br />
                      &nbsp;&nbsp;location: <span className="text-green-500">"India,Gujrat,383001"</span>,<br />
                      &nbsp;&nbsp;passion: <span className="text-green-500">"Teaching Machines to See & Think"</span><br />
                      <span className="text-blue-400">{`}`};</span>
                    </p>
                    <p>I'm an AI/ML and Python developer specializing in backend systems and modern web development.
                      I enjoy turning ideas into real applications—whether it's detecting tumors or identifying cattle breeds.
                      I love working on meaningful projects and constantly leveling up my engineering skills.</p>
                  </SectionWrapper>
                  <SectionWrapper delay={0.3} className={`p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'} border rounded-2xl flex items-center gap-6 hover:bg-purple-500/5 transition-colors backdrop-blur-sm`}>
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Music size={24} /></div>
                    <div>
                      <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} font-medium text-sm mb-1`}>Offline Mode</h4>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>When I'm not coding, I'm writing rap songs, cooking with friends, or exploring new tech ideas.</p>
                    </div>
                  </SectionWrapper>
                </div>

                <div className="md:col-span-5 relative flex justify-center mt-12 md:mt-0">
                  <SectionWrapper delay={0.4} className={`relative w-64 md:w-72 h-80 md:h-96 rounded-2xl overflow-hidden border ${theme === 'dark' ? 'border-white/10' : 'border-black/5'} group transform transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent z-20 mix-blend-overlay"></div>
                    <img src="images/myimg.jpg" alt="Abrar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className={`absolute bottom-4 right-4 left-4 p-3 ${theme === 'dark' ? 'bg-black/60 border-white/10' : 'bg-white/60 border-black/10'} backdrop-blur-xl border rounded-lg z-30`}>
                      <div className={`flex items-center gap-2 text-[10px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-1`}><FileCode size={12} /><span>stack_overflow.py</span></div>
                      <div className={`h-1 w-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} rounded-full overflow-hidden`}><div className="h-full w-2/3 bg-green-500"></div></div>
                    </div>
                  </SectionWrapper>
                </div>
              </div>
            </section>

            {/* Horizontal Scroll Projects Section */}
            <section id="work" ref={sectionRef} className={`relative w-full overflow-hidden z-30 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-[#f8f9fa]'}`}>
              <div className="min-h-screen md:flex md:items-center overflow-x-hidden md:overflow-hidden py-24 md:py-0">
                <div ref={scrollRef} className="flex flex-col md:flex-row md:items-center h-full gap-12 md:gap-0 md:pl-12 w-full md:w-max will-change-transform">

                  {/* Intro Card */}
                  <div className={`w-full md:w-[400px] flex-shrink-0 flex flex-col justify-center px-6 md:px-0 md:mr-24 md:ml-12 md:pr-12 md:border-r ${theme === 'dark' ? 'md:border-white/10' : 'md:border-black/10'} h-auto md:h-[60vh]`}>
                    <div className="mb-8"><SectionHeader title="Selected Works" number="1" theme={theme} /></div>
                    <h3 className={`text-4xl md:text-5xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} mb-6 leading-tight`}>
                      Crafting <br /><span className="text-purple-500">Tomorrow’s</span> <br />Intelligence.
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} text-sm leading-relaxed`}>
                      A curated showcase of AI, Computer Vision, and Python-driven projects—where machine intelligence meets practical software engineering.
                      <br /><br /><span className={`${theme === 'dark' ? 'text-white' : 'text-black'} border-b border-purple-500 hidden md:inline`}>Scroll Down to Explore →</span>
                    </p>
                  </div>

                  {/* Project Cards */}
                  <div className="flex flex-col md:flex-row gap-12 md:gap-16 px-6 md:px-0 md:pr-24">
                    {projects.map((project, idx) => (
                      <AdvancedProjectCard key={idx} project={project} theme={theme} />
                    ))}
                  </div>

                  {/* End Card */}
                  <div className="w-full md:w-[300px] flex-shrink-0 flex items-center justify-center py-12 md:py-0">
                    <a href="https://github.com/abrar225" className="group flex flex-col items-center gap-6">
                      <div className={`w-20 md:w-24 h-20 md:h-24 rounded-full border ${theme === 'dark' ? 'border-white/20 hover:bg-white hover:text-black' : 'border-black/20 hover:bg-black hover:text-white'} flex items-center justify-center transition-all duration-500`}><ArrowUpRight size={32} /></div>
                      <span className={`text-lg md:text-xl font-light ${theme === 'dark' ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-black'}`}>View All Projects</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Experience & Skills Section */}
            <section id="experience" className={`py-24 md:py-32 max-w-5xl mx-auto px-6 relative z-40 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-[#f8f9fa]'}`}>
              <SectionWrapper>
                <SectionHeader title="Experience, Education & Skills" number="2" theme={theme} />
              </SectionWrapper>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Left Column: Experience & Education */}
                <div className="space-y-16">

                  {/* Work Experience */}
                  <div>
                    <h3 className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider mb-8 flex items-center gap-2`}>
                      <Briefcase size={16} /> Career History
                    </h3>
                    <div className={`relative border-l ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} pl-8 space-y-12`}>
                      {[
                        { role: "Full-Stack Python Intern", date: "JAN 2026 — PRESENT", desc: "Focusing on Advanced Django & Python Full-Stack development at BrainyBeam." },
                        { role: "Python Django Intern", date: "JULY 2025", desc: "Focusing on backend architecture & REST APIs." },
                        { role: "Web Developer & Designer Intern", date: "JUN 2024 — AUG 2024", desc: "Designed responsive interfaces & frontend logic." }
                      ].map((job, i) => (
                        <div key={i} className="relative">
                          <span className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-4 ring-transparent"></span>
                          <span className="text-xs font-mono text-purple-500 mb-1 block">{job.date}</span>
                          <h4 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>{job.role}</h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-2`}>{job.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider mb-8 flex items-center gap-2`}>
                      <GraduationCap size={16} /> Education
                    </h3>
                    <div className={`relative border-l ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} pl-8 space-y-12`}>
                      <div className="relative">
                        <span className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-transparent"></span>
                        <span className="text-xs font-mono text-blue-500 mb-1 block">AUG 2023 — PRESENT</span>
                        <h4 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Bachelor of Engineering (IT)</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mt-1`}>Kalol Institute of Technology & Research Center</p>
                      </div>

                      <div className="relative">
                        <span className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-transparent"></span>
                        <span className="text-xs font-mono text-blue-500 mb-1 block">2020 — 2023</span>
                        <h4 className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} font-medium`}>Diploma in Information Technology</h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mt-1`}>Government Polytechnic, Himmatnagar</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Skills & Certifications */}
                <div className="space-y-16">

                  {/* Skills */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h3 className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider flex items-center gap-2`}>
                        <Cpu size={16} /> Technical Arsenal
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Brain, t: "AI & Data Science", d: "Numpy, Pandas, OpenCV, Models" },
                        { icon: Code2, t: "Languages", d: "Python, Java, PHP, JS" },
                        { icon: Layers, t: "Web Frameworks", d: "Django, Flask, React" },
                        { icon: Terminal, t: "Tools", d: "Git, GitHub, Linux" },
                        { icon: Database, t: "Databases", d: "MySQL, SQLite" },
                        { icon: Monitor, t: "Others", d: "VSCode, Android Studio" }
                      ].map((s, i) => (
                        <div key={i} className={`p-4 border ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'} rounded-lg backdrop-blur-sm hover:border-purple-500/30 transition-colors group`}>
                          <s.icon className="text-purple-500 mb-3" size={20} />
                          <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-sm font-medium mb-1`}>{s.t}</h4>
                          <p className={`text-[10px] ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>{s.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider mb-8 flex items-center gap-2`}>
                      <Trophy size={16} /> Certifications
                    </h3>
                    <div className="space-y-4">
                      {[
                        { icon: Award, t: "Google Cybersecurity", d: "Google / Coursera • Sep 2025", c: "text-yellow-500" },
                        { icon: Trophy, t: "Smart India Hackathon", d: "Participation", c: "text-purple-500" },
                        { icon: Brain, t: "AI/ML Basics Workshop", d: "Coursera / College", c: "text-blue-500" }
                      ].map((cert, i) => (
                        <div key={i} className={`flex gap-4 p-4 border ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'} rounded-lg hover:border-purple-500/30 transition-colors`}>
                          <div className="mt-1"><cert.icon size={18} className={cert.c} /></div>
                          <div>
                            <h4 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-sm font-medium`}>{cert.t}</h4>
                            <p className="text-[10px] text-gray-500 mt-1">{cert.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Contact Footer */}
            <footer id="contact" className={`py-12 md:py-24 border-t ${theme === 'dark' ? 'border-white/5 bg-[#030303]' : 'border-black/5 bg-[#f8f9fa]'} max-w-5xl mx-auto px-6 relative z-50`}>
              <SectionWrapper>
                <div className="flex flex-col md:flex-row justify-between gap-12">
                  <div className="max-w-xl">
                    <h2 className={`text-4xl md:text-5xl font-light ${theme === 'dark' ? 'text-white' : 'text-black'} mb-6`}>Let's build the future.</h2>
                    <p className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mb-8`}>Currently looking for new opportunities in AI Engineering and Full Stack Development.</p>
                    <a href="mailto:moabrarakhunji@gmail.com" className={`inline-flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-black'} border-b border-purple-500 pb-1 hover:text-purple-400 transition-colors text-lg`}>moabrarakhunji@gmail.com <ArrowUpRight size={16} /></a>
                  </div>
                  <div className="flex flex-col gap-4 justify-end">
                    <a href="https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-6 py-3 border ${theme === 'dark' ? 'border-white/10 text-gray-400 hover:bg-white/5 hover:text-white' : 'border-black/10 text-gray-600 hover:bg-black/5 hover:text-black'} rounded-lg text-sm transition-colors`}><Download size={16} /> Download Resume</a>
                    <div className="flex gap-4 mt-4">
                      <a href="https://github.com/abrar225" target="_blank" rel="noopener noreferrer" className={`p-3 border ${theme === 'dark' ? 'border-white/10 text-gray-500 hover:text-white hover:bg-white/5' : 'border-black/10 text-gray-400 hover:text-black hover:bg-black/5'} rounded-full transition-colors`}><Github size={20} /></a>
                      <a href="https://www.linkedin.com/in/abrar-akhunji/" target="_blank" rel="noopener noreferrer" className={`p-3 border ${theme === 'dark' ? 'border-white/10 text-gray-500 hover:text-white hover:bg-white/5' : 'border-black/10 text-gray-400 hover:text-black hover:bg-black/5'} rounded-full transition-colors`}><Linkedin size={20} /></a>
                      <a href="https://www.instagram.com/strick.9_/" target="_blank" rel="noopener noreferrer" className={`p-3 border ${theme === 'dark' ? 'border-white/10 text-gray-500 hover:text-white hover:bg-white/5' : 'border-black/10 text-gray-400 hover:text-black hover:bg-black/5'} rounded-full transition-colors`}><Instagram size={20} /></a>
                    </div>
                  </div>
                </div>
                <div className={`mt-12 md:mt-24 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[10px] ${theme === 'dark' ? 'text-gray-700' : 'text-gray-400'} font-mono uppercase border-t ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} pt-8`}>
                  <span>© 2025 Abrar Akhunji</span>
                  <span>Local time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST</span>
                </div>
              </SectionWrapper>
            </footer>

          </main>
        </>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&family=Fira+Code:wght@400;500&family=Archivo+Black&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Raleway:wght@400;700;800&display=swap');
        
        @font-face {
          font-family: 'MagnificChaos';
          src: url('/font/MagnificChaosPersonalUseRegular-x3J88.ttf') format('truetype');
        }

        body { font-family: 'Outfit', sans-serif; background-color: var(--background); color: var(--foreground); }
        .font-mono { font-family: 'Fira Code', monospace; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-museo { font-family: 'Raleway', sans-serif; }
        .font-custom { font-family: 'MagnificChaos', cursive; }
        .font-fashion { font-family: 'Space Grotesk', sans-serif; }
        .font-script { font-family: 'Archivo Black', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif; font-style: italic; }
        html { scroll-behavior: auto !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
}