/**
 * /api/generate — Unified AI Generation Proxy
 * 
 * All AI API calls go through this route. Never call providers from frontend.
 * Supports: OpenRouter, OpenAI, Gemini, Anthropic, Groq, Mistral, Cohere, Together, NVIDIA
 */

const MAX_MESSAGES = 25;
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const FREE_TRIAL_LIMIT = 3; // 3 free requests per week (handled by BuilderMode mostly, but here as a secondary safeguard)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { model, messages, mode, customKey, provider } = req.body;

  // ── Validation ─────────────────────────────────────────────────────────
  const errors = validateRequest(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join(', ') });
  }

  const userMessage = messages[messages.length - 1].content.toLowerCase();

  // ── Static Filters (FAQ / Security) ──────────────────────────────────
  const staticResponse = checkStaticFilters(userMessage);
  if (staticResponse) {
    return res.status(200).json({ success: true, data: staticResponse, isStatic: true });
  }

  // ── Rate Limiting (Secondary Server-side check) ───────────────────────
  if (!customKey) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    // Note: Serverless functions reset memory frequently. 
    // This is a "best-effort" limit. Production should use Redis/Vercel KV.
    if (!global.reqLimit) global.reqLimit = new Map();
    const limitInfo = global.reqLimit.get(ip) || { count: 0, lastReset: Date.now() };
    
    if (Date.now() - limitInfo.lastReset > 7 * 24 * 60 * 60 * 1000) {
      limitInfo.count = 0;
      limitInfo.lastReset = Date.now();
    }
    
    if (limitInfo.count >= 15) { // Looser limit for chat/bot mode
      return res.status(429).json({ success: false, error: 'Free limit reached for this week. Use your own API key to continue.' });
    }
    limitInfo.count++;
    global.reqLimit.set(ip, limitInfo);
  }

  // ── Resolve API key ───────────────────────────────────────────────────
  let resolvedProvider = customKey ? provider : (provider || 'openrouter');
  let apiKey;

  if (customKey) {
    apiKey = customKey;
  } else {
    // Check for provider-specific keys in environment variables
    const envKeyMap = {
      'openai': process.env.OPENAI_API_KEY,
      'gemini': process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY,
      'anthropic': process.env.ANTHROPIC_API_KEY,
      'groq': process.env.GROQ_API_KEY,
      'mistral': process.env.MISTRAL_API_KEY,
      'together': process.env.TOGETHER_API_KEY,
      'nvidia': process.env.NVIDIA_API_KEY,
      'cohere': process.env.COHERE_API_KEY,
      'openrouter': process.env.OPENROUTER_API_KEY
    };

    apiKey = envKeyMap[resolvedProvider];

    // Fallback to OpenRouter if no specific key found
    if (!apiKey && resolvedProvider !== 'openrouter') {
      apiKey = envKeyMap['openrouter'];
      resolvedProvider = 'openrouter';
    }
  }

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'Server configuration error. API key not found.'
    });
  }

  // ── Call AI Provider ──────────────────────────────────────────────────
  try {
    const result = await callProvider(resolvedProvider, model, messages, apiKey);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(`API Error (${resolvedProvider}):`, error.message);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Failed to generate response from AI provider.' 
    });
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────

function validateRequest(body) {
  const errors = [];
  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    errors.push('Messages are required');
  } else {
    const lastMsg = body.messages[body.messages.length - 1].content || "";
    if (lastMsg.length > 15000) errors.push('Message too long');
  }
  return errors;
}

function checkStaticFilters(msg) {
  // FAQs
  if (msg.includes('who is abrar')) return "Abrar Akhunji is a passionate developer pursuing a B.E. in Information Technology. He builds AI/ML solutions and modern web applications!";
  if (msg.includes('skills')) return "Abrar is skilled in Python, Java, JavaScript, AI/ML (OpenCV, Pandas), and full-stack web development (React, Django, Firebase).";
  if (msg.includes('projects')) return "Abrar's top projects include Lyra Music AI, CivicEye (Crime Detection), and NeuroVision. Check out the Projects section!";
  
  // Security
  const badWords = ['bomb', 'kill', 'hack', 'steal', 'murder'];
  if (badWords.some(word => msg.includes(word))) return "I am here to help with professional and creative tasks only. Let's keep the conversation safe!";
  
  return null;
}

async function callProvider(provider, model, messages, apiKey) {
  let url = '';
  let headers = { 'Content-Type': 'application/json' };
  let body = {};

  const openAiFormat = (msgs) => msgs.map(m => ({
    role: m.role === 'ai' ? 'assistant' : (m.role === 'system' ? 'system' : 'user'),
    content: m.content
  }));

  switch (provider) {
    case 'openai':
      url = 'https://api.openai.com/v1/chat/completions';
      headers['Authorization'] = `Bearer ${apiKey}`;
      body = { model: model || 'gpt-4o', messages: openAiFormat(messages) };
      break;
    case 'openrouter':
      url = 'https://openrouter.ai/api/v1/chat/completions';
      headers['Authorization'] = `Bearer ${apiKey}`;
      headers['HTTP-Referer'] = 'https://abrar-portfolio-web.vercel.app';
      headers['X-Title'] = 'FixO Builder';
      body = { model: model || 'minimax/minimax-m2.5:free', messages: openAiFormat(messages) };
      break;
    case 'gemini':
      url = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.0-flash'}:generateContent?key=${apiKey}`;
      body = { contents: messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'ai' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })) };
      // Inject system prompt into first user message for Gemini
      const systemMsg = messages.find(m => m.role === 'system');
      if (systemMsg && body.contents.length > 0) {
        body.contents[0].parts[0].text = `Instructions: ${systemMsg.content}\n\nUser: ${body.contents[0].parts[0].text}`;
      }
      break;
    case 'anthropic':
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      const sys = messages.find(m => m.role === 'system');
      body = {
        model: model || 'claude-3-5-sonnet-20240620',
        max_tokens: 4096,
        system: sys ? sys.content : "",
        messages: messages.filter(m => m.role !== 'system').map(m => ({
          role: m.role === 'ai' ? 'assistant' : 'user',
          content: m.content
        }))
      };
      break;
    case 'groq':
      url = 'https://api.groq.com/openai/v1/chat/completions';
      headers['Authorization'] = `Bearer ${apiKey}`;
      body = { model: model || 'llama3-70b-8192', messages: openAiFormat(messages) };
      break;
    default:
      // Generic OpenAI-compatible fallback
      url = getGenericUrl(provider);
      headers['Authorization'] = `Bearer ${apiKey}`;
      body = { model: model, messages: openAiFormat(messages) };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`${provider} API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return extractText(provider, data);
}

function getGenericUrl(p) {
  if (p === 'mistral') return 'https://api.mistral.ai/v1/chat/completions';
  if (p === 'together') return 'https://api.together.xyz/v1/chat/completions';
  if (p === 'nvidia') return 'https://integrate.api.nvidia.com/v1/chat/completions';
  if (p === 'cohere') return 'https://api.cohere.ai/v1/chat';
  return 'https://openrouter.ai/api/v1/chat/completions';
}

function extractText(provider, data) {
  if (provider === 'gemini') return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  if (provider === 'anthropic') return data.content?.[0]?.text || "";
  if (provider === 'cohere') return data.text || "";
  return data.choices?.[0]?.message?.content || "";
}
