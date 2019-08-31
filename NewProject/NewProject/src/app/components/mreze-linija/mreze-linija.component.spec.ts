import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrezeLinijaComponent } from './mreze-linija.component';

describe('MrezeLinijaComponent', () => {
  let component: MrezeLinijaComponent;
  let fixture: ComponentFixture<MrezeLinijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrezeLinijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrezeLinijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
