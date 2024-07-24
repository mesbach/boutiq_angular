import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { BaseauthService } from '../../services/baseauth.service';
import { ShoppingService } from '../../services/shopping.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global';
import { CurrencyPipe } from '@angular/common';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  products = [];
  totalProductPrice = 0;
  totalPrice = 0;
  listAlamatPengiriman = [];
  listPaymentMethod = [];
  dataCheckout = {
    alamat: "",
    payment_method: ""
  };
  selected_alamat = null;
  selected_payment_method = null;
  deliveryFee = null;
  deliveryFeeNumber = 0;

  subLogin: Subscription;
  subCart: Subscription;
  isRequestingAlamat = true;
  isRequestingPaymentMethod = true;

  constructor(
    public auth: BaseauthService,
    private router: Router,
    private shopping: ShoppingService,
    private ttl: Title,
    private http: HttpClient,
    private glb: Globals,
  ) { }

  ngOnDestroy() {
    if (this.subLogin != undefined) {
      this.subLogin.unsubscribe();
    }
    if (this.subCart != undefined) {
      this.subCart.unsubscribe();
    }
  }

  ngOnInit() {
    this.ttl.setTitle("Checkout - Auliastore");
    this.subCart = this.shopping.cartEvent.subscribe(
      (resp: any) => {
        console.log("receive cart event");
        this.setCart();
        this.shopping.getListAddress().subscribe((data: any) => {
          this.listAlamatPengiriman = data;
          this.isRequestingAlamat = false;
        });
        this.shopping.getListPaymentMethod().subscribe((data: any) => {
          this.listPaymentMethod = data;
          this.isRequestingPaymentMethod = false;
        });
      }
    );
    this.subLogin = this.auth.loginEvent.subscribe(
      (resp: any) => {
        console.log("receive login event");
        if (this.auth.isLoggedIn == true) {
          this.shopping.refreshCart();
        } else {
          this.auth.openLoginPage();
        }
      }
    );
    this.auth.checkIfLoggedIn();
  }

  setCart() {
    this.products = this.shopping.myCart;
    for (var i = 0, i2 = this.products.length; i < i2; i++) {
      var p = this.products[i];
      this.totalProductPrice += Number(p.price) * Number(p.qty);
    }
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    if (this.deliveryFee != null) {
      this.deliveryFeeNumber = Number(this.deliveryFee["fee"]);
    } else {
      this.deliveryFeeNumber = 0;
    }
    this.totalPrice = Number(this.totalProductPrice) + Number(this.deliveryFeeNumber);
  }

  checkoutProducts() {
    var reason = "";
    if (this.products.length == 0) {
      reason = "Barang kosong";
    } else if (this.dataCheckout.alamat.length == 0) {
      reason = "Pilih alamat pengiriman";
    } else if (this.dataCheckout.payment_method.length == 0) {
      reason = "Pilih metode pembayaran";
    } else if (this.deliveryFee == null) {
      reason = "Alamat pengiriman tidak terjangkau";
    }
    if (reason.length > 0) {
      swal({ title: "Kesalahan", type: "error", text: reason });
      return;
    }

    swal({
      title: "Mohon tunggu",
      text: "Memproses checkout keranjang belanja"
    });

    this.shopping.checkout({
      products: this.products,
      alamat: this.dataCheckout.alamat,
      payment: this.dataCheckout.payment_method,
      id_delivery_fee: this.deliveryFee["id_delivery_fee"]
    })
      .subscribe(
        (data: any) => {
          if (data.status == true) {
            // this.router.navigate(["payment/info"]);
            swal({
              type: "success",
              title: "Berhasil",
              text: "Checkout berhasil"
            }).then((v) => {
              if (v) {
                this.router.navigate(["/shopping/transaksi"]);
              }
            });
          } else {
            swal({
              type: "error",
              title: "Kesalahan",
              text: data.msg
            });
          }
        },
        (err: any) => {
          this.glb.swalHttpError(err);
        }
      );
  }

  alamatChanged() {
    for (var i = 0, i2 = this.listAlamatPengiriman.length; i < i2; i++) {
      var alm = this.listAlamatPengiriman[i];
      if (alm.id_alamat == this.dataCheckout.alamat) {
        this.selected_alamat = alm;
        this.reqDeliveryFee();
        break;
      }
    }
  }

  reqDeliveryFee() {
    console.log("request delivery fee", this.selected_alamat);
    let idSurabaya = "3578";
    let idJatim = "35";
    let deliveryProvinsi = () => {
      this.http.post(this.glb.apiDeliveryFee + "get_one?delivery-fee-provinsi", {
        where: {
          "_.id_provinsi_destination": this.selected_alamat["provinsi"],
          "_.id_provinsi_origin": idJatim
        }
      })
        .pipe(
          retry(2)
        )
        .subscribe(
          (result: any) => {
            this.deliveryFee = result;
            this.updateTotalPrice();
          }
        );
    };
    let deliveryKabupaten = () => {
      this.http.post(this.glb.apiDeliveryFee + "get_one?delivery-fee-kabupaten", {
        where: {
          "_.id_kabupaten_destination": this.selected_alamat["kabupaten"],
          "_.id_kabupaten_origin": idSurabaya
        }
      })
        .pipe(
          retry(2)
        )
        .subscribe(
          (result: any) => {
            if (result == null) {
              deliveryProvinsi();
            } else {
              this.deliveryFee = result;
              this.updateTotalPrice();
            }
          },
      );
    };
    let deliveryKecamatan = () => {
      this.http.post(this.glb.apiDeliveryFee + "get_one?delivery-fee-kecamatan", {
        where: {
          "_.id_kecamatan_destination": this.selected_alamat["kecamatan"],
          "_.id_kabupaten_origin": idSurabaya
        }
      })
        .pipe(
          retry(2)
        )
        .subscribe(
          (result: any) => {
            if (result == null) {
              deliveryKabupaten();
            } else {
              this.deliveryFee = result;
              this.updateTotalPrice();
            }
          }
        );
    };
    deliveryKecamatan();
  }

  paymentMethodChanged() {
    console.log("payment method changed", this.dataCheckout);
    var id_pm = this.dataCheckout.payment_method;
    for (var i = 0, i2 = this.listPaymentMethod.length; i < i2; i++) {
      var pm = this.listPaymentMethod[i];
      if (pm.id_payment_method == id_pm) {
        this.selected_payment_method = pm;
        break;
      }
    }
  }

}
