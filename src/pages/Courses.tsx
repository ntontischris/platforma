import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import NewCourseModal from '../components/NewCourseModal';
import useStore from '../store/useStore';

const columns = [
  { header: 'Μάθημα', accessor: 'name' as const },
  { header: 'Καθηγητής', accessor: 'teacher' as const },
  {
    header: 'Μαθητές',
    accessor: 'students' as const,
    cell: (value: string[]) => value.length,
  },
  { header: 'Πρόγραμμα', accessor: 'schedule' as const },
];

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const courses = useStore((state) => state.courses);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Μαθήματα</h1>
          <p className="text-gray-600 mt-1">
            Διαχείριση μαθημάτων και τμημάτων
          </p>
        </div>
        
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Νέο Μάθημα
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ενεργά Μαθήματα</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Table data={courses} columns={columns} />
      </Card>

      <NewCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Courses;