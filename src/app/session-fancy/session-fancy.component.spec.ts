import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFancyComponent } from './session-fancy.component';

describe('SessionFancyComponent', () => {
  let component: SessionFancyComponent;
  let fixture: ComponentFixture<SessionFancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionFancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionFancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
