import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgsettingComponent } from './msgsetting.component';

describe('MsgsettingComponent', () => {
  let component: MsgsettingComponent;
  let fixture: ComponentFixture<MsgsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgsettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
