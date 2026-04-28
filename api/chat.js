export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Very basic in-memory rate limiting (works per Vercel lambda instance)
  // In a robust app, use Vercel KV or similar
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const { model, messages, mode } = req.body;
  const currentMode = mode === 'builder' ? 'builder' : 'chat';
  
  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map();
  }
  
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000; // 24 hours
  const maxRequests = currentMode === 'builder' ? 5 : 10;
  
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
  const apiKey = process.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error (missing API key)' });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://abrar-portfolio.vercel.app', // Update with actual domain if known
        'X-Title': 'Abrar Akhunji Portfolio',
      },
      body: JSON.stringify({
        model: model || "minimax/minimax-m2.5:free",
        messages: messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter Error:', response.status, errorText);
      return res.status(response.status).json({ error: 'Failed to fetch from OpenRouter' });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
