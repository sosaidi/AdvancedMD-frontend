import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4200/api/auth'; // to be replaced with backend URL
  private currentUser: any = null; // Store logged-in user details

  constructor(private http: HttpClient) {}

  // Login Method
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  // Save JWT Token
  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  // getters and
  setUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('current-user', JSON.stringify(user));
  }

  getUser(): any {
    if (!this.currentUser) {
      this.currentUser = JSON.parse(localStorage.getItem('current-user') || '{}');
    }
    return this.currentUser;
  }

  // Logout Method
  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('current-user');
    this.currentUser = null;
  }
}
