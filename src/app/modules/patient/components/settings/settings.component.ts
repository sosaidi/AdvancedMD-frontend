import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  password = {
    current: '',
    new: '',
    confirm: '',
  };

  notifications = {
    email: true,
    sms: false,
  };

  theme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    this.loadTheme();
  }

  saveProfile() {
    alert('Profile updated successfully!');
  }

  updatePassword() {
    if (this.password.new !== this.password.confirm) {
      alert('New password and confirm password do not match!');
      return;
    }
    alert('Password updated successfully!');
    this.password = { current: '', new: '', confirm: '' };
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark', this.theme === 'dark');
    localStorage.setItem('theme', this.theme);
    alert(`Switched to ${this.theme.charAt(0).toUpperCase() + this.theme.slice(1)} Mode.`);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    this.theme = savedTheme || 'light';
    document.body.classList.toggle('dark', this.theme === 'dark');
  }

  saveSettings() {

  }
}
