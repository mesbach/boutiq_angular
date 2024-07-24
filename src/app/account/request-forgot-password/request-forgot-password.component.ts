import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../global';
import { BaseauthService } from '../../services/baseauth.service';

@Component({
  selector: 'app-request-forgot-password',
  templateUrl: './request-forgot-password.component.html',
  // styleUrls: ['./request-forgot-password.component.css']
  styleUrls: ['../login/v4.css']
})
export class RequestForgotPasswordComponent implements OnInit, OnDestroy {

  email = "";

  subLogin: Subscription;

  constructor(
    public globals: Globals,
    private http: HttpClient,
    private router: Router,
    public auth: BaseauthService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Lupa Password - Auliastore");
    this.subLogin = this.auth.loginEvent.subscribe(()=>{
      if(this.auth.isLoggedIn){
        this.router.navigate([""]);
      }
    });

    this.auth.checkIfLoggedIn();
  }

  ngOnDestroy(){
    if(this.subLogin != undefined){
      this.subLogin.unsubscribe();
    }
  }

  onSubmit(){
    let errorMsg = "";
    if(this.email.toString().trim().length == 0){
      errorMsg =  "Masukkan email anda";
    }
    if(errorMsg.length > 0){
      swal("Kesalahan", errorMsg, "error");
      return;
    }
    this.http.post(this.globals.apiRequestForgotPassword, {
      email: this.email
    })
    .subscribe(
      (result: any) => {
        console.log("result received", result);
        if(result.status == true){
          swal("Berhasil", "Kami akan mengirimkan email berisi instruksi untuk melakukan pengaturan kembali password anda, silakan buka email Anda", "success")
          .then(v => {
            this.router.navigate([""]);
          });
        } else if(result.status == false){
          swal("Terjadi Kesalahan", result.msg, "error");
        }
      },
      (err: any) => {
        console.log("error received", err);
        this.globals.swalHttpError(err);
      }
    )
  }

}
