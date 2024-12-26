import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardData } from '../modules/admin/components/dashboard/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  // Mock data for the dashboard
  getDashboardData(): Observable<DashboardData> {
    const mockData: DashboardData = {
      totalPatients: 20,
      totalStaff: 30,
      totalRooms: 25,
      totalAppointments: 10,
      activeRooms: 15,
      activeAppointments: 8,
      availableRooms: 10,
    }
    return of(mockData); // Return an observable with mock data
  }
}
