import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFilterKategoriComponent } from './pagination-filter-kategori.component';

describe('PaginationFilterKategoriComponent', () => {
  let component: PaginationFilterKategoriComponent;
  let fixture: ComponentFixture<PaginationFilterKategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationFilterKategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFilterKategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
