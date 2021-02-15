import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportplComponent } from './sportpl.component';

describe('SportplComponent', () => {
  let component: SportplComponent;
  let fixture: ComponentFixture<SportplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
