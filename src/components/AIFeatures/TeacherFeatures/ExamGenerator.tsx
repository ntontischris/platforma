import React, { useState } from 'react';
import { FileText, Brain } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import Input from '../../ui/Input';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

const ExamGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [exam, setExam] = useState<any>(null);

  const generateExam = async () => {
    setLoading(true);
    try {
      const result = await aiService.generateExam(subject, difficulty);
      setExam(result);
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
        <h3 className="text-lg font-semibold">AI Δημιουργία Διαγωνίσματος</h3>
      </div>

      {!exam ? (
        <div className="space-y-4">
          <Input
            label="Μάθημα"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="π.χ. Μαθηματικά Β' Γυμνασίου"
          />
          <Select
            label="Δυσκολία"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={[
              { value: 'easy', label: 'Εύκολο' },
              { value: 'medium', label: 'Μέτριο' },
              { value: 'hard', label: 'Δύσκολο' }
            ]}
          />
          <Button onClick={generateExam} disabled={loading || !subject}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            Δημιουργία Διαγωνίσματος
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Θέματα</h4>
            {exam.questions.map((q: any, i: number) => (
              <div key={i} className="mb-4">
                <div className="font-medium">Θέμα {i + 1}</div>
                <p className="text-sm mt-1">{q.text}</p>
                {q.options && (
                  <div className="mt-2 space-y-1">
                    {q.options.map((opt: string, j: number) => (
                      <div key={j} className="text-sm">
                        {String.fromCharCode(65 + j)}. {opt}
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  Μονάδες: {q.points}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setExam(null)}>
              Νέο Διαγώνισμα
            </Button>
            <Button>
              <FileText className="w-4 h-4 mr-2" />
              Εξαγωγή PDF
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExamGenerator;