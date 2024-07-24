import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from "sweetalert2";
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { BaseauthService } from '../../services/baseauth.service';
import { Globals } from '../../global';

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: ['../login/v4.css']
})
export class RegistrasiComponent implements OnInit, OnDestroy {
  username;
  email;
  password;

  subLogin: Subscription;

  constructor(
    public auth: BaseauthService,
    private router: Router,
    private http: HttpClient,
    public globals: Globals,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Daftar Baru - Auliastore");
    this.subLogin = this.auth.loginEvent.subscribe(() => {
      if (this.auth.isLoggedIn) {
        this.router.navigate([""]);
      }
    });
    this.auth.checkIfLoggedIn();
  }

  ngOnDestroy() {
    console.log("component destroyed");
    this.subLogin.unsubscribe();
  }

  clickSubmit() {
    var err = "";
    if (this.password == "") {
      err = "Password harus diisi";
    }
    if (this.email == "") {
      err = "Email harus diisi";
    }
    if (this.username == "") {
      err = "Username harus diisi";
    }
    if (err.length > 0) {
      swal({ title: "Kesalahan", type: "error", text: err });
      return;
    }
    this.http.post(this.globals.apiSignupUrl,
      new HttpParams()
        .set("username", this.username)
        .set("password", this.password)
        .set("email", this.email)
    )
      .subscribe(
        (data: any) => {
          if (data.status == true) {
            swal({
              type: "success",
              title: "Berhasil",
              text: data.msg
            }).then((v) => {
              this.router.navigate(["/account/activation"]);
            });
          } else {
            swal({
              type: "error",
              title: "Gagal",
              text: data.msg
            });
          }
        },
        (err: any) => {
          console.log(err);
          this.globals.swalHttpError(err);
        }
      )
  }

}
