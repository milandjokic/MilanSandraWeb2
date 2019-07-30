import { TestBed } from '@angular/core/testing';

import { StanicaService } from './stanica.service';

describe('StanicaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StanicaService = TestBed.get(StanicaService);
    expect(service).toBeTruthy();
  });
});
