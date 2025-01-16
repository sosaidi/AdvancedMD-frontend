import { Component } from '@angular/core'
import { NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { DoctorService } from '../../../services/docotor.service'
import { Doctor } from '../../../patient/models/doctor.model'

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [NgClass, FormsModule, NgForOf, NgIf, NgOptimizedImage],
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent {
  doctors: Doctor[] = [];

  showForm = false
  newDoctor = {
    name: '',
    specialty: '',
    experience: '',
    availability: '',
    photo: '',
  }

  constructor(private doctorService: DoctorService) {
    this.doctors = this.doctorService.getDoctors();
  }

  openForm(): void {
    this.showForm = true
  }

  closeForm(): void {
    this.showForm = false
    this.newDoctor = {
      name: '',
      specialty: '',
      experience: '',
      availability: '',
      photo: '',
    }
  }

  addDoctor(): void {
    this.doctors.push({ ...this.newDoctor })
    this.closeForm()
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files?.length) {
      const reader = new FileReader()
      reader.onload = () => {
        this.newDoctor.photo = reader.result as string
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement
    if (input.files?.length) {
      const file = input.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const content = reader.result as string
        const [name, specialty, experience, availability] = content.split('\n')
        this.newDoctor.name = name.trim()
        this.newDoctor.specialty = specialty.trim()
        this.newDoctor.experience = experience.trim()
        this.newDoctor.availability = availability.trim()
      }
      reader.readAsText(file)
    }
  }
}
