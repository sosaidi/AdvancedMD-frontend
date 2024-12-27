import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LabResultsService {
  private labResults: {
    test: string;
    value: string;
    unit: string;
    date: string;
    systolic?: string;
    diastolic?: string;
  }[] = [];

  private bloodPressureData: { date: string; systolic: number; diastolic: number }[] = [];

  // Add a new lab result
  addLabResult(result: { test: string; value: string; unit: string; systolic: string; diastolic: string; date: string }) {
    this.labResults.push(result);

    // Add to blood pressure data if systolic and diastolic values exist
    if (result.systolic && result.diastolic) {
      this.bloodPressureData.push({
        date: result.date,
        systolic: parseInt(result.systolic, 10),
        diastolic: parseInt(result.diastolic, 10),
      });
      console.log('Updated blood pressure data:', this.bloodPressureData); // Debugging log
    }
  }

  // Delete a lab result
  deleteLabResult(index: number) {
    const deletedResult = this.labResults.splice(index, 1)[0];

    // If the deleted result is a blood pressure entry, remove it from bloodPressureData
    if (deletedResult && deletedResult.systolic && deletedResult.diastolic) {
      const date = deletedResult.date;
      this.bloodPressureData = this.bloodPressureData.filter(bp => bp.date !== date);
      console.log('Updated blood pressure data after deletion:', this.bloodPressureData);
    }
  }

  // Get all lab results
  getLabResults() {
    return this.labResults;
  }

  // Get only blood pressure readings
  getBloodPressureReadings() {
    return this.bloodPressureData;
  }
}
