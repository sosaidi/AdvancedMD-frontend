import { Injectable } from '@angular/core';
import { Room } from '../components/rooms/rooms.model';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminRoomsService {
  private rooms: Room[] = [
    { roomId: 'R001', type: 'ICU', capacity: 5, status: 'Available' },
    { roomId: 'R002', type: 'General', capacity: 10, status: 'Full' },
    { roomId: 'R003', type: 'Private', capacity: 2, status: 'Under Maintenance' }
  ];

  private roomsSubject = new BehaviorSubject<Room[]>(this.rooms);

  constructor() {}

  getRooms(): Observable<Room[]> {
    return this.roomsSubject.asObservable();
  }

  addRoom(room: Room): void {
    this.rooms.push(room);
    this.roomsSubject.next(this.rooms); 
  }

  deleteRoom(roomId: string): void {
    this.rooms = this.rooms.filter((room) => room.roomId !== roomId);
    this.roomsSubject.next(this.rooms);  
  }

  updateRoom(updatedRoom: Room): void {
    const index = this.rooms.findIndex((room) => room.roomId === updatedRoom.roomId);
    if (index !== -1) {
      this.rooms[index] = updatedRoom;  
      this.roomsSubject.next(this.rooms);  
    }
  }
}
