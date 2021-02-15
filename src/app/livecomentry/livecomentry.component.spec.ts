import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivecomentryComponent } from './livecomentry.component';

describe('LivecomentryComponent', () => {
  let component: LivecomentryComponent;
  let fixture: ComponentFixture<LivecomentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivecomentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivecomentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
