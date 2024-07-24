import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFilterLimitPageComponent } from './pagination-filter-limit-page.component';

describe('PaginationFilterLimitPageComponent', () => {
  let component: PaginationFilterLimitPageComponent;
  let fixture: ComponentFixture<PaginationFilterLimitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationFilterLimitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFilterLimitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
