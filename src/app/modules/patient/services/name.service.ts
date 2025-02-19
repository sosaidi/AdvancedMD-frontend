import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NameService {
  private profileSource = new BehaviorSubject<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profilePicture: string;
  }>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    profilePicture: '',
  });

  profile$ = this.profileSource.asObservable();

  updateProfile(updatedProfile: Partial<{
    firstName: string; lastName: string; profilePicture: string; email: string; phone: string }>) {
    const currentProfile = this.profileSource.value;
    this.profileSource.next({ ...currentProfile, ...updatedProfile });
  }

  getProfile() {
    return this.profileSource.value;
  }
}
