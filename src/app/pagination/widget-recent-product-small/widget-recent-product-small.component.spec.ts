import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRecentProductSmallComponent } from './widget-recent-product-small.component';

describe('WidgetRecentProductSmallComponent', () => {
  let component: WidgetRecentProductSmallComponent;
  let fixture: ComponentFixture<WidgetRecentProductSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetRecentProductSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRecentProductSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
