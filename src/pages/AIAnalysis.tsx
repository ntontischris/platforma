import React from 'react';
import { Brain, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';

const AIAnalysis = () => {
  const students = useStore((state) => state.students);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Ανάλυση</h1>
        <p className="text-gray-600 mt-1">
          Εξατομικευμένη ανάλυση και προτάσεις από AI εκπαιδευτικούς συμβούλους
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Link 
            key={student.id} 
            to={`/students/${student.id}/ai`}
            className="block hover:transform hover:scale-105 transition-transform"
          >
            <Card className="h-full">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-sm text-gray-500">Τμήμα {student.class}</p>
                  <div className="mt-4 flex items-center text-sm text-blue-600">
                    <Brain className="w-4 h-4 mr-2" />
                    Προβολή AI Ανάλυσης
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AIAnalysis;