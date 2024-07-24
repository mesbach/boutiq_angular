import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Globals } from '../../global';
import { BaseauthService } from '../../services/baseauth.service';
import { FilterTools } from '../../tools/FilterTools';
import { TransactionTools } from '../../tools/TransactionTools';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent implements OnInit, OnDestroy {

  myTransaksi = [];
  itemPerPage = 5;
  currentPage = 1;
  itemFoundCount = 0;
  totalItemFound = 0;
  pageUrl = "";

  subLogin: Subscription;
  subRoute: Subscription;

  constructor(
    private http: HttpClient,
    public globals: Globals,
    public auth: BaseauthService,
    public ft: FilterTools,
    private route: ActivatedRoute,
    private router: Router,
    private ttl: Title,
    private tt: TransactionTools
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Riwayat Transaksi - Auliastore");
    this.pageUrl = this.route.snapshot.routeConfig.path;
    this.subLogin = this.auth.loginEvent.subscribe(
      (resp: any) => {
        if (this.auth.isLoggedIn == false) {
          this.auth.openLoginPage();
        }
      }
    );
    this.subRoute = this.route.queryParams.subscribe(val => {
      if (val.page != undefined) {
        this.currentPage = val.page;
      }
      this.makeRequest();
    });
    this.auth.mustLogin();
  }

  ngOnDestroy() {
    if (this.subLogin != undefined) {
      this.subLogin.unsubscribe();
    }
    if (this.subRoute != undefined) {
      this.subRoute.unsubscribe();
    }
  }

  makeRequest() {

    this.http.post(this.globals.apiCheckout + "get_many?get-transactions", {
      order: [["_.created_at", "desc"]],
      limit: this.ft.asLimit(this.currentPage, this.itemPerPage)
    })
      .subscribe(
        (resp: Array<any>) => {
          this.setData(resp);
          this.itemFoundCount = resp.length;
        },
        (err: any) => {
          this.setData([]);
        }
      );
  }

  setData(data) {
    this.myTransaksi = data;
    for (var i = 0, i2 = this.myTransaksi.length; i < i2; i++) {
      let deliveryFee = this.myTransaksi[i]["snapshot_delivery_fee"];
      if(deliveryFee != null){
        deliveryFee = JSON.parse(deliveryFee);
        this.myTransaksi[i]["delivery_fee"] = deliveryFee["fee"];
      }
      this.myTransaksi[i].details = [];
      var trans = this.myTransaksi[i];
      this.setStatusTransaksi(trans, i);
      this.reqDetailTransaksi(trans, i);
    }
    // console.log(this.myTransaksi);
  }

  reqDetailTransaksi(trans, index) {
    var sukses = (data) => {
      for (var i = 0, i2 = data.length; i < i2; i++) {
        data[i].snapshot_cart = JSON.parse(data[i].snapshot_cart);
      }
      this.myTransaksi[index].details = data;
    };
    this.http.post(this.globals.apiCheckoutDetail + "get_many?get-detail-transaction", {
      where: JSON.stringify({ "_.id_checkout": trans.id_checkout }),
    })
      .subscribe(
        (resp: any) => {
          if (resp.status == undefined) {
            sukses(resp);
          }
        },
        (err: any) => {
          sukses([]);
        }
      );
  }

  setStatusTransaksi(trans, index) {
    this.tt.setStatusTransaksi(this.myTransaksi[index]);
  }

  reqDetailAlamat(trans, index) {
    var sukses = (resp) => {
      this.myTransaksi[index].nama_provinsi = resp.nama_provinsi;
      this.myTransaksi[index].nama_kabupaten = resp.nama_kabupaten;
      this.myTransaksi[index].nama_kecamatan = resp.nama_kecamatan;
      this.myTransaksi[index].nama_kelurahan = resp.nama_kelurahan;
      this.myTransaksi[index].alamat_lengkap = resp.alamat_lengkap;
    }
    this.http.post(this.globals.apiAlamatCustomer + "get_one", new HttpParams().set("where", JSON.stringify({ id_alamat: trans.alamat })))
      .subscribe(
        (resp: any) => {
          if (resp != null) {
            sukses(resp);
          }
        }
      );
  }

  totalItemFoundChanged(total) {
    this.totalItemFound = total;
  }

  pageChanged(page) {
    // console.log("change page to", page);
    this.currentPage = page;
    this.updateUrl();
    window.scrollTo(0,0);
  }

  updateUrl() {
    let qp = {
      page: this.currentPage
    };
    this.router.navigate([this.pageUrl], { queryParams: qp });
  }

}
