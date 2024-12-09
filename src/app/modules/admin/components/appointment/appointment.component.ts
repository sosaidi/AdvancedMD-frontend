import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {
  clicked =true;
}
