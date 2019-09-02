import { TestBed } from '@angular/core/testing';

import { TrenutnaLokacijaService } from './trenutna-lokacija.service';

describe('TrenutnaLokacijaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrenutnaLokacijaService = TestBed.get(TrenutnaLokacijaService);
    expect(service).toBeTruthy();
  });
});
