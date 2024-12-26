import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNavbar = true;
  title = 'Advanced Medical Data';

  // property to hold dashboard data
  DashboardData = {
    totalPatients: 0,
    totalStaff: 0,
    availableRooms: 0,
  };

  hiddenRoutes: string[] = ['/login', '/admin/login'];

  constructor(private router: Router, private dashboardService: DashboardService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
        console.log('Show Navbar:', this.showNavbar);

        
        if (event.url === '/admin/login' || event.url === '/login') {
          this.showNavbar = false;
        } else {
          // Show navbar for other '/admin' routes
          this.showNavbar = event.url.startsWith('/admin');
        }
      }
    });

    // Fetch dashboard data only if the current user is on the admin dashboard
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.DashboardData = data;
    });
  }
}
