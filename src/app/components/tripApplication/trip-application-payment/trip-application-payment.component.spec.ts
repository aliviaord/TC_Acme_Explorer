import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripApplicationPaymentComponent } from './trip-application-payment.component';

describe('TripApplicationPaymentComponent', () => {
  let component: TripApplicationPaymentComponent;
  let fixture: ComponentFixture<TripApplicationPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripApplicationPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripApplicationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
