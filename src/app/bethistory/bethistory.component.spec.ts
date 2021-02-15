import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BethistoryComponent } from './bethistory.component';

describe('BethistoryComponent', () => {
  let component: BethistoryComponent;
  let fixture: ComponentFixture<BethistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BethistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BethistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
