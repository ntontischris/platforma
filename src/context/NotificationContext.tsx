import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification } from '../types';
import useStore from '../store/useStore';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const store = useStore();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const count = store.notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [store.notifications]);

  const value = {
    notifications: store.notifications,
    unreadCount,
    markAsRead: store.markNotificationAsRead,
    deleteNotification: store.deleteNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}