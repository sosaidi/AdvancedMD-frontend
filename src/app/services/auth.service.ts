import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}


  login(username: string, password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}signin`,
      { username, password },
      httpOptions
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(
      `${AUTH_API}signup`,
      { username, password },
      httpOptions
    );
  }

  logout(): void {
    // Optional feature: Notify the server of logout 
    this.http.post(`${AUTH_API}signout`, {}, httpOptions).subscribe({
      next: () => console.log('Logged out successfully on server'),
      error: (err) => console.error('Error logging out on server', err),
    });

    // Clear local storage or session data
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth-token');
  }
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }


  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  /**
   * Saves the user data to local storage.
   * @param user The user object to store.
   */
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
