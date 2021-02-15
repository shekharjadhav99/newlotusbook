import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingtennisComponent } from './bettingtennis.component';

describe('BettingtennisComponent', () => {
  let component: BettingtennisComponent;
  let fixture: ComponentFixture<BettingtennisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BettingtennisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingtennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
