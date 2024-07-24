import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentArticleComponent } from './comment-article.component';

describe('CommentArticleComponent', () => {
  let component: CommentArticleComponent;
  let fixture: ComponentFixture<CommentArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
