import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import { aiService } from '../../services/aiService';
import { Student } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

interface BehaviorAnalyticsProps {
  student: Student;
}

const BehaviorAnalytics: React.FC<BehaviorAnalyticsProps> = ({ student }) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const result = await aiService.analyzeStudentBehavior(student);
        setAnalysis(result);
      } catch (error) {
        console.error('Error fetching behavior analysis:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [student]);

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
        <Activity className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Ανάλυση Συμπεριφοράς</h3>
      </div>

      {analysis && (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Επίπεδο Εμπλοκής</h4>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    analysis.engagement > 0.7
                      ? 'bg-green-500'
                      : analysis.engagement > 0.4
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${analysis.engagement * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">
                {(analysis.engagement * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Μοτίβα Συμπεριφοράς</h4>
            <div className="space-y-2">
              {analysis.patterns.map((pattern: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <span className="text-sm">{pattern.description}</span>
                  {pattern.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Προτάσεις Βελτίωσης</h4>
            <div className="space-y-2">
              {analysis.recommendations.map((rec: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-sm text-gray-600"
                >
                  <span className="text-blue-600">•</span>
                  <span>{rec}</span>
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