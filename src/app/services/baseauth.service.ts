import { Injectable, Output, EventEmitter } from '@angular/core';
import { Globals } from "./../global";
import { Router } from "@angular/router";
import swal from "sweetalert2";
import { Observable } from 'rxjs/Observable';
import { ShoppingService } from './shopping.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from "rxjs/operators";

@Injectable()
export class BaseauthService {

  myProfile: any = null;
  isLoggedIn: boolean = false;
  nama_akun = "";

  @Output() loginEvent: EventEmitter<any> = new EventEmitter();
  @Output() profileEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private router: Router,
  ) { }

  tryLogout() {
    return new Observable((observer) => {
      this.http.get(this.globals.apiLogoutUrl)
        .subscribe(
          (resp: any) => {
            this.globals.isLoggedIn = false;
            this.isLoggedIn = false;
            // this.notifyCheckLoginListener();
            this.router.navigate([""]);
            observer.next(resp);
            observer.complete();
          },
          (err: any) => {
            observer.next({ status: false, msg: "Terjadi kesalahan di server/jaringan" });
            observer.complete();
          }
        );
    });
  }

  tryLogin(username, password) {
    var ini = this;
    let obs = new Observable((observer) => {
      this.http.post(this.globals.apiLoginUrl, {
        username: username,
        password: password
      })
        .subscribe(
          (data: any) => {
            if (data.status != undefined) {
              if (data.status == true) {
                this.isLoggedIn = true;
                this.globals.isLoggedIn = true;
                this.getProfile();
                this.loginEvent.emit(true);
              }
              observer.next(data);
            } else {
              observer.next({ status: false, msg: "Terjadi kesalahan di server/jaringan" });
            }
            observer.complete();
          },
          (err: any) => {
            observer.next({ status: false, msg: "Terjadi kesalahan di server/jaringan" })
          }
        );
    });
    return obs;
  }

  is_checking_logged_in = false;

  req_if_logged_in() {
    return this.http.get(this.globals.apiCheckIfLoggedIn);
  }

  checkIfLoggedIn() {
    if (this.is_checking_logged_in == true) {
      return;
    }
    this.is_checking_logged_in = true;
    console.log("auth service", "check if logged in");
    this.req_if_logged_in()
      .pipe(
        retry(3)
      )
      .subscribe(
        (result: any) => {
          this.isLoggedIn = result.status;
          this.is_checking_logged_in = false;
          this.loginEvent.emit(true);
        },
        (err: any) => {
          this.is_checking_logged_in = false;
          // this.isLoggedIn = false;
          this.loginEvent.emit(true);
        }
      );
  }

  mustLogin(conf = null) {
    if (conf == null) {
      conf = {};
    }
    this.req_if_logged_in()
      .pipe(
        retry(3)
      )
      .subscribe(
        (res: any) => {
          if (res.status == false) {
            this.openLoginPage();
          } else {
            if (conf.mustHaveProfile == true) {
              this.getProfile();
            } else {

            }
          }
        },
        (err: any) => {
          this.openLoginPage();
        }
      )
  }

  req_profile() {
    return this.http.get(this.globals.apiGetProfile);
  }

  private is_getting_profile: boolean = false;
  getProfile() {
    this.req_profile()
      .pipe(
        retry(3)
      )
      .subscribe(
        (data: any) => {
          this.is_getting_profile = false;
          this.myProfile = data["customer"];
          if (this.myProfile != null) {
            this.nama_akun = this.myProfile.nama_customer;
          } else {
            this.nama_akun = "Customer";
            // this.myProfile = {};
          }
          // this.profileEvent.emit(true);
        },
        (err: any) => {
          this.is_getting_profile = false;
          this.myProfile = null;
          this.nama_akun = "";
          // this.profileEvent.emit(true);
          // this.notifyGetProfileListener();
        },
        () => {
          this.profileEvent.emit(true);
        }
      );
  }

  resendActivationEmail(email: string): Observable<any> {
    var ini = this;
    var r = ini.http.post(ini.globals.apiResendActivationEmail,
      new HttpParams().set("email", email)
    )
    return r;
  }

  openLoginPage() {
    console.log("open login page");
    this.router.navigate(["account/login"]);
  }

  updateProfile(profile, code = null) {
    var ac = this.myProfile == null ? "save" : "update";
    var c_param = new HttpParams();
    for (var i in profile) {
      if (profile[i] == null) {
        continue;
      }
      c_param = c_param.append(i, profile[i]);
    }
    var url = this.globals.apiProfile + ac + "_json";
    this.http.post(url, c_param)
      .subscribe(
        (data: any) => {
          if (data.status == true) {
            this.myProfile = data.data;
            this.nama_akun = this.myProfile.nama_customer;
            swal("Berhasil", "Profile berhasil diperbarui", "success");
          } else {
            swal("Kesalahan", data.msg, "error");
          }
          this.profileEvent.emit({ code: code });
        },
        (err: any) => { this.globals.swalHttpError(err); }
      );
  }

  updatePhotoProfile(newProfilePhoto) {
    if (newProfilePhoto == null) {
      console.log("foto null");
      return;
    }
    if (this.isLoggedIn == false) {
      console.log("tidak sedang login");
      return;
    }
    let fd = new FormData();
    fd.append("photo", newProfilePhoto);

    this.globals.swalBlockUI({ text: "Mengupload foto profil" });

    this.http.post(this.globals.apiProfile + "update_profile_photo", fd)
      .subscribe(
        (result: any) => {
          console.log("update photo respon received", result);
          if (result.status == true) {
            this.profileEvent.emit({ code: "photo" });
            this.myProfile = result.data;
          }
        },
        (err: any) => {
          console.log("error when update profile photo ", err);
          this.globals.swalHttpError(err);
        }
      );
  }

}
