import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global';
import { FilterTools } from '../../tools/FilterTools';

@Component({
  selector: 'app-pagination-filter-kategori',
  templateUrl: './pagination-filter-kategori.component.html',
  styleUrls: ['./pagination-filter-kategori.component.css']
})
export class PaginationFilterKategoriComponent implements OnInit, OnChanges {

  categoriesOfProducts = [];

  @Input() apiUrl: string = "";
  @Input() apiMethod: string = "get_count?get-category";
  @Input() groupBy: Array<any> = [];
  // @Input() filterWarna = "";
  @Input() filter: any;

  @Output() onFilterChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    public globals: Globals,
    public ft: FilterTools
  ) { }

  ngOnInit() {
    // console.log("on init filter kategori");
    // console.log("input filter", this.filterWarna);
    // this.makeRequest();
  }

  makeRequest() {
    let where = {};
    let postArgs = {
      group_count: this.groupBy,
      where: {},
      like: [
        this.ft.asFilterKeyword(this.filter)
      ],
      range: [
        this.ft.asFitlerHarga(this.filter)
      ]
    };
    this.ft.asFilterWarna(postArgs.where, this.filter);
    
    // if (this.filterWarna != undefined && this.filterWarna != null) {
    //   if (this.filterWarna.toString().length > 0) {
    //     where["warna_produk"] = this.filterWarna;
    //   }
    // }
    // if (this.globals.isNotNullNotUndef(this.filter["warna"])) {
    //   let warna: string = this.filter["warna"];
    //   if (warna.length > 0) {
    //     where["warna_produk"] = warna;
    //   }
    // }

    // postArgs["where"] = where;
    // let like = [];

    // if (this.globals.isNotNullNotUndef(this.filter["keyword"])) {
    //   let keyword: string = this.filter["keyword"];
    //   if (keyword.length > 0) {
    //     like.push({ k: keyword, c: "_.nama_product" });
    //   }
    // }
    // postArgs["like"] = like;

    // let rangeHarga = {};
    // if (this.globals.isNotNullNotUndef(this.filter["harga"])) {
    //   let harga = this.filter["harga"];
    //   // console.log("to apply filter harga", harga);
    //   if (this.globals.isNotNullNotUndef(harga["min"])) {
    //     let hargaMin = harga["min"].toString();
    //     if (hargaMin.length > 0) {
    //       rangeHarga["c"] = "price";
    //       rangeHarga["min"] = hargaMin;
    //     }
    //   }

    //   if (this.globals.isNotNullNotUndef(harga["max"])) {
    //     let hargaMax = harga["max"].toString();
    //     if (hargaMax.length > 0) {
    //       rangeHarga["c"] = "price";
    //       rangeHarga["max"] = hargaMax;
    //     }
    //   }
    // }
    // postArgs["range"] = [rangeHarga];

    this.http.post(this.apiUrl + this.apiMethod, postArgs)
      .subscribe(
        (result: Array<any>) => {
          this.categoriesOfProducts = result;
        },
        (err: any) => {
          console.log("error request kategori produk", err);
        }
      );
  }

  clickKategori(kode_kategori) {
    // console.log("filter kategori clicked", kode_kategori);
    this.onFilterChanged.emit(kode_kategori);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("component input changed", changes);

    // if (changes.filterWarna != undefined && changes.filterWarna.firstChange == false) {
    //   this.makeRequest();
    // }

    if (changes.filter != undefined) {
      let f = changes.filter;
      if (this.globals.isSameObject(f.previousValue, f.currentValue) == false) {
        this.makeRequest();
      }
    }
  }

}
