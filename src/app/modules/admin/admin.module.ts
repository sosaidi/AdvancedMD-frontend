import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomsComponent } from './components/rooms/room.component';
import { PaymentsComponent } from './components/payments/payment.component';
import { AppointmentsComponent } from './components/appointments/appointment.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AdminDashboardComponent,
    PatientsComponent,
    StaffComponent,
    RoomsComponent,
    PaymentsComponent,
    AppointmentsComponent,
    SidebarComponent,
    TopbarComponent,
    NotificationsComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
