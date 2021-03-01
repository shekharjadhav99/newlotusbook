import { TestBed } from '@angular/core/testing';

import { ShareUserService } from './share-user.service';

describe('ShareUserService', () => {
  let service: ShareUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
