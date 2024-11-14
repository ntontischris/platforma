// Core Types
export interface Student {
  id: string;
  name: string;
  class: string;
  email: string;
  phone: string;
  attendance: number;
  averageGrade: number;
  createdAt: Date;
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
  students: string[];
  schedule: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  class: string;
  type: 'exam' | 'meeting' | 'activity';
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning';
  createdAt: Date;
}

// AI Types
export interface StudyPlan {
  dailyTasks: Array<{
    time: string;
    subject: string;
    duration: number;
    description: string;
  }>;
  resources: Array<{
    title: string;
    type: string;
    url: string;
    description: string;
  }>;
  schedule: Record<string, string[]>;
}

export interface SkillAssessment {
  overallScore: number;
  skills: Array<{
    name: string;
    score: number;
    recommendations: string[];
  }>;
}

export interface ConceptExplanation {
  simple: string;
  detailed: string;
  examples: string[];
  related: string[];
}

export interface HomeworkSolution {
  steps: string[];
  explanation: string;
  tips: string[];
}

export interface LessonPlan {
  objectives: string[];
  materials: string[];
  steps: Array<{
    title: string;
    description: string;
    duration: number;
  }>;
}

export interface ExamQuestion {
  text: string;
  options?: string[];
  points: number;
  type: 'multiple-choice' | 'open-ended';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ClassProgress {
  averageGrade: number;
  improvement: number;
  participationRate: number;
  concerns: Array<{
    area: string;
    description: string;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
  }>;
}

export interface EducationalContent {
  title: string;
  type: 'notes' | 'presentation' | 'worksheet' | 'quiz';
  content: string;
  metadata: {
    subject: string;
    grade: string;
    duration: number;
  };
}

export interface ClassBehavior {
  engagementScore: number;
  collaborationScore: number;
  dynamics: Array<{
    aspect: string;
    observation: string;
  }>;
  suggestions: Array<{
    title: string;
    description: string;
  }>;
}

// Schedule Types
export interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  roomId?: string;
  teacherId?: string;
  classId?: string;
  type: 'class' | 'exam' | 'activity';
  recurrence?: 'none' | 'daily' | 'weekly';
  color?: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
  available: boolean;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface ScheduleConstraint {
  id: string;
  type: 'teacher' | 'room' | 'class';
  entityId: string;
  timeSlots: TimeSlot[];
}

export interface ScheduleSettings {
  workDays: string[];
  dailyStartTime: string;
  dailyEndTime: string;
  classDuration: number;
  breakDuration: number;
}