/**
 * FixO Context Engine — Production Memory System
 * 
 * 3-Layer Architecture:
 *   Layer 1: Short-Term Memory  → Last N messages (in every API call)
 *   Layer 2: Session Memory     → Full chat thread (Firebase-backed)
 *   Layer 3: Persistent Memory  → User preferences, patterns, style (Firebase-backed)
 * 
 * Features:
 *   - Smart context assembly (system prompt + summary + preferences + recent messages)
 *   - Auto-summarization of long conversations
 *   - Memory extraction engine (detects tech stack, style, patterns from prompts)
 *   - Fail-safe: always falls back to basic prompt if memory is unavailable
 *   - Token-efficient: never sends full history
 */

import {
  db, doc, setDoc, getDoc, updateDoc, serverTimestamp
} from './firebase';

// ─── Configuration ──────────────────────────────────────────────────────────

export const MEMORY_CONFIG = {
  SHORT_TERM_WINDOW: 10,      // Messages sent with every API request
  SUMMARY_TRIGGER: 15,        // Auto-summarize when messages exceed this count
  SUMMARY_UPDATE_INTERVAL: 10, // Re-summarize every N messages after first summary
  MAX_SUMMARY_LENGTH: 500,    // Max chars for summary string
  MAX_PREFERENCE_ENTRIES: 20, // Max detected preference items
};

// ─── LAYER 1: Short-Term Memory ─────────────────────────────────────────────

/**
 * Extract the most recent messages to send as working context.
 * Never sends full history — only the recent window.
 */
export function getShortTermContext(messages, windowSize = MEMORY_CONFIG.SHORT_TERM_WINDOW) {
  if (!messages || messages.length === 0) return [];
  const nonSystem = messages.filter(m => m.role !== 'system');
  return nonSystem.slice(-windowSize);
}

/**
 * Build the complete API request context.
 * Assembles: system prompt → persistent memory → summary → recent messages
 * 
 * This is the CORE function. Every API call should use this.
 */
export function buildRequestContext({
  systemPrompt,
  messages,
  chatSummary = null,
  userMemory = null,
  windowSize = MEMORY_CONFIG.SHORT_TERM_WINDOW
}) {
  const context = [];

  // ── 1. System Prompt (enriched with persistent memory) ─────────────
  let enrichedPrompt = systemPrompt || '';

  if (userMemory && Object.keys(userMemory).length > 0) {
    const memoryLines = [];

    if (userMemory.name) {
      memoryLines.push(`User's name: ${userMemory.name}`);
    }
    if (userMemory.techStack && userMemory.techStack.length > 0) {
      memoryLines.push(`Preferred tech stack: ${userMemory.techStack.join(', ')}`);
    }
    if (userMemory.designStyle) {
      memoryLines.push(`Design preference: ${userMemory.designStyle}`);
    }
    if (userMemory.writingStyle) {
      memoryLines.push(`Response style preference: ${userMemory.writingStyle}`);
    }
    if (userMemory.patterns && userMemory.patterns.length > 0) {
      memoryLines.push(`Recurring instructions: ${userMemory.patterns.slice(0, 5).join('; ')}`);
    }

    if (memoryLines.length > 0) {
      enrichedPrompt += `\n\nUser Context (from memory):\n${memoryLines.join('\n')}`;
    }
  }

  if (enrichedPrompt) {
    context.push({ role: 'system', content: enrichedPrompt });
  }

  // ── 2. Conversation Summary (compressed older history) ─────────────
  if (chatSummary) {
    context.push({
      role: 'system',
      content: `Previous conversation context: ${chatSummary}`
    });
  }

  // ── 3. Recent Messages (short-term memory window) ──────────────────
  const recentMsgs = (messages || [])
    .filter(m => m.role !== 'system')
    .slice(-windowSize);

  for (const msg of recentMsgs) {
    context.push({
      role: msg.role === 'ai' ? 'assistant' : (msg.role || 'user'),
      content: msg.content || msg.text || ''
    });
  }

  return context;
}

// ─── LAYER 2: Session Memory (Firebase Chat Persistence) ────────────────────

/**
 * Check if a conversation needs summarization.
 */
export function needsSummarization(messages, existingSummary = null) {
  const count = messages.filter(m => m.role !== 'system').length;
  if (!existingSummary) {
    return count >= MEMORY_CONFIG.SUMMARY_TRIGGER;
  }
  // Re-summarize every N messages after first summary
  return count >= MEMORY_CONFIG.SUMMARY_TRIGGER &&
    (count % MEMORY_CONFIG.SUMMARY_UPDATE_INTERVAL === 0);
}

/**
 * Build the summarization request to send to the AI.
 * Returns the messages array to send for summarization.
 * Returns null if no summarization needed.
 */
export function buildSummarizationRequest(messages, existingSummary = null) {
  const nonSystem = messages.filter(m => m.role !== 'system');
  // Summarize everything EXCEPT the recent window
  const olderMsgs = nonSystem.slice(0, -MEMORY_CONFIG.SHORT_TERM_WINDOW);

  if (olderMsgs.length < 4) return null; // Not enough to summarize

  const conversationText = olderMsgs
    .map(m => {
      const role = m.role === 'user' ? 'User' : 'AI';
      const text = (m.content || m.text || '').slice(0, 300);
      return `${role}: ${text}`;
    })
    .join('\n');

  const previousContext = existingSummary
    ? `\nPrevious summary: ${existingSummary}\n`
    : '';

  return [
    {
      role: 'system',
      content: 'You are a precise summarizer. Output ONLY the summary, nothing else.'
    },
    {
      role: 'user',
      content: `Summarize this conversation in 2-3 sentences. Capture: key topics discussed, decisions made, user preferences expressed, and current task status.${previousContext}\n\nConversation:\n${conversationText}`
    }
  ];
}

/**
 * Save a chat summary to Firebase.
 */
export async function saveChatSummary(chatId, summary) {
  if (!chatId || !summary) return;
  try {
    await updateDoc(doc(db, 'chats', chatId), {
      summary: summary.slice(0, MEMORY_CONFIG.MAX_SUMMARY_LENGTH),
      summaryUpdatedAt: serverTimestamp()
    });
  } catch (e) {
    console.error('[Memory] Failed to save summary:', e);
  }
}

// ─── LAYER 3: Persistent Memory (User Preferences & Patterns) ──────────────

/**
 * Default persistent memory structure.
 */
export function getDefaultMemory() {
  return {
    name: null,
    techStack: [],          // ['react', 'tailwind', 'python']
    designStyle: null,      // 'dark mode', 'glassmorphic', 'minimalist'
    writingStyle: null,     // 'concise', 'detailed', 'casual', 'professional'
    patterns: [],           // recurring instructions detected
    preferredProvider: 'openrouter',
    preferredModel: null,
    lastActiveAt: null,
    memoryVersion: 1
  };
}

/**
 * Load user memory from Firebase. Falls back to defaults if unavailable.
 */
export async function loadUserMemory(uid) {
  if (!uid) return getDefaultMemory();
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) {
      const data = snap.data();
      return { ...getDefaultMemory(), ...(data.memory || {}) };
    }
  } catch (e) {
    console.error('[Memory] Failed to load user memory:', e);
  }
  return getDefaultMemory();
}

/**
 * Save user memory to Firebase (merge, don't overwrite).
 */
export async function saveUserMemory(uid, memory) {
  if (!uid || !memory) return;
  try {
    await setDoc(doc(db, 'users', uid), {
      memory: { ...memory, lastActiveAt: Date.now() }
    }, { merge: true });
  } catch (e) {
    console.error('[Memory] Failed to save user memory:', e);
  }
}

/**
 * Clear all persistent memory for a user.
 */
export async function clearUserMemory(uid) {
  if (!uid) return;
  try {
    await setDoc(doc(db, 'users', uid), {
      memory: getDefaultMemory()
    }, { merge: true });
  } catch (e) {
    console.error('[Memory] Failed to clear memory:', e);
  }
}

// ─── Memory Extraction Engine ───────────────────────────────────────────────

/**
 * Keyword patterns for auto-detecting user preferences from prompts.
 */
const EXTRACTION_PATTERNS = {
  techStack: [
    'react', 'vue', 'angular', 'svelte', 'next.js', 'nextjs', 'nuxt',
    'tailwind', 'bootstrap', 'material ui', 'chakra',
    'python', 'django', 'flask', 'fastapi',
    'node', 'express', 'deno', 'bun',
    'typescript', 'javascript', 'java', 'kotlin', 'swift', 'rust', 'go',
    'firebase', 'supabase', 'mongodb', 'postgresql', 'mysql',
    'docker', 'kubernetes', 'aws', 'vercel', 'netlify'
  ],
  designStyle: [
    { pattern: /dark\s*(mode|theme|ui)/i, value: 'dark mode' },
    { pattern: /light\s*(mode|theme|ui)/i, value: 'light mode' },
    { pattern: /glassmorphi/i, value: 'glassmorphic' },
    { pattern: /minimalist/i, value: 'minimalist' },
    { pattern: /neumorphi/i, value: 'neumorphic' },
    { pattern: /brutalist/i, value: 'brutalist' },
    { pattern: /gradient/i, value: 'gradient-heavy' },
    { pattern: /retro|vintage/i, value: 'retro' },
    { pattern: /corporate|professional/i, value: 'corporate' },
    { pattern: /playful|fun|colorful/i, value: 'playful' }
  ],
  writingStyle: [
    { pattern: /be (brief|concise|short)/i, value: 'concise' },
    { pattern: /be (detailed|thorough|verbose)/i, value: 'detailed' },
    { pattern: /keep it (casual|chill|simple)/i, value: 'casual' },
    { pattern: /be (professional|formal)/i, value: 'professional' },
    { pattern: /explain (everything|in detail|step by step)/i, value: 'detailed' }
  ]
};

/**
 * Extract learnable information from a user's message.
 * Returns an object with detected preferences (only new findings).
 */
export function extractMemoryFromPrompt(text, existingMemory = null) {
  if (!text || typeof text !== 'string') return null;

  const memory = existingMemory || getDefaultMemory();
  const lowerText = text.toLowerCase();
  let hasChanges = false;
  const updates = {};

  // ── Detect tech stack mentions ──────────────────────────────────────
  const detectedTech = EXTRACTION_PATTERNS.techStack.filter(tech => {
    const regex = new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(lowerText) && !memory.techStack.includes(tech);
  });

  if (detectedTech.length > 0) {
    updates.techStack = [...new Set([...memory.techStack, ...detectedTech])]
      .slice(0, MEMORY_CONFIG.MAX_PREFERENCE_ENTRIES);
    hasChanges = true;
  }

  // ── Detect design style ─────────────────────────────────────────────
  for (const { pattern, value } of EXTRACTION_PATTERNS.designStyle) {
    if (pattern.test(text) && memory.designStyle !== value) {
      updates.designStyle = value;
      hasChanges = true;
      break;
    }
  }

  // ── Detect writing style preference ─────────────────────────────────
  for (const { pattern, value } of EXTRACTION_PATTERNS.writingStyle) {
    if (pattern.test(text) && memory.writingStyle !== value) {
      updates.writingStyle = value;
      hasChanges = true;
      break;
    }
  }

  // ── Detect name ("my name is...", "I'm...", "call me...") ──────────
  const namePatterns = [
    /(?:my name is|i'?m|call me|i am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i
  ];
  for (const pat of namePatterns) {
    const match = text.match(pat);
    if (match && match[1] && match[1].length > 1 && match[1].length < 30) {
      const name = match[1].trim();
      // Avoid false positives from common words
      const falsePositives = ['the', 'a', 'an', 'not', 'just', 'also', 'very', 'here', 'there', 'looking', 'trying', 'using', 'building', 'making', 'working'];
      if (!falsePositives.includes(name.toLowerCase()) && memory.name !== name) {
        updates.name = name;
        hasChanges = true;
      }
    }
  }

  return hasChanges ? updates : null;
}

// ─── API Key Security (Session-scoped) ──────────────────────────────────────

const ENC_KEY = 'fixo_enc_v1';

function xorEncode(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

export function saveApiKey(key) {
  if (!key) { sessionStorage.removeItem('fixo_api_key'); return; }
  try { sessionStorage.setItem('fixo_api_key', btoa(xorEncode(btoa(key), ENC_KEY))); }
  catch { /* fail silently */ }
}

export function loadApiKey() {
  try {
    const stored = sessionStorage.getItem('fixo_api_key');
    if (!stored) return '';
    return atob(xorEncode(atob(stored), ENC_KEY));
  } catch { return ''; }
}

export function saveProvider(provider) {
  if (provider) sessionStorage.setItem('fixo_provider', provider);
}

export function loadProvider() {
  return sessionStorage.getItem('fixo_provider') || 'openrouter';
}

export function saveModels(models) {
  if (models?.length > 0) sessionStorage.setItem('fixo_models', JSON.stringify(models));
}

export function loadModels() {
  try { return JSON.parse(sessionStorage.getItem('fixo_models')) || []; }
  catch { return []; }
}

export function clearApiConfig() {
  sessionStorage.removeItem('fixo_api_key');
  sessionStorage.removeItem('fixo_provider');
  sessionStorage.removeItem('fixo_models');
}

// ─── Memory Stats (for UX indicators) ───────────────────────────────────────

/**
 * Get a snapshot of the current memory state for UI display.
 */
export function getMemoryStats(messages, chatSummary, userMemory) {
  const msgCount = (messages || []).filter(m => m.role !== 'system').length;
  const hasSummary = !!chatSummary;
  const memoryItems = userMemory
    ? [
        userMemory.name,
        ...(userMemory.techStack || []),
        userMemory.designStyle,
        userMemory.writingStyle,
        ...(userMemory.patterns || [])
      ].filter(Boolean).length
    : 0;

  return {
    messageCount: msgCount,
    contextWindow: Math.min(msgCount, MEMORY_CONFIG.SHORT_TERM_WINDOW),
    hasSummary,
    memoryItems,
    needsSummarization: msgCount >= MEMORY_CONFIG.SUMMARY_TRIGGER && !hasSummary
  };
}
