import { Student } from '../../../types';
import { aiService } from '../../aiService';

export class LearningPathGenerator {
  async generatePath(student: Student) {
    const path = await aiService.post('/ai/learning/path', { student });
    return {
      milestones: path.milestones,
      prerequisites: path.prerequisites,
      objectives: path.objectives,
      timeline: path.timeline,
      adaptiveContent: path.adaptiveContent
    };
  }

  async updatePath(student: Student, progress: any) {
    return aiService.post('/ai/learning/path/update', { student, progress });
  }

  async suggestNextSteps(student: Student) {
    return aiService.post('/ai/learning/next-steps', { student });
  }
}