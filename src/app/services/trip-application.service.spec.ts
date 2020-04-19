import { TestBed } from '@angular/core/testing';

import { TripApplicationService } from './trip-application.service';
import { HttpClientModule } from '@angular/common/http';

describe('TripApplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: TripApplicationService = TestBed.get(TripApplicationService);
    expect(service).toBeTruthy();
  });
});
