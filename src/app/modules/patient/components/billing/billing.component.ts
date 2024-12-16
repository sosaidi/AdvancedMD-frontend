import { Component } from '@angular/core'
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import { CurrencyPipe, NgClass, NgForOf } from '@angular/common'

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    NgForOf,
  ],
  templateUrl: './billing.component.html',
})
export class BillingComponent {
  billingSummary = {
    totalDue: 450.0,
    totalPaid: 1250.0,
    pending: 200.0,
  };

  // List of invoices
  invoices = [
    { id: 'INV-001', date: '2024-12-01', amount: 300, status: 'Paid' },
    { id: 'INV-002', date: '2024-12-05', amount: 150, status: 'Pending' },
    { id: 'INV-003', date: '2024-12-10', amount: 450, status: 'Overdue' },
    { id: 'INV-004', date: '2024-12-15', amount: 350, status: 'Paid' },
  ];

  // Generate PDF for an invoice
  downloadInvoice(invoice: any): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Invoice Details', 105, 20, { align: 'center' });

    autoTable(doc, {
      margin: { top: 30 },
      head: [['Field', 'Details']],
      body: [
        ['Invoice ID', invoice.id],
        ['Date', invoice.date],
        ['Amount', `$${invoice.amount}`],
        ['Status', invoice.status],
      ],
      styles: { fontSize: 12 },
      headStyles: { fillColor: '#3B82F6', textColor: '#FFFFFF' },
    });

    doc.save(`${invoice.id}.pdf`);
  }

  // View Invoice (Placeholder logic)
  viewInvoice(invoice: any): void {
    alert(`Viewing Invoice ID: ${invoice.id}`);
  }

  // Delete Invoice
  deleteInvoice(id: string): void {
    this.invoices = this.invoices.filter((invoice) => invoice.id !== id);
    alert(`Invoice ${id} deleted.`);
  }
}
