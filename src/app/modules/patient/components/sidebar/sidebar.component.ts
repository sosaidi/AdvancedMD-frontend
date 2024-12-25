import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { NameService } from '../../services/name.service'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive,
    NgOptimizedImage,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  collapsed = false;
  firstName = 'John';
  lastName = 'Doe';

  constructor(private nameService: NameService) { }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
    this.nameService.profile$.subscribe((profile) => {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
    });
  }
}
