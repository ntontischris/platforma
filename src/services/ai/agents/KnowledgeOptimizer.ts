import { Student } from '../../../types';
import { aiService } from '../../aiService';

export class KnowledgeOptimizer {
  async analyzeRetention(student: Student) {
    return aiService.post('/ai/knowledge/retention', { student });
  }

  async scheduleRevisions(student: Student) {
    return aiService.post('/ai/knowledge/revisions', { student });
  }

  async generatePracticeContent(topic: string, retentionData: any) {
    return aiService.post('/ai/knowledge/practice', { topic, retentionData });
  }

  async recommendReinforcementActivities(student: Student) {
    return aiService.post('/ai/knowledge/reinforce', { student });
  }
}