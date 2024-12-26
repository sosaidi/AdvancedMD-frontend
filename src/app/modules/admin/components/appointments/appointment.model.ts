export interface Appointment {
  app_id: number;
  patient_id: number;
  staff_id: number;
  room_id?: number;
  app_date: string;
  status: string;
}
