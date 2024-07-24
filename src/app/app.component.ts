import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Globals } from "./global";
import { HttpClient } from '@angular/common/http';
import { BaseauthService } from "./services/baseauth.service";
import { ShoppingService } from './services/shopping.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from './services/categories.service';
import { RecentProductService } from './services/recent-product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Aulia Sho';
  baseTitle = "Aulia";
  showHeader = true;
  showFooter = true;

  public constructor(
    private titleService: Title,
    private auth: BaseauthService,
    private shopping: ShoppingService,
    public globals: Globals,
    private router: Router,
    private categories: CategoriesService,
    private rcntPrd: RecentProductService
  ) {
    this.setTitle("Aulia Shop");
  }

  ngOnInit() {
    // console.log("check if logged in");
    var subs: Subscription = this.auth.loginEvent.subscribe(() => {
      // console.log("receive login event");
      if (this.auth.isLoggedIn) {
        // console.log("is logged in, request data2 yang berkaitan dengan user");
        this.shopping.refreshCart();
        this.shopping.refreshWishlist();
        this.auth.getProfile();
        this.shopping.reqUnfinishedTransCount().subscribe();
        // this.rcntPrd.refreshRecentProduct();
      }
      //subcribe hanya sekali, setelah menerima hasil, kemudian hapus subscribe
      //agar tidak menerima event yang dibuat oleh component2 lain
      subs.unsubscribe();
    });

    //di eksekusi sekali saat aplikasi diakses, untuk mengecek session
    this.auth.checkIfLoggedIn();

    //request kategori2 yang tersedia
    this.categories.refreshAllCategories();

    //root component menentukan kapan header ditampilkan berdasarkan perubahan url
    let excludeUrl = [
      "/account/login",
      "/account/registrasi",
      "/account/forgot-password",
      "/account/reset-password",
      "/account/update-password"
    ];
    this.router.events.subscribe((events) => {
      // console.log("router event ", events);
      if (events instanceof NavigationEnd ) {
        console.log("router event ", events);
        this.showHeader = true;
        this.showFooter = true;
        for(let i = 0, i2 = excludeUrl.length; i < i2; i++){
          var pos = events.url.indexOf(excludeUrl[i]);
          if(pos == 0){
            this.showHeader = false;
            this.showFooter = false;
            break;
          }
        }
      }

    });
  }

  public setTitle(newTitle: string) {
    // this.titleService.setTitle(newTitle + " - " + this.baseTitle);
  }
}
