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

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  generatePastelColor(): string {
    const pastelColors = ['#FFD5E5', '#FFEBB7', '#B7E5E5', '#E5D5FF', '#C8E5B7'];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }
}
