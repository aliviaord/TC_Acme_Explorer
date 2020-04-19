import { TestBed } from '@angular/core/testing';

import { SponsorshipService } from './sponsorship.service';
import { HttpClientModule } from '@angular/common/http';

describe('SponsorshipService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: SponsorshipService = TestBed.get(SponsorshipService);
    expect(service).toBeTruthy();
  });
});
