import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const EmotionalIntelligenceCoach: React.FC<Props> = ({ student }) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const analyzeEQ = async () => {
      const result = await aiService.analyzeEmotionalIntelligence(student);
      setAnalysis(result);
    };
    analyzeEQ();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Heart className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Συναισθηματική Νοημοσύνη</h3>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {analysis.dimensions.map((dimension: any) => (
              <div
                key={dimension.name}
                className="p-3 bg-blue-50 rounded-lg text-center"
              >
                <div className="text-2xl font-bold text-blue-600">
                  {dimension.score}%
                </div>
                <p className="text-sm text-gray-600">{dimension.name}</p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Δυνατά Σημεία</h4>
            <div className="space-y-1">
              {analysis.strengths.map((strength: string, index: number) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 flex items-center space-x-2"
                >
                  <span className="text-green-500">✓</span>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Σημεία για Βελτίωση</h4>
            <div className="space-y-1">
              {analysis.improvements.map((improvement: string, index: number) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 flex items-center space-x-2"
                >
                  <span className="text-blue-500">→</span>
                  <span>{improvement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Συμβουλές</h4>
            <ul className="space-y-1">
              {analysis.tips.map((tip: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EmotionalIntelligenceCoach;