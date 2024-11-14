import { aiService } from '../../aiService';

export class MultiModalLearning {
  async generateVisualContent(concept: string) {
    return aiService.post('/ai/multimodal/visual', { concept });
  }

  async createAudioExplanation(topic: string) {
    return aiService.post('/ai/multimodal/audio', { topic });
  }

  async suggestInteractiveExercises(concept: string) {
    return aiService.post('/ai/multimodal/interactive', { concept });
  }

  async recommendLearningStyle(studentId: string) {
    return aiService.post('/ai/multimodal/style', { studentId });
  }
}