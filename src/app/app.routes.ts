import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/admin/components/dashboard/dashboard.component';
import { AppointmentsComponent } from './modules/admin/components/appointments/appointment.component';
import { PatientComponent } from './modules/admin/components/patients/patients.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'patients', component: PatientComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
