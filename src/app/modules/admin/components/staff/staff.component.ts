import { Component, OnInit } from '@angular/core';
import { AdminStaffService, Staff } from '../../services/staff.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-staff',
  imports: [FormsModule, NgIf, CommonModule],
  standalone: true,
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  staffMembers: Staff[] = [];
  newStaff: Staff = {
    staffId: '',
    name: '',
    role: '',
    contact: '',
    status: 'Active', // Default value
    shifts: 'Morning', // Default value
    priority: 'Medium'
  };

  showForm = false;

  constructor(private staffService: AdminStaffService) {}

  ngOnInit(): void {
    // Fetch staff members on initialization
    this.loadStaffMembers();
  }

  loadStaffMembers(): void {
    this.staffService.getStaffObservable().subscribe((staff) => {
      this.staffMembers = staff; // Updating the staff list when changes occur
    });
  }

  openForm(staff?: Staff): void {
    this.showForm = true;
    if (staff) {
      this.newStaff = { ...staff }; // Pre-fill the form for editing
    } else {
      this.newStaff = {
        staffId: '',
        name: '',
        role: '',
        contact: '',
        status: 'Active',
        shifts: 'Morning',
        priority: 'Medium'
      };
    }
  }

  closeForm(): void {
    this.showForm = false;
  }

  addStaff(): void {
    this.staffService.addStaff(this.newStaff);
    this.closeForm();
  }

  editStaff(): void {
    this.staffService.updateStaff(this.newStaff.staffId, this.newStaff);
    this.closeForm();
  }

  deleteStaff(staffId: string): void {
    this.staffService.deleteStaff(staffId);
  }

  updateStatus(staffId: string, status: string): void {
    this.staffService.updateStaffStatus(staffId, status);
  }
}
