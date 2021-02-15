import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingsoccerComponent } from './bettingsoccer.component';

describe('BettingsoccerComponent', () => {
  let component: BettingsoccerComponent;
  let fixture: ComponentFixture<BettingsoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BettingsoccerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingsoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
