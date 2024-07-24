import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Input() mobileMenu: HTMLElement = null;

  constructor(
    public categories: CategoriesService,
  ) { }

  ngOnInit() {
  }

  menuClick(data) {
    /* sembunyikan menu jika di klik, */
    if (this.mobileMenu != undefined && this.mobileMenu != null) {
      if (this.mobileMenu.classList.contains("open")) {
        this.mobileMenu.classList.remove("open");
      }
    }
  }

}
