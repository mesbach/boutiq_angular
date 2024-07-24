import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../global';

@Injectable()
export class CategoriesService {

  allCategories = [];
  allCategoriesTimestamp = 0;

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  refreshAllCategories(){
    this.http.post(this.globals.apiProduct + "get_count?get-all-categories", {
      group_count: ["kategori_master_produk", "nama_kategori_master_produk"]
    })
    .subscribe(
      (result: any) => {
        this.allCategories = result;
      },
      (err: any) => {
        this.allCategories = [];
      }
    );
  }

  getCategories(filter){
  }

}
