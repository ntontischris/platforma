import { useState } from 'react';
import { Survey, Question } from '../types';
import { aiOrchestrator } from '../services/ai/AIOrchestrator';

export const useSurveyBuilder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async (topic: string, type: string) => {
    setLoading(true);
    try {
      const questions = await aiOrchestrator.getAssessment().generateAssessment(topic, type);
      return questions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const validateSurvey = async (survey: Survey) => {
    setLoading(true);
    try {
      const validation = await aiOrchestrator.getNLP().analyzeText(JSON.stringify(survey));
      return validation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const optimizeQuestions = async (questions: Question[]) => {
    setLoading(true);
    try {
      const optimized = await aiOrchestrator.getNLP().generateResponse(
        'optimize_questions',
        JSON.stringify(questions)
      );
      return optimized;
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
    generateQuestions,
    validateSurvey,
    optimizeQuestions
  };
};