import { Student } from '../../types';
import { openai } from '../openai';

export class NLPService {
  async processInput(type: string, student: Student) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an educational AI assistant analyzing student data.'
          },
          {
            role: 'user',
            content: `Analyze ${type} for student: ${JSON.stringify(student)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      console.error('NLP Service Error:', error);
      throw new Error('Failed to process natural language input');
    }
  }
}