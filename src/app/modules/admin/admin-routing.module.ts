import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomsComponent } from './components/rooms/room.component';
import { PaymentsComponent } from './components/payments/payment.component';
import { AppointmentsComponent } from './components/appointments/appointment.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'notifications', component: NotificationsComponent},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
