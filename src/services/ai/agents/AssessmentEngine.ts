import { aiService } from '../../aiService';

export class AssessmentEngine {
  async generateAssessment(topic: string, level: string) {
    return aiService.post('/ai/assessment/generate', { topic, level });
  }

  async evaluateResponse(response: any, rubric: any) {
    return aiService.post('/ai/assessment/evaluate', { response, rubric });
  }

  async provideFeedback(submission: any) {
    return aiService.post('/ai/assessment/feedback', { submission });
  }

  async trackProgress(studentId: string, assessmentId: string) {
    return aiService.post('/ai/assessment/track', { studentId, assessmentId });
  }
}