import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private upcomingAppointmentsSource = new BehaviorSubject<
    { date: string; time: string; reason: string }[]
  >([])
  upcomingAppointments$ = this.upcomingAppointmentsSource.asObservable()

  addAppointment(appointment: { date: string; time: string; reason: string }) {
    const currentAppointments = this.upcomingAppointmentsSource.value
    this.upcomingAppointmentsSource.next(
      [...currentAppointments, appointment].sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`)
        const dateB = new Date(`${b.date}T${b.time}`)
        return dateA.getTime() - dateB.getTime()
      })
    )
  }

  cancelAppointment(appointment: {
    date: string
    time: string
    reason: string
  }) {
    const currentAppointments = this.upcomingAppointmentsSource.value.filter(
      (a) => !(a.date === appointment.date && a.time === appointment.time)
    )
    this.upcomingAppointmentsSource.next(currentAppointments)
  }
}
