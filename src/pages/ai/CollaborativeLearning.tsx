import React from 'react';
import { Users } from 'lucide-react';
import Card from '../../components/ui/Card';

const CollaborativeLearning = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="w-8 h-8 text-neon-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white">Συνεργατική Μάθηση</h2>
          <p className="text-gray-400">
            AI-powered ομαδική μάθηση και συνεργασία
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add collaborative learning features */}
      </div>
    </div>
  );
};

export default CollaborativeLearning;