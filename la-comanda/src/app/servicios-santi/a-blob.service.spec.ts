import { TestBed } from '@angular/core/testing';

import { ABlobService } from './a-blob.service';

describe('ABlobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ABlobService = TestBed.get(ABlobService);
    expect(service).toBeTruthy();
  });
});
