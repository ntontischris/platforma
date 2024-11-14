import { Handler } from '@netlify/functions';
import { Course } from '../../src/types';

const courses: Course[] = [
  {
    id: '1',
    name: 'Μαθηματικά',
    teacher: 'Γ. Παπαδόπουλος',
    students: ['1', '2'],
    schedule: 'Δευτέρα, Τετάρτη 10:00-12:00',
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
          body: JSON.stringify(courses)
        };

      case 'POST':
        const newCourse = JSON.parse(event.body || '{}');
        const course = {
          ...newCourse,
          id: crypto.randomUUID()
        };
        courses.push(course);
        return {
          statusCode: 201,
          body: JSON.stringify(course)
        };

      case 'PUT':
        const { id, ...updateData } = JSON.parse(event.body || '{}');
        const courseIndex = courses.findIndex(c => c.id === id);
        if (courseIndex === -1) {
          return { statusCode: 404, body: 'Course not found' };
        }
        courses[courseIndex] = { ...courses[courseIndex], ...updateData };
        return {
          statusCode: 200,
          body: JSON.stringify(courses[courseIndex])
        };

      case 'DELETE':
        const courseId = event.queryStringParameters?.id;
        const deleteIndex = courses.findIndex(c => c.id === courseId);
        if (deleteIndex === -1) {
          return { statusCode: 404, body: 'Course not found' };
        }
        courses.splice(deleteIndex, 1);
        return {
          statusCode: 204,
          body: ''
        };

      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    console.error('Courses Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};