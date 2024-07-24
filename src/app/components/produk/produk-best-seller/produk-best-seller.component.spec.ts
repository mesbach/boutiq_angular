import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukBestSellerComponent } from './produk-best-seller.component';

describe('ProdukBestSellerComponent', () => {
  let component: ProdukBestSellerComponent;
  let fixture: ComponentFixture<ProdukBestSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukBestSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukBestSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
