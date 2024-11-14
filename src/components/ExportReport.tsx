import React from 'react';
import { FileDown } from 'lucide-react';
import Button from './ui/Button';
import useStore from '../store/useStore';

const ExportReport = () => {
  const students = useStore((state) => state.students);

  const handleExport = () => {
    const data = students.map(student => ({
      'Όνομα': student.name,
      'Τμήμα': student.class,
      'Email': student.email,
      'Τηλέφωνο': student.phone,
      'Παρουσίες': `${student.attendance}%`,
      'Μ.Ο.': student.averageGrade.toFixed(1),
      'Ημ/νία Εγγραφής': new Date(student.createdAt).toLocaleDateString('el-GR')
    }));

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'students-report.csv';
    link.click();
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      <FileDown className="w-4 h-4 mr-2" />
      Εξαγωγή
    </Button>
  );
};

export default ExportReport;