import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GofLogoComponent } from './gof-logo.component';

describe('GofLogoComponent', () => {
  let component: GofLogoComponent;
  let fixture: ComponentFixture<GofLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GofLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GofLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
