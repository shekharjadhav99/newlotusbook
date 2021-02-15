import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningmarketComponent } from './runningmarket.component';

describe('RunningmarketComponent', () => {
  let component: RunningmarketComponent;
  let fixture: ComponentFixture<RunningmarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningmarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunningmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
