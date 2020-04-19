import { TestBed } from '@angular/core/testing';

import { ActorService } from './actor.service';
import { HttpClientModule } from '@angular/common/http';

describe('ActorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: ActorService = TestBed.get(ActorService);
    expect(service).toBeTruthy();
  });
});
