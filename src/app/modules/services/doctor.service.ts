// doctor.service.ts
import { Injectable } from '@angular/core'

export interface Doctor {
  name: string
  specialty: string
  experience: string
  availability: string
  photo: string
  color: string
}

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctors: Doctor[] = [
    {
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      experience: '10 Years',
      availability: 'Available',
      photo: '',
      color: '',
    },
    {
      name: 'Dr. John Doe',
      specialty: 'Neurologist',
      experience: '8 Years',
      availability: 'Busy',
      photo: '',
      color: '',
    },
    {
      name: 'Dr. Lisa Brown',
      specialty: 'Orthopedic Surgeon',
      experience: '15 Years',
      availability: 'Unavailable',
      photo: '',
      color: '',
    },
    {
      name: 'Dr. David Miller',
      specialty: 'Pediatrician',
      experience: '12 Years',
      availability: 'Available',
      photo: '',
      color: '',
    },
    {
      name: 'Dr. Emily White',
      specialty: 'Dermatologist',
      experience: '5 Years',
      availability: 'Busy',
      photo: '',
      color: '',
    },
    {
      name: 'Dr. Michael Lee',
      specialty: 'General Physician',
      experience: '7 Years',
      availability: 'Available',
      photo: '',
      color: '',
    },
  ]

  constructor() {
    this.assignColorsToDoctors()
  }

  // Return the full list
  getDoctors(): Doctor[] {
    return this.doctors
  }

  // Add a new doctor
  addDoctor(doctor: Doctor): void {
    this.doctors.push(doctor)
  }

  // Assign random pastel color to each doctor
  private assignColorsToDoctors(): void {
    this.doctors.forEach((doc) => {
      doc.color = this.generateRandomColor()
    })
  }

  private generateRandomColor(): string {
    const pastelColors = [
      '#FFB3B3', '#FFD9B3', '#FFFFB3', '#B3FFB3',
      '#B3D9FF', '#D9B3FF', '#FFB3FF',
    ]
    return pastelColors[Math.floor(Math.random() * pastelColors.length)]
  }
}
