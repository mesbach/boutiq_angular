import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BaseauthService } from '../../services/baseauth.service';
import { Globals } from '../../global';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  // styleUrls: ['./update-password.component.css']
  styleUrls: ['../login/v4.css']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

  subLogin: Subscription;
  password_lama = "";
  password = "";
  password2 = "";

  constructor(
    public auth: BaseauthService,
    public globals: Globals,
    private http: HttpClient,
    private router: Router,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Ubah Password - Auliastore");
    this.subLogin = this.auth.loginEvent.subscribe(()=>{
      if(this.auth.isLoggedIn == false){
        this.auth.openLoginPage();
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
    if(this.password.toString().trim().length == 0){
      errorMsg = "Password Baru Harus Diisi";
    }
    if(this.password != this.password2){
      errorMsg = "Password baru yang dimasukkan tidak cocok";
    }

    if(errorMsg.length > 0){
      swal("Kesalahan", errorMsg, "error");
      return;
    }

    this.http.post(this.globals.apiUpdatePassword, {
      password_lama: this.password_lama,
      password_baru: this.password
    })
    .subscribe(
      (result: any) => {
        if(result.status == true){
          swal("Berhasil", "Password anda berhasil diperbaruo", "success")
          .then(v=>{
            this.router.navigate([""]);
          });
        } else if(result.status == false) {
          swal("Kesalahan", result.msg, "error");
        } else {
          swal("Kesalahan", "Respon server tidak dikenal", "error");
        }
      },
      (err: any) => {
        this.globals.swalHttpError(err);
      }
    );
  }

}
