import React, { useState, useRef, useEffect } from 'react';
import { Send, Download, ChevronLeft, Code, Square, Cpu, Layout, FileCode2, Paintbrush, Zap, Monitor, Smartphone, Tablet, Copy, Check, Terminal, Play, Maximize, Columns, Settings, Lock, CheckCircle2, AlertCircle, X, MessageSquare, Plus, LogOut, Loader } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, doc, setDoc, getDoc, collection, addDoc, updateDoc, query, where, getDocs, orderBy, serverTimestamp } from '../lib/firebase';
import ErrorBoundary from './ErrorBoundary';
import { saveApiKey, loadApiKey, saveProvider, loadProvider, saveModels, loadModels, clearApiConfig, buildRequestContext, loadUserMemory, saveUserMemory, extractMemoryFromPrompt, needsSummarization, buildSummarizationRequest, saveChatSummary, getMemoryStats, getDefaultMemory, clearUserMemory } from '../lib/memory';

const BUILDER_CONTEXT = `
You are FixO The Builder, an expert UI/UX developer and creative designer.
Your goal is to build stunning, modern, and beautiful web interfaces.
When the user asks you to build or design something, you must return EXACTLY THREE markdown code blocks:
1. \`\`\`html (The HTML structure, do not include <html> or <body> tags, just the inner content)
2. \`\`\`css (The CSS styling, use modern aesthetics, flexbox, grid, glassmorphism if applicable)
3. \`\`\`javascript (The interactive JS logic)

DO NOT return any other text, explanations, or conversational filler. ONLY the code blocks.
`;

const PROVIDERS = [
  { id: 'openrouter', name: 'OpenRouter' },
  { id: 'openai', name: 'OpenAI' },
  { id: 'gemini', name: 'Google Gemini' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'groq', name: 'Groq' },
  { id: 'mistral', name: 'Mistral' },
  { id: 'cohere', name: 'Cohere' },
  { id: 'together', name: 'Together AI' },
  { id: 'nvidia', name: 'NVIDIA NIM' },
  { id: 'xai', name: 'xAI (Grok)' }
];

const PROVIDER_KEY_LINKS = {
  openrouter: 'https://openrouter.ai/keys',
  openai: 'https://platform.openai.com/api-keys',
  gemini: 'https://aistudio.google.com/app/apikey',
  anthropic: 'https://console.anthropic.com/settings/keys',
  groq: 'https://console.groq.com/keys',
  mistral: 'https://console.mistral.ai/api-keys',
  cohere: 'https://dashboard.cohere.com/api-keys',
  together: 'https://api.together.xyz/settings/api-keys',
  nvidia: 'https://build.nvidia.com/',
  xai: 'https://console.x.ai/'
};

const DEFAULT_MODELS = [
  // --- FREE MODELS ---
  { id: "minimax/minimax-m2.5:free", name: "Minimax M2.5 (Free)" },
  { id: "google/gemma-3-27b-it:free", name: "Gemma 3 27B (Free)" },
  { id: "meta-llama/llama-3.1-8b-instruct:free", name: "Llama 3.1 8B (Free)" },
  { id: "mistralai/pixtral-12b:free", name: "Pixtral 12B (Free)" },
  { id: "openai/gpt-oss-120b:free", name: "GPT OSS 120B (Free)" },
  { id: "nvidia/nemotron-nano-9b-v2:free", name: "Nemotron Nano (Free)" },
  { id: "liquid/lfm-2.5-1.2b-thinking:free", name: "Liquid LFM Thinking (Free)" },
  
  // --- PREMIUM MODELS ---
  { id: "openai/gpt-4o", name: "GPT-4o (Most Capable)" },
  { id: "openai/gpt-4o-mini", name: "GPT-4o Mini" },
  { id: "anthropic/claude-3.5-sonnet", name: "Claude 3.5 Sonnet" },
  { id: "anthropic/claude-3-opus", name: "Claude 3 Opus" },
  { id: "google/gemini-pro-1.5", name: "Gemini 1.5 Pro" },
  { id: "google/gemini-flash-1.5", name: "Gemini 1.5 Flash" },
  { id: "meta-llama/llama-3.1-405b-instruct", name: "Llama 3.1 405B" },
  { id: "meta-llama/llama-3.1-70b-instruct", name: "Llama 3.1 70B" },
  { id: "mistralai/mistral-large-2407", name: "Mistral Large 2" },
  { id: "deepseek/deepseek-chat", name: "DeepSeek Chat" },
  { id: "perplexity/llama-3.1-sonar-large-128k-online", name: "Sonar Llama 3.1" },
  { id: "cohere/command-r-plus", name: "Command R+" }
];

const PRESETS = [
  "Build a SaaS landing page",
  "Create a dark-mode dashboard",
  "Design a glassmorphic hero section"
];

const LAST_PROJECT_KEY = 'fixo_last_project_id';

const BuilderMode = ({ theme, initialModel, onExit }) => {
  // Auth State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Projects
  const [projects, setProjects] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showProjectList, setShowProjectList] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Trial / Credits State
  const [trialCount, setTrialCount] = useState(0);

  // Memory Engine State
  const [userMemory, setUserMemory] = useState(null);
  const [chatSummary, setChatSummary] = useState(null);

  const [messages, setMessages] = useState([
    { role: 'ai', text: "I am FixO The Builder. What are we creating today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(0); 
  const [previewCode, setPreviewCode] = useState({ html: '', css: '', js: '' });
  const [previewUrl, setPreviewUrl] = useState('');
  
  const [deviceView, setDeviceView] = useState('desktop'); 
  const [codeTab, setCodeTab] = useState('html'); 
  const [isCopied, setIsCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Responsive / Panel states
  const [activeView, setActiveView] = useState('split'); 
  const [mobileTab, setMobileTab] = useState('prompt'); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);
  
  // API Key & Provider Settings — Profile modal replaces old standalone Settings
  const [showProfile, setShowProfile] = useState(false);
    const [provider, setProvider] = useState(loadProvider());
  const [apiKey, setApiKey] = useState(loadApiKey());
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [fetchedModels, setFetchedModels] = useState(() => loadModels());
  
  const activeModels = fetchedModels.length > 0 ? fetchedModels : DEFAULT_MODELS;
  const [selectedModel, setSelectedModel] = useState(initialModel || activeModels[0].id);

  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll lock when Builder is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && activeView === 'split') {
        setActiveView('preview');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeView]);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          await initializeUser(currentUser.uid);
          await loadProjects(currentUser.uid);
          // Load persistent memory
          const mem = await loadUserMemory(currentUser.uid);
          setUserMemory(mem);
        } else {
          setUser(null);
          setUserMemory(null);
        }
      } catch (e) {
        console.error("Firebase auth error:", e);
      } finally {
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const initializeUser = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    const now = Date.now();
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      const lastResetDate = data.lastResetDate || 0;
      
      if (now - lastResetDate >= SEVEN_DAYS) {
        await setDoc(userRef, { trialCount: 3, lastResetDate: now }, { merge: true });
        setTrialCount(3);
      } else {
        setTrialCount(data.trialCount !== undefined ? data.trialCount : 3);
      }
    } else {
      await setDoc(userRef, { trialCount: 3, lastResetDate: now });
      setTrialCount(3);
    }
  };

  
  const loadProjects = async (uid) => {
    setProjectsLoading(true);
    try {
      const q = query(collection(db, 'projects'), where('userId', '==', uid), orderBy('updatedAt', 'desc'));
      const snapshot = await getDocs(q);
      const loadedProjects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(loadedProjects);
      
      if (loadedProjects.length > 0) {
        // Resume last opened project if available
        const lastId = localStorage.getItem(LAST_PROJECT_KEY);
        const resumeProject = lastId ? loadedProjects.find(p => p.id === lastId) : null;
        await switchProject(resumeProject || loadedProjects[0]);
      } else {
        await createNewProject(uid);
      }
    } catch (e) {
      console.error("Failed to load projects", e);
      await createNewProject(uid);
    } finally {
      setProjectsLoading(false);
    }
  };

  const createNewProject = async (uid = user?.uid) => {
    if (!uid) return;
    const newMessages = [{ role: 'ai', text: "I am FixO The Builder. What are we creating today?" }];
    const newProject = {
      userId: uid,
      title: "New Project",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      currentCode: null,
      currentHTML: '',
      currentCSS: '',
      currentJS: ''
    };
    try {
      // 1. Create Project
      const projRef = await addDoc(collection(db, 'projects'), newProject);
      
      // 2. Create associated Chat
      const chatRef = await addDoc(collection(db, 'chats'), {
        projectId: projRef.id,
        messages: newMessages,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setCurrentProjectId(projRef.id);
      setCurrentChatId(chatRef.id);
      setMessages(newMessages);
      setPreviewCode({ html: '', css: '', js: '' });
      setHasGenerated(false);
      setProjects([{ id: projRef.id, ...newProject, updatedAt: { toMillis: () => Date.now() } }, ...projects]);
      setShowProjectList(false);
    } catch (e) {
      console.error("Failed to create project", e);
    }
  };

  const switchProject = async (project) => {
    setCurrentProjectId(project.id);
    setShowProjectList(false);
    
    // Persist last opened project for resume-on-refresh
    localStorage.setItem(LAST_PROJECT_KEY, project.id);
    
    // Restore code from individual fields first, fallback to currentCode object
    const restoredCode = {
      html: project.currentHTML || project.currentCode?.html || '',
      css: project.currentCSS || project.currentCode?.css || '',
      js: project.currentJS || project.currentCode?.js || ''
    };
    
    if (restoredCode.html || restoredCode.css || restoredCode.js) {
      setPreviewCode(restoredCode);
      setHasGenerated(true);
      // Fast-restore to localStorage for instant recovery
      localStorage.setItem('fixo_last_code', JSON.stringify(restoredCode));
    } else {
      setPreviewCode({ html: '', css: '', js: '' });
      setHasGenerated(false);
    }

    // Load associated chat
    try {
      const chatQ = query(collection(db, 'chats'), where('projectId', '==', project.id), orderBy('updatedAt', 'desc'));
      const chatSnap = await getDocs(chatQ);
      if (!chatSnap.empty) {
        const chatDoc = chatSnap.docs[0];
        setCurrentChatId(chatDoc.id);
        setMessages(chatDoc.data().messages || []);
      } else {
        // Fallback: create a chat if none exists
        const newMessages = [{ role: 'ai', text: "I am FixO The Builder. What are we creating today?" }];
        const chatRef = await addDoc(collection(db, 'chats'), {
          projectId: project.id,
          messages: newMessages,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setCurrentChatId(chatRef.id);
        setMessages(newMessages);
      }
    } catch (e) {
      console.error("Failed to load project chat", e);
    }
  };

  const updateCurrentProject = async (newMessages, newPreviewCode = null, title = null) => {
    if (!currentProjectId || !currentChatId || !user) return;
    
    // 1. Update Chat messages
    try {
      await updateDoc(doc(db, 'chats', currentChatId), {
        messages: newMessages,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      console.error("Failed to update chat messages", e);
    }

    // 2. Update Project metadata & code (save both structured + individual fields)
    const projUpdate = { updatedAt: serverTimestamp() };
    if (newPreviewCode) {
      projUpdate.currentCode = newPreviewCode;
      projUpdate.currentHTML = newPreviewCode.html || '';
      projUpdate.currentCSS = newPreviewCode.css || '';
      projUpdate.currentJS = newPreviewCode.js || '';
      // Also persist to localStorage for instant recovery on refresh
      localStorage.setItem('fixo_last_code', JSON.stringify(newPreviewCode));
    }
    if (title && title !== "New Generation" && title !== "New Project") projUpdate.title = title;

    try {
      await updateDoc(doc(db, 'projects', currentProjectId), projUpdate);
      setProjects(prev => prev.map(p => {
        if(p.id === currentProjectId) return { ...p, ...projUpdate, updatedAt: { toMillis: () => Date.now() } };
        return p;
      }).sort((a, b) => {
        const timeA = a.updatedAt?.toMillis ? a.updatedAt.toMillis() : 0;
        const timeB = b.updatedAt?.toMillis ? b.updatedAt.toMillis() : 0;
        return timeB - timeA;
      }));
    } catch (e) {
      console.error("Failed to update project", e);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
      return {
        html: htmlMatch ? htmlMatch[1].trim() : '',
        css: cssMatch ? cssMatch[1].trim() : '',
        js: jsMatch ? jsMatch[1].trim() : ''
      };
    }
    return null;
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setGenerationStep(0);
      const newMsgs = [...messages, { role: 'ai', text: "Process interrupted." }];
      setMessages(newMsgs);
      updateCurrentProject(newMsgs);
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
      let modelsList = [];
      
      if (provider === 'openrouter') {
        const res = await fetch('https://openrouter.ai/api/v1/models', { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!res.ok) throw new Error('Invalid API Key');
        const data = await res.json();
        modelsList = (data.data || [])
          .filter(m => !m.id.includes('embedding') && !m.id.includes('dall-e') && !m.id.includes('tts') && !m.id.includes('whisper') && !m.id.includes('moderation'))
          .sort((a, b) => (a.id || '').localeCompare(b.id || ''))
          .map(m => ({ id: m.id, name: m.name || m.id }));
      } else if (provider === 'openai') {
        const res = await fetch('https://api.openai.com/v1/models', { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!res.ok) throw new Error('Invalid API Key');
        const data = await res.json();
        modelsList = (data.data || [])
          .filter(m => (m.id.includes('gpt') || m.id.includes('o1') || m.id.includes('o3') || m.id.includes('o4')) && !m.id.includes('instruct') && !m.id.includes('realtime'))
          .sort((a, b) => b.created - a.created)
          .map(m => ({ id: m.id, name: m.id }));
      } else if (provider === 'gemini') {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!res.ok) throw new Error('Invalid API Key');
        const data = await res.json();
        modelsList = (data.models || [])
          .filter(m => m.name.includes('gemini'))
          .map(m => ({ id: m.name.replace('models/', ''), name: m.displayName || m.name.replace('models/', '') }));
      } else if (provider === 'groq') {
        const res = await fetch('https://api.groq.com/openai/v1/models', { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!res.ok) throw new Error('Invalid API Key');
        const data = await res.json();
        modelsList = (data.data || [])
          .filter(m => m.active !== false)
          .map(m => ({ id: m.id, name: m.id }));
      } else if (provider === 'anthropic') {
        // Anthropic doesn't have a public model listing endpoint; validate key with a minimal request
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'claude-3-haiku-20240307', max_tokens: 1, messages: [{ role: 'user', content: 'hi' }] })
        });
        // 200 or 400 (bad request but key is valid) both indicate valid key; 401 means invalid
        if (res.status === 401) throw new Error('Invalid API Key');
        modelsList = [
          { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4' },
          { id: 'claude-3-7-sonnet-20250219', name: 'Claude 3.7 Sonnet' },
          { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet v2' },
          { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' },
          { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku' },
          { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
          { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
        ];
      } else if (provider === 'mistral') {
        const res = await fetch('https://api.mistral.ai/v1/models', { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!res.ok) throw new Error('Invalid API Key');
        const data = await res.json();
        modelsList = (data.data || [])
          .map(m => ({ id: m.id, name: m.id }));
      } else if (provider === 'together') {
        const res = await fetch('https://api.together.xyz/v1/models', { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!res.ok) throw new Error('Invalid API Key');
        const data = await res.json();
        modelsList = (data || [])
          .filter(m => m.type === 'chat' || m.type === 'language')
          .map(m => ({ id: m.id, name: m.display_name || m.id }));
      } else if (provider === 'cohere') {
        modelsList = [
          { id: 'command-r-plus', name: 'Command R+' },
          { id: 'command-r', name: 'Command R' },
          { id: 'command', name: 'Command' },
          { id: 'command-light', name: 'Command Light' }
        ];
      } else if (provider === 'nvidia') {
        modelsList = [
          { id: 'meta/llama-3.1-405b-instruct', name: 'Llama 3.1 405B' },
          { id: 'meta/llama-3.1-70b-instruct', name: 'Llama 3.1 70B' },
          { id: 'nvidia/nemotron-4-340b-instruct', name: 'Nemotron 340B' },
          { id: 'mistralai/mixtral-8x22b-instruct-v0.1', name: 'Mixtral 8x22B' },
          { id: 'google/gemma-2-27b-it', name: 'Gemma 2 27B' }
        ];
      } else if (provider === 'xai') {
        const res = await fetch('https://api.x.ai/v1/models', { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!res.ok) throw new Error('Invalid API Key');
        const data = await res.json();
        modelsList = (data.data || []).map(m => ({ id: m.id, name: m.id }));
        if (modelsList.length === 0) {
          modelsList = [
            { id: 'grok-2', name: 'Grok 2' },
            { id: 'grok-2-mini', name: 'Grok 2 Mini' },
            { id: 'grok-beta', name: 'Grok Beta' }
          ];
        }
      } else {
        modelsList = [{ id: 'default', name: `Default ${provider} Model` }];
      }

      if (modelsList.length === 0) {
        throw new Error('No models found for this API key. Please check your key permissions.');
      }

      setFetchedModels(modelsList);
      setSelectedModel(modelsList[0].id);
      
      saveProvider(provider);
      saveApiKey(apiKey);
      saveModels(modelsList);
      
      setVerificationStatus('success');
    } catch (error) {
      console.error('API key verification failed:', error);
      setVerificationStatus('error');
      setFetchedModels([]);
    }
    setIsVerifying(false);
  };

  const handleClearKey = () => {
    setApiKey('');
    setFetchedModels([]);
    setVerificationStatus(null);
    clearApiConfig();
    setSelectedModel(DEFAULT_MODELS[0].id);
  };

  // generateUnified is completely handled by our robust backend proxy now.

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async (overrideText = null) => {
    const isUsingCustomKey = !!loadApiKey();
    
    if (!isUsingCustomKey && trialCount <= 0) {
      setMessages(prev => [...prev, { role: 'ai', text: "You have exhausted your free generations. Please configure your own API Key in Settings to continue." }]);
      setShowProfile(true);
      return;
    }

    const textToSend = overrideText || inputValue;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInputValue("");
    setIsLoading(true);
    setHasGenerated(false);
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    simulateProgress();

    try {
      let aiResponseText = "";
      const customKey = loadApiKey();
      const customProvider = loadProvider();

      // ── Memory Extraction: learn from user's prompt ──
      if (user?.uid) {
        const memUpdates = extractMemoryFromPrompt(textToSend, userMemory);
        if (memUpdates) {
          const updatedMem = { ...(userMemory || getDefaultMemory()), ...memUpdates };
          setUserMemory(updatedMem);
          saveUserMemory(user.uid, updatedMem); // async, non-blocking
        }
      }

      // ── Build context with all 3 memory layers ──
      const apiMessages = buildRequestContext({
        systemPrompt: BUILDER_CONTEXT,
        messages: newMsgs,
        chatSummary: chatSummary,
        userMemory: userMemory,
        windowSize: 5
      });

      const requestBody = {
        model: selectedModel,
        messages: apiMessages,
        mode: "builder"
      };

      if (customKey && customProvider) {
        requestBody.customKey = customKey;
        requestBody.provider = customProvider;
      }

      const response = await fetch("/api/generate", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal
      });
      
      if (!response.ok) {
        const errObj = await response.json().catch(() => ({}));
        throw new Error(errObj.error || "Something went wrong. Try another model or check your API key.");
      }
      
      const data = await response.json();
      aiResponseText = data.data || "";

      if (aiResponseText) {
        const finalMsgs = [...newMsgs, { role: 'ai', text: "Render complete." }];
        setMessages(finalMsgs);
        const newCode = parseCodeBlocks(aiResponseText);
        
        if (newCode) {
           setPreviewCode(newCode);
           if (window.innerWidth < 768) setMobileTab('preview');
        }

        const chatTitle = textToSend.length > 20 ? textToSend.substring(0, 20) + '...' : textToSend;
        updateCurrentProject(finalMsgs, newCode || previewCode, messages.length <= 1 ? chatTitle : null);

        // ── Auto-summarize long conversations ──
        if (currentChatId && needsSummarization(finalMsgs, chatSummary)) {
          const sumReq = buildSummarizationRequest(finalMsgs, chatSummary);
          if (sumReq) {
            // Fire summarization in background (non-blocking)
            fetch("/api/generate", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: selectedModel, messages: sumReq, mode: 'chat', ...(customKey ? { customKey, provider: customProvider } : {}) })
            }).then(r => r.json()).then(d => {
              if (d.success && d.data) {
                setChatSummary(d.data);
                saveChatSummary(currentChatId, d.data);
              }
            }).catch(() => { /* summarization is best-effort */ });
          }
        }

        if (!isUsingCustomKey) {
          const newCount = trialCount - 1;
          setTrialCount(newCount);
          await setDoc(doc(db, 'users', user.uid), { trialCount: newCount }, { merge: true });
        }
      } else {
        throw new Error("Empty response received.");
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Generation failed:", error);
        const errMsgs = [...newMsgs, { role: 'ai', text: `Generation Error: ${error.message}. Try switching to another model or check your provider settings.`, isError: true }];
        setMessages(errMsgs);
        updateCurrentProject(errMsgs);
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
    const indexHtml = `<!DOCTYPE html>
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
    { step: 1, text: "Analyzing context...", icon: <Cpu size={14} className="animate-pulse text-violet-400" /> },
    { step: 2, text: "Structuring layout...", icon: <Layout size={14} className="animate-pulse text-fuchsia-400" /> },
    { step: 3, text: "Applying styles...", icon: <Paintbrush size={14} className="animate-pulse text-pink-400" /> },
    { step: 4, text: "Injecting logic...", icon: <FileCode2 size={14} className="animate-pulse text-rose-400" /> }
  ];

  if (authLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] text-white overflow-hidden">
         <Loader className="animate-spin text-violet-500" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-fuchsia-600/20 blur-[120px]"></div>
         <div className="relative z-10 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl text-center max-w-sm w-full mx-4 shadow-2xl">
            <button onClick={onExit} className="absolute top-4 left-4 p-2 text-white/50 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] mb-6 mt-4">
               <Code size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Fixo Builder</h2>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">Sign in to sync your generations, access powerful models, and save your chat history securely.</p>
            <button 
               onClick={handleLogin} 
               className="w-full py-3.5 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
            >
               Continue with Google
            </button>
         </div>
      </div>
    );
  }

  const isUsingCustomKey = !!loadApiKey();

  return (
    <div className={`fixed inset-0 z-50 flex flex-col h-[100dvh] w-full overflow-hidden ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#fcfcfc] text-black'}`}>
      
      
      

      
      

      {/* PROJECT LIST DRAWER */}
      {showProjectList && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowProjectList(false)}></div>
          <div className={`relative w-80 h-full flex flex-col shadow-2xl border-r ${theme === 'dark' ? 'bg-[#0a0a0c] border-white/10' : 'bg-[#fcfcfc] border-black/10'} animate-in slide-in-from-left duration-300`}>
             <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <h3 className="font-semibold flex items-center gap-2"><FileCode2 size={16} className="text-violet-500"/> My Projects</h3>
                <button onClick={() => setShowProjectList(false)} className="p-1 rounded opacity-50 hover:opacity-100"><X size={18}/></button>
             </div>
             <div className="p-3">
                <button onClick={() => createNewProject()} className="w-full py-2.5 px-3 rounded-lg border border-dashed border-violet-500/50 text-violet-500 flex items-center justify-center gap-2 text-sm font-medium hover:bg-violet-500/10 transition-all">
                  <Plus size={16} /> New Project
                </button>
             </div>
             <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {projects.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <FileCode2 size={32} className={`mb-3 ${theme === 'dark' ? 'text-white/10' : 'text-black/10'}`} />
                    <p className={`text-xs ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>No projects yet. Create your first one!</p>
                  </div>
                )}
                {projects.map(p => (
                  <button 
                    key={p.id} 
                    onClick={() => switchProject(p)}
                    className={`w-full text-left p-3 rounded-xl text-sm transition-all group ${currentProjectId === p.id ? (theme === 'dark' ? 'bg-violet-500/15 text-white border border-violet-500/20' : 'bg-violet-50 text-black border border-violet-200') : (theme === 'dark' ? 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent' : 'text-black/60 hover:bg-black/5 hover:text-black border border-transparent')}`}
                  >
                    <div className="font-medium truncate">{p.title || 'Untitled Project'}</div>
                    <div className={`text-[10px] mt-1 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                      {p.currentCode ? '● Has code' : '○ Empty'}
                      {p.updatedAt?.toMillis ? ` · ${new Date(p.updatedAt.toMillis()).toLocaleDateString()}` : ''}
                    </div>
                  </button>
                ))}
             </div>
             <div className={`p-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                <button 
                  onClick={() => { setShowProjectList(false); setShowProfile(true); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-xs font-bold uppercase overflow-hidden flex-shrink-0">
                    {user.photoURL ? <img src={user.photoURL} alt="User" className="w-full h-full object-cover" /> : user.email?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>{user.displayName || 'Developer'}</div>
                    <div className={`text-[10px] truncate ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{user.email}</div>
                  </div>
                  <Settings size={14} className={`flex-shrink-0 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`} />
                </button>
             </div>
          </div>
        </div>
      )}
      
      
      {/* UNIFIED PROFILE & SETTINGS MODAL */}
      {showProfile && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowProfile(false)}></div>
          
          <div className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${theme === 'dark' ? 'bg-[#0a0a0c] border border-white/10' : 'bg-white border border-black/10'} p-6 md:p-8 animate-in zoom-in-95 duration-300 custom-scrollbar`}>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <Settings className="text-violet-500" /> Account & Settings
              </h2>
              <button onClick={() => setShowProfile(false)} className="p-2 rounded-lg hover:bg-white/5 transition-colors"><X size={18} /></button>
            </div>

            {/* Section 1: User Info */}
            <div className={`p-4 rounded-2xl border mb-6 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 text-violet-500">User Profile</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-lg font-bold uppercase overflow-hidden shadow-lg">
                  {user?.photoURL ? <img src={user.photoURL} alt="User" /> : user?.email?.charAt(0)}
                </div>
                <div>
                  <div className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{user?.displayName || "Developer"}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-white/50' : 'text-black/50'}`}>{user?.email}</div>
                </div>
              </div>
            </div>

            {/* Section 2: AI Settings */}
            <div className={`p-4 rounded-2xl border mb-6 ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-violet-500">AI Provider & API</h3>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Provider</label>
                  <select
                    value={provider}
                    onChange={(e) => {
                      setProvider(e.target.value);
                      saveProvider(e.target.value);
                      clearApiConfig();
                      setApiKey('');
                      setVerificationStatus(null);
                      setFetchedModels(loadModels());
                    }}
                    className={`w-full text-sm p-3 rounded-xl border focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer transition-all ${
                      theme === 'dark' ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-black/[0.03] border-black/10 text-black'
                    }`}
                  >
                    {PROVIDERS.map(p => <option key={p.id} value={p.id} className="bg-black text-white">{p.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 flex justify-between ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                    <span>API Key</span>
                    <a 
                      href={PROVIDER_KEY_LINKS[provider] || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-500 hover:underline"
                      onClick={(e) => { e.preventDefault(); window.open(PROVIDER_KEY_LINKS[provider] || 'https://openrouter.ai/keys', '_blank'); }}
                    >Get Key →</a>
                  </label>
                  <div className="relative">
                    <Lock size={16} className={`absolute left-3 top-3.5 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`} />
                    <input 
                      type="password" 
                      value={apiKey} 
                      onChange={(e) => { setApiKey(e.target.value); setVerificationStatus(null); }}
                      placeholder={`Enter ${PROVIDERS.find(p => p.id === provider)?.name} API Key`}
                      className={`w-full text-sm py-3 pl-10 pr-3 rounded-xl border focus:outline-none focus:border-violet-500/50 font-mono transition-all ${
                        theme === 'dark' ? 'bg-white/[0.03] border-white/10 text-white' : 'bg-black/[0.03] border-black/10 text-black'
                      }`}
                    />
                  </div>
                </div>
                
                <button 
                  onClick={handleVerifyAndFetch}
                  disabled={!apiKey || isVerifying}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isVerifying ? <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div> : <CheckCircle2 size={16} />}
                  {isVerifying ? "Verifying & Fetching Models..." : "Verify Key & Load Models"}
                </button>

                {verificationStatus === 'success' && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-xs flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">API Key verified successfully!</p>
                      <p className="mt-1 opacity-70">{fetchedModels.length} models loaded. Select your preferred model from the dropdown in the left panel.</p>
                    </div>
                  </div>
                )}
                {verificationStatus === 'error' && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-start gap-2">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    <p>Failed to verify API key. Please check the key is correct, has proper permissions, and your internet is connected.</p>
                  </div>
                )}

                {/* Clear Key */}
                {loadApiKey() && (
                  <button 
                    onClick={handleClearKey}
                    className={`w-full py-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${theme === 'dark' ? 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white' : 'border-black/10 text-black/50 hover:bg-black/5 hover:text-black'}`}
                  >
                    <X size={14} /> Clear API Key & Use Free Models
                  </button>
                )}
              </div>
            </div>

            {/* Section 3: Account Settings */}
            <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-violet-500">Account Action</h3>
              <div className="space-y-3">
                <button onClick={() => setProjects([])} className={`w-full py-3 px-4 rounded-xl border border-rose-500/30 text-rose-500 bg-rose-500/5 flex items-center justify-center gap-2 text-sm font-bold hover:bg-rose-500/10 transition-all`}>
                  <X size={16} /> Clear All Projects
                </button>
                <button onClick={() => signOut(auth)} className={`w-full py-3 px-4 rounded-xl border border-rose-500/30 text-rose-500 bg-rose-500/5 flex items-center justify-center gap-2 text-sm font-bold hover:bg-rose-500/10 transition-all`}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MAIN GRID LAYOUT */}
      <div className={`flex-1 grid w-full h-full min-h-0 relative transition-all duration-300 ${
        sidebarOpen 
          ? (activeView === 'preview' ? 'grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[20%_80%_0%]' : 
             activeView === 'code' ? 'grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[20%_0%_80%]' :
             'grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[20%_55%_25%]')
          : 'grid-cols-1 md:grid-cols-1 lg:grid-cols-[0%_75%_25%]'
      }`}>
        {/* 1. LEFT PANEL (Prompt & Controls) */}
        <div className={`${mobileTab === 'prompt' ? 'flex' : 'hidden'} ${sidebarOpen ? 'md:flex' : 'md:hidden'} w-full h-full flex-col flex-shrink-0 border-r transition-colors duration-300 ${theme === 'dark' ? 'border-white/[0.05] bg-[#050505]' : 'border-black/[0.05] bg-[#fcfcfc]'} backdrop-blur-3xl z-10 relative overflow-hidden`}>
        
        {/* Header */}
        <div className={`p-4 border-b flex-shrink-0 flex items-center justify-between ${theme === 'dark' ? 'border-white/[0.05]' : 'border-black/[0.05]'}`}>
          <div className="flex items-center gap-3">
            <button onClick={onExit} className={`p-1.5 rounded-full hover:bg-black/10 ${theme === 'dark' ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'text-black/50 hover:text-black'} transition-all hover:scale-105 active:scale-95`}>
              <ChevronLeft size={18} />
            </button>
            <div className="relative cursor-pointer" onClick={() => setShowProjectList(true)} title="My Projects">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Code size={14} className="text-white" />
              </div>
            </div>
            <span className={`text-sm font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400`}>FixO IDE</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setShowProjectList(true)} className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white/70' : 'bg-black/5 hover:bg-black/10 text-black/70'}`} title="My Projects">
               <FileCode2 size={16} />
            </button>
            <button 
              onClick={() => setShowProfile(true)} 
              className={`p-0.5 rounded-full overflow-hidden border-2 transition-all ${isUsingCustomKey ? 'border-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]' : (theme === 'dark' ? 'border-white/10 hover:border-violet-500/50' : 'border-black/10 hover:border-violet-500/50')}`} 
              title="Profile & Settings"
            >
              {user?.photoURL 
                ? <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full" /> 
                : <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white flex items-center justify-center text-[10px] font-bold">{user?.email?.charAt(0) || 'U'}</div>
              }
            </button>
          </div>
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
          
          <div className={`p-3.5 rounded-xl border flex items-center justify-between ${isUsingCustomKey ? (theme === 'dark' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-green-50 border-green-200 text-green-700') : trialCount > 0 ? (theme === 'dark' ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-violet-500/10 border-violet-500/20 text-violet-700') : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
            <span className="text-xs font-medium">{isUsingCustomKey ? "Unlimited Usage" : "Free Trial Credits"}</span>
            <div className="flex items-center gap-1.5 font-mono text-sm">
              {isUsingCustomKey ? <CheckCircle2 size={14} /> : <Zap size={14} className={trialCount > 0 ? "fill-current" : ""} />}
              {isUsingCustomKey ? '∞' : `${trialCount}/3`}
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
                  : `${theme === 'dark' ? 'bg-white/[0.03] border-white/[0.05] text-white/90' : 'bg-black/[0.03] border-black/[0.05] text-black/90'} rounded-bl-sm border backdrop-blur-md ${msg.isError ? 'border-rose-500/50 bg-rose-500/10' : ''}`
              }`}>
                {msg.text}
                {msg.isError && (
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={() => {
                        const lastUserMsg = messages[idx - 1]?.text || "";
                        setInputValue(lastUserMsg);
                        setMessages(messages.slice(0, idx - 1));
                      }} 
                      className="py-1.5 px-3 bg-rose-600 hover:bg-rose-500 rounded-lg text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Play size={12} className="fill-current" /> Retry Request
                    </button>
                  </div>
                )}
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
              disabled={isLoading || (!isUsingCustomKey && trialCount <= 0)}
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

      {/* RIGHT WORKSPACE — PREVIEW + CODE AREA */}
      <div className={`${mobileTab !== 'prompt' ? 'flex' : 'hidden'} md:flex flex-col relative w-full h-full overflow-hidden z-0`}>
        
        {/* ═══ STICKY TOP BAR — ALWAYS VISIBLE, NEVER INSIDE SCROLLABLE AREA ═══ */}
        <div className={`sticky top-0 z-40 flex items-center justify-between px-3 md:px-4 py-3 border-b flex-shrink-0 ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]' : 'border-black/[0.05] bg-white'}`}>
          {/* View Mode Controls — ALWAYS rendered on md+ */}
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
          {/* Mobile: show context label */}
          <div className="md:hidden flex font-semibold text-xs items-center gap-2">
            <Layout size={16} className="text-violet-500"/> {mobileTab === 'code' ? 'Code Editor' : 'Live Preview'}
          </div>
          
          {/* Fake Browser URL Bar */}
          <div className={`flex-1 max-w-sm mx-3 flex items-center justify-center px-4 py-2 rounded-full border text-[11px] font-mono tracking-wide truncate ${theme === 'dark' ? 'bg-white/[0.02] border-white/[0.05] text-white/40' : 'bg-black/[0.02] border-black/[0.05] text-black/50'}`}>
            <span className="opacity-50">https://</span>fixo.build/preview
          </div>

          <div className="flex items-center gap-1 bg-black/10 dark:bg-black/20 p-1 rounded-lg border border-black/5 dark:border-white/5 hidden lg:flex">
            <button onClick={() => setDeviceView('desktop')} className={`p-1.5 rounded-md transition-all ${deviceView === 'desktop' ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-black shadow-sm') : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/80'}`}><Monitor size={16} /></button>
            <button onClick={() => setDeviceView('tablet')} className={`p-1.5 rounded-md transition-all ${deviceView === 'tablet' ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-black shadow-sm') : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/80'}`}><Tablet size={16} /></button>
            <button onClick={() => setDeviceView('mobile')} className={`p-1.5 rounded-md transition-all ${deviceView === 'mobile' ? (theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-black shadow-sm') : 'text-gray-400 hover:text-gray-600 dark:hover:text-white/80'}`}><Smartphone size={16} /></button>
            {/* Profile */}
            <button onClick={() => setShowProfile(true)} className={`ml-4 p-1.5 rounded-full overflow-hidden border-2 transition-all ${theme === 'dark' ? 'border-white/10 hover:border-violet-500' : 'border-black/10 hover:border-violet-500'}`} title="Profile & Settings">
              {user?.photoURL ? <img src={user.photoURL} alt="Profile" className="w-6 h-6 rounded-full" /> : <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white flex items-center justify-center text-[10px] font-bold">{user?.email?.charAt(0) || 'U'}</div>}
            </button>
            {/* Tablet Code Drawer Toggle */}
            <button onClick={() => setShowCodeDrawer(!showCodeDrawer)} className={`ml-2 p-1.5 rounded-md transition-all lg:hidden ${showCodeDrawer ? 'bg-violet-500/20 text-violet-400' : (theme === 'dark' ? 'text-white/50 hover:bg-white/5' : 'text-black/50 hover:bg-black/5')}`} title="Toggle Code">
              <Code size={16} />
            </button>
          </div>
        </div>

        {/* ═══ CONTENT AREA — only this scrolls, top bar stays fixed above ═══ */}
        <div className="flex-1 flex flex-col relative min-h-0 overflow-hidden">
          
          {/* PREVIEW — visible in preview and split modes */}
          <div className={`flex flex-col relative w-full h-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeView === 'code' ? 'hidden' : ''}`}>
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
        </div>
      </div>

      {/* CODE PANEL — visible in code and split modes on desktop, drawer on tablet, tab on mobile */}
      <div className={`${mobileTab === 'code' ? 'flex' : 'hidden'} ${showCodeDrawer ? 'md:flex' : 'md:hidden'} ${activeView === 'preview' ? 'lg:hidden' : 'lg:flex'} flex-col h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]' : 'border-black/[0.05] bg-[#fcfcfc]'} z-[60] md:fixed md:top-0 md:right-0 md:w-[400px] lg:relative lg:w-full lg:border-l md:shadow-2xl lg:shadow-none ${showCodeDrawer ? 'md:translate-x-0' : 'md:translate-x-full lg:translate-x-0'}`}>
            <div className={`flex items-center justify-between p-2 md:p-3 border-b flex-shrink-0 sticky top-0 z-10 ${theme === 'dark' ? 'border-white/[0.05] bg-[#0a0a0c]' : 'border-black/[0.05] bg-[#fcfcfc]'}`}>
              <div className="flex items-center gap-1.5">
                {/* Back to Preview button — always visible escape hatch */}
                <button 
                  onClick={() => { setActiveView('preview'); if (window.innerWidth < 768) setMobileTab('preview'); }}
                  className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'text-white/50 hover:bg-white/10 hover:text-white' : 'text-black/50 hover:bg-black/5 hover:text-black'}`}
                  title="Back to Preview"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="w-px h-5 bg-white/10 mx-1 hidden md:block"></div>
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

export default function BuilderModeWrapper(props) {
  return (
    <ErrorBoundary>
      <BuilderMode {...props} />
    </ErrorBoundary>
  );
}
