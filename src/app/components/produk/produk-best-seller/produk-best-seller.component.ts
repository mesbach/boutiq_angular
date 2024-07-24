import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../global';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-produk-best-seller',
  templateUrl: './produk-best-seller.component.html',
  styleUrls: ['./produk-best-seller.component.css']
})
export class ProdukBestSellerComponent implements OnInit {

  items = [];
  apiMethod = "get_many?best-seller";

  constructor(
    public globals: Globals,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Produk Best Seller - Auliastore");
  }

  itemsChanged(event) {
    this.items = event;
  }

}
