import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../../services/payment.service';
import { Payment } from './payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  isLoading: boolean = true;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.paymentService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.isLoading = false;
      },
    });
  }
}
