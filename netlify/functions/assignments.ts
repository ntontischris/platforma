import { Handler } from '@netlify/functions';
import { Assignment } from '../../src/types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const handler: Handler = async (event) => {
  if (!event.httpMethod) {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    switch (event.httpMethod) {
      case 'POST':
        const { type, assignment } = JSON.parse(event.body || '{}');

        if (type === 'grade') {
          const analysis = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content: 'You are an expert teacher grading student assignments.'
              },
              {
                role: 'user',
                content: `Grade this assignment and provide feedback: ${JSON.stringify(assignment)}`
              }
            ],
            temperature: 0.7,
            max_tokens: 500
          });

          const feedback = analysis.choices[0]?.message?.content;
          if (!feedback) {
            throw new Error('Failed to generate feedback');
          }

          // Parse the feedback to extract structured data
          const result = {
            grade: calculateGrade(feedback),
            feedback,
            strengths: extractStrengths(feedback),
            improvements: extractImprovements(feedback)
          };

          return {
            statusCode: 200,
            body: JSON.stringify(result)
          };
        }

        return { statusCode: 400, body: 'Invalid request type' };

      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    console.error('Assignments Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

function calculateGrade(feedback: string): number {
  // Extract numerical grade from feedback using regex
  const gradeMatch = feedback.match(/\b([0-9]|10)(\.[0-9])?\b/);
  return gradeMatch ? parseFloat(gradeMatch[0]) : 7.0; // Default grade if not found
}

function extractStrengths(feedback: string): string[] {
  // Extract strengths using common patterns
  const strengths: string[] = [];
  const lines = feedback.split('\n');
  let isStrengthSection = false;

  for (const line of lines) {
    if (line.toLowerCase().includes('strength') || line.toLowerCase().includes('positive')) {
      isStrengthSection = true;
      continue;
    }
    if (isStrengthSection && line.trim().startsWith('-')) {
      strengths.push(line.trim().substring(1).trim());
    }
    if (line.toLowerCase().includes('improve') || line.toLowerCase().includes('weakness')) {
      isStrengthSection = false;
    }
  }

  return strengths;
}

function extractImprovements(feedback: string): string[] {
  // Extract improvements using common patterns
  const improvements: string[] = [];
  const lines = feedback.split('\n');
  let isImprovementSection = false;

  for (const line of lines) {
    if (line.toLowerCase().includes('improve') || line.toLowerCase().includes('weakness')) {
      isImprovementSection = true;
      continue;
    }
    if (isImprovementSection && line.trim().startsWith('-')) {
      improvements.push(line.trim().substring(1).trim());
    }
    if (line.toLowerCase().includes('strength') || line.toLowerCase().includes('positive')) {
      isImprovementSection = false;
    }
  }

  return improvements;
}