import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppointmentsComponent } from './components/appointments/appointments.component'
import { PatientDashboardComponent } from './components/dashboard/dashboard.component'
import { BillingComponent } from './components/billing/billing.component'
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component'
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component'
import { SettingsComponent } from './components/settings/settings.component'

const routes: Routes = [
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'dashboard', component: PatientDashboardComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'medicalrecords', component: MedicalRecordsComponent },
  { path: 'prescriptions', component: PrescriptionsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
