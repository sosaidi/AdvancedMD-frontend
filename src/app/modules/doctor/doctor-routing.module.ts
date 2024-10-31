import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppointmentsComponent } from './components/appointments/appointments.component'
import { DoctorDashboardComponent } from './components/dashboard/dashboard.component'
import { DoctorsComponent } from './components/doctors/doctors.component'
import { PatientsComponent } from './components/patients/patients.component'
import { PaymentsComponent } from './components/payments/payments.component'
import { SettingsComponent } from './components/settings/settings.component'

const routes: Routes = [
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'dashboard', component: DoctorDashboardComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
