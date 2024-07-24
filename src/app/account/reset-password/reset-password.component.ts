import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../global';
import { BaseauthService } from '../../services/baseauth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  // styleUrls: ['./reset-password.component.css']
  styleUrls: ['../login/v4.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  token = "";
  password = "";
  password2 = "";

  subLogin: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public globals: Globals,
    private router: Router,
    public auth: BaseauthService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Atur Ulang Password - Auliastore");
    this.token = this.route.snapshot.paramMap.get("token");
    this.subLogin = this.auth.loginEvent.subscribe(() => {
      if (this.auth.isLoggedIn) {
        this.router.navigate([""]);
      }
    });

    this.auth.checkIfLoggedIn();
  }

  ngOnDestroy() {
    if (this.subLogin != undefined) {
      this.subLogin.unsubscribe();
    }
  }

  onSubmit() {
    let errorMsg = "";
    if (this.password != this.password2) {
      errorMsg = "Password yang anda masukkan tidak cocok";
    }

    if (errorMsg.length > 0) {
      swal("Kesalahan", errorMsg, "error");
      return;
    }

    this.http.post(this.globals.apiResetPassword, {
      token: this.token,
      password: this.password
    })
      .subscribe(
        (result: any) => {
          if (result.status == true) {
            swal("Berhasil", "Reset Password Berhasil, silakan coba lagi untuk login")
              .then(v => {
                this.auth.openLoginPage();
              });
          } else if (result.status == false) {
            swal("Kesalahan", result.msg, "error");
          }
        },
        (err: any) => {
          this.globals.swalHttpError(err);
        }
      )

  }

}
