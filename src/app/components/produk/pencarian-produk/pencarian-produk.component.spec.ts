import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PencarianProdukComponent } from './pencarian-produk.component';

describe('PencarianProdukComponent', () => {
  let component: PencarianProdukComponent;
  let fixture: ComponentFixture<PencarianProdukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PencarianProdukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PencarianProdukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
