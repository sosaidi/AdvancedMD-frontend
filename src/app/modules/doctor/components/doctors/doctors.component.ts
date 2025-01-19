import { Component } from '@angular/core'
import { NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [NgClass, FormsModule, NgForOf, NgIf, NgOptimizedImage, NgStyle],
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent {
  doctors = [
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
  ];

  showForm = false;
  newDoctor = {
    name: '',
    specialty: '',
    experience: '',
    availability: '',
    photo: '',
    color: '',
  };

  constructor() {
    this.assignColorsToDoctors();
  }

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.newDoctor = {
      name: '',
      specialty: '',
      experience: '',
      availability: '',
      photo: '',
      color: '',
    };
  }

  addDoctor(): void {
    const newDoctor = {
      ...this.newDoctor,
      color: this.generateRandomColor(),
    };
    this.doctors.push(newDoctor);
    this.closeForm();
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newDoctor.photo = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  getInitials(name: string): string {
    return name
      .replace(/Dr\.\s*/i, '') // Remove "Dr." prefix (case-insensitive)
      .split(' ')
      .map((n) => n[0]) // Take the first letter of each name part
      .join('')
      .toUpperCase();
  }

  generateRandomColor(): string {
    const pastelColors = [
      '#FFB3B3', '#FFD9B3', '#FFFFB3', '#B3FFB3', '#B3D9FF', '#D9B3FF', '#FFB3FF',
    ];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }

  assignColorsToDoctors(): void {
    this.doctors.forEach((doctor) => {
      doctor['color'] = this.generateRandomColor();
    });
  }
}
