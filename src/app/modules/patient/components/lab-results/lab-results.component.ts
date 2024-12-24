import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { LabResultsService } from '../../services/lab-results.service';

@Component({
  selector: 'app-lab-results',
  templateUrl: './lab-results.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, NgClass],
})
export class LabResultsComponent implements OnInit {
  newLabResult = {
    test: '',
    value: '',
    unit: '',
    date: '',
  };

  constructor(public labResultsService: LabResultsService) {}

  ngOnInit(): void {}

  addLabResult(): void {
    if (this.newLabResult.test && this.newLabResult.value && this.newLabResult.unit && this.newLabResult.date) {
      this.labResultsService.addLabResult({ ...this.newLabResult });
      this.newLabResult = { test: '', value: '', unit: '', date: '' }; // Reset the form
    } else {
      alert('Please fill in all fields');
    }
  }

  deleteLabResult(index: number): void {
    this.labResultsService.deleteLabResult(index);
  }

  // Access lab results directly from the service
  get labResults() {
    return this.labResultsService.getLabResults();
  }
}
