import React from 'react';
import { LineChart } from 'lucide-react';
import Card from '../../components/ui/Card';

const Performance = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <LineChart className="w-8 h-8 text-neon-primary" />
        <div>
          <h2 className="text-2xl font-bold text-white">Πρόβλεψη Επίδοσης</h2>
          <p className="text-gray-400">
            AI-powered ανάλυση και πρόβλεψη μελλοντικής επίδοσης
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Τρέχουσα Επίδοση</h3>
          {/* Add current performance metrics */}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Προβλέψεις</h3>
          {/* Add performance predictions */}
        </Card>
      </div>
    </div>
  );
};

export default Performance;