import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZerobalanceuserComponent } from './zerobalanceuser.component';

describe('ZerobalanceuserComponent', () => {
  let component: ZerobalanceuserComponent;
  let fixture: ComponentFixture<ZerobalanceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZerobalanceuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZerobalanceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
