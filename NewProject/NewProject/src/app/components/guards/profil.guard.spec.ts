import { TestBed, async, inject } from '@angular/core/testing';

import { ProfilGuard } from './profil.guard';

describe('ProfilGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilGuard]
    });
  });

  it('should ...', inject([ProfilGuard], (guard: ProfilGuard) => {
    expect(guard).toBeTruthy();
  }));
});
