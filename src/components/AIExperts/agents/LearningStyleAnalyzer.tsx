import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const LearningStyleAnalyzer: React.FC<Props> = ({ student }) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const analyzeLearningStyle = async () => {
      const result = await aiService.analyzeLearningStyle(student);
      setAnalysis(result);
    };
    analyzeLearningStyle();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Ανάλυση Μαθησιακού Στυλ</h3>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Κύριος Τύπος Μάθησης</span>
            <span className="text-blue-600 font-semibold">{analysis.primaryStyle}</span>
          </div>

          <div className="space-y-2">
            {analysis.styles.map((style: any) => (
              <div key={style.type} className="flex items-center">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{style.type}</span>
                    <span className="text-sm text-gray-500">{style.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${style.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Προτάσεις Βελτίωσης</h4>
            <ul className="space-y-1">
              {analysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LearningStyleAnalyzer;