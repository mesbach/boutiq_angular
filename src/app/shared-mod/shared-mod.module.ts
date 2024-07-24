import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionTools } from '../tools/TransactionTools';
import { BaseauthService } from '../services/baseauth.service';
import { FormsModule } from '@angular/forms';
import { ShoppingService } from '../services/shopping.service';
import { Globals } from '../global';
import { ImageProductPipePipe } from './image-product-pipe.pipe';
import { ImageUrlPipe } from './image-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ImageProductPipePipe,
    ImageUrlPipe
  ],
  exports: [
    ImageProductPipePipe,
    ImageUrlPipe,
    FormsModule
  ],
  providers: [
    // TransactionTools,
    // BaseauthService,
    // ShoppingService,
    // Globals
  ]
})
export class SharedModModule { }
