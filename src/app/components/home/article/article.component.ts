import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../global';
import { ArticleService } from '../../../services/article.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(
    public globals: Globals,
    public articles: ArticleService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.articles.refreshArticle();
    this.ttl.setTitle("Artikel - Auliastore");
  }

}
