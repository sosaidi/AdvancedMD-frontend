import { Component, AfterViewInit, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
})
export class DoctorDashboardComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  notifications: string[] = [];
  appointments: any[] = [];
  patients: any[] = [];
  visits: any[] = [];
  payments: any[] = [];
  pendingPayments: number = 300;
  todos: { task: string; priority: string }[] = [];

  ngOnInit(): void {
    this.loading = false; // Simulate loading complete
    this.initializeMockData();
  }

  private initializeMockData(): void {
    this.notifications = [
      'Patient X scheduled for surgery tomorrow.',
      'New appointment added for John Doe.',
      'Pending payment cleared by Patient Y.',
    ];

    this.appointments = [
      { patient: 'John Doe', time: '10:00 AM' },
      { patient: 'Jane Smith', time: '11:00 AM' },
      { patient: 'Lisa Brown', time: '12:30 PM' },
    ];

    this.patients = [
      { name: 'John Doe', status: 'Active' },
      { name: 'Jane Smith', status: 'Inactive' },
      { name: 'Lisa Brown', status: 'Active' },
    ];

    this.visits = [
      { patient: 'John Doe', reason: 'Routine Check-up', time: '9:30 AM' },
      { patient: 'Jane Smith', reason: 'Follow-up', time: '10:30 AM' },
    ];

    this.payments = [
      { patient: 'John Doe', amount: 200, status: 'Paid' },
      { patient: 'Jane Smith', amount: 150, status: 'Pending' },
    ];

    this.todos = [
      { task: 'Review patient charts', priority: 'High' },
      { task: 'Follow-up with patients', priority: 'Medium' },
      { task: 'Organize medical supplies', priority: 'Low' },
    ];
  }

  ngAfterViewInit(): void {
    this.initPatientsChart();
    this.initAppointmentsChart();
  }

  private initPatientsChart(): void {
    const ctx = document.getElementById('patientsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['New Patients', 'Returning Patients'],
          datasets: [
            {
              data: [60, 40],
              backgroundColor: ['#A7D8DE', '#F5A8A8'],
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
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Appointments',
              data: [5, 10, 15, 20, 25, 30],
              backgroundColor: '#D6A2E8',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
