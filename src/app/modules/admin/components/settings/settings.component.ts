import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, NgClass]
})
export class SettingsComponent {
  currentTab: string = 'profile'; // The initial active tab
  profile = { name: '', email: '', contact: '', picture: '' };
  hospitalInfo = { name: '', contact: '', address: '', website: '' };
  notificationSettings = { email: false, sms: false };
  securitySettings = { newPassword: '', enableTwoFA: false };

  // To switch between tabs
  setActiveTab(tab: string) {
    this.currentTab = tab;
  }

  // Save profile settings
  saveProfile() {
    console.log('Profile saved', this.profile);
  }

  // Save hospital info
  saveHospitalInfo() {
    console.log('Hospital Info saved', this.hospitalInfo);
  }

  // Save notification settings
  saveNotifications() {
    console.log('Notification Settings saved', this.notificationSettings);
  }

  // Save security settings
  saveSecuritySettings() {
    console.log('Security Settings saved', this.securitySettings);
  }

  // Upload a profile picture (optional)
  uploadProfilePicture(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Profile picture uploaded', file);
    }
  }
}
