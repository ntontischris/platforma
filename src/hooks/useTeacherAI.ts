import { useState } from 'react';
import { aiService } from '../services/aiService';
import { LessonPlan, ExamQuestion, ClassProgress, EducationalContent, ClassBehavior } from '../types';

export const useTeacherAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLessonPlan = async (topic: string): Promise<LessonPlan> => {
    setLoading(true);
    try {
      const plan = await aiService.generateLessonPlan(topic);
      return plan;
    } catch (err) {
      setError('Failed to generate lesson plan');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateExam = async (subject: string, difficulty: string): Promise<ExamQuestion[]> => {
    setLoading(true);
    try {
      const exam = await aiService.generateExam(subject, difficulty);
      return exam;
    } catch (err) {
      setError('Failed to generate exam');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const analyzeClassProgress = async (classId: string): Promise<ClassProgress> => {
    setLoading(true);
    try {
      const progress = await aiService.analyzeClassProgress(classId);
      return progress;
    } catch (err) {
      setError('Failed to analyze class progress');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async (topic: string, type: string): Promise<EducationalContent> => {
    setLoading(true);
    try {
      const content = await aiService.generateEducationalContent(topic, type);
      return content;
    } catch (err) {
      setError('Failed to generate content');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const analyzeClassBehavior = async (classId: string): Promise<ClassBehavior> => {
    setLoading(true);
    try {
      const behavior = await aiService.analyzeClassBehavior(classId);
      return behavior;
    } catch (err) {
      setError('Failed to analyze class behavior');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateLessonPlan,
    generateExam,
    analyzeClassProgress,
    generateContent,
    analyzeClassBehavior
  };
};