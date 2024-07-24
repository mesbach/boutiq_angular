import { Component, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { RecentProductService } from '../../services/recent-product.service';

@Component({
  selector: 'app-widget-recent-product-small',
  templateUrl: './widget-recent-product-small.component.html',
  styleUrls: ['./widget-recent-product-small.component.css']
})
export class WidgetRecentProductSmallComponent implements OnInit {

  constructor(
    public rcntPrd: RecentProductService
  ) { }

  ngOnInit() {
    this.rcntPrd.refreshRecentProduct();
  }

}
