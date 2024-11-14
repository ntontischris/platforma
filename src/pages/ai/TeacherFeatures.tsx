import React from 'react';
import LessonPlanner from '../../components/AIFeatures/TeacherFeatures/LessonPlanner';
import ExamGenerator from '../../components/AIFeatures/TeacherFeatures/ExamGenerator';
import ProgressAnalyzer from '../../components/AIFeatures/TeacherFeatures/ProgressAnalyzer';
import ContentGenerator from '../../components/AIFeatures/TeacherFeatures/ContentGenerator';
import BehaviorAnalytics from '../../components/AIFeatures/TeacherFeatures/BehaviorAnalytics';

const TeacherFeatures = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Εργαλεία Καθηγητών</h1>
        <p className="text-gray-600 mt-1">
          Εξειδικευμένα AI εργαλεία για την υποστήριξη του εκπαιδευτικού έργου
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LessonPlanner />
        <ExamGenerator />
        <ProgressAnalyzer classId="1" />
        <ContentGenerator />
        <BehaviorAnalytics classId="1" />
      </div>
    </div>
  );
};

export default TeacherFeatures;