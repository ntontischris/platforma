import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const BehavioralAnalyst: React.FC<Props> = ({ student }) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const analyzeBehavior = async () => {
      const result = await aiService.analyzeBehavior(student);
      setAnalysis(result);
    };
    analyzeBehavior();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Ανάλυση Συμπεριφοράς</h3>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {analysis.engagementScore}%
              </div>
              <p className="text-sm text-gray-600">Συμμετοχή</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {analysis.socialScore}%
              </div>
              <p className="text-sm text-gray-600">Κοινωνικότητα</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Παρατηρήσεις</h4>
            <ul className="space-y-1">
              {analysis.observations.map((obs: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {obs}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Προτάσεις Βελτίωσης</h4>
            <ul className="space-y-1">
              {analysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BehavioralAnalyst;