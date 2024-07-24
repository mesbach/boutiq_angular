import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFilterHargaComponent } from './pagination-filter-harga.component';

describe('PaginationFilterHargaComponent', () => {
  let component: PaginationFilterHargaComponent;
  let fixture: ComponentFixture<PaginationFilterHargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationFilterHargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFilterHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
