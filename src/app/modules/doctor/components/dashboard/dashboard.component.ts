import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DoctorDashboardComponent implements OnInit{
  loading: boolean = true;
  appointments: any[] = [];
  patients: any[] = [];
  visits: any[] = [];
  payments: any[] = [];

  constructor() {}

  ngOnInit(): void {
    // Simulate an API call, will be of course updated later
    setTimeout(() => {
      this.appointments = [
        { id: 1, patient: 'John Doe', time: '10:00 AM' },
        { id: 2, patient: 'Jane Smith', time: '11:00 AM' },
      ];
      this.patients = [
        { id: 1, name: 'John Doe', status: 'Active' },
        { id: 2, name: 'Jane Smith', status: 'Active' },
      ];
      this.visits = [
        { id: 1, patient: 'John Doe', reason: 'Routine Check-up' },
      ];
      this.payments = [
        { id: 1, patient: 'John Doe', amount: 200, status: 'Paid' },
      ];
      this.loading = false;
    }, 2000);
  }
}
