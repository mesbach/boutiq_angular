import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Globals } from '../../../global';
import { ShoppingService } from '../../../services/shopping.service';

@Component({
  selector: 'new-arrivals',
  // templateUrl: './new-arrivals.component.html',
  templateUrl: '../preview-product.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent implements OnInit {

  products = [];

  constructor(
    private http: HttpClient,
    public globals: Globals,
    public shopping: ShoppingService
  ) { }

  ngOnInit() {
    var ini = this;

    ini.http.post(ini.globals.apiProductNewArrival + "get_many?new-arrival-home",{
      limit: [4]
    })
    .subscribe((data:any)=>{
      ini.products = data;
    })
  }

  // addWishList(args){
  //   this.shopping.addWishList(args).subscribe();
  // }

}
