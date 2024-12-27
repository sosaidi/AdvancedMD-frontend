import { Component } from '@angular/core'
import autoTable from 'jspdf-autotable'
import JsPDF from 'jspdf'
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-billing',
  imports: [CurrencyPipe, NgClass, NgForOf, DatePipe, NgIf],
  providers: [DatePipe],
  standalone: true,
  templateUrl: './billing.component.html',
})
export class BillingComponent {
  // Summary of billing
  billingSummary = {
    totalDue: 450.0,
    totalPaid: 1250.0,
    pending: 200.0,
  }

  constructor(private datePipe: DatePipe) {}

  // List of invoices
  invoices = [
    { id: 'INV-001', date: '2024-12-01', amount: 300, status: 'Paid' },
    { id: 'INV-002', date: '2024-12-05', amount: 150, status: 'Pending' },
    { id: 'INV-003', date: '2024-12-10', amount: 450, status: 'Overdue' },
    { id: 'INV-004', date: '2024-12-15', amount: 350, status: 'Paid' },
  ]

  // Generate a PDF for a specific invoice
  downloadInvoice(invoice: any): void {
    const doc = new JsPDF()
    const formattedDate = this.datePipe.transform(invoice.date, 'dd.MM.yyyy')

    doc.setFontSize(18)
    doc.text('Invoice Details', 105, 20, { align: 'center' })

    autoTable(doc, {
      margin: { top: 30 },
      head: [['Field', 'Details']],
      body: [
        ['Invoice ID', invoice.id],
        ['Date', formattedDate],
        [
          'Amount',
          invoice.amount.toLocaleString('de-AT', {
            style: 'currency',
            currency: 'EUR',
          }),
        ],
        ['Status', invoice.status],
      ],
      styles: { fontSize: 12 },
      headStyles: { fillColor: '#3B82F6', textColor: '#FFFFFF' },
    })

    doc.save(`${invoice.id}.pdf`)
  }

  // View an invoice (placeholder logic)
  viewInvoice(invoice: any): void {
    alert(`Viewing Invoice ID: ${invoice.id}`)
  }

  // Delete an invoice by ID
  deleteInvoice(id: string): void {
    this.invoices = this.invoices.filter((invoice) => invoice.id !== id)
    alert(`Invoice ${id} deleted.`)
  }
}
