import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyhoundComponent } from './greyhound.component';

describe('GreyhoundComponent', () => {
  let component: GreyhoundComponent;
  let fixture: ComponentFixture<GreyhoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreyhoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyhoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
