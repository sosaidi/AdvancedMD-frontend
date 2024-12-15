import { Component } from '@angular/core';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    TopbarComponent,
    SidebarComponent,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  collapsed = false; // Manage the sidebar's state

  toggleSidebar() {
    this.collapsed = !this.collapsed; // Toggle the collapsed state
  }
}
