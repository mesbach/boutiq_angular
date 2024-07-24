import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Globals} from "../../../global";

@Component({
  selector: 'trending-carousel',
  templateUrl: './trending-carousel.component.html',
  styleUrls: ['./trending-carousel.component.css']
})
export class TrendingCarouselComponent implements OnInit {

	trendings = [];

  	constructor(private http: HttpClient, public globals: Globals) { }

  	ngOnInit() {
	  	var ini = this;
	  	ini.http.get(ini.globals.apiProductCarousel + "get_many?get-carousel")
	  	.subscribe((resp: any)=>{
	  		ini.trendings = resp;
	  	});
  	}

}
