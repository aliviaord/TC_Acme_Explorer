import { TestBed } from '@angular/core/testing';

import { TripApplicationService } from './trip-application.service';

describe('TripApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TripApplicationService = TestBed.get(TripApplicationService);
    expect(service).toBeTruthy();
  });
});
