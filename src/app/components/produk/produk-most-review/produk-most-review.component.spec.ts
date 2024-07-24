import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukMostReviewComponent } from './produk-most-review.component';

describe('ProdukMostReviewComponent', () => {
  let component: ProdukMostReviewComponent;
  let fixture: ComponentFixture<ProdukMostReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukMostReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukMostReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
