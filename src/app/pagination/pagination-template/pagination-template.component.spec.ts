import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationTemplateComponent } from './pagination-template.component';

describe('PaginationTemplateComponent', () => {
  let component: PaginationTemplateComponent;
  let fixture: ComponentFixture<PaginationTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
