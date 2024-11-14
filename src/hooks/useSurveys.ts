import { useState } from 'react';
import { Student } from '../types';

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  responses: Response[];
}

interface Question {
  id: string;
  text: string;
  type: 'multiple' | 'text' | 'rating';
  options?: string[];
}

interface Response {
  id: string;
  studentId: string;
  answers: Answer[];
  timestamp: Date;
}

interface Answer {
  questionId: string;
  value: string | number;
}

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSurvey = async (survey: Omit<Survey, 'id' | 'responses'>) => {
    setLoading(true);
    try {
      const newSurvey: Survey = {
        ...survey,
        id: crypto.randomUUID(),
        responses: []
      };
      setSurveys([...surveys, newSurvey]);
      return newSurvey;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create survey');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async (surveyId: string, student: Student, answers: Answer[]) => {
    setLoading(true);
    try {
      const response: Response = {
        id: crypto.randomUUID(),
        studentId: student.id,
        answers,
        timestamp: new Date()
      };

      setSurveys(surveys.map(survey => 
        survey.id === surveyId 
          ? { ...survey, responses: [...survey.responses, response] }
          : survey
      ));

      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit response');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const analyzeSurvey = async (surveyId: string) => {
    setLoading(true);
    try {
      const survey = surveys.find(s => s.id === surveyId);
      if (!survey) throw new Error('Survey not found');

      const analysis = {
        totalResponses: survey.responses.length,
        questionAnalysis: survey.questions.map(question => {
          const answers = survey.responses
            .map(r => r.answers.find(a => a.questionId === question.id))
            .filter(Boolean);

          return {
            questionId: question.id,
            questionText: question.text,
            responseCount: answers.length,
            summary: question.type === 'multiple' 
              ? summarizeMultipleChoice(answers as Answer[])
              : summarizeTextResponses(answers as Answer[])
          };
        })
      };

      return analysis;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze survey');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const summarizeMultipleChoice = (answers: Answer[]) => {
    const counts: Record<string, number> = {};
    answers.forEach(answer => {
      counts[answer.value as string] = (counts[answer.value as string] || 0) + 1;
    });
    return counts;
  };

  const summarizeTextResponses = (answers: Answer[]) => {
    return {
      responseCount: answers.length,
      responses: answers.map(a => a.value)
    };
  };

  return {
    surveys,
    loading,
    error,
    createSurvey,
    submitResponse,
    analyzeSurvey
  };
};