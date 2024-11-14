import { useState } from 'react';
import { aiOrchestrator } from '../services/ai/AIOrchestrator';
import { Student } from '../types';

export const useAIAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeClassPerformance = async (classId: string) => {
    setLoading(true);
    try {
      const [progress, behavior, engagement] = await Promise.all([
        aiOrchestrator.getProgress().analyzeProgress({ id: classId } as Student),
        aiOrchestrator.getNLP().analyzeText(classId),
        aiOrchestrator.getCollaborative().analyzeGroupDynamics(classId)
      ]);

      return { progress, behavior, engagement };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async (data: any) => {
    setLoading(true);
    try {
      const insights = await aiOrchestrator.getNLP().generateResponse('insights', JSON.stringify(data));
      return insights;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const predictTrends = async (historicalData: any) => {
    setLoading(true);
    try {
      const trends = await aiOrchestrator.getProgress().predictOutcomes({ data: historicalData } as any);
      return trends;
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
    analyzeClassPerformance,
    generateInsights,
    predictTrends
  };
};