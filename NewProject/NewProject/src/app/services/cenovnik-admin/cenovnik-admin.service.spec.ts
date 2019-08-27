import { TestBed } from '@angular/core/testing';

import { CenovnikAdminService } from './cenovnik-admin.service';

describe('CenovnikAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CenovnikAdminService = TestBed.get(CenovnikAdminService);
    expect(service).toBeTruthy();
  });
});
