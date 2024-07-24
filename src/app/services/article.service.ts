import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleService {

  lastReqArticleTS = 0;
  defaultThreshold = 60000;
  listArticle = [];

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getTimestampDiff(){
    let sekarang = (new Date()).getTime();
    return sekarang - this.lastReqArticleTS;
  }

  updateTS(){
    this.lastReqArticleTS = (new Date()).getTime();
  }

  refreshArticle(force: boolean = false) {
    let selisih = this.getTimestampDiff();
    // console.log("sekarang", sekarang);
    console.log("last req article", this.lastReqArticleTS);
    console.log("selisih", selisih);
    if (selisih > this.defaultThreshold) {
      this.updateTS();
      this.http.post(this.globals.apiArticle + "get_many?get-article", {
        order: [["_.created_at", "desc"]]
      })
        .subscribe(
          (result: any) => {
            this.listArticle = result;
            for(var i = 0, i2 = this.listArticle.length; i < i2; i++){
              if(typeof this.listArticle[i].content == "string"){
                this.listArticle[i].content_short = this.listArticle[i].content.substring(0,180);
              } else {
                this.listArticle[i].content_short = "";
              }
            }
          },
          (err: any) => {
            this.listArticle = [];
          }
        );
    }
  }

  getOne(id_article){
    return new Observable(observer => {
      var pos = this.globals.posObjectInArray(this.listArticle, {id_newsfeed: id_article});
      // console.log("temp array of article", this.listArticle);
      // console.log("pos article in temp array", pos);
      if(pos >= 0){
        observer.next(this.listArticle[pos]);
        observer.complete();
      } else {
        // console.log("no article found in temp array, req from server");
        this.http.post(this.globals.apiArticle + "get_one?get-article", {
          where: {"_.id_newsfeed": id_article}
        })
        .subscribe(
          (result: any) => {
            this.listArticle.push(result);
            observer.next(result);
            observer.complete();
          },
          (err: any) => {
            observer.next(null);
            observer.complete();
          }
        );
      }
    })
  }

}
