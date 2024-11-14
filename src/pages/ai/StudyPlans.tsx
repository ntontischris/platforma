import React from 'react';
import { BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card';

const StudyPlans = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <BookOpen className="w-8 h-8 text-neon-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white">Πλάνα Μελέτης</h2>
          <p className="text-gray-400">
            AI-generated εξατομικευμένα πλάνα μελέτης
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add study plan features */}
      </div>
    </div>
  );
};

export default StudyPlans;