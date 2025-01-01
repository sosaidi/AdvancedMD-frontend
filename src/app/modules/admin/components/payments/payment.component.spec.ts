import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PaymentsComponent } from './payment.component'

describe('PaymentComponent', () => {
  let component: PaymentsComponent
  let fixture: ComponentFixture<PaymentsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PaymentsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
