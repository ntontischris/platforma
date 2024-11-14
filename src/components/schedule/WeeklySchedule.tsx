import React, { useState } from 'react';
import { Clock, Plus, Edit2, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface Event {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  day: string;
  room?: string;
  teacher?: string;
  type: 'class' | 'exam' | 'activity';
  color?: string;
}

const timeSlots = Array.from({ length: 24 }, (_, i) => 
  `${i.toString().padStart(2, '0')}:00`
);

const days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή'];

const eventTypes = [
  { value: 'class', label: 'Μάθημα', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'exam', label: 'Διαγώνισμα', color: 'bg-red-100 text-red-800 border-red-200' },
  { value: 'activity', label: 'Δραστηριότητα', color: 'bg-green-100 text-green-800 border-green-200' }
];

const WeeklySchedule = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    day: '',
    room: '',
    teacher: '',
    type: 'class' as const
  });

  const handleSlotClick = (day: string, time: string) => {
    setSelectedSlot({ day, time });
    setFormData({
      ...formData,
      day,
      start: time,
      end: time
    });
    setShowModal(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      start: event.start,
      end: event.end,
      day: event.day,
      room: event.room || '',
      teacher: event.teacher || '',
      type: event.type
    });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...formData }
          : event
      ));
    } else {
      // Create new event
      const newEvent: Event = {
        id: crypto.randomUUID(),
        ...formData
      };
      setEvents([...events, newEvent]);
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    setSelectedEvent(null);
    setFormData({
      title: '',
      description: '',
      start: '',
      end: '',
      day: '',
      room: '',
      teacher: '',
      type: 'class'
    });
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.teacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.room?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEventForSlot = (day: string, time: string) => {
    return filteredEvents.find(event => 
      event.day === day && 
      event.start <= time && 
      event.end > time
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Αναζήτηση προγράμματος..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Νέα Εγγραφή
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 gap-2">
            {/* Time column */}
            <div className="space-y-2">
              <div className="h-12 flex items-center justify-center font-medium">
                <Clock className="w-4 h-4 mr-2" />
                Ώρα
              </div>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-24 flex items-center justify-center text-sm text-gray-500"
                >
                  {time}
                </div>
              ))}
            </div>

            {/* Days columns */}
            {days.map((day) => (
              <div key={day} className="space-y-2">
                <div className="h-12 flex items-center justify-center font-medium">
                  {day}
                </div>
                {timeSlots.map((time) => {
                  const event = getEventForSlot(day, time);
                  return (
                    <div
                      key={`${day}-${time}`}
                      className={`h-24 border border-gray-100 rounded-lg p-2 transition-colors cursor-pointer
                        ${event ? eventTypes.find(t => t.value === event.type)?.color : 'hover:bg-gray-50'}`}
                      onClick={() => event ? handleEventClick(event) : handleSlotClick(day, time)}
                    >
                      {event && (
                        <div className="h-full flex flex-col">
                          <div className="font-medium">{event.title}</div>
                          {event.room && (
                            <div className="text-sm">Αίθουσα: {event.room}</div>
                          )}
                          {event.teacher && (
                            <div className="text-sm">Καθηγητής: {event.teacher}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedEvent ? 'Επεξεργασία Εγγραφής' : 'Νέα Εγγραφή'}
      >
        <div className="space-y-4">
          <Input
            label="Τίτλος"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Περιγραφή"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            isTextArea
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Ημέρα"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              options={days.map(day => ({ value: day, label: day }))}
              required
            />
            <Select
              label="Τύπος"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'class' | 'exam' | 'activity' })}
              options={eventTypes.map(type => ({ value: type.value, label: type.label }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="time"
              label="Ώρα Έναρξης"
              value={formData.start}
              onChange={(e) => setFormData({ ...formData, start: e.target.value })}
              required
            />
            <Input
              type="time"
              label="Ώρα Λήξης"
              value={formData.end}
              onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Αίθουσα"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            />
            <Input
              label="Καθηγητής"
              value={formData.teacher}
              onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            />
          </div>

          <div className="flex justify-end space-x-3">
            {selectedEvent && (
              <Button variant="outline" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Διαγραφή
              </Button>
            )}
            <Button variant="secondary" onClick={handleCloseModal}>
              Ακύρωση
            </Button>
            <Button onClick={handleSubmit}>
              {selectedEvent ? (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Ενημέρωση
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Προσθήκη
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WeeklySchedule;