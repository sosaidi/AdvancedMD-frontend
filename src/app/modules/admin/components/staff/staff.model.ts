export interface Staff {
    staff_id: number; 
    user_id: number; 
    name: string; 
    specialization?: string; // Optional field for staff specialization (e.g., Cardiologist)
    phone_number?: string; 
    status: string; // Current status (e.g., Active, Inactive, On Leave)
  }
  