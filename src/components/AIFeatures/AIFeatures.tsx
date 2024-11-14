import React, { useState } from 'react';
import { Brain, Sparkles, Zap, LineChart, Users, BookOpen, Target, MessageSquare, GitBranch, Lightbulb } from 'lucide-react';
import Card from '../ui/Card';
import AIFeatureModal from './AIFeatureModal';

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: typeof Brain;
  type: 'analysis' | 'generation' | 'optimization' | 'recommendation';
}

const features: AIFeature[] = [
  {
    id: 'learning-analysis',
    title: 'Ανάλυση Μάθησης',
    description: 'AI-powered ανάλυση μαθησιακής προόδου',
    icon: Brain,
    type: 'analysis'
  },
  {
    id: 'content-generation',
    title: 'Δημιουργία Περιεχομένου',
    description: 'Αυτόματη δημιουργία εκπαιδευτικού υλικού',
    icon: Sparkles,
    type: 'generation'
  },
  {
    id: 'performance-optimization',
    title: 'Βελτιστοποίηση Επίδοσης',
    description: 'AI-driven βελτιστοποίηση μαθησιακής διαδικασίας',
    icon: Zap,
    type: 'optimization'
  },
  {
    id: 'analytics',
    title: 'Αναλυτικά Στοιχεία',
    description: 'Προηγμένη ανάλυση δεδομένων μάθησης',
    icon: LineChart,
    type: 'analysis'
  },
  {
    id: 'collaborative-learning',
    title: 'Συνεργατική Μάθηση',
    description: 'AI-powered ομαδική μάθηση',
    icon: Users,
    type: 'optimization'
  },
  {
    id: 'content-recommendations',
    title: 'Προτάσεις Περιεχομένου',
    description: 'Εξατομικευμένες προτάσεις μάθησης',
    icon: BookOpen,
    type: 'recommendation'
  },
  {
    id: 'skill-assessment',
    title: 'Αξιολόγηση Δεξιοτήτων',
    description: 'AI-based αξιολόγηση ικανοτήτων',
    icon: Target,
    type: 'analysis'
  },
  {
    id: 'interactive-tutoring',
    title: 'Διαδραστική Διδασκαλία',
    description: 'AI-powered προσωπική καθοδήγηση',
    icon: MessageSquare,
    type: 'generation'
  },
  {
    id: 'knowledge-mapping',
    title: 'Χαρτογράφηση Γνώσης',
    description: 'Οπτικοποίηση μαθησιακής πορείας',
    icon: GitBranch,
    type: 'analysis'
  },
  {
    id: 'smart-recommendations',
    title: 'Έξυπνες Προτάσεις',
    description: 'AI-driven εξατομικευμένες προτάσεις',
    icon: Lightbulb,
    type: 'recommendation'
  }
];

const AIFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState<AIFeature | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.id}
              className="transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-cyber-dark-700 rounded-lg border border-neon-primary/30">
                  <Icon className="w-6 h-6 text-neon-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {feature.description}
                  </p>
                  <button className="neon-button text-sm px-4 py-1">
                    Έναρξη
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedFeature && (
        <AIFeatureModal
          isOpen={true}
          onClose={() => setSelectedFeature(null)}
          feature={selectedFeature}
        />
      )}
    </div>
  );
};

export default AIFeatures;