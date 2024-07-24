import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputArticleCommentComponent } from './input-article-comment.component';

describe('InputArticleCommentComponent', () => {
  let component: InputArticleCommentComponent;
  let fixture: ComponentFixture<InputArticleCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputArticleCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputArticleCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
