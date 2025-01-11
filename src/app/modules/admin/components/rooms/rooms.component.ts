import { Component, OnInit } from '@angular/core';
import { AdminRoomsService } from '../../services/rooms.service';
import { Room } from './rooms.model';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor, CommonModule]
})
export class RoomsComponent implements OnInit {
  currentTab: string = 'roomsList'; 
  rooms: Room[] = [];  
  showForm: boolean = false; 
  roomAdded: boolean = false; 
  addRoomError: boolean = false;
  newRoom: Room = { roomId: '', type: '', capacity: 0, status: 'Available' };
  loading: boolean = false;

  constructor(private roomsService: AdminRoomsService) {}

  ngOnInit(): void {
    this.loadRooms();  
  }

  loadRooms(): void {
    
    this.roomsService.getRooms().subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;  
      },
      (error) => {
        console.error('Error fetching rooms:', error);  
      }
    );
  }

  openForm(): void {
    this.showForm = true;
    this.newRoom = { roomId: '', type: '', capacity: 0, status: 'Available' };  
  }

  closeForm(): void {
    this.showForm = false;  
  }

  addRoom(): void {
    if (!this.newRoom.type || this.newRoom.capacity <= 0) {
      return;  
    }

    this.loading = true;

    // Add the room through the service and handle success or failure
    this.roomsService.addRoom(this.newRoom);
    this.rooms.push(this.newRoom);  

    this.closeForm();
    this.roomAdded = true;  
    setTimeout(() => this.roomAdded = false, 3000); 
    this.loading = false;
  }

  editRoom(room: Room): void {
    console.log('Editing room:', room);
  }

  deleteRoom(roomId: string): void {
    this.roomsService.deleteRoom(roomId);
    this.rooms = this.rooms.filter((room) => room.roomId !== roomId);  
  }

  setActiveTab(tab: string): void {
    this.currentTab = tab;  
  }
}
