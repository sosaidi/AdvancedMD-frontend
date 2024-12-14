import { Component } from '@angular/core'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent {
  doctors = [
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
    {
      name: 'Dr. David Miller',
      specialty: 'Pediatrician',
      experience: '12 Years',
      availability: 'Available',
      photo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Dr. Emily White',
      specialty: 'Dermatologist',
      experience: '5 Years',
      availability: 'Busy',
      photo: 'https://via.placeholder.com/150',
    },
    {
      name: 'Dr. Michael Lee',
      specialty: 'General Physician',
      experience: '7 Years',
      availability: 'Available',
      photo: 'https://via.placeholder.com/150',
    },
  ];

  showForm = false;
  newDoctor = { name: '', specialty: '', experience: '', availability: '', photo: '' };

  openForm(): void {
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.newDoctor = { name: '', specialty: '', experience: '', availability: '', photo: '' };
  }

  addDoctor(): void {
    this.doctors.push({ ...this.newDoctor });
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

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result as string;
        const [name, specialty, experience, availability] = content.split('\n');
        this.newDoctor.name = name.trim();
        this.newDoctor.specialty = specialty.trim();
        this.newDoctor.experience = experience.trim();
        this.newDoctor.availability = availability.trim();
      };
      reader.readAsText(file);
    }
  }
}
