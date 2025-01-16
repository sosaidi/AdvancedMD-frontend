import { Injectable } from '@angular/core';
import { Doctor } from '../patient/models/doctor.model'

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  doctors: Doctor[] = [
    {
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiologist',
      experience: '10 Years',
      availability: 'Available',
      photo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Dr. John Doe',
      specialty: 'Neurologist',
      experience: '8 Years',
      availability: 'Busy',
      photo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Dr. Lisa Brown',
      specialty: 'Orthopedic Surgeon',
      experience: '15 Years',
      availability: 'Unavailable',
      photo: 'https://via.placeholder.com/150',
    },
  ];

  getDoctors(): Doctor[] {
    return this.doctors;
  }
}
