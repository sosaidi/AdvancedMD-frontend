import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientComponent } from './components/patients/patients.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomComponent } from './components/rooms/room.component';
import { PaymentComponent } from './components/payments/payment.component';
import { AppointmentsComponent } from './components/appointments/appointment.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: PatientComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'payments', component: PaymentComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'medical-records', component: MedicalRecordsComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
