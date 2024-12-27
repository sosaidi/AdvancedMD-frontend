import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgIf, NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, NgIf, RouterLinkActive, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  collapsed = false

  toggleSidebar() {
    this.collapsed = !this.collapsed
  }
}
