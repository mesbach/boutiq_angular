import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFilterSortComponent } from './pagination-filter-sort.component';

describe('PaginationFilterSortComponent', () => {
  let component: PaginationFilterSortComponent;
  let fixture: ComponentFixture<PaginationFilterSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationFilterSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFilterSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
