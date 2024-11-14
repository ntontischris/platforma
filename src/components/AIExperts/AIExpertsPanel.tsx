import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import LearningStyleAnalyzer from './agents/LearningStyleAnalyzer';
import PerformancePredictor from './agents/PerformancePredictor';
import BehavioralAnalyst from './agents/BehavioralAnalyst';
import ContentRecommender from './agents/ContentRecommender';
import EngagementOptimizer from './agents/EngagementOptimizer';
import SkillGapAnalyzer from './agents/SkillGapAnalyzer';
import EmotionalIntelligenceCoach from './agents/EmotionalIntelligenceCoach';
import StudyPlanGenerator from './agents/StudyPlanGenerator';
import PeerCollaborationMatcher from './agents/PeerCollaborationMatcher';
import CareerPathAdvisor from './agents/CareerPathAdvisor';
import { Student } from '../../types';

interface AIExpertsPanelProps {
  student: Student;
}

const AIExpertsPanel: React.FC<AIExpertsPanelProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold">AI Εκπαιδευτικοί Σύμβουλοι</h2>
            <p className="text-gray-600">
              10 εξειδικευμένοι AI agents για την υποστήριξη της μάθησης
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-medium">AI-Powered Insights</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <LearningStyleAnalyzer student={student} />
        <PerformancePredictor student={student} />
        <BehavioralAnalyst student={student} />
        <ContentRecommender student={student} />
        <EngagementOptimizer student={student} />
        <SkillGapAnalyzer student={student} />
        <EmotionalIntelligenceCoach student={student} />
        <StudyPlanGenerator student={student} />
        <PeerCollaborationMatcher student={student} />
        <CareerPathAdvisor student={student} />
      </div>
    </div>
  );
};

export default AIExpertsPanel;