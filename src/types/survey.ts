export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  responses: Response[];
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'active' | 'closed';
  settings: SurveySettings;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  order: number;
  settings?: QuestionSettings;
}

export interface Response {
  id: string;
  surveyId: string;
  studentId: string;
  answers: Answer[];
  timestamp: Date;
  metadata?: ResponseMetadata;
}

export interface Answer {
  questionId: string;
  value: string | number | string[];
  timestamp: Date;
}

export interface SurveySettings {
  allowAnonymous: boolean;
  requireLogin: boolean;
  showProgress: boolean;
  shuffleQuestions: boolean;
  limitResponses?: number;
  deadline?: Date;
  notifyOnResponse?: boolean;
}

export interface QuestionSettings {
  allowMultiple?: boolean;
  minLength?: number;
  maxLength?: number;
  validation?: string;
  scoring?: {
    points: number;
    correctAnswer?: string | string[];
  };
}

export interface ResponseMetadata {
  browser?: string;
  platform?: string;
  timeSpent?: number;
  completionRate?: number;
}

export type QuestionType = 
  | 'text' 
  | 'textarea'
  | 'multiple'
  | 'checkbox'
  | 'rating'
  | 'scale'
  | 'date'
  | 'time'
  | 'file';