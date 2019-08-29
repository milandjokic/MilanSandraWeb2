import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacijaKorisnikaComponent } from './validacija-korisnika.component';

describe('ValidacijaKorisnikaComponent', () => {
  let component: ValidacijaKorisnikaComponent;
  let fixture: ComponentFixture<ValidacijaKorisnikaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacijaKorisnikaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacijaKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
