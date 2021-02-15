import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivegamesettingComponent } from './livegamesetting.component';

describe('LivegamesettingComponent', () => {
  let component: LivegamesettingComponent;
  let fixture: ComponentFixture<LivegamesettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivegamesettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivegamesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
