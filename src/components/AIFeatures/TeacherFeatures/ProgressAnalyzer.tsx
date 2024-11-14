import React, { useState } from 'react';
import { LineChart, Brain } from 'lucide-react';
import Card from '../../ui/Card';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

interface Props {
  classId: string;
}

const ProgressAnalyzer: React.FC<Props> = ({ classId }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  React.useEffect(() => {
    analyzeProgress();
  }, [classId]);

  const analyzeProgress = async () => {
    setLoading(true);
    try {
      const result = await aiService.analyzeClassProgress(classId);
      setAnalysis(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="flex justify-center items-center h-48">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">AI Ανάλυση Προόδου Τάξης</h3>
      </div>

      {analysis && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analysis.averageGrade.toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">Μέσος Όρος</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {analysis.improvement}%
              </div>
              <p className="text-sm text-gray-600">Βελτίωση</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {analysis.participationRate}%
              </div>
              <p className="text-sm text-gray-600">Συμμετοχή</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Τομείς που Χρειάζονται Προσοχή</h4>
            <div className="space-y-2">
              {analysis.concerns.map((concern: any, i: number) => (
                <div key={i} className="p-3 bg-red-50 rounded-lg">
                  <div className="font-medium text-red-700">{concern.area}</div>
                  <p className="text-sm text-red-600 mt-1">
                    {concern.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Προτάσεις Βελτίωσης</h4>
            <div className="space-y-2">
              {analysis.recommendations.map((rec: any, i: number) => (
                <div key={i} className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium">{rec.title}</div>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProgressAnalyzer;