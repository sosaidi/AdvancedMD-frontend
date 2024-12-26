import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff.service'; 
import { Staff } from './staff.model'; 

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];
  isLoading: boolean = true;

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.fetchStaffList();
  }

  fetchStaffList(): void {
    this.staffService.getStaff().subscribe({
      next: (data) => {
        this.staffList = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching staff list:', error);
        this.isLoading = false;
      },
    });
  }
}
