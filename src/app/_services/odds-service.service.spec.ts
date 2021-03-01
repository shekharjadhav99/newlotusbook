import { TestBed } from '@angular/core/testing';

import { OddsServiceService } from './odds-service.service';

describe('OddsServiceService', () => {
  let service: OddsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OddsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
