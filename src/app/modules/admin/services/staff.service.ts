import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Staff {
  staffId: string;
  name: string;
  role: string; // e.g., 'Doctor', 'Nurse', 'Technician'
  contact: string;
  status: string; // e.g., 'Active', 'On Leave', 'Retired'
  shifts: string; // e.g., 'Morning', 'Night', 'Rotation'
  priority: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminStaffService {
  editStaff(_editStaff: (staffId: string) => void) {
    throw new Error('Method not implemented.');
  }
  private staff: Staff[] = [
    {
      staffId: 'S001',
      name: 'Dr. John Doe',
      role: 'Doctor',
      contact: '+1234567890',
      status: 'Active',
      shifts: 'Morning',
      priority: 'Medium',
    },
    {
      staffId: 'S002',
      name: 'Nurse Jane Smith',
      role: 'Nurse',
      contact: '+9876543210',
      status: 'On Leave',
      shifts: 'Night',
      priority: 'High'
    },
    {
      staffId: 'S003',
      name: 'Mr. Mike Brown',
      role: 'Technician',
      contact: '+4567891230',
      status: 'Active',
      shifts: 'Rotation',
      priority: ''
    },
  ];

  private staffSubject = new BehaviorSubject<Staff[]>(this.staff);

  getStaffObservable() {
    return this.staffSubject.asObservable();
  }

  getStaff() {
    return this.staff;
  }

  addStaff(staff: Staff) {
    this.staff.unshift(staff);
    this.staffSubject.next(this.staff);
  }

  updateStaffStatus(staffId: string, status: string) {
    const index = this.staff.findIndex((s) => s.staffId === staffId);
    if (index !== -1) {
      this.staff[index].status = status;
      this.staffSubject.next(this.staff);
    }
  }

  deleteStaff(staffId: string) {
    this.staff = this.staff.filter((s) => s.staffId !== staffId);
    this.staffSubject.next(this.staff);
  }
}
