import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';

describe('TripService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripService = TestBed.get(TripService);
    expect(service).toBeTruthy();
  });

  it('should create 5 trips', () => {
    const service: TripService = TestBed.get(TripService);
    const trips = service.createTrips();
    expect(trips.length).toBe(5);
    expect(trips.filter(trip => trip.cancelReason != null).length).toBe(1);
  });
});
