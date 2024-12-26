import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../modules/admin/components/rooms/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private mockRooms: Room[] = [
    {
      room_id: 1,
      room_num: '101',
      room_type: 'Private',
      status: 'Occupied',
    },
    {
      room_id: 2,
      room_num: '102',
      room_type: 'Semi-private',
      status: 'Available',
    },
    {
      room_id: 3,
      room_num: '103',
      room_type: 'ICU',
      status: 'Occupied',
    },
  ];

  getRooms(): Observable<Room[]> {
    return of(this.mockRooms);
  }
}
