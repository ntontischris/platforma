import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import AINavigation from '../../components/AIFeatures/AINavigation';
import AIFeaturesGrid from '../../components/AIFeatures/AIFeaturesGrid';
import AIInsights from '../../components/AIFeatures/AIInsights';
import useStore from '../../store/useStore';

const AIServices = () => {
  const currentStudent = useStore((state) => state.students[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-neon-primary" />
          <div>
            <h2 className="text-2xl font-bold text-white">AI Υπηρεσίες</h2>
            <p className="text-gray-300">
              AI-powered εργαλεία για την υποστήριξη της μάθησης
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-cyber-dark-700 rounded-lg border border-neon-primary/20">
          <Sparkles className="w-5 h-5 text-neon-primary" />
          <span className="text-neon-primary font-medium">AI-Powered Features</span>
        </div>
      </div>

      <AINavigation />
      <AIFeaturesGrid student={currentStudent} />
      <AIInsights />
    </div>
  );
};

export default AIServices;