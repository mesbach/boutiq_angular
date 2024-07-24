import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingCarouselComponent } from './trending-carousel.component';

describe('TrendingCarouselComponent', () => {
  let component: TrendingCarouselComponent;
  let fixture: ComponentFixture<TrendingCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
