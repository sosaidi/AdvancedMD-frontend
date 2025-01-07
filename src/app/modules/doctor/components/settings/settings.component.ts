import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgClass, NgIf } from '@angular/common'

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  currentTab = 'profile'

  profile = {
    name: '',
    email: '',
    contact: '',
  }

  preferences = {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      app: true,
    },
  }

  security = {
    newPassword: '',
    enableTwoFA: false,
  }

  hospital = {
    name: '',
    contact: '',
    address: '',
    website: '',
  }

  // Language options for translations
  translations: any = {
    en: {
      settings: 'Settings',
      profileSettings: 'Profile Settings',
      appPreferences: 'Application Preferences',
      dataManagement: 'Data Management',
      securitySettings: 'Security Settings',
      hospitalInfo: 'Hospital Information',
      savePreferences: 'Save Preferences',
      saveChanges: 'Save Changes',
      enableTwoFA: 'Enable Two-Factor Authentication',
    },
    es: {
      settings: 'Configuraciones',
      profileSettings: 'Configuración de perfil',
      appPreferences: 'Preferencias de la aplicación',
      dataManagement: 'Gestión de datos',
      securitySettings: 'Configuraciones de seguridad',
      hospitalInfo: 'Información del hospital',
      savePreferences: 'Guardar preferencias',
      saveChanges: 'Guardar cambios',
      enableTwoFA: 'Habilitar autenticación de dos factores',
    },
    fr: {
      settings: 'Paramètres',
      profileSettings: 'Paramètres du profil',
      appPreferences: 'Préférences de l’application',
      dataManagement: 'Gestion des données',
      securitySettings: 'Paramètres de sécurité',
      hospitalInfo: 'Informations sur l’hôpital',
      savePreferences: 'Enregistrer les préférences',
      saveChanges: 'Enregistrer les modifications',
      enableTwoFA: 'Activer l’authentification à deux facteurs',
    },
    de: {
      settings: 'Einstellungen',
      profileSettings: 'Profil-Einstellungen',
      appPreferences: 'Anwendungseinstellungen',
      dataManagement: 'Datenverwaltung',
      securitySettings: 'Sicherheitseinstellungen',
      hospitalInfo: 'Krankenhausinformationen',
      savePreferences: 'Einstellungen speichern',
      saveChanges: 'Änderungen speichern',
      enableTwoFA: 'Zwei-Faktor-Authentifizierung aktivieren',
    },
  }

  // Change language dynamically
  changeLanguage(): void {
    const selectedLanguage = this.preferences.language

    document.querySelectorAll('[data-translate-key]').forEach((element) => {
      const key = element.getAttribute('data-translate-key')
      if (key && this.translations[selectedLanguage][key]) {
        element.textContent = this.translations[selectedLanguage][key]
      }
    })

    console.log(`Language switched to ${selectedLanguage}`)
  }

  backupData(): void {
    console.log('Data backup initiated...')
    alert('Backup successful!')
  }

  restoreData(): void {
    console.log('Data restoration initiated...')
    alert('Data restored!')
  }

  exportData(): void {
    console.log('Data export initiated...')
    alert('Data exported as a file!')
  }

  uploadProfilePicture(event: any): void {
    const file = event.target.files[0]
    console.log('Uploaded file:', file)
  }

  saveProfile(): void {
    console.log('Profile saved:', this.profile)
    alert('Profile settings saved!')
  }

  savePreferences(): void {
    console.log('Preferences saved:', this.preferences)
    alert('Preferences updated!')
  }

  saveSecuritySettings(): void {
    console.log('Security settings updated:', this.security)
    alert('Security settings saved!')
  }

  saveHospitalInfo(): void {
    console.log('Hospital information updated:', this.hospital)
    alert('Hospital information saved!')
  }
}
