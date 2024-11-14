import { v4 as uuidv4 } from 'uuid';

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  status: 'available' | 'teaching' | 'break' | 'unavailable';
  currentClass?: string;
  schedule: TeacherSchedule[];
  preferences: TeacherPreferences;
}

interface TeacherSchedule {
  day: string;
  timeSlots: TimeSlot[];
}

interface TimeSlot {
  start: string;
  end: string;
  class?: string;
  room?: string;
}

interface TeacherPreferences {
  preferredDays: string[];
  preferredTimeSlots: string[];
  maxHoursPerDay: number;
  subjects: string[];
}

class TeacherService {
  private static instance: TeacherService;
  private teachers: Map<string, Teacher> = new Map();
  private listeners: Set<(teachers: Teacher[]) => void> = new Set();

  private constructor() {
    this.initializeDemoTeachers();
    this.startPeriodicUpdates();
  }

  public static getInstance(): TeacherService {
    if (!TeacherService.instance) {
      TeacherService.instance = new TeacherService();
    }
    return TeacherService.instance;
  }

  private initializeDemoTeachers() {
    const demoTeachers: Teacher[] = [
      {
        id: uuidv4(),
        name: 'Γ. Παπαδόπουλος',
        subject: 'Μαθηματικά',
        status: 'available',
        schedule: [
          {
            day: 'Δευτέρα',
            timeSlots: [
              { start: '09:00', end: '11:00', class: 'Β2' },
              { start: '12:00', end: '14:00', class: 'Γ1' }
            ]
          }
        ],
        preferences: {
          preferredDays: ['Δευτέρα', 'Τετάρτη', 'Παρασκευή'],
          preferredTimeSlots: ['09:00-13:00'],
          maxHoursPerDay: 6,
          subjects: ['Μαθηματικά', 'Φυσική']
        }
      },
      {
        id: uuidv4(),
        name: 'Μ. Κωνσταντίνου',
        subject: 'Φυσική',
        status: 'teaching',
        currentClass: 'Γ2',
        schedule: [
          {
            day: 'Τρίτη',
            timeSlots: [
              { start: '10:00', end: '12:00', class: 'Γ2' },
              { start: '13:00', end: '15:00', class: 'Β1' }
            ]
          }
        ],
        preferences: {
          preferredDays: ['Τρίτη', 'Πέμπτη'],
          preferredTimeSlots: ['10:00-15:00'],
          maxHoursPerDay: 5,
          subjects: ['Φυσική', 'Χημεία']
        }
      }
    ];

    demoTeachers.forEach(teacher => this.teachers.set(teacher.id, teacher));
  }

  private startPeriodicUpdates() {
    setInterval(() => {
      this.updateTeacherStatuses();
    }, 30000); // Update every 30 seconds
  }

  private updateTeacherStatuses() {
    const currentTime = new Date();
    const day = currentTime.toLocaleDateString('el-GR', { weekday: 'long' });
    const time = currentTime.toLocaleTimeString('el-GR', { hour: '2-digit', minute: '2-digit' });

    this.teachers.forEach(teacher => {
      const todaySchedule = teacher.schedule.find(s => s.day === day);
      if (todaySchedule) {
        const currentSlot = todaySchedule.timeSlots.find(slot => 
          time >= slot.start && time < slot.end
        );

        if (currentSlot) {
          teacher.status = 'teaching';
          teacher.currentClass = currentSlot.class;
        } else {
          teacher.status = 'available';
          teacher.currentClass = undefined;
        }
      }
    });

    this.notifyListeners();
  }

  subscribe(listener: (teachers: Teacher[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const teachersList = Array.from(this.teachers.values());
    this.listeners.forEach(listener => listener(teachersList));
  }

  getTeachers(): Teacher[] {
    return Array.from(this.teachers.values());
  }

  getTeacher(id: string): Teacher | undefined {
    return this.teachers.get(id);
  }

  updateTeacherStatus(teacherId: string, status: Teacher['status'], currentClass?: string): void {
    const teacher = this.teachers.get(teacherId);
    if (teacher) {
      teacher.status = status;
      teacher.currentClass = currentClass;
      this.teachers.set(teacherId, teacher);
      this.notifyListeners();
    }
  }

  updateTeacherSchedule(teacherId: string, schedule: TeacherSchedule[]): void {
    const teacher = this.teachers.get(teacherId);
    if (teacher) {
      teacher.schedule = schedule;
      this.teachers.set(teacherId, teacher);
      this.notifyListeners();
    }
  }

  updateTeacherPreferences(teacherId: string, preferences: TeacherPreferences): void {
    const teacher = this.teachers.get(teacherId);
    if (teacher) {
      teacher.preferences = preferences;
      this.teachers.set(teacherId, teacher);
      this.notifyListeners();
    }
  }

  checkAvailability(teacherId: string, day: string, start: string, end: string): boolean {
    const teacher = this.teachers.get(teacherId);
    if (!teacher) return false;

    const daySchedule = teacher.schedule.find(s => s.day === day);
    if (!daySchedule) return true;

    return !daySchedule.timeSlots.some(slot =>
      (start >= slot.start && start < slot.end) ||
      (end > slot.start && end <= slot.end) ||
      (start <= slot.start && end >= slot.end)
    );
  }
}

export const teacherService = TeacherService.getInstance();