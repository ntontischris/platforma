import React from 'react';
import { Brain, TrendingUp, LineChart } from 'lucide-react';
import Card from '../ui/Card';
import { useAIFeatures } from '../../hooks/useAIFeatures';
import LoadingSpinner from '../LoadingSpinner';

const AIInsights = () => {
  const { loading, analyzeProgress } = useAIFeatures();
  const [insights, setInsights] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchInsights = async () => {
      const result = await analyzeProgress();
      if (result) {
        setInsights(result);
      }
    };
    fetchInsights();
  }, [analyzeProgress]);

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
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-5 h-5 text-neon-primary" />
        <h3 className="text-lg font-semibold text-white">AI Insights</h3>
      </div>

      {insights && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-cyber-dark-700 rounded-lg border border-neon-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-neon-primary" />
                <span className="text-white">Overall Progress</span>
              </div>
              <div className="text-2xl font-bold text-neon-primary">
                {insights.overallProgress}%
              </div>
            </div>
            <div className="p-4 bg-cyber-dark-700 rounded-lg border border-neon-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <LineChart className="w-4 h-4 text-neon-secondary" />
                <span className="text-white">Learning Rate</span>
              </div>
              <div className="text-2xl font-bold text-neon-secondary">
                {insights.learningRate}%
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Subject Progress</h4>
            {insights.bySubject.map((subject: any, index: number) => (
              <div
                key={index}
                className="p-4 bg-cyber-dark-700 rounded-lg border border-neon-primary/20"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white">{subject.subject}</span>
                  <span className="text-neon-primary">{subject.progress}%</span>
                </div>
                <div className="w-full bg-cyber-dark-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-neon-primary to-neon-secondary h-2 rounded-full"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-cyber-dark-700 rounded-lg border border-neon-primary/20">
            <h4 className="text-lg font-medium text-white mb-3">Recommendations</h4>
            <ul className="space-y-2">
              {insights.recommendations.map((rec: string, index: number) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-gray-300"
                >
                  <span className="text-neon-primary">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AIInsights;