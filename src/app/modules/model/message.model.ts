export interface Message {
  from: 'doctor' | 'patient';
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
}
