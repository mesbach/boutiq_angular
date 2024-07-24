import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-pagination-filter-limit-page',
  templateUrl: './pagination-filter-limit-page.component.html',
  styleUrls: ['./pagination-filter-limit-page.component.css']
})
export class PaginationFilterLimitPageComponent implements OnInit {

  selected_limit_per_page = 1;
  availableFilter = [4,8,12,16,20];

  @Input() defaultValue: Number = 4;
  @Output() onChangeValue: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  onChanged(){
    // console.log("filter limit page changed", this.defaultValue);
    this.onChangeValue.emit(this.defaultValue);
  }

}
