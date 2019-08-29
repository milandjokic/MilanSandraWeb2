import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedvoznjeAdminComponent } from './redvoznje-admin.component';

describe('RedvoznjeAdminComponent', () => {
  let component: RedvoznjeAdminComponent;
  let fixture: ComponentFixture<RedvoznjeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedvoznjeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedvoznjeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
