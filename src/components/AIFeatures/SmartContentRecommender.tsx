import React, { useState, useEffect } from 'react';
import { BookOpen, Brain } from 'lucide-react';
import Card from '../ui/Card';
import { aiService } from '../../services/aiService';
import { Student } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

interface SmartContentRecommenderProps {
  student: Student;
}

const SmartContentRecommender: React.FC<SmartContentRecommenderProps> = ({ student }) => {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const path = await aiService.generatePersonalizedPath(student);
        setRecommendations(path);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
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
        <Brain className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">AI Προτάσεις Μάθησης</h3>
      </div>

      {recommendations && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Προτεινόμενα Θέματα</h4>
            <div className="grid grid-cols-2 gap-2">
              {recommendations.recommendedTopics.map((topic: string, index: number) => (
                <div
                  key={index}
                  className="p-2 bg-blue-50 text-blue-700 rounded-lg text-sm"
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Στυλ Μάθησης</h4>
            <p className="text-gray-600">
              {recommendations.learningStyle === 'visual'
                ? 'Οπτική μάθηση'
                : recommendations.learningStyle === 'auditory'
                ? 'Ακουστική μάθηση'
                : 'Πρακτική μάθηση'}
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Προτεινόμενος Ρυθμός</h4>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: recommendations.pacing === 'slow'
                      ? '33%'
                      : recommendations.pacing === 'moderate'
                      ? '66%'
                      : '100%'
                  }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {recommendations.pacing === 'slow'
                  ? 'Αργός'
                  : recommendations.pacing === 'moderate'
                  ? 'Μέτριος'
                  : 'Γρήγορος'}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Προτεινόμενο Υλικό</h4>
            <div className="space-y-2">
              {recommendations.resources.map((resource: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>{resource.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default SmartContentRecommender;