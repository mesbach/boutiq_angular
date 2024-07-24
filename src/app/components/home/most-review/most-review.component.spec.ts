import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostReviewComponent } from './most-review.component';

describe('MostReviewComponent', () => {
  let component: MostReviewComponent;
  let fixture: ComponentFixture<MostReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
