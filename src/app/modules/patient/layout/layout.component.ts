import { Component } from '@angular/core'
import { TopbarComponent } from '../components/topbar/topbar.component'
import { SidebarComponent } from '../components/sidebar/sidebar.component'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from '../../doctor/components/footer/footer.component'

@Component({
  selector: 'app-layout',
  imports: [TopbarComponent, SidebarComponent, RouterOutlet, FooterComponent],
  standalone: true,
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  collapsed = false

  toggleSidebar() {
    this.collapsed = !this.collapsed
  }
}
