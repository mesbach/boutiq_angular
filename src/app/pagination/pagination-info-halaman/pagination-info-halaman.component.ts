import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global';
import { FilterTools } from '../../tools/FilterTools';

@Component({
  selector: 'app-pagination-info-halaman',
  templateUrl: './pagination-info-halaman.component.html',
  styleUrls: ['./pagination-info-halaman.component.css']
})
export class PaginationInfoHalamanComponent implements OnInit, OnChanges {

  indexItemFrom = 0;
  indexItemTo = 0;
  totalCount = 0;

  @Input() apiUrl = "";
  @Input() apiMethod = "get_count?total-found";
  @Input() currentPage: number = 1;
  @Input() currentItemsCount = 0;
  @Input() limitPerPage: number = 4;
  @Input() filter: any;
  @Input() satuan = "produk";

  @Output() totalFoundChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    public globals: Globals,
    public ft: FilterTools
  ) { }

  ngOnInit() {
    // console.log("init, api url = ", this.apiUrl);
    // console.log("api method", this.apiMethod);
    // this.makeRequest();
  }

  makeRequest() {
    // console.log("filter", this.filter);

    // let where = {};
    // let rangeHarga = {};

    // if(this.globals.isNotNullNotUndef(this.filter["kategori"])){
    //   if(this.filter["kategori"].toString().length > 0){
    //     where["mPro.kategori_produk"] = this.filter["kategori"];
    //   }
    // }

    // if(this.globals.isNotNullNotUndef(this.filter["harga"])){
    //   let harga = this.filter["harga"];

    //   if(this.globals.isNotNullNotUndef(harga["min"])){
    //     rangeHarga["c"] = "price";
    //     rangeHarga["min"] = harga["min"];
    //   }

    //   if(this.globals.isNotNullNotUndef(harga["max"])){
    //     rangeHarga["c"] = "price";
    //     rangeHarga["max"] = harga["max"];
    //   }
    // }

    let postArgs = {
      where: {},
      range: [
        this.ft.asFitlerHarga(this.filter)
      ],
      like: [this.ft.asFilterKeyword(this.filter)]
    };
    this.ft.asFilterKategori(postArgs.where, this.filter);
    this.ft.asFilterWarna(postArgs.where, this.filter);

    // if(this.globals.isNotNullNotUndef(this.filter["keyword"])){
    //   let keyword: string = this.filter["keyword"].toString();
    //   if(keyword.length > 0){
    //     postArgs["like"] = [
    //       {k: keyword, c: ["_.nama_product"]}
    //     ];
    //   }
    // }

    this.http.post(this.apiUrl + this.apiMethod, postArgs)
      .subscribe(
        (result: Array<any>) => {
          // console.log(result);
          if (result.length > 0) {
            this.totalCount = result[0].jumlah;
            this.totalFoundChanged.emit(this.totalCount);
            this.adjustInfoPage();
          }
        },
        (err: any) => {
          console.log(err);
        },
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("input changed", changes);
    // console.log("filter", this.filter);

    /* mengupdate info halaman berdasarkan event perubahan yang diterima dari parent */

    /* jika ada perubahan filter, request total baru */
    // if(changes.filter != undefined){
    //   this.makeRequest();
    // }
    if (changes.filter != undefined) {
      if (this.globals.isSameObject(changes.filter.currentValue, changes.filter.previousValue) == false) {
        this.makeRequest();
      }
    } else if(changes.apiUrl != undefined){
      if(changes.apiUrl.firstChange){
        this.makeRequest();
      }
    }

    this.adjustInfoPage();

  }

  adjustInfoPage() {
    if (this.currentItemsCount > 0) {
      this.indexItemFrom = 1 + ((this.currentPage - 1) * this.limitPerPage);
      this.indexItemTo = (this.indexItemFrom - 1) + this.currentItemsCount;
    } else {
      if (this.currentPage == 1) {
        this.indexItemFrom = 0;
        this.indexItemTo = 0;
      } else {
        this.indexItemTo = this.indexItemFrom;
      }
    }
  }

}
