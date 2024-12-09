import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class AdminDashboardComponent {}
