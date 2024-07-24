import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTransaksiComponent } from './detail-transaksi.component';

describe('DetailTransaksiComponent', () => {
  let component: DetailTransaksiComponent;
  let fixture: ComponentFixture<DetailTransaksiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTransaksiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
