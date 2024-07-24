import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationInfoHalamanComponent } from './pagination-info-halaman.component';

describe('PaginationInfoHalamanComponent', () => {
  let component: PaginationInfoHalamanComponent;
  let fixture: ComponentFixture<PaginationInfoHalamanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationInfoHalamanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationInfoHalamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
