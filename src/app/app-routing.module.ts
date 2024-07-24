import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Router, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { DetailProdukComponent } from './components/produk/detail-produk/detail-produk.component';
import { ProdukBestSellerComponent } from './components/produk/produk-best-seller/produk-best-seller.component';
import { ProdukNewArrivalComponent } from './components/produk/produk-new-arrival/produk-new-arrival.component';
import { ProdukMostReviewComponent } from './components/produk/produk-most-review/produk-most-review.component';
import { PencarianProdukComponent } from './components/produk/pencarian-produk/pencarian-produk.component';
import { ArticleComponent } from './components/home/article/article.component';
import { DetailArticleComponent } from './components/home/detail-article/detail-article.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PencarianProduk2Component } from './components/produk/pencarian-produk2/pencarian-produk2.component';
import { RegistrasiComponent } from './account/registrasi/registrasi.component';
import { InputBukuAlamatComponent } from './account/my-profile/input-buku-alamat/input-buku-alamat.component';
import { UpdatePasswordComponent } from './account/update-password/update-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { RequestForgotPasswordComponent } from './account/request-forgot-password/request-forgot-password.component';
import { MyProfileComponent } from './account/my-profile/my-profile.component';
import { ResendActivationEmailComponent } from './account/resend-activation-email/resend-activation-email.component';
import { AccountActivationComponent } from './account/account-activation/account-activation.component';
import { LoginComponent } from './account/login/login.component';
import { AddCheckoutPaymentComponent } from './shopping/add-checkout-payment/add-checkout-payment.component';
import { CartComponent } from './shopping/cart/cart.component';
import { CheckoutComponent } from './shopping/checkout/checkout.component';
import { DetailTransaksiComponent } from './shopping/detail-transaksi/detail-transaksi.component';
import { ReviewTransaksiComponent } from './shopping/review-transaksi/review-transaksi.component';
import { TransaksiComponent } from './shopping/transaksi/transaksi.component';
import { WishlistComponent } from './shopping/wishlist/wishlist.component';

const routes = [
  { path: "", component: HomeComponent },
  // { path: "account", loadChildren: "app/account/account.module#AccountModule"},
  { path: "produk/detail/:kode_produk", component: DetailProdukComponent },
  { path: "produk/best-seller", component: ProdukBestSellerComponent },
  { path: "produk/new-arrival", component: ProdukNewArrivalComponent },
  { path: "produk/most-review", component: ProdukMostReviewComponent },
  { path: "produk/cari", component: PencarianProduk2Component },
  
  { path: "article", component: ArticleComponent },
  { path: "article/:id_article", component: DetailArticleComponent },
  
  { path: "contact-us", component: ContactUsComponent },

  { path: "account", component: LoginComponent },
  { path: "account/login", component: LoginComponent },
  { path: "account/activation/:activation_code", component: AccountActivationComponent },
  { path: "account/activation", component: AccountActivationComponent },
  { path: "account/resend_activation_email", component: ResendActivationEmailComponent },
  { path: "account/profile", component: MyProfileComponent },
  { path: "account/forgot-password", component: RequestForgotPasswordComponent },
  { path: "account/reset-password/:token", component: ResetPasswordComponent },
  { path: "account/update-password", component: UpdatePasswordComponent },
  { path: "account/alamat/input", component: InputBukuAlamatComponent },
  { path: "account/alamat/input/:id_alamat", component: InputBukuAlamatComponent },
  { path: "account/registrasi", component: RegistrasiComponent },

  { path: "shopping", component: WishlistComponent },
  { path: "shopping/wishlist", component: WishlistComponent },
  { path: "shopping/transaksi", component: TransaksiComponent },
  { path: "shopping/transaksi/review/:kode_transaksi", component: ReviewTransaksiComponent },
  { path: "shopping/transaksi/detail/:kode_transaksi", component: DetailTransaksiComponent },
  { path: "shopping/checkout", component: CheckoutComponent },
  { path: "shopping/cart", component: CartComponent },
  { path: "shopping/transaksi/add_payment/:kode_checkout", component: AddCheckoutPaymentComponent },
  // { path: "shopping", loadChildren: "app/shopping/shopping.module#ShoppingModule"}
];

@NgModule({
  imports: [
    // CommonModule
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
