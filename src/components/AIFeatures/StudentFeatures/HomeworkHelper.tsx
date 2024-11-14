import React, { useState } from 'react';
import { Brain, HelpCircle } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

const HomeworkHelper = () => {
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState<any>(null);

  const getSolution = async () => {
    setLoading(true);
    try {
      const result = await aiService.solveHomeworkProblem(problem);
      setSolution(result);
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
        <h3 className="text-lg font-semibold">AI Βοηθός Εργασιών</h3>
      </div>

      {!solution ? (
        <div className="space-y-4">
          <Input
            label="Περιγραφή Προβλήματος"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="π.χ. Πώς λύνω αυτή την εξίσωση..."
            isTextArea
          />
          <Button onClick={getSolution} disabled={loading || !problem}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <HelpCircle className="w-4 h-4 mr-2" />
            )}
            Βοήθεια
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Βήματα Επίλυσης</h4>
            <div className="space-y-2">
              {solution.steps.map((step: any, i: number) => (
                <div key={i} className="flex space-x-2">
                  <span className="font-medium">{i + 1}.</span>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium mb-2">Επεξήγηση</h4>
            <p className="text-sm">{solution.explanation}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setSolution(null)}>
              Νέα Ερώτηση
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default HomeworkHelper;