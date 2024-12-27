import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class EmergencyContactsService {
  private emergencyContacts: {
    name: string
    relation: string
    phone: string
    familyMember: string
  }[] = [
    {
      name: 'John Doe',
      relation: 'Husband',
      phone: '+1234567890',
      familyMember: 'Yes',
    },
    {
      name: 'Jane Smith',
      relation: 'Sister',
      phone: '+0987654321',
      familyMember: 'Yes',
    },
  ]

  getContacts() {
    return this.emergencyContacts
  }

  addContact(contact: {
    name: string
    relation: string
    phone: string
    familyMember: string
  }) {
    this.emergencyContacts.push(contact)
  }

  updateContact(
    index: number,
    updatedContact: {
      name: string
      relation: string
      phone: string
      familyMember: string
    }
  ) {
    this.emergencyContacts[index] = updatedContact
  }

  deleteContact(index: number) {
    this.emergencyContacts.splice(index, 1)
  }
}
