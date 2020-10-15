import { TestBed } from '@angular/core/testing';

import { CaldenLibService } from './calden-lib.service';

describe('CaldenLibService', () => {
  let service: CaldenLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaldenLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
