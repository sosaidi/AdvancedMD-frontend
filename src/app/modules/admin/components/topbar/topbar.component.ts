import { Component } from '@angular/core'

@Component({
  selector: 'app-topbar',
  imports: [],
  standalone: true,
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  logout() {
    // Clear session storage 
    localStorage.removeItem('authToken');
    sessionStorage.clear();
  
    // Redirect to login page
    window.location.href = '/login';
  }
  
}
