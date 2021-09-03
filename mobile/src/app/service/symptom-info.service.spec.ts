import { TestBed } from '@angular/core/testing';

import { SymptomInfoService } from './symptom-info.service';

describe('SymptomInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymptomInfoService = TestBed.get(SymptomInfoService);
    expect(service).toBeTruthy();
  });
});
