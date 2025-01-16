import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/docotor.service';
import { Doctor } from '../../models/doctor.model';
import { ChatService } from '../../../services/chat.service'
import { Message } from '../../../model/message.model'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    NgForOf,
    NgOptimizedImage,
  ],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;

  messages: Message[] = [];
  newMessage: string = '';
  patientId = 'patient123';  // TODO: Get actual patient ID from auth
  selectedDoctorId: string | null = null;

  constructor(private doctorService: DoctorService, private chatService: ChatService) {
    this.doctors = this.doctorService.getDoctors();
    this.chatService.connect(this.patientId);

    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  selectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.messages = []; // Clear messages for the selected doctor
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedDoctorId) {
      const message: Message = {
        from: 'patient',
        senderId: this.patientId,
        receiverId: this.selectedDoctorId,
        text: this.newMessage,
        timestamp: new Date(),
      };

      this.chatService.sendMessage(message);
      this.newMessage = '';
    }
  }

  endChat() {
    this.selectedDoctor = null;
    this.messages = [];
  }
}
