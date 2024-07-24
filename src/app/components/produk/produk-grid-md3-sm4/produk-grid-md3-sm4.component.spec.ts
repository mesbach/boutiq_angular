import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukGridMd3Sm4Component } from './produk-grid-md3-sm4.component';

describe('ProdukGridMd3Sm4Component', () => {
  let component: ProdukGridMd3Sm4Component;
  let fixture: ComponentFixture<ProdukGridMd3Sm4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukGridMd3Sm4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukGridMd3Sm4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
