import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ShoppingService } from '../../services/shopping.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {

  constructor(
    public shopping: ShoppingService,
    private ttl: Title
  ) { }

  ngOnInit() {
    this.ttl.setTitle("Kesukaan Saya - Auliastore");
  }

  ngOnDestroy() {
  }

}
