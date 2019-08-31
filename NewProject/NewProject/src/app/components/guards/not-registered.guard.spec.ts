import { TestBed, async, inject } from '@angular/core/testing';

import { NotRegisteredGuard } from './not-registered.guard';

describe('NotRegisteredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotRegisteredGuard]
    });
  });

  it('should ...', inject([NotRegisteredGuard], (guard: NotRegisteredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
