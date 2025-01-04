import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../../../services/patients.service';
import { Patient } from './patients.model';

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
