import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import { TripService } from '../../../services/trip.service';

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be five items in the collection', () => {
    expect(component.getTrips().length).toEqual(5);
  });

  it('should retrieve the third trip since it is the ' +
    'only one flagged as cancelled', () => {
      expect(component.getTrips().filter(trip => trip.cancelReason != null))
        .toContain(component.getTrips()[2]);
  });

  it('should retrieve trip with three pictures', () => {
    expect(component.getPictures(0).length).toBeLessThan(4);
  });

  it('should display a table with 5 rows', () => {
    const compiled = fixture.debugElement.nativeElement;
    const elements = compiled.querySelector('table').getElementsByTagName('tr');
    expect(elements.length).toBe(6);
  });

  it('should have the same trips as the ones created in the service', () => {
    const tripService = fixture.debugElement.injector.get(TripService);
    const componentTrips = component.getTrips();
    const serviceTrips = tripService.createTrips();
    expect(componentTrips.length).toBe(serviceTrips.length);
    for (let i = 0; i < componentTrips.length; i++) {
      expect(componentTrips[i].ticker).toBe(serviceTrips[i].ticker);
    }
  });
});
