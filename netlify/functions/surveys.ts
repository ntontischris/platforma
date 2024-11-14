import { Handler } from '@netlify/functions';
import { Survey, Question, Response } from '../../src/types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const surveys: Survey[] = [];

export const handler: Handler = async (event) => {
  if (!event.httpMethod) {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          body: JSON.stringify(surveys)
        };

      case 'POST':
        const { type, data } = JSON.parse(event.body || '{}');

        switch (type) {
          case 'create':
            const newSurvey: Survey = {
              ...data,
              id: crypto.randomUUID(),
              responses: [],
              createdAt: new Date(),
              updatedAt: new Date()
            };
            surveys.push(newSurvey);
            return {
              statusCode: 201,
              body: JSON.stringify(newSurvey)
            };

          case 'submit':
            const { surveyId, response } = data;
            const survey = surveys.find(s => s.id === surveyId);
            if (!survey) {
              return { statusCode: 404, body: 'Survey not found' };
            }
            const newResponse: Response = {
              ...response,
              id: crypto.randomUUID(),
              surveyId,
              timestamp: new Date()
            };
            survey.responses.push(newResponse);
            return {
              statusCode: 200,
              body: JSON.stringify(newResponse)
            };

          case 'analyze':
            const analysis = await analyzeSurvey(data.surveyId);
            return {
              statusCode: 200,
              body: JSON.stringify(analysis)
            };

          default:
            return { statusCode: 400, body: 'Invalid request type' };
        }

      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    console.error('Surveys Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

async function analyzeSurvey(surveyId: string) {
  const survey = surveys.find(s => s.id === surveyId);
  if (!survey) {
    throw new Error('Survey not found');
  }

  const analysis = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert in analyzing survey data and providing insights.'
      },
      {
        role: 'user',
        content: `Analyze this survey data and provide insights: ${JSON.stringify(survey)}`
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  return {
    insights: analysis.choices[0]?.message?.content,
    statistics: calculateStatistics(survey),
    recommendations: generateRecommendations(survey)
  };
}

function calculateStatistics(survey: Survey) {
  return {
    totalResponses: survey.responses.length,
    completionRate: calculateCompletionRate(survey),
    averageTimeSpent: calculateAverageTimeSpent(survey)
  };
}

function calculateCompletionRate(survey: Survey): number {
  if (survey.responses.length === 0) return 0;
  const completedResponses = survey.responses.filter(r => 
    r.answers.length === survey.questions.length
  );
  return (completedResponses.length / survey.responses.length) * 100;
}

function calculateAverageTimeSpent(survey: Survey): number {
  if (survey.responses.length === 0) return 0;
  const timeSpent = survey.responses.reduce((acc, r) => {
    if (r.metadata?.timeSpent) {
      return acc + r.metadata.timeSpent;
    }
    return acc;
  }, 0);
  return timeSpent / survey.responses.length;
}

function generateRecommendations(survey: Survey): string[] {
  const recommendations = [];
  
  if (survey.responses.length < 10) {
    recommendations.push('Increase survey participation to get more meaningful insights');
  }
  
  const completionRate = calculateCompletionRate(survey);
  if (completionRate < 80) {
    recommendations.push('Consider simplifying the survey to improve completion rate');
  }

  return recommendations;
}