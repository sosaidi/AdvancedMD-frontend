import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private payments = [
    {
      id: 'P001',
      patientName: 'John Doe',
      date: '2024-12-01',
      amount: '150.00',
      status: 'Paid',
      method: 'Credit Card',
    },
    {
      id: 'P002',
      patientName: 'Jane Smith',
      date: '2024-11-01',
      amount: '200.00',
      status: 'Pending',
      method: 'Insurance',
    },
  ];

  getPayments(): Observable<any[]> {
    return of(this.payments);
  }
}
