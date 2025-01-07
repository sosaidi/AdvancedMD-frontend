import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppointmentsComponent } from './components/appointments/appointments.component'
import { PatientDashboardComponent } from './components/dashboard/dashboard.component'
import { BillingComponent } from './components/billing/billing.component'
import { MedicalRecordsComponent } from './components/medical-records/medical-records.component'
import { PrescriptionsComponent } from './components/prescriptions/prescriptions.component'
import { SettingsComponent } from './components/settings/settings.component'
import { LayoutComponent } from './layout/layout.component'
import { ChatComponent } from './components/chat/chat.component'
import { LabResultsComponent } from './components/lab-results/lab-results.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'dashboard', component: PatientDashboardComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'medical-records', component: MedicalRecordsComponent },
      { path: 'prescriptions', component: PrescriptionsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'lab-results', component: LabResultsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
