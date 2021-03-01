import { TestBed } from '@angular/core/testing';

import { CurrentuserService } from './currentuser.service';

describe('CurrentuserService', () => {
  let service: CurrentuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
