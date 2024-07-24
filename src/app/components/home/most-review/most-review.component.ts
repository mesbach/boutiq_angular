import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Globals } from '../../../global';
import { ShoppingService } from '../../../services/shopping.service';

@Component({
  selector: 'most-review',
  // templateUrl: './most-review.component.html',
  templateUrl: '../preview-product.html',
  styleUrls: ['./most-review.component.css']
})
export class MostReviewComponent implements OnInit {
  products = [];

  constructor(
    private http: HttpClient,
    public globals: Globals,
    public shopping: ShoppingService
  ) { }

  ngOnInit() {
    var ini = this;

    ini.http.post(ini.globals.apiProductMostReview + "get_many?most-review-home",{
      limit: [4]
    })
    .subscribe((data:any)=>{
      ini.products = data;
    });
  }

  // addWishList(args){
  //   this.shopping.addWishList(args).subscribe();
  // }

}
