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
    const { prompt, systemPrompt, type } = JSON.parse(event.body || '{}');

    const prompts = {
      'learning-style': {
        system: 'You are an expert educational psychologist specializing in learning styles.',
        user: `Analyze learning style for: ${prompt}`
      },
      'performance': {
        system: 'You are an expert in educational analytics and performance prediction.',
        user: `Predict academic performance for: ${prompt}`
      },
      'behavior': {
        system: 'You are an expert behavioral analyst in educational environments.',
        user: `Analyze student behavior patterns for: ${prompt}`
      },
      'lesson-plan': {
        system: 'You are an expert educational planner.',
        user: `Create a detailed lesson plan for: ${prompt}`
      },
      'exam': {
        system: 'You are an expert in educational assessment.',
        user: `Generate an exam for: ${prompt}`
      },
      'concept': {
        system: 'You are an expert teacher specializing in clear explanations.',
        user: `Explain this concept in detail: ${prompt}`
      },
      'homework': {
        system: 'You are an expert tutor helping with homework.',
        user: `Help solve this problem: ${prompt}`
      },
      'schedule': {
        system: 'You are an expert in educational planning and time management.',
        user: `Create a study schedule considering: ${prompt}`
      },
      'career': {
        system: 'You are an expert career counselor.',
        user: `Provide career guidance based on: ${prompt}`
      }
    };

    const selectedPrompt = prompts[type as keyof typeof prompts] || {
      system: systemPrompt,
      user: prompt
    };

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: selectedPrompt.system },
        { role: 'user', content: selectedPrompt.user }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        response: response.choices[0]?.message?.content,
        type
      })
    };

  } catch (error) {
    console.error('AI Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate AI response' })
    };
  }
};