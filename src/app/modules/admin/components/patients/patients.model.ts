export interface Patient {
  patient_id: number;
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  address: string;
  phone_number: string;
  admission_date: string;
  discharge_date: string | null;
  status: string;
}
