import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../global';
import { FilterTools } from '../../tools/FilterTools';

@Component({
  selector: 'app-pagination-filter-warna',
  templateUrl: './pagination-filter-warna.component.html',
  styleUrls: ['./pagination-filter-warna.component.css']
})
export class PaginationFilterWarnaComponent implements OnInit, OnChanges {

  @Input() apiUrl: string;
  @Input() apiMethod: string = "get_count?get-warna";
  @Input() groupBy: Array<any> = [];
  @Input() filter: any;

  availableColors: Array<any> = [];

  @Output() onChanged: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient,
    public gb: Globals,
    private ft: FilterTools
  ) { }

  ngOnInit() {
    // this.makeRequest();
  }

  makeRequest() {
    let args = {
      group_count: this.groupBy,
      where: {},
      like: [
        this.ft.asFilterKeyword(this.filter)
      ]
    };

    this.ft.asFilterKategori(args.where, this.filter);

    this.http.post(this.apiUrl + this.apiMethod, args)
      .subscribe(
        (result: Array<any>) => {
          this.availableColors = result;
        },
        (err: any) => {
          console.log("error request list warna", err);
        }
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter != undefined) {
      let f = changes.filter;
      if (this.gb.isSameObject(f.currentValue, f.previousValue) == false) {
        this.makeRequest();
      }
    }
  }

  applyColorFilter(warna){
    // console.log("apply color filter", warna);
    this.onChanged.emit(warna["warna_produk"]);
  }

}
