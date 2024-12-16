import { Component } from '@angular/core'
import { NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
  ],
  templateUrl: './appointments.component.html',
})
export class AppointmentsComponent {
  activeTab: string = 'book'; // Default tab
  newAppointment: { date: string; time: string; reason: string; firstName: string; lastName: string; email: string; phone: string } = {
    date: '',
    time: '',
    reason: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  upcomingAppointments: { date: string; time: string; reason: string }[] = [];
  pastAppointments: { date: string; time: string; reason: string }[] = [];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  bookAppointment(event: Event) {
    event.preventDefault();

    // Add the new appointment to upcoming appointments
    this.upcomingAppointments.push({ ...this.newAppointment });

    // Clear the form after booking
    this.clearForm();
    alert('Appointment booked successfully!');
  }

  clearForm() {
    this.newAppointment = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      reason: '',
    };
  }

  cancelAppointment(appointment: {
    date: string;
    time: string;
    reason: string;
  }): void {
    this.upcomingAppointments = this.upcomingAppointments.filter(
      (a) => a !== appointment
    );
    alert('Appointment canceled.');
  }

  // Example past appointment data
  ngOnInit(): void {
    this.pastAppointments = [
      { date: '2024-12-10', time: '10:00', reason: 'Routine Checkup' },
      { date: '2024-12-12', time: '14:30', reason: 'Follow-up' },
    ];
  }
}
