import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { EmergencyContactsService } from '../../services/contact.service'
import { NameService } from '../../services/name.service'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NgClass],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit{
  profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
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
}
