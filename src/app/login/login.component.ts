import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false; // Loading state

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Start loading
      const { email, password } = this.loginForm.value;

      // Call the login method in the AuthService
      this.authService.login(email, password).subscribe(
        response => {
          this.isLoading = false; // Stop loading
          const token = response?.token;
          if (token) {
            this.authService.storeToken(token);

            // Decode the JWT token to get the user's role
            const userRole = this.getRoleFromToken(token);
            
            // Redirect based on user role
            this.redirectUser(userRole);
          } else {
            console.error('Token not found in the response');
          }
        },
        error => {
          this.isLoading = false; // Stop loading
          console.error('Login failed', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      );
    }
  }

  // Decode token to extract role
  getRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role; // Assuming the token payload contains a `role` field
    } catch (error) {
      console.error('Error decoding token', error);
      return '';
    }
  }

  // Redirect the user based on their role
  redirectUser(role: string) {
    if (role === 'Admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'Doctor') {
      this.router.navigate(['/doctor-dashboard']);
    } else if (role === 'Patient') {
      this.router.navigate(['/patient-dashboard']);
    } else {
      console.error('Unknown role');
    }
  }
}
