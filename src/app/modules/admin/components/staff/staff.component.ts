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
      this.staffMembers = staff;
    });
  }

  openForm(): void {
    // Show the form to add a new staff member
    this.showForm = true;
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

  closeForm(): void {
    // Close the form without saving
    this.showForm = false;
  }

  addStaff(): void {
    this.staffService.addStaff(this.newStaff);
    this.closeForm();
  }

  editStaff(_staffId: string): void {
    this.staffService.editStaff(this.editStaff);
  }

  deleteStaff(staffId: string): void {
    this.staffService.deleteStaff(staffId);
  }

  updateStatus(staffId: string, status: string): void {
    this.staffService.updateStaffStatus(staffId, status);
  }
}
