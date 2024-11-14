import { aiService } from '../../aiService';

export class FeedbackEngine {
  async analyzeProblemSolving(studentId: string, solution: any) {
    return aiService.post('/ai/feedback/problem-solving', { studentId, solution });
  }

  async generateFeedback(work: any, criteria: any) {
    return aiService.post('/ai/feedback/generate', { work, criteria });
  }

  async suggestImprovements(submission: any) {
    return aiService.post('/ai/feedback/improvements', { submission });
  }

  async trackFeedbackImplementation(studentId: string, feedback: any) {
    return aiService.post('/ai/feedback/track', { studentId, feedback });
  }
}