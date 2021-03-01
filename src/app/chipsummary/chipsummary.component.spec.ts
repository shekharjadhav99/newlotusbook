import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsummaryComponent } from './chipsummary.component';

describe('ChipsummaryComponent', () => {
  let component: ChipsummaryComponent;
  let fixture: ComponentFixture<ChipsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
