import { Student } from '../../types';

export class CollaborativeService {
  async matchPeers(student: Student) {
    try {
      const response = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'match_peers',
          student,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to match peers');
      }

      return await response.json();
    } catch (error) {
      console.error('Collaborative Service Error:', error);
      throw error;
    }
  }

  async analyzeGroupDynamics(groupId: string) {
    try {
      const response = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'analyze_group',
          groupId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze group dynamics');
      }

      return await response.json();
    } catch (error) {
      console.error('Collaborative Service Error:', error);
      throw error;
    }
  }

  async suggestActivities(students: Student[]) {
    try {
      const response = await fetch('/.netlify/functions/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'suggest_activities',
          students,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to suggest activities');
      }

      return await response.json();
    } catch (error) {
      console.error('Collaborative Service Error:', error);
      throw error;
    }
  }
}