export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Very basic in-memory rate limiting (works per Vercel lambda instance)
  // In a robust app, use Vercel KV or similar
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const { model, messages, mode, customKey } = req.body;
  const currentMode = mode === 'builder' ? 'builder' : 'chat';
  
  // Only apply IP rate limiting if NO custom key is provided
  if (!customKey) {
    if (!global.rateLimitStore) {
      global.rateLimitStore = new Map();
    }
    
    const now = Date.now();
    const windowMs = 24 * 60 * 60 * 1000; // 24 hours
    const maxRequests = currentMode === 'builder' ? 1 : 10;
    
    const userKey = `${ip}_${currentMode}`;
    const requestInfo = global.rateLimitStore.get(userKey) || { count: 0, resetTime: now + windowMs };
    
    if (now > requestInfo.resetTime) {
      requestInfo.count = 1;
      requestInfo.resetTime = now + windowMs;
    } else {
      requestInfo.count++;
    }
    
    global.rateLimitStore.set(userKey, requestInfo);
    
    if (requestInfo.count > maxRequests) {
      return res.status(429).json({ 
        error: `Limit reached. You have used your ${maxRequests} daily requests for ${currentMode} mode.`,
        isStatic: true,
        remaining: 0
      });
    }
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  const userMessage = messages[messages.length - 1].content.toLowerCase();

  // --- STATIC ROUTING / PROMPT GUARD ---
  
  // 1. Unethical / Restricted Filters
  const unethicalKeywords = ['bomb', 'kill', 'hack', 'steal', 'murder', 'weapon', 'drugs', 'illegal'];
  if (unethicalKeywords.some(keyword => userMessage.includes(keyword))) {
    return res.status(200).json({
      choices: [{ message: { content: "I'm a portfolio bot, not a Bond villain! Try asking about Abrar's projects instead. 🕵️‍♂️" } }],
      isStatic: true
    });
  }

  const adultKeywords = ['sex', 'porn', 'nude', 'nsfw', 'hookup'];
  if (adultKeywords.some(keyword => userMessage.includes(keyword))) {
    return res.status(200).json({
      choices: [{ message: { content: "Control majnu control! 🎬 Let's keep it professional." } }],
      isStatic: true
    });
  }

  // 2. Static FAQ Responses (Save LLM credits)
  const faqMap = {
    'who are you': "I am FixO, Abrar's personal AI Assistant. I can tell you about his projects, skills, and experience!",
    'what are you': "I am FixO, an AI Assistant built by Abrar. I'm here to help you navigate his portfolio and learn about his work.",
    'who is abrar': "Abrar Akhunji is a passionate developer constantly trying to improve. He holds a Diploma in IT and is currently pursuing a B.E. in Information Technology. He loves building AI/ML solutions and web applications!",
    'tell me about abrar': "Abrar Akhunji is a passionate developer constantly trying to improve. He holds a Diploma in IT and is currently pursuing a B.E. in Information Technology. He loves building AI/ML solutions and web applications!",
    'projects': "Abrar has built several cool projects including Lyra Music AI, CivicEye (AI crime detection), TerraFlow, and NeuroVision. Would you like to know more about a specific one?",
    'skills': "Abrar is skilled in Python, Java, JavaScript, AI/ML (Pandas, OpenCV), and web frameworks like Django and React. He's a versatile full-stack developer!"
  };

  for (const [key, answer] of Object.entries(faqMap)) {
    if (userMessage.includes(key)) {
      return res.status(200).json({
        choices: [{ message: { content: answer } }],
        isStatic: true
      });
    }
  }

  // --- LLM API CALL ---
  const customKey = req.body.customKey;
  const provider = req.body.provider || 'openrouter';
  const apiKey = customKey || process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error (missing API key)' });
  }

  try {
    let url = '';
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    let requestBody = {};

    const formatMessagesOpenAI = msgs => {
      const raw = msgs.map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content || m.text || ''
      }));
      
      const systemMsg = raw.find(m => m.role === 'system');
      let history = raw.filter(m => m.role !== 'system');
      
      const firstUserIdx = history.findIndex(m => m.role === 'user');
      if (firstUserIdx > 0) {
        history = history.slice(firstUserIdx);
      }
      
      return systemMsg ? [systemMsg, ...history] : history;
    };

    if (provider === 'openai' || provider === 'groq' || provider === 'mistral' || provider === 'together' || provider === 'nvidia' || provider === 'openrouter') {
      if (provider === 'openai') url = 'https://api.openai.com/v1/chat/completions';
      if (provider === 'groq') url = 'https://api.groq.com/openai/v1/chat/completions';
      if (provider === 'mistral') url = 'https://api.mistral.ai/v1/chat/completions';
      if (provider === 'together') url = 'https://api.together.xyz/v1/chat/completions';
      if (provider === 'nvidia') url = 'https://integrate.api.nvidia.com/v1/chat/completions';
      if (provider === 'openrouter') {
        url = 'https://openrouter.ai/api/v1/chat/completions';
        headers['HTTP-Referer'] = 'https://abrar-portfolio.vercel.app';
        headers['X-Title'] = 'Abrar Akhunji Portfolio';
      }
      requestBody = {
        model: model || "minimax/minimax-m2.5:free",
        messages: formatMessagesOpenAI(messages)
      };
    } else if (provider === 'gemini') {
      url = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.0-flash-exp'}:generateContent?key=${apiKey}`;
      delete headers['Authorization']; // Gemini uses query param
      
      const formatted = formatMessagesOpenAI(messages);
      const geminiMessages = formatted.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
      
      const systemMsg = formatted.find(m => m.role === 'system');
      if (systemMsg && geminiMessages.length > 0) {
        geminiMessages[0].parts[0].text = `SYSTEM: ${systemMsg.content}\n\n${geminiMessages[0].parts[0].text}`;
      }
      
      requestBody = { contents: geminiMessages };
    } else if (provider === 'anthropic') {
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      delete headers['Authorization'];
      
      const formatted = formatMessagesOpenAI(messages);
      const systemMsg = formatted.find(m => m.role === 'system');
      const anthropicMsgs = formatted.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }));
      
      requestBody = {
        model: model || "claude-3-haiku-20240307",
        max_tokens: 4096,
        messages: anthropicMsgs
      };
      if (systemMsg) requestBody.system = systemMsg.content;
    } else if (provider === 'cohere') {
      url = 'https://api.cohere.ai/v1/chat';
      const formatted = formatMessagesOpenAI(messages);
      const systemMsg = formatted.find(m => m.role === 'system');
      const chatHistory = formatted.filter(m => m.role !== 'system').slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'CHATBOT' : 'USER',
        message: m.content
      }));
      const lastMsg = formatted[formatted.length - 1];
      
      requestBody = {
        model: model || "command-r-plus",
        message: lastMsg ? lastMsg.content : "",
        chat_history: chatHistory
      };
      if (systemMsg) requestBody.preamble = systemMsg.content;
    } else {
      return res.status(400).json({ error: `Unsupported provider: ${provider}` });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${provider} API Error:`, response.status, errorText);
      return res.status(response.status).json({ error: `Failed to fetch from ${provider}`, details: errorText });
    }

    const data = await response.json();
    let extractedText = "";

    if (provider === 'gemini') {
      extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } else if (provider === 'anthropic') {
      extractedText = data.content?.[0]?.text || "";
    } else if (provider === 'cohere') {
      extractedText = data.text || "";
    } else {
      extractedText = data.choices?.[0]?.message?.content || "";
    }

    // Normalize response for the frontend
    return res.status(200).json({ choices: [{ message: { content: extractedText } }] });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
