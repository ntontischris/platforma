import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Input from './ui/Input';
import Select from './ui/Select';
import { Student } from '../types';
import useStore from '../store/useStore';

interface StudentFiltersProps {
  onFilter: (students: Student[]) => void;
}

const StudentFilters: React.FC<StudentFiltersProps> = ({ onFilter }) => {
  const students = useStore((state) => state.students);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesClass = !selectedClass || student.class === selectedClass;
      return matchesSearch && matchesClass;
    });
    onFilter(filtered);
  }, [search, selectedClass, students, onFilter]);

  const classes = Array.from(new Set(students.map((s) => s.class))).map(
    (value) => ({ value, label: value })
  );

  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Αναζήτηση μαθητή..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Select
        className="w-48"
        options={classes}
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        placeholder="Όλα τα τμήματα"
      />
    </div>
  );
};

export default StudentFilters;