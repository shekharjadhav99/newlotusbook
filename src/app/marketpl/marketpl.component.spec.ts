import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplComponent } from './marketpl.component';

describe('MarketplComponent', () => {
  let component: MarketplComponent;
  let fixture: ComponentFixture<MarketplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
