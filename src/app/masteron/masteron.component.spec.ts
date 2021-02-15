import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteronComponent } from './masteron.component';

describe('MasteronComponent', () => {
  let component: MasteronComponent;
  let fixture: ComponentFixture<MasteronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasteronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
