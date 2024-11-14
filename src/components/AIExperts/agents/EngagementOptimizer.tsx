import React, { useState, useEffect } from 'react';
import { Target } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const EngagementOptimizer: React.FC<Props> = ({ student }) => {
  const [optimization, setOptimization] = useState<any>(null);

  useEffect(() => {
    const optimizeEngagement = async () => {
      const result = await aiService.optimizeEngagement(student);
      setOptimization(result);
    };
    optimizeEngagement();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Βελτιστοποίηση Συμμετοχής</h3>
      </div>

      {optimization && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {optimization.metrics.map((metric: any) => (
              <div key={metric.name} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">
                  {metric.value}%
                </div>
                <p className="text-xs text-gray-600">{metric.name}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Προτεινόμενες Δράσεις</h4>
            <div className="space-y-2">
              {optimization.actions.map((action: any, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{action.title}</h5>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      action.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : action.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {action.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EngagementOptimizer;