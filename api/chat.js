// Secure Backend Proxy for OpenRouter API
// This serverless function protects your API key and adds security features

// Rate limiting storage (in-memory for serverless)
// Note: In a production serverless environment, this will reset on cold starts.
// For true persistence, a database like Redis would be needed.
const rateLimitStore = new Map();

const RATE_LIMIT = {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 15 // Increased slightly
};

function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0] ||
        req.headers['x-real-ip'] ||
        req.socket?.remoteAddress ||
        'unknown';
}

function checkRateLimit(ip) {
    const now = Date.now();
    const userLimit = rateLimitStore.get(ip) || { count: 0, resetTime: now + RATE_LIMIT.windowMs };

    if (now >= userLimit.resetTime) {
        userLimit.count = 0;
        userLimit.resetTime = now + RATE_LIMIT.windowMs;
    }

    if (userLimit.count >= RATE_LIMIT.maxRequests) {
        const remainingTime = userLimit.resetTime - now;
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        return { allowed: false, remaining: 0, resetIn: { hours, minutes } };
    }

    userLimit.count += 1;
    rateLimitStore.set(ip, userLimit);

    return { allowed: true, remaining: RATE_LIMIT.maxRequests - userLimit.count };
}

function sanitizeInput(text) {
    if (!text || typeof text !== 'string') return '';
    return text.trim().slice(0, 1000) // Support longer questions
        .replace(/[<>]/g, ''); // Basic XSS prevention
}

export default async function handler(req, res) {
    // 1. Set Security Headers
    const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://abrar225.github.io',
        'https://abrar225.github.io/Abrar-Akhunji',
        'https://abrar-akhunji.vercel.app',
        'https://abrar-portfolio-secure.vercel.app'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!origin) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '3600');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const clientIP = getClientIP(req);
        const rateLimit = checkRateLimit(clientIP);

        if (!rateLimit.allowed) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                message: `Daily limit reached. Resets in ${rateLimit.resetIn.hours}h ${rateLimit.resetIn.minutes}m.`
            });
        }

        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        const sanitizedMessage = sanitizeInput(message);
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey || apiKey === 'your_new_key_here') {
            return res.status(500).json({ error: 'API key not configured on server' });
        }

        const PORTFOLIO_CONTEXT = `You are Abrar Akhunji's professional AI assistant. 
        Keep answers short, professional, and helpful. 
        Focus on Abrar's skills in AI/ML, Full-Stack Dev, and his specific projects like the Cattle Breed ID and Brain Tumor Detection.`;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': origin || 'https://abrar225.github.io',
                'X-Title': 'Abrar Portfolio'
            },
            body: JSON.stringify({
                model: 'liquid/lfm-2.5-1.2b-instruct:free',
                messages: [
                    { role: 'system', content: PORTFOLIO_CONTEXT },
                    { role: 'user', content: sanitizedMessage }
                ],
                temperature: 0.7,
                max_tokens: 250
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('OpenRouter API Error:', response.status, errorData);
            return res.status(response.status).json({ error: 'AI Service Error' });
        }

        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content;

        if (!aiResponse) return res.status(500).json({ error: 'No response from AI' });

        return res.status(200).json({
            success: true,
            response: aiResponse,
            remaining: rateLimit.remaining
        });

    } catch (error) {
        console.error('Server Internal Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
