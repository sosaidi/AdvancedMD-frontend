import { Component, EventEmitter, Input, Output } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common'
import { SharedDataService } from '../../services/shared-data.service'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive, NgOptimizedImage, NgStyle],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() collapsed = false; // Sidebar state from layout
  @Output() toggle = new EventEmitter<void>(); // "Notify" layout to toggle sidebar
  profileName: string = 'Default User';
  profilePicture: string | null = null;

  onToggle() {
    this.toggle.emit();
  }

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.sharedDataService.profileName$.subscribe((name) => {
      this.profileName = name;
    });
    this.sharedDataService.profilePicture$.subscribe((picture) => {
      this.profilePicture = picture;
    });
  }

  getInitials(): string {
    return this.profileName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  generatePastelColor(): string {
    // Generate a static pastel color based on the initials
    const hash = Array.from(this.getInitials())
      .map((char) => char.charCodeAt(0))
      .reduce((sum, charCode) => sum + charCode, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  }
}
