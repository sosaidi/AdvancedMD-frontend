import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home.html',
})
export class HomeComponent {}
