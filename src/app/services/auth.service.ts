import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string) {
    if (email === 'admin@example.com' && password === 'password123') {
      return of({
        token: 'mock-token',
        user: {
          role: 'Admin',
        },
      }).pipe(delay(500)); // Simulate network delay
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
