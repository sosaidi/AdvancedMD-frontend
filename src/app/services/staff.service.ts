import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Staff } from '../modules/admin/components/staff/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private mockStaff: Staff[] = [
    {
      user_id: 1,
      name: 'Dr. Emily Roberts',
      role: 'Doctor',
      phone_number: '555-3456',
      email: 'emily.roberts@example.com',
      specialization: 'Cardiologist',
    },
    {
      user_id: 2,
      name: 'Dr. Mark Wilson',
      role: 'Doctor',
      phone_number: '555-7890',
      email: 'mark.wilson@example.com',
      specialization: 'Neurologist',
    },
    {
      user_id: 3,
      name: 'Dr. Lisa Brown',
      role: 'Doctor',
      phone_number: '555-2345',
      email: 'lisa.brown@example.com',
      specialization: 'Orthopedic Surgeon',
    },
  ];

  getStaff(): Observable<Staff[]> {
    return of(this.mockStaff);
  }
}
