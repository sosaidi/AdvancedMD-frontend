import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import jsPDF from 'jspdf'
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { PatientService } from '../../../services/patient.service'

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [FormsModule, NgClass, NgForOf, NgIf, NgOptimizedImage],
  templateUrl: './patients.component.html',
})
export class PatientsComponent {
  patients: any[] = [];

  showForm = false
  currentPage = 1
  totalPages = [1, 2]

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
    photo: 'https://via.placeholder.com/150',
  };

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients(); // Fetch patients on component load
  }

  loadPatients(): void {
    this.patients = this.patientService.getPatients(); // Get patients from service
  }

  openForm(): void {
    this.showForm = true
    this.currentPage = 1
  }

  closeForm(): void {
    this.showForm = false
    this.resetForm()
  }

  nextPage(): void {
    this.currentPage++
  }

  prevPage(): void {
    this.currentPage--
  }

  addPatient(): void {
    this.newPatient.id = this.generateUniqueId();
    this.patientService.patients.push({ status: '', ...this.newPatient });
    this.loadPatients(); // Refresh the list
    this.closeForm();
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9)
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
      medicalHistory: { chronicDiseases: '', medications: '', surgeries: '' },
      emergencyContact: { name: '', phone: '', relationship: '' },
      bloodGroup: '',
      weight: '',
      height: '',
      photo: 'https://via.placeholder.com/150',
    }
  }

  async generateReport(patient: any): Promise<void> {
    const doc = new jsPDF()

    // Add hospital logo
    const logoUrl = 'src/assets/logo.png'
    const logoBase64 = await this.convertToBase64(logoUrl).catch((err) => {
      console.error('Error loading logo:', err)
      return '' // Skip adding the logo if there's an issue
    })

    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 20, 20)
    }

    // Add hospital name and title
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Advanced Medical Data | Team D', 40, 20)

    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Patient Report', 105, 40, { align: 'center' })

    // Section: Patient Information
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Patient Information', 10, 60)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`First Name: ${patient.firstname}`, 10, 70)
    doc.text(`Last Name: ${patient.lastname}`, 10, 80)
    doc.text(`Patient ID: ${patient.id}`, 10, 90)
    doc.text(`Birthdate: ${patient.birthdate}`, 10, 100)
    doc.text(`Address: ${patient.address}`, 10, 110)
    doc.text(`Nationality: ${patient.nationality}`, 10, 120)
    doc.text(`Insured: ${patient.insured}`, 10, 130)
    doc.text(`Occupation: ${patient.occupation}`, 10, 140)

    // Section: Visit Details
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Visit Details', 10, 160)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Priority: ${patient.priority}`, 10, 170)
    doc.text(`Location: ${patient.location}`, 10, 180)
    doc.text(`Reason: ${patient.reason}`, 10, 190)
    doc.text(`Complaints: ${patient.complaints}`, 10, 200)

    // Section: Diagnosis
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Diagnosis', 10, 220)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`${patient.diagnosis}`, 10, 230)

    // Footer
    doc.setFontSize(10)
    doc.text('Generated by Advanced Medical Data', 10, 280)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 180, 280)

    // Save PDF
    doc.save(`${patient.firstname}-${patient.lastname}-report.pdf`)
  }

  private convertToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.src = url
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = (error) => reject(error)
    })
  }
}
