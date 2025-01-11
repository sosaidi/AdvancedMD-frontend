import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import Chart from 'chart.js/auto';
import { AdminPatientsService } from '../../services/patients.service';
import { AdminAppointmentService } from '../../services/appointment.service';
import { AdminStaffService } from '../../services/staff.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [ NgForOf ],
  standalone: true,
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  totalPatients: number = 0;
  totalStaff: number = 0;
  pendingPayments: number = 0;
  patients: any[] = [];
  appointments: any[] = [];
  staffMembers: any[] = [];

  appointmentsChart: any;
  patientsChart: any;

  constructor(
    private patientsService: AdminPatientsService,
    private appointmentsService: AdminAppointmentService,
    private staffService: AdminStaffService
  ) {}

  ngOnInit(): void {
    this.getPatients();
    this.getAppointments();
    this.getStaffMembers();
  }

  ngAfterViewInit(): void {
    this.initPatientsChart();
    this.initAppointmentsChart();
  }

  // Fetch patients data
  getPatients(): void {
    this.patientsService.getPatientsObservable().subscribe((data) => {
      this.patients = data;
      this.totalPatients = data.length;
    });
  }

  // Fetch appointments data
  getAppointments(): void {
    this.appointmentsService.getAppointmentsObservable().subscribe((data) => {
      this.appointments = data;
    });
  }

  // Fetch staff data
  getStaffMembers(): void {
    this.staffService.getStaffObservable().subscribe((data) => {
      this.staffMembers = data;
      this.totalStaff = data.length;
    });
  }

  private initPatientsChart(): void {
    const ctx = document.getElementById('patientsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Active Patients', 'Recovered Patients'],
          datasets: [
            {
              data: [70, 30],
              backgroundColor: ['#D8F3DC', '#FDE2E4'],
              hoverBackgroundColor: ['#A8DADC', '#FFA5A5'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  }

  private initAppointmentsChart(): void {
    const ctx = document.getElementById('appointmentsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Total', 'Upcoming', 'Completed', 'Cancelled'],
          datasets: [
            {
              label: 'Appointments Overview',
              data: [
                this.appointments.length,
                this.appointments.filter((a) => a.status === 'Upcoming').length,
                this.appointments.filter((a) => a.status === 'Completed').length,
                this.appointments.filter((a) => a.status === 'Cancelled').length,
              ],
              borderColor: '#A3C4F3',
              backgroundColor: 'rgba(163, 196, 243, 0.3)',
              pointBackgroundColor: '#A3C4F3',
              pointHoverBackgroundColor: '#7399E0',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(200, 200, 200, 0.2)' },
              ticks: {
                stepSize: 1,
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      });
    }
  }
}
