import { Component, OnInit } from '@angular/core';
import { RoomsService, Room } from '../../../../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];

  constructor(private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }
}
