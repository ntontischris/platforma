import React from 'react';
import { GraduationCap } from 'lucide-react';
import Card from '../../components/ui/Card';

const AdaptiveLearning = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <GraduationCap className="w-8 h-8 text-neon-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white">Προσαρμοστική Μάθηση</h2>
          <p className="text-gray-400">
            AI-powered προσαρμογή της μαθησιακής διαδικασίας
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add adaptive learning features */}
      </div>
    </div>
  );
};

export default AdaptiveLearning;