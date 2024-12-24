import { Component, AfterViewInit, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { LabResultsService } from '../../services/lab-results.service'
import { EmergencyContactsService } from '../../services/contact.service'

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, FormsModule],
})
export class PatientDashboardComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  bloodPressureReadings: { date: string; systolic: number; diastolic: number }[] = [];
  prescriptions: { name: string; status: string }[] = [];

  appointments: { date: string; time: string; doctor: string }[] = [];
  wellnessTip: string = '';
  heartRate: number = 72;
  healthGoals: { goal: string; progress: number; target: number }[] = [];

  labTests: { test: string; status: string; date: string }[] = [];
  allergies: string[] = [];
  healthHistory: { date: string; detail: string }[] = [];
  familyHealth: { name: string; metric: string; value: string }[] = [];

  waterIntake: number = 6;
  waterTarget: number = 8;

  stepsProgress: number = 6500;
  stepsTarget: number = 10000;

  reminders: { message: string; time: string; completed: boolean; timestamp: number }[] = [];
  activeReminders: any[] = [];
  completedReminders: any[] = [];
  newReminder = { message: '', time: '', timestamp: 0 };

  constructor(public labResultsService: LabResultsService, public contactsService: EmergencyContactsService) {}

  get emergencyContacts() {
    return this.contactsService.getContacts();
  }

  ngOnInit(): void {
    this.loading = false;
    this.initializeMockData();

    this.reminders = [
      { message: 'Take your morning medication', time: '8:00 AM', completed: false, timestamp: Date.now() },
      { message: 'Drink water!', time: '2:00 PM', completed: false, timestamp: Date.now() },
    ];

    this.loadReminders();
    this.autoDeleteReminders();
  }

  private initializeMockData(): void {
    this.bloodPressureReadings = [
      { date: 'Dec 11', systolic: 120, diastolic: 80 },
      { date: 'Dec 12', systolic: 125, diastolic: 85 },
      { date: 'Dec 13', systolic: 118, diastolic: 78 },
    ];

    this.prescriptions = [
      { name: 'Metformin', status: 'Renewal Needed' },
      { name: 'Amlodipine', status: 'Active' },
    ];

    this.reminders = [
        { message: 'Take your morning medication', time: '8:00 AM', completed: false, timestamp: Date.now() },
        { message: 'Drink water!', time: '2:00 PM', completed: false, timestamp: Date.now() },
    ];

    this.appointments = [
      { date: 'Dec 15', time: '10:30 AM', doctor: 'Dr. Smith' },
      { date: 'Dec 20', time: '2:00 PM', doctor: 'Dr. Brown' },
    ];

    this.wellnessTip =
      '“A fit body, a calm mind, a house full of love. These things cannot be bought – they must be earned.” – Naval Ravikant';

    this.healthGoals = [
      { goal: 'Steps Walked', progress: 6500, target: 10000 },
      { goal: 'Water Intake', progress: 6, target: 8 },
    ];

    this.labTests = [
      { test: 'Blood Sugar', status: 'Normal', date: 'Dec 10' },
      { test: 'Cholesterol', status: 'High', date: 'Dec 8' },
    ];

    this.allergies = ['Peanuts', 'Penicillin'];

    this.healthHistory = [
      { date: 'Nov 20', detail: 'Routine Check-up' },
      { date: 'Oct 15', detail: 'Flu Vaccination' },
    ];

    this.familyHealth = [
      { name: 'John (Father)', metric: 'Blood Pressure', value: '130/85' },
      { name: 'Emma (Daughter)', metric: 'Heart Rate', value: '78 BPM' },
    ];
  }

  ngAfterViewInit(): void {
    this.initBloodPressureChart();
  }

  increaseWaterIntake(): void {
    if (this.waterIntake < this.waterTarget) this.waterIntake++;
  }

  // Decrease water intake
  decreaseWaterIntake(): void {
    if (this.waterIntake > 0) this.waterIntake--;
  }

  // Increase steps progress
  increaseSteps(): void {
    if (this.stepsProgress < this.stepsTarget) this.stepsProgress += 500;
  }

  // Decrease steps progress
  decreaseSteps(): void {
    if (this.stepsProgress > 0) this.stepsProgress -= 500;
  }

  // Remove a reminder
  removeReminder(index: number): void {
    this.activeReminders.splice(index, 1);
    this.reminders = [...this.activeReminders];
  }

  // Load active reminders
  loadReminders(): void {
    const now = Date.now();
    this.activeReminders = this.reminders.filter((reminder) => now - reminder.timestamp < 24 * 60 * 60 * 1000);
  }

  // Automatically delete reminders older than 24 hours
  autoDeleteReminders(): void {
    setInterval(() => {
      const now = Date.now();
      this.reminders = this.reminders.filter((reminder) => now - reminder.timestamp < 24 * 60 * 60 * 1000);
      this.loadReminders();
    }, 60 * 1000); // Check every minute
  }

  // Add a new reminder
  addReminder(event: Event): void {
    event.preventDefault();

    const now = Date.now();
    const reminder = {
      ...this.newReminder,
      completed: false,
      timestamp: now,
    };

    this.reminders.unshift(reminder); // Add the new reminder at the top
    this.newReminder = { message: '', time: '', timestamp: 0 }; // Clear the input fields
    this.loadReminders();
  }

  private initBloodPressureChart(): void {
    const ctx = document.getElementById('bloodPressureChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.bloodPressureReadings.map((r) => r.date),
          datasets: [
            {
              label: 'Systolic',
              data: this.bloodPressureReadings.map((r) => r.systolic),
              borderColor: '#FFB5E8',
              backgroundColor: 'rgba(255, 181, 232, 0.5)',
              fill: true,
            },
            {
              label: 'Diastolic',
              data: this.bloodPressureReadings.map((r) => r.diastolic),
              borderColor: '#85E3FF',
              backgroundColor: 'rgba(133, 227, 255, 0.5)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: '#F5F5F5',
              },
            },
          },
        },
      });
    }
  }
}
