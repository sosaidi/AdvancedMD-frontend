import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MedicalRecord {
  id: string;
  patient: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminMedicalRecordsService {
  private medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      patient: 'John Doe',
      doctor: 'Dr. Wilson',
      diagnosis: 'Hypertension',
      treatment: 'Medication and lifestyle changes',
      notes: 'Follow-up in 2 months',
      date: '2024-12-01',
    },
    {
      id: '2',
      patient: 'Jane Smith',
      doctor: 'Dr. Carter',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Insulin therapy',
      notes: 'Check glucose levels weekly',
      date: '2024-11-20',
    },
  ];

  private recordsSubject = new BehaviorSubject<MedicalRecord[]>(this.medicalRecords);

  getMedicalRecordsObservable() {
    return this.recordsSubject.asObservable();
  }

  getMedicalRecords() {
    return this.medicalRecords;
  }

  addMedicalRecord(record: MedicalRecord) {
    this.medicalRecords.unshift(record);
    this.recordsSubject.next(this.medicalRecords);
  }

  updateMedicalRecord(recordId: string, updatedRecord: MedicalRecord) {
    const index = this.medicalRecords.findIndex((record) => record.id === recordId);
    if (index !== -1) {
      this.medicalRecords[index] = updatedRecord;
      this.recordsSubject.next(this.medicalRecords);
    }
  }

  deleteMedicalRecord(recordId: string) {
    this.medicalRecords = this.medicalRecords.filter((record) => record.id !== recordId);
    this.recordsSubject.next(this.medicalRecords);
  }
}
