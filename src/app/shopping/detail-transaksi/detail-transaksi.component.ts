import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { BaseauthService } from '../../services/baseauth.service';
import { Globals } from '../../global';
import { TransactionTools } from '../../tools/TransactionTools';

@Component({
  selector: 'app-detail-transaksi',
  templateUrl: './detail-transaksi.component.html',
  styleUrls: ['./detail-transaksi.component.css']
})
export class DetailTransaksiComponent implements OnInit, OnDestroy {

  subLogin: Subscription;
  subRoute: Subscription;

  kodeTransaksi = null;
  Transaksi = null;

  isRequestingTransaksi = true;
  isTransactionFound = false;
  // showPaymentExpiration = true;
  // showAddPayment = true;
  // showStatusDelivery = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public auth: BaseauthService,
    private http: HttpClient,
    private globals: Globals,
    private ttl: Title,
    private tt: TransactionTools
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Detail Transaksi - Auliastore");

    this.subLogin = this.auth.loginEvent.subscribe(() => {
      if (this.auth.isLoggedIn == false) {
        this.auth.openLoginPage();
      }
    });
    /* handle perubahan url jika user mengubah url secara manual */
    this.subRoute = this.router.events.subscribe((ev) => {
      if(ev instanceof NavigationEnd){        
        this.reqDetailTransaksi();
      }
    });
    this.reqDetailTransaksi();
    this.auth.checkIfLoggedIn();
  }

  ngOnDestroy() {
    if (this.subLogin != undefined) {
      this.subLogin.unsubscribe();
    }
    if (this.subRoute != undefined) {
      this.subRoute.unsubscribe();
    }
  }

  reqDetailTransaksi() {
    this.kodeTransaksi = this.route.snapshot.paramMap.get("kode_transaksi");
    if (this.kodeTransaksi == null) {
      this.router.navigate(["shopping/transaksi"]);
      return;
    }
    this.isRequestingTransaksi = true;
    this.isTransactionFound = false;
    this.http.post(this.globals.apiCheckout + "get_one", { where: { kode_checkout: this.kodeTransaksi } })
      .subscribe(
        (result: any) => {
          this.isRequestingTransaksi = false;
          if (result != null) {
            this.Transaksi = result;
            this.prepareDataTransaksi();
            this.isTransactionFound = true;
          } else {
            this.isTransactionFound = false;
          }
        },
        (err: any) => {
          this.isRequestingTransaksi = false;
        }
      );
  }

  prepareDataTransaksi() {
    if (this.Transaksi.details != undefined) {
      for (var i = 0, i2 = this.Transaksi.details.length; i < i2; i++) {
        this.Transaksi.details[i].snapshot_cart = JSON.parse(this.Transaksi.details[i].snapshot_cart);
      }
    }
    // var ps = this.globals.asStatusTransaksi(this.Transaksi);

    // this.Transaksi.payment_status_text = ps.status_name;
    // this.Transaksi["delivery_status_text"] = ps.statusDeliveryText;
  
    this.tt.setStatusTransaksi(this.Transaksi);

    // this.showPaymentExpiration = ps.showPaymentExpiration;
    // this.showAddPayment = ps.showAddPayment;
    // this.showStatusDelivery = ps.showStatusDelivery;
    if (this.Transaksi.snapshot_alamat != null) {
      this.Transaksi.snapshot_alamat = JSON.parse(this.Transaksi.snapshot_alamat);
    }
  }

}
