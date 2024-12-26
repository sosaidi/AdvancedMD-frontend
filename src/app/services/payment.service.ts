import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Payment } from '../modules/admin/components/payments/payment.model'; 

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private mockPayments: Payment[] = [
    {
      payment_id: 1,
      patientName: 'Mike Tyson',
      amount: 150,
      payment_date: '2024-01-18T10:00:00',
      method: 'Credit Card',
      status: 'Paid',
    },
    {
      payment_id: 2,
      patientName: 'John Doe',
      amount: 200,
      payment_date: '2024-01-20T14:30:00',
      method: 'Cash',
      status: 'Pending',
    },
    {
      payment_id: 3,
      patientName: 'Emily Smith',
      amount: 300,
      payment_date: '2024-01-25T11:15:00',
      method: 'Debit Card',
      status: 'Paid',
    },
  ];

  getPayments(): Observable<Payment[]> {
    return of(this.mockPayments);
  }
}