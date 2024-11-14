import { Student } from '../../../types';
import { aiService } from '../../aiService';

export class DifficultyScaler {
  async adjustDifficulty(student: Student, subject: string) {
    return aiService.post('/ai/difficulty/adjust', { student, subject });
  }

  async recommendChallenges(student: Student) {
    return aiService.post('/ai/difficulty/challenges', { student });
  }

  async analyzePerfomanceThresholds(student: Student) {
    return aiService.post('/ai/difficulty/thresholds', { student });
  }
}