import React, { useState } from 'react';
import { Brain, Target } from 'lucide-react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

const SkillAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [assessment, setAssessment] = useState<any>(null);

  const startAssessment = async () => {
    setLoading(true);
    try {
      const result = await aiService.assessSkills(subject);
      setAssessment(result);
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
        <h3 className="text-lg font-semibold">AI Αξιολόγηση Δεξιοτήτων</h3>
      </div>

      {!assessment ? (
        <div className="space-y-4">
          <Select
            label="Επιλογή Μαθήματος"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: 'math', label: 'Μαθηματικά' },
              { value: 'physics', label: 'Φυσική' },
              { value: 'chemistry', label: 'Χημεία' },
              { value: 'literature', label: 'Λογοτεχνία' }
            ]}
          />
          <Button onClick={startAssessment} disabled={loading || !subject}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Target className="w-4 h-4 mr-2" />
            )}
            Έναρξη Αξιολόγησης
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {assessment.overallScore}%
              </div>
              <p className="text-sm text-gray-600">Συνολική Επίδοση</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {assessment.improvement}%
              </div>
              <p className="text-sm text-gray-600">Βελτίωση</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Ανάλυση Δεξιοτήτων</h4>
            <div className="space-y-2">
              {assessment.skills.map((skill: any) => (
                <div key={skill.name} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium mb-2">Προτάσεις Βελτίωσης</h4>
            <ul className="space-y-1 text-sm">
              {assessment.recommendations.map((rec: string, i: number) => (
                <li key={i}>• {rec}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setAssessment(null)}>
              Νέα Αξιολόγηση
            </Button>
            <Button>
              <Target className="w-4 h-4 mr-2" />
              Αποθήκευση
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SkillAssessment;