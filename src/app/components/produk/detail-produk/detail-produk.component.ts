import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../../../global';
import { ShoppingService } from '../../../services/shopping.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { RecentProductService } from '../../../services/recent-product.service';

@Component({
  selector: 'app-detail-produk',
  templateUrl: './detail-produk.component.html',
  styleUrls: ['./detail-produk.component.css']
})
export class DetailProdukComponent implements OnInit, OnDestroy {

  kode_produk;
  produk: any;
  load_data_status = "loading";
  already_in_wishlist = false;
  is_in_cart = false;
  ratingArray = [1, 2, 3, 4, 5];
  reviewArray = [];

  subRouter: Subscription;
  subWishlist: Subscription;
  subCart: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public globals: Globals,
    public shopping: ShoppingService,
    private ttl: Title,
    private rcntPrd: RecentProductService
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Detail Produk - Auliastore");
    window.scrollTo(0, 0);
    this.subRouter = this.router.events.subscribe(ev => {
      if(ev instanceof NavigationEnd){
        this.loadDetailProduk();
      }
    });
    this.subWishlist = this.shopping.wishlistEvent.subscribe(() => { this.checkWishlistStatus() });
    this.subCart = this.shopping.cartEvent.subscribe(() => { this.checkCartStatus() });
    this.loadDetailProduk();
  }

  ngOnDestroy(){
    if(this.subRouter != undefined){
      this.subRouter.unsubscribe();
    }
    if(this.subCart != undefined){
      this.subCart.unsubscribe();
    }
    if(this.subWishlist != undefined){
      this.subWishlist.unsubscribe();
    }
  }

  loadDetailProduk() {
    this.load_data_status = "loading";
    this.kode_produk = this.route.snapshot.paramMap.get("kode_produk");
    this.http.post(this.globals.apiProduct + "get_one?get-detail-produk", {
      where: {
        "_.kode_product": this.kode_produk
      }
    })
      .subscribe(
        (resp: any) => {
          if (resp == null) {
            this.load_data_status = "not_found";
          } else {
            this.load_data_status = "found";
            this.produk = resp;
            this.checkWishlistStatus();
            this.checkCartStatus();
            this.rcntPrd.addRecentProduct(this.produk);

            this.ttl.setTitle(this.produk["nama_product"] + " - Auliastore");

            this.loadReviews();
          }
        },
        (err: any) => {
          this.load_data_status = "error";
        }
      );
  }

  loadReviews() {
    this.http.post(this.globals.apiReviewTransaction + "get_many?get-review", {
      where: {
        "_.id_ec_product": this.produk["id_product"],
        "_.review is not null": null
      },
      order: [["_.created_at", "desc"]]
    })
      .subscribe(
        (result: Array<any>) => {
          this.reviewArray = result;
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  checkWishlistStatus() {
    var pos = this.globals.posObjectInArray(this.shopping.myWishlist, { id_product: this.kode_produk });
    this.already_in_wishlist = pos >= 0;
    // console.log("already in wishlist ", this.already_in_wishlist);
  }

  checkCartStatus() {
    var pos = this.globals.posObjectInArray(this.shopping.myCart, { kode_product: this.kode_produk });
    this.is_in_cart = pos >= 0;
  }

  addOrRemoveWishlist() {
    if (this.already_in_wishlist) {
      this.shopping.removeFromWishlist(this.produk);
    } else {
      // this.shopping.addWishList(this.produk).subscribe();
      this.shopping.addWishList(this.produk);
    }
  }

}
