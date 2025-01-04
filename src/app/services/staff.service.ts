import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Staff } from '../modules/admin/components/staff/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private staff: Staff[] = [
    {
      staff_id: 1,
      user_id: 1,
      name: 'Dr. John Doe',
      specialization: 'Cardiologist',
      phone_number: '555-2345',
      status: 'Active',
    },
  ];

  getStaff(): Observable<Staff[]> {
    return of(this.staff);
  }
}
