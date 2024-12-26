import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../modules/admin/components/patients/patients.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private mockPatients: Patient[] = [
    {
      patient_id: 1,
      firstname: 'Mike',
      lastname: 'Tyson',
      dob: '1990-01-01',
      gender: 'Male',
      address: '1234 Elm Street, City, Country',
      phone_number: '555-1234',
      admission_date: '2024-01-15',
      discharge_date: '2024-01-20',
      status: 'Discharged',
    },
    {
      patient_id: 2,
      firstname: 'Jane',
      lastname: 'Doe',
      dob: '1985-05-20',
      gender: 'Female',
      address: '5678 Oak Street, City, Country',
      phone_number: '555-5678',
      admission_date: '2024-01-16',
      discharge_date: null,
      status: 'Active',
    },
    {
      patient_id: 3,
      firstname: 'Emily',
      lastname: 'Smith',
      dob: '1992-03-10',
      gender: 'Female',
      address: '9101 Pine Street, City, Country',
      phone_number: '555-9101',
      admission_date: '2024-01-18',
      discharge_date: null,
      status: 'Active',
    },
  ];

  getPatients(): Observable<Patient[]> {
    return of(this.mockPatients);
  }
}
