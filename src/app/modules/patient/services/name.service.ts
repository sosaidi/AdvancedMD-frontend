import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  private profileSource = new BehaviorSubject<{ firstName: string; lastName: string }>({
    firstName: 'John',
    lastName: 'Doe',
  });

  profile$ = this.profileSource.asObservable();

  updateProfile(updatedProfile: { firstName: string; lastName: string }) {
    this.profileSource.next(updatedProfile);
  }
}
