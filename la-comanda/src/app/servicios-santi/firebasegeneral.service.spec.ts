import { TestBed } from '@angular/core/testing';

import { FirebasegeneralService } from './firebasegeneral.service';

describe('FirebasegeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebasegeneralService = TestBed.get(FirebasegeneralService);
    expect(service).toBeTruthy();
  });
});
