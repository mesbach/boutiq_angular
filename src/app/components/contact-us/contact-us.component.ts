import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  msg = {
    name: "",
    email: "",
    content: ""
  };

  constructor(
    private http: HttpClient,
    public globals: Globals,
    private router: Router,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Hubungi Kami - Auliastore");
  }

  clickSubmit(){
    if(this.msg.name.length == 0){
      swal("Kesalahan", "Masukkan nama Anda", "error");
      return;
    }
    if(this.msg.email.length == 0){
      swal("Kesalahan", "Masukkan email Anda", "error");
      return;
    }
    if(this.msg.content.length == 0){
      swal("Kesalahan", "Masukkan pesan Anda", "error");
      return;
    }

    this.globals.swalBlockUI({text: "Mengirim Pesan"});

    this.http.post(this.globals.apiPublicMessage + "save_json", this.msg)
    .subscribe(
      (result: any)=>{
        if(result.status == true){
          swal("Berhasil", "Terima kasih telah mengirim pesan. Kami akan segera menanggapi", "success")
          .then(val => {
            this.router.navigate([""]);
          });
        } else if(result.status == false){
          swal("Kesalahan", result.msg, "error");
        } else {
          swal("Kesalahan", "Terjadi kesalahan", "error");
        }
      },
      (err: any) => this.globals.swalHttpError(err)
    );
  }

}
