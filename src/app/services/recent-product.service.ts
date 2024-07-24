import { Injectable, EventEmitter } from '@angular/core';
import { BaseauthService } from './baseauth.service';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';

@Injectable()
export class RecentProductService {

  myRecentProducts = [];
  isRequestingRecentProduct = false;
  lastRequestTimestamp = 0;
  refreshThreshold = 1000 * 60 * 5;

  recentProductEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private auth: BaseauthService,
    private http: HttpClient,
    private glb: Globals
  ) { }

  refreshRecentProduct() {
    // console.log("threshold refresh", this.refreshThreshold);
    if (this.isRequestingRecentProduct == true) {
      // console.log("request recent view produk batal karena ada request yang masih berjaaln");
      return;
    }
    if (this.auth.isLoggedIn == false) {
      // console.log("request recent view produk batal karena tidak sedang login");
      return;
    }
    let c = (new Date()).getTime();
    let d = c - this.lastRequestTimestamp;
    // console.log("selisih waktu refresh terakhir", d);
    if (d < this.refreshThreshold) {
      // console.log("batal request recent view product karena waktu terakhir request (", this.lastRequestTimestamp, ") kurang dari threshold (", this.refreshThreshold, ") dengan selisih (",d,")");
      return;
    }
    // console.log("request recent product: current time:", c);
    this.lastRequestTimestamp = c;
    this.http.post(this.glb.apiRecentViewProduct + "get_many?refresh-recent-product", {
      order: [["_.updated_at", "desc"], ["_.created_at", "desc"]],
      limit: [5]
    })
      .subscribe(
        (result: any) => {
          this.myRecentProducts = result;
        },
        (err: any) => {
          this.myRecentProducts = [];
        }, 
        () => {
          this.isRequestingRecentProduct = false;
          this.recentProductEvent.emit(true);
        }
      );
  }

  addRecentProduct(produk) {
    var pos = this.glb.posObjectInArray(this.myRecentProducts, { id_product: produk.id_product });
    if (pos >= 0) {
      this.myRecentProducts.splice(pos, 1);
    }
    this.myRecentProducts.unshift(produk);
    var counter = 0;
    while (this.myRecentProducts.length > 5) {
      this.myRecentProducts.splice(4, 1);
      counter++;
      if (counter > 100) {
        break;
      }
    }

    this.http.post(this.glb.apiRecentViewProduct + "save_json?recent-product", {
      id_product: produk.id_product
    })
      .subscribe();
  }

}
