import React, { useState } from 'react';
import { Calendar, BookOpen, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { assignmentService } from '../../services/assignmentService';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  studentId: string;
  subject: string;
}

const StudyPlanGenerator: React.FC<Props> = ({ studentId, subject }) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const studyPlan = await assignmentService.generateStudyPlan(studentId, subject);
      setPlan(studyPlan);
    } catch (error) {
      console.error('Error generating study plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">AI Πλάνο Μελέτης</h3>
        </div>
        {!plan && (
          <Button onClick={generatePlan} disabled={loading}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <BookOpen className="w-4 h-4 mr-2" />
            )}
            Δημιουργία Πλάνου
          </Button>
        )}
      </div>

      {plan && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plan.dailyTasks.map((task: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-blue-50 rounded-lg"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">{task.time}</span>
                </div>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-medium mb-3">Προτεινόμενο Υλικό</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plan.resources.map((resource: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <h5 className="font-medium">{resource.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    {resource.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-blue-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{resource.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium mb-3">Χρονοδιάγραμμα</h4>
            <div className="space-y-2">
              {Object.entries(plan.schedule).map(([day, tasks]: [string, any]) => (
                <div key={day} className="flex items-start space-x-3">
                  <div className="font-medium w-24">{day}:</div>
                  <div className="flex-1">
                    {Array.isArray(tasks) && tasks.map((task: string, index: number) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {task}
                      </div>
                    ))}
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

export default StudyPlanGenerator;