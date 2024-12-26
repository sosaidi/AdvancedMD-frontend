import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment.service';
import { Appointment } from './appointment.model';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  isLoading = true;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        this.isLoading = false;
      },
    });
  }
}
