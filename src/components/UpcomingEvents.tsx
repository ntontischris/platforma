import React from 'react';
import { Calendar, Users, BookOpen } from 'lucide-react';
import Card from './ui/Card';
import { Event } from '../types';

const events: Event[] = [
  {
    id: '1',
    title: 'Διαγώνισμα Μαθηματικών',
    date: new Date('2024-03-15'),
    class: 'Β2',
    type: 'exam',
  },
  {
    id: '2',
    title: 'Συνάντηση Γονέων',
    date: new Date('2024-03-18'),
    class: 'Όλες',
    type: 'meeting',
  },
  {
    id: '3',
    title: 'Εκπαιδευτική Εκδρομή',
    date: new Date('2024-03-22'),
    class: 'Γ1',
    type: 'activity',
  },
];

const getEventIcon = (type: Event['type']) => {
  switch (type) {
    case 'exam':
      return BookOpen;
    case 'meeting':
      return Users;
    case 'activity':
      return Calendar;
    default:
      return Calendar;
  }
};

const UpcomingEvents = () => {
  return (
    <Card title="Επερχόμενες Δραστηριότητες">
      <div className="space-y-4">
        {events.map((event) => {
          const Icon = getEventIcon(event.type);
          return (
            <div key={event.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-500">
                  {event.date.toLocaleDateString('el-GR', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
                <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  Τμήμα: {event.class}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default UpcomingEvents;