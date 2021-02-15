import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfancyComponent } from './addfancy.component';

describe('AddfancyComponent', () => {
  let component: AddfancyComponent;
  let fixture: ComponentFixture<AddfancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
