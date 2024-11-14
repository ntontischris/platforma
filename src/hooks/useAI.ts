import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';
import { Student } from '../types';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeLearningStyle = useCallback(async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiService.analyzeLearningStyle(student);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const predictPerformance = useCallback(async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiService.predictPerformance(student);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateLessonPlan = useCallback(async (subject: string, grade: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiService.generateLessonPlan(subject, grade);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateExam = useCallback(async (subject: string, topics: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiService.generateExam(subject, topics);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    analyzeLearningStyle,
    predictPerformance,
    generateLessonPlan,
    generateExam
  };
}