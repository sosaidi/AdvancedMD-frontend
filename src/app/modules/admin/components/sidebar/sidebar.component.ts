import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
})
export class AdminSidebarComponent {
  // Sidebar collapsed state
  collapsed = false;

  // Static profile information
  firstName = 'Admin';
  lastName = 'User';

  // Method to toggle sidebar collapse
  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
