import { TestBed } from '@angular/core/testing';

import { FullmarketService } from './fullmarket.service';

describe('FullmarketService', () => {
  let service: FullmarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullmarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
