import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacijaKarataComponent } from './validacija-karata.component';

describe('ValidacijaKarataComponent', () => {
  let component: ValidacijaKarataComponent;
  let fixture: ComponentFixture<ValidacijaKarataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidacijaKarataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacijaKarataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
