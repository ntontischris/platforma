import { aiService } from './aiService';

export interface Message {
  id: string;
  studentId: string;
  parentId: string;
  content: string;
  type: 'notification' | 'reminder' | 'update';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  readAt?: Date;
}

class CommunicationService {
  private static instance: CommunicationService;

  private constructor() {}

  public static getInstance(): CommunicationService {
    if (!CommunicationService.instance) {
      CommunicationService.instance = new CommunicationService();
    }
    return CommunicationService.instance;
  }

  async generateParentUpdate(studentId: string): Promise<Message> {
    const studentData = await aiService.analyzeStudentProgress(studentId);
    
    return {
      id: crypto.randomUUID(),
      studentId,
      parentId: 'parent-id', // This would come from your user system
      content: this.composeUpdateMessage(studentData),
      type: 'update',
      priority: this.determinePriority(studentData),
      createdAt: new Date()
    };
  }

  async generateReminder(studentId: string, eventType: string): Promise<Message> {
    const studentPreferences = await aiService.analyzeStudentPreferences(studentId);
    
    return {
      id: crypto.randomUUID(),
      studentId,
      parentId: 'parent-id',
      content: this.composeReminderMessage(eventType, studentPreferences),
      type: 'reminder',
      priority: 'medium',
      createdAt: new Date()
    };
  }

  private composeUpdateMessage(studentData: any): string {
    // AI-powered message composition based on student data
    const highlights = this.extractHighlights(studentData);
    const improvements = this.identifyImprovementAreas(studentData);
    const recommendations = this.generateRecommendations(studentData);

    return `
      Αγαπητοί γονείς,

      Εβδομαδιαία ενημέρωση για την πρόοδο του παιδιού σας:

      Επιτεύγματα:
      ${highlights.map(h => `• ${h}`).join('\n')}

      Σημεία προσοχής:
      ${improvements.map(i => `• ${i}`).join('\n')}

      Προτάσεις:
      ${recommendations.map(r => `• ${r}`).join('\n')}
    `;
  }

  private composeReminderMessage(eventType: string, preferences: any): string {
    // AI-powered reminder composition based on event type and student preferences
    return `Υπενθύμιση: ${eventType}\n\nΛεπτομέρειες: ...`;
  }

  private determinePriority(studentData: any): Message['priority'] {
    // Determine message priority based on student data analysis
    if (studentData.urgentIssues?.length > 0) return 'high';
    if (studentData.concerns?.length > 0) return 'medium';
    return 'low';
  }

  private extractHighlights(data: any): string[] {
    return data.highlights || [];
  }

  private identifyImprovementAreas(data: any): string[] {
    return data.improvementAreas || [];
  }

  private generateRecommendations(data: any): string[] {
    return data.recommendations || [];
  }
}

export const communicationService = CommunicationService.getInstance();