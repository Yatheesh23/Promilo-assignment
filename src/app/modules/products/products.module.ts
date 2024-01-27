import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ProductListComponent,
    AboutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ProductsModule { }
