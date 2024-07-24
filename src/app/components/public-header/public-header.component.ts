import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {

  @Input()
  showMainMenu: boolean = true;

  constructor(
    // private router: Router
  ) { 
  }

  ngOnInit() {
    // console.log("router = ",this.router.url);
  }

}
