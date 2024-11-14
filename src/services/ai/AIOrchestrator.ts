import { NLPService } from './NLPService';
import { FeedbackService } from './FeedbackService';
import { AssessmentService } from './AssessmentService';
import { ContentService } from './ContentService';
import { ProgressService } from './ProgressService';
import { Student } from '../../types';

class AIOrchestrator {
  private nlpService: NLPService;
  private feedbackService: FeedbackService;
  private assessmentService: AssessmentService;
  private contentService: ContentService;
  private progressService: ProgressService;

  constructor() {
    this.nlpService = new NLPService();
    this.feedbackService = new FeedbackService();
    this.assessmentService = new AssessmentService();
    this.contentService = new ContentService();
    this.progressService = new ProgressService();
  }

  async processStudentInput(type: string, student: Student) {
    const nlpResult = await this.nlpService.processInput(type, student);
    return nlpResult;
  }

  async generatePersonalizedContent(student: Student) {
    const content = await this.contentService.generateContent(student);
    return content;
  }

  async provideFeedback(student: Student, activity: string) {
    const feedback = await this.feedbackService.generateFeedback(student, activity);
    return feedback;
  }

  async assessPerformance(student: Student) {
    const assessment = await this.assessmentService.evaluate(student);
    return assessment;
  }

  async trackProgress(student: Student) {
    const progress = await this.progressService.analyze(student);
    return progress;
  }
}

export const aiOrchestrator = new AIOrchestrator();