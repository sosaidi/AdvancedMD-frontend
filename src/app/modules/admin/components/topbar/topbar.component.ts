import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  // Mock notifications data
  notifications = [
    { id: 1, message: 'New patient added', time: '5 mins ago' },
    { id: 2, message: 'Appointment scheduled', time: '10 mins ago' },
    { id: 3, message: 'Payment processed', time: '15 mins ago' },
  ];

  // control dropdown visibility
  showNotifications = false;


  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead(): void {
    this.notifications = [];
    this.showNotifications = false;
  }
}
