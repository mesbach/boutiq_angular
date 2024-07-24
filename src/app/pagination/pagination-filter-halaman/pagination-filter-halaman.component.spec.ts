import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFilterHalamanComponent } from './pagination-filter-halaman.component';

describe('PaginationFilterHalamanComponent', () => {
  let component: PaginationFilterHalamanComponent;
  let fixture: ComponentFixture<PaginationFilterHalamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationFilterHalamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFilterHalamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
