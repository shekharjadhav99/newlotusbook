import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchgeneralsettingComponent } from './matchgeneralsetting.component';

describe('MatchgeneralsettingComponent', () => {
  let component: MatchgeneralsettingComponent;
  let fixture: ComponentFixture<MatchgeneralsettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchgeneralsettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchgeneralsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
