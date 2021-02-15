import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleadminComponent } from './appleadmin.component';

describe('AppleadminComponent', () => {
  let component: AppleadminComponent;
  let fixture: ComponentFixture<AppleadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppleadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
