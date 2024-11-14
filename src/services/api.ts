import axios from 'axios';

const api = axios.create({
  baseURL: '/.netlify/functions',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@edumanager:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@edumanager:token');
      localStorage.removeItem('@edumanager:user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data?.error || 'An error occurred');
  }
);

// Students API
export const studentsApi = {
  getAll: () => api.get('/students'),
  create: (data: any) => api.post('/students', data),
  update: (id: string, data: any) => api.put('/students', { id, ...data }),
  delete: (id: string) => api.delete(`/students?id=${id}`),
};

// Courses API
export const coursesApi = {
  getAll: () => api.get('/courses'),
  create: (data: any) => api.post('/courses', data),
  update: (id: string, data: any) => api.put('/courses', { id, ...data }),
  delete: (id: string) => api.delete(`/courses?id=${id}`),
};

// Schedule API
export const scheduleApi = {
  getEvents: () => api.get('/schedule'),
  getRooms: () => api.get('/schedule?type=rooms'),
  createEvent: (data: any) => api.post('/schedule', data),
  updateEvent: (id: string, data: any) => api.put('/schedule', { id, ...data }),
  deleteEvent: (id: string) => api.delete(`/schedule?id=${id}`),
};

// Assignments API
export const assignmentsApi = {
  grade: (assignment: any) => api.post('/assignments', { type: 'grade', assignment }),
};

// Surveys API
export const surveysApi = {
  getAll: () => api.get('/surveys'),
  create: (data: any) => api.post('/surveys', { type: 'create', data }),
  submit: (surveyId: string, response: any) => 
    api.post('/surveys', { type: 'submit', data: { surveyId, response } }),
  analyze: (surveyId: string) => 
    api.post('/surveys', { type: 'analyze', data: { surveyId } }),
};

export default api;