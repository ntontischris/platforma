import React from 'react';
import { aiService } from '../../services/aiService';
import { Student } from '../../types';
import Card from '../ui/Card';
import { TrendingUp } from 'lucide-react';

interface PerformancePredictorProps {
  student: Student;
}

const PerformancePredictor: React.FC<PerformancePredictorProps> = ({ student }) => {
  const [prediction, setPrediction] = React.useState<number | null>(null);

  React.useEffect(() => {
    const getPrediction = async () => {
      const result = await aiService.predictStudentPerformance(student);
      setPrediction(result);
    };
    getPrediction();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-3 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Πρόβλεψη Επίδοσης</h3>
      </div>
      
      {prediction !== null && (
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {prediction.toFixed(1)}
          </div>
          <p className="text-sm text-gray-600">
            Εκτιμώμενος μέσος όρος επόμενου τριμήνου
          </p>
        </div>
      )}
    </Card>
  );
};

export default PerformancePredictor;