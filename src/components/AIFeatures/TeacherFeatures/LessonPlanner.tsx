import React, { useState } from 'react';
import { BookOpen, Brain } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

const LessonPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const result = await aiService.generateLessonPlan(topic);
      setPlan(result);
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
        <h3 className="text-lg font-semibold">AI Σχεδιασμός Μαθήματος</h3>
      </div>

      {!plan ? (
        <div className="space-y-4">
          <Input
            label="Θέμα Μαθήματος"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="π.χ. Πυθαγόρειο Θεώρημα"
          />
          <Button onClick={generatePlan} disabled={loading || !topic}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <BookOpen className="w-4 h-4 mr-2" />
            )}
            Δημιουργία Πλάνου
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Στόχοι Μαθήματος</h4>
              <ul className="space-y-1 text-sm">
                {plan.objectives.map((obj: string, i: number) => (
                  <li key={i}>• {obj}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Υλικό</h4>
              <ul className="space-y-1 text-sm">
                {plan.materials.map((mat: string, i: number) => (
                  <li key={i}>• {mat}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Πορεία Διδασκαλίας</h4>
            {plan.steps.map((step: any, i: number) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">{step.title}</div>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                <div className="text-xs text-gray-500 mt-2">
                  Διάρκεια: {step.duration} λεπτά
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setPlan(null)}>
              Νέο Πλάνο
            </Button>
            <Button>
              <BookOpen className="w-4 h-4 mr-2" />
              Αποθήκευση
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LessonPlanner;