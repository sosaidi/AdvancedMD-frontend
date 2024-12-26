import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../../services/room.service';
import { Room } from './room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  roomList: Room[] = [];
  isLoading: boolean = true;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.roomList = data;
        this.isLoading = false;
      },
    });
  }
}
