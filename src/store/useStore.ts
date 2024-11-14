import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student, Course, Notification } from '../types';
import { studentsApi, coursesApi } from '../services/api';

interface StoreState {
  students: Student[];
  courses: Course[];
  notifications: Notification[];
  aiSuggestions: any[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  fetchCourses: () => Promise<void>;
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => Promise<void>;
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (id: string, data: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      students: [],
      courses: [],
      notifications: [],
      aiSuggestions: [],
      loading: false,
      error: null,

      fetchStudents: async () => {
        set({ loading: true, error: null });
        try {
          const response = await studentsApi.getAll();
          set({ students: response.data });
        } catch (err) {
          set({ error: 'Failed to fetch students' });
        } finally {
          set({ loading: false });
        }
      },

      fetchCourses: async () => {
        set({ loading: true, error: null });
        try {
          const response = await coursesApi.getAll();
          set({ courses: response.data });
        } catch (err) {
          set({ error: 'Failed to fetch courses' });
        } finally {
          set({ loading: false });
        }
      },

      addStudent: async (student) => {
        set({ loading: true, error: null });
        try {
          const response = await studentsApi.create(student);
          set((state) => ({ students: [...state.students, response.data] }));
        } catch (err) {
          set({ error: 'Failed to add student' });
        } finally {
          set({ loading: false });
        }
      },

      updateStudent: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const response = await studentsApi.update(id, data);
          set((state) => ({
            students: state.students.map((s) => 
              s.id === id ? response.data : s
            )
          }));
        } catch (err) {
          set({ error: 'Failed to update student' });
        } finally {
          set({ loading: false });
        }
      },

      deleteStudent: async (id) => {
        set({ loading: true, error: null });
        try {
          await studentsApi.delete(id);
          set((state) => ({
            students: state.students.filter((s) => s.id !== id)
          }));
        } catch (err) {
          set({ error: 'Failed to delete student' });
        } finally {
          set({ loading: false });
        }
      },

      addCourse: async (course) => {
        set({ loading: true, error: null });
        try {
          const response = await coursesApi.create(course);
          set((state) => ({ courses: [...state.courses, response.data] }));
        } catch (err) {
          set({ error: 'Failed to add course' });
        } finally {
          set({ loading: false });
        }
      },

      updateCourse: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const response = await coursesApi.update(id, data);
          set((state) => ({
            courses: state.courses.map((c) => 
              c.id === id ? response.data : c
            )
          }));
        } catch (err) {
          set({ error: 'Failed to update course' });
        } finally {
          set({ loading: false });
        }
      },

      deleteCourse: async (id) => {
        set({ loading: true, error: null });
        try {
          await coursesApi.delete(id);
          set((state) => ({
            courses: state.courses.filter((c) => c.id !== id)
          }));
        } catch (err) {
          set({ error: 'Failed to delete course' });
        } finally {
          set({ loading: false });
        }
      },

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              read: false,
            },
            ...state.notifications,
          ],
        })),

      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'edu-manager-storage',
    }
  )
);

export default useStore;