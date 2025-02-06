import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointmentsComponent } from './appointments.component';

describe('AppointmentsComponent', () => {
  let component: AdminAppointmentsComponent;
  let fixture: ComponentFixture<AdminAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
