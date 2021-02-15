import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseronComponent } from './useron.component';

describe('UseronComponent', () => {
  let component: UseronComponent;
  let fixture: ComponentFixture<UseronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
