import { Component } from '@angular/core'
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { PatientService } from '../../../services/patient.service'
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
  patients: any[] = [];
  selectedPatient: any = null;

  messages: Message[] = [];
  newMessage: string = '';
  doctorId = 'doctor123'; // TODO: Replace with real doctor ID
  selectedPatientId: string | null = null;

  constructor(private patientService: PatientService, private chatService: ChatService) {
    this.patients = this.patientService.getPatients();
    this.chatService.connect(this.doctorId);

    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  selectPatient(patient: any) {
    this.selectedPatient = patient;
    this.messages = []; // Clear previous messages
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedPatientId) {
      const message: Message = {
        from: 'doctor',
        senderId: this.doctorId,
        receiverId: this.selectedPatientId,
        text: this.newMessage,
        timestamp: new Date(),
      };

      this.chatService.sendMessage(message);
      this.newMessage = '';
    }
  }

  endChat() {
    this.selectedPatient = null;
    this.messages = [];
  }
}
