import { TestBed } from '@angular/core/testing';

import { BetslipDataService } from './betslip-data.service';

describe('BetslipDataService', () => {
  let service: BetslipDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetslipDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
