import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { BaseauthService } from '../../services/baseauth.service';
import { ShoppingService } from '../../services/shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  myCarts = [];
  subTotal = 0;
  total = 0;
  hasQtyChange = false;

  subLogin: Subscription;
  subCart: Subscription;

  constructor(
    public auth: BaseauthService,
    public shopping: ShoppingService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Keranjang Belanja - Auliastore");
    this.subLogin = this.auth.loginEvent.subscribe(() => {
        if (this.auth.isLoggedIn == true) {
          // this.getDataCart();
          this.shopping.refreshCart();
        } else {
          this.auth.openLoginPage();
        }
      }
    );
    this.subCart = this.shopping.cartEvent.subscribe(()=>{
      this.setDataCart(this.shopping.myCart);
    });
    this.auth.checkIfLoggedIn();
  }

  ngOnDestroy(){
    console.log("component destroyed");
    this.subLogin.unsubscribe();
    this.subCart.unsubscribe();
  }

  setDataCart(carts) {
    this.myCarts = carts;
    this.subTotal = 0;
    for (var i = 0, i2 = this.myCarts.length; i < i2; i++) {
      this.myCarts[i].new_qty = this.myCarts[i].qty;
    }
    this.hitungNilaiCart();
    swal.close();
  }

  qtyChanged() {
    this.hitungNilaiCart();
  }

  hitungNilaiCart() {
    this.subTotal = 0;
    this.hasQtyChange = false;
    for (var i = 0, i2 = this.myCarts.length; i < i2; i++) {
      this.subTotal += Number(this.myCarts[i].new_qty) * Number(this.myCarts[i].price);
      if (Number(this.myCarts[i].new_qty) != Number(this.myCarts[i].qty)) {
        this.hasQtyChange = true;
      }
    }
    this.total = this.subTotal;
  }

  updateCart() {
    var carts = [];
    for (var i = 0, i2 = this.myCarts.length; i < i2; i++) {
      let { id_cart, new_qty, qty } = this.myCarts[i];
      if (Number(new_qty) != Number(qty)) {
        carts.push({ id_cart, new_qty });
      }
    }
    swal({
      title: "Mohon Tunggu",
      text: "sedang menyimpan keranjang belanja",
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });
    this.shopping.updateCart({ carts });
  }

  dialogHapus(cart) {
    swal({
      title: "Konfirmasi Hapus Cart",
      text: "Anda akan menghapus " + cart["nama_product"] + " dari keranjang belanja?",
      type: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true
    })
      .then((v) => {
        if (v.value == true) {
          this.shopping.removeFromCart(cart).subscribe(
            (res: any) => {
              if (res.status == true) {
                this.setDataCart(this.shopping.myCart);
              } else {
                swal({
                  type: "error",
                  title: "Kesalahan",
                  text: res.msg
                });
              }
            }
          );
        }
      });
  }

}
