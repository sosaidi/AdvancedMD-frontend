import { Component } from '@angular/core'
import { NgClass, NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf],
  templateUrl: './medical-records.component.html',
})
export class MedicalRecordsComponent {
  records = [
    {
      date: '25/12/2017',
      time: 'Now',
      title: 'No Activity',
      description: '',
      type: 'inactive',
      attachments: 0,
    },
    {
      date: '16/12/2024',
      time: '03:45 AM',
      title: 'X-Ray',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.',
      type: 'xray',
      attachments: 0, // Default to 0
    },
    {
      date: '25/08/2020',
      time: '01:30 PM',
      title: 'Consultation',
      description: 'Consultation with Dr. John Deo',
      type: 'consultation',
      attachments: 0, // Default value
    },
    {
      date: '04/09/2020',
      time: '02:00 PM',
      title: 'Prescription',
      description:
        'Write prescription by Dr. Sarah Smith and necessary advice to patient.',
      attachments: 2,
      type: 'prescription',
    },
    {
      date: '03/09/2020',
      time: '10:30 PM',
      title: 'Operation',
      description:
        'Pianoforte principles our unaffected not for astonished travelling are particular.',
      type: 'operation',
      attachments: 0,
    },
  ]
}
