import React from 'react';
import { CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';

const Assessment = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <CheckCircle className="w-8 h-8 text-neon-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white">Αυτόματη Αξιολόγηση</h2>
          <p className="text-gray-400">
            AI-powered αξιολόγηση και ανατροφοδότηση
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add assessment features */}
      </div>
    </div>
  );
};

export default Assessment;