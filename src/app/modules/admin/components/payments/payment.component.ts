import { Component, OnInit } from '@angular/core';
import { PaymentsService, Payment } from '../../../../services/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.paymentsService.getPayments().subscribe((data) => {
      this.payments = data;
    });
  }
}
