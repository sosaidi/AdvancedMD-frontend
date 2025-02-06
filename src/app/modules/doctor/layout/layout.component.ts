import { Component } from '@angular/core'
import { TopbarComponent } from '../components/topbar/topbar.component'
import { SidebarComponent } from '../components/sidebar/sidebar.component'
import { RouterOutlet } from '@angular/router'
import { NgClass, NgStyle } from '@angular/common'
import { FooterComponent } from '../components/footer/footer.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent, RouterOutlet, NgClass, NgStyle, FooterComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  collapsed = false // Manage the sidebar's state

  toggleSidebar() {
    this.collapsed = !this.collapsed // Toggle the collapsed state
  }
}
