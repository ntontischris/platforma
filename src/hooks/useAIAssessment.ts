import { useState } from 'react';
import { aiOrchestrator } from '../services/ai/AIOrchestrator';
import { Student } from '../types';

export const useAIAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAssessment = async (topic: string, difficulty: string) => {
    setLoading(true);
    try {
      const assessment = await aiOrchestrator.getAssessment().generateAssessment(topic, difficulty);
      return assessment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const evaluateSubmission = async (submission: any, rubric: any) => {
    setLoading(true);
    try {
      const evaluation = await aiOrchestrator.getAssessment().evaluateResponse(submission, rubric);
      return evaluation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const trackProgress = async (student: Student, assessmentId: string) => {
    setLoading(true);
    try {
      const progress = await aiOrchestrator.getAssessment().trackProgress(student.id, assessmentId);
      return progress;
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
    generateAssessment,
    evaluateSubmission,
    trackProgress
  };
};