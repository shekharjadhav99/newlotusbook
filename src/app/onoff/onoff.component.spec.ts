import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnoffComponent } from './onoff.component';

describe('OnoffComponent', () => {
  let component: OnoffComponent;
  let fixture: ComponentFixture<OnoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
