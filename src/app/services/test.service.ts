import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:4200/admin/test';

  constructor(private http: HttpClient) {}

  getAdminContent(): Observable<string> {
    return this.http.get(`${this.apiUrl}/admin`, { responseType: 'text' });
  }

  getPatientContent(): Observable<string> {
    return this.http.get(`${this.apiUrl}/pat`, { responseType: 'text' });
  }

  getPublicContent(): Observable<string> {
    return this.http.get(`${this.apiUrl}/all`, { responseType: 'text' });
  }
}
