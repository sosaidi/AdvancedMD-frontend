import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patients = [
    {
      id: '1234',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: '1985-01-01',
      address: '123 Main Street, Springfield',
      nationality: 'American',
      insured: 'Yes',
      occupation: 'Engineer',
      priority: 'High',
      location: 'Room 101',
      reason: 'Routine Check-up',
      complaints: 'Headache and nausea',
      diagnosis: 'Migraine',
      status: 'Stable',
      height: '180cm',
      photo: 'https://via.placeholder.com/150',
    },
    {
      id: '5678',
      firstname: 'Alice',
      lastname: 'Smith',
      birthdate: '1992-04-10',
      address: '456 Oak Street, Lincoln',
      nationality: 'Canadian',
      insured: 'Yes',
      occupation: 'Teacher',
      priority: 'Medium',
      location: 'Room 102',
      reason: 'Flu symptoms',
      complaints: 'Fever and cough',
      diagnosis: 'Influenza',
      status: 'Recovering',
      height: '165cm',
      photo: 'https://via.placeholder.com/150',
    },
  ];

  getPatients() {
    return this.patients;
  }
}
