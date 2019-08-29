import { TestBed } from '@angular/core/testing';

import { RedvoznjeAdminService } from './redvoznje-admin.service';

describe('RedvoznjeAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedvoznjeAdminService = TestBed.get(RedvoznjeAdminService);
    expect(service).toBeTruthy();
  });
});
