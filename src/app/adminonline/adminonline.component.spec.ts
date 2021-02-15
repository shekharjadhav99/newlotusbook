import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminonlineComponent } from './adminonline.component';

describe('AdminonlineComponent', () => {
  let component: AdminonlineComponent;
  let fixture: ComponentFixture<AdminonlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminonlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
