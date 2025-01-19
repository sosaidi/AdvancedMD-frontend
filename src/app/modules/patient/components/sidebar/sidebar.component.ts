import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common'
import { NameService } from '../../services/name.service'

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, NgIf, RouterLinkActive, NgOptimizedImage, NgStyle],
  standalone: true,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  profile = {
    firstName: 'John',
    lastName: 'Doe',
    profilePicture: '', // If empty, initials will be used
  };

  constructor(private nameService: NameService) {}

  onToggle() {
    this.toggle.emit(); // Emit toggle event
  }

  ngOnInit() {
    this.nameService.profile$.subscribe((profile) => {
      this.profile = profile; // Includes profilePicture
    });
  }

  getInitials(): string {
    const { firstName, lastName } = this.profile;
    return (firstName[0] || '') + (lastName[0] || '');
  }

  generatePastelColor(): string {
    const hash = Array.from(this.getInitials())
      .map((char) => char.charCodeAt(0))
      .reduce((sum, charCode) => sum + charCode, 0);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  }
}
