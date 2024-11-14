import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const StudyPlanGenerator: React.FC<Props> = ({ student }) => {
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const generatePlan = async () => {
      const result = await aiService.generateStudyPlan(student);
      setPlan(result);
    };
    generatePlan();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Πλάνο Μελέτης</h3>
      </div>

      {plan && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {plan.dailyHours}h
              </div>
              <p className="text-sm text-gray-600">Ημερήσια Μελέτη</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {plan.weeklyGoals}
              </div>
              <p className="text-sm text-gray-600">Εβδομαδιαίοι Στόχοι</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Ημερήσιο Πρόγραμμα</h4>
            <div className="space-y-2">
              {plan.schedule.map((slot: any) => (
                <div
                  key={slot.time}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{slot.subject}</span>
                    <p className="text-sm text-gray-600">{slot.focus}</p>
                  </div>
                  <span className="text-sm text-gray-500">{slot.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Συμβουλές Μελέτης</h4>
            <ul className="space-y-1">
              {plan.tips.map((tip: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StudyPlanGenerator;