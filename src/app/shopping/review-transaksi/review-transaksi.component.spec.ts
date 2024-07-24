import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTransaksiComponent } from './review-transaksi.component';

describe('ReviewTransaksiComponent', () => {
  let component: ReviewTransaksiComponent;
  let fixture: ComponentFixture<ReviewTransaksiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTransaksiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
