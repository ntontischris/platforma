import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Settings as SettingsIcon, Plus, Save, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';
import { ScheduleEvent, Room, TimeSlot, ScheduleSettings } from '../../types';
import { roomService } from '../../services/roomService';
import { teacherService, Teacher } from '../../services/teacherService';
import LoadingSpinner from '../LoadingSpinner';

const defaultSettings: ScheduleSettings = {
  workDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  dailyStartTime: '08:00',
  dailyEndTime: '16:00',
  classDuration: 45,
  breakDuration: 15
};

const ScheduleBuilder = () => {
  const [settings, setSettings] = useState<ScheduleSettings>(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [conflicts, setConflicts] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    day: '',
    startTime: '',
    endTime: '',
    room: '',
    teacher: '',
    type: 'class' as const,
    class: ''
  });

  useEffect(() => {
    // Load rooms and teachers
    setRooms(roomService.getRooms());
    setTeachers(teacherService.getTeachers());

    // Subscribe to updates
    const unsubscribeRooms = roomService.subscribe(setRooms);
    const unsubscribeTeachers = teacherService.subscribe(setTeachers);

    return () => {
      unsubscribeRooms();
      unsubscribeTeachers();
    };
  }, []);

  const validateSchedule = () => {
    const newConflicts: string[] = [];

    // Check room conflicts
    events.forEach((event1) => {
      events.forEach((event2) => {
        if (event1.id !== event2.id &&
            event1.day === event2.day &&
            event1.roomId === event2.roomId) {
          // Check time overlap
          if (!(event1.end <= event2.start || event1.start >= event2.end)) {
            newConflicts.push(`Room conflict: ${event1.title} and ${event2.title}`);
          }
        }
      });
    });

    // Check teacher conflicts
    events.forEach((event1) => {
      events.forEach((event2) => {
        if (event1.id !== event2.id &&
            event1.day === event2.day &&
            event1.teacherId === event2.teacherId) {
          // Check time overlap
          if (!(event1.end <= event2.start || event1.start >= event2.end)) {
            newConflicts.push(`Teacher conflict: ${event1.title} and ${event2.title}`);
          }
        }
      });
    });

    setConflicts(newConflicts);
    return newConflicts.length === 0;
  };

  const handleAddEvent = () => {
    if (!formData.title || !formData.day || !formData.startTime || !formData.endTime) {
      return;
    }

    // Check room availability
    if (formData.room) {
      const roomAvailable = roomService.checkAvailability(
        formData.room,
        new Date(`2024-01-01T${formData.startTime}`),
        new Date(`2024-01-01T${formData.endTime}`)
      );
      if (!roomAvailable) {
        setConflicts([...conflicts, `Room ${formData.room} is not available at this time`]);
        return;
      }
    }

    // Check teacher availability
    if (formData.teacher) {
      const teacherAvailable = teacherService.checkAvailability(
        formData.teacher,
        formData.day,
        formData.startTime,
        formData.endTime
      );
      if (!teacherAvailable) {
        setConflicts([...conflicts, `Teacher is not available at this time`]);
        return;
      }
    }

    const newEvent: ScheduleEvent = {
      id: crypto.randomUUID(),
      title: formData.title,
      description: formData.description,
      day: formData.day,
      start: formData.startTime,
      end: formData.endTime,
      roomId: formData.room,
      teacherId: formData.teacher,
      type: formData.type,
      class: formData.class
    };

    setEvents([...events, newEvent]);
    validateSchedule();

    // Reset form
    setFormData({
      title: '',
      description: '',
      day: '',
      startTime: '',
      endTime: '',
      room: '',
      teacher: '',
      type: 'class',
      class: ''
    });
  };

  const handleSaveSchedule = () => {
    setLoading(true);
    try {
      if (validateSchedule()) {
        // Update room reservations
        events.forEach(event => {
          if (event.roomId) {
            roomService.reserveRoom(
              event.roomId,
              new Date(`2024-01-01T${event.start}`),
              new Date(`2024-01-01T${event.end}`),
              event.class
            );
          }
        });

        // Update teacher schedules
        events.forEach(event => {
          if (event.teacherId) {
            const teacher = teachers.find(t => t.id === event.teacherId);
            if (teacher) {
              const updatedSchedule = [...teacher.schedule];
              const daySchedule = updatedSchedule.find(s => s.day === event.day);
              if (daySchedule) {
                daySchedule.timeSlots.push({
                  start: event.start,
                  end: event.end,
                  class: event.class
                });
              } else {
                updatedSchedule.push({
                  day: event.day,
                  timeSlots: [{
                    start: event.start,
                    end: event.end,
                    class: event.class
                  }]
                });
              }
              teacherService.updateTeacherSchedule(teacher.id, updatedSchedule);
            }
          }
        });

        // Clear conflicts and show success message
        setConflicts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Δημιουργία Προγράμματος</h1>
          <p className="text-gray-400 mt-1">
            Σχεδιάστε το πρόγραμμα μαθημάτων με έξυπνη διαχείριση διαθεσιμότητας
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => setShowSettings(true)}>
            <SettingsIcon className="w-4 h-4 mr-2" />
            Ρυθμίσεις
          </Button>
          <Button onClick={handleSaveSchedule} disabled={loading}>
            {loading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Αποθήκευση
          </Button>
        </div>
      </div>

      {conflicts.length > 0 && (
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-medium text-red-800">Συγκρούσεις Προγράμματος</h3>
          </div>
          <ul className="space-y-1">
            {conflicts.map((conflict, index) => (
              <li key={index} className="text-sm text-red-600">• {conflict}</li>
            ))}
          </ul>
        </div>
      )}

      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Τίτλος"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Select
              label="Τύπος"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'class' | 'exam' | 'activity' })}
              options={[
                { value: 'class', label: 'Μάθημα' },
                { value: 'exam', label: 'Διαγώνισμα' },
                { value: 'activity', label: 'Δραστηριότητα' }
              ]}
              required
            />
          </div>

          <Input
            label="Περιγραφή"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            isTextArea
          />

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Ημέρα"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              options={settings.workDays.map(day => ({ value: day, label: day }))}
              required
            />
            <Input
              type="time"
              label="Ώρα Έναρξης"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              required
            />
            <Input
              type="time"
              label="Ώρα Λήξης"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Αίθουσα"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              options={rooms.map(room => ({
                value: room.id,
                label: `${room.name} (${room.capacity} θέσεις)`
              }))}
            />
            <Select
              label="Καθηγητής"
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              options={teachers.map(teacher => ({
                value: teacher.id,
                label: `${teacher.name} (${teacher.subject})`
              }))}
            />
            <Input
              label="Τμήμα"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              placeholder="π.χ. Β2"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleAddEvent}>
              <Plus className="w-4 h-4 mr-2" />
              Προσθήκη
            </Button>
          </div>
        </div>
      </Card>

      {/* Display current schedule */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Τρέχον Πρόγραμμα</h3>
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-3 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-white">{event.title}</h4>
                  <p className="text-sm text-gray-400">{event.description}</p>
                  <div className="mt-1 flex items-center space-x-2 text-sm text-gray-400">
                    <span>{event.day}</span>
                    <span>•</span>
                    <span>{event.start} - {event.end}</span>
                    {event.class && (
                      <>
                        <span>•</span>
                        <span>Τμήμα: {event.class}</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEvents(events.filter(e => e.id !== event.id))}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ScheduleBuilder;