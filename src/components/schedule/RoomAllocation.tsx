import React, { useEffect, useState } from 'react';
import { Home, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';
import { Room } from '../../types';
import { roomService } from '../../services/roomService';
import Button from '../ui/Button';

const RoomAllocation = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial load
    setRooms(roomService.getRooms());

    // Subscribe to updates
    const unsubscribe = roomService.subscribe((updatedRooms) => {
      setRooms(updatedRooms);
    });

    return () => unsubscribe();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setRooms(roomService.getRooms());
    setTimeout(() => setLoading(false), 500);
  };

  const getStatusColor = (available: boolean) => {
    return available ? 'bg-green-500' : 'bg-red-500';
  };

  const getStatusText = (available: boolean) => {
    return available ? 'Διαθέσιμη' : 'Κατειλημμένη';
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Home className="w-5 h-5 mr-2 text-neon-primary" />
          <h3 className="font-semibold text-white">Κατάσταση Αιθουσών</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="space-y-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex items-center justify-between p-3 bg-cyber-dark-700/50 rounded-lg border border-neon-primary/20 hover:border-neon-primary transition-colors"
          >
            <div>
              <p className="font-medium text-white">{room.name}</p>
              <p className="text-sm text-gray-400">
                Χωρητικότητα: {room.capacity} άτομα
              </p>
              {room.equipment && room.equipment.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.equipment.map((item, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-0.5 rounded-full bg-cyber-dark-600 text-neon-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full ${getStatusColor(room.available)} mr-2`} />
              <span className="text-sm text-gray-300">
                {getStatusText(room.available)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RoomAllocation;