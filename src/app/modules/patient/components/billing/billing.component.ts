import { Component } from '@angular/core'
import autoTable from 'jspdf-autotable'
import JsPDF from 'jspdf'
import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'

interface Invoice {
  id: string
  date: string
  amount: number
  status: string
}

@Component({
  selector: 'app-billing',
  imports: [CurrencyPipe, NgClass, NgForOf, DatePipe, NgIf, FormsModule],
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

  // List of invoices
  invoices: Invoice[] = [
    { id: 'INV-001', date: '2024-12-01', amount: 300, status: 'Paid' },
    { id: 'INV-002', date: '2024-12-05', amount: 150, status: 'Pending' },
    { id: 'INV-003', date: '2024-12-10', amount: 450, status: 'Overdue' },
    { id: 'INV-004', date: '2024-12-15', amount: 350, status: 'Paid' },
  ]

  // Modal form state for adding new invoice
  showAddForm = false
  newInvoice: Invoice = {
    id: '',
    date: '',
    amount: 0,
    status: 'Pending',
  }

  constructor(private datePipe: DatePipe) {}

  /** Opens the "Add Invoice" modal. */
  openAddInvoiceModal(): void {
    this.showAddForm = true
    // Reset the new invoice fields
    this.newInvoice = {
      id: '',
      date: '',
      amount: 0,
      status: 'Pending',
    }
  }

  /** Closes the "Add Invoice" modal without saving. */
  closeAddInvoiceModal(): void {
    this.showAddForm = false
  }

  /** On form submit: add the new invoice to the array. */
  submitNewInvoice(): void {
    // Optionally generate an invoice ID if blank
    if (!this.newInvoice.id) {
      const random = Math.random().toString(36).substring(2, 6).toUpperCase()
      this.newInvoice.id = `INV-${random}`
    }

    // Insert into the invoices array
    this.invoices.unshift({ ...this.newInvoice })

    // Hide the modal
    this.closeAddInvoiceModal()

    alert(`Invoice ${this.newInvoice.id} added successfully!`)
  }

  // Generate a PDF for a specific invoice
  downloadInvoice(invoice: Invoice): void {
    const doc = new JsPDF()
    const formattedDate = this.datePipe.transform(invoice.date, 'dd.MM.yyyy')

    doc.setFontSize(18)
    doc.text('Invoice Details', 105, 20, { align: 'center' })

    autoTable(doc, {
      margin: { top: 30 },
      head: [['Field', 'Details']],
      body: [
        ['Invoice ID', invoice.id],
        ['Date', formattedDate || ''],
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
  viewInvoice(invoice: Invoice): void {
    alert(`Viewing Invoice ID: ${invoice.id}`)
  }

  // Delete an invoice by ID
  deleteInvoice(id: string): void {
    this.invoices = this.invoices.filter((inv) => inv.id !== id)
    alert(`Invoice ${id} deleted.`)
  }
}
