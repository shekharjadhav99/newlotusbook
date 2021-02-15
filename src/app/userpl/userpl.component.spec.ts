import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserplComponent } from './userpl.component';

describe('UserplComponent', () => {
  let component: UserplComponent;
  let fixture: ComponentFixture<UserplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
