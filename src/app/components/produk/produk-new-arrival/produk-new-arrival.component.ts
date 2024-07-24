import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../global';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-produk-new-arrival',
  templateUrl: './produk-new-arrival.component.html',
  styleUrls: ['./produk-new-arrival.component.css']
})
export class ProdukNewArrivalComponent implements OnInit {

  items = [];

  constructor(
    public globals: Globals,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Produk Terbaru - Auliastore");
  }

  itemsChanged(event){
    this.items = event;
  }

}
