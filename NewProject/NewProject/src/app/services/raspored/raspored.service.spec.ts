import { TestBed } from '@angular/core/testing';

import { RasporedService } from './raspored.service';

describe('RasporedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RasporedService = TestBed.get(RasporedService);
    expect(service).toBeTruthy();
  });
});
