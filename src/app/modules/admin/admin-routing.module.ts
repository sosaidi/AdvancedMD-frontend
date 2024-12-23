import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppointmentComponent } from './components/appointment/appointment.component'
import { AdminDashboardComponent } from './components/dashboard/dashboard.component'
import { DoctorsComponent } from './components/doctors/doctors.component'
import { PatientsComponent } from './components/patients/patients.component'

const routes: Routes = [
  { path: 'appointments', component: AppointmentComponent },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
