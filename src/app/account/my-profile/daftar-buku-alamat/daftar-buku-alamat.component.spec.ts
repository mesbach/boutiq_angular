import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarBukuAlamatComponent } from './daftar-buku-alamat.component';

describe('DaftarBukuAlamatComponent', () => {
  let component: DaftarBukuAlamatComponent;
  let fixture: ComponentFixture<DaftarBukuAlamatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaftarBukuAlamatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarBukuAlamatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
