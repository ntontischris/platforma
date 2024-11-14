import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const PerformancePredictor: React.FC<Props> = ({ student }) => {
  const [prediction, setPrediction] = useState<any>(null);

  useEffect(() => {
    const predictPerformance = async () => {
      const result = await aiService.predictPerformance(student);
      setPrediction(result);
    };
    predictPerformance();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Πρόβλεψη Επίδοσης</h3>
      </div>

      {prediction && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {prediction.predictedGrade.toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Προβλεπόμενος Μ.Ο.</p>
          </div>

          <div className="space-y-2">
            {prediction.subjectPredictions.map((subject: any) => (
              <div key={subject.name} className="flex justify-between items-center">
                <span className="text-sm">{subject.name}</span>
                <span className={`text-sm font-medium ${
                  subject.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {subject.predicted}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Προτάσεις Βελτίωσης</h4>
            <ul className="space-y-1">
              {prediction.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PerformancePredictor;