import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../global';
import { BaseauthService } from '../../services/baseauth.service';

@Component({
  selector: 'app-add-checkout-payment',
  templateUrl: './add-checkout-payment.component.html',
  styleUrls: ['./add-checkout-payment.component.css']
})
export class AddCheckoutPaymentComponent implements OnInit, OnDestroy {

  kodeTransaksi = "";
  myTransaksi: any;
  isTransactionFound = false;
  isRequesting = true;
  alamatLoaded = false;
  paymentMethodLoaded = false;
  inputFile: any;
  imagePreviewData;
  hasHistoryPayment = false;
  historyPayment = [];

  subLogin: Subscription;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public gbl: Globals,
    private router: Router,
    public auth: BaseauthService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Pembayaran - Auliastore");
    var getDataCheckout = () => {
      this.kodeTransaksi = this.route.snapshot.paramMap.get("kode_checkout");
      if(this.kodeTransaksi == null){
        return;
      }
      this.isRequesting = true;
      this.http.post(this.gbl.apiCheckout + "get_one", {
        where: { kode_checkout: this.kodeTransaksi }
      })
        .subscribe(
          (resp: any) => {
            if (resp != null) {
              this.isTransactionFound = true;
              this.myTransaksi = resp;
              this.myTransaksi["tujuan_pengiriman"] = JSON.parse(this.myTransaksi.snapshot_alamat);
              this.myTransaksi["payment_method"] = JSON.parse(this.myTransaksi.snapshot_payment);
              this.reqHistoryPayment();
              // console.log("transaksi ", this.myTransaksi);
            }
          },
          (err: any) => {
            this.gbl.swalHttpError(err);
          },
          () => {
            this.isRequesting = false;
          }
      );
    }

    this.subLogin = this.auth.loginEvent.subscribe(
      () => {
        if (this.auth.isLoggedIn == false) {
          this.auth.openLoginPage();
        } else {
          getDataCheckout();
        }
      }
    );
    this.auth.checkIfLoggedIn();
  }

  ngOnDestroy() {
    // console.log("component destroyed");
    if(this.subLogin != undefined){
      this.subLogin.unsubscribe();
    }
  }

  reqHistoryPayment() {
    this.http.post(this.gbl.apiPaymentTransaction + "get_many?history-payment",
      new HttpParams().set("where", JSON.stringify({ "co.kode_checkout": this.kodeTransaksi }))
    )
      .subscribe(
        (result: any) => {
          this.historyPayment = result;
          this.hasHistoryPayment = this.historyPayment.length > 0;
          for (var i = 0, i2 = this.historyPayment.length; i < i2; i++) {
            var hstry = this.historyPayment[i];
            var status_text = "Status Pembayaran tidak dikenal";
            switch (hstry.verified_status) {
              case "0":
                status_text = "Pembayaran belum diverifikasi";
                break;
              case "1":
                status_text = "Pembayaran telah diverifikasi";
                break;
              case "2":
                status_text = "Pembayaran ditolak";
                break;
            }
            this.historyPayment[i].status_text = status_text;
          }
        }
      );
  }

  reqInfoAlamat() {
    this.http.post(this.gbl.apiAlamatCustomer + "get_one",
      new HttpParams()
        .set("where", JSON.stringify({ id_alamat: this.myTransaksi.alamat }))
    )
      .subscribe(
        (resp: any) => {
          if (resp != null) {
            console.log("alamat pengiriman ", resp);
            this.myTransaksi.tujuan_pengiriman = resp;
            this.alamatLoaded = true;
          }
        }
      );
  }
  reqInfoPaymentMethod() {
    this.http.post(this.gbl.apiPaymentMethod + "get_one",
      new HttpParams()
        .set("where", JSON.stringify({ id_payment_method: this.myTransaksi.payment }))
    )
      .subscribe(
        (resp: any) => {
          if (resp != null) {
            console.log("payment method ", resp);
            this.myTransaksi.payment_method = resp;
            this.paymentMethodLoaded = true;
          }
        }
      )
  }

  inputFileChanged(event) {
    this.imagePreviewData = "";
    this.inputFile = null;
    if (event.target.files.length > 0) {
      this.inputFile = event.target.files[0];
    }
    console.log(this.inputFile);

    if (this.inputFile == null) {
      return;
    }

    if (this.inputFile.type.indexOf("image") < 0) {
      this.inputFile = null;
      swal({
        title: "Kesalahan",
        type: "error",
        text: "Harap pilih berkas bukti transfer dalam format jpg atau png"
      });
      return;
    }

    if (FileReader && this.inputFile != null) {
      let fr = new FileReader();
      fr.onload = () => {
        this.imagePreviewData = fr.result;
      }
      fr.readAsDataURL(this.inputFile);
    }
  }

  clickUpload() {
    if (this.inputFile == undefined || this.inputFile == null) {
      swal("Kesalahan", "Harap lampirkan gambar bukti pembayaran", "error");
      return;
    }
    swal({
      title: "Harap Tunggu",
      text: "Sedang mengupload bukti transfer",
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });

    let fd = new FormData();
    fd.append("bukti_pembayaran", this.inputFile, this.inputFile.name);
    fd.append("kode_transaksi", this.kodeTransaksi);

    this.http.post(this.gbl.apiPaymentTransaction + "save_json", fd)
      .subscribe(
        (resp: any) => {
          if (resp.status == true) {
            swal("Berhasil", "Bukti pembayaran berhasil disimpan", "success")
              .then((v) => {
                this.router.navigate(["/shopping/transaksi"]);
              });
          } else if (resp.status == false) {
            swal("Kesalahan", resp.msg, "error");
          } else {
            swal("Kesalahan", "Respon server tidak dikenal", "error");
          }
        },
        (err: any) => {
          this.gbl.swalHttpError(err);
        }
      );
  }

}
