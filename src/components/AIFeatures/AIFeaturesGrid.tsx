import React from 'react';
import { Brain, BookOpen, Target, Users, Activity, LineChart } from 'lucide-react';
import AIFeatureCard from './AIFeatureCard';
import { useAIFeatures } from '../../hooks/useAIFeatures';
import { Student } from '../../types';

interface AIFeaturesGridProps {
  student?: Student;
}

const AIFeaturesGrid: React.FC<AIFeaturesGridProps> = ({ student }) => {
  const {
    loading,
    generateLearningPath,
    getFeedback,
    generateAssessment,
    findPeerMatches,
    analyzeProgress,
  } = useAIFeatures(student);

  const features = [
    {
      title: 'Personalized Learning Path',
      description: 'AI-generated learning path based on your progress and goals',
      icon: Brain,
      action: generateLearningPath,
    },
    {
      title: 'Smart Feedback',
      description: 'Get instant, personalized feedback on your work',
      icon: Activity,
      action: () => getFeedback({ type: 'assignment' }, { rubric: 'standard' }),
    },
    {
      title: 'Adaptive Assessment',
      description: 'AI-powered assessments that adapt to your level',
      icon: Target,
      action: () => generateAssessment('math', 'intermediate'),
    },
    {
      title: 'Peer Learning',
      description: 'Find the perfect study partners based on AI matching',
      icon: Users,
      action: findPeerMatches,
    },
    {
      title: 'Progress Analytics',
      description: 'Deep insights into your learning journey',
      icon: LineChart,
      action: analyzeProgress,
    },
    {
      title: 'Content Recommendations',
      description: 'Personalized learning resources and materials',
      icon: BookOpen,
      action: generateLearningPath,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <AIFeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          loading={loading}
          onAction={feature.action}
        />
      ))}
    </div>
  );
};

export default AIFeaturesGrid;