import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import { Title } from '@angular/platform-browser';
import { BaseauthService } from '../../services/baseauth.service';

@Component({
  selector: 'app-resend-activation-email',
  templateUrl: './resend-activation-email.component.html',
  styleUrls: ['./resend-activation-email.component.css']
})
export class ResendActivationEmailComponent implements OnInit {

  email: string = "";

  constructor(
    private auth: BaseauthService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Aktivasi - Auliastore");
  }

  sendActivationEmail(){
    var ini = this;
    swal({
      title: "Aktivasi Akun",
      text: "Sedang mengirim ulang email aktivasi akun"
    });
    ini.auth.resendActivationEmail(ini.email)
    .subscribe((resp:any)=>{
      console.log(resp);
      if(resp.status == true){
        swal({
          type: "success",
          title: "Berhasil",
          text: resp.msg
        });
      } else {
        swal({
          type: "error",
          title: "Terjadi Kesalahan",
          text: resp.msg
        });
      }
    });
  }

}
