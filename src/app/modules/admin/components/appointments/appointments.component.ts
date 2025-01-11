import { Component, OnInit } from '@angular/core'
import { AdminAppointmentService } from '../../services/appointment.service'
import { NgFor } from '@angular/common'
import{ FormsModule } from '@angular/forms';

interface Appointment {
  patient: string
  date: string
  time: string
  status: string
  details: string
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  standalone: true,
  imports: [ NgFor, FormsModule ]
})
export class AdminAppointmentsComponent implements OnInit {
  appointments: Appointment[] = []
  filteredAppointments: Appointment[] = []
  searchQuery = ''
  currentPage = 1
  pageSize = 5
  sortColumn = 'date'
  sortDirection = true // true = ascending, false = descending

  totalAppointments = 0
  upcomingAppointments = 0
  completedAppointments = 0
  cancelledAppointments = 0

  constructor(private appointmentService: AdminAppointmentService) {}

  ngOnInit(): void {
    this.appointments = this.appointmentService.getAppointments()
    this.filteredAppointments = [...this.appointments]
    this.calculateAppointmentStats()
  }

  searchAppointments(): void {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patient.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        appointment.date.includes(this.searchQuery)
      return matchesSearch
    })
  }

  sortAppointments(): void {
    this.filteredAppointments.sort((a: Appointment, b: Appointment) => {
      const valueA = a[this.sortColumn as keyof Appointment]
      const valueB = b[this.sortColumn as keyof Appointment]

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      }

      return 0
    })
  }

  filterDate = ''
  filterStatus = ''

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const matchesDate = this.filterDate ? appointment.date === this.filterDate : true
      const matchesStatus = this.filterStatus ? appointment.status === this.filterStatus : true
      return matchesDate && matchesStatus
    })
    this.sortAppointments()
    this.calculateAppointmentStats()
  }

  changePage(page: number): void {
    this.currentPage = page
  }

  toggleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection
    } else {
      this.sortColumn = column
      this.sortDirection = true
    }
    this.sortAppointments()
  }

  get paginatedAppointments(): Appointment[] {
    const start = (this.currentPage - 1) * this.pageSize
    return this.filteredAppointments.slice(start, start + this.pageSize)
  }

  openDetailsModal(appointment: Appointment): void {
    console.log('View details for appointment', appointment)
  }

  calculateAppointmentStats(): void {
    this.totalAppointments = this.appointments.length
    this.upcomingAppointments = this.appointments.filter(
      (a) => a.status === 'Upcoming'
    ).length
    this.completedAppointments = this.appointments.filter(
      (a) => a.status === 'Completed'
    ).length
    this.cancelledAppointments = this.appointments.filter(
      (a) => a.status === 'Cancelled'
    ).length
  }

  exportAppointments(): void {
    const headers = ['Patient', 'Date', 'Time', 'Status', 'Details']
    const rows = this.appointments.map((appointment) => [
      appointment.patient,
      appointment.date,
      appointment.time,
      appointment.status,
      appointment.details,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows]
      .map((e) => e.map((field) => `"${field}"`).join(','))
      .join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'appointments.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  addAppointment(): void {
    const newAppointment: Appointment = {
      patient: 'New Patient',
      date: new Date().toISOString().slice(0, 10), // Today's date
      time: '9:00 AM',
      status: 'Upcoming',
      details: 'Newly added appointment.',
    }
    this.appointmentService.addAppointment(newAppointment)
    this.loadAppointments()
  }

  updateAppointmentStatus({ appointment, newStatus }: { appointment: Appointment; newStatus: string }): void {
    this.appointmentService.updateAppointmentStatus(appointment, newStatus)
    this.loadAppointments()
  }

  private loadAppointments(): void {
    this.appointments = this.appointmentService.getAppointments()
    this.filteredAppointments = [...this.appointments]
    this.calculateAppointmentStats()
  }
}
