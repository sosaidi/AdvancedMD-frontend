import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common'
import { EmergencyContactsService } from '../../services/contact.service'
import { NameService } from '../../services/name.service'

@Component({
  selector: 'app-settings',
  imports: [FormsModule, NgForOf, NgIf, NgClass, NgStyle],
  standalone: true,
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    profilePicture: '',
  }

  password = {
    current: '',
    new: '',
    confirm: '',
  }

  notifications = {
    email: true,
    sms: false,
  }

  theme: 'light' | 'dark' = 'light'
  labTests: File[] = []
  activeTab = 'profile'

  constructor(
    public contactsService: EmergencyContactsService,
    private nameService: NameService
  ) {}

  get emergencyContacts() {
    return this.contactsService.getContacts()
  }

  ngOnInit(): void {
    this.loadTheme()
    this.nameService.profile$.subscribe((profile) => {
      this.profile = profile
    })
  }

  saveProfile() {
    this.nameService.updateProfile({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
    })
    alert('Profile updated successfully!')
  }

  updatePassword() {
    if (this.password.new !== this.password.confirm) {
      alert('New password and confirm password do not match!')
      return
    }
    alert('Password updated successfully!')
    this.password = { current: '', new: '', confirm: '' }
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
    document.body.classList.toggle('dark', this.theme === 'dark')
    localStorage.setItem('theme', this.theme)
    alert(
      `Switched to ${this.theme.charAt(0).toUpperCase() + this.theme.slice(1)} Mode.`
    )
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    this.theme = savedTheme || 'light'
    document.body.classList.toggle('dark', this.theme === 'dark')
  }

  addEmergencyContact() {
    this.contactsService.addContact({
      name: '',
      relation: '',
      phone: '',
      familyMember: 'No',
    })
  }

  removeEmergencyContact(index: number) {
    this.emergencyContacts.splice(index, 1)
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  uploadLabTest(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files?.length) {
      this.labTests.push(input.files[0])
    }
  }

  removeLabTest(file: File) {
    this.labTests = this.labTests.filter((f) => f !== file)
  }

  uploadProfilePicture(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const profilePicture = reader.result as string;
        this.profile.profilePicture = profilePicture; // Update local profile
        this.nameService.updateProfile({ profilePicture }); // Update service
        alert('Profile picture updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  }

  generatePastelColor(): string {
    const initials = `${this.profile.firstName[0] || ''}${this.profile.lastName[0] || ''}`;
    const hash = Array.from(initials)
      .map((char) => char.charCodeAt(0))
      .reduce((sum, charCode) => sum + charCode, 0);
    const hue = hash % 360; // Generate a hue value between 0 and 360
    return `hsl(${hue}, 70%, 80%)`; // Create a pastel color
  }
}
