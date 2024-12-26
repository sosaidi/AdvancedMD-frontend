import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard.service';
import { DashboardData } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData: DashboardData ={
    totalPatients: 20,
    totalStaff: 30,
    totalRooms: 25,
    totalAppointments: 10,
    activeRooms: 15,
    activeAppointments: 8,
    availableRooms: 10,

  };
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }


  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.dashboardData = data;
    });
  }
}
