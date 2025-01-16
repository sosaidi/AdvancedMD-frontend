import { Component, EventEmitter, Input, Output } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgIf, NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() collapsed = false; // Sidebar state from layout
  @Output() toggle = new EventEmitter<void>(); // "Notify" layout to toggle sidebar

  onToggle() {
    this.toggle.emit();
  }
}
