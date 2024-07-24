import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';
import { Globals } from '../../global';
import { BaseauthService } from '../../services/baseauth.service';
import { TransactionTools } from '../../tools/TransactionTools';

@Component({
  selector: 'app-review-transaksi',
  templateUrl: './review-transaksi.component.html',
  styleUrls: ['./review-transaksi.component.css']
})
export class ReviewTransaksiComponent implements OnInit, OnDestroy {

  isRequestingTransaction = false;
  isTransactionFound = false;
  kodeTransaksi = null;
  Transaksi = null;
  hoverRating = 0;
  currentRating = 0;
  reviewContent = "";
  ratingArray = [1, 2, 3, 4, 5];

  subRouter: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public glb: Globals,
    private http: HttpClient,
    private auth: BaseauthService,
    private tt: TransactionTools
  ) { }

  ngOnInit() {
    this.subRouter = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.makeRequest();
      }
    });
    this.makeRequest();
    this.auth.mustLogin();
  }

  ngOnDestroy() {
    if (this.subRouter != undefined) {
      this.subRouter.unsubscribe();
    }
  }

  makeRequest() {
    this.kodeTransaksi = this.route.snapshot.paramMap.get("kode_transaksi");

    if (this.kodeTransaksi == null) {
      this.isTransactionFound = false;
      return;
    }

    this.isRequestingTransaction = true;
    this.http.post(this.glb.apiCheckout + "get_one?get-detail-transaction-for-review", {
      where: { "_.kode_checkout": this.kodeTransaksi }
    })
      .subscribe(
        (result: any) => {
          if (result == null) {
            this.isTransactionFound = false;
          } else {
            this.isTransactionFound = true;
            this.Transaksi = result;

            if (this.Transaksi["snapshot_alamat"] != null) {
              this.Transaksi["snapshot_alamat"] = JSON.parse(this.Transaksi["snapshot_alamat"]);
            }
            if (this.Transaksi["snapshot_payment"] != null) {
              this.Transaksi["snapshot_payment"] = JSON.parse(this.Transaksi["snapshot_payment"]);
            }
            for (let i = this.Transaksi["details"].length - 1; i >= 0; i--) {
              if (this.Transaksi["details"][i]["snapshot_cart"] != null) {
                this.Transaksi["details"][i]["snapshot_cart"] = JSON.parse(this.Transaksi["details"][i]["snapshot_cart"]);
                // this.Transaksi["details"][i]["currentRating"] = 0;
                this.Transaksi["details"][i]["hoverRating"] = 0;
              }
            }

            this.tt.setStatusTransaksi(this.Transaksi);
          }
        },
        (err: any) => {
          this.isTransactionFound = false;
        },
        () => {
          this.isRequestingTransaction = false;
        }
      );
  }

  ratingHover(rating, id) {
    // console.log("rate star hovered", rating);
    // this.hoverRating = rating;
    let index = this.glb.posObjectInArray(this.Transaksi["details"], { id_detail_checkout: id });
    if (index >= 0) {
      this.Transaksi["details"][index]["hoverRating"] = rating;
    }
  }

  resetRatingHover(id) {
    // this.hoverRating = 0;
    let index = this.glb.posObjectInArray(this.Transaksi["details"], { id_detail_checkout: id });
    if (index >= 0) {
      this.Transaksi["details"][index]["hoverRating"] = 0;
    }
  }

  setRating(rating, id) {
    let index = this.glb.posObjectInArray(this.Transaksi["details"], { id_detail_checkout: id });
    if (index >= 0) {
      let id_detail_checkout = this.Transaksi["details"][index]["id_detail_checkout"];
      this.Transaksi["details"][index]["rating_value"] = rating;

      this.http.post(this.glb.apiReviewTransaction + "save_json?save-rating", {
        rating_value: rating,
        id_detail_checkout: id_detail_checkout
      })
        .subscribe(
          (result: any) => {
            if (result["status"] == false) {
              this.Transaksi["details"][index]["currentRating"] = 0;
            }
          },
          (err: any) => {
            this.glb.swalHttpError(err);
            this.Transaksi["details"][index]["currentRating"] = 0;
          },
      );
    }
  }

  submitReview(content, id) {
    let index = this.glb.posObjectInArray(this.Transaksi["details"], { id_detail_checkout: id });
    if (index >= 0) {
      let id_detail_checkout = this.Transaksi["details"][index]["id_detail_checkout"];
      this.http.post(this.glb.apiReviewTransaction + "save_json?save-review", {
        review: content.value,
        id_detail_checkout: id_detail_checkout
      })
        .subscribe(
          (result: any) => {
            if (result["status"] == true) {
              swal({
                title: "Berhasil",
                text: "Review Berhasil Disimpan",
                type: "success",
                timer: 1500
              });
            } else {
              swal("Gagal", result["msg"], "error");
            }
          },
          (err: any) => {
            this.glb.swalHttpError(err);
          }
        );
    }
  }


}
