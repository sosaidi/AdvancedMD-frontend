import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../services/staff.service';
import { Staff } from './staff.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  staff: Staff[] = [];

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.staffService.getStaff().subscribe((data) => {
      this.staff = data;
    });
  }
}
