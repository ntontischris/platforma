import React from 'react';
import { Activity } from '../types';
import Card from './ui/Card';

const activities: Activity[] = [
  {
    id: '1',
    title: 'Νέα εγγραφή μαθητή',
    description: 'Ο Γιώργος Παπαδόπουλος εγγράφηκε στο τμήμα Β2',
    type: 'success',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Ενημέρωση βαθμολογίας',
    description: 'Καταχωρήθηκαν οι βαθμοί για το μάθημα των Μαθηματικών',
    type: 'info',
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    title: 'Απουσία μαθητή',
    description: 'Ο Νίκος Δημητρίου απουσίαζε από το μάθημα της Φυσικής',
    type: 'warning',
    createdAt: new Date(Date.now() - 7200000),
  },
];

const ActivityFeed = () => {
  return (
    <Card title="Πρόσφατη Δραστηριότητα">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 py-3 border-b last:border-0">
            <div
              className={`w-2 h-2 mt-2 rounded-full ${
                activity.type === 'success'
                  ? 'bg-green-500'
                  : activity.type === 'info'
                  ? 'bg-blue-500'
                  : 'bg-yellow-500'
              }`}
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{activity.title}</p>
                <span className="text-sm text-gray-500">
                  {activity.createdAt.toLocaleTimeString('el-GR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityFeed;