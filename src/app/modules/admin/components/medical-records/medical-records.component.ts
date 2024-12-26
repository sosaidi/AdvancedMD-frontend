import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { MedicalRecord } from './medical-records.model';
import { MedicalRecordsService } from '../../../../services/medical-records.service';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule, NgFor, DatePipe],
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css'],
})
export class MedicalRecordsComponent {
  medicalRecords: MedicalRecord[] = [];

  constructor(private medicalRecordsService: MedicalRecordsService) {}

  ngOnInit(): void {
    this.fetchMedicalRecords();
  }

  fetchMedicalRecords(): void {
    this.medicalRecordsService.getMedicalRecords().subscribe((data: MedicalRecord[]) => {
      this.medicalRecords = data;
    });
  }
}