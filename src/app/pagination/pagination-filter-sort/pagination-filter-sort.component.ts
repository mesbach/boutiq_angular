import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-filter-sort',
  templateUrl: './pagination-filter-sort.component.html',
  styleUrls: ['./pagination-filter-sort.component.css']
})
export class PaginationFilterSortComponent implements OnInit {

  @Input() selected_order = "";
  @Input() available_order = [];

  @Output() onChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // console.log("init PaginationFilterSortComponent");
  }

  sortChanged(){
    // console.log("filter order changed", this.selected_order);
    let n = this.available_order.length;
    for(let i = 0; i < n; i++){
      let ao = this.available_order[i];
      if(ao["val"] == this.selected_order){
        this.onChanged.emit(ao);
        break;
      }
    }
  }

}
