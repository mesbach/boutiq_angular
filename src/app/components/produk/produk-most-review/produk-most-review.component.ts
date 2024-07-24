import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../global';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-produk-most-review',
  templateUrl: './produk-most-review.component.html',
  styleUrls: ['./produk-most-review.component.css']
})
export class ProdukMostReviewComponent implements OnInit {

  items = [];

  constructor(
    public globals: Globals,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Produk Paling Direview - Auliastore");
  }

  itemsChanged(event){
    this.items = event;
  }

}
