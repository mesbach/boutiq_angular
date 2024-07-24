import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Globals } from '../../../global';
import { ShoppingService } from '../../../services/shopping.service';
import { Subscription } from 'rxjs/Subscription';
import { debug } from 'util';

@Component({
  selector: 'app-pencarian-produk',
  // templateUrl: './pencarian-produk.component.html',
  templateUrl: './pencarian2.html',
  // templateUrl: './pencarian3.html',
  styleUrls: ['./pencarian-produk.component.css']
})
export class PencarianProdukComponent implements OnInit, OnDestroy {

  // searchKeyword = null;
  // categoryFilter = null;
  // inputedCategoryFilter = null;
  // previousSearchKeyword = null;
  // previousCategoryFilter = null;
  // page = 1;
  totalPage = 1;
  // displayLength = 10;
  // orderParam = "date_desc";
  isValidSearch = true;
  isSearchError = false;
  isSearching = false;
  produks = [];
  categoriesOfProducts = [];
  // availablePriceMin = 0;
  // availablePriceMax = 99999999;
  // inputedPriceMin = "";
  // inputedPriceMax = "";
  // appliedPriceMin = "";
  // appliedPriceMax = "";
  availableColors = [];
  // inputedColorFilter = "";
  // appliedColorFilter = null;

  appliedFilter = {
    limit_per_page: 1,
    sort_order: "date_desc",
    page: 1,
    keyword: null,
    category: null,
    price_min: null,
    price_max: null,
    color: null
  };
  selectedFilter = {
    limit_per_page: 9,
    sort_order: "date_desc",
    price_min: null,
    price_max: null,
    category: null,
    color: null,
    keyword: null,
    page: 1
  };

  totalCount = 0;
  indexItemFrom = 0;
  indexItemTo = 0;

  needInfoTotalCount = false;
  needSearch = false;
  needInfoCategory = false;
  needInfoPriceRange = false;
  needInfoColor = false;

  subRouter: Subscription;

  availableFilter = {
    limit_per_page: [3, 6, 9, 12, 15, 18, 21],
    sort_order: [
      { text: "Urutkan dari yang terlama", column: "_.created_at", dir: "asc", val: "date_asc" },
      { text: "Urutkan dari yang terbaru", column: "_.created_at", dir: "desc", val: "date_desc" },
      { text: "Urutkan dari yang termurah", column: "_.price", dir: "asc", val: "price_asc" },
      { text: "Urutkan dari yang termahal", column: "_.price", dir: "desc", val: "price_desc" },
      { text: "Urutkan dari yang paling banyak dilihat", column: "_.view_counter", dir: "desc", val: "view_desc" },
      // { text: "Urutkan dari yang paling jarang dilihat", column: "_.view_counter", dir: "asc", val: "view_asc"},
      { text: "Urutkan dari yang terlaris", column: "_.sale_counter", dir: "desc", val: "sale_desc" }
    ],
    price_min: 0,
    price_max: 999999999
  };

  paginationArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  paginationItemLength = 10;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public globals: Globals,
    public router: Router,
    public shopping: ShoppingService
  ) { }

  ngOnInit() {
    let firstLoad = true;
    this.subRouter = this.route.queryParams.subscribe(val => {
      console.log("query param change event received ", val);

      // debugger;
      var keywordChanged = val.keyword != this.appliedFilter.keyword;
      var categoryChanged = val.ctgry != this.appliedFilter.category;
      var colorChanged = val.color != this.appliedFilter.color;
      var priceChanged = val.price_min != this.appliedFilter.price_min || val.price_max != this.appliedFilter.price_max;
      var limitPerPageChanged = val.len != this.appliedFilter.limit_per_page;
      var orderChanged = val.ord != this.appliedFilter.sort_order;

      this.needInfoCategory = firstLoad || keywordChanged || colorChanged || priceChanged;
      this.needInfoPriceRange = firstLoad || keywordChanged || categoryChanged || colorChanged;
      this.needInfoColor = firstLoad || keywordChanged || categoryChanged || priceChanged;
      this.needInfoTotalCount = firstLoad || keywordChanged || priceChanged;

      this.needSearch = firstLoad || keywordChanged || priceChanged || colorChanged || categoryChanged || limitPerPageChanged || orderChanged;

      console.log("previous applied filter ", JSON.parse(JSON.stringify(this.appliedFilter)));
      this.selectedFilter.keyword         = this.appliedFilter.keyword          = val.keyword ? val.keyword : null;
      this.selectedFilter.category        = this.appliedFilter.category         = val.ctgry ? val.ctgry : null;
      this.selectedFilter.page            = this.appliedFilter.page             = Number(val.pg ? val.pg : 1);
      this.selectedFilter.limit_per_page  = this.appliedFilter.limit_per_page   = Math.abs(Number(val.len ? val.len : 9));
      this.selectedFilter.sort_order      = this.appliedFilter.sort_order       = val.ord ? val.ord : "date_desc";
      this.selectedFilter.price_min       = this.appliedFilter.price_min        = val.price_min ? val.price_min : null;
      this.selectedFilter.price_max       = this.appliedFilter.price_max        = val.price_max ? val.price_max : null;

      console.log("applied filter = ", JSON.parse(JSON.stringify(this.appliedFilter)));
      if (this.needSearch) {
        this.reqSearchProduk();
        if (this.needInfoTotalCount || this.needInfoCategory || this.needInfoColor || this.needInfoPriceRange) {
          this.reqInfoPencarian();
        }
        this.isValidSearch = true;
      } else {
        this.isValidSearch = false;
        console.log("no need for search");
      }

      firstLoad = false;
    });
  }

  ngOnDestroy() {
    if (this.subRouter != undefined)
      this.subRouter.unsubscribe();
  }

  reqInfoPencarian() {
    console.log("request info pencarian");

    let qp_total_page = { like: [], where: {} };
    let qp_categories = { like: [], where: {} };
    let qp_harga = { like: [], where: {} };
    let qp_warna = { like: [], where: {} };

    if (this.appliedFilter.keyword != null && this.appliedFilter.keyword.toString().length > 0) {
      qp_total_page["like"].push({ c: ["_.nama_product"], k: this.appliedFilter.keyword });
      qp_categories["like"].push({ c: ["_.nama_product"], k: this.appliedFilter.keyword });
      qp_harga["like"].push({ c: ["_.nama_product"], k: this.appliedFilter.keyword });
      qp_warna["like"].push({ c: ["_.nama_product"], k: this.appliedFilter.keyword });
    }
    if (this.appliedFilter.category != null && this.appliedFilter.category.toString().length > 0) {
      qp_total_page["where"]["mPro.kategori_produk"] = this.appliedFilter.category;
      qp_harga["where"]["mPro.kategori_produk"] = this.appliedFilter.category;
      qp_warna["where"]["mPro.kategori_produk"] = this.appliedFilter.category;
    }
    if (this.appliedFilter.color != null) {
      qp_total_page["where"]["mPro.warna_produk"] = this.appliedFilter.color;
      qp_categories["where"]["mPro.warna_produk"] = this.appliedFilter.color;
      qp_harga["where"]["mPro.warna_produk"] = this.appliedFilter.color;
    }
    qp_categories["range"] = qp_warna["range"] = qp_total_page["range"] = [{ c: ["_.price"] }];
    
    if (this.appliedFilter.price_min != null) {
      qp_categories["range"][0]["min"] = qp_warna["range"][0]["min"] = qp_total_page["range"][0]["min"] = Number(this.appliedFilter.price_min);
    }
    if (this.appliedFilter.price_max != null) {
      qp_categories["range"][0]["max"] = qp_warna["range"][0]["max"] = qp_total_page["range"][0]["max"] = Number(this.appliedFilter.price_max);
    }
    if (this.appliedFilter.color != null) {
      qp_harga["color"] = qp_categories["color"] = qp_total_page["color"] = this.appliedFilter.color;
    }
    //request info jumlah total produk yang ditemukan berdasarkan keyword pencarian dan kategori yang dipilih
    this.http.post(this.globals.apiProduct + "get_count?count-search-result", qp_total_page)
      .subscribe(
        (result: any) => {
          if (result.length > 0) {
            this.totalCount = Number(result[0].jumlah);
          }
          this.updateInfoPage();
        },
        (err: any) => {
          console.log(err);
        }
      );

    if (this.needInfoCategory) {
      //request daftar kategori produk berdasarkan keyword nama produk
      qp_categories["group_count"] = ["kategori_master_produk", "nama_kategori_master_produk"];
      this.http.post(this.globals.apiProduct + "get_count?get-categories-of-searching", qp_categories)
        .subscribe(
          (result: any) => {
            this.categoriesOfProducts = result;
          },
          (err: any) => {
            this.categoriesOfProducts = [];
          }
        );
    }

    //request rentang harga produk berdasarkan keyword nama produk
    if (this.needInfoPriceRange) {
      qp_harga["cols"] = ["price"];
      this.http.post(this.globals.apiProduct + "get_min_max?get-min-max-price", qp_harga)
        .subscribe(
          (result: any) => {
            var price = result.price;
            if (price != undefined) {
              this.availableFilter.price_min = price.min;
              this.availableFilter.price_max = price.max;
            }
          },
          (err: any) => { }
        );
    }

    //request pilihan warna berdasarkan keyword pencarian
    qp_warna["group_count"] = ["warna_produk"];
    if (this.needInfoColor) {
      this.http.post(this.globals.apiProduct + "get_count?get-available-color", qp_warna)
        .subscribe(
          (result: any) => {
            this.availableColors = result;
            if (this.appliedFilter["color"] != undefined && this.appliedFilter["color"] != null) {
              for (var i = 0, i2 = this.availableColors.length; i < i2; i++) {
                this.availableColors[i].selected = this.availableColors[i].warna_produk == this.appliedFilter["color"];
              }
            }
          },
          (err: any) => {
            this.availableColors = [];
          }
        );
    }
  }

  updateInfoPage() {
    if (this.totalCount > 0) {
      this.indexItemFrom = ((Number(this.appliedFilter["page"]) - 1) * Number(this.appliedFilter["limit_per_page"])) + 1;
      this.indexItemTo = Number(this.appliedFilter["page"]) * Number(this.appliedFilter["limit_per_page"]);
      if (this.indexItemTo > this.totalCount) {
        this.indexItemTo = this.totalCount;
      }
      this.totalPage = Math.ceil(this.totalCount / Number(this.appliedFilter["limit_per_page"]));
      var max_page = this.appliedFilter["page"] + Math.floor(this.paginationItemLength / 2);
      if (max_page > this.totalPage) {
        max_page = this.totalPage;
      }
      var min_page = Math.max(1, Number(this.appliedFilter["page"]) - Math.floor(this.paginationItemLength / 2));
      console.log("min page = ", min_page);
      console.log("max page = ", max_page);
      console.log("total page = ", this.totalPage);
      this.paginationArray = [];
      for (var i = min_page; i <= max_page; i++) {
        this.paginationArray.push(i);
      }
      console.log("pagination array ", this.paginationArray);
    } else {
      this.indexItemFrom = 0;
      this.indexItemTo = 0;
      this.paginationArray = [];
      this.totalPage = 0;
    }
  }

  reqSearchProduk() {
    console.log("make request search produk");
    this.isSearchError = false;
    var order_col = "_.created_at";
    var order_dir = "desc";
    for (var i = 0, i2 = this.availableFilter.sort_order.length; i < i2; i++) {
      var opt = this.availableFilter.sort_order[i];
      if (opt.val == this.appliedFilter.sort_order) {
        order_col = opt.column;
        order_dir = opt.dir;
      }
    }
    var start = (this.appliedFilter.page - 1) * this.appliedFilter.limit_per_page;
    this.isSearching = true;
    var filter = {
      like: [],
      limit: [start, this.appliedFilter.limit_per_page],
      order: [[order_col, order_dir]],
      where: {}
    };
    if (this.appliedFilter.keyword != null) {
      filter["like"].push({ c: ["_.nama_product"], k: this.appliedFilter.keyword });
    }
    if (this.appliedFilter.category != null) {
      filter["where"]["mPro.kategori_produk"] = this.appliedFilter["category"];
    }
    if (this.appliedFilter["color"] != undefined && this.appliedFilter["color"] != null) {
      filter["where"]["mPro.warna_produk"] = this.appliedFilter["color"];
    }
    let filterRange = {};
    if (this.appliedFilter["price_min"] != undefined && this.appliedFilter["price_min"] != null) {
      filterRange["min"] = Number(this.appliedFilter["price_min"]);
    }
    if (this.appliedFilter["price_max"] != undefined && this.appliedFilter["price_max"] != null) {
      filterRange["max"] = Number(this.appliedFilter["price_max"]);
    }
    if (filterRange["min"] != undefined || filterRange["max"] != undefined) {
      filter["range"] = [{ c: ["_.price"], min: filterRange["min"], max: filterRange["max"] }];
    }
    this.http.post(this.globals.apiProduct + "get_many?search-product", filter)
      .subscribe(
        (result: any) => {
          this.produks = result;
          this.updateInfoPage();
          this.isSearching = false;
        },
        (err: any) => {
          this.isSearchError = true;
          this.isSearching = false;
        }
      );
  }

  navigationClick(page) {
    this.appliedFilter["page"] = Number(page);
    this.updateRouter();
    window.scrollTo(0, 0);
  }

  updateRouter() {
    var qp = {
      // ctgry: this.getParamSelectedFirst("category"),
      // price_max: this.getParamSelectedFirst("price_max"),
      // price_min: this.getParamSelectedFirst("price_min"),
      // color: this.getParamSelectedFirst("color"),
      // keyword: this.getParamSelectedFirst("keyword"),
      // pg: this.getParamSelectedFirst("page"),
      // len: this.getParamSelectedFirst("limit_per_page"),
      // ord: this.getParamSelectedFirst("sort_order")
      ctgry: this.selectedFilter.category,
      price_max: this.selectedFilter.price_max,
      price_min: this.selectedFilter.price_min,
      color: this.selectedFilter.color,
      keyword: this.selectedFilter.keyword,
      pg: this.selectedFilter.page,
      len: this.selectedFilter.limit_per_page,
      ord: this.selectedFilter.sort_order
    };
    console.log("selected filter", this.selectedFilter);
    console.log("update router with query param ", qp);
    this.router.navigate(["/produk/cari"], { queryParams: qp });
  }

  private getParamSelectedFirst(key) {
    if (this.selectedFilter[key] != undefined && this.selectedFilter[key] != null) {
      return this.selectedFilter[key];
    } else if (this.appliedFilter[key] != undefined && this.appliedFilter[key] != null) {
      return this.appliedFilter[key];
    }
    return null;
  }

  navigationNextClick() {
    if (this.selectedFilter["page"] == undefined) {
      this.selectedFilter["page"] = 0;
    }
    if (this.appliedFilter["page"] < this.totalPage) {
      this.selectedFilter["page"] = this.appliedFilter["page"] + 1;
      this.updateRouter();
      window.scrollTo(0, 0);
    }
  }
  navigationPrevClick() {
    if (this.appliedFilter["page"] == undefined) {
      this.appliedFilter["page"] = 0;
    }
    if (this.appliedFilter["page"] > 1) {
      this.selectedFilter["page"] = this.appliedFilter["page"] - 1;
      this.updateRouter();
      window.scrollTo(0, 0);
    }
  }

  applyFilterCategory(category) {
    this.selectedFilter["category"] = category.kategori_master_produk;
    this.updateRouter();
  }

  applyColorFilter(event, color) {
    this.selectedFilter["color"] = color.warna_produk;
    for (var i = 0, i2 = this.availableColors.length; i < i2; i++) {
      var clr = this.availableColors[i];
      clr.selected = false;
      if (clr.warna_produk == color.warna_produk) {
        clr.selected = true;
      }
      this.availableColors[i] = clr;
    }
    this.updateRouter();
  }

}
