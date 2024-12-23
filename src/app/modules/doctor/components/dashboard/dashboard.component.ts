import { Component, AfterViewInit, OnInit } from '@angular/core'
import Chart from 'chart.js/auto'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass],
})
export class DoctorDashboardComponent implements OnInit, AfterViewInit {
  loading: boolean = true
  dailySchedule: { time: string; task: string }[] = []
  healthMetrics: { metric: string; value: string }[] = []
  motivationalQuote: string = ''
  todos: { task: string; priority: string }[] = []
  currentTime: string = ''

  ngOnInit(): void {
    this.loading = false
    this.initializeMockData()
    this.updateClock();
    this.fetchMotivationalQuote();
    this.startQuoteUpdater();
  }

  constructor(private http: HttpClient) {}

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

    this.todos = [
      { task: 'Update medical reports', priority: 'High' },
      { task: 'Prepare for conference', priority: 'Medium' },
      { task: 'Check inventory levels', priority: 'Low' },
    ]
  }

  ngAfterViewInit(): void {
    this.initPatientsChart()
    this.initAppointmentsChart()
  }

  private fetchMotivationalQuote(): void {
    this.http.get<any>('https://api.quotable.io/random').subscribe((response) => {this.motivationalQuote = `“${response.content}” – ${response.author}`;
      },
      (error) => {
        console.error('Error fetching quote', error);
        this.motivationalQuote =
          '“Wherever the art of medicine is loved, there is also a love of humanity.” – Hippocrates';
      }
    );
  }

  private startQuoteUpdater(): void {
    setInterval(() => {
      this.fetchMotivationalQuote();
    }, 3600000);
  }

  private updateClock(): void {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }, 1000);
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

  private initAppointmentsChart(): void {
    const ctx = document.getElementById(
      'appointmentsChart'
    ) as HTMLCanvasElement
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [
            {
              label: 'Appointments',
              data: [4, 8, 5, 7, 6, 9],
              borderColor: '#FFB5E8',
              backgroundColor: 'rgba(255, 181, 232, 0.5)',
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
      })
    }
  }
}
