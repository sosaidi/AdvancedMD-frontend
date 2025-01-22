import { Component, OnInit, NgModule } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  imports: [NgIf, NgForOf, NgClass,   FormsModule ]
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
    
  }
  
  onSubmit(): void {
    const { username, password } = this.form;
 

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        const existingRoles = localStorage.getItem("role");

       

        if(existingRoles =="ROLE_PATIENT"){
          this.router.navigate([`/patient/dashboard`]);
          
        } if(existingRoles =="ROLE_STAFF"){
          this.router.navigate([`/doctor/dashboard`]);
        
        } 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        //this.reloadPage();
      },
      error: err => {
       
        this.errorMessage = "Login failed, pls try other credentails";
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
