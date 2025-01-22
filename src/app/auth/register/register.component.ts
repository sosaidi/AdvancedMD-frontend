import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports:[NgIf, NgForOf, NgClass,   FormsModule ]
})
export class RegisterComponent {
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    const { username, password } = this.form;

    // Get existing roles from localStorage
    const existingRoles = localStorage.getItem("role");
   
    let roles: string[] = [];
    if (existingRoles !== null) {
      roles.push(existingRoles);
  }
  
   
    
    this.authService.register(username, password, roles).subscribe({
      next: data => {
      
        console.log(data);
        this.router.navigate([`/login`]);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      error: err => {
       
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
