import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Payment {
  id: string;
  patient: string;
  amount: number;
  status: string;
  date: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminPaymentsService {
  private payments: Payment[] = [
    {
      id: 'P001',
      patient: 'John Doe',
      amount: 150,
      status: 'Paid',
      date: '2024-12-01',
      method: 'Credit Card',
    },
    {
      id: 'P002',
      patient: 'Jane Smith',
      amount: 200,
      status: 'Pending',
      date: '2024-11-20',
      method: 'Insurance',
    },
  ];

  private paymentsSubject = new BehaviorSubject<Payment[]>(this.payments);

  getPaymentsObservable() {
    return this.paymentsSubject.asObservable();
  }

  getPayments() {
    return this.payments;
  }

  addPayment(payment: Payment) {
    this.payments.unshift(payment);
    this.paymentsSubject.next(this.payments);
  }

  updatePaymentStatus(id: string, status: string) {
    const index = this.payments.findIndex((payment) => payment.id === id);
    if (index !== -1) {
      this.payments[index].status = status;
      this.paymentsSubject.next(this.payments);
    }
  }

  deletePayment(id: string) {
    this.payments = this.payments.filter((payment) => payment.id !== id);
    this.paymentsSubject.next(this.payments);
  }
}
