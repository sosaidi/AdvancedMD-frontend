import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';
import { AdminAppointmentsComponent } from './components/appointments/appointments.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { PaymentsComponent } from './components/payments/payments.component';
// import { PatientsComponent } from './components/patients/patients.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    HttpClientModule,
    AdminDashboardComponent,
    AdminAppointmentsComponent,
    MedicalRecordsComponent,
    PaymentsComponent,
    // PatientsComponent,
    StaffComponent,
    RoomsComponent,
    SettingsComponent,
  ],
})
export class AdminModule {}
