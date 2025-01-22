export interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  details: string;
  diseases: string;
  assignedDoctor: string;
}
