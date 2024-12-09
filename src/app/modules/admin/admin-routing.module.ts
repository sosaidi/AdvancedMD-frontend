import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import standalone components dynamically
const routes: Routes = [
  // {path: 'login', loadComponent: () => import('../../login/login.component').then(m => m.LoginComponent)},
  {path: 'appointments', loadComponent: () => import('./components/appointment/appointment.component').then(m => m.AppointmentComponent)},
  {path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.AdminDashboardComponent)},
  {path: 'doctors', loadComponent: () => import('./components/doctors/doctors.component').then(m => m.DoctorsComponent)},
  {path: 'patients', loadComponent: () => import('./components/patients/patients.component').then(m => m.PatientsComponent)},
  {path: 'payment', loadComponent: () => import('./components/payment/payment.component').then(m => m.PaymentComponent)},
  {path: 'staff', loadComponent: () => import('./components/staff/staff.component').then(m => m.StaffComponent)},
  {path: 'room', loadComponent: () => import('./components/room/room.component').then(m => m.RoomComponent)},
    
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  {
    path: '**', 
    redirectTo: 'dashboard'  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // use forChild :  feature module
  exports: [RouterModule], // Exporting RouterModule to make it available to other modules
})
export class AdminRoutingModule {}





