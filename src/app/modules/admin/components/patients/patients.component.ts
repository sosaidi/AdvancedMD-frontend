// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Patient } from '../../components/patients/patients.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminPatientsService {
//   private patients: Patient[] = [
//     {
//       id: '1',
//       firstname: 'John',
//       lastname: 'Doe',
//       birthdate: '1985-01-01',
//       address: '123 Main Street, Springfield',
//       nationality: 'American',
//       insured: 'Yes',
//       occupation: 'Engineer',
//       priority: 'High',
//       location: 'Room 101',
//       reason: 'Routine Check-up',
//       complaints: 'Headache and nausea',
//       diagnosis: 'Migraine',
//       status: 'Stable',
//       height: '180cm',
//     },
//   ];

//   private patientsSubject = new BehaviorSubject<Patient[]>(this.patients);

//   getPatients(): Patient[] {
//     return this.patients;
//   }

//   getPatientsObservable() {
//     return this.patientsSubject.asObservable();
//   }

//   addPatient(patient: Patient): void {
//     this.patients.unshift(patient);
//     this.patientsSubject.next(this.patients);
//   }

//   updatePatient(id: string, updatedPatient: Patient): void {
//     const index = this.patients.findIndex((patient) => patient.id === id);
//     if (index !== -1) {
//       this.patients[index] = updatedPatient;
//       this.patientsSubject.next(this.patients);
//     }
//   }

//   deletePatient(id: string): void {
//     this.patients = this.patients.filter((patient) => patient.id !== id);
//     this.patientsSubject.next(this.patients);
//   }
// }
