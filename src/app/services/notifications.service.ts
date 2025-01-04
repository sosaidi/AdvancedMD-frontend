import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications = [
    { id: 1, message: 'New patient added', time: '5 mins ago', read: false },
    { id: 2, message: 'Appointment scheduled', time: '10 mins ago', read: false },
    { id: 3, message: 'Payment processed', time: '15 mins ago', read: false },
  ];

  getNotifications(): Observable<any[]> {
    return of(this.notifications);
  }

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.read = true));
  }

  removeNotification(id: number): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  }
}
