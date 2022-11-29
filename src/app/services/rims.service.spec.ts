import { TestBed } from '@angular/core/testing';

import { RimsService } from './rims.service';

describe('RimsService', () => {
  let service: RimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
