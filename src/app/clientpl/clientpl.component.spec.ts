import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientplComponent } from './clientpl.component';

describe('ClientplComponent', () => {
  let component: ClientplComponent;
  let fixture: ComponentFixture<ClientplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
