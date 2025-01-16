import { Injectable } from '@angular/core';
import { Message } from '../model/message.model';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket!: WebSocket;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor() {
  }

  connect(userId: string) {
    this.socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

    this.socket.onmessage = (event) => {
      const receivedMessage: Message = JSON.parse(event.data);
      const newMessages = [...this.messagesSubject.value, receivedMessage];
      this.messagesSubject.next(newMessages);
    };

    this.socket.onclose = () => {
      console.log("WebSocket closed. Reconnecting...");
      setTimeout(() => this.connect(userId), 1000);
    };
  }

  sendMessage(message: Message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
}
