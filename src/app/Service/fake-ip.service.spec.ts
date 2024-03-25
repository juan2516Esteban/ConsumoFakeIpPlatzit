import { TestBed } from '@angular/core/testing';

import { FakeIpService } from './fake-ip.service';

describe('FakeIpService', () => {
  let service: FakeIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
