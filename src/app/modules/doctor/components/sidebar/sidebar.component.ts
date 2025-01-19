import { Component, EventEmitter, Input, Output } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { SharedDataService } from '../../services/shared-data.service'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() collapsed = false; // Sidebar state from layout
  @Output() toggle = new EventEmitter<void>(); // "Notify" layout to toggle sidebar
  profileName: string = 'Default User';

  onToggle() {
    this.toggle.emit();
  }

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.profileName$.subscribe((name) => {
      this.profileName = name; // Update the sidebar when the name changes
    });
  }
}
