import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Globals } from '../../global';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {
  activation_code: string;
  activation_msg: string = "Harap tunggu, akun Anda sedang diaktifkan";
  show_msg=true;
  show_input=false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private globals: Globals
  ) { }

  ngOnInit() {
    console.log(this.constructor.name + ", on init");
    this.activation_code = this.route.snapshot.paramMap.get("activation_code");

    if (this.activation_code == null || this.activation_code.length == 0) {
      this.show_msg=false;
      this.show_input=true;
    }else{
      this.sendActivation();
    }
  }

  sendActivation() {
    this.show_msg = true;
    this.activation_msg = "Harap tunggu, akun Anda sedang diaktifkan";
    var ini = this;
    this.http.post(this.globals.apiAktivasiAkun,
      new HttpParams().set("activation_code", this.activation_code)
    )
      .subscribe((resp: any) => {
        this.activation_msg = resp.msg;
        if (resp.status == true) {
          this.show_input = false;
          setTimeout(function () {
            ini.router.navigate([""]);
          }, 3000);
        } 
      });
  }

}
