import { useState } from 'react';
import { aiService } from '../services/aiService';
import { StudyPlan, SkillAssessment, ConceptExplanation, HomeworkSolution } from '../types';

export const useStudentAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTutorResponse = async (question: string): Promise<string> => {
    setLoading(true);
    try {
      const response = await aiService.getTutorResponse(question);
      return response;
    } catch (err) {
      setError('Failed to get tutor response');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const solveHomework = async (problem: string): Promise<HomeworkSolution> => {
    setLoading(true);
    try {
      const solution = await aiService.solveHomeworkProblem(problem);
      return solution;
    } catch (err) {
      setError('Failed to solve homework');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const explainConcept = async (concept: string): Promise<ConceptExplanation> => {
    setLoading(true);
    try {
      const explanation = await aiService.explainConcept(concept);
      return explanation;
    } catch (err) {
      setError('Failed to explain concept');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateStudySchedule = async (preferences: any): Promise<StudyPlan> => {
    setLoading(true);
    try {
      const schedule = await aiService.generateStudySchedule(preferences);
      return schedule;
    } catch (err) {
      setError('Failed to generate study schedule');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const assessSkills = async (subject: string): Promise<SkillAssessment> => {
    setLoading(true);
    try {
      const assessment = await aiService.assessSkills(subject);
      return assessment;
    } catch (err) {
      setError('Failed to assess skills');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getTutorResponse,
    solveHomework,
    explainConcept,
    generateStudySchedule,
    assessSkills
  };
};