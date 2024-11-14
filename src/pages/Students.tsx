import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import StudentList from '../components/StudentList';
import Button from '../components/ui/Button';
import NewStudentModal from '../components/NewStudentModal';
import ExportReport from '../components/ExportReport';
import useStore from '../store/useStore';

const Students = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const students = useStore((state) => state.students);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Μαθητές</h1>
          <p className="text-gray-600 mt-1">
            Διαχείριση {students.length} εγγεγραμμένων μαθητών
          </p>
        </div>
        
        <div className="flex space-x-4">
          <ExportReport />
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Νέος Μαθητής
          </Button>
        </div>
      </div>

      <StudentList />
      
      <NewStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Students;