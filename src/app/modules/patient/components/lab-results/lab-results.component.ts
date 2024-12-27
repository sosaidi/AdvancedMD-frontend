import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { LabResultsService } from '../../services/lab-results.service'

@Component({
  selector: 'app-lab-results',
  templateUrl: './lab-results.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf, NgClass, DatePipe],
})
export class LabResultsComponent implements OnInit {
  @Output() labResultsUpdated = new EventEmitter<void>()

  // Initialize newLabResult with required properties
  newLabResult: {
    test: string
    value: string
    unit: string
    systolic: string
    diastolic: string
    date: string
  } = {
    test: '',
    value: '',
    unit: '',
    systolic: '',
    diastolic: '',
    date: '',
  }

  constructor(public labResultsService: LabResultsService) {}

  ngOnInit(): void {}

  // Add a new lab result and emit the update event
  addLabResult(): void {
    if (
      this.newLabResult.test &&
      this.newLabResult.unit &&
      this.newLabResult.date &&
      (this.newLabResult.value ||
        (this.newLabResult.systolic && this.newLabResult.diastolic))
    ) {
      this.labResultsService.addLabResult({ ...this.newLabResult })
      console.log('Lab result added:', this.newLabResult) // Debugging log
      this.labResultsUpdated.emit() // Notify parent component
      this.newLabResult = {
        test: '',
        value: '',
        unit: '',
        systolic: '',
        diastolic: '',
        date: '',
      } // Reset the form
    } else {
      alert('Please fill in all required fields')
    }
  }

  // Delete a lab result
  deleteLabResult(index: number): void {
    this.labResultsService.deleteLabResult(index)
  }

  // Access lab results directly from the service
  get labResults() {
    return this.labResultsService.getLabResults()
  }
}
