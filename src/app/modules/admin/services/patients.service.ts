import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  contact: string;
  address: string;
  lastVisit: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminPatientsService {
  private patients: Patient[] = [
    {
      id: 'PAT001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      condition: 'Hypertension',
      contact: '+1234567890',
      address: '123 Elm Street, Springfield',
      lastVisit: '2024-12-01',
    },
    {
      id: 'PAT002',
      name: 'Jane Smith',
      age: 38,
      gender: 'Female',
      condition: 'Type 2 Diabetes',
      contact: '+9876543210',
      address: '456 Oak Avenue, Metropolis',
      lastVisit: '2024-11-20',
    },
  ];

  private patientsSubject = new BehaviorSubject<Patient[]>(this.patients);

  // Fetch all patients
  getPatientsObservable() {
    return this.patientsSubject.asObservable();
  }

  // Return the current patients list
  getPatients() {
    return this.patients;
  }

  // Add a new patient
  addPatient(patient: Patient) {
    this.patients.unshift(patient); // Adds the new patient at the beginning of the array
    this.patientsSubject.next(this.patients); 
  }

  // Update an existing patient's details
  updatePatient(id: string, updatedPatient: Patient) {
    const index = this.patients.findIndex((patient) => patient.id === id);
    if (index !== -1) {
      this.patients[index] = updatedPatient; 
      this.patientsSubject.next(this.patients);
    }
  }

  // Delete a patient by ID
  deletePatient(id: string) {
    this.patients = this.patients.filter((patient) => patient.id !== id); // Remove the patient from the list
    this.patientsSubject.next(this.patients); // Update the observable list
  }
}
