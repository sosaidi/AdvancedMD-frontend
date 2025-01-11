import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';
import { AdminAppointmentsComponent } from './components/appointments/appointments.component';
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AdminPatientsComponent } from './components/patients/patients.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'appointments', component: AdminAppointmentsComponent },
      { path: 'patients', component: AdminPatientsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'medical-records', component: MedicalRecordsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
