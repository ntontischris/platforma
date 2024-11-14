import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from './ui/Table';
import { Student } from '../types';
import StudentFilters from './StudentFilters';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import { User, Brain } from 'lucide-react';
import useStore from '../store/useStore';
import Button from './ui/Button';

const columns = [
  { header: 'Όνομα', accessor: 'name' as const },
  { header: 'Τμήμα', accessor: 'class' as const },
  {
    header: 'Μ.Ο.',
    accessor: 'averageGrade' as const,
    cell: (value: number) => (
      <span className={value >= 8.5 ? 'text-green-600' : 'text-blue-600'}>
        {value.toFixed(1)}
      </span>
    ),
  },
  {
    header: 'Παρουσίες',
    accessor: 'attendance' as const,
    cell: (value: number) => `${value}%`,
  },
  {
    header: 'Ενέργειες',
    accessor: 'id' as const,
    cell: (id: string) => (
      <Link to={`/students/${id}/ai`}>
        <Button variant="outline" size="sm">
          <Brain className="w-4 h-4 mr-2" />
          AI Ανάλυση
        </Button>
      </Link>
    ),
  },
];

const StudentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const students = useStore((state) => state.students);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);

  React.useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  if (students.length === 0) {
    return (
      <EmptyState
        icon={User}
        title="Δεν βρέθηκαν μαθητές"
        description="Δεν υπάρχουν εγγεγραμμένοι μαθητές. Προσθέστε νέους μαθητές για να ξεκινήσετε."
      />
    );
  }

  return (
    <div className="space-y-4">
      <StudentFilters onFilter={setFilteredStudents} />
      <Table
        data={filteredStudents}
        columns={columns}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredStudents.length / 10)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentList;