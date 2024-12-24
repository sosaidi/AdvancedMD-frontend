import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LabResultsService {
  private labResults: { test: string; value: string; unit: string; date: string }[] = [];

  getLabResults() {
    return this.labResults;
  }

  addLabResult(labResult: { test: string; value: string; unit: string; date: string }) {
    this.labResults.push(labResult);
  }

  deleteLabResult(index: number) {
    this.labResults.splice(index, 1);
  }
}
