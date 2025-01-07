import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MedicalInfoService {
  private apiUrl = 'http://localhost:3000/api/blood-pressure-info'

  constructor(private http: HttpClient) {}

  getBloodPressureInfo(): Observable<string> {
    const params = new HttpParams()
      .set('db', 'healthtopics')
      .set('term', 'high blood pressure')
    return this.http.get(this.apiUrl, { params, responseType: 'text' })
  }
}
