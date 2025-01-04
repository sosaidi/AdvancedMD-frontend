import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../../services/payments.service';
import { Payment } from './payments.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private paymentsService: PaymentService) {}

  ngOnInit(): void {
    this.paymentsService.getPayments().subscribe((data) => {
      this.payments = data;
    });
  }
}
