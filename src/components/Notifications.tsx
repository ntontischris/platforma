import React from 'react';
import { Bell, X } from 'lucide-react';
import useStore from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { el } from 'date-fns/locale';

const Notifications = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const notifications = useStore((state) => state.notifications);
  const markNotificationAsRead = useStore((state) => state.markNotificationAsRead);
  const deleteNotification = useStore((state) => state.deleteNotification);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotification(id);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-300 hover:text-white focus:outline-none"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-80 mt-2 bg-cyber-dark-800 rounded-lg shadow-xl z-50 border border-neon-primary/20">
          <div className="p-4 border-b border-neon-primary/20">
            <h3 className="text-lg font-semibold text-white">Ειδοποιήσεις</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                Δεν υπάρχουν ειδοποιήσεις
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  className={`p-4 border-b border-neon-primary/10 cursor-pointer hover:bg-cyber-dark-700 ${
                    !notification.read ? 'bg-cyber-dark-600' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: el,
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDelete(e, notification.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;