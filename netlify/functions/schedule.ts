import { Handler } from '@netlify/functions';
import { ScheduleEvent, Room, TimeSlot } from '../../src/types';

const scheduleEvents: ScheduleEvent[] = [];
const rooms: Room[] = [
  {
    id: '1',
    name: 'Αίθουσα 101',
    capacity: 25,
    equipment: ['projector', 'whiteboard'],
    available: true
  }
];

export const handler: Handler = async (event) => {
  if (!event.httpMethod) {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    switch (event.httpMethod) {
      case 'GET':
        const type = event.queryStringParameters?.type;
        if (type === 'rooms') {
          return {
            statusCode: 200,
            body: JSON.stringify(rooms)
          };
        }
        return {
          statusCode: 200,
          body: JSON.stringify(scheduleEvents)
        };

      case 'POST':
        const newEvent = JSON.parse(event.body || '{}');
        const scheduleEvent = {
          ...newEvent,
          id: crypto.randomUUID(),
          start: new Date(newEvent.start),
          end: new Date(newEvent.end)
        };
        scheduleEvents.push(scheduleEvent);
        return {
          statusCode: 201,
          body: JSON.stringify(scheduleEvent)
        };

      case 'PUT':
        const { id, ...updateData } = JSON.parse(event.body || '{}');
        const eventIndex = scheduleEvents.findIndex(e => e.id === id);
        if (eventIndex === -1) {
          return { statusCode: 404, body: 'Event not found' };
        }
        scheduleEvents[eventIndex] = { 
          ...scheduleEvents[eventIndex], 
          ...updateData,
          start: new Date(updateData.start),
          end: new Date(updateData.end)
        };
        return {
          statusCode: 200,
          body: JSON.stringify(scheduleEvents[eventIndex])
        };

      case 'DELETE':
        const eventId = event.queryStringParameters?.id;
        const deleteIndex = scheduleEvents.findIndex(e => e.id === eventId);
        if (deleteIndex === -1) {
          return { statusCode: 404, body: 'Event not found' };
        }
        scheduleEvents.splice(deleteIndex, 1);
        return {
          statusCode: 204,
          body: ''
        };

      default:
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    console.error('Schedule Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};