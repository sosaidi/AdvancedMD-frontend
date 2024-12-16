import { Component } from '@angular/core'
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    DatePipe,
  ],
  templateUrl: './prescriptions.component.html',
})
export class PrescriptionsComponent {
  prescriptions = [
    { id: '#A348', title: 'Prescription 1', doctor: 'Dr. Jacob Ryan', date: '12/05/2016', disease: 'Fever' },
    { id: '#A645', title: 'Prescription 2', doctor: 'Dr. Rajesh', date: '12/05/2016', disease: 'Cholera' },
    { id: '#A873', title: 'Prescription 3', doctor: 'Dr. Jay Soni', date: '12/05/2016', disease: 'Jaundice' },
    { id: '#A927', title: 'Prescription 4', doctor: 'Dr. John Deo', date: '12/05/2016', disease: 'Typhoid' },
    { id: '#A228', title: 'Prescription 5', doctor: 'Dr. Megha Trivedi', date: '12/05/2016', disease: 'Malaria' },
    { id: '#A345', title: 'Prescription 6', doctor: 'Dr. Sarah Smith', date: '12/05/2016', disease: 'Infection' },
    { id: '#A765', title: 'Prescription 7', doctor: 'Dr. Jacob Ryan', date: '12/05/2016', disease: 'Fever' },
    { id: '#A125', title: 'Prescription 8', doctor: 'Dr. Rajesh', date: '12/05/2016', disease: 'Cholera' },
  ];

  deletedPrescriptions: any[] = [];
  activeView: string = 'active';
  activeTab: string = 'active';

  generatePDF(prescription: any): void {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor("#2A4365");
    doc.text("Prescription Details", 105, 20, { align: "center" });

    // Add Date
    const today = new Date();
    const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.setTextColor("#718096");
    doc.text(`Generated on: ${dateString}`, 105, 28, { align: "center" });

    // Prescription Table
    autoTable(doc, {
      margin: { top: 40 },
      head: [["Field", "Details"]],
      body: [
        ["Prescription ID", prescription.id],
        ["Title", prescription.title],
        ["Created By", prescription.doctor],
        ["Date", prescription.date],
        ["Disease", prescription.disease],
      ],
      styles: {
        fontSize: 12,
        textColor: "#2D3748",
        fillColor: "#EDF2F7",
        halign: "center",
      },
      headStyles: {
        fillColor: "#2B6CB0",
        textColor: "#FFFFFF",
      },
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor("#A0AEC0");
    doc.text("Thank you for choosing our service.", 105, doc.internal.pageSize.height - 10, { align: "center" });

    // Save PDF
    doc.save(`${prescription.id}_prescription.pdf`);
  }

  viewPrescription(prescription: any): void {
    alert(`Viewing prescription: ${prescription.title}`);
  }

  // Delete Prescription
  deletePrescription(index: number): void {
    const deleted = { ...this.prescriptions[index], deletedAt: new Date() };
    this.deletedPrescriptions.push(deleted);
    this.prescriptions.splice(index, 1);
    this.cleanUpDeletedPrescriptions();
    alert('Prescription moved to trash!');
  }

  // Restore Prescription
  restorePrescription(index: number): void {
    const restored = { ...this.deletedPrescriptions[index] };
    delete restored.deletedAt;
    this.prescriptions.push(restored);
    this.deletedPrescriptions.splice(index, 1);
    alert('Prescription restored!');
  }

  // Clean up deleted prescriptions older than 30 days
  cleanUpDeletedPrescriptions(): void {
    const now = new Date();
    this.deletedPrescriptions = this.deletedPrescriptions.filter((prescription) => {
      const deletedAt = new Date(prescription.deletedAt);
      return (now.getTime() - deletedAt.getTime()) / (1000 * 3600 * 24) < 30;
    });
  }

  addPrescription(): void {
    const newPrescription = {
      id: `#${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      title: "New Prescription",
      doctor: "Dr. Placeholder",
      date: new Date().toLocaleDateString(),
      disease: "Unknown",
    };

    this.prescriptions.unshift(newPrescription);
    alert("New prescription added successfully!");
  }

  importPrescriptions(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const result = JSON.parse(reader.result as string);
        if (Array.isArray(result)) {
          this.prescriptions = [...this.prescriptions, ...result];
          alert("Prescriptions imported successfully!");
        } else {
          alert("Invalid file format! Please upload a valid JSON array.");
        }
      } catch (error) {
        alert("Error reading file! Please upload a valid JSON file.");
      }
    };

    reader.readAsText(file);
  }

  // Switch Views
  setView(view: string): void {
    this.activeView = view;
  }

  // Method to switch tabs
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
