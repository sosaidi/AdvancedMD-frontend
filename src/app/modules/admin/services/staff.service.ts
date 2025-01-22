import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Staff {
  staffId: string;
  name: string;
  role: string;
  contact: string;
  status: string;
  shifts: string;
  priority: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminStaffService {
  updateStaffStatus(staffId: string, status: string) {
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
      priority: 'High',
    },
    {
      staffId: 'S003',
      name: 'Mr. Mike Brown',
      role: 'Technician',
      contact: '+4567891230',
      status: 'Active',
      shifts: 'Rotation',
      priority: 'Low',
    },
  ];

  private staffSubject = new BehaviorSubject<Staff[]>(this.staff);

  getStaffObservable() {
    return this.staffSubject.asObservable();
  }

  getStaff() {
    return this.staff;
  }

  addStaff(staff: Staff): void {
    staff.staffId = 'S' + (this.staff.length + 1).toString().padStart(3, '0');  
    this.staff.unshift(staff); 
    this.staffSubject.next(this.staff); 
  }
  

  updateStaff(staffId: string, updatedStaff: Staff) {
    const index = this.staff.findIndex((s) => s.staffId === updatedStaff.staffId);
    if (index !== -1) {
      this.staff[index] = updatedStaff;
      this.staffSubject.next(this.staff);
    }
  }

  deleteStaff(staffId: string) {
    this.staff = this.staff.filter((s) => s.staffId !== staffId);
    this.staffSubject.next(this.staff);
  }
}
