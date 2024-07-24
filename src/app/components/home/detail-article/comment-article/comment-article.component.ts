import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseauthService } from '../../../../services/baseauth.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../../global';

@Component({
  selector: 'app-comment-article',
  templateUrl: './comment-article.component.html',
  styleUrls: ['./comment-article.component.css']
})
export class CommentArticleComponent implements OnInit, OnChanges {

  /*  untuk menerima input dari komponent detail-article
      digunakan untuk request list koment dari suatu article*/
  @Input() id_article = "";
  /*  id parent = 0 menunjukkan bahwa komen tersebut ditujukan kepada article secara langsung
      sedangkan jika tidak 0, maka komen tersebut adalah balasan terhadap komentar yang lain */
  @Input() id_parent = "0";

  comments = [];
  list_id_user_in_comment = [];

  constructor(
    public auth: BaseauthService,
    private http: HttpClient,
    public globals: Globals
  ) { }

  ngOnInit() {
    
  }

  /*  fungsi untuk menerima event suatu koment berhasil di post 
      event dikirim oleh input-article-commnet */
  onCommentPosted(comment){
    console.log("comment posted event received", comment);
    if(comment.id_parent == this.id_parent){
      this.comments.push(comment);
    }
  }

  makeRequest(){
    // console.log("id article ", this.id_article);
    // console.log("id parent", this.id_parent);
    this.http.post(this.globals.apiArticleCommentList + "get_many?get-comment", {
      where: {"_.id_newsfeed": this.id_article, "_.id_parent": this.id_parent}
    })
    .subscribe(
      (result: any)=>{
        this.comments = result;
      },
      (err: any) => {
        this.comments=[];
      }
    );
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.id_article != undefined || changes.id_parent != undefined){
      this.makeRequest();
    }
  }

}
