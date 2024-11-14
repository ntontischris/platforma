import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const ContentRecommender: React.FC<Props> = ({ student }) => {
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    const getRecommendations = async () => {
      const result = await aiService.getContentRecommendations(student);
      setRecommendations(result);
    };
    getRecommendations();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Προτεινόμενο Υλικό</h3>
      </div>

      {recommendations && (
        <div className="space-y-4">
          {recommendations.categories.map((category: any) => (
            <div key={category.name}>
              <h4 className="text-sm font-medium mb-2">{category.name}</h4>
              <div className="space-y-2">
                {category.resources.map((resource: any, index: number) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-medium">{resource.title}</h5>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">
                        Διάρκεια: {resource.duration}
                      </span>
                      <span className="text-gray-500">
                        Δυσκολία: {resource.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ContentRecommender;