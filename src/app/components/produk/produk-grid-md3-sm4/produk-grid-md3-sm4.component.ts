import { Component, OnInit, Input } from '@angular/core';
import { ShoppingService } from '../../../services/shopping.service';

@Component({
  selector: 'app-produk-grid-md3-sm4',
  templateUrl: './produk-grid-md3-sm4.component.html',
  styleUrls: ['./produk-grid-md3-sm4.component.css']
})
export class ProdukGridMd3Sm4Component implements OnInit {

  @Input() items: Array<any>;

  constructor(
    public shopping: ShoppingService
  ) { }

  ngOnInit() {
  }

}
