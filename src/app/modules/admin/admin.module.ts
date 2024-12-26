import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
// import { routes } from '../../app.routes';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientComponent } from './components/patients/patients.component';
import { PaymentComponent } from './components/payments/payment.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomComponent } from './components/rooms/room.component';
import { AppointmentsComponent } from './components/appointments/appointment.component';
// import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';

@NgModule({
  declarations: [
    AppointmentsComponent,
    DashboardComponent,
    PatientComponent,
    PaymentComponent,
    StaffComponent,
    RoomComponent,
    // MedicalRecordsComponent,
  ],
  imports: [
    CommonModule, // Required for Angular pipes 
    AdminRoutingModule, 
    RouterModule, 
  ],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AdminModule {}
