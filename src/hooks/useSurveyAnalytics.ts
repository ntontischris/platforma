import { useState } from 'react';
import { Survey, Question, Response } from '../types';
import { aiOrchestrator } from '../services/ai/AIOrchestrator';

export const useSurveyAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = async (responses: Response[]) => {
    setLoading(true);
    try {
      const sentiments = await Promise.all(
        responses.map(response => 
          aiOrchestrator.getNLP().analyzeText(JSON.stringify(response))
        )
      );
      return sentiments;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async (survey: Survey) => {
    setLoading(true);
    try {
      const insights = await aiOrchestrator.getNLP().generateResponse(
        'survey_insights',
        JSON.stringify(survey)
      );
      return insights;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const suggestImprovements = async (survey: Survey) => {
    setLoading(true);
    try {
      const suggestions = await aiOrchestrator.getFeedback().suggestImprovements(survey);
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
    analyzeSentiment,
    generateInsights,
    suggestImprovements
  };
};