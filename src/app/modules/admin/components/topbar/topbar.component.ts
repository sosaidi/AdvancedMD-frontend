import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  notifications = [
    { id: 1, message: 'New patient added', time: '5 mins ago' },
    { id: 2, message: 'Appointment scheduled', time: '10 mins ago' },
    { id: 3, message: 'Payment processed', time: '15 mins ago' },
  ];

  showNotifications = false;

  constructor(private router: Router) {}

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead(): void {
    this.notifications = [];
    this.showNotifications = false;
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove JWT token
    localStorage.clear(); // Clear all stored data
    this.router.navigate(['/login']); // Redirect to login page
  }
}
