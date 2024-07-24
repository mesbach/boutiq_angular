import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArticleService } from '../../../services/article.service';
import { Globals } from '../../../global';
import { Subscription } from 'rxjs/Subscription';
import { BaseauthService } from '../../../services/baseauth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit, OnDestroy {
  
  id_article = "";
  article = null;
  showSuggestion = false;
  showAuthorInfo = false;
  isLoading = true;

  subArticle: Subscription;
  subRouter: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articles: ArticleService,
    public globals: Globals,
    public auth: BaseauthService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.subRouter = this.router.events.subscribe(ev=>{
      if(ev instanceof NavigationEnd){
        this.makeRequest();
      }
    });

    this.ttl.setTitle("Detail Artikel - Auliastore");
    this.makeRequest();
  }

  makeRequest(){
    
    this.id_article = this.route.snapshot.paramMap.get("id_article");
    // console.log("id article", this.id_article);
    if(this.id_article.length == 0){
      this.router.navigate(["/article"]);
    } else {
      this.isLoading = true;
      this.subArticle = this.articles.getOne(this.id_article)
      .subscribe(
        (result: any) => {
          this.article = result;

          if(this.article != null){
            this.ttl.setTitle(this.article.judul + " Auliastore");
          } else {
            this.ttl.setTitle("Tidak ditemukan - Auliastore");
          }
        },
        (err: any)=> {},
        () => {
          this.isLoading = false;
        }
      );
    }
  }

  ngOnDestroy(){
    // console.log("component destroy, ", this.subArticle);
    if(this.subArticle != undefined){
      this.subArticle.unsubscribe();
    }
    if(this.subRouter != undefined){
      this.subRouter.unsubscribe();
    }
  }

}
