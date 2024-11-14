import { OpenAI } from 'openai';
import { Student } from '../../types';

class LearningPathService {
  private static instance: LearningPathService;
  private openai: OpenAI;

  private constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });
  }

  public static getInstance(): LearningPathService {
    if (!LearningPathService.instance) {
      LearningPathService.instance = new LearningPathService();
    }
    return LearningPathService.instance;
  }

  async generatePersonalizedPath(student: Student): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Generate a personalized learning path based on student data."
          },
          {
            role: "user",
            content: JSON.stringify(student)
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return JSON.parse(response.choices[0]?.message?.content || '{}');
    } catch (error) {
      console.error('Learning Path Generation Error:', error);
      throw new Error('Failed to generate learning path');
    }
  }

  async adaptPathDifficulty(currentPath: any, performance: number): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Adapt the learning path difficulty based on student performance."
          },
          {
            role: "user",
            content: JSON.stringify({ currentPath, performance })
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return JSON.parse(response.choices[0]?.message?.content || '{}');
    } catch (error) {
      console.error('Path Adaptation Error:', error);
      throw new Error('Failed to adapt learning path');
    }
  }

  async suggestNextSteps(progress: any): Promise<string[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Suggest next learning steps based on current progress."
          },
          {
            role: "user",
            content: JSON.stringify(progress)
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return JSON.parse(response.choices[0]?.message?.content || '[]');
    } catch (error) {
      console.error('Next Steps Suggestion Error:', error);
      throw new Error('Failed to suggest next steps');
    }
  }
}

export const learningPathService = LearningPathService.getInstance();