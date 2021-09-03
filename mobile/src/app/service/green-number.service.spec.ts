import { TestBed } from '@angular/core/testing';

import { GreenNumberService } from './green-number.service';

describe('GreenNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GreenNumberService = TestBed.get(GreenNumberService);
    expect(service).toBeTruthy();
  });
});
