import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin-routing.module').then(
        (m) => m.AdminRoutingModule
      ),
  },
  {
    path: 'doctor',
    loadChildren: () =>
      import('./modules/doctor/doctor-routing.module').then(
        (m) => m.DoctorRoutingModule
      ),
  },
  {
    path: 'patient',
    loadChildren: () =>
      import('./modules/patient/patient-routing.module').then(
        (m) => m.PatientRoutingModule
      ),
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' },
]
