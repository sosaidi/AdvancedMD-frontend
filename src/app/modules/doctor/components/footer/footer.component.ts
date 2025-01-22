import { Component, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [
    NgStyle,
  ],
})
export class FooterComponent implements OnInit {
  @Input() collapsed: boolean = false; // Input property to receive the state of the sidebar
  currentYear: number = new Date().getFullYear(); // Dynamically sets the current year

  constructor() {}

  ngOnInit(): void {}
}
