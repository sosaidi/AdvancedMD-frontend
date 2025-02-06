import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-topbar',
  imports: [
    RouterLink,
  ],
  standalone: true,
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  logout() {
    // logout logic
    console.log('User logged out')
    // redirect to the login page
  }
}
