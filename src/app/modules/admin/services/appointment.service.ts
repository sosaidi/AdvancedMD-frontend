import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Appointment } from '../components/appointments/appointments.model'; 

@Injectable({
  providedIn: 'root',
})
export class AdminAppointmentService {
  private appointments: Appointment[] = [
    {
      id: 1,
      patient: 'John Doe',
      date: '2025-01-10',
      time: '10:00 AM',
      status: 'Upcoming',
      details: 'Fever and flu symptoms',
      diseases: 'Fever',
      assignedDoctor: 'Dr. Jacob Ryan',
    },
    {
      id: 2,
      patient: 'Jane Smith',
      date: '2025-01-11',
      time: '02:00 PM',
      status: 'Completed',
      details: 'Cholera and dehydration',
      diseases: 'Cholera',
      assignedDoctor: 'Dr. Rajesh',
    },
  ];

  private appointmentsSubject = new BehaviorSubject<Appointment[]>(this.appointments);

  getAppointmentsObservable() {
    return this.appointmentsSubject.asObservable();
  }

  getAppointments() {
    return of(this.appointments);
  }

  // Add an appointment
  addAppointment(newAppointment: Appointment) {
    newAppointment.id = this.appointments.length + 1; // Generate ID for new appointment
    this.appointments.push(newAppointment);
    this.appointmentsSubject.next(this.appointments);
  }

  // Update an appointment
  updateAppointment(updatedAppointment: Appointment) {
    const index = this.appointments.findIndex(
      (a) => a.id === updatedAppointment.id
    );
    if (index !== -1) {
      this.appointments[index] = { ...updatedAppointment };
      this.appointmentsSubject.next(this.appointments);
    }
  }

  // Delete an appointment
  deleteAppointment(appointment: Appointment) {
    const index = this.appointments.findIndex(
      (a) => a.id === appointment.id
    );
    if (index !== -1) {
      this.appointments.splice(index, 1);
      this.appointmentsSubject.next(this.appointments);
    }
  }

  // Update an appointment status
  updateAppointmentStatus(appointment: Appointment, newStatus: 'Upcoming' | 'Completed' | 'Cancelled') {
    const index = this.appointments.findIndex(
      (a) => a.id === appointment.id
    );
    if (index !== -1) {
      this.appointments[index].status = newStatus;
      this.appointmentsSubject.next(this.appointments);
    }
    return of(null);
  }
}
