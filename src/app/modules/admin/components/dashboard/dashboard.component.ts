import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminAppointmentService } from '../../services/appointment.service';
import { AdminRoomsService } from '../../services/rooms.service';
import { PaymentsService } from '../../services/payments.service';
import Chart from 'chart.js/auto';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgFor, NgIf, FormsModule]
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  totalRooms: number = 3; // Example number of rooms
  availableRooms: number = 2;
  roomsUnderMaintenance: number = 1;
  pendingPayments: number = 1;
  payments: any[] = [
    { id: 'P001', status: 'Paid' },
    { id: 'P002', status: 'Pending' }
  ];
  appointments: any[] = [
    { patientName: 'John Doe', assignedDoctor: 'Dr. Jacob Ryan', date: '2025-01-10', diseases: 'Fever' },
    { patientName: 'Jane Smith', assignedDoctor: 'Dr. Rajesh', date: '2025-01-11', diseases: 'Cholera' }
  ];
  upcomingAppointments: number = 1;
  completedAppointments: number = 0;

  // Variables for editing
  editingPayment: any = null;
  editingAppointment: any = null;
  editingRoom: any = null;
  rooms: any[] = [
    { id: 'R001', name: 'Room A', status: 'Available' },
    { id: 'R002', name: 'Room B', status: 'Occupied' },
    { id: 'R003', name: 'Room C', status: 'Under Maintenance' }
  ];

  constructor(
    private roomsService: AdminRoomsService,
    private appointmentsService: AdminAppointmentService,
    private paymentsService: PaymentsService
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.getPayments();
    this.getAppointments();
  }

  ngAfterViewInit(): void {
    this.initRoomAvailabilityChart();
    this.initAppointmentsChart();
  }

  getRooms() {
    // Simulate fetching room data
    this.rooms = this.rooms; 
  }

  getPayments() {
    this.payments = this.payments;
    this.pendingPayments = this.payments.filter((payment) => payment.status === 'Pending').length;
  }

  getAppointments() {
    this.appointments = this.appointments;
    this.upcomingAppointments = this.appointments.filter((appointment) => appointment.status === 'Upcoming').length;
    this.completedAppointments = this.appointments.filter((appointment) => appointment.status === 'Completed').length;
  }

  editPayment(payment: any): void {
    this.editingPayment = { ...payment }; 
  }

  savePayment() {
    const index = this.payments.findIndex((payment) => payment.id === this.editingPayment.id);
    if (index !== -1) {
      this.payments[index] = { ...this.editingPayment }; 
      this.pendingPayments = this.payments.filter((payment) => payment.status === 'Pending').length;
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingPayment = null;
    this.editingAppointment = null;
    this.editingRoom = null;
  }

  deletePayment(payment: any): void {
    this.payments = this.payments.filter((p) => p.id !== payment.id);
    this.pendingPayments = this.payments.filter((payment) => payment.status === 'Pending').length;
  }

  editAppointment(appointment: any): void {
    this.editingAppointment = { ...appointment };
  }

  saveAppointment() {
    const index = this.appointments.findIndex((appointment) => appointment.patientName === this.editingAppointment.patientName);
    if (index !== -1) {
      this.appointments[index] = { ...this.editingAppointment }; 
    }
    this.cancelEdit();
  }

  deleteAppointment(appointment: any): void {
    this.appointments = this.appointments.filter((a) => a.patientName !== appointment.patientName);
    this.upcomingAppointments = this.appointments.filter((appointment) => appointment.status === 'Upcoming').length;
  }

  editRoom(room: any): void {
    this.editingRoom = { ...room };
  }

  saveRoom(): void {
    const index = this.rooms.findIndex((room) => room.id === this.editingRoom.id);
    if (index !== -1) {
      this.rooms[index] = { ...this.editingRoom };
    }
    this.cancelEdit();
  }

  deleteRoom(room: any): void {
    this.rooms = this.rooms.filter((r) => r.id !== room.id);
  }

  initAppointmentsChart() {
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
                this.upcomingAppointments,
                this.completedAppointments,
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

  initRoomAvailabilityChart() {
    const ctx = document.getElementById('roomsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Available', 'Occupied', 'Under Maintenance'],
          datasets: [
            {
              data: [
                this.availableRooms,
                this.totalRooms - this.availableRooms - this.roomsUnderMaintenance,
                this.roomsUnderMaintenance,
              ],
              backgroundColor: ['#4CAF50', '#FF9800', '#B0BEC5'],
              borderWidth: 0.5,
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
        },
      });
    }
  }
}
