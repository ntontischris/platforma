import React from 'react';
import { aiService } from '../../services/aiService';
import { Student } from '../../types';
import Card from '../ui/Card';
import { AlertTriangle } from 'lucide-react';

interface DropoutRiskAlertProps {
  student: Student;
}

const DropoutRiskAlert: React.FC<DropoutRiskAlertProps> = ({ student }) => {
  const riskScore = aiService.calculateDropoutRisk(student);
  
  const getRiskLevel = (score: number) => {
    if (score >= 0.7) return { level: 'Υψηλό', color: 'text-red-600' };
    if (score >= 0.4) return { level: 'Μέτριο', color: 'text-yellow-600' };
    return { level: 'Χαμηλό', color: 'text-green-600' };
  };

  const risk = getRiskLevel(riskScore);

  return (
    <Card>
      <div className="flex items-center space-x-3 mb-4">
        <AlertTriangle className={`w-5 h-5 ${risk.color}`} />
        <h3 className="text-lg font-semibold">Κίνδυνος Εγκατάλειψης</h3>
      </div>
      
      <div className="text-center">
        <div className={`text-2xl font-bold ${risk.color}`}>
          {risk.level}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Επίπεδο κινδύνου εγκατάλειψης σπουδών
        </div>
      </div>
    </Card>
  );
};

export default DropoutRiskAlert;