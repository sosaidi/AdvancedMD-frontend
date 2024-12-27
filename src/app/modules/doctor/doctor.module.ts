import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DoctorRoutingModule } from './doctor-routing.module'
import { AppointmentsComponent } from './components/appointments/appointments.component'
import { DoctorDashboardComponent } from './components/dashboard/dashboard.component'
import { DoctorsComponent } from './components/doctors/doctors.component'
import { PatientsComponent } from './components/patients/patients.component'
import { PaymentsComponent } from './components/payments/payments.component'
import { SettingsComponent } from './components/settings/settings.component'
import { CalendarComponent } from './components/calendar/calendar.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { ChatComponent } from './components/chat/chat.component'
import { HttpClientModule } from '@angular/common/http'
import { FullCalendarModule } from '@fullcalendar/angular'

@NgModule({
  imports: [
    CommonModule,
    DoctorRoutingModule,
    AppointmentsComponent,
    DoctorDashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    PaymentsComponent,
    SettingsComponent,
    CalendarComponent,
    TodoListComponent,
    ChatComponent,
    HttpClientModule,
    FullCalendarModule,
  ],
})
export class DoctorModule {}
