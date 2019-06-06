import { TestBed } from '@angular/core/testing';

import { KupovinaKarteService } from './kupovina-karte.service';

describe('KupovinaKarteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KupovinaKarteService = TestBed.get(KupovinaKarteService);
    expect(service).toBeTruthy();
  });
});
