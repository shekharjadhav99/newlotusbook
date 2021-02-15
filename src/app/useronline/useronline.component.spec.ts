import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseronlineComponent } from './useronline.component';

describe('UseronlineComponent', () => {
  let component: UseronlineComponent;
  let fixture: ComponentFixture<UseronlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseronlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseronlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
