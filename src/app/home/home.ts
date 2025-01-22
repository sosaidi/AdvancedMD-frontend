import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './home.html',
})
export class HomeComponent {


  setLocalStorage(param: string): void {
    const value = param; // Replace this with the value you want to store
    localStorage.setItem('role', value); // Dynamically set the local storage key
  
   
  }
}
