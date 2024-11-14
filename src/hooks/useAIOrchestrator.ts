import { useState, useCallback } from 'react';
import { aiOrchestrator } from '../services/ai/AIOrchestrator';
import { Student } from '../types';

export const useAIOrchestrator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processInput = useCallback(async (type: string, student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiOrchestrator.processStudentInput(type, student);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateContent = useCallback(async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiOrchestrator.generatePersonalizedContent(student);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const provideFeedback = useCallback(async (student: Student, activity: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiOrchestrator.provideFeedback(student, activity);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const assessPerformance = useCallback(async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiOrchestrator.assessPerformance(student);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const trackProgress = useCallback(async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiOrchestrator.trackProgress(student);
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
    processInput,
    generateContent,
    provideFeedback,
    assessPerformance,
    trackProgress
  };
};