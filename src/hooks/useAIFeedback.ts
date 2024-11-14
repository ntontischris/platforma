import { useState } from 'react';
import { aiOrchestrator } from '../services/ai/AIOrchestrator';
import { Student } from '../types';

export const useAIFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePersonalizedFeedback = async (student: Student, work: any) => {
    setLoading(true);
    try {
      const feedback = await aiOrchestrator.getFeedback().generateFeedback(work, {
        studentProfile: student,
        learningStyle: await aiOrchestrator.getLearningPath().generatePath(student)
      });
      return feedback;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const analyzeFeedbackEffectiveness = async (feedbackHistory: any[]) => {
    setLoading(true);
    try {
      const analysis = await aiOrchestrator.getFeedback().trackFeedbackImplementation('', feedbackHistory);
      return analysis;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const suggestImprovements = async (work: any) => {
    setLoading(true);
    try {
      const suggestions = await aiOrchestrator.getFeedback().suggestImprovements(work);
      return suggestions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generatePersonalizedFeedback,
    analyzeFeedbackEffectiveness,
    suggestImprovements
  };
};