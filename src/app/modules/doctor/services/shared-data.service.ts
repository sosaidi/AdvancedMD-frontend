import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private profileNameSource = new BehaviorSubject<string>('Default User');
  profileName$ = this.profileNameSource.asObservable();
  private profilePictureSource = new BehaviorSubject<string | null>(null);
  profilePicture$ = this.profilePictureSource.asObservable();

  constructor() {
    const savedName = localStorage.getItem('profileName');
    const savedPicture = localStorage.getItem('profilePicture');
    if (savedName) {
      this.profileNameSource.next(savedName);
    }
    if (savedPicture) {
      this.profilePictureSource.next(savedPicture);
    }
  }

  setProfileName(name: string): void {
    this.profileNameSource.next(name);
    localStorage.setItem('profileName', name); // Save to localStorage
  }

  setProfilePicture(picture: string): void {
    this.profilePictureSource.next(picture);
    localStorage.setItem('profilePicture', picture); // Save to localStorage
  }
}
