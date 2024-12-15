import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentLanguage: string = 'en'

  translations: any = {
    en: {
      settings: 'Settings',
      profileSettings: 'Profile Settings',
      appPreferences: 'Application Preferences',
      dataManagement: 'Data Management',
      securitySettings: 'Security Settings',
      hospitalInfo: 'Hospital Information',
      savePreferences: 'Save Preferences',
      // Add other translations as needed
    },
    es: {
      settings: 'Configuraciones',
      profileSettings: 'Configuración de perfil',
      appPreferences: 'Preferencias de la aplicación',
      dataManagement: 'Gestión de datos',
      securitySettings: 'Configuraciones de seguridad',
      hospitalInfo: 'Información del hospital',
      savePreferences: 'Guardar preferencias',
    },
    fr: {
      settings: 'Paramètres',
      profileSettings: 'Paramètres du profil',
      appPreferences: 'Préférences de l’application',
      dataManagement: 'Gestion des données',
      securitySettings: 'Paramètres de sécurité',
      hospitalInfo: 'Informations sur l’hôpital',
      savePreferences: 'Enregistrer les préférences',
    },
    de: {
      settings: 'Einstellungen',
      profileSettings: 'Profil-Einstellungen',
      appPreferences: 'Anwendungseinstellungen',
      dataManagement: 'Datenverwaltung',
      securitySettings: 'Sicherheitseinstellungen',
      hospitalInfo: 'Krankenhausinformationen',
      savePreferences: 'Einstellungen speichern',
    },
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage][key] || key
  }

  setLanguage(language: string): void {
    this.currentLanguage = language
    console.log(`Language switched to ${language}`)
  }
}
