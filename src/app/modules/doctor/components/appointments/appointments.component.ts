import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgClass, NgForOf, NgIf } from '@angular/common'

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
  imports: [FormsModule, NgClass, NgIf, NgForOf],
})
export class AppointmentsComponent implements OnInit {
  appointments: {
    patient: string
    date: string
    time: string
    status: string
    details: string
  }[] = []
  filteredAppointments: {
    patient: string
    date: string
    time: string
    status: string
    details: string
  }[] = []
  searchQuery = ''
  currentPage = 1
  pageSize = 5
  sortColumn = 'date'
  sortDirection = true // true = ascending, false = descending
  selectedAppointment = null

  ngOnInit(): void {
    // Mock Data
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
    this.filteredAppointments = this.appointments.slice()
  }

  searchAppointments(): void {
    this.filteredAppointments = this.appointments.filter(
      (appointment) =>
        appointment.patient
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        appointment.date.includes(this.searchQuery)
    )
    this.sortAppointments()
  }

  sortAppointments(): void {
    this.filteredAppointments.sort((a: Appointment, b: Appointment) => {
      const valueA = a[this.sortColumn as keyof Appointment]
      const valueB = b[this.sortColumn as keyof Appointment]

      // If the value is a string, use localeCompare
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA)
      }

      // If the value is a date or time, compare as dates
      if (this.sortColumn === 'date' || this.sortColumn === 'time') {
        const dateA = new Date(valueA as string).getTime()
        const dateB = new Date(valueB as string).getTime()
        return this.sortDirection ? dateA - dateB : dateB - dateA
      }

      // Default numeric comparison for other cases (if needed in the future)
      return 0
    })
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

  get paginatedAppointments(): any[] {
    const start = (this.currentPage - 1) * this.pageSize
    return this.filteredAppointments.slice(start, start + this.pageSize)
  }

  openDetailsModal(appointment: any): void {
    this.selectedAppointment = appointment
  }

  closeDetailsModal(): void {
    this.selectedAppointment = null
  }
}
