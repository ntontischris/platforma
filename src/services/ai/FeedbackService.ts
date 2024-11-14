import { Student } from '../../types';
import { openai } from '../openai';

export class FeedbackService {
  async generateFeedback(student: Student, activity: string) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an educational AI providing personalized feedback.'
          },
          {
            role: 'user',
            content: `Generate feedback for ${activity} completed by student: ${JSON.stringify(student)}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      console.error('Feedback Service Error:', error);
      throw new Error('Failed to generate feedback');
    }
  }
}