import React from 'react';
import Table from './ui/Table';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PerformanceData {
  subject: string;
  students: number;
  avgGrade: number;
  attendance: string;
  trend: 'up' | 'down' | 'stable';
}

const data: PerformanceData[] = [
  { subject: 'Μαθηματικά', students: 45, avgGrade: 8.2, attendance: '92%', trend: 'up' },
  { subject: 'Φυσική', students: 38, avgGrade: 7.9, attendance: '88%', trend: 'stable' },
  { subject: 'Χημεία', students: 42, avgGrade: 8.5, attendance: '95%', trend: 'up' },
  { subject: 'Πληροφορική', students: 35, avgGrade: 8.8, attendance: '91%', trend: 'down' },
];

const columns = [
  { header: 'Μάθημα', accessor: 'subject' as const },
  { header: 'Μαθητές', accessor: 'students' as const },
  {
    header: 'Μ.Ο. Βαθμών',
    accessor: 'avgGrade' as const,
    cell: (value: number) => (
      <span className={value >= 8.5 ? 'text-green-600' : 'text-blue-600'}>
        {value.toFixed(1)}
      </span>
    ),
  },
  { header: 'Παρουσίες', accessor: 'attendance' as const },
  {
    header: 'Τάση',
    accessor: 'trend' as const,
    cell: (value: string) => (
      <div className="flex items-center">
        {value === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
        {value === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
        {value === 'stable' && <span className="text-gray-400">━</span>}
      </div>
    ),
  },
];

const PerformanceTable = () => {
  return <Table data={data} columns={columns} />;
};

export default PerformanceTable;