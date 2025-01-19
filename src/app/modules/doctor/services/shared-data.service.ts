import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private profileNameSource = new BehaviorSubject<string>('Default User');
  profileName$ = this.profileNameSource.asObservable();

  constructor() {
    const savedName = localStorage.getItem('profileName');
    if (savedName) {
      this.profileNameSource.next(savedName); // Load from localStorage
    }
  }

  setProfileName(name: string): void {
    this.profileNameSource.next(name);
    localStorage.setItem('profileName', name); // Save to localStorage
  }
}
