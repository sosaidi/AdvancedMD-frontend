import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { AppointmentService } from '../../services/appointments.service'

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
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, NgForOf],
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = []
  filteredAppointments: Appointment[] = []
  searchQuery = ''
  currentPage = 1
  pageSize = 5
  sortColumn = 'date'
  sortDirection = true // true = ascending, false = descending
  selectedAppointment: Appointment | null = null

  totalAppointments = 0
  upcomingAppointments = 0
  completedAppointments = 0
  cancelledAppointments = 0

  filterDate = ''
  filterStatus = ''

  showAddForm = false
  newAppointment: Appointment = {
    patient: '',
    date: '',
    time: '',
    status: 'Upcoming',
    details: '',
  }

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointments = [
      {
        patient: 'John Doe',
        date: '2024-12-14',
        time: '10:00 AM',
        status: 'Upcoming',
        details: 'Routine check-up for cholesterol levels.',
      },
      {
        patient: 'Jane Smith',
        date: '2024-12-14',
        time: '11:30 AM',
        status: 'Completed',
        details: 'Follow-up after surgery.',
      },
      {
        patient: 'Lisa Brown',
        date: '2024-12-13',
        time: '12:00 PM',
        status: 'Upcoming',
        details: 'Consultation regarding hypertension.',
      },
      {
        patient: 'David Miller',
        date: '2024-12-12',
        time: '2:00 PM',
        status: 'Completed',
        details: 'Post-op check-up.',
      },
    ]

    // Then load from service
    this.filteredAppointments = this.appointments.slice()
    this.calculateAppointmentStats()
    this.appointments = this.appointmentService.getAppointments()
    this.loadAppointments()
  }

  openAddForm(): void {
    this.showAddForm = true
    // Clear the form each time
    this.newAppointment = {
      patient: '',
      date: '',
      time: '',
      status: 'Upcoming',
      details: '',
    }
  }

  closeAddForm(): void {
    this.showAddForm = false
  }

  submitAppointment(): void {
    // Add new appointment to the service
    this.appointmentService.addAppointment(this.newAppointment)
    // Hide the modal
    this.closeAddForm()
    // Reload data
    this.loadAppointments()
  }

  searchAppointments(): void {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patient.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        appointment.date.includes(this.searchQuery)
      const matchesDate = this.filterDate ? appointment.date === this.filterDate : true
      const matchesStatus = this.filterStatus ? appointment.status === this.filterStatus : true
      return matchesSearch && matchesDate && matchesStatus
    })
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patient.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        appointment.date.includes(this.searchQuery)

      const matchesDate = this.filterDate
        ? new Date(appointment.date).toISOString().slice(0, 10) === this.filterDate
        : true

      const matchesStatus = this.filterStatus ? appointment.status === this.filterStatus : true
      return matchesSearch && matchesDate && matchesStatus
    })

    this.sortAppointments()
    this.calculateAppointmentStats()
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

  sortAppointments(): void {
    this.filteredAppointments.sort((a: Appointment, b: Appointment) => {
      const valueA = a[this.sortColumn as keyof Appointment]
      const valueB = b[this.sortColumn as keyof Appointment]

      // If string => localeCompare
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      // If date/time => compare as dates
      if (this.sortColumn === 'date' || this.sortColumn === 'time') {
        const dateA = new Date(valueA as string).getTime()
        const dateB = new Date(valueB as string).getTime()
        return this.sortDirection ? dateA - dateB : dateB - dateA
      }

      return 0
    })
  }

  get paginatedAppointments(): Appointment[] {
    const start = (this.currentPage - 1) * this.pageSize
    return this.filteredAppointments.slice(start, start + this.pageSize)
  }

  changePage(page: number): void {
    this.currentPage = page
  }

  openDetailsModal(appointment: Appointment): void {
    this.selectedAppointment = appointment
  }

  closeDetailsModal(): void {
    this.selectedAppointment = null
  }

  private loadAppointments(): void {
    this.appointments = this.appointmentService.getAppointments()
    // Filter or copy to keep table updated
    this.filteredAppointments = [...this.appointments]
    this.calculateAppointmentStats()
  }

  private calculateAppointmentStats(): void {
    this.totalAppointments = this.appointments.length
    this.upcomingAppointments = this.appointments.filter((a) => a.status === 'Upcoming').length
    this.completedAppointments = this.appointments.filter((a) => a.status === 'Completed').length
    this.cancelledAppointments = this.appointments.filter((a) => a.status === 'Cancelled').length
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

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.map((field) => `"${field}"`).join(',')).join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'appointments.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  updateAppointmentStatus({ appointment, newStatus, }: {
    appointment: Appointment
    newStatus: string
  }): void {
    this.appointmentService.updateAppointmentStatus(appointment, newStatus)
    this.loadAppointments()
  }
}
