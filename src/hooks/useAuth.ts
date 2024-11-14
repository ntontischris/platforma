import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('@edumanager:user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('@edumanager:token');
    const storedUser = localStorage.getItem('@edumanager:user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/auth', { email, password });
      const { user: userData, token } = response.data;
      
      setUser(userData);
      localStorage.setItem('@edumanager:token', token);
      localStorage.setItem('@edumanager:user', JSON.stringify(userData));
      
      return userData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@edumanager:token');
    localStorage.removeItem('@edumanager:user');
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (userData: Partial<User>) => {
    setLoading(true);
    try {
      const response = await api.put('/auth/profile', userData);
      const updatedUser = response.data;
      
      setUser(updatedUser);
      localStorage.setItem('@edumanager:user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };
}