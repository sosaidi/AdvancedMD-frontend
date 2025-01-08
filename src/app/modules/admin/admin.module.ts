import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PatientsComponent } from './components/patients/patients.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomsComponent } from './components/rooms/rooms.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    // Declare Components
    DashboardComponent,
    AppointmentsComponent,
    MedicalRecordsComponent,
    PaymentsComponent,
    PatientsComponent,
    StaffComponent,
    RoomsComponent,
  ],
})
export class AdminModule {}
