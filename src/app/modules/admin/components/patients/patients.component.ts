import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-admin-patients',
  standalone: true,
  imports: [FormsModule, NgClass, NgForOf, NgIf],
  templateUrl: './patients.component.html',
})
export class AdminPatientsComponent {
  // List of patients
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
    status: string;
    height: string;
  }[] = [
    {
      id: '1',
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

  // Modal visibility and pagination control
  showForm = false;
  currentPage = 1;
  totalPages = [1, 2];  

  // New patient object
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
    allergies: { medications: '', food: '', others: '' },
    medicalHistory: { chronicDiseases: '', medications: '', surgeries: '' },
    emergencyContact: { name: '', phone: '', relationship: '' },
    bloodGroup: '',
    weight: '',
    height: '',
  };

  // Open the form to add a new patient
  openForm(): void {
    this.showForm = true;
    this.currentPage = 1;
  }

  // Close the form
  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  // Navigate to the next page of the form
  nextPage(): void {
    this.currentPage++;
  }

  // Navigate to the previous page of the form
  prevPage(): void {
    this.currentPage--;
  }

  // Add a new patient to the list
  addPatient(): void {
    this.newPatient.id = this.generateUniqueId(); 
    this.patients.push({ status: '', ...this.newPatient });  
    this.closeForm();  
  }

  // Generate a unique ID for the new patient
  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);  // Generate a random ID
  }

  // Reset the form after submitting
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
      medicalHistory: { chronicDiseases: '', medications: '', surgeries: '' },
      emergencyContact: { name: '', phone: '', relationship: '' },
      bloodGroup: '',
      weight: '',
      height: '',
    };
  }

  // Generate a PDF report for the patient
  async generateReport(patient: any): Promise<void> {
    const doc = new jsPDF();

    // Add hospital logo
    const logoUrl = 'src/assets/logo.png';  // Adjust the logo URL
    const logoBase64 = await this.convertToBase64(logoUrl).catch((err) => {
      console.error('Error loading logo:', err);
      return '';  // Skip adding the logo if there's an issue
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

    // Patient Information Section
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

    // Visit Details Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Visit Details', 10, 160);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Priority: ${patient.priority}`, 10, 170);
    doc.text(`Location: ${patient.location}`, 10, 180);
    doc.text(`Reason: ${patient.reason}`, 10, 190);
    doc.text(`Complaints: ${patient.complaints}`, 10, 200);

    // Diagnosis Section
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

  // Convert image URL to base64
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
