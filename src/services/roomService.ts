import { Room } from '../types';

interface RoomUpdate {
  roomId: string;
  status: 'available' | 'occupied' | 'maintenance';
  currentClass?: string;
  nextClass?: string;
  occupiedUntil?: Date;
}

class RoomService {
  private static instance: RoomService;
  private rooms: Map<string, Room> = new Map();
  private listeners: Set<(rooms: Room[]) => void> = new Set();

  private constructor() {
    // Initialize with some demo rooms
    this.initializeDemoRooms();
    // Start periodic updates
    this.startPeriodicUpdates();
  }

  public static getInstance(): RoomService {
    if (!RoomService.instance) {
      RoomService.instance = new RoomService();
    }
    return RoomService.instance;
  }

  private initializeDemoRooms() {
    const demoRooms: Room[] = [
      {
        id: '1',
        name: 'Αίθουσα 101',
        capacity: 25,
        equipment: ['projector', 'whiteboard'],
        available: true
      },
      {
        id: '2',
        name: 'Αίθουσα 102',
        capacity: 30,
        equipment: ['whiteboard'],
        available: true
      },
      {
        id: '3',
        name: 'Εργαστήριο 1',
        capacity: 20,
        equipment: ['computers', 'projector', 'whiteboard'],
        available: true
      }
    ];

    demoRooms.forEach(room => this.rooms.set(room.id, room));
  }

  private startPeriodicUpdates() {
    setInterval(() => {
      // Simulate real-time updates
      this.updateRoomStatus();
    }, 30000); // Update every 30 seconds
  }

  private updateRoomStatus() {
    // Simulate status changes
    this.rooms.forEach(room => {
      const random = Math.random();
      if (random < 0.2) { // 20% chance to change status
        room.available = !room.available;
        this.notifyListeners();
      }
    });
  }

  subscribe(listener: (rooms: Room[]) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const roomsList = Array.from(this.rooms.values());
    this.listeners.forEach(listener => listener(roomsList));
  }

  getRooms(): Room[] {
    return Array.from(this.rooms.values());
  }

  getRoom(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  updateRoom(update: RoomUpdate): void {
    const room = this.rooms.get(update.roomId);
    if (room) {
      room.available = update.status === 'available';
      this.rooms.set(update.roomId, room);
      this.notifyListeners();
    }
  }

  checkAvailability(roomId: string, startTime: Date, endTime: Date): boolean {
    const room = this.rooms.get(roomId);
    if (!room) return false;
    
    // Add your availability checking logic here
    // For now, just return the current availability
    return room.available;
  }

  reserveRoom(roomId: string, startTime: Date, endTime: Date, className: string): boolean {
    if (!this.checkAvailability(roomId, startTime, endTime)) {
      return false;
    }

    const room = this.rooms.get(roomId);
    if (room) {
      room.available = false;
      this.rooms.set(roomId, room);
      this.notifyListeners();
      return true;
    }
    return false;
  }
}

export const roomService = RoomService.getInstance();