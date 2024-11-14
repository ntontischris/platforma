import { Student } from '../../types';
import { openai } from '../openai';

export class ContentService {
  async generateContent(student: Student) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an educational AI generating personalized learning content.'
          },
          {
            role: 'user',
            content: `Generate personalized content for student: ${JSON.stringify(student)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      console.error('Content Service Error:', error);
      throw new Error('Failed to generate content');
    }
  }
}