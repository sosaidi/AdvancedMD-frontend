import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component'
import { AppointmentsComponent } from './components/appointments/appointments.component'
import { DoctorDashboardComponent } from './components/dashboard/dashboard.component'
import { DoctorsComponent } from './components/doctors/doctors.component'
import { PatientsComponent } from './components/patients/patients.component'
import { PaymentsComponent } from './components/payments/payments.component'
import { SettingsComponent } from './components/settings/settings.component'
import { CalendarComponent } from './components/calendar/calendar.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { ChatComponent } from './components/chat/chat.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DoctorDashboardComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'doctors', component: DoctorsComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'todo-list', component: TodoListComponent },
      { path: 'chat', component: ChatComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
