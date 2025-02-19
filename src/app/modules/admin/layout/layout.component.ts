import { Component } from '@angular/core'
import { TopbarComponent } from '../components/topbar/topbar.component'
import { AdminSidebarComponent } from '../components/sidebar/sidebar.component'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopbarComponent, AdminSidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  collapsed = false 

  toggleSidebar() {
    this.collapsed = !this.collapsed 
  }
}
