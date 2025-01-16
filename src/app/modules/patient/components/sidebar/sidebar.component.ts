import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NgIf, NgOptimizedImage } from '@angular/common'
import { NameService } from '../../services/name.service'

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, NgIf, RouterLinkActive, NgOptimizedImage],
  standalone: true,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  firstName = 'John'
  lastName = 'Doe'

  constructor(private nameService: NameService) {}

  onToggle() {
    this.toggle.emit(); // Emit toggle event
  }

  ngOnInit() {
    this.nameService.profile$.subscribe((profile) => {
      this.firstName = profile.firstName
      this.lastName = profile.lastName
    })
  }
}
