import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { Room } from './room.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomsService: RoomService) {}

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }
}
