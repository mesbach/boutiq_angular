import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../global';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pencarian-produk2',
  templateUrl: './pencarian-produk2.component.html',
  styleUrls: ['./pencarian-produk2.component.css']
})
export class PencarianProduk2Component implements OnInit {

  items = [];
  apiUrl = "";
  apiMethod = "get_many?search-product";

  available_order = [
    { text: "Urutkan dari yang terlama", column: "_.created_at", dir: "asc", val: "date_asc" },
    { text: "Urutkan dari yang terbaru", column: "_.created_at", dir: "desc", val: "date_desc" },
    { text: "Urutkan dari yang termurah", column: "_.price", dir: "asc", val: "price_asc" },
    { text: "Urutkan dari yang termahal", column: "_.price", dir: "desc", val: "price_desc" },
    { text: "Urutkan dari yang paling banyak dilihat", column: "_.view_counter", dir: "desc", val: "view_desc" },
    // { text: "Urutkan dari yang paling jarang dilihat", column: "_.view_counter", dir: "asc", val: "view_asc"},
    { text: "Urutkan dari yang terlaris", column: "_.sale_counter", dir: "desc", val: "sale_desc" }
  ];

  default_order = "date_desc";

  constructor(
    public globals: Globals,
    private ttl: Title
  ) {
    this.apiUrl = globals.apiProduct;
  }

  ngOnInit() {
    this.ttl.setTitle("Pencarian Produk - Auliastore");
  }

  itemsChanged(data) {
    this.items = data;
  }

}
