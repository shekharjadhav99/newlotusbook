import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupermasteronComponent } from './supermasteron.component';

describe('SupermasteronComponent', () => {
  let component: SupermasteronComponent;
  let fixture: ComponentFixture<SupermasteronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupermasteronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupermasteronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
