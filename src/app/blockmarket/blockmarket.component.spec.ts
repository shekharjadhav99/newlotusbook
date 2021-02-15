import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockmarketComponent } from './blockmarket.component';

describe('BlockmarketComponent', () => {
  let component: BlockmarketComponent;
  let fixture: ComponentFixture<BlockmarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockmarketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockmarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
