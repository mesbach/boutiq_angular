import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFilterWarnaComponent } from './pagination-filter-warna.component';

describe('PaginationFilterWarnaComponent', () => {
  let component: PaginationFilterWarnaComponent;
  let fixture: ComponentFixture<PaginationFilterWarnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationFilterWarnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationFilterWarnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
