export interface MedicalRecord {
    recordId: number; 
    patientId: number; 
    staffId: number; 
    diagnosis: string; 
    prescription: string; 
    report: string; 
    createdAt: Date; 
  }
  