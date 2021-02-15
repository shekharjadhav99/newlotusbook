import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitesettingComponent } from './websitesetting.component';

describe('WebsitesettingComponent', () => {
  let component: WebsitesettingComponent;
  let fixture: ComponentFixture<WebsitesettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsitesettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
