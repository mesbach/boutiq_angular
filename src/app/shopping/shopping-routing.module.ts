import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ReviewTransaksiComponent } from './review-transaksi/review-transaksi.component';
import { DetailTransaksiComponent } from './detail-transaksi/detail-transaksi.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { AddCheckoutPaymentComponent } from './add-checkout-payment/add-checkout-payment.component';
import { TransaksiComponent } from './transaksi/transaksi.component';

const routes: Routes = [
  {path: "", component: WishlistComponent},
  {path: "wishlist", component: WishlistComponent},
  {path: "transaksi", component: TransaksiComponent},
  {path: "transaksi/review/:kode_transaksi", component: ReviewTransaksiComponent},
  {path: "transaksi/detail/:kode_transaksi", component: DetailTransaksiComponent},
  {path: "checkout", component: CheckoutComponent},
  {path: "cart", component: CartComponent},
  {path: "transaksi/add_payment/:kode_checkout", component: AddCheckoutPaymentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
