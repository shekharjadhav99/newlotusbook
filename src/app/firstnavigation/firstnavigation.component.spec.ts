import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstnavigationComponent } from './firstnavigation.component';

describe('FirstnavigationComponent', () => {
  let component: FirstnavigationComponent;
  let fixture: ComponentFixture<FirstnavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstnavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
