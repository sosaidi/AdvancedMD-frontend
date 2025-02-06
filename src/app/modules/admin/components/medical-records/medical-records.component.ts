import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-medical-records',
  imports: [NgClass, NgForOf, NgIf],
  standalone: true,
  templateUrl: './medical-records.component.html',
})
export class MedicalRecordsComponent {
  // Sample records data
  records = [
    {
      date: '12/01/2023',
      time: '09:00 AM',
      title: 'X-Ray',
      description: 'Chest X-Ray for respiratory check-up.',
      type: 'xray',
      attachments: 1,
    },
    {
      date: '10/02/2023',
      time: '03:30 PM',
      title: 'Consultation',
      description: 'Consultation with Dr. Alice Brown for general health.',
      type: 'consultation',
      attachments: 0,
    },
    {
      date: '15/03/2023',
      time: '11:00 AM',
      title: 'Prescription',
      description: 'Medication prescribed by Dr. David Clark.',
      type: 'prescription',
      attachments: 2,
    },
    {
      date: '20/04/2023',
      time: '07:00 PM',
      title: 'Operation',
      description: 'Appendectomy performed by Dr. Emma Wilson.',
      type: 'operation',
      attachments: 3,
    },
    {
      date: '30/05/2023',
      time: '04:00 PM',
      title: 'Inactive Record',
      description: 'This record is no longer active.',
      type: 'inactive',
      attachments: 0,
    },
  ];

  // Add new record
  addNewRecord() {
   
    console.log('Add New Record clicked');
  }

  // Edit an existing record
  editRecord(record: any) {
    
    console.log('Edit Record:', record);
  }

  // Delete an existing record
  deleteRecord(record: any) {
    
    console.log('Delete Record:', record);
   
    this.records = this.records.filter((r) => r !== record);
  }

  // Download attachments for a record
  downloadAttachments(record: any) {

    console.log('Download Attachments for:', record);
  }
}
