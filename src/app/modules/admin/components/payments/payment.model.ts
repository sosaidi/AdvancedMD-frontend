export interface Payment {
  payment_id: number;
  patientName: string;
  amount: number;
  payment_date: string;
  method: string;
  status: string;
}
