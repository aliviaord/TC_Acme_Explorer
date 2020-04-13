import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripApplicationListComponent } from './trip-application-list.component';

describe('TripApplicationListComponent', () => {
  let component: TripApplicationListComponent;
  let fixture: ComponentFixture<TripApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
