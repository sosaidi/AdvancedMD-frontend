import { Component } from '@angular/core'
import { NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AppointmentsService } from '../../services/appointment.service'
import { NameService } from '../../services/name.service'

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent {
  activeTab: string = 'book' // Default tab
  newAppointment: {
    date: string
    time: string
    reason: string
    firstName: string
    lastName: string
    email: string
    phone: string
  } = {
    date: '',
    time: '',
    reason: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  }
  upcomingAppointments: { date: string; time: string; reason: string }[] = []
  pastAppointments: { date: string; time: string; reason: string }[] = []

  constructor(
    public appointmentsService: AppointmentsService,
    public nameService: NameService
  ) {}

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  // ToDo
  bookAppointment(event: Event) {
    event.preventDefault()
    const { date, time, reason } = this.newAppointment
    // Add the new appointment to upcoming appointments
    this.appointmentsService.addAppointment({ date, time, reason })
    // Clear the form after booking
    this.clearForm()
    alert('Appointment booked successfully!')
  }

  clearForm() {
    this.newAppointment = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: new Date().toISOString().split('T')[0], // Reset to today's date
      time: '',
      reason: '',
    }
  }

  cancelAppointment(appointment: {
    date: string
    time: string
    reason: string
  }): void {
    this.appointmentsService.cancelAppointment(appointment)
    alert('Appointment canceled.')
  }

  ngOnInit(): void {
    this.nameService.profile$.subscribe((profile) => {
      this.newAppointment = {
        ...this.newAppointment,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        date: new Date().toISOString().split('T')[0], // Today's date
      }
    })

    this.appointmentsService.upcomingAppointments$.subscribe((appointments) => {
      const now = new Date()
      this.upcomingAppointments = appointments.filter(
        (appointment) =>
          new Date(`${appointment.date}T${appointment.time}`) >= now
      )
      this.pastAppointments = appointments.filter(
        (appointment) =>
          new Date(`${appointment.date}T${appointment.time}`) < now
      )
    })
    // Will be commented out (might still be needed)
    /*this.pastAppointments = [
      { date: '2024-12-10', time: '10:00', reason: 'Routine Checkup' },
      { date: '2024-12-12', time: '14:30', reason: 'Follow-up' },
    ];*/
  }
}
