import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukNewArrivalComponent } from './produk-new-arrival.component';

describe('ProdukNewArrivalComponent', () => {
  let component: ProdukNewArrivalComponent;
  let fixture: ComponentFixture<ProdukNewArrivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukNewArrivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukNewArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
