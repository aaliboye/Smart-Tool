import { TestBed } from '@angular/core/testing';

import { BarrierGestureService } from './barrier-gesture.service';

describe('BarrierGestureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarrierGestureService = TestBed.get(BarrierGestureService);
    expect(service).toBeTruthy();
  });
});
