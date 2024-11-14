import React, { useEffect, useState } from 'react';
import { User, Clock, Calendar } from 'lucide-react';
import Card from '../ui/Card';
import { Teacher, teacherService } from '../../services/teacherService';
import Button from '../ui/Button';

const TeacherAvailability = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSchedule, setShowSchedule] = useState<string | null>(null);

  useEffect(() => {
    setTeachers(teacherService.getTeachers());

    const unsubscribe = teacherService.subscribe((updatedTeachers) => {
      setTeachers(updatedTeachers);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: Teacher['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'teaching':
        return 'bg-blue-500';
      case 'break':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  const getStatusText = (status: Teacher['status']) => {
    switch (status) {
      case 'available':
        return 'Διαθέσιμος';
      case 'teaching':
        return 'Διδάσκει';
      case 'break':
        return 'Διάλειμμα';
      default:
        return 'Μη διαθέσιμος';
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setTeachers(teacherService.getTeachers());
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <User className="w-5 h-5 mr-2 text-neon-primary" />
          <h3 className="font-semibold text-white">Διαθεσιμότητα Καθηγητών</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          <Clock className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-3">
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <div
              className="flex items-center justify-between p-3 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20 hover:border-neon-primary transition-colors cursor-pointer"
              onClick={() => setShowSchedule(showSchedule === teacher.id ? null : teacher.id)}
            >
              <div>
                <p className="font-medium text-white">{teacher.name}</p>
                <p className="text-sm text-gray-400">{teacher.subject}</p>
                {teacher.currentClass && (
                  <p className="text-xs text-neon-primary mt-1">
                    Τρέχον μάθημα: {teacher.currentClass}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full ${getStatusColor(teacher.status)} mr-2`} />
                <span className="text-sm text-gray-300">
                  {getStatusText(teacher.status)}
                </span>
              </div>
            </div>

            {showSchedule === teacher.id && (
              <div className="mt-2 p-3 bg-cyber-dark-800/50 rounded-lg border border-neon-primary/10">
                <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-neon-primary" />
                  Πρόγραμμα
                </h4>
                <div className="space-y-2">
                  {teacher.schedule.map((day, index) => (
                    <div key={index} className="text-sm">
                      <p className="text-neon-secondary">{day.day}</p>
                      <div className="ml-4 space-y-1 mt-1">
                        {day.timeSlots.map((slot, slotIndex) => (
                          <p key={slotIndex} className="text-gray-400">
                            {slot.start}-{slot.end}: {slot.class}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeacherAvailability;