import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from '../modules/admin/components/appointments/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private mockAppointments: Appointment[] = [
    {
      app_id: 1,
      patient_id: 101,
      staff_id: 201,
      room_id: 301,
      app_date: '2024-12-25T10:30:00',
      status: 'Confirmed',
    },
    {
      app_id: 2,
      patient_id: 102,
      staff_id: 202,
      room_id: 302,
      app_date: '2024-12-26T11:00:00',
      status: 'Pending',
    },
  ];

  getAppointments(): Observable<Appointment[]> {
    return of(this.mockAppointments);
  }
}
