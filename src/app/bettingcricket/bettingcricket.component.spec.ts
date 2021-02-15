import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingcricketComponent } from './bettingcricket.component';

describe('BettingcricketComponent', () => {
  let component: BettingcricketComponent;
  let fixture: ComponentFixture<BettingcricketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BettingcricketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingcricketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
