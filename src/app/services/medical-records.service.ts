import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MedicalRecord } from '../modules/admin/components/medical-records/medical-records.model';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordsService {
  getMedicalRecords(): Observable<MedicalRecord[]> {
    // Replace with API call later
    const records: MedicalRecord[] = [
      {
        recordId: 1,
        patientId: 101,
        staffId: 201,
        diagnosis: 'Flu',
        prescription: 'Rest and hydration',
        report: 'Normal',
        createdAt: new Date(),
      },
    ];
    return of(records);
  }
}
