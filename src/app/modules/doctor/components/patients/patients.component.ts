import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import jsPDF from 'jspdf'
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [FormsModule, NgClass, NgForOf, NgIf, NgOptimizedImage],
  templateUrl: './patients.component.html',
})
export class PatientsComponent {
  patients: {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    address: string;
    nationality: string;
    insured: string;
    occupation: string;
    priority: string;
    location: string;
    reason: string;
    complaints: string;
    diagnosis: string;
    status: string; // you have 'status' in your sample
    height: string;
  }[] = [
    {
      id: '1234',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: '1985-01-01',
      address: '123 Main Street, Springfield',
      nationality: 'American',
      insured: 'Yes',
      occupation: 'Engineer',
      priority: 'High',
      location: 'Room 101',
      reason: 'Routine Check-up',
      complaints: 'Headache and nausea',
      diagnosis: 'Migraine',
      status: 'Stable',
      height: '180cm',
    },
  ];

  showForm = false;
  currentPage = 1;

  // 3 pages now
  totalPages = [1, 2, 3];

  newPatient = {
    id: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    address: '',
    nationality: '',
    insured: 'Yes',
    occupation: '',
    priority: '',
    location: '',
    reason: '',
    complaints: '',
    diagnosis: '',
    allergies: {
      medications: '',
      food: '',
      others: '',
    },
    medicalHistory: {
      chronicDiseases: '',
      medications: '',
      surgeries: '',
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    bloodGroup: '',
    weight: '',
    height: '',
  };

  openForm(): void {
    this.showForm = true;
    this.currentPage = 1;
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  nextPage(): void {
    this.currentPage++;
  }

  prevPage(): void {
    this.currentPage--;
  }

  addPatient(): void {
    this.newPatient.id = this.generateUniqueId();
    // "status" is not in newPatient, so just add it
    this.patients.push({ status: 'Stable', ...this.newPatient });
    this.closeForm();
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  resetForm(): void {
    this.newPatient = {
      id: '',
      firstname: '',
      lastname: '',
      birthdate: '',
      address: '',
      nationality: '',
      insured: 'Yes',
      occupation: '',
      priority: '',
      location: '',
      reason: '',
      complaints: '',
      diagnosis: '',
      allergies: { medications: '', food: '', others: '' },
      medicalHistory: {
        chronicDiseases: '',
        medications: '',
        surgeries: '',
      },
      emergencyContact: { name: '', phone: '', relationship: '' },
      bloodGroup: '',
      weight: '',
      height: '',
    };
  }

  async generateReport(patient: any): Promise<void> {
    const doc = new jsPDF();

    // Add hospital logo
    const logoUrl = 'src/assets/logo.png';
    const logoBase64 = await this.convertToBase64(logoUrl).catch((err) => {
      console.error('Error loading logo:', err);
      return '';
    });
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 20, 20);
    }

    // Add hospital name and title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Advanced Medical Data | Team D', 40, 20);

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Report', 105, 40, { align: 'center' });

    // Section: Patient Information
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Patient Information', 10, 60);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`First Name: ${patient.firstname}`, 10, 70);
    doc.text(`Last Name: ${patient.lastname}`, 10, 80);
    doc.text(`Patient ID: ${patient.id}`, 10, 90);
    doc.text(`Birthdate: ${patient.birthdate}`, 10, 100);
    doc.text(`Address: ${patient.address}`, 10, 110);
    doc.text(`Nationality: ${patient.nationality}`, 10, 120);
    doc.text(`Insured: ${patient.insured}`, 10, 130);
    doc.text(`Occupation: ${patient.occupation}`, 10, 140);

    // Section: Visit Details
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Visit Details', 10, 160);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Priority: ${patient.priority}`, 10, 170);
    doc.text(`Location: ${patient.location}`, 10, 180);
    doc.text(`Reason: ${patient.reason}`, 10, 190);
    doc.text(`Complaints: ${patient.complaints}`, 10, 200);

    // Section: Diagnosis
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Diagnosis', 10, 220);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${patient.diagnosis}`, 10, 230);

    // Footer
    doc.setFontSize(10);
    doc.text('Generated by Advanced Medical Data', 10, 280);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 180, 280);

    // Save PDF
    doc.save(`${patient.firstname}-${patient.lastname}-report.pdf`);
  }

  private convertToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = (error) => reject(error);
    });
  }
}
