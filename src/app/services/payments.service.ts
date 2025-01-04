import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Payment } from '../modules/admin/components/payments/payments.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private mockPayments: Payment[] = [
    {
      payment_id: 1,
      patient_id: 101,
      amount: 150.0,
      payment_date: '2024-01-18T10:00:00',
      method: 'Credit Card',
      status: 'Paid',
    },
    {
      payment_id: 2,
      patient_id: 102,
      amount: 200.0,
      payment_date: '2024-01-20T12:30:00',
      method: 'Cash',
      status: 'Pending',
    },
    {
      payment_id: 3,
      patient_id: 103,
      amount: 100.0,
      payment_date: '2024-01-22T15:45:00',
      method: 'Online Transfer',
      status: 'Overdue',
    },
  ];

  constructor() {}

  // Fetch all payments
  getPayments(): Observable<Payment[]> {
    return of(this.mockPayments);
  }

  // Fetch a specific payment by ID
  getPaymentById(paymentId: number): Observable<Payment | undefined> {
    return of(this.mockPayments.find((payment) => payment.payment_id === paymentId));
  }

  // Update payment status
  updatePaymentStatus(paymentId: number, status: string): Observable<Payment | null> {
    const payment = this.mockPayments.find((p) => p.payment_id === paymentId);
    if (payment) {
      payment.status = status;
      return of(payment);
    }
    return of(null);
  }
}
