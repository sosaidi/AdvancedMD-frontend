import { Component } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNavbar = false;
  title = 'Advanced Medical Data';

  hiddenRoutes: string[] = ['/login', '/admin/login'];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigated to:', event.url);
        console.log('Show Navbar:' , this.showNavbar);

        // Exclude '/admin/login' from showing the navbar
        if (event.url === '/admin/login' || event.url === '/login') {
          this.showNavbar = false;
        } else {
          // Show navbar for other '/admin' routes
          this.showNavbar = event.url.startsWith('/admin');
        }
      }
      });
    }
  }

