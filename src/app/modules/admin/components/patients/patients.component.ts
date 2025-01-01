import { Component, OnInit } from '@angular/core';
import { PatientsService, Patient } from '../../../../services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }
}
