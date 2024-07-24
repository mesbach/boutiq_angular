import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModModule } from '../shared-mod/shared-mod.module';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { TransactionTools } from '../tools/TransactionTools';
import { Globals } from '../global';
import { BaseauthService } from '../services/baseauth.service';
import { ShoppingService } from '../services/shopping.service';
import { ReviewTransaksiComponent } from './review-transaksi/review-transaksi.component';
import { DetailTransaksiComponent } from './detail-transaksi/detail-transaksi.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AddCheckoutPaymentComponent } from './add-checkout-payment/add-checkout-payment.component';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { PaginationModule } from '../pagination/pagination.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModModule,
    PaginationModule,
  ],
  declarations: [
    // WishlistComponent,
    // ReviewTransaksiComponent,
    // DetailTransaksiComponent,
    // CheckoutComponent,
    // CartComponent,
    // AddCheckoutPaymentComponent,
    // TransaksiComponent,
  ],
  providers: []
})
export class ShoppingModule { }
