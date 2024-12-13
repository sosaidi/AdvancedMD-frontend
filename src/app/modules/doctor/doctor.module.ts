import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DoctorDashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    AppointmentsComponent,
    DoctorDashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    PaymentsComponent,
    SettingsComponent,
  ],
})
export class DoctorModule {}
