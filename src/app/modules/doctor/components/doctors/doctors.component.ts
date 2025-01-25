import { Component } from '@angular/core'
import { NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Doctor, DoctorService } from '../../../services/doctor.service'

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [NgClass, FormsModule, NgForOf, NgIf, NgOptimizedImage, NgStyle],
  templateUrl: './doctors.component.html',
})
export class DoctorsComponent {
  doctors: Doctor[] = []

  showForm = false
  newDoctor: Doctor = {
    name: '',
    specialty: '',
    experience: '',
    availability: '',
    photo: '',
    color: '',
  }

  constructor(private doctorService: DoctorService) {
    this.doctors = this.doctorService.getDoctors()
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
      color: '',
    }
  }

  addDoctor(): void {
    // Generate a random color for the new doc
    const color = this.generateRandomColor()
    const newDoc: Doctor = { ...this.newDoctor, color }
    this.doctorService.addDoctor(newDoc)
    this.doctors = this.doctorService.getDoctors() // refresh the list
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

  getInitials(name: string): string {
    return name
      .replace(/Dr\.\s*/i, '')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  private generateRandomColor(): string {
    const pastelColors = [
      '#FFB3B3', '#FFD9B3', '#FFFFB3', '#B3FFB3',
      '#B3D9FF', '#D9B3FF', '#FFB3FF',
    ]
    return pastelColors[Math.floor(Math.random() * pastelColors.length)]
  }
}
