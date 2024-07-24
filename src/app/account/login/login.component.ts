import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from "@angular/common/http";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../global';
import { BaseauthService } from '../../services/baseauth.service';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-login',
  templateUrl: './v4.html',
  styleUrls: ['./v4.css']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  class_login = "above";
  class_login_turned = "";
  class_signup = "below";
  class_signup_turned = "turned";
  class_parent_state = "";

  username = "";
  password = "";
  email = "";

  subLogin: Subscription;

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private router: Router,
    private auth: BaseauthService,
    public shopping: ShoppingService,
    private ttl: Title
  ) {
  }

  ngOnInit() {
    this.ttl.setTitle("Login - Auliastore");
    this.subLogin = this.auth.loginEvent.subscribe(() => {
      console.log("receive login event ", this.auth.isLoggedIn);
      if (this.auth.isLoggedIn) {
        swal.close();
        this.router.navigate([""]);
      }
    });
    this.auth.checkIfLoggedIn();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    swal.close();
    this.subLogin.unsubscribe();
  }

  clickLogin() {
    swal({
      title: "Login",
      text: "Harap tunggu",
      showCloseButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    this.auth.tryLogin(this.username, this.password)
      .subscribe((resp: any) => {
        console.log("login response ", resp);
        if (resp.status == true) {
          //refresh cart jika login sukses
          this.shopping.refreshCart();
          this.shopping.refreshWishlist();
          this.shopping.reqUnfinishedTransCount().subscribe();
        } else {
          if (resp.kode == 1) {
            swal({
              type: "error",
              title: "Gagal",
              text: resp.msg,
              footer: '<a href="/#/account/resend_activation_email">Kirim ulang email aktivasi</a>',
              showCloseButton: true,
            }).then((result) => {
              console.log(result);
            });
          } else {
            swal({
              type: "error",
              title: "Gagal",
              text: resp.msg
            });
          }
        }
      });
    // }
  }

}
