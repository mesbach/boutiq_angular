import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { Globals } from '../../../../global';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-input-article-comment',
  templateUrl: './input-article-comment.component.html',
  styleUrls: ['./input-article-comment.component.css']
})
export class InputArticleCommentComponent implements OnInit {

  /*  digunakan untuk menerima input dari komponen comment-article 
      yang digunakan saat menyimpan komen baru
      yang menunjukkan article mana yang akan diberikan komentar */
  @Input() id_article = "";
  /*  digunakan untuk menerima input dari komponen comment-article atau dari aktivitas user
      yang menunjukkan apakah komen baru tersebut ditujukan langsung kepada suatu article
      atau sebagai balasan dari komentar yang ada */
  @Input() id_parent = 0;

  /*  untuk mengirim event ke listener yang ada bahwa suatu event yang berkaitan dengan komentar baru telah terjadi
      misal suatu komen berhasil disubmit */
  @Output() commentPosted = new EventEmitter();

  /* isi komen yang diinput oleh user */
  comment = "";

  constructor(
    private globals: Globals,
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log("id_parent", this.id_parent);
  }

  submitComment(){
    let errorMsg = "";
    if(this.comment.length == 0){
      errorMsg = "Harap masukkan komentar anda";
    }

    if(errorMsg.length > 0){
      swal("Kesalahan", errorMsg, "error");
      return;
    }

    this.globals.swalBlockUI({text: "Sedang menyimpan", title: "Harap Tunggu"});
    
    this.http.post(this.globals.apiArticleComment + "save_json", {
      content: this.comment,
      id_parent: this.id_parent,
      id_newsfeed: this.id_article
    })
    .subscribe(
      (result: any) => {
        if(result.status == true){
          swal.close();
          /* reset beberapa variable */
          this.id_parent = 0;
          this.comment = "";
          /* trigger event dan sertakan data, yaitu komen yang berhasil disimpan */
          this.commentPosted.emit(result.data);
        } else {
          swal("Kesalahan", result.msg, "error");
        }
      },
      (err: any) => {
        this.globals.swalHttpError(err);
      }
    );
  }

}
