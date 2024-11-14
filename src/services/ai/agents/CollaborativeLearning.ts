import { Student } from '../../../types';
import { aiService } from '../../aiService';

export class CollaborativeLearning {
  async matchPeers(student: Student) {
    return aiService.post('/ai/collaborative/match', { student });
  }

  async suggestGroupActivities(students: Student[]) {
    return aiService.post('/ai/collaborative/activities', { students });
  }

  async analyzeGroupDynamics(groupId: string) {
    return aiService.post('/ai/collaborative/dynamics', { groupId });
  }

  async recommendRoles(students: Student[]) {
    return aiService.post('/ai/collaborative/roles', { students });
  }
}