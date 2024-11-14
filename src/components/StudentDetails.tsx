import React from 'react';
import Card from './ui/Card';
import { Student } from '../types';
import { Mail, Phone, Calendar, BookOpen } from 'lucide-react';

interface StudentDetailsProps {
  student: Student;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
  return (
    <Card>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {student.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
          <p className="text-sm text-gray-500">Τμήμα {student.class}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{student.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{student.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                Εγγραφή: {student.createdAt.toLocaleDateString('el-GR')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <span className="text-sm">
                Μ.Ο. Βαθμών: {student.averageGrade.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentDetails;