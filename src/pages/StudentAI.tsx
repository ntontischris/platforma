import React from 'react';
import { useParams } from 'react-router-dom';
import AIExpertsPanel from '../components/AIExperts/AIExpertsPanel';
import useStore from '../store/useStore';

const StudentAI = () => {
  const { id } = useParams<{ id: string }>();
  const student = useStore((state) => 
    state.students.find((s) => s.id === id)
  );

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Ο μαθητής δεν βρέθηκε.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          AI Ανάλυση - {student.name}
        </h1>
        <p className="text-gray-600 mt-1">
          Εξατομικευμένη ανάλυση και προτάσεις από 10 AI εκπαιδευτικούς συμβούλους
        </p>
      </div>

      <AIExpertsPanel student={student} />
    </div>
  );
};

export default StudentAI;