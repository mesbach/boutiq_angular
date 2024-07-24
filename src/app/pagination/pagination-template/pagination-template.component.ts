import { Component, OnInit, AfterViewInit, ViewChild, Input, AfterContentInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { ShoppingService } from '../../services/shopping.service';
import { BaseauthService } from '../../services/baseauth.service';
import { Globals } from '../../global';
import { FilterTools } from '../../tools/FilterTools';

@Component({
  selector: 'app-pagination-template',
  templateUrl: './pagination-template.component2.html',
  // template: '<ng-content></ng-content>',
  styleUrls: ['./pagination-template.component.css']
})
export class PaginationTemplateComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy, OnChanges {

  _filter: any;
  firstLoad = true;
  isSearching = false;
  isSearchError = false;
  itemsLoadedCount = 0;

  limitPerPageFromUrl = 4;
  limitPerPageFromUser = 4;

  pageFromUrl = 1;
  pageFromUser = 1;

  foundTotal = 0;

  filterWarnaFromUrl = "";
  filterWarnaFromUser = "";

  filterKategoriFromUrl = "";
  filterKategoriFromUser = "";

  filterHargaFromUrl = {};
  filterHargaFromUser = {};

  filterOrderFromUser = {};
  filterOrderFromUrl = {};

  keywordFromUrl = "";
  pageUrl = "";

  availableOrderOptions = [];
  defaultOrder = "";


  // availableFilter = {
  //   sort_order: []
  // };
  // appliedFilter = {
  //   page: 1
  // };

  @Input() apiUrl: string = "";
  @Input() apiMethod: string = "get_many";
  @Input() initialLimitPerPage: number = 4;
  @Input() filterSortConf: any;

  @Input() useFilterKategori: boolean = true;
  @Input() useFilterSort: boolean = false;
  @Input() useFilterHalaman: boolean = true;
  @Input() useFilterHarga: boolean = true;
  @Input() useFilterLimitPage: boolean = true;
  @Input() useFilterTag: boolean = false;
  @Input() useFilterWarna: boolean = true;
  @Input() useFilterUkuran: boolean = false;
  @Input() showRecentProduct: boolean = true;
  @Input() showInfoHalaman: boolean = true;

  @Output() onItemsChanged: EventEmitter<any> = new EventEmitter();
  // @Output() filterChanged: EventEmitter<any> = new EventEmitter();

  private subRoute: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public shopping: ShoppingService,
    public auth: BaseauthService,
    public globals: Globals,
    public ft: FilterTools
  ) { }

  ngOnInit() {
    // console.log("on init");
    // this.limitPerPageFromUrl = null; = this.limitPerPage;
    // this.makeRequest();
    this.firstLoad = false;
    this.pageUrl = this.route.snapshot.routeConfig.path;

    this.subRoute = this.route.queryParams.subscribe(val => {
      // console.log(this.route);

      // console.log("route event", val);
      // if (val.keyword != undefined) {
      //   this.keywordFromUrl = val.keyword;
      // }
      

      // if(val.page != undefined){
      //   this.pageFromUrl = val.page;
      // } else {
      //   this.pageFromUrl = 1;
      // }
      this.pageFromUrl              = this.ft.asCoalesceVar(val.page, 1);
      this.keywordFromUrl           = this.ft.asCoalesceVar(val.keyword, null);
      this.limitPerPageFromUrl      = this.ft.asCoalesceVar(val.limit, this.initialLimitPerPage);
      let currentOrderVal           = this.ft.asCoalesceVar(val.sort, this.defaultOrder);
      let currentOrder              = this.globals.getObjectInArray(this.availableOrderOptions, { val: currentOrderVal });
      this.filterOrderFromUrl       = currentOrder;
      this.filterHargaFromUrl       = {
        min: this.ft.asCoalesceVar(val.price_min, null),
        max: this.ft.asCoalesceVar(val.price_max, null)
      };
      this.filterKategoriFromUrl    = this.ft.asCoalesceVar(val.category, null);
      this.filterWarnaFromUrl       = this.ft.asCoalesceVar(val.color, null);

      this.pageFromUser             = this.pageFromUrl;
      this.limitPerPageFromUser     = this.limitPerPageFromUrl;
      this.filterOrderFromUser      = this.filterOrderFromUrl;
      this.filterHargaFromUser      = this.filterHargaFromUrl;
      this.filterKategoriFromUser   = this.filterKategoriFromUrl;
      this.filterWarnaFromUser      = this.filterWarnaFromUrl;
      // if(val.limit != undefined){
      //   this.limitPerPageFromUrl = val.limit;
      // } else if(this.initialLimitPerPage != undefined){
      //   this.limitPerPageFromUrl = this.initialLimitPerPage;
      // }
      

      // this.filterOrderFromUrl = {};
      // // console.log("order from user", this.filterOrderFromUser);
      // // console.log("order from url", val.sort);
      // if(val.sort != undefined){
      //   let userOrder: string = val.sort;
      //   let orderOpt = this.globals.getObjectInArray(this.availableOrderOptions, {val: userOrder});
      //   if(orderOpt != null) {
      //     this.filterOrderFromUrl = orderOpt;
      //   }
      // }

      // this.filterHargaFromUrl = {};
      // if(val.price_min != undefined) {
      //   this.filterHargaFromUrl["min"] = val.price_min;
      // }
      // if(val.price_max != undefined) {
      //   this.filterHargaFromUrl["max"] = val.price_max;
      // }
      
      this.makeRequest();
    });
  }

  ngOnDestroy() {
    if (this.subRoute != undefined) {
      this.subRoute.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filterSortConf != undefined) {
      // console.log(changes.filterSortConf);
      if (this.filterSortConf["options"] != undefined && this.filterSortConf["options"] != null) {
        this.availableOrderOptions = this.filterSortConf["options"];
      }

      if (this.filterSortConf["selected"] != undefined && this.filterSortConf["selected"] != null) {
        this.defaultOrder = this.filterSortConf["selected"];
      }
    }
  }

  makeRequest() {
    // let offset = (this.pageFromUrl - 1) * this.limitPerPageFromUrl ;
    let where = {};
    let rangeHarga = {};
    let order = [];
    let postArgs = {
      limit: this.ft.asLimit(this.pageFromUrl, this.limitPerPageFromUrl),
      where: {},
      range: [
        this.ft.asFitlerHarga({ harga: this.filterHargaFromUrl })
      ],
      like: [
        this.ft.asFilterKeyword({keyword: this.keywordFromUrl})
      ],
      order: [
        this.ft.asFilterSort({sort: this.filterOrderFromUrl, options: this.availableOrderOptions})
      ]
    };
    this.ft.asFilterKategori(postArgs.where, { kategori: this.filterKategoriFromUrl });
    this.ft.asFilterWarna(postArgs.where, {warna: this.filterWarnaFromUrl});
    // if (this.filterKategoriFromUrl.length > 0) {
    //   where["mPro.kategori_produk"] = this.filterKategoriFromUrl;
    // }
    // postArgs["where"] = where;
    // console.log("filter harga", this.filterHargaFromUrl);
    // if(this.filterHargaFromUrl != undefined){
    //   let hargaMax = this.filterHargaFromUrl["max"];
    //   let hargaMin = this.filterHargaFromUrl["min"];

    //   if(hargaMax != undefined){
    //     rangeHarga["c"] = "price";
    //     rangeHarga["max"] = hargaMax;
    //   }

    //   if(hargaMin != undefined){
    //     rangeHarga["c"] = "price";
    //     rangeHarga["min"] = hargaMin;
    //   }
    //   postArgs["range"] = [rangeHarga];
    // }
    // if (this.filterHarga.min != undefined && this.filterHarga.min.toString().length > 0) {
    //   rangeHarga["c"] = "price";
    //   rangeHarga["min"] = this.filterHarga.min;
    // }
    // if (this.filterHarga.max != undefined && this.filterHarga.max.toString().length > 0) {
    //   rangeHarga["c"] = "price";
    //   rangeHarga["max"] = this.filterHarga.max;
    // }

    // if (this.keywordFromUrl.toString().length > 0) {
    //   postArgs["like"] = [
    //     { k: this.keywordFromUrl, c: ["_.nama_product"] }
    //   ];
    // }

    // console.log("order from user", this.filterOrderFromUser);
    // console.log("order from url", this.filterOrderFromUrl);
    // if (this.filterOrderFromUrl["column"] != undefined) {
    //   order.push(this.filterOrderFromUrl["column"]);

    //   if (this.filterOrderFromUrl["dir"] != undefined) {
    //     order.push(this.filterOrderFromUrl["dir"]);
    //   }

    //   postArgs["order"] = [order];
    // }

    this.http.post(this.apiUrl + this.apiMethod, postArgs)
      .subscribe(
        (result: Array<any>) => {
          // console.log("http post result: ", result);
          this.onItemsChanged.emit(result);
          this.itemsLoadedCount = result.length;
        },
        (err: any) => {
          // console.log("http post error: ", err);
          this.onItemsChanged.emit([]);
        }
      );
  }

  ngAfterViewInit() {
    // console.log("after view init");
  }

  ngAfterContentInit() {
    // console.log("after content init");
  }

  updateUrl() {
    // console.log("update the url");
    let qp = {};

    if(this.filterOrderFromUser == null){
      this.filterOrderFromUser = {};
    }
    if(this.filterOrderFromUrl == null){
      this.filterOrderFromUrl = {};
    }

    qp["keyword"]     = this.ft.asCoalesceVar(this.keywordFromUrl, null);
    qp["page"]        = this.ft.asCoalesceVar(this.pageFromUser, this.pageFromUrl);
    qp["sort"]        = this.ft.asCoalesceVar(this.filterOrderFromUser["val"], this.filterOrderFromUrl["val"]);
    qp["category"]    = this.ft.asCoalesceVar(this.filterKategoriFromUser, this.filterKategoriFromUrl);
    qp["price_max"]   = this.ft.asCoalesceVar(this.filterHargaFromUser["max"], this.filterHargaFromUrl["max"]);
    qp["price_min"]   = this.ft.asCoalesceVar(this.filterHargaFromUser["min"], this.filterHargaFromUrl["min"]);
    qp["limit"]       = this.ft.asCoalesceVar(this.limitPerPageFromUser, this.limitPerPageFromUrl);
    qp["color"]       = this.ft.asCoalesceVar(this.filterWarnaFromUser, this.filterWarnaFromUrl);
    // if(this.keywordFromUrl.length > 0){
    //   qp["keyword"] = this.keywordFromUrl;
    // }
    // if(this.pageFromUser > 1){
    //   qp["page"] = this.pageFromUser;
    // }
    // if(this.limitPerPageFromUser != undefined && this.limitPerPageFromUser != null){
    // if(this.globals.isNotNullNotUndef(this.limitPerPageFromUser)){
    //   qp["limit"] = this.limitPerPageFromUser;
    // }

    // console.log("harga from user", this.filterHargaFromUser);
    // if(this.globals.isNotNullNotUndef(this.filterHargaFromUser["min"])){
    //   let hargaMin: string = this.filterHargaFromUser["min"].toString();
    //   if(hargaMin.length > 0) {
    //     qp["price_min"] = hargaMin;
    //   }
    // }

    // if(this.globals.isNotNullNotUndef(this.filterHargaFromUser["max"])) {
    //   let hargaMax: string = this.filterHargaFromUser["max"].toString();
    //   if(hargaMax.length > 0){
    //     qp["price_max"] = hargaMax;
    //   }
    // }
    // if(this.filterOrderFromUser["column"] != undefined && this.filterOrderFromUser["column"] != null){
    //   qp["ordcol"] = this.filterOrderFromUser["column"];
    // }
    // if(this.filterOrderFromUser["dir"] != undefined && this.filterOrderFromUser["dir"] != null){
    //   qp["orddir"] = this.filterOrderFromUser["dir"];
    // }
    // if(this.filterOrderFromUser["val"] != undefined && this.filterOrderFromUser["val"] != null){
    // if(this.globals.isNotNullNotUndef(this.filterOrderFromUser["val"])){
    //   qp["sort"] = this.filterOrderFromUser["val"];
    // }


    // if(this.globals.isNotNullNotUndef(this.filterKategoriFromUser)){
    //   if(this.filterKategoriFromUser.length > 0){
    //     qp["category"] = this.filterKategoriFromUser;
    //   }
    // }
    // if(this.globals.isNotNullNotUndef(qp["category"]) == false){
    //   if(this.filterKategoriFromUrl.length > 0){
    //     qp["category"] = this.filterKategoriFromUrl;
    //   }
    // }

    this.router.navigate([this.pageUrl], { queryParams: qp });
  }

  limitPageChanged(limitPerPage: number) {
    console.log("received limit per page event", limitPerPage);
    this.limitPerPageFromUser = limitPerPage;
    // this.makeRequest();
    this.updateUrl();
  }

  totalFoundChanged(foundTotal) {
    this.foundTotal = foundTotal;
    // console.log("received total item found change event", foundTotal);
  }

  pageChanged(page) {
    this.pageFromUser = page;
    // this.makeRequest();
    this.updateUrl();
  }

  filterKategoriChanged(kode_kategori) {
    this.filterKategoriFromUser = kode_kategori;
    this.pageFromUser = 1;
    // this.makeRequest();
    this.updateUrl();
  }

  hargaChanged(data) {
    this.filterHargaFromUser = data;
    this.pageFromUser = 1;
    // console.log("meneriman event perubahan filter harga", this.filterHargaFromUser);
    // this.makeRequest();
    this.updateUrl();
  }

  orderChanged(data) {
    // console.log("receive order event change", data);
    this.filterOrderFromUser = data;
    this.updateUrl();
  }

  colorChanged(warna){
    this.filterWarnaFromUser = warna;
    this.updateUrl();
  }

}
