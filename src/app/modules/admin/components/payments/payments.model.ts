export interface Payment {
    payment_id: number;
    patient_id: number;
    amount: number;
    payment_date: string; 
    method: string; // Credit Card, Cash, etc.
    status: string; // Paid, Pending, Overdue
  }
  