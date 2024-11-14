import React, { useState } from 'react';
import { Activity, Brain } from 'lucide-react';
import Card from '../../ui/Card';
import { aiService } from '../../../services/aiService';
import LoadingSpinner from '../../LoadingSpinner';

interface Props {
  classId: string;
}

const BehaviorAnalytics: React.FC<Props> = ({ classId }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  React.useEffect(() => {
    analyzeBehavior();
  }, [classId]);

  const analyzeBehavior = async () => {
    setLoading(true);
    try {
      const result = await aiService.analyzeClassBehavior(classId);
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
        <h3 className="text-lg font-semibold">AI Ανάλυση Συμπεριφοράς Τάξης</h3>
      </div>

      {analysis && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {analysis.engagementScore}%
              </div>
              <p className="text-sm text-gray-600">Συμμετοχή</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {analysis.collaborationScore}%
              </div>
              <p className="text-sm text-gray-600">Συνεργασία</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Δυναμική Τάξης</h4>
            <div className="space-y-2">
              {analysis.dynamics.map((dynamic: any, i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">{dynamic.aspect}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {dynamic.observation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Προτάσεις Βελτίωσης</h4>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion: any, i: number) => (
                <div key={i} className="p-3 bg-yellow-50 rounded-lg">
                  <div className="font-medium">{suggestion.title}</div>
                  <p className="text-sm text-gray-600 mt-1">
                    {suggestion.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BehaviorAnalytics;