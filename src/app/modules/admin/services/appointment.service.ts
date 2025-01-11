import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Appointment {
  patient: string;
  date: string;
  time: string;
  status: string;
  details: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminAppointmentService {
  private appointments: Appointment[] = [
    {
      patient: 'John Doe',
      date: '2025-01-10',
      time: '10:00 AM',
      status: 'Upcoming',
      details: 'Routine check-up for cholesterol levels.',
    },
    {
      patient: 'Jane Smith',
      date: '2025-01-11',
      time: '02:00 PM',
      status: 'Completed',
      details: 'Follow-up after surgery.',
    },
  ];

  private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.appointments);

  // Get all appointments
  getAppointmentsObservable() {
    return this.appointmentsSubject.asObservable();
  }

  // Return the current appointments list
  getAppointments() {
    return this.appointments;
  }

  // Add a new appointment
  addAppointment(appointment: Appointment) {
    this.appointments.unshift(appointment); // Adds the new appointment at the beginning of the array
    this.appointmentsSubject.next(this.appointments);
  }

  // Update an appointment status
  updateAppointmentStatus(appointment: Appointment, newStatus: string) {
    const index = this.appointments.findIndex(a => a.patient === appointment.patient && a.date === appointment.date);
    if (index !== -1) {
      this.appointments[index].status = newStatus;
      this.appointmentsSubject.next(this.appointments);
    }
  }

  // Delete an appointment by patient name and date (or any unique property)
  deleteAppointment(appointment: Appointment) {
    this.appointments = this.appointments.filter(a => a.patient !== appointment.patient || a.date !== appointment.date);
    this.appointmentsSubject.next(this.appointments);
  }
}
