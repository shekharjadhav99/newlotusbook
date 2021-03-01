import { TestBed } from '@angular/core/testing';

import { OpenBetsService } from './open-bets.service';

describe('OpenBetsService', () => {
  let service: OpenBetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenBetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
