import React, { useState } from 'react';
import { Brain, Calendar } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

const StudyScheduler = () => {
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    studyHours: '2',
    preferredTime: 'afternoon',
    subjects: ['math', 'physics']
  });
  const [schedule, setSchedule] = useState<any>(null);

  const generateSchedule = async () => {
    setLoading(true);
    try {
      const result = await aiService.generateStudySchedule(preferences);
      setSchedule(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">AI Πρόγραμμα Μελέτης</h3>
      </div>

      {!schedule ? (
        <div className="space-y-4">
          <Select
            label="Ώρες Μελέτης/Ημέρα"
            value={preferences.studyHours}
            onChange={(e) => setPreferences({ ...preferences, studyHours: e.target.value })}
            options={[
              { value: '1', label: '1 ώρα' },
              { value: '2', label: '2 ώρες' },
              { value: '3', label: '3 ώρες' },
              { value: '4', label: '4 ώρες' }
            ]}
          />
          <Select
            label="Προτιμώμενη Ώρα"
            value={preferences.preferredTime}
            onChange={(e) => setPreferences({ ...preferences, preferredTime: e.target.value })}
            options={[
              { value: 'morning', label: 'Πρωί' },
              { value: 'afternoon', label: 'Απόγευμα' },
              { value: 'evening', label: 'Βράδυ' }
            ]}
          />
          <Button onClick={generateSchedule} disabled={loading}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Calendar className="w-4 h-4 mr-2" />
            )}
            Δημιουργία Προγράμματος
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {schedule.weeklySchedule.map((day: any, i: number) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm mb-2">{day.name}</div>
                {day.tasks.map((task: any, j: number) => (
                  <div key={j} className="text-xs p-1 mb-1 bg-blue-100 rounded">
                    {task.subject}: {task.duration}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium mb-2">Συμβουλές Μελέτης</h4>
            <ul className="space-y-1 text-sm">
              {schedule.tips.map((tip: string, i: number) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setSchedule(null)}>
              Νέο Πρόγραμμα
            </Button>
            <Button>
              <Calendar className="w-4 h-4 mr-2" />
              Αποθήκευση
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StudyScheduler;