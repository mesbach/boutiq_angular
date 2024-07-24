import { Component, OnInit, Input } from '@angular/core';
import { BaseauthService } from "../../../services/baseauth.service";
import { Globals } from '../../../global';
import { ShoppingService } from "../../../services/shopping.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  nama_akun = "Customer";
  loginListenerId=0;
  @Input() showMainMenu: boolean;

  constructor(
    public auth: BaseauthService,
    public globals: Globals,
    public shopping: ShoppingService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  removeFromCart(cart_item) {
    this.shopping.removeFromCart(cart_item).subscribe();
  }

  clickLogout() {
    console.log("logout clicked");
    this.auth.tryLogout().subscribe(
      (resp: any)=>{
        console.log("refresh cart");
        this.shopping.refreshCart();
        this.shopping.reqUnfinishedTransCount().subscribe();
      }
    );
  }

  toSearchPage(){
    this.router.navigate(["/produk/cari"], {queryParams:{keyword: this.shopping.searchKeyword}});
  }

  menuClick(event, menuContainer: HTMLElement){
    if(menuContainer.classList.contains("show-submenu")){
      menuContainer.classList.remove("show-submenu");
    }
  }

  cartItemClick(miniCartContainer: HTMLElement){
    // console.log("dispatch event",miniCartContainer.dispatchEvent(new MouseEvent("mouseleave")));
    // miniCartContainer.style.opacity = "0";
    // miniCartContainer.style.visibility = "hidden";
  }

}
