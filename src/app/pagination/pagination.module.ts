import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModModule } from '../shared-mod/shared-mod.module';
import { PaginationInfoHalamanComponent } from './pagination-info-halaman/pagination-info-halaman.component';
import { PaginationFilterHalamanComponent } from './pagination-filter-halaman/pagination-filter-halaman.component';
import { PaginationFilterHargaComponent } from './pagination-filter-harga/pagination-filter-harga.component';
import { PaginationFilterKategoriComponent } from './pagination-filter-kategori/pagination-filter-kategori.component';
import { PaginationFilterLimitPageComponent } from './pagination-filter-limit-page/pagination-filter-limit-page.component';
import { PaginationFilterSortComponent } from './pagination-filter-sort/pagination-filter-sort.component';
import { PaginationFilterUkuranComponent } from './pagination-filter-ukuran/pagination-filter-ukuran.component';
import { PaginationFilterWarnaComponent } from './pagination-filter-warna/pagination-filter-warna.component';
import { PaginationTemplateComponent } from './pagination-template/pagination-template.component';
import { WidgetRecentProductSmallComponent } from './widget-recent-product-small/widget-recent-product-small.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModModule
  ],
  declarations: [
    PaginationInfoHalamanComponent,
    PaginationFilterHalamanComponent,
    PaginationFilterHargaComponent,
    PaginationFilterKategoriComponent,
    PaginationFilterLimitPageComponent,
    PaginationFilterSortComponent,
    PaginationFilterUkuranComponent,
    PaginationFilterWarnaComponent,
    PaginationTemplateComponent,
    WidgetRecentProductSmallComponent
  ],
  exports: [
    PaginationInfoHalamanComponent,
    PaginationFilterHalamanComponent,
    PaginationFilterHargaComponent,
    PaginationFilterKategoriComponent,
    PaginationFilterLimitPageComponent,
    PaginationFilterSortComponent,
    PaginationFilterUkuranComponent,
    PaginationFilterWarnaComponent,
    PaginationTemplateComponent,
    WidgetRecentProductSmallComponent
  ]
})
export class PaginationModule { }
