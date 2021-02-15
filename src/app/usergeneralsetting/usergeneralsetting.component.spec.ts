import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergeneralsettingComponent } from './usergeneralsetting.component';

describe('UsergeneralsettingComponent', () => {
  let component: UsergeneralsettingComponent;
  let fixture: ComponentFixture<UsergeneralsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergeneralsettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergeneralsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
