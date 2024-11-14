import React from 'react';
import { Brain } from 'lucide-react';
import ProsopikoBoitho from '../../components/AIFeatures/StudentFeatures/ProsopikoBoitho';

const AIAssistant = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Brain className="w-8 h-8 text-neon-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white">AI Προσωπικός Βοηθός</h2>
          <p className="text-gray-400">
            Έξυπνη υποστήριξη και καθοδήγηση με τεχνητή νοημοσύνη
          </p>
        </div>
      </div>

      <ProsopikoBoitho />
    </div>
  );
};

export default AIAssistant;