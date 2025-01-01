import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  showNotifications = false;
  unreadNotifications = 3;
  
//mocked data
  notifications = [
    {
      id: 1,
      message: 'Please check your mail',
      time: '14 mins ago',
      icon: 'fas fa-envelope',
      read: false,
    },
    {
      id: 2,
      message: 'New patient added',
      time: '22 mins ago',
      icon: 'fas fa-user-plus',
      read: false,
    },
    {
      id: 3,
      message: 'Your leave is approved!',
      time: '3 hours ago',
      icon: 'fas fa-check-circle',
      read: false,
    },
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.read = true));
    this.unreadNotifications = 0;
  }

  removeNotification(notification: any) {
    this.notifications = this.notifications.filter(
      (n) => n.id !== notification.id
    );
  }

  viewAllNotifications() {
    alert('Redirect to All Notifications Page');
  }
}
