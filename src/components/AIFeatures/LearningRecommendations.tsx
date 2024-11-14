import React from 'react';
import { aiService } from '../../services/aiService';
import { Student } from '../../types';
import Card from '../ui/Card';
import { BookOpen } from 'lucide-react';

interface LearningRecommendationsProps {
  student: Student;
}

const LearningRecommendations: React.FC<LearningRecommendationsProps> = ({ student }) => {
  const recommendations = aiService.generateLearningRecommendations(student);

  return (
    <Card>
      <div className="flex items-center space-x-3 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Προτάσεις Μάθησης</h3>
      </div>
      
      <ul className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="inline-block w-2 h-2 mt-2 rounded-full bg-blue-600" />
            <span className="text-gray-700">{recommendation}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default LearningRecommendations;