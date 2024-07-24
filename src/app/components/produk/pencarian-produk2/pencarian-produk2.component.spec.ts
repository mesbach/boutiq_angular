import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PencarianProduk2Component } from './pencarian-produk2.component';

describe('PencarianProduk2Component', () => {
  let component: PencarianProduk2Component;
  let fixture: ComponentFixture<PencarianProduk2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PencarianProduk2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PencarianProduk2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
