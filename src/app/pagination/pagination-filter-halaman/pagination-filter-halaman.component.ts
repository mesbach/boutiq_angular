import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-filter-halaman',
  templateUrl: './pagination-filter-halaman.component.html',
  styleUrls: ['./pagination-filter-halaman.component.css']
})
export class PaginationFilterHalamanComponent implements OnInit, OnChanges {

  paginationArray = [];
  totalPage = 0;
  @Input() currentPage = 1;

  showNext = false;
  showPrev = false;
  
  // @Input() initialPage = 1;
  @Input() limitPerPage = 0;
  @Input() currentItemsCount = 0;
  @Input() totalItems = 0;
  @Input() paginationLength = 10;

  @Output() pageChanged: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.evaluateNavButton();
  }

  ngOnChanges(changes: SimpleChanges){
    // console.log("filter halaman changes", changes);

    // if(changes.initialPage != undefined){
    //   this.currentPage = changes.initialPage.currentValue;
    // }

    /* jika menerima perubahan total item ditemukan atau limit per page, hitung ulang array pagination */
    if(changes.totalItems != undefined || changes.limitPerPage != undefined) {
      this.totalPage = Math.ceil(this.totalItems / this.limitPerPage);
      this.paginationArray = [];
      for(let i = 1; i <= this.totalPage; i++){
        this.paginationArray.push(i);
      }
    }
    this.evaluateNavButton();
  }

  evaluateNavButton(){
    this.showNext = this.currentPage < this.totalPage;
    this.showPrev = this.currentPage > 1;
  }

  clickPage(page){
    this.currentPage = page;
    this.evaluateNavButton();
    this.pageChanged.emit(this.currentPage);
  }

  clickNext(){
    this.currentPage++;
    this.evaluateNavButton();
    this.pageChanged.emit(this.currentPage);
  }

  clickPrev(){
    this.currentPage--;
    this.evaluateNavButton();
    this.pageChanged.emit(this.currentPage);
  }

}
