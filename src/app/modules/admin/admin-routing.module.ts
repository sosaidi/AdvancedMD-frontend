import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AppointmentComponent } from './components/appointment/appointment.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { DoctorsComponent } from './components/doctors/doctors.component'
import { PatientsComponent } from './components/patients/patients.component'

const routes: Routes = [
  { path: 'appointments', component: AppointmentComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'patients', component: PatientsComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
