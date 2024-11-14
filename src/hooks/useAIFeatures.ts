import { useState, useCallback } from 'react';
import { aiOrchestrator } from '../services/ai/AIOrchestrator';
import { Student } from '../types';

export const useAIFeatures = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeStudent = useCallback(async (student: Student) => {
    setLoading(true);
    setError(null);
    try {
      const result = await aiOrchestrator.processStudentInput('analyze', student);
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

  return {
    loading,
    error,
    analyzeStudent,
    generateContent
  };
};