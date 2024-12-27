import { Component } from '@angular/core'

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  logout() {
    // logout logic
    console.log('User logged out')
    // redirect to the login page
  }
}
