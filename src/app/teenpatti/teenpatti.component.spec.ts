import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenpattiComponent } from './teenpatti.component';

describe('TeenpattiComponent', () => {
  let component: TeenpattiComponent;
  let fixture: ComponentFixture<TeenpattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeenpattiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeenpattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
