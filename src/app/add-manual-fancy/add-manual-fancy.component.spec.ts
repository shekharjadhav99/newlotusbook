import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualFancyComponent } from './add-manual-fancy.component';

describe('AddManualFancyComponent', () => {
  let component: AddManualFancyComponent;
  let fixture: ComponentFixture<AddManualFancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualFancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManualFancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
