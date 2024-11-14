import { Handler } from '@netlify/functions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { agent, action, data } = JSON.parse(event.body || '{}');

    // Define agent-specific system prompts
    const systemPrompts = {
      nlp: 'You are an advanced NLP system specializing in educational content analysis.',
      learningPath: 'You are an expert in creating personalized educational pathways.',
      feedback: 'You are an expert teacher providing detailed, constructive feedback.',
      problemSolver: 'You are an expert tutor helping students understand and solve problems.',
      progress: 'You are an expert in educational analytics and progress tracking.',
      difficulty: 'You are an expert in adaptive learning and difficulty adjustment.',
      multimodal: 'You are an expert in multi-modal educational content creation.',
      collaborative: 'You are an expert in facilitating group learning and collaboration.',
      assessment: 'You are an expert in educational assessment and evaluation.',
      knowledge: 'You are an expert in knowledge retention and learning optimization.'
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: systemPrompts[agent as keyof typeof systemPrompts] 
        },
        { 
          role: 'user', 
          content: `Action: ${action}\nData: ${JSON.stringify(data)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        response: response.choices[0]?.message?.content,
        agent,
        action
      })
    };

  } catch (error) {
    console.error('AI Orchestrator Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process AI request' })
    };
  }
};