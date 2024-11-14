import { Student } from '../../types';
import { openai } from '../openai';

export class ProgressService {
  async analyze(student: Student) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an educational AI analyzing student progress.'
          },
          {
            role: 'user',
            content: `Analyze progress for student: ${JSON.stringify(student)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      console.error('Progress Service Error:', error);
      throw new Error('Failed to analyze progress');
    }
  }
}