import { TestBed } from '@angular/core/testing';

import { AuditService } from './audit.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AuditService = TestBed.get(AuditService);
    expect(service).toBeTruthy();
  });
});
