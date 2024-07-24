import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global';
import { FilterTools } from '../../tools/FilterTools';

@Component({
  selector: 'app-pagination-filter-harga',
  templateUrl: './pagination-filter-harga.component.html',
  styleUrls: ['./pagination-filter-harga.component.css']
})
export class PaginationFilterHargaComponent implements OnInit, OnChanges {

  price_min_available = 0;
  price_max_available = 0;
  price_min = "";
  price_max = "";

  result = {};

  @Input() apiUrl = "";
  @Input() apiMethod = "get_min_max?harga-max-min";
  @Input() columns: Array<any> = [];
  @Input() filter: any = [];

  @Output() hargaChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    public globals: Globals,
    public ft: FilterTools
  ) { }

  ngOnInit() {
  }

  makeRequest() {
    let args = {
      cols: this.columns,
      where: {},
      like: [
        this.ft.asFilterKeyword(this.filter)
      ]
    };
    this.ft.asFilterKategori(args.where, this.filter);
    this.ft.asFilterWarna(args.where, this.filter);
    // let where = {};
    // if (this.filter["kategori"] != undefined && this.filter["kategori"] != null) {
    //   let kategori: string = this.filter["kategori"];
    //   if (kategori.length > 0) {
    //     where["mPro.kategori_produk"] = this.filter["kategori"];
    //   }
    // }

    // args["where"] = where;

    // let like = [];
    // if(this.filter["keyword"] != undefined && this.filter["keyword"] != null) {
    //   let keyword: string = this.filter["keyword"];
    //   if(keyword.length > 0) {
    //     like.push({k: keyword, c: "_.nama_product"});
    //   }
    // }

    // args["like"] = like;

    this.http.post(this.apiUrl + this.apiMethod, args)
      .subscribe(
        (result: any) => {
          /* untuk sementara, ambil value di child pertama */
          for (let i in result) {
            var item = result[i];
            this.price_max_available = item["max"];
            this.price_min_available = item["min"];
          }

          // console.log(result);
        },
        (err: any) => {
          console.log("error get min max filter", err);
        }
      );
  }

  changeHarga() {
    
    if(this.price_min == null){
      this.price_min = "";
    }
    if(this.price_max == null){
      this.price_max = "";
    }
    console.log("apply filter harga", [this.price_min, this.price_max]);
    this.hargaChanged.emit({
      min: this.price_min,
      max: this.price_max
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("receive event change", changes);
    if (changes.filter != undefined) {
      let f2 = changes.filter;
      if (this.globals.isSameObject(f2.currentValue, f2.previousValue) == false) {
        this.makeRequest();
      }
    }
  }

}
