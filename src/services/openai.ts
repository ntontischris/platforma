import OpenAI from 'openai';
import { rateLimit } from 'express-rate-limit';

// Initialize OpenAI with environment variable
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Enable client-side usage
});

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Cache for AI responses
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

// Helper function for common OpenAI chat completion requests
export async function generateChatCompletion(
  systemPrompt: string,
  userPrompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
    useCache?: boolean;
  } = {}
) {
  const {
    temperature = 0.7,
    maxTokens = 1000,
    model = 'gpt-4',
    useCache = true
  } = options;

  // Generate cache key
  const cacheKey = `${systemPrompt}-${userPrompt}-${model}`;

  // Check cache if enabled
  if (useCache) {
    const cached = responseCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.response;
    }
  }

  try {
    // Apply rate limiting
    await new Promise((resolve) => limiter(
      { ip: '127.0.0.1' } as any,
      { send: resolve } as any,
      resolve as any
    ));

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature,
      max_tokens: maxTokens
    });

    const result = response.choices[0]?.message?.content;

    if (!result) {
      throw new Error('No response from AI');
    }

    // Cache the response if caching is enabled
    if (useCache) {
      responseCache.set(cacheKey, {
        response: result,
        timestamp: Date.now()
      });
    }

    return result;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (error.message.includes('invalid_api_key')) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
    }
    
    throw new Error('Failed to generate AI response. Please try again.');
  }
}

// Helper function for structured responses with caching
export async function generateStructuredResponse<T>(
  systemPrompt: string,
  userPrompt: string,
  schema: object,
  options: {
    temperature?: number;
    maxTokens?: number;
    model?: string;
    useCache?: boolean;
  } = {}
) {
  const prompt = `${systemPrompt}\nProvide response in valid JSON format following this schema:\n${JSON.stringify(schema, null, 2)}\n\n${userPrompt}`;
  
  try {
    const response = await generateChatCompletion(prompt, userPrompt, options);
    
    if (!response) {
      throw new Error('No response from AI');
    }

    return JSON.parse(response) as T;
  } catch (error) {
    console.error('Failed to parse AI response as JSON:', error);
    throw new Error('Invalid JSON response from AI');
  }
}

// Clear expired cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of responseCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      responseCache.delete(key);
    }
  }
}, 60000); // Check every minute