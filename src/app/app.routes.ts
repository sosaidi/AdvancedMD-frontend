import { Routes } from '@angular/router'
import { HomeComponent } from './home/home'

export const routes: Routes = [
  /*{
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
  },*/
  {
    path: 'doctor',
    loadChildren: () =>
      import('./modules/doctor/doctor-routing.module').then(
        (m) => m.DoctorRoutingModule
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'patient',
    loadChildren: () =>
      import('./modules/patient/patient-routing.module').then(
        (m) => m.PatientRoutingModule
      ),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
]
