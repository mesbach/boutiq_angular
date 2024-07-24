import { Injectable, EventEmitter, Output, ElementRef } from '@angular/core';
import { BaseauthService } from "./baseauth.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Globals } from './../global';
import swal from "sweetalert2";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingService {

  myWishlist = [];
  myCart = [];
  myRecentProducts = [];
  priceTotalInCart = 0;
  unfinishedTransCount = 0;

  searchKeyword = "";

  @Output() wishlistEvent: EventEmitter<any> = new EventEmitter();
  @Output() cartEvent: EventEmitter<any> = new EventEmitter();
  @Output() recentProductEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public auth: BaseauthService,
    private http: HttpClient,
    public globals: Globals,
  ) { }

  addWishList(product) {
    console.log("add to wish list", product);
    if (this.auth.isLoggedIn == false) {
      this.auth.openLoginPage();
      return;
    }
    this.http.post(this.globals.apiWishList + "save_json?save-wishlist",
      new HttpParams()
        .set("id_product", product.id_product)
    )
      .subscribe(
        (result: any) => {
          if (result.status == true) {
            for (var i = 0, i2 = result.data.length; i < i2; i++)
              this.myWishlist.push(result.data[i]);
          }
          this.wishlistEvent.emit(true);
        },
        (err: any) => {
          console.log("add wishlist error", err);
        }
      );
  }

  removeFromWishlist(product) {
    if (this.auth.isLoggedIn == false) {
      console.log("hapus wishlist dibatalkan karena belum login");
      return;
    }
    this.http.post(this.globals.apiWishList + "hapus?hapus-wishlist",
      new HttpParams()
        .set("where", JSON.stringify({ "_.id_product": product.id_product }))
    )
      .subscribe(
        (result: any) => {
          if (result.status == true) {
            //hapus dari array local
            var pos = this.globals.posObjectInArray(this.myWishlist, { id_product: product.id_product });
            if (pos >= 0) {
              this.myWishlist.splice(pos, 1);
            }
            this.wishlistEvent.emit(true);
          }
        },
        (err: any) => {
          console.log("error menghapus wishlist", err);
        }
      );
  }

  addToCart(product) {
    console.log("add to card", product);
    var ini = this;
    if (ini.auth.isLoggedIn == false) {
      swal("Tambah Ke Keranjang", "Anda harus login terlebih dahulu", "warning")
        .then((v) => {
          this.auth.openLoginPage();
        });
      return;
    }

    ini.http.post(ini.globals.apiCart + "save_json?save-cart",
      new HttpParams()
        .set("id_product", product.id_product)
    )
      .subscribe((data: any) => {
        if (data.status == true) {
          // ini.auth.addToCart(data.data);
          var exist = false;
          for (var i = 0, i2 = this.myCart.length; i < i2; i++) {
            var c = this.myCart[i];
            if (c.id_cart == data.data.id_cart) {
              exist = true;
              this.myCart[i]["qty"]++;
              break;
            }
          }
          if (exist == false) {
            this.myCart.push(data.data);
          }
          this.updateCartArray();
          this.cartEvent.emit(true);
        } else {
          swal({
            title: "Kesalahan",
            text: data.msg,
            type: "error"
          });
        }
      });
  }

  removeFromCart(cart_item) {
    console.log("remove from cart", cart_item);
    return new Observable((observer) => {
      this.http.post(this.globals.apiCart + "hapus?hapus-cart",
        new HttpParams()
          .set("id", cart_item.id_cart)
      )
        .subscribe(
          (res: any) => {
            if (res.status == true) {
              for (var i = 0, i2 = this.myCart.length; i < i2; i++) {
                var c = this.myCart[i];
                if (c.id_cart == cart_item.id_cart) {
                  this.myCart.splice(i, 1);
                  this.updateCartArray();
                  break;
                }
              }
            }
            if (res.status == undefined) {
              observer.next({ status: false, msg: "Respon server tidak dikenal" });
            } else {
              observer.next(res);
            }
            observer.complete();
            this.cartEvent.emit(true);
          },
          (err: any) => {
            observer.next({ status: false, msg: "Terjadi kesalahan di server/jaringan" });
            observer.complete();
          }
        );
    });
  }

  checkout(data: {products: Array<any>, payment: any, alamat:any, id_delivery_fee: any}) {
    var list_id_cart = [];
    var n_product = data.products.length;
    for (var i = 0, i2 = n_product; i < i2; i++) {
      var cart = data.products[i];
      list_id_cart.push(cart.id_cart);
    }
    // var param = new HttpParams()
    //   .set("list_cart", JSON.stringify(list_id_cart))
    //   .set("payment", data.payment)
    //   .set("alamat", data.alamat);
    var obs = new Observable((observer) => {
      this.http.post(this.globals.apiCheckout + "save_json?save-checkout", {
        list_cart: list_id_cart,
        payment: data.payment,
        alamat: data.alamat,
        id_delivery_fee: data.id_delivery_fee
      })
        .subscribe((res: any) => {
          console.log(res);
          if (res.status != undefined) {
            observer.next(res);
            observer.complete();
            if (res.status) {
              this.refreshCart();
            }
          } else {
            observer.next({ status: false, msg: "Respon server tidak dikenal" });
            observer.complete();
          }
        }, (err: any) => {
          console.log(err);
          observer.next({ status: false, msg: "Terjadi kesalahan di server/jaringan, " + err.error.text });
          observer.complete();
        });
    });
    return obs;
    // return this.http.post(this.globals.apiCheckout + "save_json", param);
  }

  getListAddress() {
    return this.http.post(this.globals.apiAlamatCustomer + "get_many?get-my-adrresses",
      new HttpParams()
    )
  }

  getListPaymentMethod() {
    return this.http.get(this.globals.apiPaymentMethod + "get_many?get-payment-method");
  }

  req_cart() {
    return this.http.get(this.globals.apiCart + "get_many?refresh-cart");
  }

  isRefreshingWishlist = false;
  refreshWishlist() {
    if (this.isRefreshingWishlist == true) {
      return;
    }
    this.isRefreshingWishlist = true;
    this.http.get(this.globals.apiWishList + "get_many?refresh-wishlist")
      .subscribe(
        (result: any) => {
          this.myWishlist = result;
          // observer.next(result);
          this.wishlistEvent.emit(true);
          // observer.complete();
        },
        (err: any) => {
          this.myWishlist = [];
          console.log("error get wishlist", err);
          // observer.next({ status: false, msg: "Terjadi kesalahan di jaringan/server" });
          // observer.complete();
        },
        () => {
          this.isRefreshingWishlist = false;
        }
      );
    // return new Observable((observer) => {
    //   if (this.auth.isLoggedIn == false) {
    //     this.myWishlist = [];
    //     observer.next({ status: false, msg: "Anda tidak dalam state login" });
    //     observer.complete();
    //   } else {
    //     this.http.get(this.globals.apiWishList + "get_many?refresh-wishlist")
    //       .subscribe(
    //         (result: any) => {
    //           this.myWishlist = result;
    //           observer.next(result);
    //           this.wishlistEvent.emit(true);
    //           observer.complete();
    //         },
    //         (err: any) => {
    //           this.myWishlist = [];
    //           observer.next({ status: false, msg: "Terjadi kesalahan di jaringan/server" });
    //           observer.complete();
    //         }
    //       );
    //   }
    // });
  }

  is_req_cart = false;
  refreshCart() {
    if (this.is_req_cart == true) {
      return;
    }
    this.is_req_cart = true;
    // console.log("refresh cart");
    if (this.auth.isLoggedIn == false) {
      this.updateCartArray([]);
      this.is_req_cart = false;
      this.cartEvent.emit();
      return;
    }

    this.req_cart().subscribe(
      (result: any) => {
        if (result.status != undefined) {
          this.updateCartArray([]);
        } else {
          this.updateCartArray(result);
        }
        this.is_req_cart = false;
        this.cartEvent.emit(true);
      },
      (err: any) => {
        this.updateCartArray([]);
        this.is_req_cart = false;
        this.cartEvent.emit();
      }
    );
  }

  updateCartArray(data = null) {
    if (data != null) {
      this.myCart = data;
    }
    this.priceTotalInCart = 0;
    for (var i = 0, i2 = this.myCart.length; i < i2; i++) {
      var c = this.myCart[i];
      this.priceTotalInCart += Number(c.price) * Number(c.qty);
    }
  }

  /* api update cart  */
  updateCart(carts) {
    // console.log(carts);
    // return;
    // return new Observable((observer) => {
    let param = new HttpParams();
    if (carts.carts != undefined) {
      param = param.set("carts", JSON.stringify(carts.carts));
    }
    if (carts.cart != undefined) {
      param = param.set("cart", JSON.stringify(carts.cart));
    }
    this.http.post(this.globals.apiCart + "update_json?update-cart", param)
      .subscribe(
        (res: any) => {
          // if (res.status == undefined) {
          // observer.next({ status: false, msg: "Respon server tidak dikenal" });
          // } else {
          // observer.next(res);
          if (res.status == true) {
            for (var i = 0, i2 = res.data.length; i < i2; i++) {
              var newCart = res.data[i];
              var pos = this.globals.posObjectInArray(this.myCart, { id_cart: newCart.id_cart });
              if (pos >= 0) {
                this.myCart[pos] = newCart;
              } else {
                this.myCart.push(newCart);
              }
            }
          }
          // }
          // observer.complete();
          this.cartEvent.emit(true);
        },
        (err: any) => {
          // observer.next({ status: false, msg: "Terjadi kesalahan di server/jaringan" });
          // observer.complete();
        }
      )
    // });
  }

  reqUnfinishedTransCount() {
    return new Observable((observer) => {
      if (this.auth.isLoggedIn == false) {
        this.unfinishedTransCount = 0;
        observer.next({ status: false, msg: "aplikasi tidak dalam state telah login" });
        observer.complete();
      } else {
        this.http.get(this.globals.apiCheckout + "unfinished_count")
          .subscribe(
            (result: any) => {
              // console.log(result);
              this.unfinishedTransCount = 0;
              if (result.jumlah != undefined) {
                this.unfinishedTransCount = Number(result.jumlah);
              }
              observer.next(result);
              observer.complete();
            },
            (err: any) => {
              this.unfinishedTransCount = 0;
              console.log(err);
              observer.next({ status: false, msg: "Terjadi kesalahan di server/jaringan" });
              observer.complete();
            }
          );
      }
    });
  }

  

}
