import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../../services/patients.service';
import { Patient } from './patients.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  isLoading: boolean = true;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.isLoading = false;
      },
    });
  }
}