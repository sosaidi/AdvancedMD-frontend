import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PaymentsComponent } from './components/payments/payment.component';
import { StaffComponent } from './components/staff/staff.component';
import { RoomsComponent } from './components/rooms/room.component';
import { AppointmentsComponent } from './components/appointments/appointment.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    AdminDashboardComponent,
    PatientsComponent,
    StaffComponent,
    RoomsComponent,
    PaymentsComponent,
    AppointmentsComponent,
    SidebarComponent,
    TopbarComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
  ],
})
export class AdminModule {}
