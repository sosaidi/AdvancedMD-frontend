import { Component, AfterViewInit, OnInit } from '@angular/core'
import Chart from 'chart.js/auto'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LabResultsService } from '../../services/lab-results.service'
import { EmergencyContactsService } from '../../services/contact.service'
import { LabResultsComponent } from '../lab-results/lab-results.component'
import { MedicalInfoService } from '../../services/medical.service'

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, FormsModule, LabResultsComponent],
})
export class PatientDashboardComponent implements OnInit, AfterViewInit {
  loading = true
  bloodPressureReadings: {
    date: string
    systolic: number
    diastolic: number
  }[] = []
  prescriptions: { name: string; status: string }[] = []

  appointments: { date: string; time: string; doctor: string }[] = []
  wellnessTip = ''
  heartRate = 72
  healthGoals: { goal: string; progress: number; target: number }[] = []

  labTests: { test: string; status: string; date: string }[] = []
  allergies: string[] = []
  healthHistory: { date: string; detail: string }[] = []
  familyHealth: { name: string; metric: string; value: string }[] = []

  waterIntake = 0
  waterTarget = 8

  stepsProgress = 0
  stepsTarget = 10000

  reminders: {
    message: string
    time: string
    completed: boolean
    timestamp: number
  }[] = []
  activeReminders: any[] = []
  newReminder = { message: '', time: '', timestamp: 0 }

  bloodPressureInfo: string | null = null
  showDetails = false

  private systolicLimit = 130
  private diastolicLimit = 80

  constructor(
    public labResultsService: LabResultsService,
    public contactsService: EmergencyContactsService,
    private medicalInfoService: MedicalInfoService
  ) {}

  get emergencyContacts() {
    return this.contactsService.getContacts()
  }

  ngOnInit(): void {
    this.loading = false
    this.initializeMockData()

    this.reminders = [
      {
        message: 'Take your morning medication',
        time: '8:00 AM',
        completed: false,
        timestamp: Date.now(),
      },
      {
        message: 'Drink water!',
        time: '2:00 PM',
        completed: false,
        timestamp: Date.now(),
      },
    ]

    this.loadReminders()
    this.autoDeleteReminders()
    this.updateBloodPressureReadings()
    this.fetchBloodPressureInfo()
  }

  private initializeMockData(): void {
    this.bloodPressureReadings = [
      { date: 'Dec 11', systolic: 120, diastolic: 80 },
      { date: 'Dec 12', systolic: 125, diastolic: 85 },
      { date: 'Dec 13', systolic: 118, diastolic: 78 },
    ]

    this.prescriptions = [
      { name: 'Metformin', status: 'Renewal Needed' },
      { name: 'Amlodipine', status: 'Active' },
    ]

    this.reminders = [
      {
        message: 'Take your morning medication',
        time: '8:00 AM',
        completed: false,
        timestamp: Date.now(),
      },
      {
        message: 'Drink water!',
        time: '2:00 PM',
        completed: false,
        timestamp: Date.now(),
      },
    ]

    this.appointments = [
      { date: 'Dec 15', time: '10:30 AM', doctor: 'Dr. Smith' },
      { date: 'Dec 20', time: '2:00 PM', doctor: 'Dr. Brown' },
    ]

    this.wellnessTip =
      '“A fit body, a calm mind, a house full of love. These things cannot be bought – they must be earned.” – Naval Ravikant'

    this.healthGoals = [
      { goal: 'Steps Walked', progress: 6500, target: 10000 },
      { goal: 'Water Intake', progress: 6, target: 8 },
    ]

    this.labTests = [
      { test: 'Blood Sugar', status: 'Normal', date: 'Dec 10' },
      { test: 'Cholesterol', status: 'High', date: 'Dec 8' },
    ]

    this.allergies = ['Peanuts', 'Penicillin']

    this.healthHistory = [
      { date: 'Nov 20', detail: 'Routine Check-up' },
      { date: 'Oct 15', detail: 'Flu Vaccination' },
    ]

    this.familyHealth = [
      { name: 'John (Father)', metric: 'Blood Pressure', value: '130/85' },
      { name: 'Emma (Daughter)', metric: 'Heart Rate', value: '78 BPM' },
    ]
  }

  ngAfterViewInit(): void {
    this.initBloodPressureChart()
  }

  increaseWaterIntake(): void {
    if (this.waterIntake < this.waterTarget) this.waterIntake++
  }

  // Decrease water intake
  decreaseWaterIntake(): void {
    if (this.waterIntake > 0) this.waterIntake--
  }

  // Increase steps progress
  increaseSteps(): void {
    if (this.stepsProgress < this.stepsTarget) this.stepsProgress += 500
  }

  // Decrease steps progress
  decreaseSteps(): void {
    if (this.stepsProgress > 0) this.stepsProgress -= 500
  }

  // Remove a reminder
  removeReminder(index: number): void {
    this.activeReminders.splice(index, 1)
    this.reminders = [...this.activeReminders]
  }

  // Load active reminders
  loadReminders(): void {
    const now = Date.now()
    this.activeReminders = this.reminders.filter(
      (reminder) => now - reminder.timestamp < 24 * 60 * 60 * 1000
    )
  }

  // Automatically delete reminders older than 24 hours
  autoDeleteReminders(): void {
    setInterval(() => {
      const now = Date.now()
      this.reminders = this.reminders.filter(
        (reminder) => now - reminder.timestamp < 24 * 60 * 60 * 1000
      )
      this.loadReminders()
    }, 60 * 1000) // Check every minute
  }

  // Calculate the average systolic blood pressure
  getAverageSystolic(): number {
    if (!this.bloodPressureReadings.length) return 0
    const total = this.bloodPressureReadings.reduce(
      (sum, reading) => sum + reading.systolic,
      0
    )
    return Math.round(total / this.bloodPressureReadings.length)
  }

  // Calculate the average diastolic blood pressure
  getAverageDiastolic(): number {
    if (!this.bloodPressureReadings.length) return 0
    const total = this.bloodPressureReadings.reduce(
      (sum, reading) => sum + reading.diastolic,
      0
    )
    return Math.round(total / this.bloodPressureReadings.length)
  }

  // Add a new reminder
  addReminder(event: Event): void {
    event.preventDefault()

    const now = Date.now()
    const reminder = {
      ...this.newReminder,
      completed: false,
      timestamp: now,
    }

    this.reminders.unshift(reminder) // Add the new reminder at the top
    this.newReminder = { message: '', time: '', timestamp: 0 } // Clear the input fields
    this.loadReminders()
  }

  // Check if blood pressure is above the defined limits
  isBloodPressureAboveLimit(): boolean {
    return this.bloodPressureReadings.some(
      (reading) =>
        reading.systolic > this.systolicLimit ||
        reading.diastolic > this.diastolicLimit
    )
  }

  fetchBloodPressureInfo(): void {
    this.medicalInfoService.getBloodPressureInfo().subscribe({
      next: (response) => {
        this.bloodPressureInfo = response
        console.log('Blood Pressure Info:', response)
      },
      error: (err) => {
        console.error('Error fetching blood pressure info:', err)
        this.bloodPressureInfo = 'Could not load information.'
      },
    })
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails
  }

  protected updateBloodPressureReadings(): void {
    const bloodPressureReadings =
      this.labResultsService.getBloodPressureReadings()
    console.log('Fetched blood pressure readings:', bloodPressureReadings) // Debugging log
    if (bloodPressureReadings.length) {
      this.bloodPressureReadings = bloodPressureReadings
      this.initBloodPressureChart()
    } else {
      this.bloodPressureReadings = []
      this.clearBloodPressureChart()
    }
  }

  private clearBloodPressureChart(): void {
    const ctx = document.getElementById(
      'bloodPressureChart'
    ) as HTMLCanvasElement
    if (ctx) {
      const chartInstance = Chart.getChart(ctx)
      if (chartInstance) {
        chartInstance.destroy()
      }
    }
  }

  private initBloodPressureChart(): void {
    console.log('Initializing chart with data:', this.bloodPressureReadings) // Debugging log
    const ctx = document.getElementById(
      'bloodPressureChart'
    ) as HTMLCanvasElement
    if (ctx && this.bloodPressureReadings.length) {
      const chartInstance = Chart.getChart(ctx)
      if (chartInstance) {
        chartInstance.destroy()
      }

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.bloodPressureReadings.map((r) => r.date),
          datasets: [
            {
              label: 'Systolic Pressure',
              data: this.bloodPressureReadings.map((r) => r.systolic),
              borderColor: '#FF6F61',
              backgroundColor: 'rgba(255, 111, 97, 0.2)',
              fill: true,
            },
            {
              label: 'Diastolic Pressure',
              data: this.bloodPressureReadings.map((r) => r.diastolic),
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              grid: { color: '#E0E0E0' },
            },
          },
        },
      })
    }
  }
}
