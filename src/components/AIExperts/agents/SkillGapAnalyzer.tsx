import React, { useState, useEffect } from 'react';
import { GitBranch } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const SkillGapAnalyzer: React.FC<Props> = ({ student }) => {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const analyzeSkillGaps = async () => {
      const result = await aiService.analyzeSkillGaps(student);
      setAnalysis(result);
    };
    analyzeSkillGaps();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <GitBranch className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Ανάλυση Κενών Δεξιοτήτων</h3>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Κύρια Κενά</h4>
            <div className="space-y-2">
              {analysis.gaps.map((gap: any) => (
                <div key={gap.skill} className="p-3 bg-red-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{gap.skill}</span>
                    <span className="text-sm text-red-600">
                      Κενό: {gap.gapSize}%
                    </span>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-2">
                    <div
                      className="bg-red-600 rounded-full h-2"
                      style={{ width: `${100 - gap.gapSize}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Δυνατά Σημεία</h4>
            <div className="space-y-2">
              {analysis.strengths.map((strength: any) => (
                <div key={strength.skill} className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{strength.skill}</span>
                    <span className="text-sm text-green-600">
                      {strength.level}%
                    </span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-600 rounded-full h-2"
                      style={{ width: `${strength.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Πλάνο Δράσης</h4>
            <ul className="space-y-1">
              {analysis.actionPlan.map((action: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {action}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SkillGapAnalyzer;