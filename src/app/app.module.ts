import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ElementRef } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {Ng2CarouselamosModule} from "ng2-carouselamos";
import {BaseInterceptor} from "./BaseInterceptor.interceptor";
import {Globals} from "./global";
import {BaseauthService} from "./services/baseauth.service";
import {ShoppingService} from "./services/shopping.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { TrendingCarouselComponent } from './components/home/trending-carousel/trending-carousel.component';
import { NewArrivalsComponent } from './components/home/new-arrivals/new-arrivals.component';
import { MostReviewComponent } from './components/home/most-review/most-review.component';
import { BestSellerComponent } from './components/home/best-seller/best-seller.component';
import { MainHeaderComponent } from './components/public-header/main-header/main-header.component';
import { MainMenuComponent } from './components/public-header/main-menu/main-menu.component';
import { DetailProdukComponent } from './components/produk/detail-produk/detail-produk.component';
import { ProdukBestSellerComponent } from './components/produk/produk-best-seller/produk-best-seller.component';
import { ProdukNewArrivalComponent } from './components/produk/produk-new-arrival/produk-new-arrival.component';
import { ProdukMostReviewComponent } from './components/produk/produk-most-review/produk-most-review.component';
import { PencarianProdukComponent } from './components/produk/pencarian-produk/pencarian-produk.component';
import { CategoriesService } from './services/categories.service';
import { ProdukGridMd3Sm4Component } from './components/produk/produk-grid-md3-sm4/produk-grid-md3-sm4.component';
import { GeneralFooterComponent } from './components/footer/general-footer/general-footer.component';
import { ArticleComponent } from './components/home/article/article.component';
import { ArticleService } from './services/article.service';
import { DetailArticleComponent } from './components/home/detail-article/detail-article.component';
import { CommentArticleComponent } from './components/home/detail-article/comment-article/comment-article.component';
import { InputArticleCommentComponent } from './components/home/detail-article/input-article-comment/input-article-comment.component';
import { FileInputService } from './services/file-input.service';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PencarianProduk2Component } from './components/produk/pencarian-produk2/pencarian-produk2.component';
import { FilterTools } from './tools/FilterTools';
import { TransactionTools } from './tools/TransactionTools';
import { SharedModModule } from './shared-mod/shared-mod.module';
import { PaginationModule } from './pagination/pagination.module';
import { LoginComponent } from './account/login/login.component';
import { AccountActivationComponent } from './account/account-activation/account-activation.component';
import { ResendActivationEmailComponent } from './account/resend-activation-email/resend-activation-email.component';
import { MyProfileComponent } from './account/my-profile/my-profile.component';
import { RequestForgotPasswordComponent } from './account/request-forgot-password/request-forgot-password.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './account/update-password/update-password.component';
import { InputBukuAlamatComponent } from './account/my-profile/input-buku-alamat/input-buku-alamat.component';
import { DaftarBukuAlamatComponent } from './account/my-profile/daftar-buku-alamat/daftar-buku-alamat.component';
import { CheckoutComponent } from './shopping/checkout/checkout.component';
import { AddCheckoutPaymentComponent } from './shopping/add-checkout-payment/add-checkout-payment.component';
import { TransaksiComponent } from './shopping/transaksi/transaksi.component';
import { CartComponent } from './shopping/cart/cart.component';
import { RegistrasiComponent } from './account/registrasi/registrasi.component';
import { WishlistComponent } from './shopping/wishlist/wishlist.component';
import { DetailTransaksiComponent } from './shopping/detail-transaksi/detail-transaksi.component';
import { PaginationTemplateComponent } from './pagination/pagination-template/pagination-template.component';
import { ReviewTransaksiComponent } from './shopping/review-transaksi/review-transaksi.component';
import { RecentProductService } from './services/recent-product.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PublicHeaderComponent,
    AccountActivationComponent,
    ResendActivationEmailComponent,
    TrendingCarouselComponent,
    NewArrivalsComponent,
    MostReviewComponent,
    BestSellerComponent,
    MyProfileComponent,
    MainHeaderComponent,
    MainMenuComponent,
    CheckoutComponent,
    DaftarBukuAlamatComponent,
    InputBukuAlamatComponent,
    RegistrasiComponent,
    CartComponent,
    TransaksiComponent,
    AddCheckoutPaymentComponent,
    DetailProdukComponent,
    ProdukBestSellerComponent,
    ProdukNewArrivalComponent,
    ProdukMostReviewComponent,
    PencarianProdukComponent,
    DetailTransaksiComponent,
    ProdukGridMd3Sm4Component,
    WishlistComponent,
    RequestForgotPasswordComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    GeneralFooterComponent,
    ArticleComponent,
    DetailArticleComponent,
    CommentArticleComponent,
    InputArticleCommentComponent,
    ContactUsComponent,
    PencarianProduk2Component,
    ReviewTransaksiComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2CarouselamosModule,
    SharedModModule,
    PaginationModule
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseInterceptor,
      multi: true
    },
    Globals,
    FilterTools,
    TransactionTools,
    /* service di declare sekali agar bersifat singleton, service di declare di sini saja */
    BaseauthService,
    ShoppingService,
    CategoriesService,
    ArticleService,
    FileInputService,
    RecentProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
