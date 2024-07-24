import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFilterUkuranComponent } from './pagination-filter-ukuran.component';

describe('PaginationFilterUkuranComponent', () => {
  let component: PaginationFilterUkuranComponent;
  let fixture: ComponentFixture<PaginationFilterUkuranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationFilterUkuranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFilterUkuranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
