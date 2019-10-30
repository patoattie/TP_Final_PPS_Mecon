import { TestBed } from '@angular/core/testing';

import { FotoService } from './foto-service.service';

describe('FileStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FotoService = TestBed.get(FotoService);
    expect(service).toBeTruthy();
  });
});
