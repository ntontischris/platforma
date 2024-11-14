import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import Card from '../../ui/Card';
import { Student } from '../../../types';
import { aiService } from '../../../services/aiService';

interface Props {
  student: Student;
}

const CareerPathAdvisor: React.FC<Props> = ({ student }) => {
  const [advice, setAdvice] = useState<any>(null);

  useEffect(() => {
    const getCareerAdvice = async () => {
      const result = await aiService.getCareerAdvice(student);
      setAdvice(result);
    };
    getCareerAdvice();
  }, [student]);

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <Compass className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Σύμβουλος Καριέρας</h3>
      </div>

      {advice && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Προτεινόμενα Επαγγέλματα</h4>
            <div className="space-y-2">
              {advice.careers.map((career: any) => (
                <div
                  key={career.title}
                  className="p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{career.title}</h5>
                      <p className="text-sm text-gray-600">{career.description}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {career.match}% ταίριασμα
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {career.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-white px-2 py-1 rounded-full border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Προτεινόμενες Σπουδές</h4>
            <div className="space-y-2">
              {advice.education.map((edu: any, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-purple-50 rounded-lg"
                >
                  <h5 className="font-medium">{edu.field}</h5>
                  <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                  <div className="mt-2 text-xs text-purple-600">
                    Προοπτικές: {edu.prospects}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Επόμενα Βήματα</h4>
            <ul className="space-y-1">
              {advice.nextSteps.map((step: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CareerPathAdvisor;