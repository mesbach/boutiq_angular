import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../../global';
import {ShoppingService} from "../../../services/shopping.service";

@Component({
  selector: 'best-seller',
  // templateUrl: './best-seller.component.html',
  templateUrl: '../preview-product.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {

  products = [];

  constructor(
    private http: HttpClient,
    public globals: Globals,
    public shopping: ShoppingService
  ) { }

  ngOnInit() {
    var ini = this;
    ini.http.post(ini.globals.apiProductBestSeller + "get_many?best-seller-home", {
      limit: [4]
    })
    .subscribe((data:any)=>{
        ini.products =  data;
    });
  }

  // addWishList(args){
  //   this.shopping.addWishList(args).subscribe();
  // }
  
}
