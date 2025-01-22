import { Component, OnInit } from '@angular/core';
import { AdminAppointmentService } from '../../services/appointment.service';
import { Appointment } from './appointments.model'; 
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  imports: [NgFor, FormsModule, NgIf]
})
export class AdminAppointmentsComponent implements OnInit {
appointment: Appointment | undefined;
toggleSort(arg0: string) {
throw new Error('Method not implemented.');
}
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  searchQuery = '';
  currentPage = 1;
  pageSize = 5;
  sortColumn = 'date';
  sortDirection = true;

  totalAppointments = 0;
  upcomingAppointments = 0;
  completedAppointments = 0;
  cancelledAppointments = 0;

  filterDate = '';
  filterStatus = '';

  editingAppointment: Appointment | null = null;  

  constructor(private appointmentService: AdminAppointmentService) {}

  ngOnInit(): void {
    this.getAppointments();  
  }

  getAppointments(): void {
    this.appointmentService.getAppointmentsObservable().subscribe((data) => {
      this.appointments = data;
      this.filteredAppointments = [...this.appointments];
      this.calculateAppointmentStats();
    });
  }

  saveAppointment(): void {
    if (this.editingAppointment) {
      const appointment = this.editingAppointment; 
  
      if (appointment.id) { 
        const index = this.appointments.findIndex(a => a.id === appointment.id);
        if (index !== -1) {
          this.appointments[index] = { ...appointment }; 
          this.appointmentService.updateAppointment(appointment);
        }
      } else {
        this.appointmentService.addAppointment(appointment);
        this.appointments.push(appointment); 
      }
  
      this.openDetailsModal(appointment);
  
      this.cancelEdit(); 
    }
  }
  

  editAppointment(appointment: Appointment): void {
    this.editingAppointment = { ...appointment }; 
  }

  cancelEdit(): void {
    this.editingAppointment = null;
  }

  openDetailsModal(appointment: Appointment): void {
    alert(`Details of ${appointment.patient}:\nDate: ${appointment.date}\nTime: ${appointment.time}\nDoctor: ${appointment.assignedDoctor}\nDiseases: ${appointment.diseases}\nDetails: ${appointment.details}`);
  }  

  // Export appointments to CSV
  exportAppointments(): void {
    const csvData = this.appointments.map(appointment => {
      return {
        Patient: appointment.patient,
        Date: appointment.date,
        Time: appointment.time,
        Status: appointment.status,
        Diseases: appointment.diseases,
        AssignedDoctor: appointment.assignedDoctor
      };
    });
    const csvContent = this.convertToCSV(csvData);
    this.downloadCSV(csvContent);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  updateAppointmentStatus(appointment: Appointment, newStatus: 'Upcoming' | 'Completed' | 'Cancelled'): void {
    if (appointment && newStatus) {
      this.appointmentService.updateAppointmentStatus(appointment, newStatus);
      this.getAppointments(); 
    }
  }

  deleteAppointment(appointment: Appointment): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(appointment);
      this.getAppointments();
    }
  }

  get paginatedAppointments(): Appointment[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredAppointments.slice(start, start + this.pageSize);
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const matchesDate = this.filterDate ? appointment.date === this.filterDate : true;
      const matchesStatus = this.filterStatus ? appointment.status === this.filterStatus : true;
      return matchesDate && matchesStatus;
    });
    this.sortAppointments();
    this.calculateAppointmentStats();
  }

  sortAppointments(): void {
    this.filteredAppointments.sort((a: Appointment, b: Appointment) => {
      const valueA = a[this.sortColumn as keyof Appointment];
      const valueB = b[this.sortColumn as keyof Appointment];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });
  }

  calculateAppointmentStats(): void {
    this.totalAppointments = this.appointments.length;
    this.upcomingAppointments = this.appointments.filter(
      (a) => a.status === 'Upcoming'
    ).length;
    this.completedAppointments = this.appointments.filter(
      (a) => a.status === 'Completed'
    ).length;
    this.cancelledAppointments = this.appointments.filter(
      (a) => a.status === 'Cancelled'
    ).length;
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]);
    const rows = data.map(row => Object.values(row).join(','));

    return [header.join(','), ...rows].join('\n');
  }

  downloadCSV(content: string): void {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'appointments.csv');
    link.click();
  }
}
