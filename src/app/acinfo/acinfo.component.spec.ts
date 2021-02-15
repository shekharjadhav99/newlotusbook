import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcinfoComponent } from './acinfo.component';

describe('AcinfoComponent', () => {
  let component: AcinfoComponent;
  let fixture: ComponentFixture<AcinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
