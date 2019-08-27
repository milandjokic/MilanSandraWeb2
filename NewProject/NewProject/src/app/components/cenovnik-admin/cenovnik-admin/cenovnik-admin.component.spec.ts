import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenovnikAdminComponent } from './cenovnik-admin.component';

describe('CenovnikAdminComponent', () => {
  let component: CenovnikAdminComponent;
  let fixture: ComponentFixture<CenovnikAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenovnikAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenovnikAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
