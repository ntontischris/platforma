import React, { useState } from 'react';
import { Brain, X, Check } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface OptimizerProps {
  onClose: () => void;
}

interface Suggestion {
  id: string;
  type: 'move' | 'swap' | 'room';
  description: string;
  impact: string;
  applied: boolean;
}

const ScheduleOptimizer: React.FC<OptimizerProps> = ({ onClose }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'move',
      description: 'Μετακίνηση Φυσικής Β2 από Δευτέρα 10:00 σε Τετάρτη 11:00 για καλύτερη κατανομή',
      impact: 'Μείωση συγκρούσεων κατά 15%',
      applied: false
    },
    {
      id: '2',
      type: 'room',
      description: 'Μεταφορά Μαθηματικών Γ1 στην αίθουσα 203 για βέλτιστη χρήση χώρου',
      impact: 'Βελτίωση χρήσης χώρου κατά 20%',
      applied: false
    },
    {
      id: '3',
      type: 'swap',
      description: 'Εναλλαγή ωρών μεταξύ Χημείας Α1 και Βιολογίας Β2 για καλύτερη ροή',
      impact: 'Βελτίωση ροής μαθημάτων κατά 25%',
      applied: false
    }
  ]);

  const handleOptimize = () => {
    setIsOptimizing(true);
    // Simulate optimization process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleApplySuggestion = (suggestionId: string) => {
    setSuggestions(suggestions.map(s =>
      s.id === suggestionId ? { ...s, applied: true } : s
    ));
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    setSuggestions(suggestions.filter(s => s.id !== suggestionId));
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="AI Βελτιστοποίηση Προγράμματος"
    >
      <div className="space-y-6">
        <div className="text-center p-6">
          <Brain className="w-16 h-16 text-neon-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-white">
            Έξυπνη Βελτιστοποίηση Προγράμματος
          </h3>
          <p className="text-gray-400">
            Το AI θα αναλύσει το τρέχον πρόγραμμα και θα προτείνει βελτιστοποιήσεις
            βάσει πολλαπλών παραμέτρων.
          </p>
        </div>

        {!isOptimizing ? (
          <div className="space-y-4">
            <h4 className="font-medium text-white">Παράμετροι Βελτιστοποίησης:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-gray-300">
                ✓ Διαθεσιμότητα καθηγητών
              </li>
              <li className="flex items-center text-sm text-gray-300">
                ✓ Χωρητικότητα αιθουσών
              </li>
              <li className="flex items-center text-sm text-gray-300">
                ✓ Προτιμήσεις μαθητών
              </li>
              <li className="flex items-center text-sm text-gray-300">
                ✓ Ισορροπία φόρτου εργασίας
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-neon-primary">
                    {progress}% Ολοκληρώθηκε
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cyber-dark-700">
                <div
                  style={{ width: `${progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-neon-primary transition-all duration-500"
                />
              </div>
            </div>

            {progress === 100 && (
              <div className="space-y-4">
                <h4 className="font-medium text-white">Προτεινόμενες Βελτιστοποιήσεις:</h4>
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium text-white">{suggestion.description}</h5>
                        <p className="text-sm text-neon-primary mt-1">
                          {suggestion.impact}
                        </p>
                      </div>
                      {!suggestion.applied ? (
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectSuggestion(suggestion.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApplySuggestion(suggestion.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-green-500">Εφαρμόστηκε</span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={onClose}>
            Κλείσιμο
          </Button>
          {!isOptimizing && (
            <Button onClick={handleOptimize}>
              <Brain className="w-4 h-4 mr-2" />
              Έναρξη Βελτιστοποίησης
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleOptimizer;