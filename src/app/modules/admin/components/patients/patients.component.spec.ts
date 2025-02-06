// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AdminPatientsComponent } from './patients.component';
// import { AdminPatientsService } from '../../services/patients.service';
// import { BehaviorSubject } from 'rxjs';
// import { Patient } from './patients.model';
// import { FormsModule } from '@angular/forms';

// describe('PatientsComponent', () => {
//   let component: AdminPatientsComponent;
//   let fixture: ComponentFixture<AdminPatientsComponent>;
//   let patientService: AdminPatientsService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [AdminPatientsComponent, FormsModule],  
//       providers: [AdminPatientsService],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AdminPatientsComponent);
//     component = fixture.componentInstance;
//     patientService = TestBed.inject(AdminPatientsService);  
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should add a new patient', () => {
//     const newPatient: Patient = {
//       id: '2',
//       firstname: 'Jane',
//       lastname: 'Doe',
//       birthdate: '1990-01-01',
//       address: '456 Main Street, Springfield',
//       nationality: 'American',
//       insured: 'Yes',
//       occupation: 'Teacher',
//       priority: 'Medium',
//       location: 'Room 102',
//       reason: 'Check-up',
//       complaints: 'Cough',
//       diagnosis: 'Flu',
//       status: 'Stable',
//       height: '160cm',
//     };

//     component.selectedPatient = newPatient;
//     component.savePatient();  
//     fixture.detectChanges(); 

//     expect(patientService.getPatients().length).greaterThan(0);
//   });

//   it('should delete a patient', () => {
//     const initialPatientsLength = patientService.getPatients().length;

//     // Assuming the patient with ID '1' exists
//     component.deletePatient({ id: '1', firstname: 'John', lastname: 'Doe', birthdate: '1985-01-01', address: '', nationality: '', insured: '', occupation: '', priority: '', location: '', reason: '', complaints: '', diagnosis: '', status: '', height: '' });
//     fixture.detectChanges();

//     expect(patientService.getPatients().length).lessThan(initialPatientsLength);
//   });
// });
