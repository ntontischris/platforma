import React, { useState } from 'react';
import { Brain, Lightbulb } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

const ConceptExplainer = () => {
  const [loading, setLoading] = useState(false);
  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState<any>(null);

  const explainConcept = async () => {
    setLoading(true);
    try {
      const result = await aiService.explainConcept(concept);
      setExplanation(result);
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
        <h3 className="text-lg font-semibold">AI Επεξήγηση Εννοιών</h3>
      </div>

      {!explanation ? (
        <div className="space-y-4">
          <Input
            label="Έννοια προς Επεξήγηση"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="π.χ. Φωτοσύνθεση"
          />
          <Button onClick={explainConcept} disabled={loading || !concept}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Lightbulb className="w-4 h-4 mr-2" />
            )}
            Επεξήγηση
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Απλή Επεξήγηση</h4>
            <p className="text-sm">{explanation.simple}</p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium mb-2">Αναλυτική Επεξήγηση</h4>
            <p className="text-sm">{explanation.detailed}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Παραδείγματα</h4>
              <ul className="space-y-1 text-sm">
                {explanation.examples.map((ex: string, i: number) => (
                  <li key={i}>• {ex}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium mb-2">Σχετικές Έννοιες</h4>
              <ul className="space-y-1 text-sm">
                {explanation.related.map((rel: string, i: number) => (
                  <li key={i}>• {rel}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setExplanation(null)}>
              Νέα Έννοια
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ConceptExplainer;