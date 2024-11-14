import { Handler } from '@netlify/functions';
import { Student } from '../../src/types';

const students: Student[] = [
  {
    id: '1',
    name: 'Γιώργος Παπαδόπουλος',
    class: 'Β2',
    email: 'george@example.com',
    phone: '6912345678',
    attendance: 95,
    averageGrade: 8.5,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Μαρία Κωνσταντίνου',
    class: 'Γ1',
    email: 'maria@example.com',
    phone: '6923456789',
    attendance: 92,
    averageGrade: 9.2,
    createdAt: new Date('2024-01-10'),
  },
];

export const handler: Handler = async (event) => {
  if (!event.httpMethod) {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          body: JSON.stringify(students)
        };

      case 'POST':
        const newStudent = JSON.parse(event.body || '{}');
        const student = {
          ...newStudent,
          id: crypto.randomUUID(),
          createdAt: new Date()
        };
        students.push(student);
        return {
          statusCode: 201,
          body: JSON.stringify(student)
        };

      case 'PUT':
        const { id, ...updateData } = JSON.parse(event.body || '{}');
        const studentIndex = students.findIndex(s => s.id === id);
        if (studentIndex === -1) {
          return { statusCode: 404, body: 'Student not found' };
        }
        students[studentIndex] = { ...students[studentIndex], ...updateData };
        return {
          statusCode: 200,
          body: JSON.stringify(students[studentIndex])
        };

      case 'DELETE':
        const studentId = event.queryStringParameters?.id;
        const deleteIndex = students.findIndex(s => s.id === studentId);
        if (deleteIndex === -1) {
          return { statusCode: 404, body: 'Student not found' };
        }
        students.splice(deleteIndex, 1);
        return {
          statusCode: 204,
          body: ''
        };

      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    console.error('Students Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};