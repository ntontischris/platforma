import axios from 'axios';
import { Student } from '../types';

class AIService {
  private static instance: AIService;
  private baseURL: string;

  private constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Learning Analysis
  async analyzeLearningStyle(student: Student) {
    return this.post('/ai/analyze/learning-style', { student });
  }

  async analyzePerformance(student: Student) {
    return this.post('/ai/analyze/performance', { student });
  }

  async analyzeBehavior(student: Student) {
    return this.post('/ai/analyze/behavior', { student });
  }

  // Content Generation
  async generateLessonPlan(topic: string) {
    return this.post('/ai/generate/lesson-plan', { topic });
  }

  async generateExam(subject: string, difficulty: string) {
    return this.post('/ai/generate/exam', { subject, difficulty });
  }

  async generateEducationalContent(topic: string, type: string) {
    return this.post('/ai/generate/content', { topic, type });
  }

  // Student Support
  async getTutorResponse(question: string) {
    return this.post('/ai/tutor/response', { question });
  }

  async solveHomeworkProblem(problem: string) {
    return this.post('/ai/homework/solve', { problem });
  }

  async explainConcept(concept: string) {
    return this.post('/ai/explain/concept', { concept });
  }

  async generateStudySchedule(preferences: any) {
    return this.post('/ai/generate/schedule', { preferences });
  }

  // Progress Tracking
  async analyzeStudentProgress(studentId: string) {
    return this.post('/ai/analyze/progress', { studentId });
  }

  async predictStudentPerformance(student: Student) {
    return this.post('/ai/predict/performance', { student });
  }

  async analyzeSkillGaps(student: Student) {
    return this.post('/ai/analyze/skill-gaps', { student });
  }

  // Emotional Intelligence
  async analyzeEmotionalIntelligence(student: Student) {
    return this.post('/ai/analyze/eq', { student });
  }

  // Peer Learning
  async findPeerMatches(student: Student) {
    return this.post('/ai/find/peer-matches', { student });
  }

  // Career Guidance
  async getCareerAdvice(student: Student) {
    return this.post('/ai/career/advice', { student });
  }

  // Class Analytics
  async analyzeClassProgress(classId: string) {
    return this.post('/ai/analyze/class-progress', { classId });
  }

  async analyzeClassBehavior(classId: string) {
    return this.post('/ai/analyze/class-behavior', { classId });
  }

  // Resource Optimization
  async optimizeResourceAllocation(resources: any[], demands: any[]) {
    return this.post('/ai/optimize/resources', { resources, demands });
  }

  // Engagement Optimization
  async optimizeEngagement(student: Student) {
    return this.post('/ai/optimize/engagement', { student });
  }

  // Content Recommendations
  async getContentRecommendations(student: Student) {
    return this.post('/ai/recommend/content', { student });
  }

  // Helper Methods
  private async post(endpoint: string, data: any) {
    try {
      const response = await axios.post(`${this.baseURL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`AI Service Error (${endpoint}):`, error);
      throw new Error(`Failed to process AI request: ${error}`);
    }
  }

  // Mock Methods for Development
  generateLearningRecommendations(student: Student) {
    return [
      'Focus on visual learning materials for mathematics',
      'Practice problem-solving with real-world examples',
      'Use spaced repetition for vocabulary retention',
      'Incorporate group discussions for complex topics'
    ];
  }

  calculateDropoutRisk(student: Student): number {
    const riskFactors = {
      attendance: student.attendance < 85 ? 0.3 : 0,
      grades: student.averageGrade < 7 ? 0.4 : 0,
      participation: 0.1
    };
    return Object.values(riskFactors).reduce((a, b) => a + b, 0);
  }

  async analyzeStudentBehavior(student: Student) {
    return {
      engagement: 0.85,
      patterns: [
        { description: 'Active participation in group work', trend: 'up' },
        { description: 'Consistent homework completion', trend: 'up' },
        { description: 'Attention during lectures', trend: 'down' }
      ],
      recommendations: [
        'Incorporate more interactive learning activities',
        'Provide positive reinforcement for participation',
        'Consider shorter, focused learning sessions'
      ]
    };
  }

  async analyzeText(content: string) {
    return {
      quality: 0.8,
      understanding: 0.75,
      structure: 0.85,
      creativity: 0.7,
      summary: 'Well-structured content with good understanding',
      strengths: ['Clear explanations', 'Logical flow'],
      improvements: ['Add more examples', 'Expand on key concepts']
    };
  }
}

export const aiService = AIService.getInstance();