import { Component, AfterViewInit, OnInit } from '@angular/core'
import Chart from 'chart.js/auto'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { TodoService } from '../../services/todo.service'
import {
  Appointment,
  AppointmentService,
} from '../../services/appointments.service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, RouterLink],
})
export class DoctorDashboardComponent implements OnInit, AfterViewInit {
  loading = true
  dailySchedule: { time: string; task: string }[] = []
  healthMetrics: { metric: string; value: string }[] = []
  motivationalQuote = ''
  currentTime = ''
  appointments: Appointment[] = []
  weeklyMetrics: {
    total: number
    upcoming: number
    completed: number
    cancelled: number
  } = {
    total: 0,
    upcoming: 0,
    completed: 0,
    cancelled: 0,
  }

  appointmentsChart: any

  ngOnInit(): void {
    this.loading = false
    this.initializeMockData()
    this.updateClock()
    this.fetchMotivationalQuote()
    this.startQuoteUpdater()
    this.appointmentService
      .getAppointmentsObservable()
      .subscribe((appointments) => {
        this.appointments = appointments
        this.calculateWeeklyMetrics()
        this.updateAppointmentsChart()
      })
  }

  constructor(
    private http: HttpClient,
    private todoService: TodoService,
    private appointmentService: AppointmentService
  ) {}

  get todos() {
    return this.todoService.getTodos()
  }

  private initializeMockData(): void {
    this.dailySchedule = [
      { time: '8:00 AM', task: 'Morning rounds' },
      { time: '10:00 AM', task: 'Surgery for Patient X' },
      { time: '1:00 PM', task: 'Consultation with Patient Y' },
      { time: '3:30 PM', task: 'Team meeting' },
    ]

    this.healthMetrics = [
      { metric: "Today's BMI Alerts", value: '5 Patients' },
      { metric: 'Critical Patients', value: '2 Patients' },
      { metric: 'Prescriptions Due', value: '8 Pending' },
    ]
  }

  ngAfterViewInit(): void {
    this.initPatientsChart()
    this.initAppointmentsChart()
  }

  private fetchMotivationalQuote(): void {
    this.http.get<any>('https://api.quotable.io/random').subscribe(
      (response) => {
        this.motivationalQuote = `“${response.content}” – ${response.author}`
      },
      (error) => {
        console.error('Error fetching quote', error)
        this.motivationalQuote =
          '“Wherever the art of medicine is loved, there is also a love of humanity.” – Hippocrates'
      }
    )
  }

  private startQuoteUpdater(): void {
    setInterval(() => {
      this.fetchMotivationalQuote()
    }, 3600000)
  }

  private updateClock(): void {
    setInterval(() => {
      const now = new Date()
      this.currentTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    }, 1000)
  }

  private initPatientsChart(): void {
    const ctx = document.getElementById('patientsChart') as HTMLCanvasElement
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Active Patients', 'Recovered Patients'],
          datasets: [
            {
              data: [70, 30],
              backgroundColor: ['#D8F3DC', '#FDE2E4'],
              hoverBackgroundColor: ['#A8DADC', '#FFA5A5'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      })
    }
  }

  private calculateWeeklyMetrics(): void {
    const startOfWeek = this.getStartOfWeek()
    const endOfWeek = this.getEndOfWeek()

    const weeklyAppointments = this.appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek
    })

    this.weeklyMetrics.total = weeklyAppointments.length
    this.weeklyMetrics.upcoming = weeklyAppointments.filter(
      (a) => a.status === 'Upcoming'
    ).length
    this.weeklyMetrics.completed = weeklyAppointments.filter(
      (a) => a.status === 'Completed'
    ).length
    this.weeklyMetrics.cancelled = weeklyAppointments.filter(
      (a) => a.status === 'Cancelled'
    ).length
  }

  private getStartOfWeek(): Date {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const start = new Date(now)
    start.setDate(now.getDate() - dayOfWeek + 1) // Start from Monday
    start.setHours(0, 0, 0, 0)
    return start
  }

  private getEndOfWeek(): Date {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const end = new Date(now)
    end.setDate(now.getDate() - dayOfWeek + 7) // End on Sunday
    end.setHours(23, 59, 59, 999)
    return end
  }

  private initAppointmentsChart(): void {
    const ctx = document.getElementById(
      'appointmentsChart'
    ) as HTMLCanvasElement
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Total', 'Upcoming', 'Completed', 'Cancelled'], // Data points
          datasets: [
            {
              label: 'Appointments Overview',
              data: [
                this.appointments.length, // Total appointments
                this.appointments.filter((a) => a.status === 'Upcoming').length, // Upcoming
                this.appointments.filter((a) => a.status === 'Completed')
                  .length, // Completed
                this.appointments.filter((a) => a.status === 'Cancelled')
                  .length, // Cancelled
              ],
              borderColor: '#A3C4F3', // Pastel blue
              backgroundColor: 'rgba(163, 196, 243, 0.3)', // Light blue fill
              pointBackgroundColor: '#A3C4F3', // Blue dots
              pointHoverBackgroundColor: '#7399E0', // Darker blue hover dots
              borderWidth: 2,
              tension: 0.4, // Smooth curves
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false, // No legend for simplicity
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // Cleaner look
              },
              ticks: {
                font: {
                  size: 14,
                  family: "'Helvetica', sans-serif", // Professional font
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(200, 200, 200, 0.2)', // Subtle grid lines
              },
              ticks: {
                stepSize: 1, // Step by 1 for better readability
                font: {
                  size: 14,
                  family: "'Helvetica', sans-serif", // Professional font
                },
              },
            },
          },
        },
      })
    }
  }

  private updateAppointmentsChart(): void {
    if (this.appointmentsChart) {
      this.appointmentsChart.data.datasets[0].data = [this.weeklyMetrics.total]
      this.appointmentsChart.data.datasets[1].data = [
        this.weeklyMetrics.upcoming,
      ]
      this.appointmentsChart.data.datasets[2].data = [
        this.weeklyMetrics.completed,
      ]
      this.appointmentsChart.data.datasets[3].data = [
        this.weeklyMetrics.cancelled,
      ]
      this.appointmentsChart.update()
    }
  }
}
