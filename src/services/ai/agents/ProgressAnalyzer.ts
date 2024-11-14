import { Student } from '../../../types';
import { aiService } from '../../aiService';

export class ProgressAnalyzer {
  async analyzeProgress(student: Student) {
    return aiService.post('/ai/progress/analyze', { student });
  }

  async predictOutcomes(student: Student) {
    return aiService.post('/ai/progress/predict', { student });
  }

  async identifyStrengths(student: Student) {
    return aiService.post('/ai/progress/strengths', { student });
  }

  async suggestInterventions(student: Student) {
    return aiService.post('/ai/progress/interventions', { student });
  }
}