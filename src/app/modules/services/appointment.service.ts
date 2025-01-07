import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface Appointment {
  id: number // Unique identifier for appointments
  patient: string
  doctor: string
  date: string
  time: string
  status: string
  details: string
}

@Injectable({
  providedIn: 'root',
})
export class SharedAppointmentService {
  private appointmentsSource = new BehaviorSubject<Appointment[]>([])
  appointments$ = this.appointmentsSource.asObservable()

  // Add an appointment to the shared state
  addAppointment(appointment: Appointment): void {
    const currentAppointments = this.appointmentsSource.value
    this.appointmentsSource.next([...currentAppointments, appointment])
  }

  // Get all appointments (for synchronous access)
  getAppointments(): Appointment[] {
    return this.appointmentsSource.value
  }

  // Update an existing appointment
  updateAppointment(updatedAppointment: Appointment): void {
    const updatedAppointments = this.appointmentsSource.value.map(
      (appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
    )
    this.appointmentsSource.next(updatedAppointments)
  }

  // Delete an appointment by ID
  deleteAppointment(appointmentId: number): void {
    const filteredAppointments = this.appointmentsSource.value.filter(
      (appointment) => appointment.id !== appointmentId
    )
    this.appointmentsSource.next(filteredAppointments)
  }
}
