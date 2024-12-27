import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface Appointment {
  patient: string
  date: string
  time: string
  status: string
  details: string
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments: Appointment[] = [
    {
      patient: 'John Doe',
      date: '2024-12-18',
      time: '10:00 AM',
      status: 'Upcoming',
      details: 'Routine check-up for cholesterol levels.',
    },
    {
      patient: 'Jane Smith',
      date: '2024-12-19',
      time: '11:30 AM',
      status: 'Completed',
      details: 'Follow-up after surgery.',
    },
    {
      patient: 'Lisa Brown',
      date: '2024-12-20',
      time: '2:00 PM',
      status: 'Upcoming',
      details: 'Consultation regarding hypertension.',
    },
    {
      patient: 'David Miller',
      date: '2024-12-17',
      time: '9:00 AM',
      status: 'Cancelled',
      details: 'Post-op check-up.',
    },
  ]

  // BehaviorSubject to enable real-time updates
  private appointmentsSubject = new BehaviorSubject<Appointment[]>(
    this.appointments
  )

  getAppointmentsObservable() {
    return this.appointmentsSubject.asObservable()
  }

  getAppointments() {
    return this.appointments
  }

  addAppointment(appointment: Appointment) {
    this.appointments.unshift(appointment)
    this.appointmentsSubject.next(this.appointments) // Notify all subscribers
  }

  updateAppointmentStatus(appointment: Appointment, newStatus: string) {
    const index = this.appointments.findIndex((a) => a === appointment)
    if (index !== -1) {
      this.appointments[index].status = newStatus
      this.appointmentsSubject.next(this.appointments) // Notify all subscribers
    }
  }

  deleteAppointment(appointment: Appointment) {
    this.appointments = this.appointments.filter((a) => a !== appointment)
    this.appointmentsSubject.next(this.appointments) // Notify all subscribers
  }
}
