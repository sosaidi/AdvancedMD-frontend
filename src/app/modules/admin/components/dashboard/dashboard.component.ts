import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  patientsCount = 0;
  staffCount = 0;
  roomsAvailable = 0;
  paymentsPending = 0;

  constructor() {}

  ngOnInit(): void {
    // Initialize data here
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    // Replace with actual logic to fetch data
    this.patientsCount = 10; 
    this.staffCount = 5; 
    this.roomsAvailable = 8; 
    this.paymentsPending = 3; 
  }
}
